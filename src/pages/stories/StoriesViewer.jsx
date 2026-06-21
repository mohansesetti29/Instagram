import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X, Send, Smile, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import * as storiesApi from '../../api/stories.js';
import * as usersApi from '../../api/users.js';
import Avatar from '../../components/common/Avatar.jsx';

export default function StoriesViewer() {
  const { username, storyId } = useParams();
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [user, setUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [replyText, setReplyText] = useState('');
  const progressRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    Promise.all([
      storiesApi.getStoriesByUserId(username || ''),
      usersApi.getUserByUsername(username || ''),
    ]).then(([sRes, uRes]) => {
      const items = sRes.stories || sRes.data || sRes || [];
      setStories(items);
      setUser(uRes.user || uRes);
    }).catch(() => { setStories([]); setUser(null); });
  }, [username]);

  const currentStory = stories.find(s => s.id === storyId || s.items?.[0]?.id === storyId);
  const items = currentStory?.items || (currentStory ? [currentStory] : []);

  useEffect(() => {
    setProgress(0);
    clearInterval(intervalRef.current);
    if (items.length === 0) return;
    const duration = 5000;
    const step = 100;
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          return 100;
        }
        return prev + (step / duration) * 100;
      });
    }, step);
    return () => clearInterval(intervalRef.current);
  }, [currentIndex, items.length]);

  const goNext = () => {
    if (currentIndex < items.length - 1) setCurrentIndex(c => c + 1);
    else navigate(-1);
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(c => c - 1);
  };

  const handleReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    storiesApi.replyToStory(items[currentIndex]?.id || storyId, replyText).then(() => setReplyText('')).catch(() => {});
  };

  if (!user || items.length === 0) return <div className="flex items-center justify-center h-screen bg-black text-white">Loading story...</div>;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <button onClick={() => navigate(-1)} className="absolute top-4 right-4 z-10 text-white"><X size={24} /></button>

      <div className="relative w-full max-w-[420px] mx-4">
        {/* Progress bars */}
        <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-2">
          {items.map((_, i) => (
            <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white transition-all duration-100 rounded-full" style={{ width: i === currentIndex ? `${progress}%` : i < currentIndex ? '100%' : '0%' }} />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-4 left-0 right-0 z-10 flex items-center gap-2 px-2 pt-5">
          <Avatar src={user.avatar} size={32} />
          <span className="text-sm font-semibold text-white">{user.username}</span>
          <span className="text-xs text-white/70">{Math.floor(items[currentIndex]?.duration || 5)}s</span>
          <div className="flex-1" />
          <MoreHorizontal size={20} className="text-white" />
        </div>

        {/* Story content */}
        <div className="relative rounded-lg overflow-hidden" style={{ aspectRatio: '9/16' }}>
          <img src={items[currentIndex]?.url || items[currentIndex]?.media} alt="" className="w-full h-full object-cover" />
          <div className="absolute left-0 top-0 bottom-0 w-1/3 z-10" onClick={goPrev} />
          <div className="absolute right-0 top-0 bottom-0 w-1/3 z-10" onClick={goNext} />

          {/* Reply */}
          <div className="absolute bottom-4 left-3 right-3 z-10">
            <form onSubmit={handleReply} className="flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5">
              <input type="text" value={replyText} onChange={e => setReplyText(e.target.value)} placeholder={`Reply to ${user.username}...`} className="flex-1 text-sm bg-transparent outline-none text-white placeholder-white/60" />
              <Smile size={18} className="text-white/60" />
              <button type="submit" disabled={!replyText.trim()}><Send size={16} className="text-white disabled:opacity-40" /></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
