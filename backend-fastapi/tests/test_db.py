import pytest
import os
from unittest.mock import patch, AsyncMock
from bson import ObjectId

from db import init_db, object_id_to_str


@pytest.fixture
def mock_env_vars():
    os.environ['MONGO_URI'] = 'mongodb://mockuri:27017'
    os.environ['DATABASE_NAME'] = 'mock_database'
    os.environ['COLLECTION_DUMMY'] = 'collection_dummy'
    os.environ['COLLECTION_USERS'] = 'collection_users'
    os.environ['COLLECTION_BLACKLISTED_TOKENS'] = 'collection_blacklisted_tokens'
    yield


@pytest.mark.asyncio
async def test_init_db(mock_env_vars):
    """Test init_db function."""
    collections = init_db()

    # Assert that the collections dictionary is correctly initialized
    assert 'collection_dummy' in collections
    assert 'collection_users' in collections
    assert 'collection_blacklisted_tokens' in collections


def test_object_id_to_str():
    """Test object_id_to_str function."""
    mock_object_id = ObjectId()
    str_representation = object_id_to_str(mock_object_id)
    assert str_representation == str(mock_object_id)