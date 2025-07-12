from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class Move(BaseModel):
    move: str

counter = 1

@app.post("/hob/move")
def hob_move(data: Move):
    global counter
    expected = "HOB" if counter % 5 == 0 else str(counter)

    if data.move != expected:
        return {"message": f"Wrong! Expected: {expected}. You lost!"}

    counter += 1
    server_move = "HOB" if counter % 5 == 0 else str(counter)
    counter += 1

    return {"message": f"Server says: {server_move}"}
