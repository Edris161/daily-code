'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRideStore } from '@/store/useRideStore';
import Button from './ui/Button';

const Navbar: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, userName, setIsAuthenticated, userRole } = useRideStore();

  const handleLogout = () => {
    setIsAuthenticated(false);
    router.push('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-black hover:opacity-80 transition-opacity">
            Uber
          </Link>

          {/* Center Navigation - Conditionally shown */}
          {isAuthenticated && (
            <div className="hidden md:flex gap-6">
              <Link
                href="/"
                className="text-gray-700 hover:text-black transition-colors font-medium"
              >
                Home
              </Link>
              {userRole === 'passenger' && (
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-black transition-colors font-medium"
                >
                  Rides
                </Link>
              )}
              {userRole === 'driver' && (
                <Link
                  href="/driver"
                  className="text-gray-700 hover:text-black transition-colors font-medium"
                >
                  Dashboard
                </Link>
              )}
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex gap-3 items-center">
            {isAuthenticated ? (
              <>
                <Link href="/profile" className="text-gray-700 hover:text-black transition-colors font-medium text-sm">
                  {userName}
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="secondary" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
