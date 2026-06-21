import { users } from './dummyUsers.js';

export const reels = Array.from({ length: 20 }, (_, i) => {
  const user = users[i % users.length];
  return {
    id: `reel_${i + 1}`,
    userId: user.id,
    thumbnail: `https://picsum.photos/400/700?random=${i + 100}`,
    caption: ['Check this out! 🔥', 'New routine 💪', 'Behind the scenes 🎬',
      'Tutorial time 📚', 'Dance challenge 💃', 'POV: your morning', 'Life hack ⚡',
      'This is crazy! 😱', 'Satisfying video ✨', 'Travel reel 🌍'][i % 10],
    likes: Math.floor(Math.random() * 50000) + 500,
    comments: Math.floor(Math.random() * 2000) + 50,
    views: Math.floor(Math.random() * 200000) + 5000,
    shares: Math.floor(Math.random() * 5000) + 100,
    audio: ['Original Audio', 'Sunny Day - Prod. by ...', 'Viral Sound 🔥',
      'Background Music', 'Trending Audio', 'New Release'][i % 6],
    duration: Math.floor(Math.random() * 30) + 10,
    isLiked: Math.random() > 0.7,
    isSaved: Math.random() > 0.8,
  };
});

export const getReelById = (id) => reels.find(r => r.id === id);
