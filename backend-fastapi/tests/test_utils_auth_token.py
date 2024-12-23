import os
import pytest
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from utils.auth_token import verify_password, get_password_hash, create_access_token, decode_token

# Set up environment variables for testing
os.environ['SECRET_KEY'] = 'your_secret_key_here'
os.environ['ALGORITHM'] = 'HS256'

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def test_verify_password():
    password = "mysecretpassword"
    hashed_password = pwd_context.hash(password)
    assert verify_password(password, hashed_password) == True
    assert verify_password("wrongpassword", hashed_password) == False

def test_get_password_hash():
    password = "mysecretpassword"
    hashed_password = get_password_hash(password)
    assert pwd_context.verify(password, hashed_password) == True

def test_create_access_token():
    data = {"sub": "testuser"}
    token = create_access_token(data)
    decoded_data = decode_token(token)
    assert decoded_data["sub"] == "testuser"

def test_create_access_token_with_expiry():
    data = {"sub": "testuser"}
    expires_delta = timedelta(minutes=5)
    token = create_access_token(data, expires_delta)
    decoded_data = decode_token(token)
    expire_time = decoded_data["exp"]
    assert datetime.fromtimestamp(expire_time, tz=timezone.utc) < datetime.now(timezone.utc) + expires_delta

def test_decode_token():
    data = {"sub": "testuser"}
    token = create_access_token(data)
    decoded_data = decode_token(token)
    assert decoded_data["sub"] == "testuser"