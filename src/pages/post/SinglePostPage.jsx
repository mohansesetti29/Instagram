import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Bookmark, Send, Smile } from 'lucide-react';
import * as postsApi from '../../api/posts.js';
import * as usersApi from '../../api/users.js';
import Avatar from '../../components/common/Avatar.jsx';
import VerifiedBadge from '../../components/common/VerifiedBadge.jsx';
import PostActions from '../../components/feed/PostActions.jsx';
import PostLikes from '../../components/feed/PostLikes.jsx';
import PostCaption from '../../components/feed/PostCaption.jsx';
import PostTimestamp from '../../components/feed/PostTimestamp.jsx';

export default function SinglePostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState('');
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (!postId) return;
    postsApi.getPost(postId).then(res => {
      const p = res.post || res;
      setPost(p);
      return usersApi.getUserById(p.userId);
    }).then(res => setUser(res.user || res)).catch(() => { setPost(null); setUser(null); });
  }, [postId]);

  const handleLike = () => {
    if (!post) return;
    setPost(p => ({ ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }));
    (post.isLiked ? postsApi.unlikePost(postId) : postsApi.likePost(postId)).catch(() => {});
  };

  const handleSave = () => {
    if (!post) return;
    setPost(p => ({ ...p, isSaved: !p.isSaved }));
    (post.isSaved ? postsApi.unsavePost(postId) : postsApi.savePost(postId)).catch(() => {});
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    postsApi.addComment(postId, comment).then(() => setComment('')).catch(() => {});
  };

  if (!post) return <div className="flex items-center justify-center h-64 text-gray-500">Loading post...</div>;

  const images = post.images || [post.image].filter(Boolean);

  return (
    <div className="max-w-[600px] mx-auto py-4 px-4">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-200 mb-4">
        <ArrowLeft size={20} /> Back
      </button>
      <div className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div className="flex items-center gap-3 p-3">
          <Avatar src={user?.avatar} size={32} />
          <div className="flex-1 flex items-center gap-1">
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-200 cursor-pointer" onClick={() => navigate(`/${user?.username}`)}>{user?.username}</span>
            {user?.isVerified && <VerifiedBadge size={14} />}
          </div>
        </div>

        <div className="relative">
          <img src={images[currentImage]} alt="" className="w-full object-cover max-h-[500px]" />
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === currentImage ? 'bg-ig-blue' : 'bg-gray-300'}`} />
              ))}
            </div>
          )}
        </div>

        <div className="p-3 space-y-2">
          <PostActions post={post} onLike={handleLike} onSave={handleSave} />

          <PostLikes post={post} onLikesClick={() => navigate(`/p/${postId}/liked_by`)} />

          <PostCaption post={post} />

          <button onClick={() => navigate(`/p/${postId}/comments`)} className="text-sm text-gray-500">{post.comments?.length || 0} comments</button>

          <PostTimestamp post={post} />

          <form onSubmit={handleComment} className="flex items-center gap-2 pt-1 border-t border-gray-200 dark:border-gray-700">
            <Smile size={20} className="text-gray-500" />
            <input type="text" value={comment} onChange={e => setComment(e.target.value)} placeholder="Add a comment..." className="flex-1 text-sm outline-none bg-transparent text-gray-900 dark:text-gray-200 placeholder-gray-500" />
            <button type="submit" disabled={!comment.trim()} className="text-sm font-semibold text-ig-blue disabled:opacity-40">Post</button>
          </form>
        </div>
      </div>
    </div>
  );
}
