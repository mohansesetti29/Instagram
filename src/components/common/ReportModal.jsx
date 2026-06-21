import { motion, AnimatePresence } from 'framer-motion';
import { Flag, AlertTriangle, Ban } from 'lucide-react';

export default function ReportModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-ig-elevated-dark rounded-xl p-6 w-full max-w-sm mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-gray-200 mb-4">Report</h3>
            {[
              { icon: <Flag size={20} />, label: 'Report inappropriate' },
              { icon: <AlertTriangle size={20} />, label: 'It\'s spam' },
              { icon: <Ban size={20} />, label: 'Block user' },
            ].map(item => (
              <button key={item.label} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg text-sm text-gray-900 dark:text-gray-200">
                {item.icon}
                {item.label}
              </button>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
