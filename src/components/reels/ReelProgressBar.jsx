export default function ReelProgressBar({ segments, currentIndex }) {
  return (
    <div className="absolute top-2 left-2 right-2 flex gap-1 z-20">
      {segments.map((_, i) => (
        <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
          <div className={`h-full bg-white rounded-full ${i < currentIndex ? 'w-full' : i === currentIndex ? 'w-1/2' : 'w-0'}`} />
        </div>
      ))}
    </div>
  );
}
