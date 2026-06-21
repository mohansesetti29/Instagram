import { Music } from 'lucide-react';

export default function ReelInfo({ reel, user }) {
  return (
    <div className="absolute bottom-24 left-4 text-white z-10 max-w-[60%]">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-bold text-sm cursor-pointer hover:underline">{user?.username}</span>
      </div>
      <p className="text-sm mb-1">{reel.caption}</p>
      <div className="flex items-center gap-1 text-sm">
        <Music size={14} />
        <span>{reel.audio}</span>
      </div>
    </div>
  );
}
