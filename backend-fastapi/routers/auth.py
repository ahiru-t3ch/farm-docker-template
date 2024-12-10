from fastapi import HTTPException, Depends, status, Body, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import EmailStr
from typing_extensions import Annotated
import os
from datetime import timedelta, datetime
from jwt.exceptions import InvalidTokenError

from models import User, Token, TokenData
from db import init_db, object_id_to_str
from utils.auth_token import verify_password, get_password_hash, create_access_token, decode_token


collections = init_db()
collection_users = collections['collection_users']
collection_blacklisted_tokens = collections['collection_blacklisted_tokens']


ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ['ACCESS_TOKEN_EXPIRE_MINUTES'])


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def authenticate_user(collection_users, username: str, password: str):
    user = await collection_users.find_one({"username": username})
    if not user:
        return False
    if not verify_password(password, user["hashed_password"]):
        return False
    return user


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    # Check if the token is blacklisted
    blacklisted_token = await collection_blacklisted_tokens.find_one({"token": token})
    if blacklisted_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token is invalid or has been logged out"
        )
    try:
        payload = decode_token(token)
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    user = await collection_users.find_one({"username": token_data.username})
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)],
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


router = APIRouter()


@router.post("/register", response_model=dict)
async def register_user(
    username: str = Body(...),
    password: str = Body(...),
    email: EmailStr = Body(...),
    first_name: str = Body(...),
    last_name: str = Body(...),
):
    """
    Register a new user.
    """
    # Check if the username or email already exists
    existing_username = await collection_users.find_one({"username": username})
    existing_email = await collection_users.find_one({"email": email})

    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists"
        )

    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists"
        )

    # Hash the password
    hashed_password = get_password_hash(password)
    # Create the user data
    user_data = {
        "username": username,
        "email": email,
        "full_name": first_name,
        "full_name": last_name,
        "hashed_password": hashed_password,
        "disabled": False,  # Default value for new users
    }
    # Save user to the database
    result = await collection_users.insert_one(user_data)
    return {"message": "User registered successfully", "id": object_id_to_str(result.inserted_id)}


@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    user = await authenticate_user(collection_users, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"]}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@router.post("/logout")
async def logout(token: Annotated[str, Depends(oauth2_scheme)]):
    """
    Invalidate the current token by adding it to the blacklist.
    """
    try:
        # Decode the token to validate and get payload
        payload = decode_token(token)
        blacklisted_token = {
            "token": token,
            "blacklisted_at": datetime.utcnow()
        }
        await collection_blacklisted_tokens.insert_one(blacklisted_token)
        return {"message": "Logout successful"}
    except InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
