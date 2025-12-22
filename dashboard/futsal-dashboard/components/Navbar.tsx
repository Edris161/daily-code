export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-gradient-to-r from-slate-900 to-blue-900 px-6 py-4 shadow-lg">
      {/* Left: Title */}
      <h1 className="text-xl font-extrabold text-white tracking-wide">
        ⚽ Futsal Academy Dashboard
      </h1>

      {/* Right: Profile / Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications (future use) */}
        <button className="relative text-slate-300 hover:text-white transition">
          🔔
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold flex items-center justify-center">
            A
          </div>
          <span className="hidden md:block text-sm font-semibold text-white">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}
