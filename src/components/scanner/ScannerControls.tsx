
import React from 'react';
import { Link } from "react-router-dom";
import { X, Image, Camera, Loader2 } from "lucide-react";

type TopControlsProps = {
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TopControls = ({ onFileSelect }: TopControlsProps) => {
  // Create a ref for the file input to allow programmatic clicks
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Function to trigger the file input click
  const handleGalleryClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="absolute top-6 left-0 right-0 flex justify-between px-6 z-20">
      <Link to="/" className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/10 transition-transform hover:scale-105">
        <X className="text-white" size={22} />
      </Link>
      
      <button 
        onClick={handleGalleryClick} 
        className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center cursor-pointer shadow-lg border border-white/10 transition-transform hover:scale-105"
        aria-label="Select image from gallery"
      >
        <Image className="text-white" size={22} />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileSelect}
        />
      </button>
    </div>
  );
};

type BottomControlProps = {
  onCapture: () => void;
  cameraActive: boolean;
  isScanning: boolean;
  cameraLoading?: boolean;
};

export const BottomControl = ({ onCapture, cameraActive, isScanning, cameraLoading }: BottomControlProps) => {
  return (
    <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
      <button 
        onClick={onCapture}
        disabled={isScanning || cameraLoading}
        className={`h-20 w-20 rounded-full flex items-center justify-center transition-all duration-300 ${(isScanning || cameraLoading) ? 'opacity-70' : 'transform hover:scale-105'}`}
      >
        {/* 3D button effect with multi-layered design */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-farming-green-dark to-farming-green-light opacity-80 shadow-lg"></div>
        <div className="absolute inset-1 rounded-full bg-gradient-to-b from-white/20 to-transparent"></div>
        <div className="absolute inset-0 rounded-full shadow-[0_0_20px_5px_rgba(76,175,80,0.3)]"></div>
        
        <div className="relative h-16 w-16 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
          {isScanning ? (
            <Loader2 size={30} className="text-white animate-spin" />
          ) : cameraLoading ? (
            <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <div className={`h-12 w-12 rounded-full ${cameraActive ? 'bg-farming-green-light' : 'bg-white/30'} flex items-center justify-center transition-all duration-300`}>
              <Camera size={30} className="text-white" />
            </div>
          )}
        </div>
      </button>
      
      {/* Scanning progress indicator */}
      {isScanning && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-40 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 flex items-center justify-center">
          <div className="mr-2 animate-pulse">
            <div className="h-2 w-2 rounded-full bg-farming-green-light"></div>
          </div>
          <p className="text-white text-xs font-medium">Processing image...</p>
        </div>
      )}
      
      {/* Camera initialization indicator */}
      {cameraLoading && !isScanning && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-40 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 flex items-center justify-center">
          <div className="mr-2 animate-pulse">
            <div className="h-2 w-2 rounded-full bg-farming-green-light"></div>
          </div>
          <p className="text-white text-xs font-medium">Starting camera...</p>
        </div>
      )}
    </div>
  );
};
