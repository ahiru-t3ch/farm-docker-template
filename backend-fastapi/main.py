from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from bson import ObjectId
import os
from models import DummyItem
from db import init_db, object_id_to_str

app = FastAPI() # Fast API REST

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://localhost:5173"],  # Allow request from React App
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

collection = init_db()

@app.get("/")
def index():
    return {"message":f"Dummy message returned by simple fastapi get"}

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

@app.delete("/items/{item_id}")
async def delete_item(item_id: str):
    result = await collection.delete_one({"_id": ObjectId(item_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item deleted"}