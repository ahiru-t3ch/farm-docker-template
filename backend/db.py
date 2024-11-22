from motor.motor_asyncio import AsyncIOMotorClient
import os

# Mongo DB

def init_db() -> object:
    # MongoDB connection details
    MONGO_URI = os.environ['MONGO_URI']
    DATABASE_NAME = os.environ['DATABASE_NAME']
    COLLECTION_NAME = os.environ['COLLECTION_NAME']
    # MongoDB client setup
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DATABASE_NAME]
    collection = db[COLLECTION_NAME]
    return collection

# Helper function to convert MongoDB's ObjectId to str
def object_id_to_str(obj_id) -> str:
    return str(obj_id)