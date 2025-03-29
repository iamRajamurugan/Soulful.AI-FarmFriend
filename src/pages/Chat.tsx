
import { useState, useRef, useEffect } from "react";
import { Mic, Send, ArrowLeft } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Link } from "react-router-dom";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Sample chat history
  const [chatHistory, setChatHistory] = useState([
    { sender: "assistant", text: "Hello! I'm your farming assistant. How can I help you today?" },
  ]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);
  
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
  
  return (
    <PageContainer>
      {/* Header */}
      <div className="bg-farming-green text-white p-4 pt-8 flex items-center">
        <Link to="/" className="flex items-center mr-4">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-bold">AI Farming Assistant</h1>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 pb-20" style={{ height: "calc(100vh - 145px)" }}>
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
        <div ref={messagesEndRef} />
      </div>
      
      {/* Fixed input area at bottom */}
      <div className="fixed bottom-16 left-0 right-0 p-3 border-t border-gray-200 bg-white">
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
    </PageContainer>
  );
};

export default Chat;
