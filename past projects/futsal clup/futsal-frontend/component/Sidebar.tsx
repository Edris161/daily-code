import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-linear-to-b from-slate-900 to-slate-800 text-gray-100 shadow-xl">
      {/* Logo / Title */}
      <div className="px-6 py-5 border-b border-slate-700">
        <h2 className="text-2xl font-bold tracking-wide text-white">
          ⚽Nokhbakan FC
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Admin Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="px-4 py-6 space-y-2">
        <SidebarLink href="/dashboard" label="Dashboard" />
        <SidebarLink href="/player" label="Players" />
        <SidebarLink href="/team" label="Teams" />
        <SidebarLink href="/training" label="Trainings" />
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-full px-6 py-4 border-t border-slate-700 text-sm text-slate-400">
        © 2025 Futsal Club
      </div>
    </aside>
  );
}

/* Reusable Sidebar Link */
function SidebarLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2 rounded-lg
                 text-slate-300 hover:text-white
                 hover:bg-slate-700/60
                 transition-all duration-200"
    >
      <span className="font-medium">{label}</span>
    </Link>
  );
}
