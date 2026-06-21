import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import MobileBottomNav from './MobileBottomNav.jsx';
import MobileHeader from './MobileHeader.jsx';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-ig-secondary-bg dark:bg-black">
      <Sidebar />
      <MobileHeader />
      <main className="lg:ml-[72px] xl:ml-[244px] md:pt-0 pt-[44px] pb-[49px] md:pb-0 min-h-screen">
        <Outlet />
      </main>
      <MobileBottomNav />
    </div>
  );
}
