import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext.jsx';

export default function Toast() {
  const { toasts, removeToast } = useNotification();

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[60] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm font-medium
              ${toast.type === 'success' ? 'bg-ig-green text-white' : ''}
              ${toast.type === 'error' ? 'bg-ig-red text-white' : ''}
              ${toast.type === 'info' ? 'bg-gray-800 text-white' : ''}`}
          >
            {toast.type === 'success' && <CheckCircle size={18} />}
            {toast.type === 'error' && <XCircle size={18} />}
            {toast.type === 'info' && <AlertCircle size={18} />}
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
