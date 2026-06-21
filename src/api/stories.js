import { stories, getStoryById as dummyGetStoryById, getStoriesByUserId as dummyGetStoriesByUserId, users } from '../data/dummyData.js';

const delay = (ms = 100) => new Promise(r => setTimeout(r, ms));

export const getStories = async () => {
  await delay();
  return { stories };
};

export const getStoryById = async (storyId) => {
  await delay();
  const story = dummyGetStoryById(storyId);
  if (!story) throw new Error('Story not found');
  return { story };
};

export const getStoriesByUserId = async (userIdOrUsername) => {
  await delay();
  const user = users.find(u => u.id === userIdOrUsername || u.username === userIdOrUsername);
  if (!user) return { stories: [] };
  const story = dummyGetStoriesByUserId(user.id);
  return { stories: story ? [story] : [] };
};

export const createStory = async (formData) => {
  await delay(300);
  return { story: { id: `story_new_${Date.now()}`, type: 'image', url: 'https://picsum.photos/600/900?random=new', duration: 5000, timestamp: Date.now(), seen: false } };
};

export const deleteStory = async (storyId) => {
  await delay();
  return { success: true };
};

export const viewStory = async (storyId) => {
  await delay();
  return { success: true };
};

export const replyToStory = async (storyId, text) => {
  await delay();
  return { success: true };
};

export const getHighlights = async (userId) => {
  await delay();
  return { highlights: [] };
};

export const createHighlight = async (data) => {
  await delay();
  return { highlight: { id: `hl_new_${Date.now()}`, ...data } };
};

export const deleteHighlight = async (highlightId) => {
  await delay();
  return { success: true };
};

export const getArchive = async () => {
  await delay();
  return { stories: stories.slice(0, 3) };
};
