import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit3, Search } from 'lucide-react';
import ConversationList from '../../components/messages/ConversationList.jsx';
import ChatPage from './ChatPage.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function MessagesPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Messages');
  const [selectedConvId, setSelectedConvId] = useState(null);

  const handleSelect = (conv) => {
    if (window.innerWidth < 768) {
      navigate(`/messages/${conv.id}`);
    } else {
      setSelectedConvId(conv.id);
    }
  };

  return (
    <div className="flex h-full">
      <div className={`${selectedConvId ? 'hidden md:flex' : 'flex'} w-full md:w-[350px] border-r border-gray-200 dark:border-gray-700 flex-col bg-white dark:bg-black`}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <button onClick={() => navigate('/home')} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <span className="font-semibold text-base text-gray-900 dark:text-gray-200">{user?.username || 'current_user'}</span>
            <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
          </button>
          <button onClick={() => navigate('/messages/requests')} className="hover:opacity-70 transition-opacity">
            <Edit3 size={24} className="text-gray-900 dark:text-gray-200" />
          </button>
        </div>
        <div className="flex gap-4 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          {['Messages', 'Requests'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-semibold relative ${activeTab === tab ? 'text-ig-blue' : 'text-gray-500'}`}
            >
              {tab}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-ig-blue" />}
            </button>
          ))}
        </div>
        <div className="px-4 py-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text" placeholder="Search..."
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg py-2 pl-8 pr-3 text-sm outline-none text-gray-900 dark:text-gray-200 placeholder-gray-500"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ConversationList onSelect={handleSelect} />
        </div>
      </div>

      {selectedConvId ? (
        <div className="hidden md:flex flex-1 min-w-0">
          <ChatPage conversationId={selectedConvId} onBack={() => setSelectedConvId(null)} />
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-ig-secondary-bg dark:bg-black">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full border-2 border-gray-900 dark:border-gray-200 flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-900 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-200 mb-1">Your Messages</h3>
            <p className="text-sm text-gray-500 mb-4">Send private photos and messages to a friend.</p>
            <button className="bg-ig-blue text-white px-6 py-1.5 rounded-lg text-sm font-semibold hover:bg-ig-blue-hover transition-colors">Send message</button>
          </div>
        </div>
      )}
    </div>
  );
}
