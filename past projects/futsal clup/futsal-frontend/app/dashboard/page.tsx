import { FaUsers, FaFutbol, FaDumbbell } from "react-icons/fa"; // optional icons

export default function DashboardPage() {
  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-slate-900 mb-6">
        Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Players */}
        <div className="flex items-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-200">
          <div className="p-4 bg-blue-500 rounded-full text-white mr-4">
            <FaUsers size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Players</p>
            <p className="text-2xl font-bold text-slate-900">128</p>
          </div>
        </div>

        {/* Active Teams */}
        <div className="flex items-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-200">
          <div className="p-4 bg-green-500 rounded-full text-white mr-4">
            <FaFutbol size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Active Teams</p>
            <p className="text-2xl font-bold text-slate-900">12</p>
          </div>
        </div>

        {/* Today Trainings */}
        <div className="flex items-center p-6 bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-200">
          <div className="p-4 bg-yellow-500 rounded-full text-white mr-4">
            <FaDumbbell size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Today Trainings</p>
            <p className="text-2xl font-bold text-slate-900">5</p>
          </div>
        </div>
      </div>
    </div>
  );
}
