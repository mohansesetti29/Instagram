import { useState, useEffect } from 'react';
import PostCard from './PostCard.jsx';
import PostSkeleton from '../common/PostSkeleton.jsx';
import * as postsApi from '../../api/posts.js';

export default function Feed() {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postsApi.getFeed()
      .then(res => setPostList(res.posts || res.data || res || []))
      .catch(() => setPostList([]))
      .finally(() => setLoading(false));
  }, []);

  const handleLikeToggle = (postId) => {
    setPostList(prev => prev.map(p =>
      p.id === postId
        ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
        : p
    ));
    const post = postList.find(p => p.id === postId);
    if (post) {
      (post.isLiked ? postsApi.unlikePost(postId) : postsApi.likePost(postId)).catch(() => {});
    }
  };

  const handleSaveToggle = (postId) => {
    setPostList(prev => prev.map(p =>
      p.id === postId ? { ...p, isSaved: !p.isSaved } : p
    ));
    const post = postList.find(p => p.id === postId);
    if (post) {
      (post.isSaved ? postsApi.unsavePost(postId) : postsApi.savePost(postId)).catch(() => {});
    }
  };

  if (loading) {
    return (
      <div className="max-w-[614px] mx-auto">
        {Array.from({ length: 3 }).map((_, i) => <PostSkeleton key={i} />)}
      </div>
    );
  }

  return (
    <div className="max-w-[614px] mx-auto">
      {postList.map(post => (
        <PostCard key={post.id} post={post} onLikeToggle={handleLikeToggle} onSaveToggle={handleSaveToggle} />
      ))}
    </div>
  );
}
