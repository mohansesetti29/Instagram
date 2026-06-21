import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';

export default function MessagesLayout() {
  return (
    <div className="h-screen bg-ig-secondary-bg dark:bg-black overflow-hidden">
      <Sidebar />
      <div className="lg:ml-[72px] xl:ml-[244px] h-full">
        <Outlet />
      </div>
    </div>
  );
}
