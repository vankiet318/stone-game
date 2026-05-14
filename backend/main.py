import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router as game_router
from init_db import init_db

app = FastAPI(title="Bau Cua Tom Ca - Clean Architecture")

# Tự động khởi tạo database khi khởi động app
@app.on_event("startup")
def on_startup():
    try:
        init_db()
        print("Database initialized successfully!")
    except Exception as e:
        print(f"Error initializing database: {e}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(game_router)

if __name__ == "__main__":
    import uvicorn
    # Railway sẽ cấp PORT qua biến môi trường
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)