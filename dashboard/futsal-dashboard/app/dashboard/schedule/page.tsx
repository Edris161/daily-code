"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiFetch } from "@/lib/api";

export default function SchedulePage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<number | "">("");
  const [trainingTime, setTrainingTime] = useState("");

  // Fetch teams & players
  useEffect(() => {
    apiFetch("/teams/").then(setTeams).catch(console.error);
    apiFetch("/players/").then(setPlayers).catch(console.error);
  }, []);

  // Update training time for all players in selected team
  const assignTrainingTime = async () => {
    if (!selectedTeam || !trainingTime) return;

    const teamPlayers = players.filter((p) => p.team === selectedTeam);

    try {
      await Promise.all(
        teamPlayers.map((player) =>
          apiFetch(`/players/${player.id}/`, {
            method: "PATCH",
            body: { training_time: trainingTime },
          })
        )
      );

      // Update local state
      setPlayers((prev) =>
        prev.map((p) =>
          p.team === selectedTeam ? { ...p, training_time: trainingTime } : p
        )
      );

      setTrainingTime("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-8">

        {/* Header */}
        <div className="rounded-2xl bg-gradient-to-r from-green-900 to-green-700 p-6 shadow-lg">
          <h1 className="text-3xl font-extrabold text-white">
            🕒 Training Schedule
          </h1>
          <p className="text-green-200 mt-1">
            Assign training times to players per team
          </p>
        </div>

        {/* Assign Training Time */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md flex flex-col md:flex-row gap-3">
          <select
            className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedTeam}
            onChange={(e) =>
              setSelectedTeam(e.target.value === "" ? "" : Number(e.target.value))
            }
          >
            <option value="">Select Team</option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Training Time e.g. 4:00-5:30"
            className="flex-1 rounded-xl bg-slate-800 border border-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={trainingTime}
            onChange={(e) => setTrainingTime(e.target.value)}
          />

          <button
            onClick={assignTrainingTime}
            className="rounded-xl bg-green-600 px-6 py-2 font-semibold text-white hover:bg-green-700 active:scale-95 transition"
          >
            Assign
          </button>
        </div>

        {/* Players Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-800 text-slate-300">
              <tr>
                <th className="p-4 text-left">Player</th>
                <th className="p-4">Age</th>
                <th className="p-4">Team</th>
                <th className="p-4">Training Time</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-slate-800 hover:bg-slate-800/50 transition"
                >
                  <td className="p-4 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-green-500 to-green-700 text-white font-bold flex items-center justify-center">
                      {p.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white">{p.name}</span>
                  </td>

                  <td className="p-4 text-center text-slate-200">{p.age}</td>
                  <td className="p-4 text-center text-slate-200">
                    {teams.find((t) => t.id === p.team)?.name || "No Team"}
                  </td>
                  <td className="p-4 text-center text-slate-200">
                    {p.training_time || "Not Assigned"}
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
