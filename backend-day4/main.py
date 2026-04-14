from fastapi import FastAPI

app = FastAPI()

username_global = "kimber"

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/username")
async def message():
    return {"username": "kimberg"}

@app.post("/username/{username}") # path parameter
async def change_username(username):
    username_global = username
    
    return {"success": True, "username": username_global}