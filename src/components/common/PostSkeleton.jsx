import LoadingSkeleton from './LoadingSkeleton.jsx';

export default function PostSkeleton() {
  return (
    <div className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg mb-4">
      <div className="flex items-center gap-3 p-3">
        <LoadingSkeleton className="w-8 h-8 rounded-full" />
        <div className="flex-1">
          <LoadingSkeleton className="h-3 w-24 mb-1" />
          <LoadingSkeleton className="h-2 w-16" />
        </div>
      </div>
      <LoadingSkeleton className="w-full h-[400px]" />
      <div className="p-3">
        <LoadingSkeleton className="h-5 w-24 mb-2" />
        <LoadingSkeleton className="h-3 w-full mb-1" />
        <LoadingSkeleton className="h-3 w-3/4 mb-1" />
        <LoadingSkeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}
