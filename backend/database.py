import os
from sqlmodel import SQLModel, create_engine, Session

# Đảm bảo thư mục db tồn tại
os.makedirs("db", exist_ok=True)

sqlite_file_name = "db/database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
