import SectionTitle from "../../components/SectionTitle";
import TeacherCard from "../../components/TeacherCard";
import Link from "next/link";

export default function About() {
  return (
    <div dir="auto">
      {/* Hero */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 md:p-16 shadow-xl text-white transition-transform transform">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4">About Kaaj English Language Center</h1>
              <p className="text-md md:text-lg text-white/90 mb-6">Empowering students with the confidence and skills to succeed in English for academic and professional growth.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
                <Link href="/apply" className="inline-flex items-center justify-center gap-2 btn btn-primary px-6 py-3 hover:scale-[1.02] transition">Enroll Now</Link>
                <a href="https://wa.me/0000000000" aria-label="Contact via WhatsApp" className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-white/20 transition">Contact via WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="bg-white/6 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-lg">
              <SectionTitle title="Our Story" subtitle="How Kaaj began" />
              <p className="text-gray-100 leading-relaxed">Kaaj English Language Center was founded with a vision to help students overcome language barriers and unlock new opportunities in education and career. We started small, focused on results, and grew by putting students first.</p>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md bg-white/6 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder" alt="students learning" className="w-full h-64 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/6 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-2">Mission</h3>
              <p className="text-gray-100">To provide high-quality English education that helps students succeed in school, university, and beyond.</p>
            </div>
            <div className="bg-white/6 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-bold mb-2">Vision</h3>
              <p className="text-gray-100">To become a leading English language institute known for excellence, innovation, and student success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <SectionTitle title="Why Choose Us" subtitle="What sets us apart" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {[
              { title: 'Experienced teachers', desc: 'Skilled, caring instructors focused on your progress.' },
              { title: 'Student-focused', desc: 'Personalized feedback and supportive learning environment.' },
              { title: 'Flexible schedules', desc: 'Morning, evening, and weekend classes to fit your life.' },
              { title: 'Affordable programs', desc: 'Quality courses priced for students and learners.' },
            ].map((item) => (
              <div key={item.title} className="bg-white/6 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-md hover:scale-105 transform transition"> 
                <div className="text-2xl font-semibold text-white mb-2">{item.title}</div>
                <div className="text-sm text-gray-200">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Teaching Approach */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white/6 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-lg">
            <SectionTitle title="Our Teaching Approach" subtitle="Learning by doing" />
            <p className="text-gray-100 mb-4">We believe in learning by doing. Our classes are practical, speaking-focused, and interactive — designed to help students use English confidently in real-life situations.</p>
            <div className="flex flex-wrap gap-4">
              <span className="inline-block bg-white/8 border border-white/8 rounded-full px-4 py-2 text-sm">Practical learning</span>
              <span className="inline-block bg-white/8 border border-white/8 rounded-full px-4 py-2 text-sm">Speaking-focused</span>
              <span className="inline-block bg-white/8 border border-white/8 rounded-full px-4 py-2 text-sm">Interactive classes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team (Preview) */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle title="Meet Our Team" subtitle="Dedicated instructors" />
          <p className="text-gray-200 max-w-2xl">Our dedicated team of instructors is committed to helping every student succeed.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            <TeacherCard name="Aisha Rahimi" title="Lead Instructor" />
            <TeacherCard name="Farhad Karimi" title="Speaking Coach" />
            <TeacherCard name="Laila Ahmadi" title="Exam Prep Specialist" />
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-10 text-center shadow-xl">
            <h3 className="text-2xl font-bold mb-3">Start your English journey today with Kaaj English Language Center.</h3>
            <p className="mb-6 text-white/90">Build confidence, improve grades, and open new opportunities.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/apply" className="inline-flex items-center justify-center btn btn-primary px-6 py-3">Enroll Now</Link>
              <a href="https://wa.me/0000000000" aria-label="Contact via WhatsApp" className="inline-flex items-center justify-center bg-white/10 text-white px-6 py-3 rounded-lg font-semibold shadow-md">Contact via WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}