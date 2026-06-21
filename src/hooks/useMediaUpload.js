import { useState, useCallback } from 'react';
import client from '../api/client.js';

export const useMediaUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const upload = useCallback(async (files) => {
    setUploading(true);
    setProgress(0);
    try {
      const formData = new FormData();
      files.forEach(f => formData.append('files', f));
      const res = await client.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          setProgress(Math.round((e.loaded / e.total) * 100));
        },
      });
      return res.data.urls || res.data;
    } catch (err) {
      throw err;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }, []);

  return { upload, uploading, progress };
};
