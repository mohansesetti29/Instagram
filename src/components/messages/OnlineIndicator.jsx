export default function OnlineIndicator({ online }) {
  return online ? (
    <div className="w-2.5 h-2.5 bg-ig-green rounded-full border-2 border-white dark:border-black" />
  ) : null;
}
