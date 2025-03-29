
import { useState } from "react";
import { Mic, MicOff, Volume2, Wand2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const VoiceAssistantPanel = () => {
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState("");
  
  const toggleListening = () => {
    setIsListening(!isListening);
    
    // Simulate voice recognition (would be replaced with actual implementation)
    if (!isListening) {
      setTimeout(() => {
        setLastCommand("Show me disease detection");
        setIsListening(false);
      }, 3000);
    }
  };
  
  return (
    <Card className="mb-6 overflow-hidden border-0 shadow-md bg-gradient-to-r from-white to-farming-green/5">
      <CardContent className="p-4">
        <div className="flex items-start">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2 flex items-center">
              <Volume2 size={20} className="mr-2 text-farming-green" />
              Voice Assistant
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              {isListening 
                ? "Listening to your command..." 
                : "Tap the microphone and speak to navigate"}
            </p>
            
            {lastCommand && (
              <div className="bg-farming-green/5 p-3 rounded-lg text-sm mb-3 border border-farming-green/10">
                <p className="font-medium flex items-center">
                  <Wand2 size={14} className="mr-2 text-farming-gold" />
                  I heard: "{lastCommand}"
                </p>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-xs bg-farming-green/10 text-farming-green px-3 py-1.5 rounded-full font-medium">
                "Open scanner"
              </span>
              <span className="text-xs bg-farming-green/10 text-farming-green px-3 py-1.5 rounded-full font-medium">
                "Check weather"
              </span>
              <span className="text-xs bg-farming-green/10 text-farming-green px-3 py-1.5 rounded-full font-medium">
                "Show fertilizers"
              </span>
            </div>
          </div>
          
          <button 
            onClick={toggleListening}
            className={`h-16 w-16 rounded-full flex items-center justify-center shadow-lg ml-3 ${
              isListening
                ? "bg-status-severe text-white animate-pulse"
                : "bg-farming-green text-white glow-effect"
            }`}
            aria-label={isListening ? "Stop listening" : "Start listening"}
          >
            {isListening ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <MicOff size={28} className="z-10" />
                <div className="absolute inset-0 bg-status-severe rounded-full opacity-80"></div>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-farming-green to-farming-green-light opacity-80"></div>
                <div className="absolute inset-0 rounded-full pulse-ring"></div>
                <Mic size={28} className="relative z-10" />
              </>
            )}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceAssistantPanel;
