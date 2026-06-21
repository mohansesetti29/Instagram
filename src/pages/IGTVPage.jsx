import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Bookmark, Share2, ThumbsUp } from 'lucide-react';
import { formatNumber } from '../utils/formatNumber.js';
import { useState } from 'react';

export default function IGTVPage() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="max-w-[600px] mx-auto py-4 px-4">
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} className="text-gray-900 dark:text-gray-200" /></button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200">IGTV</h1>
      </div>
      <div className="bg-black rounded-lg h-[500px] flex items-center justify-center mb-4">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <h2 className="font-semibold text-base text-gray-900 dark:text-gray-200 mb-1">Video Title</h2>
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
        <span className="font-semibold text-gray-900 dark:text-gray-200">username</span>
        <span>•</span>
        <span>{formatNumber(12400)} views</span>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setIsLiked(!isLiked)}>
          <ThumbsUp size={22} className={isLiked ? 'text-ig-blue' : 'text-gray-900 dark:text-gray-200'} />
        </button>
        <button><MessageCircle size={22} className="text-gray-900 dark:text-gray-200" /></button>
        <button><Share2 size={22} className="text-gray-900 dark:text-gray-200" /></button>
        <div className="flex-1" />
        <button onClick={() => setIsSaved(!isSaved)}>
          <Bookmark size={22} className={isSaved ? 'text-gray-900 dark:text-gray-200 fill-gray-900' : 'text-gray-900 dark:text-gray-200'} />
        </button>
      </div>
    </div>
  );
}
