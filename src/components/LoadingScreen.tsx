import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-foreground flex items-center justify-center"
        >
          <div className="flex flex-col items-center">
            {/* Logo letters animate in one by one */}
            <div className="flex overflow-hidden">
              {"IRA".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-6xl sm:text-7xl font-light tracking-[0.5em] text-background"
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Underline expands */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="w-16 h-[1px] mt-6 origin-center"
              style={{ background: "var(--gradient-rose-soft)" }}
            />

            {/* Tagline fades in */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="text-[10px] font-body tracking-[0.4em] uppercase text-background/40 mt-5"
            >
              Timeless Elegance
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
