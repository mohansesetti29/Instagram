import { useState, useRef, useEffect } from 'react';

export default function ThreeDotsMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
        <svg className="w-4 h-4 text-gray-900 dark:text-gray-200" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 top-8 bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-50 min-w-[180px]">
          {children}
        </div>
      )}
    </div>
  );
}

export function MenuItem({ icon, label, onClick, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800
        ${danger ? 'text-red-500' : 'text-gray-900 dark:text-gray-200'}`}
    >
      {icon}
      {label}
    </button>
  );
}
