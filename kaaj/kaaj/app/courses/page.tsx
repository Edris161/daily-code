import SectionTitle from "../../components/SectionTitle";
import CourseCard from "../../components/CourseCard";

export default function Courses() {
  const courses = [
    { title: "TOEFL Preparation", description: "Intensive training for TOEFL exam success.", level: "Intermediate/Advanced" },
    { title: "Beginner English", description: "Perfect for those starting their English journey. Covers basic vocabulary, grammar, and conversation.", level: "Beginner" },
    { title: "Intermediate English", description: "Build on your foundation with more complex grammar, reading, and writing skills.", level: "Intermediate" },
    { title: "Advanced English", description: "Master advanced topics including idioms, professional communication, and literature.", level: "Advanced" },
    { title: "Business English", description: "Specialized course for professional communication, emails, and presentations.", level: "Intermediate/Advanced" },
    { title: "IELTS Preparation", description: "Comprehensive preparation for IELTS exam with practice tests and strategies.", level: "Intermediate/Advanced" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionTitle title="Our Courses" subtitle="Choose the course that fits your level and goals" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course, index) => (
          <CourseCard key={index} title={course.title} description={course.description} level={course.level} />
        ))}
      </div>
    </div>
  );
}