import { useState, useEffect } from 'react';
import * as messagesApi from '../api/messages.js';

export const useMessages = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    messagesApi.getConversations()
      .then(res => setData(res.conversations || res.data || res || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  return { conversations: data, loading };
};
