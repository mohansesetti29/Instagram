export default function ProfileGridItem({ post }) {
  return (
    <div className="aspect-square cursor-pointer group relative">
      <img src={post.images?.[0]} alt="" className="w-full h-full object-cover" />
      {post.images?.length > 1 && (
        <svg className="absolute top-2 right-2 w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
        </svg>
      )}
    </div>
  );
}
