from fastapi import APIRouter
from backend.user_input_prediction import predict_user_delivery_json

router = APIRouter()

@router.get("/predict")
def get_prediction(lat: float, lon: float):
    return predict_user_delivery_json(lat, lon)
