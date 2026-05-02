# 🏠 AI House Price Prediction System

> 🚀 An end-to-end Machine Learning system that predicts house prices with high accuracy, powered by a FastAPI backend and an interactive React dashboard.

---

## 📌 Overview

This project is a **production-style full-stack Machine Learning system** that predicts real estate prices based on structured input features such as area, number of bedrooms, and other attributes.

Unlike basic ML projects, this system covers the **complete lifecycle**:

> Data → Model Training → Model Serialization → API Serving → Frontend Visualization

---

## 🎯 Objectives

* Build an accurate regression model for house price prediction
* Expose the model via a **REST API (FastAPI)**
* Create a **user-friendly frontend dashboard**
* Visualize insights and predictions effectively
* Demonstrate real-world ML system design

---

## 🔥 Why This Project Stands Out

* ✅ End-to-end ML pipeline (not just a notebook)
* ✅ Backend API for real-time inference
* ✅ Interactive frontend (React + charts)
* ✅ Clean modular folder structure
* ✅ Easily extendable & deployable
* ✅ Industry-style architecture

---

## 🧠 Machine Learning Approach

### 📊 Data Processing

* Data cleaning & preprocessing
* Feature selection
* Handling missing values (if applicable)
* Exploratory Data Analysis (EDA)

### 🤖 Models Used

| Model             | Description                                |
| ----------------- | ------------------------------------------ |
| Linear Regression | Baseline model for comparison              |
| Random Forest     | Final model (better accuracy & robustness) |

### 📈 Model Evaluation

* Metrics: R² Score, MAE, MSE
* Visualization: Heatmap, Pairplot
* Model comparison before final selection

---

## 🏗️ System Architecture

```
User Input → React Frontend → FastAPI Backend → ML Model → Prediction → UI Display
```

---

## 📂 Project Structure

```
House-Price-Prediction/
│
├── data/              # Raw / processed dataset
├── models/            # Saved trained model (.pkl)
├── outputs/           # Visualizations (plots, graphs)
├── serving/           # FastAPI backend
│   └── app.py
├── house-ui/          # React frontend
├── main.py            # Model training script
├── requirements.txt   # Python dependencies
└── README.md
```

---

## ⚙️ Tech Stack

### 🔹 Backend

* Python
* FastAPI (for API serving)
* Scikit-learn (ML models)
* Pandas, NumPy (data processing)

### 🔹 Frontend

* React.js (Vite)
* Recharts (data visualization)

### 🔹 Tools & Environment

* Git & GitHub
* VS Code
* Virtual Environment (venv)

---

## 🚀 How to Run This Project

### 1️⃣ Clone Repository

```bash
git clone https://github.com/sujalkrshaw/AI-House-Price-Prediction-System.git
cd AI-House-Price-Prediction-System
```

---

### 2️⃣ Setup Backend

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Run FastAPI server:

```bash
uvicorn serving.app:app --reload
```

👉 API will run at: http://127.0.0.1:8000
👉 Swagger Docs: http://127.0.0.1:8000/docs

---

### 3️⃣ Setup Frontend

```bash
cd house-ui
npm install
npm run dev
```

👉 Frontend runs at: http://localhost:5173/

---

## 📊 Features

* 📈 Real-time house price prediction
* 📊 Data visualization (heatmaps, pairplots)
* ⚡ Fast and lightweight API
* 🎯 Accurate ML model (Random Forest)
* 🧩 Clean modular architecture
* 🔌 Easy integration with other systems

---

## 📷 Screenshots

> Add screenshots here to increase engagement 🔥

```
images/
├── dashboard.png
├── prediction.png
├── charts.png
```

---

## 📡 API Details

### Endpoint: `/predict`

**Method:** POST

### Request Body:

```json
{
  "area": 1200,
  "bedrooms": 3,
  "bathrooms": 2
}
```

### Response:

```json
{
  "predicted_price": 5500000
}
```

---

## ⚠️ Limitations

* Model performance depends on dataset quality
* Limited features (can be expanded further)
* Not yet deployed to cloud

---

## 🧪 Future Improvements (Next Level 🚀)

* 📍 Location-based prediction (Geo features)
* 📊 Advanced model comparison dashboard
* 📄 Downloadable PDF reports
* 🎨 Enhanced UI (animations + glassmorphism)
* ☁️ Deployment (AWS / Docker / Render)
* 🔁 CI/CD integration

---

## 🤝 Contribution

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Sujal  kumar Shaw**
💡 Aspiring AI Engineer | Full Stack Developer

---

## ⭐ Support

If you found this project useful:

⭐ Star the repository
🔁 Share it
👀 Follow for more projects

---

## 🧩 Final Note

> This is not just a machine learning model —
> it is a **complete deployable ML system** demonstrating real-world engineering practices.

🔥 Built with a focus on **practical AI + production readiness**
