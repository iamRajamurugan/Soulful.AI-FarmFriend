
import random

# Predefined list of dummy diseases with their details
diseases = [
    {
        "disease": "Bacterial Leaf Blight",
        "confidence": random.uniform(75.0, 95.0),
        "recommendations": "Apply copper-based bactericides. Ensure proper field drainage. Remove and destroy infected plants.",
        "description": "Bacterial Leaf Blight is a serious rice disease caused by Xanthomonas oryzae that leads to wilting and yellowing of leaves.",
        "symptoms": [
            "Yellow to white lesions along the leaf veins",
            "Lesions turn yellow to white as they develop",
            "Wilting of leaves in severe cases"
        ]
    },
    {
        "disease": "Rice Blast",
        "confidence": random.uniform(70.0, 90.0),
        "recommendations": "Apply fungicides containing tricyclazole or azoxystrobin. Maintain balanced fertilization. Plant resistant varieties.",
        "description": "Rice blast is a fungal disease that affects the leaves, stems, and panicles with diamond-shaped lesions.",
        "symptoms": [
            "Diamond-shaped lesions on leaves",
            "Gray centers with brown margins on lesions",
            "White to gray-green lesions on panicles"
        ]
    },
    {
        "disease": "Brown Spot",
        "confidence": random.uniform(65.0, 85.0),
        "recommendations": "Apply fungicides containing mancozeb or iprodione. Correct soil nutrient deficiencies, especially potassium.",
        "description": "Brown spot is a fungal disease causing oval brown lesions on leaves. Often related to nutrient deficiency.",
        "symptoms": [
            "Oval brown lesions on leaves",
            "Dark brown spots with yellow halos",
            "Infected seeds show brown spots"
        ]
    },
    {
        "disease": "Leaf Scald",
        "confidence": random.uniform(60.0, 80.0),
        "recommendations": "Apply fungicides containing propiconazole. Remove infected plant debris. Use resistant varieties if available.",
        "description": "Leaf scald appears as long, yellow-orange lesions with brownish margins, usually on older leaves.",
        "symptoms": [
            "Long, yellow-orange lesions with brownish margins",
            "Lesions often starting from leaf tips",
            "Whitish centers develop in mature lesions"
        ]
    },
    {
        "disease": "Sheath Blight",
        "confidence": random.uniform(55.0, 88.0),
        "recommendations": "Apply fungicides containing hexaconazole or validamycin. Reduce nitrogen fertilizer. Improve field drainage.",
        "description": "Sheath blight appears as oval lesions on leaf sheaths with gray-white centers and brown margins.",
        "symptoms": [
            "Oval lesions on leaf sheaths with gray-white centers",
            "Brown margins around lesions",
            "Lesions may join together to form larger patches"
        ]
    },
    {
        "disease": "Healthy Plant",
        "confidence": random.uniform(85.0, 99.0),
        "recommendations": "Continue with regular maintenance. Ensure proper irrigation and fertilization.",
        "description": "No disease detected. The plant appears to be healthy.",
        "symptoms": [
            "Plant shows normal growth pattern",
            "Leaves have healthy green color",
            "No visible lesions or spots"
        ]
    }
]

def get_random_disease():
    """
    Return a random disease from the predefined list with updated confidence value
    """
    disease = random.choice(diseases)
    # Create a copy to avoid modifying the original
    disease_copy = disease.copy()
    # Update the confidence to a new random value each time
    disease_copy["confidence"] = round(random.uniform(55.0, 95.0), 1)
    return disease_copy
