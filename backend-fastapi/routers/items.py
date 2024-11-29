from fastapi import HTTPException, APIRouter
from typing import List
from bson import ObjectId

from models import DummyItem
from db import init_db, object_id_to_str


collections = init_db()
collection_dummy = collections['collection_dummy'] 


router = APIRouter()


@router.post("/items/", response_model=dict)
async def create_item(item: DummyItem):
    item_dict = item.dict()
    result = await collection_dummy.insert_one(item_dict)
    return {"id": object_id_to_str(result.inserted_id)}


@router.get("/items/", response_model=List[dict])
async def read_items():
    items = await collection_dummy.find().to_list(length=100)  # Limit number of items to retrieve
    for item in items:
        item["_id"] = object_id_to_str(item["_id"])  # Convert ObjectId to string
    return items


@router.get("/items/{item_id}", response_model=dict)
async def read_item(item_id: str):
    item = await collection_dummy.find_one({"_id": ObjectId(item_id)})
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    item["_id"] = object_id_to_str(item["_id"])
    return item


@router.delete("/items/{item_id}")
async def delete_item(item_id: str):
    result = await collection_dummy.delete_one({"_id": ObjectId(item_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item deleted"}