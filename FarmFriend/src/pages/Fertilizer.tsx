
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import FertilizerRecommendation from "@/components/fertilizer/FertilizerRecommendation";
import { Leaf, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Fertilizer = () => {
  const location = useLocation();
  const [showEntryAnimation, setShowEntryAnimation] = useState(false);
  const [disease, setDisease] = useState("Bacterial Leaf Blight"); // Default disease
  
  // Check if coming from scanner with disease data
  useEffect(() => {
    if (location.state?.fromScanner) {
      setShowEntryAnimation(true);
      if (location.state.disease) {
        setDisease(location.state.disease);
      }
      
      // Remove animation after it completes
      const timer = setTimeout(() => {
        setShowEntryAnimation(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [location]);

  // Also try to get disease from sessionStorage if available (for refresh cases)
  useEffect(() => {
    const storedDiseaseData = sessionStorage.getItem('diseaseResult');
    if (storedDiseaseData && !location.state?.disease) {
      try {
        const parsedDiseaseData = JSON.parse(storedDiseaseData);
        if (parsedDiseaseData.disease) {
          setDisease(parsedDiseaseData.disease);
        }
      } catch (error) {
        console.error('Error parsing disease data:', error);
      }
    }
  }, []);

  return (
    <PageContainer>
      {/* Entry animation overlay when coming from scanner */}
      {showEntryAnimation && (
        <div className="fixed inset-0 bg-farming-green/95 z-50 flex flex-col items-center justify-center animate-fade-out">
          <div className="h-24 w-24 rounded-full bg-white/20 flex items-center justify-center mb-4">
            <CheckCircle2 size={56} className="text-white animate-scale-in" />
          </div>
          <h2 className="text-white text-2xl font-bold mb-2 animate-scale-in">Analysis Complete!</h2>
          <p className="text-white/80 text-center max-w-xs animate-scale-in">
            We've generated personalized fertilizer recommendations for your crop
          </p>
        </div>
      )}
      
      {/* Header */}
      <div className="bg-farming-green text-white p-4 pt-8 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <ArrowLeft size={20} className="mr-2" />
          <span className="font-medium">Back</span>
        </Link>
        <h1 className="text-xl font-bold flex items-center">
          <Leaf size={20} className="mr-2" />
          Fertilizer Recommendations
        </h1>
        <div className="w-10"></div>
      </div>
      
      {/* Main content */}
      <div className="p-4">
        <FertilizerRecommendation diseaseName={disease} />
      </div>
    </PageContainer>
  );
};

export default Fertilizer;
