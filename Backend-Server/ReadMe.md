# Smart Agriculture System 

This repository contains the backend and documentation for the Smart Agriculture System.  
The system enables real-time prediction of whether crops need watering, based on soil data collected from hardware sensors.

---

## 🏗️ Architecture Overview

The system is composed of three main services that communicate with each other to provide a seamless analysis flow:

**Frontend (Port 5173)** ---> **Backend Express API (Port 3000)** ---> **ML Model FastAPI (Port 8000)**

### Flow Explanation

1. **Frontend**:
   - Collects soil sensor data (`temperature`, `humidity`, `nitrogen`, `pH`) from the hardware.
   - Sends a POST request with this data to the Express backend at the `/ai/analyze` endpoint.

2. **Backend (Express API)**:
   - Receives the request from the frontend.
   - Validates that all required fields are present.
   - Forwards the validated data to the ML model server (`FastAPI`) at `http://localhost:8000/predict`.
   - Receives the prediction from the ML server, wraps it in a standardized `apiResponse` format, and sends it back to the frontend.

3. **ML Model Server (FastAPI)**:
   - Receives the soil data as a JSON payload.
   - Loads a pre-trained machine learning model (`model.pkl`).
   - Uses the model to predict the soil moisture level.
   - Returns the predicted moisture value along with a simple recommendation: `"Need to water"` or `"No need to water"`.

---

## 📝 API Documentation

### 1️⃣ Backend API (Express)

#### POST /ai/analyze

Acts as a proxy to the ML service.

Receives soil data from frontend, validates it, and forwards to the ML server (FastAPI).

**Request Headers:**
```
Content-Type: application/json
```

**Request Body Example:**
```json
{
  "temperature": 25.5,
  "humidity": 60.2,
  "nitrogen": 50.0,
  "ph": 6.8
}
```

**Success Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "predicted_moisture": 28.7,
    "result": "Need to water"
  },
  "message": "AI analysis generated successfully",
  "success": true
}
```

**Error Response (400 Bad Request):**
```json
{
  "statusCode": 400,
  "data": null,
  "message": "Temperature is a required field.",
  "success": false
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "statusCode": 500,
  "data": null,
  "message": "ai controller failed",
  "success": false
}
```

### 2️⃣ ML Model API (FastAPI)

#### POST /predict

Receives soil data from Express backend and predicts moisture.

Returns the predicted moisture and watering recommendation.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body Example:**
```json
{
  "temperature": 25.5,
  "humidity": 60.2,
  "nitrogen": 50.0,
  "ph": 6.8
}
```

**Success Response (200 OK):**
```json
{
  "predicted_moisture": 28.7,
  "result": "Need to water"
}
```

**Error Response (503 Service Unavailable):**
```json
{
  "detail": "Model not loaded"
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "detail": "Prediction failed: [error details]"
}
```

### 3️⃣ FastAPI Health Check

#### GET /

Checks if the ML server is running and the model is loaded.

**Request:**
```
GET http://localhost:8000/
```

**Success Response (200 OK):**
```json
{
  "status": "ok",
  "message": "API is running and model is loaded."
}
```

**Error Response (Model not loaded):**
```json
{
  "status": "error",
  "message": "API running but model failed to load."
}
```

### 4️⃣ Example Frontend Fetch Call

```javascript
const soilData = {
  temperature: 25.5,
  humidity: 60.2,
  nitrogen: 50.0,
  ph: 6.8
};

fetch("http://localhost:3000/ai/analyze", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(soilData)
})
  .then(res => res.json())
  .then(data => console.log("Prediction:", data))
  .catch(err => console.error("Error:", err));
```

**Expected Output:**
```json
{
  "statusCode": 200,
  "data": {
    "predicted_moisture": 28.7,
    "result": "Need to water"
  },
  "message": "AI analysis generated successfully",
  "success": true
}
```