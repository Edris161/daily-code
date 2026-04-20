import React from 'react';
import { Play, Lightbulb, Star, GraduationCap, Target, Monitor, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-orange-50 pt-20 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="space-y-8 z-10">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-orange-100 shadow-sm">
            <span className="text-orange-500">✨</span>
            <span className="text-sm font-medium text-gray-600">Welcome to Kaaj English Center</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
            New Way to <br />
            <span className="text-indigo-600">Learn English</span> <br />
            Language
          </h1>
          
          <p className="text-gray-500 text-lg max-w-md leading-relaxed">
            Designed for school and university students. Speak fluently, write powerfully, and unlock global opportunities with expert teachers.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all shadow-lg shadow-orange-200">
              Get Started <span className="text-xl">→</span>
            </button>
            <button className="flex items-center gap-3 text-gray-700 font-semibold hover:text-indigo-600 transition-colors px-6 py-4">
              <div className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center">
                <Play size={18} fill="currentColor" />
              </div>
              Watch Demo
            </button>
          </div>
          
          {/* Main Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-100">
            <div>
              <p className="text-3xl font-bold text-gray-900">2K+</p>
              <p className="text-sm text-gray-400">Happy Students</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">15+</p>
              <p className="text-sm text-gray-400">Expert Teachers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">98%</p>
              <p className="text-sm text-gray-400">Success Rate</p>
            </div>
          </div>
        </div>

        {/* Right Visuals */}
        <div className="relative flex justify-center items-center">
          {/* Circular Decorative Rings */}
          <div className="absolute w-[500px] h-[500px] rounded-full border-2 border-indigo-100 animate-pulse"></div>
          <div className="relative w-[450px] h-[450px] rounded-full bg-indigo-600 overflow-hidden border-8 border-white shadow-2xl">
             {/* Replace with your student image */}
            <div className="absolute inset-0 bg-[url('/student-img.jpg')] bg-cover bg-center" />
          </div>

          {/* Floating UI Elements */}
          <div className="absolute top-10 right-10 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-3">
            <div className="bg-orange-100 p-2 rounded-lg text-orange-500">
              <Lightbulb size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Concept</p>
              <p className="text-sm font-bold">Bright Idea</p>
            </div>
          </div>

          <div className="absolute top-1/4 -left-10 bg-white p-3 rounded-2xl shadow-xl flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <div>
              <p className="text-sm font-bold">4.8 Rating</p>
              <p className="text-[10px] text-gray-400">2,000+ Reviews</p>
            </div>
          </div>
          
          {/* Floating Language Badge */}
          <div className="absolute bottom-20 left-4 bg-indigo-900 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-[10px] font-bold">EN</div>
            <span className="text-sm font-medium">English Pro</span>
          </div>
        </div>
      </div>

      {/* Bottom Feature Bar */}
      <div className="absolute bottom-0 w-full bg-white/50 backdrop-blur-md border-t border-gray-100 py-6">
        <div className="container mx-auto px-6 flex justify-between items-center opacity-60">
          <Feature icon={<Monitor size={20}/>} label="Modern Method" />
          <Feature icon={<Target size={20}/>} label="Private Goals" />
          <Feature icon={<GraduationCap size={20}/>} label="Digital Diploma" />
          <Feature icon={<Users size={20}/>} label="Remote Friendly" />
        </div>
      </div>
    </section>
  );
};

const Feature = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <div className="flex items-center gap-3">
    <div className="text-indigo-600">{icon}</div>
    <span className="text-sm font-semibold text-gray-700">{label}</span>
  </div>
);

export default Hero;
