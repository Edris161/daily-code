"use client";

import { useState } from "react";

interface Team {
  id: number;
  name: string;
  coach: string;
  playersCount: number;
  logo?: string;
}

const sampleTeams: Team[] = [
  {
    id: 1,
    name: "Red Lions",
    coach: "Coach Ahmad",
    playersCount: 12,
  },
  {
    id: 2,
    name: "Blue Eagles",
    coach: "Coach Reza",
    playersCount: 10,
  },
  {
    id: 3,
    name: "Golden Stars",
    coach: "Coach Ali",
    playersCount: 14,
  },
];

export default function TeamsPage() {
  const [search, setSearch] = useState("");

  const filteredTeams = sampleTeams.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Teams</h1>

        <input
          type="text"
          placeholder="Search teams..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-4 md:mt-0 w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <div
            key={team.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg
                       transition-shadow duration-200 p-6"
          >
            {/* Team Logo */}
            <div className="w-20 h-20 rounded-full bg-slate-200 mb-4 flex items-center justify-center text-3xl">
              🏆
            </div>

            {/* Team Info */}
            <h2 className="text-xl font-semibold text-slate-900 mb-1">
              {team.name}
            </h2>

            <p className="text-gray-500 text-sm mb-2">
              Coach: <span className="font-medium">{team.coach}</span>
            </p>

            <p className="text-gray-400 text-sm">
              Players: {team.playersCount}
            </p>

            {/* Actions */}
            <div className="mt-4 flex gap-2">
              <button
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg
                           hover:bg-blue-600 transition-all text-sm font-medium"
              >
                View
              </button>

              <button
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg
                           hover:bg-gray-300 transition-all text-sm font-medium"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
