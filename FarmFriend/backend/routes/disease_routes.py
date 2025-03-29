
from fastapi import APIRouter, File, UploadFile, HTTPException
from ..data.disease_data import get_random_disease

router = APIRouter()

@router.post("/predict-disease")
async def predict_disease(file: UploadFile = File(...)):
    """
    Generate a random disease prediction based on an uploaded image file
    """
    # Check if the file is an image
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image")
    
    try:
        # Get a random disease prediction from our predefined list
        random_disease = get_random_disease()
        
        # Log the prediction for debugging
        print(f"Generated prediction: {random_disease['disease']} with confidence {random_disease['confidence']}%")
        
        # Return the random disease prediction
        return random_disease
        
    except Exception as e:
        print(f"Error processing image: {e}")
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")
