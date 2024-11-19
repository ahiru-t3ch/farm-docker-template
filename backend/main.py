from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from typing import List
from bson import ObjectId
import os

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow request from React App
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mongo DB

# MongoDB connection details
MONGO_URI = os.environ['MONGO_URI']
DATABASE_NAME = os.environ['DATABASE_NAME']
COLLECTION_NAME = os.environ['COLLECTION_NAME']

# MongoDB client setup
client = AsyncIOMotorClient(MONGO_URI)
db = client[DATABASE_NAME]
collection = db[COLLECTION_NAME]

# Define Pydantic model for input data
class DummyItem(BaseModel):
    name: str
    #description: str = None
    #price: float
    #quantity: int

# Helper function to convert MongoDB's ObjectId to str
def object_id_to_str(obj_id):
    return str(obj_id)

# Fast API REST

@app.get("/")
def index():
    return {"message":f"Hello world my secret = {os.environ['MONGO_URI']} VERSION CORS"}

@app.post("/items/", response_model=dict)
async def create_item(item: DummyItem):
    item_dict = item.dict()
    result = await collection.insert_one(item_dict)
    return {"id": object_id_to_str(result.inserted_id)}

@app.get("/items/", response_model=List[dict])
async def read_items():
    items = await collection.find().to_list(length=100)  # Limit number of items to retrieve
    for item in items:
        item["_id"] = object_id_to_str(item["_id"])  # Convert ObjectId to string
    return items

@app.get("/items/{item_id}", response_model=dict)
async def read_item(item_id: str):
    item = await collection.find_one({"_id": ObjectId(item_id)})
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    item["_id"] = object_id_to_str(item["_id"])
    return item