"use client";

import { motion } from 'framer-motion';

interface TeacherCardProps {
  name: string;
  title: string;
  image?: string;
  themed?: boolean;
}

export default function TeacherCard({ name, title, image = '/placeholder.jpg', themed = false }: TeacherCardProps) {
  return (
    <motion.div
      className={`card ${themed ? 'themed' : 'card-hover-color'} rounded-xl p-4 border border-gray-100 transform relative overflow-hidden group text-center`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 card-overlay bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-80"></div>

      {/* Profile Image */}
      <div className="relative z-10 mb-4">
          <motion.div className="relative inline-block" whileHover={{ scale: 1.06 }} transition={{ duration: 0.3 }}>
          <img
            src={image}
            alt={name}
            className="w-20 h-20 rounded-full mx-auto border-4 border-blue-100 shadow-lg object-cover"
          />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white text-xs">👨‍🏫</span>
          </div>
        </motion.div>
      </div>

      {/* Name */}
      <h3 className="relative z-10 text-lg font-bold text-blue-600 mb-2 group-hover:text-blue-700 transition-colors">
        {name}
      </h3>

      {/* Title */}
      <p className="relative z-10 text-gray-600 font-medium mb-4 text-base">
        {title}
      </p>

      {/* Experience indicator */}
      <div className="relative z-10 flex justify-center items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-blue-500 text-sm">★</span>
        ))}
        <span className="text-gray-500 text-xs ml-2">(4.9/5.0)</span>
      </div>

      {/* Contact Button */}
      <button className="relative z-10 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2 text-sm">
        <span>📧</span>
        <span>Contact Teacher</span>
      </button>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-blue-100 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
      <div className="absolute bottom-4 left-4 w-4 h-4 bg-blue-100 rounded-full opacity-40 group-hover:opacity-60 transition-opacity"></div>
    </motion.div>
  );
}