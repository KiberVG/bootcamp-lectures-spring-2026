from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

global_username = "kimber"

origins = [
    "http://localhost",
    "http://localhost:5500",
    "http://127.0.0.1:5500", # had to add this to make it work
     "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/username")
async def username():
    return {"username": global_username}

@app.post("/username/{username}")
async def post_username(username):
    print(username)
    global_username = username
    print(global_username)
    return {"username": username}

