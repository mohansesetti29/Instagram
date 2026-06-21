import { users } from './dummyUsers.js';
import { posts } from './dummyPosts.js';

const now = Date.now();
const HOUR = 3600000;

const notificationTypes = ['like', 'comment', 'follow', 'mention', 'tag', 'live', 'story_like'];

export const notifications = Array.from({ length: 40 }, (_, i) => {
  const type = notificationTypes[i % notificationTypes.length];
  const user = users[(i + 3) % users.length];
  const post = posts[i % posts.length];

  return {
    id: `notif_${i + 1}`,
    type,
    userId: user.id,
    postId: type === 'follow' || type === 'live' ? null : post.id,
    text: type === 'comment' ? ['This is amazing!', 'Love this!', 'So cool!', '🔥🔥🔥'][i % 4] : '',
    timestamp: now - i * 3 * HOUR,
    read: i < 20,
    postThumbnail: type === 'follow' || type === 'live' ? null : post.images[0],
  };
});

export const getNotificationsByType = (type) => notifications.filter(n => n.type === type);
