export default function Navbar() {
  return (
    <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <h1 className="text-lg font-semibold text-white tracking-wide">
          Dashboard
        </h1>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <span className="text-slate-300 text-sm">
            Welcome, Admin
          </span>

          <button
            className="px-4 py-2 rounded-lg
                       bg-red-500/10 text-red-400
                       hover:bg-red-500 hover:text-white
                       transition-all duration-200
                       font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
