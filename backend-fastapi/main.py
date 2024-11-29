from fastapi import FastAPI, HTTPException, Depends, status, Body
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import EmailStr
from typing_extensions import Annotated
import os
from datetime import timedelta
from jwt.exceptions import InvalidTokenError

from models import User, Token, TokenData
from db import init_db, object_id_to_str
from utils_auth_token import verify_password, get_password_hash, create_access_token, decode_token
from routers import items

app = FastAPI()


# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ['FRONT_REACT_URL']],  # Allow request from React App
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


collections = init_db()
collection_dummy = collections['collection_dummy'] 
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


@app.post("/register", response_model=dict)
async def register_user(
    username: str = Body(...),
    password: str = Body(...),
    email: EmailStr = Body(...),
    full_name: str = Body(...),
):
    """
    Register a new user.
    """
    # Check if the username or email already exists
    existing_user = await collection_users.find_one({"username": username})
    existing_email = await collection_users.find_one({"email": email})

    if existing_user:
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
        "full_name": full_name,
        "hashed_password": hashed_password,
        "disabled": False,  # Default value for new users
    }
    # Save user to the database
    result = await collection_users.insert_one(user_data)
    return {"message": "User registered successfully", "id": object_id_to_str(result.inserted_id)}


@app.post("/token", response_model=Token)
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


#@app.post("/logout")
#def logout(token: str):
#    if not token:
#        raise HTTPException(status_code=400, detail="Missing or empty token")
#    if is_token_blacklisted(collection_blacklisted_tokens, token):
#        raise HTTPException(status_code=400, detail="Token is already blacklisted")
#    blacklist_token(token)
#    return {"message": "Token has been invalidated"}


#@app.get("/secure-endpoint")
#def secure_endpoint(token: str):
#    if is_token_blacklisted(token):
#        raise HTTPException(status_code=401, detail="Invalid token")
#    payload = decode_token(token)
#    return {"message": "Secure content", "user": payload.get("sub")}


app.include_router(items.router)


@app.get("/")
def index():
    return {"message":f"Hello World"}