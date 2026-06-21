import { useNavigate } from 'react-router-dom';

export default function Avatar({ src, username, size = 32, story = false, onClick, className = '' }) {
  const navigate = useNavigate();
  const handleClick = onClick || (() => username && navigate(`/${username}`));

  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      <div className={`rounded-full overflow-hidden ${story ? 'p-[2px] story-gradient' : ''}`}>
        <div className={`rounded-full overflow-hidden ${story ? 'p-[2px] bg-white dark:bg-black' : ''}`}>
          <img
            src={src}
            alt={username || ''}
            className="rounded-full object-cover cursor-pointer"
            style={{ width: size - (story ? 8 : 0), height: size - (story ? 8 : 0) }}
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}
