import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PaymentsPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-[600px] mx-auto py-4 px-4">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)}><ArrowLeft size={24} className="text-gray-900 dark:text-gray-200" /></button>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Payments</h1>
      </div>
      <div className="bg-white dark:bg-ig-elevated-dark border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
        <p className="text-sm text-gray-500">No payment methods added yet.</p>
        <button className="mt-3 text-ig-blue font-semibold text-sm">Add payment method</button>
      </div>
    </div>
  );
}
