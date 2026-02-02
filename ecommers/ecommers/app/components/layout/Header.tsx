'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ShoppingCart, Search, Menu, X, User, LogOut } from 'lucide-react';
import clsx from 'clsx';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getCartSummary } = useCartStore();
  const { itemCount } = getCartSummary();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border-default shadow-sm">
      <div className="container-responsive py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary">Alibaba</h1>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 mx-8">
            <Input
              type="search"
              placeholder="Search products, suppliers, brands..."
              className="w-full"
              icon={<Search size={18} />}
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link
              href="/buyer/cart"
              className="relative p-2 hover:text-primary transition-colors"
              title="Shopping Cart"
            >
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 hover:text-primary transition-colors"
                title="Account"
              >
                <User size={24} />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background border border-border-default rounded-lg shadow-lg py-2 z-50">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b border-border-light">
                        <p className="font-semibold text-foreground">{user?.name}</p>
                        <p className="text-sm text-text-secondary">{user?.email}</p>
                      </div>

                      {user?.role === 'buyer' && (
                        <>
                          <Link
                            href="/buyer/dashboard"
                            className="block px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                          >
                            Dashboard
                          </Link>
                          <Link
                            href="/buyer/orders"
                            className="block px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                          >
                            Orders
                          </Link>
                          <Link
                            href="/buyer/profile"
                            className="block px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                          >
                            Profile
                          </Link>
                        </>
                      )}

                      {user?.role === 'seller' && (
                        <>
                          <Link
                            href="/seller/dashboard"
                            className="block px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                          >
                            Seller Dashboard
                          </Link>
                          <Link
                            href="/seller/products"
                            className="block px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                          >
                            My Products
                          </Link>
                        </>
                      )}

                      <div className="border-t border-border-light pt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-error transition-colors flex items-center gap-2"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="block px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full"
            icon={<Search size={18} />}
          />
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-border-light space-y-2">
            <Link href="/products" className="block px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
              Products
            </Link>
            <Link href="/categories" className="block px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
              Categories
            </Link>
            <Link href="/help" className="block px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
              Help Center
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};
