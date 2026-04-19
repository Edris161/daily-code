import SectionTitle from "../../components/SectionTitle";
import TeacherCard from "../../components/TeacherCard";

export default function Teachers() {
  const teachers = [
    { name: "John Doe", title: "Senior English Instructor", image: "/teacher1.jpg" },
    { name: "Jane Smith", title: "Grammar Specialist", image: "/teacher2.jpg" },
    { name: "Bob Johnson", title: "Speaking Coach", image: "/teacher3.jpg" },
    { name: "Alice Brown", title: "IELTS Trainer", image: "/teacher4.jpg" },
    { name: "Charlie Wilson", title: "Business English Expert", image: "/teacher5.jpg" },
    { name: "Diana Lee", title: "TOEFL Specialist", image: "/teacher6.jpg" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionTitle title="Our Teachers" subtitle="Meet our experienced and dedicated faculty" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teachers.map((teacher, index) => (
          <TeacherCard key={index} name={teacher.name} title={teacher.title} image={teacher.image} />
        ))}
      </div>
    </div>
  );
}