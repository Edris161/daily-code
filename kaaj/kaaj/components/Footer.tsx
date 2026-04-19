import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Kaaj English</h3>
            <p>Empowering students to learn English.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-yellow-400">Home</Link></li>
              <li><Link href="/about" className="hover:text-yellow-400">About</Link></li>
              <li><Link href="/courses" className="hover:text-yellow-400">Courses</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-400">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <p>Phone: +123 456 7890</p>
            <p>WhatsApp: +123 456 7890</p>
            <p>Address: Your Address</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2023 Kaaj English Language Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}