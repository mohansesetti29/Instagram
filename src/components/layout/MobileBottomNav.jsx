import { NavLink } from 'react-router-dom';
import { Home, Search, Clapperboard, ShoppingBag, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function MobileBottomNav() {
  const { user } = useAuth();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[49px] bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700 flex items-center justify-around px-2 z-50 md:hidden">
      <NavLink to="/home" className={({ isActive }) => `p-2 ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
        <Home size={24} />
      </NavLink>
      <NavLink to="/explore" className={({ isActive }) => `p-2 ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
        <Search size={24} />
      </NavLink>
      <NavLink to="/reels" className={({ isActive }) => `p-2 ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
        <Clapperboard size={24} />
      </NavLink>
      <NavLink to="/shop" className={({ isActive }) => `p-2 ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
        <ShoppingBag size={24} />
      </NavLink>
      <NavLink to={`/${user?.username || 'current_user'}`} className={({ isActive }) => `p-2 ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
        <User size={24} />
      </NavLink>
    </nav>
  );
}
