import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">Futsal Club</h2>
      <nav className="flex flex-col gap-3">
        <Link href="/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded">
          Dashboard
        </Link>
        <Link href="/dashboard/players" className="hover:bg-gray-700 px-3 py-2 rounded">
          Players
        </Link>
        <Link href="/dashboard/teams" className="hover:bg-gray-700 px-3 py-2 rounded">
          Teams
        </Link>
        <Link href="/dashboard/schedule" className="hover:bg-gray-700 px-3 py-2 rounded">
          Schedule
        </Link>
        <Link href="/dashboard/fees" className="hover:bg-gray-700 px-3 py-2 rounded">
          Fees
        </Link>
      </nav>
    </aside>
  );
}
