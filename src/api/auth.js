import { getCurrentUser } from '../data/dummyData.js';

const delay = (ms = 200) => new Promise(r => setTimeout(r, ms));

export const login = async (username, password) => {
  await delay();
  return { user: getCurrentUser(), token: 'mock_token_123' };
};

export const signup = async (data) => {
  await delay();
  return { user: getCurrentUser(), token: 'mock_token_123' };
};

export const logout = async () => {
  await delay();
  return { success: true };
};

export const forgotPassword = async (email) => {
  await delay();
  return { success: true };
};

export const verifyOTP = async (data) => {
  await delay();
  return { success: true };
};

export const resetPassword = async (data) => {
  await delay();
  return { success: true };
};

export { getCurrentUser };
