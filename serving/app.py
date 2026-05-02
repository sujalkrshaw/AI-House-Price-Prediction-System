from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI House Price API")

# ✅ CORS (NO ERRORS EVER)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# MODEL (SIMULATED ML MODEL)
# -------------------------
def predict_price(area, bedrooms, bathrooms, age, location):
    price = (
        area * 3000 +
        bedrooms * 50000 +
        bathrooms * 30000 -
        age * 2000 +
        location * 100000 +
        np.random.randint(-200000, 200000)
    )
    return max(price, 1000000)

# -------------------------
# INPUT SCHEMA
# -------------------------
class HouseInput(BaseModel):
    area: float
    bedrooms: int
    bathrooms: int
    age: int
    location: int

# -------------------------
# ROUTES
# -------------------------
@app.get("/")
def home():
    return {"message": "API running successfully 🚀"}

@app.post("/predict")
def predict(data: HouseInput):
    price = predict_price(
        data.area,
        data.bedrooms,
        data.bathrooms,
        data.age,
        data.location
    )
    return {"predicted_price": float(price)}