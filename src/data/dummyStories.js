import { users } from './dummyUsers.js';

const now = Date.now();
const SEC = 1000;

export const stories = users.filter(u => u.hasStory).slice(0, 12).map(user => ({
  userId: user.id,
  items: Array.from({ length: 3 + Math.floor(Math.random() * 3) }, (_, i) => ({
    id: `story_${user.id}_${i}`,
    type: Math.random() > 0.8 ? 'video' : 'image',
    url: `https://picsum.photos/600/900?random=${user.id}${i}`,
    duration: 5000,
    timestamp: now - Math.floor(Math.random() * 24 * 3600 * SEC),
    seen: Math.random() > 0.6,
  })),
}));

export const getStoriesByUserId = (userId) => stories.find(s => s.userId === userId);
export const getStoryById = (storyId) => {
  for (const story of stories) {
    const item = story.items.find(i => i.id === storyId);
    if (item) return { ...item, userId: story.userId };
  }
  return null;
};
