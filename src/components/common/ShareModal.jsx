import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Link, Facebook, Twitter, MessageCircle, Mail } from 'lucide-react';

export default function ShareModal({ isOpen, onClose, url = '' }) {
  const copyLink = () => {
    navigator.clipboard?.writeText(url || window.location.href);
    onClose();
  };

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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Share</h3>
              <button onClick={onClose}><X size={20} className="text-gray-500" /></button>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { icon: <Send size={24} />, label: 'Messages' },
                { icon: <Link size={24} />, label: 'Copy Link', onClick: copyLink },
                { icon: <Facebook size={24} />, label: 'Facebook' },
                { icon: <Twitter size={24} />, label: 'Twitter' },
                { icon: <MessageCircle size={24} />, label: 'WhatsApp' },
                { icon: <Mail size={24} />, label: 'Email' },
              ].map((item) => (
                <button key={item.label} onClick={item.onClick} className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300">
                    {item.icon}
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
