export default function SettingsMenu({ title, items }) {
  return (
    <div className="mb-6">
      <h3 className="text-xs font-semibold text-gray-500 mb-2 px-2 tracking-wider">{title}</h3>
      <div className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        {items.map((item, i) => (
          <button key={i} onClick={item.onClick}
            className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-200 ${i < items.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
