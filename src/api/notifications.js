import { notifications } from '../data/dummyData.js';

const delay = (ms = 100) => new Promise(r => setTimeout(r, ms));

export const getNotifications = async () => {
  await delay();
  return { notifications };
};

export const markNotificationRead = async (notificationId) => {
  await delay();
  return { success: true };
};

export const markAllNotificationsRead = async () => {
  await delay();
  return { success: true };
};

export const getUnreadCount = async () => {
  await delay();
  return { count: notifications.filter(n => !n.read).length };
};
