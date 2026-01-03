"use client";
import { useEffect } from "react";
import { getPlayers } from "@/lib/player";


useEffect(() => {
  getPlayers().then(setPlayers);
}, []);


import { useState } from "react";

interface Player {
  id: number;
  name: string;
  position: string;
  age: number;
  photo?: string;
}

const samplePlayers: Player[] = [
  { id: 1, name: "Ali Rahimi", position: "Forward", age: 24, photo: "" },
  { id: 2, name: "Reza Ahmadi", position: "Goalkeeper", age: 27, photo: "" },
  { id: 3, name: "Omid Karimi", position: "Midfielder", age: 22, photo: "" },
  // Add more players as needed
];

export default function PlayersPage() {
  const [search, setSearch] = useState("");

  const filteredPlayers = samplePlayers.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Players</h1>
        <input
          type="text"
          placeholder="Search players..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-4 md:mt-0 w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPlayers.map((player) => (
          <div
            key={player.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 flex flex-col items-center"
          >
            {/* Player Photo */}
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 overflow-hidden">
              {player.photo ? (
                <img
                  src={player.photo}
                  alt={player.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-xl flex items-center justify-center h-full">
                  👤
                </span>
              )}
            </div>

            {/* Player Info */}
            <h2 className="text-lg font-semibold text-slate-900 mb-1">
              {player.name}
            </h2>
            <p className="text-gray-500 text-sm mb-2">{player.position}</p>
            <p className="text-gray-400 text-sm">Age: {player.age}</p>

            {/* Optional Action Buttons */}
            <div className="mt-4 flex gap-2">
              <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                Edit
              </button>
              <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function getPlayers() {
  throw new Error("Function not implemented.");
}

