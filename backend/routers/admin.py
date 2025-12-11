from fastapi import APIRouter
from database import get_session
from fastapi import Depends
from sqlmodel import Session, select, func
from models import Product

router = APIRouter(prefix="/api/admin", tags=["admin"])

@router.get("/dashboard")
def get_dashboard_stats(session: Session = Depends(get_session)):
    # Example stats
    total_products = session.exec(select(func.count(Product.id))).one()
    # Mock orders for now
    total_orders = 15 
    revenue = 15000000
    
    return {
        "total_products": total_products,
        "total_orders": total_orders,
        "revenue": revenue,
        "system_status": "healthy"
    }
