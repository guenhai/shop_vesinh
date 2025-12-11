from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import create_db_and_tables
from routers import products, admin, auth

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load database on startup
    create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan, title="Shop Ve Sinh API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for dev convenience, restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(products.router)
app.include_router(admin.router)
app.include_router(auth.router)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to Shop Ve Sinh Backend API",
        "docs_url": "/docs"
    }
