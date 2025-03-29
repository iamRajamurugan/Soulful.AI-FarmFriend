
import { Camera, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const DiseaseScanner = () => {
  return (
    <div className="mt-6 mx-4">
      <h2 className="text-lg font-bold mb-3 flex items-center">
        <Leaf size={20} className="mr-2 text-farming-green" />
        Disease Detection
      </h2>
      <Link 
        to="/scanner"
        className="relative block rounded-xl overflow-hidden shadow-md bg-gradient-to-r from-farming-green to-farming-green-dark text-white h-36"
        aria-label="Open camera scanner"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative h-full flex flex-col items-center justify-center">
          <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center mb-2 pulse-ring">
            <Camera size={42} className="animate-pulse-gentle" />
          </div>
          <p className="font-semibold text-lg">Scan Your Crops</p>
          <p className="text-sm opacity-90">Tap to detect plant diseases</p>
        </div>
      </Link>
    </div>
  );
};

export default DiseaseScanner;
