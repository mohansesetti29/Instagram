import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../common/Avatar.jsx';
import * as storiesApi from '../../api/stories.js';
import * as usersApi from '../../api/users.js';

export default function StoryBar() {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    storiesApi.getStories()
      .then(res => setStories(res.stories || res.data || res || []))
      .catch(() => setStories([]));
    usersApi.searchUsers('')
      .then(res => setUsers(res.users || res.data || []))
      .catch(() => setUsers([]));
  }, []);

  const storyUsers = stories.slice(0, 12);

  return (
    <div className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {storyUsers.map(story => {
          const user = users.find(u => u.id === story.userId);
          return (
            <div
              key={story.userId}
              className="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0 min-w-[64px]"
              onClick={() => navigate(`/stories/${user?.username}/${story.items?.[0]?.id || story.id}`)}
            >
              <Avatar
                src={user?.avatar}
                username={user?.username}
                size={56}
                story={true}
              />
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[64px]">
                {user?.username}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
