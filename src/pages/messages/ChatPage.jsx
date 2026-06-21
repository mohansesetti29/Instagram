import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Video, Info, Plus, Camera, Mic, Smile, Image as ImageIcon, Send, Heart } from 'lucide-react';
import * as messagesApi from '../../api/messages.js';
import * as usersApi from '../../api/users.js';
import Avatar from '../../components/common/Avatar.jsx';
import { formatMessageTime } from '../../utils/formatTime.js';

export default function ChatPage({ conversationId: propConvId, onBack }) {
  const { conversationId: paramConvId } = useParams();
  const navigate = useNavigate();
  const conversationId = propConvId || paramConvId;
  const [conv, setConv] = useState(null);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    if (!conversationId) return;
    messagesApi.getConversation(conversationId)
      .then(res => {
        const c = res.conversation || res;
        setConv(c);
        return usersApi.getUserById(c.userId);
      })
      .then(res => setUser(res.user || res))
      .catch(() => { setConv(null); setUser(null); });
  }, [conversationId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conv?.messages]);

  const handleSend = async () => {
    if (!message.trim() || !conversationId) return;
    const text = message;
    setMessage('');
    setTyping(true);
    try {
      const res = await messagesApi.sendMessage(conversationId, text);
      const newMsg = res.message || res;
      setConv(prev => prev ? { ...prev, messages: [...(prev.messages || []), newMsg] } : prev);
    } catch (_) {}
    setTimeout(() => setTyping(false), 1000);
  };

  if (!conv) return <div className="flex items-center justify-center h-full text-gray-500">Loading conversation...</div>;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-black">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
        <button onClick={() => { onBack ? onBack() : navigate('/messages'); }} className="md:hidden"><ArrowLeft size={24} className="text-gray-900 dark:text-gray-200" /></button>
        <Avatar src={user?.avatar} size={32} />
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{user?.username}</p>
          <p className="text-[11px] text-gray-500">{user?.fullName} • Active now</p>
        </div>
        <div className="flex items-center gap-3">
          <Phone size={20} className="text-gray-900 dark:text-gray-200" />
          <Video size={20} className="text-gray-900 dark:text-gray-200" />
          <Info size={20} className="text-gray-900 dark:text-gray-200" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {(conv.messages || []).map((msg) => {
          const isMine = msg.senderId === '20';
          return (
            <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] px-3 py-2 rounded-2xl text-sm ${
                isMine
                  ? 'bg-ig-blue text-white rounded-br-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-bl-md'
              }`}>
                <p>{msg.text}</p>
                <p className={`text-[10px] mt-0.5 ${isMine ? 'text-white/70' : 'text-gray-400'}`}>
                  {formatMessageTime(msg.timestamp)}
                  {isMine && msg.seen && ' ✓✓'}
                </p>
              </div>
            </div>
          );
        })}
        {typing && (
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <span className="typing-dot w-1.5 h-1.5 bg-gray-400 rounded-full inline-block" />
            <span className="typing-dot w-1.5 h-1.5 bg-gray-400 rounded-full inline-block" />
            <span className="typing-dot w-1.5 h-1.5 bg-gray-400 rounded-full inline-block" />
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
        <div className="flex items-center gap-2">
          <button><Plus size={22} className="text-gray-500" /></button>
          <button><ImageIcon size={22} className="text-gray-500" /></button>
          <button><Camera size={22} className="text-gray-500" /></button>
          <button><Mic size={22} className="text-gray-500" /></button>
          <div className="flex-1 flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1.5">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Message..."
              className="flex-1 bg-transparent text-sm outline-none text-gray-900 dark:text-gray-200 placeholder-gray-500"
            />
            <button><Smile size={18} className="text-gray-500" /></button>
          </div>
          {message.trim() ? (
            <button onClick={handleSend}><Send size={22} className="text-ig-blue" /></button>
          ) : (
            <button><Heart size={22} className="text-gray-500" /></button>
          )}
        </div>
      </div>
    </div>
  );
}
