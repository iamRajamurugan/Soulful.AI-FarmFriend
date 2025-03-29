# FarmFriend - AI-Powered Farming Assistant

## Overview
FarmFriend is an advanced AI-driven agricultural assistant designed to help farmers scan, detect, and analyze crop health in real time. By leveraging AI models, it enables quick disease detection and provides fertilizer recommendations, ensuring efficient and smarter farming.

## Key Features
- **Disease Detection** – Upload an image to determine if the crop is healthy or unhealthy.
- **Fertilizer Recommendation** – Get AI-powered suggestions for the best fertilizer to use.
- **Real-Time Camera Scanning** – Instantly analyze crop health with a live camera interface.
- **Interactive Dashboard** – Access weather updates, crop prices, and community insights.
- **Full-Stack Implementation** – Developed with a FastAPI backend and React frontend for seamless interaction.

## Project Structure
```
project/
├── backend/                 # Backend API (FastAPI)
│   ├── main.py             # Core backend logic
│   ├── routes/             # API endpoints
│   ├── models/             # AI models for disease detection
│   ├── data/               # Data processing files
│   ├── requirements.txt    # Dependencies for backend
│   └── README.md           # Backend-specific documentation
├── src/                     # Frontend (React + TypeScript)
│   ├── components/         # UI Components
│   ├── pages/              # Page-based structure
│   ├── services/           # API integrations
│   ├── App.tsx             # Main application file
│   ├── main.tsx            # React entry point
│   └── index.css           # Global styles
└── README.md                # Project documentation
```

## Installation & Setup
### Prerequisites
- TensorFlow 2.11
- Python 3.8+
- FastAPI
- Node.js & npm
- Virtual Environment (optional but recommended)

### Backend Setup
```sh
cd backend
python -m venv venv  # Create virtual environment
source venv/bin/activate  # Activate (Linux/macOS)
venv\Scripts\activate  # Activate (Windows)
pip install -r requirements.txt  # Install dependencies
uvicorn main:app --reload  # Run server
```

### Frontend Setup
```sh
cd src
npm install  # Install dependencies
npm run dev  # Start development server
```

## API Endpoints
### 1. Disease Detection
**Endpoint:** `/predict-disease`
- **Method:** `POST`
- **Request:** Upload an image
- **Response:** `{ "result": "Healthy" | "Unhealthy" }`

### 2. Fertilizer Recommendation
**Endpoint:** `/recommend-fertilizer`
- **Method:** `POST`
- **Request:** Crop details
- **Response:** `{ "recommendation": "Urea" | "NPK" }`

## USP (Unique Selling Points)
✅ AI-powered crop disease detection for fast and accurate analysis.  
✅ Real-time camera integration for instant health checks.  
✅ Data-driven fertilizer recommendations for optimized farming.  
✅ Modern, intuitive UI with interactive features.  
✅ Full-stack solution with seamless API integration.  

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit changes (`git commit -m "Added new feature"`).
4. Push to branch (`git push origin feature-name`).
5. Create a pull request.

THANKYOU for viewing our project !
