import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home, Search, Compass, Clapperboard, MessageCircle, Heart, PlusSquare, User,
  Menu, LogOut, Moon, Sun, Settings, Bookmark, Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import Avatar from '../common/Avatar.jsx';

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDark, toggleDark } = useTheme();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const mainLinks = [
    { to: '/home', icon: <Home size={24} />, label: 'Home' },
    { to: '/explore', icon: <Search size={24} />, label: 'Search' },
    { to: '/explore', icon: <Compass size={24} />, label: 'Explore' },
    { to: '/reels', icon: <Clapperboard size={24} />, label: 'Reels' },
    { to: '/messages', icon: <MessageCircle size={24} />, label: 'Messages' },
    { to: '/notifications', icon: <Heart size={24} />, label: 'Notifications' },
    { to: '/create', icon: <PlusSquare size={24} />, label: 'Create' },
  ];

  const moreItems = [
    { icon: <Settings size={18} />, label: 'Settings', onClick: () => { navigate('/accounts/settings'); setShowMoreMenu(false); } },
    { icon: <Activity size={18} />, label: 'Your activity', onClick: () => setShowMoreMenu(false) },
    { icon: <Bookmark size={18} />, label: 'Saved', onClick: () => setShowMoreMenu(false) },
    { icon: isDark ? <Sun size={18} /> : <Moon size={18} />, label: isDark ? 'Light mode' : 'Dark mode', onClick: () => { toggleDark(); setShowMoreMenu(false); } },
    { icon: <LogOut size={18} />, label: 'Log out', onClick: () => { logout(); navigate('/accounts/login'); setShowMoreMenu(false); } },
  ];

  return (
    <>
      {/* Full sidebar (xl) */}
      <aside className="hidden xl:flex flex-col fixed left-0 top-0 h-full w-[244px] border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-black px-3 py-2 z-40">
        <div className="px-3 py-6 mb-4">
          <h1 className="instagram-logo-text text-2xl dark:text-white">Instagram</h1>
        </div>
        <nav className="flex-1 flex flex-col gap-1">
          {mainLinks.map(link => (
            <NavLink
              key={link.to + link.label}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-4 px-3 py-3 rounded-lg transition-all
                ${isActive ? 'font-bold' : 'font-normal'}
                hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-900 dark:text-gray-200`
              }
            >
              {link.icon}
              <span className="text-base">{link.label}</span>
            </NavLink>
          ))}
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="flex items-center gap-4 px-3 py-3 rounded-lg w-full hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-900 dark:text-gray-200"
            >
              <Menu size={24} />
              <span className="text-base">More</span>
            </button>
            {showMoreMenu && (
              <div className="absolute bottom-full left-0 mb-2 w-full bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-2">
                {moreItems.map((item, i) => (
                  <button
                    key={i}
                    onClick={item.onClick}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-200"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <NavLink
            to={`/${user?.username || 'current_user'}`}
            className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-900 dark:text-gray-200"
          >
            <Avatar src={user?.avatar} size={24} />
            <span className="text-base">Profile</span>
          </NavLink>
        </div>
      </aside>

      {/* Collapsed sidebar (lg-xl) */}
      <aside className="hidden lg:flex xl:hidden flex-col fixed left-0 top-0 h-full w-[72px] border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-black items-center py-2 z-40">
        <div className="py-4 mb-2">
          <svg className="w-6 h-6 dark:text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </div>
        <nav className="flex-1 flex flex-col items-center gap-2">
          {mainLinks.map(link => (
            <NavLink
              key={link.to + link.label}
              to={link.to}
              className={({ isActive }) =>
                `p-3 rounded-lg transition-all ${isActive ? 'font-bold' : ''} hover:bg-gray-100 dark:hover:bg-gray-900`
              }
            >
              <span className="dark:text-white">{link.icon}</span>
            </NavLink>
          ))}
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            <Menu size={24} className="dark:text-white" />
          </button>
        </nav>
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700 w-full flex justify-center py-2">
          <NavLink to={`/${user?.username || 'current_user'}`}>
            <Avatar src={user?.avatar} size={24} />
          </NavLink>
        </div>
      </aside>
    </>
  );
}
