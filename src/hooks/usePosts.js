import { useState, useEffect } from 'react';
import * as postsApi from '../api/posts.js';

export function usePosts(options = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    postsApi.getFeed()
      .then(res => {
        const items = res.posts || res.data || res || [];
        setData(items.slice(0, options.limit || items.length));
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}

export const useExplorePosts = (options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    postsApi.getExplorePosts()
      .then(res => setData(res.posts || res.data || res || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};
