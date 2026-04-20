import SectionTitle from "../../components/SectionTitle";
import CourseCardPremium from "../../components/CourseCardPremium";

export default function Courses() {
  const courses = [
    {
      level: 'Beginner',
      title: 'Beginner English Course',
      description: 'Perfect for students starting from zero. Learn basic grammar, vocabulary, and speaking skills.',
      features: ['Speaking practice', 'Grammar basics', 'Vocabulary building', 'Interactive classes'],
      duration: 'Duration: 3 Months · Classes: 3x/week',
    },
    {
      level: 'Intermediate',
      title: 'Intermediate English Course',
      description: 'For learners who have basics and want to build confidence in speaking and academic skills.',
      features: ['Fluency drills', 'Complex grammar', 'Reading & writing', 'Exam strategies'],
      duration: 'Duration: 4 Months · Classes: 3x/week',
      highlighted: true,
    },
    {
      level: 'Advanced',
      title: 'Advanced English Course',
      description: 'Master advanced communication, professional English, and critical reading.',
      features: ['Advanced speaking', 'Professional writing', 'Presentation skills', 'Literature & analysis'],
      duration: 'Duration: 3 Months · Classes: 2x/week',
    },
  ];

  return (
    <div dir="auto" className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <SectionTitle title="Our English Courses" subtitle="Choose the right course for your level and start improving your English today." />
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <CourseCardPremium
            key={c.title}
            level={c.level}
            title={c.title}
            description={c.description}
            features={c.features}
            duration={c.duration}
            highlighted={Boolean((c as any).highlighted)}
          />
        ))}
      </div>
    </div>
  );
}