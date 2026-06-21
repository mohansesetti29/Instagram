import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export default function SuspendedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black px-4">
      <AlertTriangle size={64} className="text-red-500 mb-4" />
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-2">Account Suspended</h1>
      <p className="text-sm text-gray-500 text-center mb-6 max-w-md">
        Your account has been suspended for violating our terms of service.
        If you believe this is a mistake, you can appeal this decision.
      </p>
      <div className="flex gap-3">
        <button onClick={() => navigate('/home')}
          className="bg-ig-blue text-white px-6 py-2 rounded-lg text-sm font-semibold">Appeal</button>
        <button onClick={() => navigate('/accounts/login')}
          className="border border-gray-300 dark:border-gray-600 px-6 py-2 rounded-lg text-sm font-semibold text-gray-900 dark:text-gray-200">Log out</button>
      </div>
    </div>
  );
}
