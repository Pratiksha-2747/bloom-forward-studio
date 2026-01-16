import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Start showing text after a brief delay
    const textTimer = setTimeout(() => setShowText(true), 300);

    // Complete loading after animation
    const completeTimer = setTimeout(() => onComplete(), 2500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-primary/80"
    >
      <div className="text-center">
        <AnimatePresence>
          {showText && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: 0.2
              }}
              className="space-y-4"
            >
              {/* Logo/Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.6, type: "spring", bounce: 0.4 }}
                className="mx-auto w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-8"
              >
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">B</span>
                </div>
              </motion.div>

              {/* Main Text */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-4xl md:text-6xl font-serif font-bold text-white mb-2"
              >
                Bloom Branding
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="text-lg md:text-xl text-white/80 font-light"
              >
                Creating Stories That Bloom
              </motion.p>

              {/* Loading Bar */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.5, duration: 1.2, ease: "easeInOut" }}
                className="mx-auto mt-8 h-1 bg-white/30 rounded-full overflow-hidden"
              >
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ delay: 1.5, duration: 1.2, ease: "easeInOut" }}
                  className="h-full bg-white rounded-full"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Preloader;