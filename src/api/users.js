import { users } from '../data/dummyData.js';
import { getUserByUsername as dummyGetUserByUsername, getUserById as dummyGetUserById } from '../data/dummyData.js';

const delay = (ms = 100) => new Promise(r => setTimeout(r, ms));

export const getUserByUsername = async (username) => {
  await delay();
  const user = dummyGetUserByUsername(username);
  if (!user) throw new Error('User not found');
  return { user };
};

export const getUserById = async (id) => {
  await delay();
  const user = dummyGetUserById(id);
  if (!user) throw new Error('User not found');
  return { user };
};

export const updateProfile = async (data) => {
  await delay();
  return { user: { ...getUserByUsername('current_user'), ...data } };
};

export const changePassword = async (data) => {
  await delay();
  return { success: true };
};

export const getFollowers = async (username, page = 1) => {
  await delay();
  return { users: users.filter(u => u.id !== '20').slice(0, 12), total: 12 };
};

export const getFollowing = async (username, page = 1) => {
  await delay();
  return { users: users.filter(u => u.id !== '20').slice(0, 8), total: 8 };
};

export const followUser = async (userId) => {
  await delay();
  return { success: true };
};

export const unfollowUser = async (userId) => {
  await delay();
  return { success: true };
};

export const searchUsers = async (query) => {
  await delay();
  const q = query.toLowerCase();
  return { users: users.filter(u => u.username.toLowerCase().includes(q) || u.fullName.toLowerCase().includes(q)).slice(0, 10) };
};

export const getSuggestedUsers = async () => {
  await delay();
  return { users: users.filter(u => !u.isFollowing && u.id !== '20').slice(0, 5) };
};

export const getUserPosts = async (username, page = 1) => {
  await delay();
  const { posts } = await import('../data/dummyData.js');
  const user = getUserByUsername(username);
  return { posts: posts.filter(p => p.userId === user?.id), total: 0 };
};

export const getUserSavedPosts = async (page = 1) => {
  await delay();
  const { posts } = await import('../data/dummyData.js');
  return { posts: posts.filter(p => p.isSaved).slice(0, 6) };
};

export const getUserTaggedPosts = async (username, page = 1) => {
  await delay();
  const { posts } = await import('../data/dummyData.js');
  return { posts: posts.slice(0, 6) };
};


