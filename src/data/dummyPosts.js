import { users } from './dummyUsers.js';

const now = Date.now();
const HOUR = 3600000;

const commentTemplates = [
  'This is amazing! 🔥', 'Love this so much! ❤️', 'So beautiful!', 'Incredible shot!',
  '🔥🔥🔥', 'Perfect!', 'Wow just wow 😍', 'Great content as always!',
  'Can you share the location?', 'This is my new wallpaper!', 'Absolutely stunning!',
  'How did you edit this?', 'I need to visit this place!',
  'Goals! ✨', 'So underrated!', 'Keep it up! 💪', 'Best post I\'ve seen today!',
];

const generateComments = (postId, count) => {
  const comments = [];
  const usedUsers = [...users].sort(() => Math.random() - 0.5).slice(0, count + 3);
  for (let i = 0; i < count; i++) {
    const user = usedUsers[i % usedUsers.length];
    const comment = {
      id: `c${postId}_${i}`,
      userId: user.id,
      text: commentTemplates[Math.floor(Math.random() * commentTemplates.length)],
      likes: Math.floor(Math.random() * 50),
      timestamp: now - Math.floor(Math.random() * 48 * HOUR),
      replies: [],
    };
    if (Math.random() > 0.7) {
      const replyUser = usedUsers[(i + 1) % usedUsers.length];
      comment.replies.push({
        id: `r${postId}_${i}`,
        userId: replyUser.id,
        text: 'Thanks! 🙌',
        likes: Math.floor(Math.random() * 10),
        timestamp: now - Math.floor(Math.random() * 24 * HOUR),
      });
    }
    comments.push(comment);
  }
  return comments;
};

const locations = ['New York, NY', 'Los Angeles, CA', 'Tokyo, Japan', 'Paris, France', 'London, UK',
  'Barcelona, Spain', 'Sydney, Australia', 'Dubai, UAE', 'Seoul, Korea', 'Amsterdam, Netherlands',
  'Bali, Indonesia', 'Rome, Italy'];

const captions = [
  'Golden hour magic ✨ #sunset #goldenhour',
  'City never sleeps 🌃 #citylights #nightlife',
  'Adventure awaits 🌄 #travel #explore',
  'Simple pleasures 🌿 #nature #peace',
  'New beginnings 🎉 #freshstart #motivation',
  'Living my best life ✌️ #goodvibes #lifestyle',
  'Memories made here 🏖️ #vacation #beach',
  'Coffee and creativity ☕ #morning #workflow',
  'Weekend mode on 🎯 #weekend #fun',
  'Dream big, work hard 🚀 #success #hustle',
  'Nature is art 🎨 #landscape #photography',
  'Good times, good vibes 🌊 #summer #friends',
  'On top of the world 🗻 #mountain #adventure',
  'Just another day in paradise 🌴 #paradise #travelgram',
  'Making moments count ⏰ #mindfulness #present',
];

export const posts = Array.from({ length: 36 }, (_, i) => {
  const user = users[i % users.length];
  const aspectRatios = ['1/1', '4/5', '16/9'];
  const isCarousel = i % 5 === 0;
  const imageCount = isCarousel ? 3 + Math.floor(Math.random() * 3) : 1;
  const images = Array.from({ length: imageCount }, (_, j) => `https://picsum.photos/600/600?random=${i * 10 + j}`);

  return {
    id: `post_${i + 1}`,
    userId: user.id,
    images,
    caption: captions[i % captions.length],
    likes: Math.floor(Math.random() * 10000) + 100,
    comments: generateComments(i + 1, 3 + Math.floor(Math.random() * 10)),
    timestamp: now - Math.floor(Math.random() * 7 * 24 * HOUR),
    location: locations[Math.floor(Math.random() * locations.length)],
    isLiked: Math.random() > 0.7,
    isSaved: Math.random() > 0.8,
    isSponsored: Math.random() > 0.9,
    aspectRatio: aspectRatios[Math.floor(Math.random() * aspectRatios.length)],
  };
});

export const getPostById = (id) => posts.find(p => p.id === id);
