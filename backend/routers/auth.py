import os
from datetime import timedelta
from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlmodel import Session, select
from auth import create_access_token, get_password_hash, verify_password, ACCESS_TOKEN_EXPIRE_MINUTES
from database import get_session
from models import AdminUser
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/api/auth", tags=["auth"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/token")

@router.on_event("startup")
def ensure_admin_exists():
    """Check and create admin user from ENV on startup"""
    # Use database.py's get_session context manager manually since we are outside request scope
    from database import engine
    
    admin_user = os.getenv("ADMIN_USER", "admin")
    admin_pass = os.getenv("ADMIN_PASSWORD", "admin123CHANGEME")
    
    with Session(engine) as session:
        existing_user = session.exec(select(AdminUser).where(AdminUser.username == admin_user)).first()
        if not existing_user:
            print(f"Creating default admin user: {admin_user}")
            hashed_pw = get_password_hash(admin_pass)
            new_admin = AdminUser(username=admin_user, hashed_password=hashed_pw)
            session.add(new_admin)
            session.commit()
        else:
            print(f"Admin user '{admin_user}' already exists.")

@router.post("/token")
def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: Session = Depends(get_session)
):
    user = session.exec(select(AdminUser).where(AdminUser.username == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], session: Session = Depends(get_session)):
    # Simple validation placeholder
    return token
