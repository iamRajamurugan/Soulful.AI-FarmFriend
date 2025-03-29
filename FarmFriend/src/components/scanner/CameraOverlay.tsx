import { useState, useEffect } from "react";
import { Camera, AlertCircle, ImagePlus } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCamera } from "@/hooks/use-camera";
import { TopControls, BottomControl } from "@/components/scanner/ScannerControls";
import ScannerFrame from "@/components/scanner/ScannerFrame";
import InfoPanel from "@/components/scanner/InfoPanel";
import { Progress } from "@/components/ui/progress";

const CameraOverlay = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [processingStep, setProcessingStep] = useState<'capturing' | 'analyzing' | 'complete'>('capturing');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const {
    cameraActive,
    permissionDenied,
    selectedImage,
    cameraLoading,
    videoRef,
    canvasRef,
    captureFromCamera,
    startCamera,
    handleFileSelect
  } = useCamera();
  
  // Auto-start camera when component mounts
  useEffect(() => {
    if (!cameraActive && !selectedImage && !cameraLoading && !permissionDenied) {
      startCamera().catch(err => {
        console.error('Failed to auto-start camera:', err);
        setCameraError('Could not start camera automatically. Tap the button to try again.');
      });
    }
  }, [cameraActive, selectedImage]);
  
  // Reset progress when not scanning
  useEffect(() => {
    if (!isScanning) {
      setScanProgress(0);
      setProcessingStep('capturing');
      return;
    }
    
    // Simulate progress for better UX
    const interval = setInterval(() => {
      setScanProgress(prev => {
        // Adjust progress based on current processing step
        const progressMap = {
          'capturing': 30,
          'analyzing': 70,
          'complete': 100
        };
        
        const maxForCurrentStep = progressMap[processingStep];
        const newProgress = prev + Math.random() * 5;
        return newProgress > maxForCurrentStep ? maxForCurrentStep : newProgress;
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, [isScanning, processingStep]);
  
  // Handle image capture and processing
  const handleCapture = async () => {
    if (isScanning) {
      // Don't allow multiple capture attempts while scanning
      return;
    }
    
    if (cameraActive) {
      setProcessingStep('capturing');
      setIsScanning(true);
      setScanProgress(5);
      
      const capturedImage = await captureFromCamera();
      
      if (!capturedImage) {
        setIsScanning(false);
        toast.error("Failed to capture image. Please try again.");
        return;
      }
      
      // Continue with processing the captured image
      processImage(capturedImage);
      return;
    }
    
    if (!selectedImage) {
      // If no image is selected and camera is not active, start camera
      if (!cameraActive) {
        try {
          await startCamera();
        } catch (error) {
          console.error("Error starting camera:", error);
          toast.error("Could not start camera. Please try selecting an image from your gallery.");
        }
        return;
      }
      
      toast.error("Please capture an image or select one from your gallery first");
      return;
    }
    
    // Process the selected image
    setIsScanning(true);
    setScanProgress(10);
    processImage(selectedImage);
  };
  
  const processImage = async (image: File) => {
    setProcessingStep('analyzing');
    
    toast.info("Processing image...", {
      icon: <Camera size={18} className="text-farming-green" />
    });
    
    try {
      // Convert the image to a base64 string and store it in sessionStorage
      const reader = new FileReader();
      reader.onloadend = function() {
        // Save the base64 image to session storage
        sessionStorage.setItem('scannedImage', reader.result as string);
        
        // Complete the progress
        setProcessingStep('complete');
        setScanProgress(100);
        
        // Navigate to the result page
        setTimeout(() => {
          navigate('/scanner/result');
        }, 500);
      };
      reader.readAsDataURL(image);
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error("Failed to process image. Please try again.", {
        icon: <AlertCircle size={18} className="text-red-500" />
      });
      
      setIsScanning(false);
    }
  };

  // Helper function to get appropriate progress message
  const getProgressMessage = () => {
    switch (processingStep) {
      case 'capturing':
        return "Preparing image...";
      case 'analyzing':
        return "Processing image...";
      case 'complete':
        return "Analysis complete!";
      default:
        return "Processing...";
    }
  };

  return (
    <div className="relative h-full w-full bg-gradient-to-b from-black/90 to-black">
      {/* Camera Viewfinder */}
      <div className="h-full w-full flex items-center justify-center">
        {selectedImage ? (
          <div className="relative h-full w-full">
            <img 
              src={URL.createObjectURL(selectedImage)} 
              alt="Selected plant" 
              className="h-full w-full object-contain" 
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ) : cameraActive ? (
          <div className="relative h-full w-full">
            <video 
              ref={videoRef} 
              className="h-full w-full object-cover" 
              playsInline 
              autoPlay
              muted
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ) : (
          <div className="text-white text-center p-8 max-w-md mx-auto">
            <div className="h-16 w-16 rounded-full bg-farming-green/20 mx-auto mb-4 flex items-center justify-center">
              {cameraLoading ? (
                <div className="h-8 w-8 rounded-full border-2 border-t-transparent border-farming-green-light animate-spin"></div>
              ) : permissionDenied ? (
                <AlertCircle size={32} className="text-red-400" />
              ) : (
                <Camera size={32} className="text-farming-green-light opacity-80" />
              )}
            </div>
            <h2 className="text-xl font-semibold mb-2">
              {cameraLoading ? "Starting Camera..." : 
               permissionDenied ? "Camera Access Needed" : 
               cameraError ? "Camera Error" : "Ready to Scan"}
            </h2>
            <p className="text-white/70 text-sm mb-4">
              {cameraLoading ? "Please wait while we initialize your camera..." :
               permissionDenied ? "Please enable camera access in your browser settings to scan plants" :
               cameraError ? cameraError :
               "Our AI model can identify plant diseases from leaf images"}
            </p>
            <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-xs text-white/80">
                {cameraLoading ? "Initializing camera..." :
                 permissionDenied ? "Or use the gallery option to select an existing image" :
                 "Tap the button below to start scanning or use the gallery icon to select an image"}
              </p>
              
              {permissionDenied && (
                <button
                  onClick={() => handleFileSelect({ target: { files: null } } as any)}
                  className="mt-3 flex items-center justify-center mx-auto bg-farming-green/80 rounded-full px-4 py-2 text-white text-sm"
                >
                  <ImagePlus size={16} className="mr-2" />
                  Select from Gallery
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* Hidden canvas for capturing images */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
      
      {/* Scanning progress bar - only shown when scanning */}
      {isScanning && (
        <div className="absolute top-20 left-6 right-6 z-30">
          <div className="bg-black/60 backdrop-blur-md rounded-lg p-3 shadow-lg">
            <div className="flex items-center mb-2">
              <div className="animate-pulse mr-2">
                <div className="h-3 w-3 rounded-full bg-farming-green-light"></div>
              </div>
              <p className="text-white text-xs font-medium">{getProgressMessage()}</p>
              <span className="ml-auto text-white/70 text-xs">{Math.round(scanProgress)}%</span>
            </div>
            <Progress value={scanProgress} className="h-2 bg-white/20" />
          </div>
        </div>
      )}
      
      {/* AR Scanner Guide Overlay - only shown when camera is active and not scanning */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full flex flex-col">
          {/* Scanning frame */}
          <ScannerFrame 
            selectedImage={selectedImage} 
            cameraActive={cameraActive} 
            isScanning={isScanning} 
          />
          
          {/* Instruction panel */}
          <InfoPanel 
            selectedImage={selectedImage} 
            cameraActive={cameraActive} 
            permissionDenied={permissionDenied} 
            isScanning={isScanning}
          />
        </div>
      </div>
      
      {/* Top Controls */}
      <TopControls onFileSelect={handleFileSelect} />
      
      {/* Bottom control */}
      <BottomControl 
        onCapture={handleCapture} 
        cameraActive={cameraActive} 
        isScanning={isScanning}
        cameraLoading={cameraLoading}
      />
    </div>
  );
};

export default CameraOverlay;
