"use client";

import { motion } from 'framer-motion';

interface TestimonialCardProps {
  name: string;
  feedback: string;
  themed?: boolean;
}

export default function TestimonialCard({ name, feedback, themed = false }: TestimonialCardProps) {
  return (
    <motion.div
      className={`card ${themed ? 'themed' : 'card-hover-color'} rounded-xl p-4 border border-gray-100 transform relative overflow-hidden group`}
      whileHover={{ scale: 1.01 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 card-overlay bg-gradient-to-br from-blue-50 to-yellow-50 opacity-0 group-hover:opacity-70"></div>

      {/* Quote icon */}
      <div className="relative z-10 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white text-lg font-bold">"</span>
        </div>
      </div>

      {/* Feedback */}
      <blockquote className="relative z-10 text-gray-700 mb-4 leading-relaxed text-sm italic font-medium">
        "{feedback}"
      </blockquote>

      {/* Author */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-xs">
            {name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <cite className="text-blue-600 font-bold text-sm not-italic">— {name}</cite>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-sm">⭐</span>
            ))}
            <span className="text-gray-500 text-xs ml-1">Verified Student</span>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-6 right-6 w-6 h-6 bg-blue-100 rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
      <div className="absolute bottom-6 left-6 w-3 h-3 bg-yellow-200 rounded-full opacity-50 group-hover:opacity-70 transition-opacity"></div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-full opacity-20"></div>
    </motion.div>
  );
}