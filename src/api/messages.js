import { conversations, getConversationById, users } from '../data/dummyData.js';

const delay = (ms = 100) => new Promise(r => setTimeout(r, ms));

export const getConversations = async () => {
  await delay();
  return { conversations };
};

export const getConversation = async (conversationId) => {
  await delay();
  const conv = getConversationById(conversationId);
  if (!conv) throw new Error('Conversation not found');
  return { conversation: conv };
};

export const startConversation = async (userId) => {
  await delay();
  return { conversation: { id: `conv_new_${Date.now()}`, userId, messages: [], lastMessage: '', lastTime: Date.now(), unread: false, isOnline: true } };
};

export const sendMessage = async (conversationId, text) => {
  await delay();
  return { message: { id: `msg_new_${Date.now()}`, senderId: '20', text, timestamp: Date.now(), seen: true, type: 'text' } };
};

export const getMessageRequests = async () => {
  await delay();
  return { requests: [] };
};

export const acceptMessageRequest = async (requestId) => {
  await delay();
  return { success: true };
};

export const declineMessageRequest = async (requestId) => {
  await delay();
  return { success: true };
};

export const deleteConversation = async (conversationId) => {
  await delay();
  return { success: true };
};
