"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative py-24 overflow-hidden">

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-25 animate-bounce" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-md">
            🎓 Trusted by 10,000+ Students Worldwide
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold text-blue-600 mb-6 leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Learn English with
          <span className="block text-yellow-500 drop-shadow-lg">Confidence</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Join thousands of students mastering English through our comprehensive courses,
          expert teachers, and innovative learning methods designed for school and university students.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            href="/apply"
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-8 py-4 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg flex items-center gap-2"
          >
            <span>🚀</span> Start Learning Today
          </Link>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg flex items-center gap-2"
          >
            <span>💬</span> Contact on WhatsApp
          </a>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
            <div className="text-gray-600 font-medium">Happy Students</div>
          </div>
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600 font-medium">Expert Teachers</div>
          </div>
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
            <div className="text-gray-600 font-medium">Success Rate</div>
          </div>
          <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-blue-600 mb-2">5+</div>
            <div className="text-gray-600 font-medium">Years Experience</div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-20">
          <path fill="#ffffff" d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
}