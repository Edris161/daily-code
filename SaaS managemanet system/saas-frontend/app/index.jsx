import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <p>Welcome to your SaaS management system!</p>
        </main>
      </div>
    </div>
  );
}
