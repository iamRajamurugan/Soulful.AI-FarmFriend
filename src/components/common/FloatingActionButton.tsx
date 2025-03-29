
import { Camera } from "lucide-react";
import { Link } from "react-router-dom";

const FloatingActionButton = () => {
  return (
    <>
      {/* Scanner Button */}
      <Link
        to="/scanner"
        className="fixed bottom-24 right-4 z-20 h-16 w-16 rounded-full bg-farming-green text-white shadow-xl flex items-center justify-center glow-effect"
        aria-label="Open Disease Scanner"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-farming-green-dark to-farming-green-light opacity-90"></div>
        <div className="absolute inset-0 rounded-full pulse-ring"></div>
        <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center">
          <Camera size={28} className="relative z-10 animate-pulse-gentle" />
        </div>
      </Link>
    </>
  );
};

export default FloatingActionButton;
