import { NavLink } from 'react-router-dom';
import { Heart, MessageCircle, PlusSquare } from 'lucide-react';

export default function MobileHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 h-[44px] bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 z-40 md:hidden">
      <h1 className="instagram-logo-text text-xl dark:text-white">Instagram</h1>
      <div className="flex items-center gap-3">
        <NavLink to="/create">
          <PlusSquare size={24} className="text-gray-900 dark:text-white" />
        </NavLink>
        <NavLink to="/notifications" className="relative">
          <Heart size={24} className="text-gray-900 dark:text-white" />
        </NavLink>
        <NavLink to="/messages" className="relative">
          <MessageCircle size={24} className="text-gray-900 dark:text-white" />
        </NavLink>
      </div>
    </header>
  );
}
