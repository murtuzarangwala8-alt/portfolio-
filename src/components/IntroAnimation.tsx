import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2000);
    const t4 = setTimeout(() => setVisible(false), 2800);
    const t5 = setTimeout(() => onComplete(), 3400);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-950"
        >
          {/* Background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(254,179,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(254,179,0,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

          {/* Radial glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: phase >= 1 ? 0.12 : 0, scale: phase >= 1 ? 1.5 : 0.5 }}
            transition={{ duration: 1 }}
            className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary-500 to-accent-500 blur-3xl pointer-events-none"
          />

          <div className="relative flex flex-col items-center gap-5 text-center">
            {/* MR Logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: phase >= 1 ? 1 : 0, opacity: phase >= 1 ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-2xl"
            >
              <span className="text-3xl font-black text-white">MR</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl font-bold text-white tracking-tight"
            >
              Murtuza{' '}
              <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                Rangwala
              </span>
            </motion.h1>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 10 }}
              transition={{ duration: 0.4 }}
              className="text-gray-400 text-sm tracking-widest uppercase"
            >
              Finance & Data Analytics
            </motion.p>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 2 ? 1 : 0 }}
              className="w-40 h-0.5 bg-gray-800 rounded-full overflow-hidden mt-1"
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: phase >= 2 ? '100%' : '0%' }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
