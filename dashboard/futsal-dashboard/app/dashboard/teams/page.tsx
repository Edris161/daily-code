"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

type Player = {
  id: number;
  name: string;
  team: string;
};

export default function TeamsPage() {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "Ali Ahmad", team: "U14" },
    { id: 2, name: "Karim Noor", team: "U18" },
    { id: 3, name: "Hamid Rahimi", team: "U14" },
  ]);

  const teams = ["U14", "U18"];
  const [newPlayerName, setNewPlayerName] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("U14");

  const addPlayer = () => {
    if (!newPlayerName) return;
    setPlayers([...players, { id: Date.now(), name: newPlayerName, team: selectedTeam }]);
    setNewPlayerName("");
  };

  const removePlayer = (id: number) => {
    setPlayers(players.filter((p) => p.id !== id));
  };

  return (
    <ProtectedRoute>
      <h1 className="text-3xl font-bold mb-6">Teams</h1>

      {/* Add Player Form */}
      <div className="bg-white shadow rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-3 items-center">
        <input
          className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Player Name"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
        />
        <select
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
        >
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
        <button
          onClick={addPlayer}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Add Player
        </button>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teams.map((team) => (
          <div key={team} className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{team} Team</h2>
              <span className="text-gray-500">{players.filter((p) => p.team === team).length} Players</span>
            </div>
            <ul className="list-disc pl-5">
              {players
                .filter((p) => p.team === team)
                .map((player) => (
                  <li key={player.id} className="flex justify-between items-center py-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                        {player.name[0]}
                      </div>
                      {player.name}
                    </div>
                    <button
                      onClick={() => removePlayer(player.id)}
                      className="text-red-600 hover:text-red-800 underline transition"
                    >
                      Remove
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </ProtectedRoute>
  );
}
