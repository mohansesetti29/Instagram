import { motion } from 'framer-motion';

export default function Spinner({ size = 24, color = '#0095F6' }) {
  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        className="rounded-full border-2 border-t-transparent"
        style={{ width: size, height: size, borderColor: `${color}33`, borderTopColor: color }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}
