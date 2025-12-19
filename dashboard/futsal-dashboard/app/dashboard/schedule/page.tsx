"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

type Player = { id: number; name: string };
type Session = { id: number; name: string; time: string; players: Player[] };

export default function SchedulePage() {
  const [players] = useState<Player[]>([
    { id: 1, name: "Ali Ahmad" },
    { id: 2, name: "Karim Noor" },
    { id: 3, name: "Hamid Rahimi" },
  ]);

  const [sessions, setSessions] = useState<Session[]>([
    { id: 1, name: "Morning Training", time: "4:00 PM - 5:30 PM", players: [players[0], players[2]] },
    { id: 2, name: "Evening Training", time: "5:30 PM - 7:00 PM", players: [players[1]] },
  ]);

  const [newSessionName, setNewSessionName] = useState("");
  const [newSessionTime, setNewSessionTime] = useState("");

  const addSession = () => {
    if (!newSessionName || !newSessionTime) return;
    setSessions([...sessions, { id: Date.now(), name: newSessionName, time: newSessionTime, players: [] }]);
    setNewSessionName("");
    setNewSessionTime("");
  };

  const removeSession = (id: number) => {
    setSessions(sessions.filter((s) => s.id !== id));
  };

  const togglePlayerInSession = (sessionId: number, player: Player) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id !== sessionId) return s;
        const exists = s.players.find((p) => p.id === player.id);
        return { ...s, players: exists ? s.players.filter((p) => p.id !== player.id) : [...s.players, player] };
      })
    );
  };

  return (
    <ProtectedRoute>
      <h1 className="text-3xl font-bold mb-6">Training Schedule</h1>

      {/* Add Session Form */}
      <div className="bg-white shadow rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-3 items-center">
        <input
          className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Session Name"
          value={newSessionName}
          onChange={(e) => setNewSessionName(e.target.value)}
        />
        <input
          className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Session Time"
          value={newSessionTime}
          onChange={(e) => setNewSessionTime(e.target.value)}
        />
        <button
          onClick={addSession}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Add Session
        </button>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sessions.map((session) => (
          <div key={session.id} className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{session.name}</h2>
              <span className="text-gray-500">{session.time}</span>
            </div>

            {/* Players Buttons */}
            <div className="flex flex-wrap gap-2 mb-2">
              {players.map((player) => {
                const selected = session.players.find((p) => p.id === player.id);
                return (
                  <button
                    key={player.id}
                    onClick={() => togglePlayerInSession(session.id, player)}
                    className={`border px-2 py-1 rounded transition ${
                      selected ? "bg-green-600 text-white" : "bg-gray-100"
                    }`}
                  >
                    {player.name}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => removeSession(session.id)}
              className="text-red-600 hover:text-red-800 underline transition"
            >
              Remove Session
            </button>
          </div>
        ))}
      </div>
    </ProtectedRoute>
  );
}
