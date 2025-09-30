from fastapi import FastAPI

from backend.routers import deliveries, analytics, regression, kmeans, predict
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(deliveries.router, prefix="/deliveries", tags=["Deliveries"])
app.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
app.include_router(regression.router, prefix="/regression", tags=["Regression"])
app.include_router(kmeans.router, prefix="/kmeans", tags=["KMeans"])
app.include_router(predict.router, prefix="/predict", tags=["Predict"])

@app.get("/")
def read_root():
    return {"Hello": "World"}