"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
      pathname === path
        ? "bg-blue-600 text-white shadow-md"
        : "text-slate-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 border-r border-slate-800 p-6 flex flex-col">
      
      {/* Logo */}
      <div className="mb-10 flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center text-2xl shadow-lg">
          ⚽
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-white leading-tight">
            Futsal Club
          </h2>
          <p className="text-xs text-slate-400">
            Training Dashboard
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        <Link href="/dashboard" className={linkClass("/dashboard")}>
          📊 Dashboard
        </Link>

        <Link href="/dashboard/players" className={linkClass("/dashboard/players")}>
          🧍 Players
        </Link>

        <Link href="/dashboard/teams" className={linkClass("/dashboard/teams")}>
          👥 Teams
        </Link>

        <Link href="/dashboard/schedule" className={linkClass("/dashboard/schedule")}>
          📅 Schedule
        </Link>

        <Link href="/dashboard/fees" className={linkClass("/dashboard/fees")}>
          💳 Fees
        </Link>
      </nav>

      {/* Footer */}
      <div className="pt-6 border-t border-slate-800 text-center">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()}
        </p>
        <p className="text-xs text-slate-400 font-semibold">
          Futsal Academy
        </p>
      </div>
    </aside>
  );
}
