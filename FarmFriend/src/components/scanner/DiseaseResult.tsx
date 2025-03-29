
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface DiseaseResultProps {
  imageUrl?: string;
}

const DiseaseResult = (props: DiseaseResultProps) => {
  // API URL - update this to your deployed backend URL
  const API_URL = "http://localhost:8000";
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [result, setResult] = useState({
    status: "",
    imageUrl: props.imageUrl || "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
  });

  useEffect(() => {
    const processImage = async () => {
      setLoading(true);
      setError(false);
      
      try {
        // Get the stored image data from session storage
        const storedImage = sessionStorage.getItem('scannedImage');
        let imageToProcess;
        let imageUrl;
        
        if (storedImage) {
          // Convert the base64 string back to a blob
          const byteString = atob(storedImage.split(',')[1]);
          const mimeString = storedImage.split(',')[0].split(':')[1].split(';')[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          
          const blob = new Blob([ab], { type: mimeString });
          imageToProcess = new File([blob], "scanned-image.jpg", { type: mimeString });
          imageUrl = storedImage;
        } else {
          // No image found in session storage
          throw new Error("No image data found");
        }

        // Create form data for the API request
        const formData = new FormData();
        formData.append('file', imageToProcess);
        
        // Send the image to the API
        const response = await fetch(`${API_URL}/predict-disease`, {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Update the result state with the API response
        setResult({
          status: data.result,
          imageUrl: imageUrl
        });
        
        // Clear the session storage
        sessionStorage.removeItem('scannedImage');
      } catch (error) {
        console.error('Error processing image:', error);
        setError(true);
        toast.error("Error getting prediction result");
      } finally {
        setLoading(false);
      }
    };

    processImage();
  }, []);

  const handleRetry = () => {
    window.location.href = "/scanner";
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-farming-green text-white p-4 flex items-center">
        <Link to="/scanner" className="flex items-center">
          <ArrowLeft size={20} className="mr-2" />
          <span className="font-medium">Back</span>
        </Link>
        <h1 className="text-lg font-bold mx-auto">Crop Analysis</h1>
      </div>
      
      {/* Crop Image */}
      <div className="relative">
        <img 
          src={result.imageUrl} 
          alt="Scanned crop" 
          className="w-full h-64 object-cover"
        />
      </div>
      
      {/* Prediction Result */}
      <div className="p-5">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-40">
            <div className="w-12 h-12 border-4 border-farming-green border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Analyzing your crop...</p>
          </div>
        ) : error ? (
          <div className="text-center p-6">
            <div className="mb-4 text-red-500 text-lg font-bold">Analysis Failed</div>
            <p className="text-gray-600 mb-6">Unable to process your image. Please try again.</p>
            <button 
              onClick={handleRetry}
              className="bg-farming-green text-white py-3 px-6 rounded-lg font-medium"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="mb-4 text-center">
            {result.status === "Healthy Plant" ? (
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h2 className="text-2xl font-bold text-green-600">✅ Healthy Crop</h2>
                <p className="text-green-700 mt-2">Your crop appears to be healthy.</p>
              </div>
            ) : (
              <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                <h2 className="text-2xl font-bold text-red-600">❌ Unhealthy Plant</h2>
                <p className="text-red-700 mt-2">Your crop may have a disease.</p>
              </div>
            )}
            
            {/* Simple Retry Button */}
            <div className="mt-8 flex justify-center">
              <Link to="/scanner">
                <button className="bg-farming-green text-white py-3 px-6 rounded-lg font-medium">
                  Scan Another Crop
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseResult;
