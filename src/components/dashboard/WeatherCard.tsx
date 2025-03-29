
import { Cloud, Droplets, Sun, Wind } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface WeatherCardProps {
  location?: string;
  temperature?: number;
  condition?: string;
  humidity?: number;
  windSpeed?: number;
}

const WeatherCard = ({
  location = "Mumbai",
  temperature = 28,
  condition = "Partly Cloudy",
  humidity = 65,
  windSpeed = 12,
}: WeatherCardProps) => {
  const getWeatherIcon = () => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="text-yellow-500" size={24} />;
      case "cloudy":
        return <Cloud className="text-gray-400" size={24} />;
      case "partly cloudy":
        return (
          <div className="relative">
            <Cloud className="text-gray-400" size={24} />
            <Sun className="text-yellow-500 absolute -top-1 -right-1" size={14} />
          </div>
        );
      default:
        return <Cloud className="text-gray-400" size={24} />;
    }
  };

  return (
    <Card className="premium-card overflow-hidden">
      <CardHeader className="p-3 pb-0 flex flex-row items-center justify-between">
        <h3 className="font-semibold text-sm">Current Weather</h3>
        {getWeatherIcon()}
      </CardHeader>
      <CardContent className="p-3">
        <div className="flex items-center mb-2">
          <p className="text-2xl font-bold">{temperature}°C</p>
          <p className="ml-2 text-sm text-gray-600">{condition}</p>
        </div>
        <p className="text-xs text-gray-500 mb-2">{location}</p>
        <div className="flex justify-between text-xs text-gray-600">
          <div className="flex items-center">
            <Droplets size={14} className="mr-1 text-farming-sky" />
            <span>{humidity}%</span>
          </div>
          <div className="flex items-center">
            <Wind size={14} className="mr-1 text-farming-sky" />
            <span>{windSpeed} km/h</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
