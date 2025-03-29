
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import numpy as np
import tensorflow as tf
from PIL import Image
import io
import uvicorn

app = FastAPI(title="Smart Cultivation API", 
              description="API for crop disease detection and fertilizer recommendation")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables to store models
crop_disease_model = None
fertilizer_recommendation_model = None

# Disease reference data (sample - would ideally come from a database)
disease_info = {
    "Bacterial Leaf Blight": {
        "description": "Bacterial Leaf Blight is a serious rice disease caused by Xanthomonas oryzae that leads to wilting and yellowing of leaves.",
        "recommendations": "Apply copper-based bactericides. Ensure proper field drainage. Remove and destroy infected plants.",
        "symptoms": [
            "Yellow to white lesions along the leaf veins",
            "Lesions turn yellow to white as they develop",
            "Wilting of leaves in severe cases"
        ]
    },
    "Blast": {
        "description": "Rice blast is a fungal disease that affects the leaves, stems, and panicles with diamond-shaped lesions.",
        "recommendations": "Apply fungicides containing tricyclazole or azoxystrobin. Maintain balanced fertilization. Plant resistant varieties.",
        "symptoms": [
            "Diamond-shaped lesions on leaves",
            "Gray centers with brown margins on lesions",
            "White to gray-green lesions on panicles"
        ]
    },
    "Brown Spot": {
        "description": "Brown spot is a fungal disease causing oval brown lesions on leaves. Often related to nutrient deficiency.",
        "recommendations": "Apply fungicides containing mancozeb or iprodione. Correct soil nutrient deficiencies, especially potassium.",
        "symptoms": [
            "Oval brown lesions on leaves",
            "Dark brown spots with yellow halos",
            "Infected seeds show brown spots"
        ]
    },
    "Leaf Scald": {
        "description": "Leaf scald appears as long, yellow-orange lesions with brownish margins, usually on older leaves.",
        "recommendations": "Apply fungicides containing propiconazole. Remove infected plant debris. Use resistant varieties if available.",
        "symptoms": [
            "Long, yellow-orange lesions with brownish margins",
            "Lesions often starting from leaf tips",
            "Whitish centers develop in mature lesions"
        ]
    },
    "Sheath Blight": {
        "description": "Sheath blight appears as oval lesions on leaf sheaths with gray-white centers and brown margins.",
        "recommendations": "Apply fungicides containing hexaconazole or validamycin. Reduce nitrogen fertilizer. Improve field drainage.",
        "symptoms": [
            "Oval lesions on leaf sheaths with gray-white centers",
            "Brown margins around lesions",
            "Lesions may join together to form larger patches"
        ]
    }
}

# Fertilizer recommendations data (sample)
fertilizer_recommendations = {
    "Bacterial Leaf Blight": {
        "fertilizer": "Copper Oxychloride",
        "guidelines": "Apply 2.5g/liter of water as a foliar spray. Apply every 7-10 days until symptoms disappear."
    },
    "Blast": {
        "fertilizer": "Tricyclazole",
        "guidelines": "Apply 6ml/10 liters of water. Spray at early stages of infection for best results."
    },
    "Brown Spot": {
        "fertilizer": "Mancozeb",
        "guidelines": "Apply 2.5g/liter as preventive spray. Ensure good coverage of the entire plant."
    },
    "Leaf Scald": {
        "fertilizer": "Propiconazole",
        "guidelines": "Apply 1ml/liter of water. Spray on both sides of leaves for effective control."
    },
    "Sheath Blight": {
        "fertilizer": "Hexaconazole",
        "guidelines": "Apply 2ml/liter of water. Focus application on lower parts of plants and sheaths."
    }
}

@app.on_event("startup")
async def load_models():
    global crop_disease_model, fertilizer_recommendation_model
    
    try:
        # Load the crop disease prediction model
        crop_disease_model = tf.keras.models.load_model("models/crop_disease_model.h5")
        print("Crop disease model loaded successfully")
        
        # For this implementation, we'll use a dictionary instead of a model for fertilizer recommendations
        # In a real scenario, you would load the second model here
        # fertilizer_recommendation_model = tf.keras.models.load_model("models/fertilizer_recommendation_model.h5")
        
        print("Models loaded successfully")
    except Exception as e:
        print(f"Error loading models: {e}")
        # We'll continue without the models and handle exceptions in the endpoints

@app.get("/")
async def root():
    return {"message": "Smart Cultivation API is running"}

@app.post("/predict-disease")
async def predict_disease(file: UploadFile = File(...)):
    # Check if the file is an image
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image")
    
    try:
        # Read and process the image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Preprocess image for the model
        # Resize to match the model's expected input
        image = image.resize((224, 224))
        
        # Convert image to array
        img_array = np.array(image)
        
        # Normalize pixel values
        img_array = img_array / 255.0
        
        # Add batch dimension
        img_array = np.expand_dims(img_array, axis=0)
        
        # Make prediction
        if crop_disease_model is not None:
            predictions = crop_disease_model.predict(img_array)
            if predictions>=0.5:
                res = "Unhealthy Plant"
            else:
                res= "Healthy Plant"
        # Return prediction results
        return {
            "result":res,
        }
        
    except Exception as e:
        print(f"Error processing image: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@app.post("/recommend-fertilizer")
async def recommend_fertilizer(request: dict):
    try:
        disease = request.get("disease")
        
        if not disease:
            raise HTTPException(status_code=400, detail="Disease name is required")
            
        # Get fertilizer recommendation based on disease
        recommendation = fertilizer_recommendations.get(disease)
        
        if not recommendation:
            return JSONResponse(
                status_code=404,
                content={
                    "fertilizer": "General Purpose Fertilizer",
                    "guidelines": "Apply as directed on the package. Consult a local agriculture expert for specific guidance."
                }
            )
        
        return recommendation
        
    except Exception as e:
        print(f"Error recommending fertilizer: {e}")
        raise HTTPException(status_code=500, detail=f"Error recommending fertilizer: {str(e)}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
