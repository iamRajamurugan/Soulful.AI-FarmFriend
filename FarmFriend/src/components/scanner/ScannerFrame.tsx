
import React from "react";
import { Leaf, ScanSearch, Camera } from "lucide-react";

type ScannerFrameProps = {
  selectedImage: File | null;
  cameraActive: boolean;
  isScanning: boolean;
};

const ScannerFrame = ({ selectedImage, cameraActive, isScanning }: ScannerFrameProps) => {
  // Determine which icon to show based on the state
  const Icon = isScanning ? ScanSearch : cameraActive ? Camera : Leaf;
  
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-md aspect-[3/4] mx-auto relative">
        {/* Modern frame design */}
        <div className={`absolute inset-0 rounded-3xl border-2 ${isScanning ? 'border-farming-green/60 animate-pulse' : 'border-white/40'} shadow-lg`}>
          {/* Corner points for the scanning frame */}
          <div className={`absolute top-0 left-0 w-10 h-10 border-t-3 border-l-3 ${isScanning ? 'border-farming-green animate-pulse' : 'border-farming-green'} rounded-tl-xl`}></div>
          <div className={`absolute top-0 right-0 w-10 h-10 border-t-3 border-r-3 ${isScanning ? 'border-farming-green animate-pulse' : 'border-farming-green'} rounded-tr-xl`}></div>
          <div className={`absolute bottom-0 left-0 w-10 h-10 border-b-3 border-l-3 ${isScanning ? 'border-farming-green animate-pulse' : 'border-farming-green'} rounded-bl-xl`}></div>
          <div className={`absolute bottom-0 right-0 w-10 h-10 border-b-3 border-r-3 ${isScanning ? 'border-farming-green animate-pulse' : 'border-farming-green'} rounded-br-xl`}></div>
          
          {/* Scan line animation when scanning is active */}
          {isScanning && (
            <div className="absolute inset-x-8 h-1 bg-farming-green-light top-1/2 animate-scan-line rounded-full opacity-70 shadow-[0_0_8px_2px_rgba(76,175,80,0.5)]"></div>
          )}
          
          {/* Active frame indicators - only show when camera is active */}
          {cameraActive && !isScanning && (
            <>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-px bg-white/40"></div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-px bg-white/40"></div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-px h-1/3 bg-white/40"></div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-1/3 bg-white/40"></div>
            </>
          )}
          
          {/* Focus points when camera is active */}
          {cameraActive && !isScanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 border border-dashed border-farming-green-light/60 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
        
        {/* Status indicator in the center */}
        {!selectedImage && !cameraActive && !isScanning && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-center z-10 pointer-events-none">
            <div className="bg-black/40 backdrop-blur-sm p-4 rounded-xl transform transition-all duration-300">
              <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-tr from-farming-green to-farming-green-light flex items-center justify-center mb-3 shadow-[0_0_15px_5px_rgba(76,175,80,0.3)]">
                <Icon className="text-white animate-pulse-gentle" size={32} />
              </div>
              <p className="text-base font-semibold mb-1">
                Ready to Scan
              </p>
              <p className="text-xs opacity-90 max-w-[220px]">
                Position the leaf in the center of the frame for best results
              </p>
            </div>
          </div>
        )}
        
        {/* Scanning status - only shown when scanning */}
        {isScanning && (
          <div className="absolute inset-0 flex items-center justify-center text-white text-center z-10 pointer-events-none">
            <div className="bg-black/40 backdrop-blur-sm p-4 rounded-xl transform transition-all duration-300">
              <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-tr from-farming-green to-farming-green-light flex items-center justify-center mb-3 shadow-[0_0_15px_5px_rgba(76,175,80,0.3)]">
                <ScanSearch className="text-white animate-pulse" size={32} />
              </div>
              <p className="text-base font-semibold mb-1">
                Analyzing Image...
              </p>
              <p className="text-xs opacity-90 max-w-[220px]">
                Please hold still while we process your image
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScannerFrame;
