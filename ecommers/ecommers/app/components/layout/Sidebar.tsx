'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserRole } from '@/types';
import { Menu, X, Home, Package, Heart, Settings, LogOut, BarChart3, Plus } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import clsx from 'clsx';

interface SidebarProps {
  userRole: UserRole;
}

const buyerMenu = [
  { label: 'Dashboard', href: '/buyer/dashboard', icon: Home },
  { label: 'Orders', href: '/buyer/orders', icon: Package },
  { label: 'Wishlist', href: '/buyer/wishlist', icon: Heart },
  { label: 'Profile', href: '/buyer/profile', icon: Settings },
];

const sellerMenu = [
  { label: 'Dashboard', href: '/seller/dashboard', icon: Home },
  { label: 'Products', href: '/seller/products', icon: Package },
  { label: 'Add Product', href: '/seller/products/new', icon: Plus },
  { label: 'Orders', href: '/seller/orders', icon: Package },
  { label: 'Analytics', href: '/seller/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/seller/profile', icon: Settings },
];

const adminMenu = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: Home },
  { label: 'Users', href: '/admin/users', icon: Settings },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Orders', href: '/admin/orders', icon: Package },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
];

export const Sidebar = ({ userRole }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const { logout } = useAuthStore();

  const menu =
    userRole === 'buyer' ? buyerMenu : userRole === 'seller' ? sellerMenu : adminMenu;

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-primary text-white rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-0 left-0 h-screen w-64 bg-neutral-900 text-white p-6 transition-transform duration-300 z-40',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:translate-x-0 md:relative md:w-72'
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-8 md:mb-12">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-bold">
            A
          </div>
          <span className="text-xl font-bold">Alibaba</span>
        </Link>

        {/* Navigation */}
        <nav className="space-y-2 mb-auto">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                )}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
