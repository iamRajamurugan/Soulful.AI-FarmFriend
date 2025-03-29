
import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import DiseaseMap from "@/components/heatmap/DiseaseMap";
import { Search, Filter } from "lucide-react";

const Heatmap = () => {
  const [selectedDisease, setSelectedDisease] = useState("all");
  
  const diseases = [
    { id: "all", name: "All Diseases" },
    { id: "blast", name: "Rice Blast" },
    { id: "blight", name: "Potato Blight" },
    { id: "rust", name: "Wheat Rust" },
    { id: "wilt", name: "Cotton Wilt" },
  ];
  
  return (
    <PageContainer>
      <div className="bg-farming-green text-white p-4 pt-8">
        <h1 className="text-xl font-bold mb-2">Disease Heatmap</h1>
        <p className="text-sm opacity-90">
          Track disease outbreaks in your region
        </p>
        
        <div className="mt-4 flex">
          <div className="relative flex-1 mr-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-white/10 w-full pl-10 pr-4 py-2 rounded-lg text-white placeholder-white/70 outline-none border border-white/20"
              placeholder="Search location..."
            />
          </div>
          <button className="bg-white/10 px-3 rounded-lg border border-white/20 flex items-center">
            <Filter size={18} />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex overflow-x-auto pb-2 -mx-1 hide-scrollbar mb-4">
          {diseases.map((disease) => (
            <button
              key={disease.id}
              onClick={() => setSelectedDisease(disease.id)}
              className={`flex-shrink-0 mx-1 px-4 py-2 rounded-full text-sm font-medium ${
                selectedDisease === disease.id
                  ? "bg-farming-green text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {disease.name}
            </button>
          ))}
        </div>
        
        <DiseaseMap />
        
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-3">Recent Outbreaks</h3>
          
          <div className="space-y-3">
            {[
              { disease: "Rice Blast", location: "Andhra Pradesh", severity: "severe", date: "2 days ago", cases: 23 },
              { disease: "Wheat Rust", location: "Punjab", severity: "mild", date: "1 week ago", cases: 7 },
              { disease: "Potato Blight", location: "Uttar Pradesh", severity: "severe", date: "5 days ago", cases: 15 },
            ].map((outbreak, index) => (
              <div key={index} className="premium-card">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{outbreak.disease}</h4>
                    <p className="text-xs text-gray-500">{outbreak.location}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    outbreak.severity === "severe" 
                      ? "bg-red-100 text-status-severe" 
                      : "bg-yellow-100 text-status-mild"
                  }`}>
                    {outbreak.severity}
                  </div>
                </div>
                <div className="mt-2 flex justify-between text-xs">
                  <span className="text-gray-500">{outbreak.date}</span>
                  <span className="font-medium">{outbreak.cases} reports</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Heatmap;
