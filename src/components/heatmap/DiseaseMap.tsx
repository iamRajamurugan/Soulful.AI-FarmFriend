
import { useState, useCallback, useRef, useEffect } from "react";
import { Map as MapIcon, AlertTriangle, Navigation, Layers } from "lucide-react";
import { GoogleMap, useLoadScript, HeatmapLayer } from "@react-google-maps/api";
import { Button } from "../ui/button";

// Define libraries array outside component to prevent performance warnings
const libraries = ["visualization"];

// Dummy disease outbreak data for testing
const diseaseOutbreakData = [
  { lat: 20.5937, lng: 78.9629, weight: 10 }, // India center
  { lat: 19.0760, lng: 72.8777, weight: 8 },  // Mumbai
  { lat: 28.7041, lng: 77.1025, weight: 9 },  // Delhi
  { lat: 13.0827, lng: 80.2707, weight: 6 },  // Chennai
  { lat: 22.5726, lng: 88.3639, weight: 7 },  // Kolkata
  { lat: 17.3850, lng: 78.4867, weight: 5 },  // Hyderabad
  { lat: 12.9716, lng: 77.5946, weight: 8 },  // Bangalore
  { lat: 16.3067, lng: 80.4365, weight: 4 },  // Vijayawada
  { lat: 26.8467, lng: 80.9462, weight: 5 },  // Lucknow
  { lat: 30.7333, lng: 76.7794, weight: 3 },  // Chandigarh
];

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 20.5937, // India's approximate center
  lng: 78.9629,
};

const options = {
  disableDefaultUI: true,
  zoomControl: false,
  streetViewControl: false,
};

const heatmapOptions = {
  radius: 20,
  opacity: 0.7,
  gradient: [
    "rgba(0, 255, 0, 0)",
    "rgba(0, 255, 0, 1)",
    "rgba(255, 255, 0, 1)",
    "rgba(255, 0, 0, 1)",
  ],
};

const DiseaseMap = () => {
  const [userPosition, setUserPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>(center);
  const [mapError, setMapError] = useState<string | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCv-JPw3TXAd-FXfH-iO4ISssAycywJXbE", // Consider using environment variables for API keys
    libraries: libraries as any,
  });

  // Try to get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserPosition(pos);
          setMapCenter(pos);
        },
        () => {
          console.log("Error: The Geolocation service failed.");
        }
      );
    } else {
      console.log("Error: Your browser doesn't support geolocation.");
    }
  }, []);

  // Handle Map error
  useEffect(() => {
    if (loadError) {
      console.error("Google Maps error:", loadError);
      setMapError("Failed to load Google Maps API. Please check your API key configuration.");
    }
  }, [loadError]);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleLocateMe = () => {
    if (userPosition && mapRef.current) {
      setMapCenter(userPosition);
      mapRef.current.panTo(userPosition);
    }
  };

  if (mapError || loadError) {
    return (
      <div className="relative w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        <div className="text-center p-4">
          <AlertTriangle size={36} className="text-red-500 mx-auto mb-2" />
          <p className="text-gray-700">{mapError || "Error loading maps"}</p>
          <p className="text-sm text-gray-500">
            Please verify your Google Maps API key has the Maps JavaScript API enabled and proper billing setup
          </p>
          <Button 
            className="mt-4 bg-farming-green"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="relative w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        <div className="animate-pulse text-center">
          <MapIcon size={48} className="text-gray-400 mb-2 mx-auto animate-bounce" />
          <p className="text-gray-500">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={5}
        center={mapCenter}
        options={options}
        onLoad={onMapLoad}
      >
        {Array.isArray(diseaseOutbreakData) && diseaseOutbreakData.length > 0 && (
          <HeatmapLayer
            data={diseaseOutbreakData.map(point => ({
              location: new window.google.maps.LatLng(point.lat, point.lng),
              weight: point.weight
            }))}
            options={heatmapOptions}
          />
        )}
      </GoogleMap>
      
      {/* Map controls overlay */}
      <div className="absolute top-4 right-4 space-y-2">
        <button 
          className="h-10 w-10 bg-white rounded-full shadow flex items-center justify-center"
          onClick={handleLocateMe}
        >
          <Navigation size={18} className="text-farming-green" />
        </button>
        <button className="h-10 w-10 bg-white rounded-full shadow flex items-center justify-center">
          <Layers size={18} className="text-gray-700" />
        </button>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow">
        <h4 className="text-sm font-semibold flex items-center mb-2">
          <AlertTriangle size={16} className="mr-1.5 text-status-severe" />
          Disease Outbreak Reports
        </h4>
        <div className="space-y-1.5">
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-status-severe mr-2"></span>
            <span className="text-xs">Severe (10+ reports)</span>
          </div>
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-status-mild mr-2"></span>
            <span className="text-xs">Moderate (3-9 reports)</span>
          </div>
          <div className="flex items-center">
            <span className="h-3 w-3 rounded-full bg-status-healthy mr-2"></span>
            <span className="text-xs">Low (1-2 reports)</span>
          </div>
        </div>
      </div>
      
      {/* Disease report button */}
      <div className="absolute bottom-4 right-4">
        <button className="farming-btn py-2 px-4 flex items-center">
          <AlertTriangle size={16} className="mr-1.5" />
          <span className="text-sm font-medium">Report Disease</span>
        </button>
      </div>
    </div>
  );
};

export default DiseaseMap;
