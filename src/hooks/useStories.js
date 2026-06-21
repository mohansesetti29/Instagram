import { useState, useEffect } from 'react';
import * as storiesApi from '../api/stories.js';

export const useStories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storiesApi.getStories()
      .then(res => setData(res.stories || res.data || res || []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  return { stories: data, loading };
};
