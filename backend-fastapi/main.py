from fastapi import FastAPI, HTTPException, Depends, status, Body
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import EmailStr
from typing import List
from typing_extensions import Annotated
from bson import ObjectId
import os
import jwt
from datetime import datetime, timedelta, timezone
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext

from db import init_db, object_id_to_str
from models import DummyItem, User, UserInDB, Token, TokenData

app = FastAPI() # Fast API REST


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


SECRET_KEY = os.environ['SECRET_KEY']
ALGORITHM = os.environ['ALGORITHM']
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ['ACCESS_TOKEN_EXPIRE_MINUTES'])


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


async def authenticate_user(collection_users, username: str, password: str):
    user = await collection_users.find_one({"username": username})
    if not user:
        return False
    if not verify_password(password, user["hashed_password"]):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    #user = get_user(collection_users, username=token_data.username)
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


@app.get("/users/me/", response_model=User)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return current_user


@app.get("/users/me/items/")
async def read_own_items(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return [{"item_id": "Foo", "owner": current_user.username}]

# OAuth2 end


@app.get("/")
def index():
    return {"message":f"Dummy message returned by simple fastapi get"}


@app.post("/items/", response_model=dict)
async def create_item(item: DummyItem):
    item_dict = item.dict()
    result = await collection_dummy.insert_one(item_dict)
    return {"id": object_id_to_str(result.inserted_id)}


@app.get("/items/", response_model=List[dict])
async def read_items():
    items = await collection_dummy.find().to_list(length=100)  # Limit number of items to retrieve
    for item in items:
        item["_id"] = object_id_to_str(item["_id"])  # Convert ObjectId to string
    return items


@app.get("/items/{item_id}", response_model=dict)
async def read_item(item_id: str):
    item = await collection_dummy.find_one({"_id": ObjectId(item_id)})
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    item["_id"] = object_id_to_str(item["_id"])
    return item


@app.delete("/items/{item_id}")
async def delete_item(item_id: str):
    result = await collection_dummy.delete_one({"_id": ObjectId(item_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item deleted"}