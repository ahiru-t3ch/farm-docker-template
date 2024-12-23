import os
import mongomock

# Test environment setup
os.environ['SECRET_KEY'] = 'your_secret_key_here'
os.environ['ALGORITHM'] = 'HS256'

mock_client = mongomock.MongoClient()
os.environ['DATABASE_NAME']='test_database'
mock_db = mock_client[os.environ['DATABASE_NAME']]
os.environ['MONGO_URI'] = 'mongodb://localhost:27017'
os.environ['COLLECTION_DUMMY']='dummy'
os.environ['COLLECTION_USERS']='users'
os.environ['COLLECTION_BLACKLISTED_TOKENS']='blacklisted_tokens'

os.environ['ACCESS_TOKEN_EXPIRE_MINUTES']='30'
os.environ['FRONT_REACT_URL'] = 'http://localhost:3000'

from fastapi.testclient import TestClient
from main import app


app.mongodb_client = mock_client

client = TestClient(app)

def test_index():    
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "This message is returned by FastApi Backend: Hello World!!!"}