'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'md', text = 'Loading...' }) => {
  const sizeMap = {
    sm: 32,
    md: 48,
    lg: 64,
  };

  const loaderSize = sizeMap[size];

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="border-4 border-gray-300 border-t-black rounded-full"
        style={{ width: loaderSize, height: loaderSize }}
      />
      {text && <p className="text-gray-600 font-medium">{text}</p>}
    </div>
  );
};

export default Loader;
