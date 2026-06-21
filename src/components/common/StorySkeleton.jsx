import LoadingSkeleton from './LoadingSkeleton.jsx';

export default function StorySkeleton() {
  return (
    <div className="flex gap-4 p-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <LoadingSkeleton className="w-16 h-16 rounded-full" />
          <LoadingSkeleton className="h-2 w-12" />
        </div>
      ))}
    </div>
  );
}
