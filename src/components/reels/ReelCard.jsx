export default function ReelCard({ reel, isActive }) {
  return (
    <div className="h-screen w-full relative snap-item bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-pink-800/50 to-orange-700/50" />
      <div className="absolute bottom-24 left-4 text-white z-10">
        <span className="font-bold text-sm">{reel.username}</span>
        <p className="text-sm">{reel.caption}</p>
      </div>
    </div>
  );
}
