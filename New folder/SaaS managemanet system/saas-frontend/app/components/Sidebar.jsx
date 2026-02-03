import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Menu</h2>
      <ul>
        <li className="mb-4">
          <Link href="/"><a>Dashboard</a></Link>
        </li>
        <li className="mb-4">
          <Link href="/projects"><a>Projects</a></Link>
        </li>
        <li className="mb-4">
          <Link href="/tasks"><a>Tasks</a></Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
