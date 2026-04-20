import SectionTitle from "../../components/SectionTitle";

export default function OnlineClasses() {
  return (
    <div className="container mx-auto px-4 py-8">
      <SectionTitle title="Online Classes" subtitle="Learn English from anywhere" />
      <div className="max-w-4xl mx-auto">
        <p className="text-lg text-gray-700 mb-6">
          Our online classes provide the same high-quality education as our in-person classes, with the flexibility to learn from home.
          Join live interactive sessions with experienced teachers and engage with classmates from around the world.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Benefits of Online Learning</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Flexible scheduling</li>
              <li>Learn from anywhere</li>
              <li>Interactive live sessions</li>
              <li>Access to recorded classes</li>
              <li>Personalized attention</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Technical Requirements</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Stable internet connection</li>
              <li>Computer or tablet</li>
              <li>Webcam and microphone</li>
              <li>Modern web browser</li>
              <li>Zoom or similar platform</li>
            </ul>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Ready to Start Online Learning?</h3>
          <p className="text-gray-700 mb-6">Contact us to enroll in our online courses.</p>
          <a href="/apply" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 mr-4">Apply Now</a>
          <a href="/contact" className="btn btn-primary px-6 py-3">Contact Us</a>
        </div>
      </div>
    </div>
  );
}