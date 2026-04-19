import SectionTitle from "../../components/SectionTitle";
import TestimonialCard from "../../components/TestimonialCard";

export default function Testimonials() {
  const testimonials = [
    { name: "Alice Johnson", feedback: "Kaaj helped me gain confidence in speaking English. The teachers are amazing and the environment is very supportive. Highly recommended!" },
    { name: "Charlie Brown", feedback: "I improved my IELTS score from 5.5 to 7.0 thanks to the excellent preparation courses at Kaaj. The practice tests were incredibly helpful." },
    { name: "Emma Davis", feedback: "The business English course was exactly what I needed for my job. Now I feel comfortable in international meetings and presentations." },
    { name: "Michael Wilson", feedback: "As a beginner, I was nervous about learning English, but the patient and encouraging teachers made all the difference. I'm now fluent!" },
    { name: "Sarah Lee", feedback: "The online classes are just as effective as in-person ones. Flexible timing and great interaction with teachers." },
    { name: "David Kim", feedback: "Kaaj's TOEFL preparation program is top-notch. I got my target score and got into my dream university." },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionTitle title="Student Testimonials" subtitle="Hear from our successful students" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} name={testimonial.name} feedback={testimonial.feedback} />
        ))}
      </div>
    </div>
  );
}