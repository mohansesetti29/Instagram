import { useState, useEffect } from 'react';
import ConversationItem from './ConversationItem.jsx';
import * as messagesApi from '../../api/messages.js';

export default function ConversationList({ onSelect }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    messagesApi.getConversations()
      .then(res => setConversations(res.conversations || res.data || res || []))
      .catch(() => setConversations([]));
  }, []);

  if (!conversations || conversations.length === 0) {
    return <div className="p-8 text-center text-gray-500 text-sm">No conversations yet</div>;
  }

  return (
    <div>
      {conversations.map(conv => (
        <ConversationItem key={conv.id} conversation={conv} onClick={() => onSelect?.(conv)} />
      ))}
    </div>
  );
}
