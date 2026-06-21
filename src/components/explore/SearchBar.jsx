import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ placeholder = 'Search', onSearch, initialValue = '' }) {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => { setQuery(initialValue); }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/explore/search?q=${encodeURIComponent(query.trim())}`);
      onSearch?.(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg py-2.5 pl-9 pr-4 text-sm outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600 text-gray-900 dark:text-gray-200 placeholder-gray-500"
      />
    </form>
  );
}
