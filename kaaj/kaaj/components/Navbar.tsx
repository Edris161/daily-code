"use client";

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/courses', label: 'Courses' },
    { href: '/teachers', label: 'Teachers' },
    { href: '/online-classes', label: 'Online' },
    { href: '/blog', label: 'Blog' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-blue-600 grid place-items-center text-white shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2" />
            </svg>
          </div>
          <Link href="/" className="text-lg font-semibold text-blue-600">Kaaj English</Link>
        </div>

        {/* Center: pill nav */}
        <div className="hidden lg:flex items-center">
          <div className="bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100 flex items-center gap-4">
            {links.map((l) => {
              const active = pathname === l.href || (l.href !== '/' && pathname?.startsWith(l.href));
              return (
                <Link key={l.href} href={l.href} className={`px-4 py-2 rounded-full text-sm font-medium transition ${active ? 'bg-indigo-700 text-white shadow-md' : 'text-gray-600 hover:text-indigo-700 hover:bg-gray-50'}`}>
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right: CTA */}
        <div className="flex items-center gap-3">
          <Link href="/apply" className="hidden md:inline-flex items-center gap-2 btn btn-primary rounded-full px-5 py-2 shadow-lg font-semibold">
            Apply Now
          </Link>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-md border border-gray-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-sm">
          <div className="flex flex-col px-4 py-3 gap-2">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50" onClick={() => setIsOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link href="/apply" className="block mt-2 px-4 py-2 rounded-full btn btn-primary text-center font-semibold" onClick={() => setIsOpen(false)}>Apply Now</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
