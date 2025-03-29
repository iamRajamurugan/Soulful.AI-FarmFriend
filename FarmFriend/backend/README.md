
# Smart Cultivation API

This FastAPI backend provides disease prediction and fertilizer recommendation services for the Smart AI Farming Assistant application.

## Setup Instructions

1. Create a virtual environment:
```
python -m venv venv
```

2. Activate the virtual environment:
- Windows: `venv\Scripts\activate`
- Mac/Linux: `source venv/bin/activate`

3. Install dependencies:
```
pip install -r requirements.txt
```

4. Place your models in the `models` directory:
- `models/crop_disease_model.h5` - Model for crop disease prediction
- `models/fertilizer_recommendation_model.h5` - Model for fertilizer recommendations (optional)

5. Run the server:
```
python main.py
```

The server will be available at http://localhost:8000

## API Endpoints

- `GET /` - Check if the API is running
- `POST /predict-disease` - Upload an image to detect plant disease
- `POST /recommend-fertilizer` - Get fertilizer recommendations based on a disease

## Deployment

This API can be deployed to cloud platforms like Heroku, Google Cloud Run, or AWS.
