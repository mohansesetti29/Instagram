import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email: '', fullName: '', username: '', password: '', birthday: '' });

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSignup = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center gap-3 py-8">
      <div className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg w-[350px] px-10 py-8 flex flex-col items-center">
        <h1 className="instagram-logo-text text-3xl mb-3 dark:text-white">Instagram</h1>
        <p className="text-sm text-gray-500 text-center mb-4 font-semibold">
          Sign up to see photos and videos from your friends.
        </p>
        <button className="w-full bg-ig-blue text-white text-sm font-semibold py-1.5 rounded-lg flex items-center justify-center gap-2 mb-3">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Log in with Facebook
        </button>
        <div className="flex items-center w-full mb-4">
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
          <span className="px-4 text-xs font-semibold text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
        </div>
        <form onSubmit={handleSignup} className="w-full flex flex-col gap-2">
          <input
            type="text" placeholder="Mobile number or Email"
            value={form.email} onChange={(e) => update('email', e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs px-3 py-2.5 outline-none focus:border-gray-400 text-gray-900 dark:text-gray-200 placeholder-gray-500"
          />
          <input
            type="text" placeholder="Full Name"
            value={form.fullName} onChange={(e) => update('fullName', e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs px-3 py-2.5 outline-none focus:border-gray-400 text-gray-900 dark:text-gray-200 placeholder-gray-500"
          />
          <input
            type="text" placeholder="Username"
            value={form.username} onChange={(e) => update('username', e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs px-3 py-2.5 outline-none focus:border-gray-400 text-gray-900 dark:text-gray-200 placeholder-gray-500"
          />
          <input
            type="password" placeholder="Password"
            value={form.password} onChange={(e) => update('password', e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-xs px-3 py-2.5 outline-none focus:border-gray-400 text-gray-900 dark:text-gray-200 placeholder-gray-500"
          />
          <p className="text-[11px] text-gray-500 mt-1">
            People who use our service may have uploaded your contact info to Instagram.{' '}
            <a href="#" className="font-semibold">Learn More</a>
          </p>
          <button type="submit"
            className="w-full bg-ig-blue text-white text-sm font-semibold py-1.5 rounded-lg mt-2 hover:bg-ig-blue-hover">
            Sign up
          </button>
          <p className="text-[11px] text-gray-500 text-center mt-4">
            By signing up, you agree to our{' '}
            <a href="#" className="font-semibold">Terms</a>,{' '}
            <a href="#" className="font-semibold">Privacy Policy</a> and{' '}
            <a href="#" className="font-semibold">Cookies Policy</a>.
          </p>
        </form>
      </div>
      <div className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg w-[350px] px-10 py-5 text-center">
        <p className="text-sm text-gray-900 dark:text-gray-200">
          Have an account?{' '}
          <Link to="/accounts/login" className="text-ig-blue font-semibold">Log in</Link>
        </p>
      </div>
      <div className="flex gap-2 justify-center">
        <button className="bg-black dark:bg-white text-white dark:text-black text-xs px-4 py-2 rounded-lg font-semibold">App Store</button>
        <button className="bg-black dark:bg-white text-white dark:text-black text-xs px-4 py-2 rounded-lg font-semibold">Google Play</button>
      </div>
    </div>
  );
}
