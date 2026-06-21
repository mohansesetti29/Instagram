export default function StoriesProgressBar({ items, currentIndex, progress }) {
  return (
    <div className="absolute top-2 left-2 right-2 flex gap-1 z-10">
      {items.map((item, i) => (
        <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-50"
            style={{ width: `${i < currentIndex ? 100 : i === currentIndex ? progress : 0}%` }}
          />
        </div>
      ))}
    </div>
  );
}
