
import React from "react";
import BottomNavigation from "./BottomNavigation";

interface PageContainerProps {
  children: React.ReactNode;
  showNav?: boolean;
  className?: string;
}

const PageContainer = ({ 
  children, 
  showNav = true, 
  className = "" 
}: PageContainerProps) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="pb-20 min-h-screen">
        {children}
      </div>
      {showNav && <BottomNavigation />}
    </div>
  );
};

export default PageContainer;
