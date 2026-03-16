from pydantic import BaseModel
import string
import random
from fastapi import FastAPI, HTTPException

app = FastAPI()
party_list = []



def generate_random_code(size, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choices(chars, k=size))

class PartyCreate(BaseModel):
    title: str


@app.get("/")
def read_root():
    return {"message": "Play This backend is running"}

@app.post("/parties")
def create_party(party_data: PartyCreate):
    code = generate_random_code(6)
    party_id = generate_random_code(10)
    
    party = {
        "title": party_data.title,
        "id": party_id,
        "code": code,
    }
    
    party_list.append(party)
    
    return party

@app.get("/parties")
def get_parties():
    return party_list

@app.get("/parties/{party_id}")
def get_party_from_id(party_id: str):
    for party in party_list:
        if party["id"] == party_id:
            return party
    raise HTTPException(status_code=404, detail="Party not found")

@app.get("/parties/code/{party_code}")
def get_party_from_code(party_code: str):
    for party in party_list:
        if party["code"] == party_code:
            return party
    raise HTTPException(status_code=404, detail="Party not found")