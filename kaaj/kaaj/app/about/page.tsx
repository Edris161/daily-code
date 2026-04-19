import SectionTitle from "../../components/SectionTitle";
import TeacherCard from "../../components/TeacherCard";
import Link from "next/link";

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 opacity-90 -z-10" />
        <div className="container mx-auto px-4 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Kaaj English Language Center</h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              We empower students to communicate confidently in English through expert instruction, modern methods, and strong support.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/apply" className="inline-flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold shadow-md hover:brightness-95 transition">Apply Now</Link>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-white/20 transition">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <SectionTitle title="Our Mission" subtitle="What drives us" />
              <p className="text-gray-700 mb-4">
                To deliver comprehensive English language training that combines experienced instructors with modern teaching techniques and practical practice.
              </p>
              <p className="text-gray-700">
                We focus on measurable progress, real-world communication, and supporting each student with personalized feedback and resources.
              </p>
            </div>
            <div>
              <SectionTitle title="Our Vision" subtitle="Where we're headed" />
              <p className="text-gray-700 mb-4">
                To be the region's most trusted English learning center — helping students succeed academically and professionally with language confidence.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-2xl font-bold text-blue-600">10K+</div>
                  <div className="text-sm text-gray-600">Students Trained</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="text-2xl font-bold text-blue-600">95%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us (features) */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle title="Why Choose Kaaj" subtitle="Our strengths" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white mb-4">👩‍🏫</div>
              <h4 className="font-semibold mb-2">Expert Teachers</h4>
              <p className="text-gray-600 text-sm">Qualified instructors with proven teaching experience and passion for learning.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white mb-4">📚</div>
              <h4 className="font-semibold mb-2">Proven Curriculum</h4>
              <p className="text-gray-600 text-sm">Structured courses with measurable outcomes and real practice opportunities.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-black mb-4">💡</div>
              <h4 className="font-semibold mb-2">Flexible Learning</h4>
              <p className="text-gray-600 text-sm">Online and in-person options to fit busy schedules and learning styles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle title="Meet Our Team" subtitle="Experienced educators" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            <TeacherCard name="John Doe" title="English Instructor" />
            <TeacherCard name="Jane Smith" title="Grammar Specialist" />
            <TeacherCard name="Bob Johnson" title="Speaking Coach" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to join Kaaj?</h3>
          <p className="mb-6 text-white/90">Start your English learning journey today with a program tailored to your goals.</p>
          <Link href="/apply" className="inline-block bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold shadow-md hover:brightness-95 transition">Apply Now</Link>
        </div>
      </section>
    </div>
  );
}