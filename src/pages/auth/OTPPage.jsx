import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OTPPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const refs = useRef([]);

  useEffect(() => { refs.current[0]?.focus(); }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    if (value && index < 5) refs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (code.every(d => d)) navigate('/home');
  };

  return (
    <div className="flex flex-col items-center py-8">
      <div className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg w-[350px] px-10 py-8 flex flex-col items-center">
        <h1 className="instagram-logo-text text-3xl mb-6 dark:text-white">Instagram</h1>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">Enter confirmation code</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter the code we sent to your email or phone.
        </p>
        <div className="flex gap-2 mb-6">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => refs.current[i] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-10 h-12 text-center border border-gray-300 dark:border-gray-600 rounded-lg text-lg font-semibold outline-none focus:border-gray-900 dark:focus:border-gray-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
            />
          ))}
        </div>
        <button onClick={handleVerify} disabled={!code.every(d => d)}
          className="w-full bg-ig-blue disabled:opacity-50 text-white text-sm font-semibold py-1.5 rounded-lg">
          Verify
        </button>
        <p className="text-xs text-gray-500 mt-4">
          Didn't receive the code?{' '}
          <button className="text-ig-blue font-semibold">Resend</button>
        </p>
      </div>
    </div>
  );
}
