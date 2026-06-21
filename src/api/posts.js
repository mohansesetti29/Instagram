import { posts, getPostById } from '../data/dummyData.js';

const delay = (ms = 100) => new Promise(r => setTimeout(r, ms));

export const getFeed = async (page = 1) => {
  await delay();
  return { posts };
};

export const getExplorePosts = async (page = 1) => {
  await delay();
  return { posts: [...posts].sort(() => Math.random() - 0.5).slice(0, 12) };
};

export const getPost = async (postId) => {
  await delay();
  const post = getPostById(postId);
  if (!post) throw new Error('Post not found');
  return { post };
};

export const createPost = async (formData) => {
  await delay(300);
  return { post: { id: `post_new_${Date.now()}`, userId: '20', images: ['https://picsum.photos/600/600?random=new'], caption: '', likes: 0, comments: [], timestamp: Date.now(), isLiked: false, isSaved: false } };
};

export const deletePost = async (postId) => {
  await delay();
  return { success: true };
};

export const likePost = async (postId) => {
  await delay();
  return { success: true };
};

export const unlikePost = async (postId) => {
  await delay();
  return { success: true };
};

export const getLikedBy = async (postId) => {
  await delay();
  const { users } = await import('../data/dummyData.js');
  return { users: users.filter(u => u.id !== '20').slice(0, 15) };
};

export const savePost = async (postId) => {
  await delay();
  return { success: true };
};

export const unsavePost = async (postId) => {
  await delay();
  return { success: true };
};

export const getComments = async (postId, page = 1) => {
  await delay();
  const post = getPostById(postId);
  return { comments: post?.comments || [] };
};

export const addComment = async (postId, text) => {
  await delay();
  return { comment: { id: `c_new_${Date.now()}`, userId: '20', text, likes: 0, timestamp: Date.now(), replies: [] } };
};

export const deleteComment = async (postId, commentId) => {
  await delay();
  return { success: true };
};

export const likeComment = async (postId, commentId) => {
  await delay();
  return { success: true };
};

export { getPostById };
