import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function EmailSignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  return (
    <div className="flex flex-col items-center py-8">
      <div className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg w-[350px] px-10 py-8 flex flex-col items-center">
        <h1 className="instagram-logo-text text-3xl mb-6 dark:text-white">Instagram</h1>
        <p className="text-sm text-gray-500 text-center mb-4">Enter your email to sign up.</p>
        <input
          type="email" placeholder="Email address"
          value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs px-3 py-2.5 outline-none focus:border-gray-400 mb-3 text-gray-900 dark:text-gray-200 placeholder-gray-500"
        />
        <button onClick={() => navigate('/accounts/signup')}
          className="w-full bg-ig-blue text-white text-sm font-semibold py-1.5 rounded-lg">
          Next
        </button>
        <p className="text-xs text-gray-500 mt-4">
          Have an account?{' '}
          <Link to="/accounts/login" className="text-ig-blue font-semibold">Log in</Link>
        </p>
      </div>
    </div>
  );
}
