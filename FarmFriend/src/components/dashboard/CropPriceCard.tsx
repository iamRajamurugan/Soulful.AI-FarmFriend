
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface CropPriceCardProps {
  cropName: string;
  currentPrice: number;
  change: number;
  currency?: string;
}

const CropPriceCard = ({
  cropName,
  currentPrice,
  change,
  currency = "₹",
}: CropPriceCardProps) => {
  const isPositive = change >= 0;
  const formattedChange = Math.abs(change).toFixed(1);

  return (
    <Card className="premium-card hover:shadow-md transition-all duration-200">
      <CardHeader className="p-3 pb-1 flex flex-row items-center justify-between">
        <h3 className="font-bold text-sm">{cropName}</h3>
        {isPositive ? (
          <TrendingUp size={16} className="text-status-healthy" />
        ) : (
          <TrendingDown size={16} className="text-status-severe" />
        )}
      </CardHeader>
      <CardContent className="p-3 pt-1">
        <div className="flex items-baseline">
          <p className="text-lg font-bold">
            {currency} {currentPrice.toLocaleString()}
          </p>
          <span 
            className={`ml-2 text-xs font-medium ${
              isPositive ? "text-status-healthy" : "text-status-severe"
            }`}
          >
            {isPositive ? "+" : "-"}{formattedChange}%
          </span>
        </div>
        <div className="mt-2 h-6 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full ${isPositive ? "bg-farming-green-light" : "bg-status-severe"} rounded-full`}
            style={{ width: `${Math.min(Math.abs(change * 2), 100)}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CropPriceCard;
