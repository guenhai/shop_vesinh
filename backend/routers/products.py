from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from database import get_session
from models import Product, ProductCreate, ProductUpdate

router = APIRouter(prefix="/api/products", tags=["products"])

@router.get("/", response_model=List[Product])
def read_products(
    offset: int = 0,
    limit: int = Query(default=100, le=100),
    session: Session = Depends(get_session)
):
    products = session.exec(select(Product).offset(offset).limit(limit)).all()
    return products

@router.get("/{product_id}", response_model=Product)
def read_product(product_id: int, session: Session = Depends(get_session)):
    product = session.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# --- Admin Operations (In a real app, protect these with dependency injection) ---

@router.post("/", response_model=Product)
def create_product(product: ProductCreate, session: Session = Depends(get_session)):
    db_product = Product.model_validate(product)
    session.add(db_product)
    session.commit()
    session.refresh(db_product)
    return db_product

@router.patch("/{product_id}", response_model=Product)
def update_product(product_id: int, product_update: ProductUpdate, session: Session = Depends(get_session)):
    db_product = session.get(Product, product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product_data = product_update.model_dump(exclude_unset=True)
    db_product.sqlmodel_update(product_data)
    session.add(db_product)
    session.commit()
    session.refresh(db_product)
    return db_product

@router.delete("/{product_id}")
def delete_product(product_id: int, session: Session = Depends(get_session)):
    db_product = session.get(Product, product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    session.delete(db_product)
    session.commit()
    return {"ok": True}
