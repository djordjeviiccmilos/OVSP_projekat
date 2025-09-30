from fastapi import APIRouter
from backend.config.database import client

router = APIRouter()

@router.get("/global-stats")
def global_stats():
    db = client['food_delivery']
    collection = db['data']
    pipeline = [
        {
            "$group": {
                "_id": None,
                "total_deliveries": {"$sum": 1},
                "min_time": {"$min": "$Time_taken(min)"},
                "max_time": {"$max": "$Time_taken(min)"},
                "avg_time": {"$avg": "$Time_taken(min)"}
            }
        },
        {
            "$project": {
                "_id": 0,
                "totalDeliveries": "$total_deliveries",
                "minTime": "$min_time",
                "maxTime": "$max_time",
                "avgTime": {"$round": ["$avg_time", 1]}
            }
        }
    ]

    return list(collection.aggregate(pipeline))[0]


@router.get("/top-delivery-persons")
def top_delivery_persons():
    db = client['food_delivery']
    collection = db['data']
    pipeline = [
        {"$group": {"_id": "$Delivery_person_ID",
                    "avg_rating": {"$avg": "$Delivery_person_Ratings"},
                    "total_deliveries": {"$sum": 1}
                    }
        },
        {"$project": {"avg_rating": {"$round": ["$avg_rating", 2]}}},
        {"$sort": {"avg_rating": -1}},
        {"$limit": 10}
    ]

    return list(collection.aggregate(pipeline))

@router.get("/most-popular-orders")
def most_popular_orders():
    db = client['food_delivery']
    collection = db['data']
    pipeline = [
        {"$group": {"_id": "$Type_of_order", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 10}
    ]

    return list(collection.aggregate(pipeline))

@router.get("/average-time-per-order")
def average_time_per_order():
    db = client['food_delivery']
    collection = db['data']
    pipeline = [
        {"$group": {"_id": "$Type_of_order", "avg_time": {"$avg": "$Time_taken(min)"}}},
        {"$sort": {"avg_time": 1}}
    ]

    return list(collection.aggregate(pipeline))


@router.get("/average-time-per-vehicle")
def average_time_per_vehicle():
    db = client['food_delivery']
    collection = db['data']
    pipeline = [
        {"$group": {"_id": "$Type_of_vehicle", "avg_time": {"$avg": "$Time_taken(min)"}}},
        {"$sort": {"avg_time": -1}}
    ]
    return list(collection.aggregate(pipeline))
