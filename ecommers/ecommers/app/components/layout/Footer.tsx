'use client';

import Link from 'next/link';
import { MAIN_CATEGORIES } from '@/constants';

export const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-12 mt-20">
      <div className="container-responsive">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Alibaba</h3>
            <p className="text-neutral-400 text-sm mb-4">
              Global commerce platform connecting buyers and sellers worldwide.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              {MAIN_CATEGORIES.slice(0, 4).map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/help"
                  className="text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-neutral-400 text-sm mb-3">Subscribe to get special offers and updates</p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 bg-neutral-800 text-white rounded border border-neutral-700 text-sm placeholder-neutral-500"
              />
              <button
                type="submit"
                className="w-full px-3 py-2 bg-primary text-white rounded font-medium hover:bg-primary-dark transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-neutral-400 text-sm">
              © 2025 Alibaba. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">Facebook</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">Instagram</a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
