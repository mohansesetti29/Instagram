import { users } from './dummyUsers.js';

const now = Date.now();
const HOUR = 3600000;

export const conversations = Array.from({ length: 10 }, (_, i) => {
  const user = users[i % users.length];
  return {
    id: `conv_${i + 1}`,
    userId: user.id,
    messages: Array.from({ length: 5 + Math.floor(Math.random() * 10) }, (_, j) => ({
      id: `msg_${i}_${j}`,
      senderId: j % 2 === 0 ? user.id : '20',
      text: ['Hey! How are you?', 'What\'s up?', 'Check this out! 🔥', 'Awesome!', 'Sure, sounds good!',
        'Where are you?', 'Let\'s meet up!', 'Great photo!', 'Thanks! 😊', 'On my way!',
        'Haha that\'s funny 😂', 'See you later!', 'Perfect timing!', 'I\'m so excited!',
        'Just landed! ✈️', 'Can\'t wait!', 'This is incredible!', 'Good morning! ☀️',
        'Night! 🌙', 'How was your day?'][j % 20],
      timestamp: now - (20 - j) * HOUR,
      seen: j < 15,
      type: 'text',
    })),
    lastMessage: ['Hey! How are you?', 'Awesome!', 'See you later!', 'Good morning! ☀️'][i % 4],
    lastTime: now - Math.floor(Math.random() * 24 * HOUR),
    unread: Math.random() > 0.7,
    isOnline: Math.random() > 0.5,
  };
});

export const getConversationById = (id) => conversations.find(c => c.id === id);
