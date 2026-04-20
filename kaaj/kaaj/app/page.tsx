"use client";

import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import CourseCard from "../components/CourseCard";
import TeacherCard from "../components/TeacherCard";
import TestimonialCard from "../components/TestimonialCard";
import FeatureCard from "../components/FeatureCard";
import Link from "next/link";

import { motion } from 'framer-motion';
import { Users, GraduationCap, Clock, Globe } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <Hero />

      {/* About Preview Section */}
      <motion.section
        className="py-24 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Text Content */}
            <div className="space-y-6">
              <span className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                About Us
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
                A trusted partner in<br />
                mastering <span className="text-indigo-700">English</span>
              </h2>

              <div className="space-y-4 text-gray-500 text-lg leading-relaxed max-w-xl">
                <p>
                  Kaaj English Language Center has helped thousands of school and university students 
                  achieve fluency, build confidence, and unlock new academic and career opportunities.
                </p>
                <p>
                  With expert teachers, modern classrooms, and proven methodology, we make learning 
                  English engaging and effective.
                </p>
              </div>

              <div className="pt-4">
                <Link href="/about" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-orange-100">
                  Learn More <span>→</span>
                </Link>
              </div>
            </div>

            {/* Right Feature Cards (Staggered Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Card 1 */}
              <FeatureCard 
                icon={<Users size={24} />} 
                title="Small Classes" 
                desc="Max 12" 
                bgColor="bg-blue-50/50"
                className="lg:mt-0"
              />
              {/* Card 2 */}
              <FeatureCard 
                icon={<GraduationCap size={24} />} 
                title="Certified" 
                desc="Teachers" 
                bgColor="bg-orange-50/40"
                className="lg:-mt-12"
              />
              {/* Card 3 */}
              <FeatureCard 
                icon={<Clock size={24} />} 
                title="Flexible" 
                desc="Schedule" 
                bgColor="bg-emerald-50/40"
              />
              {/* Card 4 */}
              <FeatureCard 
                icon={<Globe size={24} />} 
                title="Online &" 
                desc="On-site" 
                bgColor="bg-purple-50/40"
                className="lg:-mt-12"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Courses Section */}
      <motion.section
        className="py-16 bg-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <SectionTitle title="Our Courses" subtitle="Choose the right course for you" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CourseCard themed title="TOEFL Preparation" description="Intensive training for TOEFL exam success." level="Intermediate/Advanced" />
            <CourseCard themed title="Beginner English" description="Start your English journey from basics." level="Beginner" />
            <CourseCard themed title="Intermediate English" description="Build on your existing knowledge." level="Intermediate" />
            <CourseCard themed title="Advanced English" description="Master English for professional use." level="Advanced" />
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        className="py-16 bg-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <SectionTitle title="Why Choose Us?" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              className="card themed rounded-xl p-6 transform relative overflow-hidden group transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-white text-2xl">👨‍🏫</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Experienced Teachers</h3>
                <p className="text-white/90 leading-relaxed">Learn from qualified and experienced instructors with years of teaching expertise.</p>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-6 right-6 w-8 h-8 bg-white/6 rounded-full opacity-20 group-hover:opacity-36 transition-opacity"></div>
            </motion.div>

            <motion.div
              className="card themed rounded-xl p-6 transform relative overflow-hidden group transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-white text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Flexible Learning</h3>
                <p className="text-white/90 leading-relaxed">Online and offline classes to fit your schedule and learning preferences.</p>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-6 right-6 w-8 h-8 bg-white/6 rounded-full opacity-20 group-hover:opacity-36 transition-opacity"></div>
            </motion.div>

            <motion.div
              className="card themed rounded-xl p-6 transform relative overflow-hidden group transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-white text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Proven Results</h3>
                <p className="text-white/90 leading-relaxed">Thousands of students have improved their English skills and achieved their goals.</p>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-6 right-6 w-8 h-8 bg-white/6 rounded-full opacity-20 group-hover:opacity-36 transition-opacity"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Teachers Preview */}
      <motion.section
        className="py-16 bg-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <SectionTitle title="Our Teachers" subtitle="Meet our expert faculty" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TeacherCard themed name="John Doe" title="English Instructor" />
            <TeacherCard themed name="Jane Smith" title="Grammar Specialist" />
            <TeacherCard themed name="Bob Johnson" title="Speaking Coach" />
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="py-16 bg-transparent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <SectionTitle title="What Our Students Say" />
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{
                x: [0, -100 * 4], // Move through 4 cards
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {/* Duplicate testimonials for seamless loop */}
              {[
                { name: "Alice Johnson", feedback: "Kaaj helped me gain confidence in speaking English. The teachers are amazing and the environment is very supportive. Highly recommended!" },
                { name: "Charlie Brown", feedback: "I improved my IELTS score from 5.5 to 7.0 thanks to the excellent preparation courses at Kaaj. The practice tests were incredibly helpful." },
                { name: "Emma Davis", feedback: "The business English course was exactly what I needed for my job. Now I feel comfortable in international meetings and presentations." },
                { name: "Michael Wilson", feedback: "As a beginner, I was nervous about learning English, but the patient and encouraging teachers made all the difference. I'm now fluent!" },
                { name: "Sarah Lee", feedback: "The online classes are just as effective as in-person ones. Flexible timing and great interaction with teachers." },
                { name: "David Kim", feedback: "Kaaj's TOEFL preparation program is top-notch. I got my target score and got into my dream university." },
                { name: "Lisa Chen", feedback: "The speaking practice sessions really boosted my confidence. I can now communicate effectively in English." },
                { name: "Robert Taylor", feedback: "Excellent curriculum and dedicated teachers. My English skills improved dramatically in just a few months." },
              ].map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-80">
                  <TestimonialCard themed name={testimonial.name} feedback={testimonial.feedback} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Start Learning?
          </motion.h2>
          <motion.p
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of students who have improved their English with us.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href="/apply" className="btn btn-primary px-8 py-4 rounded-lg text-lg">Enroll Now</Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
