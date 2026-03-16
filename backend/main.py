from pydantic import BaseModel

from fastapi import FastAPI

app = FastAPI()
party_list = []

import string
import random

def generate_random_code(size, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choices(chars, k=size))

class PartyCreate(BaseModel):
    title: str


@app.get("/")
def read_root():
    return {"message": "Play This backend is running"}

@app.post("/parties/{title}")
def create_party(party_data: PartyCreate):
    code = generate_random_code(6)
    party_id = generate_random_code(10)
    
    
    party_list.append({
        "title": party_data.title,
        "id": party_id,
        "code": code,
    })
    
    return {
        "title": party_data.title,
        "id": party_id,
        "code": code,
        
    }