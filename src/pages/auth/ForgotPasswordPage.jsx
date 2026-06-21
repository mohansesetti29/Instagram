import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSent(true);
  };

  return (
    <div className="flex flex-col items-center py-8">
      <div className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg w-[350px] px-10 py-8 flex flex-col items-center">
        <Link to="/accounts/login" className="self-start mb-4">
          <ArrowLeft size={20} className="text-gray-900 dark:text-gray-200" />
        </Link>
        <svg className="w-16 h-16 text-gray-900 dark:text-gray-200 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 7l-10 7L2 7" />
        </svg>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">Trouble logging in?</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your email, phone or username and we'll send you a link to get back into your account.
        </p>
        {!sent ? (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            <input
              type="text" placeholder="Email, phone or username"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs px-3 py-2.5 outline-none focus:border-gray-400 text-gray-900 dark:text-gray-200 placeholder-gray-500"
            />
            <button type="submit" disabled={!email.trim()}
              className="w-full bg-ig-blue disabled:opacity-50 text-white text-sm font-semibold py-1.5 rounded-lg">
              Send login link
            </button>
          </form>
        ) : (
          <p className="text-sm text-gray-500 text-center">Email sent! Check your inbox.</p>
        )}
        <div className="flex items-center w-full my-4">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
          <span className="px-4 text-xs font-semibold text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
        </div>
        <Link to="/accounts/signup" className="text-sm font-semibold text-ig-blue">Create new account</Link>
      </div>
      <Link to="/accounts/login" className="text-sm text-ig-blue mt-4">Back to login</Link>
    </div>
  );
}
