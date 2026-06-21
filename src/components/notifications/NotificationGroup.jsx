import NotificationItem from './NotificationItem.jsx';

export default function NotificationGroup({ label, notifications }) {
  return (
    <div className="mb-6">
      <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2">{label}</h2>
      {notifications.map(notif => (
        <NotificationItem key={notif.id} notification={notif} />
      ))}
    </div>
  );
}
