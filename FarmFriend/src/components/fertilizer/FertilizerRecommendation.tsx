
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Info, Droplet, ExternalLink, AlertTriangle, CheckCircle2, Leaf } from "lucide-react";
import { toast } from "sonner";
import { simulateFertilizerRecommendation, FertilizerRecommendation as FertilizerRecommendationType } from "@/services/disease-service";

interface FertilizerRecommendationProps {
  diseaseName: string;
}

const FertilizerRecommendation = ({ diseaseName }: FertilizerRecommendationProps) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [fertilizerData, setFertilizerData] = useState<FertilizerRecommendationType>({
    fertilizer: "Loading...",
    guidelines: "Loading application details...",
    effectiveness: 80,
    organic: false,
    suitableFor: [],
    benefits: []
  });
  
  // Static disease info for contextual information
  const diseaseInfo = {
    "Bacterial Leaf Blight": {
      description: "Bacterial Leaf Blight is a serious rice disease caused by Xanthomonas oryzae that leads to wilting and yellowing of leaves.",
      severity: "moderate",
    },
    "Rice Blast": {
      description: "Rice blast is a fungal disease that affects the leaves, stems, and panicles with diamond-shaped lesions.",
      severity: "severe",
    },
    "Brown Spot": {
      description: "Brown spot is a fungal disease causing oval brown lesions on leaves. Often related to nutrient deficiency.",
      severity: "mild",
    },
    "Leaf Scald": {
      description: "Leaf scald appears as long, yellow-orange lesions with brownish margins, usually on older leaves.",
      severity: "moderate",
    },
    "Sheath Blight": {
      description: "Sheath blight appears as oval lesions on leaf sheaths with gray-white centers and brown margins.",
      severity: "severe",
    },
    "Healthy Plant": {
      description: "No disease detected. The plant appears to be healthy.",
      severity: "healthy",
    }
  };

  useEffect(() => {
    // Show loading state for a smoother transition when coming from scanner
    if (location.state?.fromScanner) {
      const loadingTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 1200);
      return () => clearTimeout(loadingTimeout);
    } else {
      setIsLoading(false);
    }
  }, [location]);

  useEffect(() => {
    // Try to retrieve fertilizer data from session storage
    const storedFertilizerData = sessionStorage.getItem('fertilizerResult');
    
    if (storedFertilizerData) {
      try {
        const parsedFertilizerData = JSON.parse(storedFertilizerData);
        
        // Create a complete fertilizer object with the API data
        setFertilizerData({
          fertilizer: parsedFertilizerData.fertilizer || "Unknown Fertilizer",
          guidelines: parsedFertilizerData.guidelines || "No specific guidelines available",
          effectiveness: parsedFertilizerData.effectiveness || 85,
          organic: parsedFertilizerData.organic || parsedFertilizerData.fertilizer?.toLowerCase().includes("organic") || false,
          suitableFor: parsedFertilizerData.suitableFor || ["Rice", "Wheat", "Vegetables"],
          benefits: parsedFertilizerData.benefits || [
            "Improves plant health",
            "Enhances nutrient absorption",
            "Promotes stronger growth"
          ]
        });
        
        // Clear session storage
        sessionStorage.removeItem('fertilizerResult');
      } catch (error) {
        console.error('Error parsing fertilizer data:', error);
        toast.error("Could not load fertilizer data");
        
        // Fallback to simulated data
        const simulatedResult = simulateFertilizerRecommendation(diseaseName);
        setFertilizerData(simulatedResult);
      }
    } else {
      // No data from API, use the simulated data
      const simulatedResult = simulateFertilizerRecommendation(diseaseName);
      setFertilizerData(simulatedResult);
    }
  }, [diseaseName]);

  const currentDisease = diseaseInfo[diseaseName as keyof typeof diseaseInfo] || 
    { description: "Information about this plant condition is not available.", severity: "unknown" };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "healthy": return "text-status-healthy";
      case "mild": return "text-yellow-500";
      case "moderate": return "text-orange-500";
      case "severe": return "text-status-severe";
      default: return "text-yellow-500";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "healthy": 
        return <CheckCircle2 className="text-status-healthy" size={20} />;
      case "mild":
      case "moderate":
      case "severe":
        return <AlertTriangle className={getSeverityColor(severity)} size={20} />;
      default:
        return <Info className="text-farming-sky" size={20} />;
    }
  };

  const getEffectivenessClass = (effectiveness: number) => {
    if (effectiveness >= 85) return "bg-green-500";
    if (effectiveness >= 70) return "bg-yellow-500";
    return "bg-orange-500";
  };

  const handleBuyNow = () => {
    // For organic fertilizers, use a different Amazon link
    const amazonLink = fertilizerData.organic 
      ? "https://www.amazon.com/s?k=organic+fertilizer" 
      : "https://www.amazon.com/s?k=" + encodeURIComponent(fertilizerData.fertilizer);
      
    window.open(amazonLink, '_blank');
    toast.success("Opening product page");
  };

  // Loading state with animated skeleton
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
        
        <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
        
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
        
        <div className="h-12 bg-gray-200 rounded-lg mb-4"></div>
        
        <div className="h-16 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="mb-4">
        <div className="flex items-start">
          {getSeverityIcon(currentDisease.severity)}
          <div className="ml-2">
            <h3 className="font-bold text-lg mb-1">{diseaseName}</h3>
            <p className="text-sm text-gray-600">{currentDisease.description}</p>
          </div>
        </div>
        
        <div className="mt-3 p-3 bg-farming-green/5 rounded-lg border border-farming-green/10">
          <h4 className="font-medium text-farming-green flex items-center">
            <Info size={16} className="mr-2" />
            Recommended Solution
          </h4>
        </div>
      </div>
      
      <Card className="p-4 border border-gray-100 mb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start">
            <div className={`h-12 w-12 rounded-full ${fertilizerData.organic ? 'bg-farming-green/10' : 'bg-farming-sky/10'} flex items-center justify-center mr-3`}>
              <Droplet size={24} className={fertilizerData.organic ? 'text-farming-green' : 'text-farming-sky'} />
            </div>
            <div>
              <div className="flex items-center">
                <h4 className="font-semibold text-lg">{fertilizerData.fertilizer}</h4>
                {fertilizerData.organic && (
                  <span className="ml-2 text-xs bg-farming-green/10 text-farming-green px-2 py-0.5 rounded-full">
                    Organic
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-700 mt-1">{fertilizerData.guidelines}</p>
              
              <div className="mt-3 flex items-center">
                <div className="text-xs mr-2">Effectiveness:</div>
                <div className="w-28 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getEffectivenessClass(fertilizerData.effectiveness)}`}
                    style={{width: `${fertilizerData.effectiveness}%`}}
                  ></div>
                </div>
                <div className="text-xs ml-2 font-medium">{fertilizerData.effectiveness}%</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Benefits section */}
        <div className="mt-4 border-t border-gray-100 pt-4">
          <h5 className="font-medium text-sm mb-2 flex items-center">
            <Leaf size={16} className="mr-2 text-farming-green" />
            Benefits
          </h5>
          <ul className="text-sm text-gray-700 space-y-1">
            {fertilizerData.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-farming-gold mt-1.5 mr-2"></span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Suitable for section */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs text-gray-500 mr-1">Suitable for:</span>
          {fertilizerData.suitableFor.map((crop, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
              {crop}
            </span>
          ))}
        </div>
      </Card>
      
      <button 
        onClick={handleBuyNow}
        className="w-full bg-farming-gold text-white py-3 rounded-lg font-medium shadow-md flex items-center justify-center transition-all hover:bg-farming-gold-dark"
      >
        Buy on Amazon
        <ExternalLink size={16} className="ml-2" />
      </button>

      <div className="mt-4 bg-farming-gold/10 rounded-lg p-3">
        <p className="text-sm font-medium text-farming-gold-dark flex items-center">
          <Info size={16} className="mr-2" />
          Always follow proper safety guidelines when applying fertilizers
        </p>
      </div>
      
      {/* Application instructions */}
      <div className="mt-4 border-t border-gray-100 pt-4">
        <h5 className="font-medium mb-2">How to Apply</h5>
        <ol className="text-sm text-gray-700 space-y-2 list-decimal pl-4">
          <li>Read the product label carefully before application</li>
          <li>Wear protective gear including gloves and mask</li>
          <li>Apply in early morning or late evening for best results</li>
          <li>Water the plants thoroughly after application</li>
        </ol>
      </div>
    </div>
  );
};

export default FertilizerRecommendation;
