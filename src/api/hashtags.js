import { hashtags, getHashtagByTag, posts } from '../data/dummyData.js';

const delay = (ms = 100) => new Promise(r => setTimeout(r, ms));

export const search = async (query) => {
  await delay();
  const q = query.toLowerCase();
  const { users } = await import('../data/dummyData.js');
  return {
    hashtags: hashtags.filter(h => h.tag.includes(q)).slice(0, 5),
    users: users.filter(u => u.username.toLowerCase().includes(q) || u.fullName.toLowerCase().includes(q)).slice(0, 5),
    posts: posts.slice(0, 9),
  };
};

export const getHashtag = async (tag) => {
  await delay();
  const hashtag = getHashtagByTag(tag);
  if (!hashtag) throw new Error('Hashtag not found');
  return { hashtag, posts: posts.slice(0, 12) };
};

export const getTrendingHashtags = async () => {
  await delay();
  return { hashtags: hashtags.slice(0, 6) };
};

export const followHashtag = async (tag) => {
  await delay();
  return { success: true };
};

export const unfollowHashtag = async (tag) => {
  await delay();
  return { success: true };
};

export const getLocationPosts = async (locationId) => {
  await delay();
  return { posts: posts.slice(0, 9) };
};
