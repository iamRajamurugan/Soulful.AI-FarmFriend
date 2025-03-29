
import { useState } from "react";
import { Mic, X, MessageCircle, Send } from "lucide-react";

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIAssistant = ({ isOpen, onClose }: AIAssistantProps) => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  
  // Sample chat history
  const [chatHistory, setChatHistory] = useState([
    { sender: "assistant", text: "Hello! I'm your farming assistant. How can I help you today?" },
  ]);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to chat
    setChatHistory([...chatHistory, { sender: "user", text: message }]);
    
    // Clear input
    setMessage("");
    
    // Simulate AI response (would be replaced with actual API call)
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev, 
        { 
          sender: "assistant", 
          text: "Thank you for your message. I've noted your query about crop diseases. Based on your description, it sounds like your tomato plants might be affected by early blight. Consider applying a copper-based fungicide and ensuring good air circulation between plants." 
        }
      ]);
    }, 1000);
  };
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    // Simulate voice recording (would be replaced with actual implementation)
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setChatHistory([
          ...chatHistory, 
          { sender: "user", text: "My tomato plants have yellow spots on the leaves. What could be wrong?" }
        ]);
        
        // Simulate AI response
        setTimeout(() => {
          setChatHistory((prev) => [
            ...prev, 
            { 
              sender: "assistant", 
              text: "Based on your description, your tomato plants might have early blight. This is a common fungal disease. I recommend removing affected leaves and applying a copper-based fungicide. Make sure to water at the base of plants and improve air circulation." 
            }
          ]);
        }, 1000);
      }, 3000);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-xl animate-scale-in">
        {/* Header */}
        <div className="bg-farming-green text-white p-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
              <MessageCircle size={18} />
            </div>
            <h2 className="font-bold">AI Farming Assistant</h2>
          </div>
          <button 
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Chat history */}
        <div className="h-96 overflow-y-auto p-4 bg-gray-50">
          {chatHistory.map((chat, index) => (
            <div 
              key={index}
              className={`mb-3 flex ${
                chat.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div 
                className={`max-w-[80%] rounded-2xl p-3 ${
                  chat.sender === "user" 
                    ? "bg-farming-green text-white rounded-tr-none" 
                    : "bg-white border border-gray-200 rounded-tl-none"
                }`}
              >
                <p className="text-sm">{chat.text}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Input area */}
        <div className="p-3 border-t border-gray-200">
          <div className="flex items-center">
            <button 
              onClick={toggleRecording}
              className={`h-10 w-10 rounded-full flex items-center justify-center mr-2 ${
                isRecording 
                  ? "bg-status-severe text-white animate-pulse" 
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <Mic size={20} />
            </button>
            
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-farming-green text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            
            <button 
              onClick={handleSendMessage}
              className="h-10 w-10 rounded-full bg-farming-green text-white flex items-center justify-center ml-2"
              disabled={!message.trim()}
            >
              <Send size={18} />
            </button>
          </div>
          
          {isRecording && (
            <div className="mt-2 text-center">
              <p className="text-sm text-status-severe animate-pulse">Recording...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
