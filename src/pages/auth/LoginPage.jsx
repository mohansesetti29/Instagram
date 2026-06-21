import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid = username.trim() && password.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    await login(username, password);
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center gap-3 py-8">
      <div className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg w-[350px] px-10 py-8 flex flex-col items-center">
        <h1 className="instagram-logo-text text-3xl mb-6 dark:text-white">Instagram</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
          <input
            type="text"
            placeholder="Phone number, username or email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs px-3 py-2.5 outline-none focus:border-gray-400 text-gray-900 dark:text-gray-200 placeholder-gray-500"
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs px-3 py-2.5 pr-8 outline-none focus:border-gray-400 text-gray-900 dark:text-gray-200 placeholder-gray-500"
            />
            {password && (
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2">
                {showPassword ? <EyeOff size={16} className="text-gray-500" /> : <Eye size={16} className="text-gray-500" />}
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={!isValid || loading}
            className="w-full bg-ig-blue hover:bg-ig-blue-hover disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-1.5 rounded-lg mt-2 transition-colors"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
        <div className="flex items-center w-full my-4">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
          <span className="px-4 text-xs font-semibold text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
        </div>
        <button className="flex items-center gap-2 text-sm font-semibold text-ig-blue mb-4">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Log in with Facebook
        </button>
        <Link to="/accounts/password/reset" className="text-xs text-ig-blue">Forgot password?</Link>
      </div>
      <div className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg w-[350px] px-10 py-5 text-center">
        <p className="text-sm text-gray-900 dark:text-gray-200">
          Don't have an account?{' '}
          <Link to="/accounts/signup" className="text-ig-blue font-semibold">Sign up</Link>
        </p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-4">Get the app.</p>
        <div className="flex gap-2 justify-center">
          <button className="bg-black dark:bg-white text-white dark:text-black text-xs px-4 py-2 rounded-lg font-semibold">App Store</button>
          <button className="bg-black dark:bg-white text-white dark:text-black text-xs px-4 py-2 rounded-lg font-semibold">Google Play</button>
        </div>
      </div>
    </div>
  );
}
