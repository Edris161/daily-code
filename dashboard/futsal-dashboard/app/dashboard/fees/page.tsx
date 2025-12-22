"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiFetch } from "@/lib/api";

export default function FeesPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  // Fetch teams & players
  useEffect(() => {
    apiFetch("/teams/").then(setTeams).catch(console.error);
    apiFetch("/players/").then(setPlayers).catch(console.error);
  }, []);

  // Toggle fee status
  const toggleFee = async (playerId: number, currentStatus: boolean) => {
    try {
      await apiFetch(`/players/${playerId}/`, {
        method: "PATCH",
        body: { fee_paid: !currentStatus },
      });

      setPlayers((prev) =>
        prev.map((p) =>
          p.id === playerId ? { ...p, fee_paid: !currentStatus } : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-8">

        {/* Header */}
        <div className="rounded-2xl bg-gradient-to-r from-yellow-900 to-yellow-700 p-6 shadow-lg">
          <h1 className="text-3xl font-extrabold text-white">💰 Player Fees</h1>
          <p className="text-yellow-200 mt-1">Manage fee payments for players</p>
        </div>

        {/* Players Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-800 text-slate-300">
              <tr>
                <th className="p-4 text-left">Player</th>
                <th className="p-4">Age</th>
                <th className="p-4">Team</th>
                <th className="p-4">Fee Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr
                  key={player.id}
                  className="border-t border-slate-800 hover:bg-slate-800/50 transition"
                >
                  <td className="p-4 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 text-white font-bold flex items-center justify-center">
                      {player.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white">{player.name}</span>
                  </td>

                  <td className="p-4 text-center text-slate-200">{player.age}</td>

                  <td className="p-4 text-center text-slate-200">
                    {teams.find((t) => t.id === player.team)?.name || "No Team"}
                  </td>

                  <td className="p-4 text-center">
                    {player.fee_paid ? (
                      <span className="rounded-full bg-green-600/20 px-3 py-1 text-green-400 font-semibold">
                        Paid
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-600/20 px-3 py-1 text-red-400 font-semibold">
                        Unpaid
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-center">
                    <button
                      className="rounded-lg bg-blue-600 px-4 py-1 text-white hover:bg-blue-700 active:scale-95 transition"
                      onClick={() => toggleFee(player.id, player.fee_paid)}
                    >
                      Toggle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </ProtectedRoute>
  );
}
