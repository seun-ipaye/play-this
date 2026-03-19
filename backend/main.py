from pydantic import BaseModel
import string
import random
from fastapi import FastAPI, HTTPException

app = FastAPI()
room_list = [
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
guest_list = [
  {
    "name": "seun",
    "guest_id": "0JCSUZ",
    "room_id": "YPW8UI7GXJ"
  },
  {
    "name": "kamso",
    "guest_id": "VWIMCY",
    "room_id": "YPW8UI7GXJ"
  },
  {
    "name": "deji",
    "guest_id": "JAQN6D",
    "room_id": "YPW8UI7GXJ"
  }
]



def generate_random_code(size, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choices(chars, k=size))

class RoomCreate(BaseModel):
    title: str

class GuestJoin(BaseModel):
    name: str
    room_code: str

@app.get("/")
def read_root():
    return {"message": "Play This backend is running"}

#room
@app.post("/rooms")
def create_room(room_data: RoomCreate):
    code = generate_random_code(6)
    room_id = generate_random_code(10)
    
    room = {
        "title": room_data.title,
        "id": room_id,
        "code": code,
        "guest_list": []
    }
    
    room_list.append(room)
    
    return room

@app.get("/rooms")
def get_rooms():
    return room_list

@app.get("/rooms/{room_id}")
def get_room_from_id(room_id: str):
    for room in room_list:
        if room["id"] == room_id:
            return room
    raise HTTPException(status_code=404, detail="Room not found")

@app.get("/rooms/code/{room_code}")
def get_room_from_code(room_code: str):
    for room in room_list:
        if room["code"] == room_code:
            return room
    raise HTTPException(status_code=404, detail="Room not found")

#guest
@app.post("/guests/join")
def guest_join(guest_data: GuestJoin):
    
    for room in room_list:
        if guest_data.room_code == room["code"]:
            guest_id = generate_random_code(6)
            
            guest = {
                "name": guest_data.name,
                "guest_id": guest_id,
                "room_id": room["id"]
                }
            
            guest_list.append(guest)
            return guest
            
        
    raise HTTPException(status_code=404, detail="Room not found")
        
@app.get("/rooms/{room_id}/guests")
def get_guests(room_id: str):
    this_guest_list = []
    for guest in guest_list:
        if guest["room_id"] == room_id:
            this_guest_list.append(guest)
    return this_guest_list
        

        
            
        
        