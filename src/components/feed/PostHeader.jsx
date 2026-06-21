import Avatar from '../common/Avatar.jsx';
import VerifiedBadge from '../common/VerifiedBadge.jsx';
import ThreeDotsMenu, { MenuItem } from '../common/ThreeDotsMenu.jsx';
import { users } from '../../data/dummyData.js';
import { useNavigate } from 'react-router-dom';
import { Flag, Share2, Link, Info, UserX } from 'lucide-react';

export default function PostHeader({ post }) {
  const navigate = useNavigate();
  const user = users.find(u => u.id === post.userId);

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-3">
        <Avatar src={user?.avatar} username={user?.username} size={32} />
        <div>
          <div className="flex items-center gap-1">
            <span
              className="font-semibold text-sm text-gray-900 dark:text-gray-200 cursor-pointer hover:underline"
              onClick={() => navigate(`/${user?.username}`)}
            >
              {user?.username}
            </span>
            {user?.isVerified && <VerifiedBadge />}
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{post.location || 'No location'}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {user?.id !== '20' && (
          <button className="text-ig-blue text-xs font-semibold hover:text-ig-blue-hover active:opacity-70 transition-all">Follow</button>
        )}
        <ThreeDotsMenu>
          <MenuItem icon={<Flag size={16} />} label="Report" />
          <MenuItem icon={<Share2 size={16} />} label="Share" />
          <MenuItem icon={<Link size={16} />} label="Copy link" />
          <MenuItem icon={<Info size={16} />} label="About this account" />
          <MenuItem icon={<UserX size={16} />} label="Unfollow" danger />
        </ThreeDotsMenu>
      </div>
    </div>
  );
}
