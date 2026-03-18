from pydantic import BaseModel
import string
import random
from fastapi import FastAPI, HTTPException

app = FastAPI()
party_list = [
  {
    "title": "back to school",
    "id": "YPW8UI7GXJ",
    "code": "XXPLTS"
  },
  {
    "title": "insomnia",
    "id": "24BCGYBL8C",
    "code": "ABUMJM"
  }
]
guest_list = []



def generate_random_code(size, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choices(chars, k=size))

class PartyCreate(BaseModel):
    title: str

class GuestJoin(BaseModel):
    name: str
    party_code: str

@app.get("/")
def read_root():
    return {"message": "Play This backend is running"}

#party
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

#guest
@app.post("/guests/join")
def guest_join(guest_data: GuestJoin):
    
    for party in party_list:
        if guest_data.party_code == party["code"]:
            guest_id = generate_random_code(6)
            
            guest = {
                "name": guest_data.name,
                "guest_id": guest_id,
                "party_id": party["id"]
                }
            
            guest_list.append(guest)
            return guest
            
        
    raise HTTPException(status_code=404, detail="Party not found")
        
