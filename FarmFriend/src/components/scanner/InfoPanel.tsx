
import React from "react";
import { Info, Leaf, Camera, ImagePlus, AlertTriangle } from "lucide-react";

type InfoPanelProps = {
  selectedImage: File | null;
  cameraActive: boolean;
  permissionDenied: boolean;
  isScanning: boolean;
};

const InfoPanel = ({ selectedImage, cameraActive, permissionDenied, isScanning }: InfoPanelProps) => {
  // Don't show the panel when scanning is in progress
  if (isScanning) {
    return null;
  }
  
  // Select the appropriate icon based on the current state
  const IconComponent = selectedImage ? Leaf : 
                       permissionDenied ? AlertTriangle :
                       cameraActive ? Camera : ImagePlus;
  
  // Dynamic instructions based on user's current state
  const getInstructionText = () => {
    if (permissionDenied) {
      return "Camera access denied. Please check your browser settings or use the gallery option to select an image.";
    }
    
    if (selectedImage) {
      return "Tap the green button below to analyze the image with AI. Our model will identify any plant diseases.";
    }
    
    if (cameraActive) {
      return "Center the plant leaf in the frame. Keep the camera steady and ensure good lighting for best results.";
    }
    
    return "Start by tapping the camera button below or select an image from your gallery to scan for plant diseases.";
  };

  return (
    <div className="bg-black/60 backdrop-blur-md p-4 rounded-t-2xl shadow-lg">
      <div className="flex items-start space-x-3 max-w-lg mx-auto">
        <div className={`h-8 w-8 rounded-full ${permissionDenied ? 'bg-red-500/20' : 'bg-farming-green/20'} flex-shrink-0 flex items-center justify-center`}>
          <IconComponent size={18} className={permissionDenied ? "text-red-400" : "text-farming-green-light"} />
        </div>
        
        <div className="flex-1">
          <h3 className="text-white text-sm font-medium mb-1">
            {permissionDenied ? "Camera Access Required" : 
             selectedImage ? "Ready to Analyze" : 
             cameraActive ? "Position the Leaf" : "Start Scanning"}
          </h3>
          <p className="text-white/80 text-xs leading-relaxed">
            {getInstructionText()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
