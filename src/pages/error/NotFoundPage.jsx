import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black px-4">
      <h1 className="instagram-logo-text text-4xl mb-6 dark:text-white">Instagram</h1>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-2">Sorry, this page isn't available.</h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        The link you followed may be broken, or the page may have been removed.{' '}
        <span className="text-gray-900 dark:text-gray-200 font-semibold">Go back to Instagram.</span>
      </p>
      <button onClick={() => navigate('/home')}
        className="bg-ig-blue text-white px-6 py-2 rounded-lg text-sm font-semibold">
        Go to Instagram
      </button>
    </div>
  );
}
