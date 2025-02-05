'use client';

import { ReactNode, useEffect, useState, useTransition } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    startTransition(() => {
      timer = setTimeout(() => {
        if (isPending) {
          setShowLoader(true);
        }
      }, 300); // Show loader if the transition takes longer than 300ms
    });

    return () => {
      clearTimeout(timer);
      setShowLoader(false);
    };
  }, [pathname, isPending]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 bg-white flex items-center justify-center z-50"
          >
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PageTransition;