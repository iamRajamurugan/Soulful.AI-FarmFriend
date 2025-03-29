
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

export function useCamera() {
  const [cameraActive, setCameraActive] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [cameraLoading, setCameraLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Check camera permission on component mount
    checkCameraPermission();
    
    // Cleanup function to stop the camera when component unmounts
    return () => {
      stopCamera();
    };
  }, []);

  const checkCameraPermission = async () => {
    try {
      // Just check if we can get permission without starting the stream
      await navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        // Stop the stream immediately after checking
        stream.getTracks().forEach(track => track.stop());
      });
      // If we get here, permission was granted previously
      setPermissionDenied(false);
    } catch (error) {
      console.log("Initial camera permission check:", error);
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        setPermissionDenied(true);
      }
      // We don't set permissionDenied for other errors as it might just be that the user hasn't been asked yet
    }
  };

  const startCamera = async () => {
    if (cameraActive) return; // Don't start camera if already active
    
    setCameraLoading(true);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast.error("Camera access is not supported by this browser");
        setCameraLoading(false);
        return;
      }
      
      const constraints = {
        video: {
          facingMode: isMobile ? "environment" : "user", // Use rear camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
          focusMode: 'continuous' as any
        }
      };
      
      console.log("Starting camera with constraints:", constraints);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play().then(() => {
              setCameraActive(true);
              setPermissionDenied(false);
              setCameraLoading(false);
              toast.success("Camera started successfully");
            }).catch(e => {
              console.error("Error playing video:", e);
              toast.error("Could not start video stream");
              setCameraLoading(false);
            });
          }
        };
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraLoading(false);
      
      if (error instanceof DOMException && error.name === 'NotAllowedError') {
        setPermissionDenied(true);
        toast.error("Camera permission denied. Please enable camera access in your browser settings.");
      } else {
        toast.error("Failed to access camera. Please check permissions or try a different browser.");
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setCameraActive(false);
  };

  const captureFromCamera = () => {
    if (!cameraActive) {
      startCamera();
      return null;
    }
    
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      console.log(`Capturing image at ${canvas.width}x${canvas.height}`);
      
      // Draw current video frame to canvas
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to blob
        return new Promise<File | null>((resolve) => {
          canvas.toBlob((blob) => {
            if (blob) {
              // Create File object from Blob
              const timestamp = new Date().toISOString();
              const capturedImage = new File([blob], `plant-scan-${timestamp}.jpg`, { type: "image/jpeg" });
              setSelectedImage(capturedImage);
              
              // Stop camera after capturing
              stopCamera();
              
              toast.success("Image captured successfully");
              console.log("Image captured successfully:", capturedImage.name, capturedImage.size, "bytes");
              resolve(capturedImage);
            } else {
              toast.error("Failed to capture image");
              console.error("Failed to create blob from canvas");
              resolve(null);
            }
          }, 'image/jpeg', 0.95);
        });
      }
    }
    return null;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      
      // Validate file is an image
      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file");
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image is too large. Maximum size is 5MB");
        return;
      }
      
      setSelectedImage(file);
      console.log("File selected:", file.name, file.size, "bytes", file.type);
      toast.success("Image selected from gallery");
      
      // Stop camera if running
      if (cameraActive) {
        stopCamera();
      }
      
      // Reset the input value to allow selecting the same file again
      event.target.value = '';
    }
  };

  return {
    cameraActive,
    permissionDenied,
    selectedImage,
    cameraLoading,
    videoRef,
    canvasRef,
    setSelectedImage,
    startCamera,
    stopCamera,
    captureFromCamera,
    handleFileSelect
  };
}
