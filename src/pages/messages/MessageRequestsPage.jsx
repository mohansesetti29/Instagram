import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import * as messagesApi from '../../api/messages.js';
import Avatar from '../../components/common/Avatar.jsx';

export default function MessageRequestsPage() {
  const navigate = useNavigate();
  const [pending, setPending] = useState([]);

  useEffect(() => {
    messagesApi.getMessageRequests().then(res => {
      const items = res.requests || res.data || res || [];
      setPending(items);
    }).catch(() => setPending([]));
  }, []);

  return (
    <div className="max-w-[600px] mx-auto py-4 px-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/messages')}><ArrowLeft size={24} className="text-gray-900 dark:text-gray-200" /></button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Message Requests</h1>
      </div>
      <p className="text-sm text-gray-500 mb-4 px-2">
        You can't message these people until you accept their request
      </p>
      {pending.map(user => (
        <div key={user.id} className="flex items-center gap-3 px-2 py-3">
          <Avatar src={user.avatar} size={44} />
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">{user.username}</p>
            <p className="text-xs text-gray-500">{user.fullName}</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-ig-blue text-white px-4 py-1.5 rounded-lg text-sm font-semibold">Accept</button>
            <button className="border border-gray-300 dark:border-gray-600 px-4 py-1.5 rounded-lg text-sm font-semibold text-gray-900 dark:text-gray-200">Decline</button>
          </div>
        </div>
      ))}
    </div>
  );
}
