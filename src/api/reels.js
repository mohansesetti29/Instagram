import { reels, getReelById as dummyGetReelById, users } from '../data/dummyData.js';

const delay = (ms = 100) => new Promise(r => setTimeout(r, ms));

export const getReels = async () => {
  await delay();
  return { reels };
};

export const getReelById = async (reelId) => {
  await delay();
  const reel = dummyGetReelById(reelId);
  if (!reel) throw new Error('Reel not found');
  return { reel };
};

export const createReel = async (formData) => {
  await delay(300);
  return { reel: { id: `reel_new_${Date.now()}`, userId: '20', thumbnail: 'https://picsum.photos/400/700?random=new', caption: '', likes: 0, comments: 0, views: 0, shares: 0, audio: 'Original Audio', duration: 15, isLiked: false, isSaved: false } };
};

export const deleteReel = async (reelId) => {
  await delay();
  return { success: true };
};

export const likeReel = async (reelId) => {
  await delay();
  return { success: true };
};

export const unlikeReel = async (reelId) => {
  await delay();
  return { success: true };
};

export const commentOnReel = async (reelId, text) => {
  await delay();
  return { comment: { id: `rc_new_${Date.now()}`, userId: '20', text, timestamp: Date.now() } };
};

export const getReelComments = async (reelId) => {
  await delay();
  return { comments: [] };
};
