
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface MarketGraphProps {
  cropName: string;
}

const MarketGraph = ({ cropName }: MarketGraphProps) => {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");
  
  // Sample data
  const generateData = () => {
    const monthData = [
      { day: "Jul 01", price: 2250 },
      { day: "Jul 05", price: 2300 },
      { day: "Jul 10", price: 2400 },
      { day: "Jul 15", price: 2350 },
      { day: "Jul 20", price: 2450 },
      { day: "Jul 25", price: 2500 },
      { day: "Aug 01", price: 2550 },
    ];
    
    const weekData = [
      { day: "Mon", price: 2500 },
      { day: "Tue", price: 2520 },
      { day: "Wed", price: 2480 },
      { day: "Thu", price: 2550 },
      { day: "Fri", price: 2570 },
      { day: "Sat", price: 2550 },
      { day: "Sun", price: 2580 },
    ];
    
    const yearData = [
      { day: "Jan", price: 2100 },
      { day: "Feb", price: 2150 },
      { day: "Mar", price: 2200 },
      { day: "Apr", price: 2250 },
      { day: "May", price: 2300 },
      { day: "Jun", price: 2350 },
      { day: "Jul", price: 2450 },
      { day: "Aug", price: 2550 },
    ];
    
    switch (timeRange) {
      case "week":
        return weekData;
      case "month":
        return monthData;
      case "year":
        return yearData;
    }
  };
  
  const data = generateData();
  
  // Calculate if the current price is higher than the starting price
  const isPriceUp = data[data.length - 1].price > data[0].price;
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-md rounded-md border border-gray-100">
          <p className="text-sm font-semibold">{`₹${payload[0].value}`}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">{cropName} Price Trend</h3>
        <div className="flex rounded-lg overflow-hidden border border-gray-200">
          {(["week", "month", "year"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-xs font-medium ${
                timeRange === range 
                  ? "bg-farming-green text-white" 
                  : "bg-white text-gray-600"
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12 }} 
            />
            <YAxis 
              hide={true} 
              domain={[(dataMin: number) => dataMin * 0.95, (dataMax: number) => dataMax * 1.05]} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke={isPriceUp ? "#4CAF50" : "#F44336"} 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 border-t border-gray-100 pt-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Current Price</p>
            <p className="text-xl font-bold">₹ {data[data.length - 1].price}</p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-500">Price Change</p>
            <p className={`text-base font-semibold ${isPriceUp ? 'text-status-healthy' : 'text-status-severe'}`}>
              {isPriceUp ? '+' : ''}
              {((data[data.length - 1].price - data[0].price) / data[0].price * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 bg-gray-50 rounded-lg p-3">
        <p className="text-sm font-medium text-farming-green-dark">
          Best Time to Sell: <span className="gold-accent">Next 2 weeks</span>
        </p>
        <p className="text-xs text-gray-600 mt-1">
          AI prediction based on historical data and market trends.
        </p>
      </div>
    </div>
  );
};

export default MarketGraph;
