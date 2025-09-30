from fastapi import APIRouter
from backend.config.database import client
router = APIRouter()

@router.get("/restaurant-clusters")
def get_restaurant_clusters():
    db = client["food_delivery"]
    collection = db["data"]

    pipeline = [
        {"$limit": 1000},
        {
            "$lookup": {
                "from": "kmeans",
                "localField": "ID",
                "foreignField": "ID",
                "as": "clusters"
            }
        },
        {
            "$unwind": "$clusters"
        },
        {
            "$group": {
                "_id": "$clusters.cluster",
                "coordinates": {
                    "$push": {
                        "restaurant_latitude": "$Restaurant_latitude",
                        "restaurant_longitude": "$Restaurant_longitude",
                        "delivery_latitude": "$Delivery_location_latitude",
                        "delivery_longitude": "$Delivery_location_longitude"
                    }
                },
                "count": {"$sum": 1}
            }
        },
        {
            "$project": {
                "count": 1,
                "coordinates": {"$slice": ["$coordinates", 10]}
            }
        },
        {
            "$sort": {"_id": 1}
        }
    ]

    return list(collection.aggregate(pipeline))