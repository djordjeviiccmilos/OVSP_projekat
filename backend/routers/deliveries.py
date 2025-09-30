from fastapi import APIRouter
from backend.config.database import client  # samo client

router = APIRouter()

@router.get("/all")
def get_all_deliveries():
    db = client["food_delivery"]
    collection = db["data"]
    return list(collection.find({}, {"_id": 0}).limit(10))

@router.get("/stats")
def get_stats():
    db = client["food_delivery"]
    collection = db["data"]
    deliveries = list(collection.find({}, {"_id": 0}).limit(10))
    times = [d["Time_taken(min)"] for d in deliveries]
    return {
        "avg_time": sum(times)/len(times) if times else 0,
        "min_time": min(times) if times else 0,
        "max_time": max(times) if times else 0
    }
