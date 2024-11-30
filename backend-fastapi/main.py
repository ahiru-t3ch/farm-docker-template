from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from routers import items, auth


app = FastAPI()


# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ['FRONT_REACT_URL']],  # Allow request from React App
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(items.router)
app.include_router(auth.router)


@app.get("/")
def index():
    return {"message":f"Hello World"}