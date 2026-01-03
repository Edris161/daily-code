"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiFetch } from "@/lib/api";

/* ================= TYPES ================= */

type Team = {
  id: number;
  name: string;
};

type Player = {
  id: number;
  name: string;
  age: number;
  team: number | null;
  team_name?: string;
  training_time?: string;
  fee_paid: boolean;
};

/* ================= PAGE ================= */

export default function PlayersPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerAge, setNewPlayerAge] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<number | "">("");
  const [trainingTime, setTrainingTime] = useState("");

  /* ===== Fetch teams & players ===== */
  useEffect(() => {
    apiFetch("/teams/").then(setTeams).catch(console.error);
    apiFetch("/players/").then(setPlayers).catch(console.error);
  }, []);

  /* ===== Add new player ===== */
  const addPlayer = async () => {
    if (!newPlayerName || !newPlayerAge) return;

    try {
      const newPlayer = await apiFetch("/players/", {
        method: "POST",
        body: {
          name: newPlayerName,
          age: Number(newPlayerAge),
          team: selectedTeam || null,
          training_time: trainingTime || "",
          fee_paid: false,
        },
      });

      setPlayers((prev) => [...prev, newPlayer]);
      setNewPlayerName("");
      setNewPlayerAge("");
      setSelectedTeam("");
      setTrainingTime("");
    } catch (err) {
      console.error(err);
    }
  };

  /* ===== Update player field ===== */
  const updatePlayer = async (id: number, data: Partial<Player>) => {
    try {
      await apiFetch(`/players/${id}/`, {
        method: "PATCH",
        body: data, // ✅ apiFetch will stringify automatically
      });

      setPlayers((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...data } : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ProtectedRoute>
      <div className="space-y-8">

        {/* Header */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-900 to-blue-700 p-6 shadow-lg">
          <h1 className="text-3xl font-extrabold text-white">
            🧍‍♂️ Players Management
          </h1>
          <p className="text-blue-200 mt-1">Futsal Training Academy</p>
        </div>

        {/* Add Player */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow">
          <h2 className="text-lg font-semibold text-white mb-4">Add New Player</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <input
              placeholder="Full Name"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <input
              type="number"
              placeholder="Age"
              value={newPlayerAge}
              onChange={(e) => setNewPlayerAge(e.target.value)}
              className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <select
              value={selectedTeam}
              onChange={(e) =>
                setSelectedTeam(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">No Team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
            <input
              placeholder="Training Time"
              value={trainingTime}
              onChange={(e) => setTrainingTime(e.target.value)}
              className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              onClick={addPlayer}
              className="rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 active:scale-95 transition"
            >
              + Add
            </button>
          </div>
        </div>

        {/* Players Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-800 text-slate-300">
              <tr>
                <th className="p-4 text-left">Player</th>
                <th className="p-4">Age</th>
                <th className="p-4">Team</th>
                <th className="p-4">Training</th>
                <th className="p-4">Fee</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p) => (
                <tr key={p.id} className="border-t border-slate-800 hover:bg-slate-800/50 transition">
                  <td className="p-4 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold flex items-center justify-center">
                      {p.name.charAt(0)}
                    </div>
                    <span className="text-white">{p.name}</span>
                  </td>
                  <td className="p-4 text-center text-slate-200">{p.age}</td>
                  <td className="p-4 text-center">
                    <select
                      value={p.team || ""}
                      onChange={(e) => updatePlayer(p.id, { team: e.target.value === "" ? null : Number(e.target.value) })}
                      className="rounded-lg bg-slate-900 border border-slate-700 px-2 py-1 text-sm text-white"
                    >
                      <option value="">No Team</option>
                      {teams.map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4 text-center">
                    <input
                      value={p.training_time || ""}
                      onChange={(e) => updatePlayer(p.id, { training_time: e.target.value })}
                      className="rounded-lg bg-slate-900 border border-slate-700 px-2 py-1 text-sm text-white text-center"
                      placeholder="Not Assigned"
                    />
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => updatePlayer(p.id, { fee_paid: !p.fee_paid })}
                      className={`rounded-full px-3 py-1 font-semibold ${p.fee_paid ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}
                    >
                      {p.fee_paid ? "Paid" : "Unpaid"}
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
