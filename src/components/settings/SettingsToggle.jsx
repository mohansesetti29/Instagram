export default function SettingsToggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
      <span className="text-sm text-gray-900 dark:text-gray-200">{label}</span>
      <button onClick={onChange}
        className={`w-11 h-6 rounded-full p-0.5 transition-colors ${checked ? 'bg-ig-blue' : 'bg-gray-300 dark:bg-gray-600'}`}>
        <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  );
}
