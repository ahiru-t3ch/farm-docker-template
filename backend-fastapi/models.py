from pydantic import BaseModel, Field
from typing import Optional


class DummyItem(BaseModel):
    name: str
    user_id: Optional[str] = Field(None, description="The ID of the user who owns the item")


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class User(BaseModel):
    username: str
    email: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    disabled: bool | None = None


class UserInDB(User):
    hashed_password: str