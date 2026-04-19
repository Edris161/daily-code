import SectionTitle from "../../components/SectionTitle";

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-8">
      <SectionTitle title="Contact Us" subtitle="Get in touch with us" />
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Phone</h4>
              <p className="text-gray-700">+123 456 7890</p>
            </div>
            <div>
              <h4 className="font-semibold">WhatsApp</h4>
              <p className="text-gray-700">+123 456 7890</p>
            </div>
            <div>
              <h4 className="font-semibold">Email</h4>
              <p className="text-gray-700">info@kaajenglish.com</p>
            </div>
            <div>
              <h4 className="font-semibold">Address</h4>
              <p className="text-gray-700">123 Main Street, City, Country</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Send us a Message</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" name="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" name="message" rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}