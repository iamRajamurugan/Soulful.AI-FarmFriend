
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import CropPriceCard from "./CropPriceCard";

const CropPricesList = () => {
  const cropPrices = [
    { id: 1, name: "Rice", price: 2100, change: 3.2 },
    { id: 2, name: "Wheat", price: 2350, change: -1.5 },
    { id: 3, name: "Cotton", price: 6800, change: 2.8 },
  ];

  return (
    <div className="mt-6 mx-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">Crop Price Trends</h2>
        <Link to="/market" className="text-farming-green flex items-center text-sm font-medium">
          View All
          <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {cropPrices.map((crop) => (
          <CropPriceCard
            key={crop.id}
            cropName={crop.name}
            currentPrice={crop.price}
            change={crop.change}
          />
        ))}
      </div>
    </div>
  );
};

export default CropPricesList;
