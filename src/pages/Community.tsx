
import { useState } from "react";
import PageContainer from "@/components/layout/PageContainer";
import CommunityPost from "@/components/community/CommunityPost";
import { Search, Image, Mic, Plus } from "lucide-react";

const Community = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const posts = [
    {
      id: 1,
      author: "Rajesh Kumar",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      timeAgo: "2 hours ago",
      content: "My rice crops are showing yellow leaf tips. Has anyone else experienced this? What could be the cause?",
      imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      likes: 12,
      comments: 5,
      isLiked: false,
    },
    {
      id: 2,
      author: "Anita Singh",
      authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      timeAgo: "Yesterday",
      content: "Just harvested my wheat crop! The new irrigation system has increased my yield by 15%. Highly recommend to all farmers in the region.",
      likes: 24,
      comments: 8,
      isLiked: true,
    },
  ];
  
  return (
    <PageContainer>
      <div className="bg-farming-green text-white p-4 pt-8">
        <h1 className="text-xl font-bold mb-2">Farmer Community</h1>
        <p className="text-sm opacity-90">
          Connect with farmers, share knowledge
        </p>
        
        <div className="mt-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-white/10 w-full pl-10 pr-4 py-2 rounded-lg text-white placeholder-white/70 outline-none border border-white/20"
            placeholder="Search discussions..."
          />
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex border-b border-gray-200 mb-4">
          {["all", "trending", "nearby", "experts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium -mb-px ${
                activeTab === tab
                  ? "text-farming-green border-b-2 border-farming-green"
                  : "text-gray-500"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        {posts.map((post) => (
          <CommunityPost
            key={post.id}
            author={post.author}
            authorAvatar={post.authorAvatar}
            timeAgo={post.timeAgo}
            content={post.content}
            imageUrl={post.imageUrl}
            likes={post.likes}
            comments={post.comments}
            isLiked={post.isLiked}
          />
        ))}
      </div>
      
      {/* Create post floating button */}
      <div className="fixed bottom-20 right-4 flex flex-col-reverse items-end space-y-reverse space-y-2">
        <button className="h-14 w-14 rounded-full bg-farming-green text-white shadow-lg flex items-center justify-center">
          <Plus size={24} />
        </button>
        
        {/* Additional action buttons (normally hidden until main button is clicked) */}
        <button className="h-10 w-10 rounded-full bg-white text-farming-green shadow border border-farming-green flex items-center justify-center opacity-0">
          <Image size={20} />
        </button>
        <button className="h-10 w-10 rounded-full bg-white text-farming-green shadow border border-farming-green flex items-center justify-center opacity-0">
          <Mic size={20} />
        </button>
      </div>
    </PageContainer>
  );
};

export default Community;
