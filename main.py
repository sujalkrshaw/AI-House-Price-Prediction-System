# main.py

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os
import joblib

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# -----------------------------
# SETUP
# -----------------------------
os.makedirs("outputs", exist_ok=True)
os.makedirs("models", exist_ok=True)

np.random.seed(42)

# -----------------------------
# 1. CREATE DATASET
# -----------------------------
data = pd.DataFrame({
    "area": np.random.randint(500, 4000, 200),
    "bedrooms": np.random.randint(1, 5, 200),
    "bathrooms": np.random.randint(1, 4, 200),
    "age": np.random.randint(0, 30, 200),
    "location": np.random.randint(1, 5, 200)
})

data["price"] = (
    data["area"] * 3000 +
    data["bedrooms"] * 50000 +
    data["bathrooms"] * 30000 -
    data["age"] * 1000 +
    data["location"] * 70000 +
    np.random.randint(-50000, 50000, 200)
)

print("\n📊 Dataset Preview:\n", data.head())

# -----------------------------
# 2. EDA
# -----------------------------
sns.pairplot(data)
plt.savefig("outputs/pairplot.png")

plt.figure(figsize=(8,6))
sns.heatmap(data.corr(), annot=True, cmap="coolwarm")
plt.title("Correlation Heatmap")
plt.savefig("outputs/heatmap.png")

# -----------------------------
# 3. SPLIT DATA
# -----------------------------
X = data.drop("price", axis=1)
y = data["price"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# -----------------------------
# 4. MODELS
# -----------------------------
lr = LinearRegression()
rf = RandomForestRegressor(n_estimators=100, random_state=42)

lr.fit(X_train, y_train)
rf.fit(X_train, y_train)

# -----------------------------
# 5. PREDICTIONS
# -----------------------------
lr_pred = lr.predict(X_test)
rf_pred = rf.predict(X_test)

# -----------------------------
# 6. EVALUATION FUNCTION
# -----------------------------
def evaluate(y_true, pred, name):
    print(f"\n📌 {name} Performance")
    print("MAE :", mean_absolute_error(y_true, pred))
    print("RMSE:", np.sqrt(mean_squared_error(y_true, pred)))
    print("R2  :", r2_score(y_true, pred))

evaluate(y_test, lr_pred, "Linear Regression")
evaluate(y_test, rf_pred, "Random Forest")

# -----------------------------
# 7. VISUALIZATION
# -----------------------------
plt.figure()
plt.scatter(y_test, rf_pred)
plt.xlabel("Actual Price")
plt.ylabel("Predicted Price")
plt.title("Actual vs Predicted (Random Forest)")
plt.savefig("outputs/prediction.png")

# -----------------------------
# 8. SAVE MODEL
# -----------------------------
joblib.dump(rf, "models/house_price_model.pkl")
print("\n✅ Model saved in models/house_price_model.pkl")

# -----------------------------
# 9. SAMPLE PREDICTION (FIXED)
# -----------------------------
sample_df = pd.DataFrame([{
    "area": 2000,
    "bedrooms": 3,
    "bathrooms": 2,
    "age": 5,
    "location": 3
}])

pred_price = rf.predict(sample_df)
print("\n🏠 Predicted Price:", pred_price[0])