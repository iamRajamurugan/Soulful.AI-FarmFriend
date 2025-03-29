
import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import MarketGraph from "@/components/market/MarketGraph";
import { Search, ArrowUpDown } from "lucide-react";

const Market = () => {
  const [selectedCrop, setSelectedCrop] = useState("Rice");
  
  const crops = [
    { id: 1, name: "Rice" },
    { id: 2, name: "Wheat" },
    { id: 3, name: "Cotton" },
    { id: 4, name: "Maize" },
    { id: 5, name: "Soybean" },
  ];
  
  return (
    <PageContainer>
      <div className="bg-farming-green text-white p-4 pt-8">
        <h1 className="text-xl font-bold mb-2">Market Prices</h1>
        <p className="text-sm opacity-90">
          Real-time prices and market insights
        </p>
        
        <div className="mt-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-white/10 w-full pl-10 pr-4 py-2 rounded-lg text-white placeholder-white/70 outline-none border border-white/20"
            placeholder="Search crops..."
          />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Select Crop</h2>
          <button className="flex items-center text-sm text-gray-600">
            <ArrowUpDown size={16} className="mr-1" />
            Sort
          </button>
        </div>
        
        <div className="flex overflow-x-auto pb-2 -mx-1 hide-scrollbar">
          {crops.map((crop) => (
            <button
              key={crop.id}
              onClick={() => setSelectedCrop(crop.name)}
              className={`flex-shrink-0 mx-1 px-4 py-2 rounded-full text-sm font-medium ${
                selectedCrop === crop.name
                  ? "bg-farming-green text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {crop.name}
            </button>
          ))}
        </div>
        
        <div className="mt-4">
          <MarketGraph cropName={selectedCrop} />
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-3">Nearby Markets</h3>
          
          <div className="space-y-3">
            {[
              { name: "Central Farmers Market", price: 2580, distance: "3.2 km" },
              { name: "Agricultural Produce Market", price: 2550, distance: "5.7 km" },
              { name: "Rural Commodity Exchange", price: 2600, distance: "8.1 km" },
            ].map((market, index) => (
              <div key={index} className="premium-card flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">{market.name}</h4>
                  <p className="text-xs text-gray-500">{market.distance} away</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹ {market.price}</p>
                  <p className="text-xs text-gray-500">per quintal</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Market;
