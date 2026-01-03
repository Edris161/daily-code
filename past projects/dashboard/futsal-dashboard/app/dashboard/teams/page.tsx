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
  fee_paid?: boolean;
  training_time?: string;
};

/* ================= PAGE ================= */

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerAge, setNewPlayerAge] = useState<number | "">("");
  const [selectedTeam, setSelectedTeam] = useState<number | "">("");

  /* ===== Fetch teams & players ===== */
  useEffect(() => {
    apiFetch("/teams/").then(setTeams).catch(console.error);
    apiFetch("/players/").then(setPlayers).catch(console.error);
  }, []);

  /* ===== Create Player ===== */
  const addPlayer = async () => {
    if (!newPlayerName.trim() || newPlayerAge === "") return;

    try {
      const newPlayer = await apiFetch("/players/", {
        method: "POST",
        body: {
          name: newPlayerName,
          age: newPlayerAge,
          team: selectedTeam === "" ? null : selectedTeam,
          fee_paid: false,
          training_time: "TBD",
        },
      });

      setPlayers((prev) => [...prev, newPlayer]);
      setNewPlayerName("");
      setNewPlayerAge("");
      setSelectedTeam("");
    } catch (err) {
      console.error(err);
    }
  };

  /* ===== Assign Player to Team ===== */
  const assignPlayerToTeam = async (playerId: number, teamId: number | null) => {
    try {
      await apiFetch(`/players/${playerId}/`, {
        method: "PATCH",
        body: { team: teamId },
      });

      setPlayers((prev) =>
        prev.map((p) => (p.id === playerId ? { ...p, team: teamId } : p))
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
            ⚽ Futsal Training Teams
          </h1>
          <p className="text-blue-200 mt-1">
            Manage players and age categories
          </p>
        </div>

        {/* Add Player Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md">
          <h2 className="text-lg font-semibold text-white mb-4">
            Add New Player
          </h2>

          <div className="flex flex-col md:flex-row gap-3">
            {/* Name */}
            <input
              className="flex-1 rounded-xl bg-slate-800 border border-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Player full name"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
            />

            {/* Age */}
            <input
              type="number"
              className="w-24 rounded-xl bg-slate-800 border border-slate-700 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Age"
              value={newPlayerAge}
              onChange={(e) =>
                setNewPlayerAge(e.target.value === "" ? "" : Number(e.target.value))
              }
            />

            {/* Team */}
            <select
              className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedTeam}
              onChange={(e) =>
                setSelectedTeam(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
            >
              <option value="">No Team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>

            <button
              onClick={addPlayer}
              className="rounded-xl bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700 active:scale-95 transition"
            >
              + Add
            </button>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teams.map((team) => {
            const teamPlayers = players.filter((p) => p.team === team.id);

            return (
              <div
                key={team.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow hover:shadow-xl transition"
              >
                {/* Team Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{team.name} Team</h3>
                  <span className="rounded-full bg-blue-600/20 px-3 py-1 text-sm font-semibold text-blue-400">
                    {teamPlayers.length} Players
                  </span>
                </div>

                {/* Players List */}
                {teamPlayers.length === 0 ? (
                  <p className="text-slate-400 text-sm">No players in this team yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {teamPlayers.map((player) => (
                      <li
                        key={player.id}
                        className="flex items-center justify-between rounded-xl bg-slate-800 px-3 py-2"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white font-bold flex items-center justify-center">
                            {player.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-white">{player.name}</span>

                          {/* Team Selector */}
                          <select
                            className="ml-4 rounded-lg bg-slate-900 border border-slate-700 px-2 py-1 text-sm text-white"
                            value={player.team ?? ""}
                            onChange={(e) =>
                              assignPlayerToTeam(
                                player.id,
                                e.target.value === "" ? null : Number(e.target.value)
                              )
                            }
                          >
                            <option value="">No Team</option>
                            {teams.map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </ProtectedRoute>
  );
}
