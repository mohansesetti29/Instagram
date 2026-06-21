import { useNavigate } from 'react-router-dom';
import { Smile } from 'lucide-react';
import { useState } from 'react';
import * as postsApi from '../../api/posts.js';
import PostHeader from './PostHeader.jsx';
import PostImage from './PostImage.jsx';
import PostCarousel from './PostCarousel.jsx';
import PostActions from './PostActions.jsx';
import PostLikes from './PostLikes.jsx';
import PostCaption from './PostCaption.jsx';
import PostComments from './PostComments.jsx';
import PostTimestamp from './PostTimestamp.jsx';

export default function PostCard({ post, onLikeToggle, onSaveToggle }) {
  const navigate = useNavigate();
  const [comment, setComment] = useState('');

  const handlePostComment = async () => {
    if (!comment.trim()) return;
    const text = comment;
    setComment('');
    try {
      await postsApi.addComment(post.id, text);
    } catch {
      setComment(text);
    }
  };

  return (
    <div className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg mb-4 max-w-[614px] mx-auto">
      <PostHeader post={post} />
      {post.images?.length === 1 ? (
        <PostImage src={post.images?.[0]} aspectRatio={post.aspectRatio} onDoubleTap={() => onLikeToggle?.(post.id)} />
      ) : (
        <PostCarousel images={post.images} />
      )}
      <PostActions post={post} onLikeToggle={onLikeToggle} onSaveToggle={onSaveToggle} />
      <PostLikes post={post} />
      <PostCaption post={post} />
      <PostComments post={post} />
      <PostTimestamp post={post} />
      {/* Comment input */}
      <div className="flex items-center gap-2 px-4 py-2 border-t border-gray-100 dark:border-gray-800">
        <Smile size={16} className="text-gray-500 flex-shrink-0" />
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
          className="flex-1 text-sm outline-none bg-transparent text-gray-900 dark:text-gray-200 placeholder-gray-500"
        />
        <button
          onClick={handlePostComment}
          className={`text-sm font-semibold ${comment.trim() ? 'text-ig-blue' : 'text-ig-blue/30'} transition-colors`}
        >
          Post
        </button>
      </div>
    </div>
  );
}
