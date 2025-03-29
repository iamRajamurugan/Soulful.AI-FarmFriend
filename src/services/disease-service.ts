
import { toast } from 'sonner';

// Interface for disease prediction result
export interface DiseaseResult {
  disease: string;
  confidence: number;
  recommendations: string;
  description: string;
  symptoms: string[];
}

// Interface for fertilizer recommendation
export interface FertilizerRecommendation {
  fertilizer: string;
  guidelines: string;
  organic: boolean;
  effectiveness: number;
  suitableFor: string[];
  benefits: string[];
}

// Function to predict disease from image
export const predictDisease = async (image: File): Promise<DiseaseResult> => {
  const API_URL = "http://localhost:8000";
  
  try {
    // Create form data for the image upload
    const formData = new FormData();
    formData.append('file', image);
    
    // Send image to the prediction API
    const response = await fetch(`${API_URL}/predict-disease`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Disease prediction result:', result);
    
    return result;
  } catch (error) {
    console.error('Error calling disease prediction API:', error);
    throw error;
  }
};

// Function to get fertilizer recommendations based on disease
export const predictFertilizer = async (disease: string): Promise<FertilizerRecommendation> => {
  const API_URL = "http://localhost:8000";
  
  try {
    const response = await fetch(`${API_URL}/recommend-fertilizer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ disease }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Fertilizer recommendation result:', result);
    
    // Enhance the result with additional data
    const enhancedResult: FertilizerRecommendation = {
      fertilizer: result.fertilizer || "Generic Fertilizer",
      guidelines: result.guidelines || "Apply as directed",
      organic: result.fertilizer?.toLowerCase().includes("organic") || false,
      effectiveness: 85,
      suitableFor: ["Rice", "Wheat", "Vegetables"],
      benefits: [
        "Improves soil health",
        "Enhances nutrient absorption",
        "Promotes stronger root development"
      ]
    };
    
    return enhancedResult;
  } catch (error) {
    console.error('Error calling fertilizer recommendation API:', error);
    throw error;
  }
};

// Simulated disease prediction for testing
export const simulateDiseaseResult = (): DiseaseResult => {
  const diseases = [
    {
      disease: "Bacterial Leaf Blight",
      confidence: Math.random() * 20 + 75, // 75-95% confidence
      recommendations: "Apply copper-based bactericides. Ensure proper field drainage. Remove and destroy infected plants.",
      description: "Bacterial Leaf Blight is a serious rice disease caused by Xanthomonas oryzae that leads to wilting and yellowing of leaves.",
      symptoms: [
        "Yellow to white lesions along the leaf veins",
        "Lesions turn yellow to white as they develop",
        "Wilting of leaves in severe cases"
      ]
    },
    {
      disease: "Rice Blast",
      confidence: Math.random() * 25 + 70, // 70-95% confidence
      recommendations: "Apply fungicides containing tricyclazole or azoxystrobin. Maintain balanced fertilization. Plant resistant varieties.",
      description: "Rice blast is a fungal disease that affects the leaves, stems, and panicles with diamond-shaped lesions.",
      symptoms: [
        "Diamond-shaped lesions on leaves",
        "Gray centers with brown margins on lesions",
        "White to gray-green lesions on panicles"
      ]
    },
    {
      disease: "Healthy Plant",
      confidence: Math.random() * 15 + 80, // 80-95% confidence
      recommendations: "Continue with regular maintenance. Ensure proper irrigation and fertilization.",
      description: "No disease detected. The plant appears to be healthy.",
      symptoms: [
        "Plant shows normal growth pattern",
        "Leaves have healthy green color",
        "No visible lesions or spots"
      ]
    }
  ];
  
  return diseases[Math.floor(Math.random() * diseases.length)];
};

// Simulated fertilizer recommendation for testing
export const simulateFertilizerRecommendation = (disease: string): FertilizerRecommendation => {
  const fertilizerMap: Record<string, FertilizerRecommendation> = {
    "Bacterial Leaf Blight": {
      fertilizer: "Copper Oxychloride",
      guidelines: "Apply 2.5g/liter of water as a foliar spray at 7-10 day intervals",
      organic: false,
      effectiveness: 85,
      suitableFor: ["Rice", "Wheat", "Maize"],
      benefits: [
        "Controls bacterial infections",
        "Prevents disease spread",
        "Protects new foliage"
      ]
    },
    "Rice Blast": {
      fertilizer: "Tricyclazole 75% WP",
      guidelines: "Apply 6ml/10 liters of water when disease symptoms appear",
      organic: false,
      effectiveness: 90,
      suitableFor: ["Rice", "Wheat"],
      benefits: [
        "Systemic and preventive action",
        "Long-lasting protection",
        "Rain-resistant formula"
      ]
    },
    "Brown Spot": {
      fertilizer: "Mancozeb 75% WP",
      guidelines: "Apply 2.5g/liter as preventive spray every 7-14 days",
      organic: false,
      effectiveness: 80,
      suitableFor: ["Rice", "Vegetables", "Fruits"],
      benefits: [
        "Broad-spectrum protection",
        "Contact fungicide",
        "Prevents spore germination"
      ]
    },
    "Healthy Plant": {
      fertilizer: "Organic NPK 5-5-5",
      guidelines: "Apply 50g per plant monthly to maintain plant health",
      organic: true,
      effectiveness: 80,
      suitableFor: ["All crops", "Vegetables", "Fruits"],
      benefits: [
        "Balanced nutrition",
        "Improves soil health",
        "Environmentally friendly"
      ]
    }
  };
  
  // Default to a generic fertilizer if disease not found
  return fertilizerMap[disease] || {
    fertilizer: "Generic Plant Booster",
    guidelines: "Apply as directed on package based on plant size",
    organic: true,
    effectiveness: 75,
    suitableFor: ["Various crops"],
    benefits: [
      "General plant health improvement",
      "Stress resistance",
      "Root development"
    ]
  };
};
