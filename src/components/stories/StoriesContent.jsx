export default function StoriesContent({ item }) {
  if (!item) return null;
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img src={item.url} alt="" className="max-w-full max-h-full object-contain" />
    </div>
  );
}
