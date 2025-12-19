"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

type Player = { id: number; name: string; team: string; feePaid: boolean };

export default function FeesPage() {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "Ali Ahmad", team: "U14", feePaid: true },
    { id: 2, name: "Karim Noor", team: "U18", feePaid: false },
    { id: 3, name: "Hamid Rahimi", team: "U14", feePaid: false },
  ]);

  const [teamFilter, setTeamFilter] = useState("");

  const toggleFeeStatus = (id: number) => {
    setPlayers(players.map((p) => (p.id === id ? { ...p, feePaid: !p.feePaid } : p)));
  };

  const filteredPlayers = players.filter((p) => (teamFilter ? p.team === teamFilter : true));

  return (
    <ProtectedRoute>
      <h1 className="text-3xl font-bold mb-6">Player Fees</h1>

      {/* Filter */}
      <div className="mb-4">
        <select
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
        >
          <option value="">All Teams</option>
          <option value="U14">U14</option>
          <option value="U18">U18</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Team</th>
              <th className="p-3 text-left">Fee Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full">
                    {p.name[0]}
                  </div>
                  {p.name}
                </td>
                <td className="p-3">{p.team}</td>
                <td className="p-3">
                  {p.feePaid ? (
                    <span className="text-green-600 font-semibold">Paid</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Unpaid</span>
                  )}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => toggleFeeStatus(p.id)}
                    className="text-blue-600 hover:underline transition"
                  >
                    Toggle Fee
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProtectedRoute>
  );
}
