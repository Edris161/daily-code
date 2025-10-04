// app/layout.tsx
import type {Metadata} from "next";
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ResponsiveNav from '@/component/Home/Navbar/ResponsiveNav';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Static metadata export for SEO and social sharing
export const metadata = {
  title: 'Travel Blog',
  description: 'Explore the world through our travel stories and guides.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ResponsiveNav />
        {children}
      </body>
    </html>
  );
};
