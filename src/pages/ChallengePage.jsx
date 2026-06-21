import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function ChallengePage() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black px-4">
      <Shield size={64} className="text-ig-blue mb-4" />
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-2">Verification Challenge</h1>
      <p className="text-sm text-gray-500 text-center mb-6 max-w-md">
        We need to verify it's you. Please enter the code sent to your email or phone.
      </p>
      <input
        type="text"
        placeholder="Enter code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full max-w-xs border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-sm text-center outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 mb-4"
      />
      <button disabled={!code.trim()}
        className="bg-ig-blue disabled:opacity-50 text-white px-6 py-2 rounded-lg text-sm font-semibold">
        Verify
      </button>
    </div>
  );
}
