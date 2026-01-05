"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  CubeIcon,
  UsersIcon,
  CurrencyDollarIcon,
  BellIcon,
  ChartBarIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "SaaS Apps", href: "/apps", icon: CubeIcon },
    { name: "Subscriptions", href: "/subscriptions", icon: CurrencyDollarIcon },
    { name: "Users", href: "/users", icon: UsersIcon },
    { name: "Billing", href: "/billing", icon: CurrencyDollarIcon },
    { name: "Notifications", href: "/notifications", icon: BellIcon },
    { name: "Reports", href: "/reports", icon: ChartBarIcon },
  ];

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-slate-900 text-slate-100 h-screen sticky top-0 transition-all duration-300 flex flex-col`}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {!collapsed && (
          <h2 className="text-lg font-semibold tracking-wide">
            SaaS Manager
          </h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded hover:bg-slate-800 transition"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4 flex flex-col gap-1 px-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }
              `}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 text-xs text-slate-400 border-t border-slate-700">
          © 2026 SaaS Manager
        </div>
      )}
    </aside>
  );
}
