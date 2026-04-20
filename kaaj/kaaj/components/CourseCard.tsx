"use client";

import { motion } from 'framer-motion';

interface CourseCardProps {
  title: string;
  description: string;
  level: string;
  themed?: boolean;
}

export default function CourseCard({ title, description, level, themed = false }: CourseCardProps) {
  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate':
        return 'bg-blue-50 text-blue-800 border-blue-100';
      case 'advanced':
        return 'bg-blue-100 text-blue-900 border-blue-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return '🌱';
      case 'intermediate':
        return '⚡';
      case 'advanced':
        return '🚀';
      default:
        return '📚';
    }
  };

  return (
    <motion.div
      className={`card ${themed ? 'themed' : 'card-hover-color'} rounded-xl p-4 relative overflow-hidden group`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 card-overlay bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-90"></div>

      {/* Level badge */}
      <div className="relative z-10 mb-4">
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border-2 ${getLevelColor(level)} shadow-sm`}>
          <span className="text-sm">{getLevelIcon(level)}</span>
          {level}
        </span>
      </div>

      {/* Title */}
      <h3 className="relative z-10 text-base font-bold text-blue-600 mb-3 transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 text-gray-700 mb-4 leading-relaxed text-sm">
        {description}
      </p>

      {/* Learn More Button */}
      <div className="relative z-10">
        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2 text-sm">
          <span>Learn More</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-3 right-3 w-12 h-12 bg-blue-100 rounded-full opacity-20 group-hover:opacity-30 transition-opacity"></div>
      <div className="absolute bottom-3 left-3 w-6 h-6 bg-blue-100 rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
    </motion.div>
  );
}