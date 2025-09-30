from fastapi import APIRouter
from backend.config.database import client

router = APIRouter()

@router.get("/deliveries-with-prediction")
def get_deliveries_with_prediction():
    db = client['food_delivery']
    collection = db['data']

    pipeline= [
        {"$limit": 100},
        {
            "$lookup": {
                "from": "linear_regression",
                "localField": "ID",
                "foreignField": "ID",
                "as": "regression"
            }
        },
        {
            "$unwind": "$regression"
        },
        {
            "$project": {
                "_id": 0,
                "ID": 1,
                "Delivery_person_ID": 1,
                "Type_of_order": 1,
                "Type_of_vehicle": 1,
                "Time_taken(min)": 1,
                "distance": 1,
                "prediction": { "$round": ["$regression.prediction", 2] }
            }
        }
    ]

    return list(collection.aggregate(pipeline))