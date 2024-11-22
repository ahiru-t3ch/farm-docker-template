from pydantic import BaseModel

# Define Pydantic model for input data
class DummyItem(BaseModel):
    name: str
    #description: str = None
    #price: float
    #quantity: int