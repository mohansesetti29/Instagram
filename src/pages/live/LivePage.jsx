import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, Heart, Send, Smile, Share2 } from 'lucide-react';
import { formatNumber } from '../../utils/formatNumber.js';

export default function LivePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [hearts, setHearts] = useState([]);
  const [viewers] = useState(Math.floor(Math.random() * 5000) + 200);
  const [comments] = useState([
    { id: 1, user: 'sarah_james', text: 'Hey! 🔥' },
    { id: 2, user: 'mike_tyson_fitness', text: 'Let\'s go!' },
    { id: 3, user: 'lisa_park', text: 'Amazing live!' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      setHearts(prev => [...prev, { id, x: Math.random() * 80 + 10 }]);
      setTimeout(() => setHearts(prev => prev.filter(h => h.id !== id)), 2000);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 via-pink-800/60 to-orange-700/60" />

      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-ig-red rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">LIVE</span>
          </div>
          <span className="text-white text-sm font-semibold">{username}</span>
          <div className="bg-black/40 rounded-full px-2 py-0.5 text-xs text-white flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-ig-red rounded-full animate-pulse" />
            {formatNumber(viewers)}
          </div>
        </div>
        <button onClick={() => navigate(-1)} className="text-white"><X size={24} /></button>
      </div>

      {/* Heart Burst */}
      <div className="absolute bottom-24 right-8 z-10">
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="float-up absolute"
            style={{ left: `${heart.x}%`, bottom: 0 }}
          >
            <Heart size={24} className="text-white fill-white" />
          </div>
        ))}
      </div>

      {/* Comments */}
      <div className="absolute bottom-20 left-4 z-10 max-w-[60%] space-y-2">
        {comments.map(c => (
          <div key={c.id} className="bg-black/40 backdrop-blur-sm rounded-lg px-3 py-1.5">
            <span className="text-white font-semibold text-xs">{c.user} </span>
            <span className="text-white text-xs">{c.text}</span>
          </div>
        ))}
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-6 left-4 right-4 flex items-center gap-2 z-10">
        <div className="flex-1 flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-2">
          <input
            type="text" placeholder="Send a message..."
            value={comment} onChange={(e) => setComment(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder-white/50"
          />
          <Smile size={20} className="text-white/70" />
        </div>
        <button className="bg-ig-red text-white p-2.5 rounded-full">
          <Heart size={20} className="fill-white" />
        </button>
        <button className="text-white"><Share2 size={22} /></button>
      </div>
    </div>
  );
}
