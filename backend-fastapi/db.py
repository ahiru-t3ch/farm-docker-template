from motor.motor_asyncio import AsyncIOMotorClient
import os

# Mongo DB

def init_db() -> dict:
    # MongoDB connection details
    MONGO_URI = os.environ['MONGO_URI']
    DATABASE_NAME = os.environ['DATABASE_NAME']
    COLLECTION_DUMMY = os.environ['COLLECTION_DUMMY']
    COLLECTION_USERS = os.environ['COLLECTION_USERS']
    # MongoDB client setup
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DATABASE_NAME]
    collections = {
        'collection_dummy': db[COLLECTION_DUMMY],
        'collection_users': db[COLLECTION_USERS]
    }
    return collections

# Helper function to convert MongoDB's ObjectId to str
def object_id_to_str(obj_id) -> str:
    return str(obj_id)