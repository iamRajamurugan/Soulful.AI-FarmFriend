
import { MessageSquare, Heart, Share2, MoreVertical } from "lucide-react";
import { useState } from "react";

interface CommunityPostProps {
  author: string;
  authorAvatar: string;
  timeAgo: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
}

const CommunityPost = ({
  author,
  authorAvatar,
  timeAgo,
  content,
  imageUrl,
  likes,
  comments,
  isLiked = false,
}: CommunityPostProps) => {
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  
  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
      {/* Post header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
            <img 
              src={authorAvatar} 
              alt={author} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">{author}</h3>
            <p className="text-xs text-gray-500">{timeAgo}</p>
          </div>
        </div>
        <button className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <MoreVertical size={16} />
        </button>
      </div>
      
      {/* Post content */}
      <div className="px-4 pb-3">
        <p className="text-sm mb-3">{content}</p>
        {imageUrl && (
          <div className="rounded-lg overflow-hidden mb-3">
            <img 
              src={imageUrl} 
              alt="Post visual" 
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
      
      {/* Post actions */}
      <div className="flex items-center justify-between border-t border-gray-100 px-2">
        <button 
          className={`flex items-center justify-center py-2 px-3 text-sm ${
            liked ? "text-farming-green" : "text-gray-600"
          }`}
          onClick={handleLike}
        >
          <Heart 
            size={18} 
            className={`mr-1.5 ${liked ? "fill-farming-green" : ""}`} 
          />
          <span>{likeCount}</span>
        </button>
        
        <button className="flex items-center justify-center py-2 px-3 text-sm text-gray-600">
          <MessageSquare size={18} className="mr-1.5" />
          <span>{comments}</span>
        </button>
        
        <button className="flex items-center justify-center py-2 px-3 text-sm text-gray-600">
          <Share2 size={18} className="mr-1.5" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default CommunityPost;
