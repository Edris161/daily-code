"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

type Player = {
  id: number;
  name: string;
  age: number;
  team: string;
  trainingTime: string;
  feePaid: boolean;
};

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: "Ali Ahmad", age: 14, team: "U14", trainingTime: "4:00-5:30", feePaid: true },
    { id: 2, name: "Karim Noor", age: 18, team: "U18", trainingTime: "5:30-7:00", feePaid: false },
  ]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [team, setTeam] = useState("U14");
  const [trainingTime, setTrainingTime] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [sortAge, setSortAge] = useState("");

  const addPlayer = () => {
    if (!name || !age || !trainingTime) return;
    const newPlayer: Player = {
      id: Date.now(),
      name,
      age: Number(age),
      team,
      trainingTime,
      feePaid: false,
    };
    setPlayers([...players, newPlayer]);
    setName("");
    setAge("");
    setTrainingTime("");
  };

  const filteredPlayers = players
    .filter((p) => (teamFilter ? p.team === teamFilter : true))
    .sort((a, b) =>
      sortAge === "asc" ? a.age - b.age : sortAge === "desc" ? b.age - a.age : 0
    );

  return (
    <ProtectedRoute>
      <h1 className="text-3xl font-bold mb-6">Players</h1>

      {/* Add Player */}
      <div className="bg-white shadow rounded p-4 mb-6 grid grid-cols-1 md:grid-cols-5 gap-3">
        <input className="border p-2 rounded" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="border p-2 rounded" type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <select className="border p-2 rounded" value={team} onChange={(e) => setTeam(e.target.value)}>
          <option value="U14">U14</option>
          <option value="U18">U18</option>
        </select>
        <input className="border p-2 rounded" placeholder="Training Time" value={trainingTime} onChange={(e) => setTrainingTime(e.target.value)} />
        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" onClick={addPlayer}>Add</button>
      </div>

      {/* Filter & Sort */}
      <div className="flex gap-4 mb-4">
        <select className="border p-2 rounded" onChange={(e) => setTeamFilter(e.target.value)} value={teamFilter}>
          <option value="">All Teams</option>
          <option value="U14">U14</option>
          <option value="U18">U18</option>
        </select>
        <select className="border p-2 rounded" onChange={(e) => setSortAge(e.target.value)} value={sortAge}>
          <option value="">Sort by Age</option>
          <option value="asc">Youngest</option>
          <option value="desc">Oldest</option>
        </select>
      </div>

      {/* Players Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Age</th>
              <th className="p-3 text-left">Team</th>
              <th className="p-3 text-left">Training</th>
              <th className="p-3 text-left">Fee</th>
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
                <td className="p-3">{p.age}</td>
                <td className="p-3">{p.team}</td>
                <td className="p-3">{p.trainingTime}</td>
                <td className="p-3">{p.feePaid ? <span className="text-green-600 font-semibold">Paid</span> : <span className="text-red-600 font-semibold">Unpaid</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProtectedRoute>
  );
}
