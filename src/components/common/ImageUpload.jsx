import { useRef, useState, useCallback } from 'react';

export default function ImageUpload({ onUpload, multiple = false, children }) {
  const inputRef = useRef(null);
  const { upload, uploading, progress } = { upload: async () => [] };

  const handleClick = () => inputRef.current?.click();

  const handleChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    const urls = files.map((_, i) => `https://picsum.photos/600/600?random=${Date.now()}_${i}`);
    onUpload(urls);
    e.target.value = '';
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />
      <div onClick={handleClick}>{children}</div>
    </div>
  );
}
