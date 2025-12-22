"use client";

import { useState } from "react";

export default function PlayerForm({ onAdd }: { onAdd: (player: any) => void }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [team, setTeam] = useState("");
  const [trainingTime, setTrainingTime] = useState("");

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    onAdd({
      id: Date.now(),
      name,
      age: Number(age),
      team,
      trainingTime,
      feePaid: false,
    });

    setName("");
    setAge("");
    setTeam("");
    setTrainingTime("");
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-slate-900 border border-slate-800 rounded-2xl shadow-lg p-6 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4"
    >
      {/* Player Name */}
      <input
        className="border border-slate-700 bg-slate-800 px-4 py-2 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Player Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Age */}
      <input
        className="border border-slate-700 bg-slate-800 px-4 py-2 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      {/* Team */}
      <input
        className="border border-slate-700 bg-slate-800 px-4 py-2 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Team"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
      />

      {/* Training Time */}
      <input
        className="border border-slate-700 bg-slate-800 px-4 py-2 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Training Time"
        value={trainingTime}
        onChange={(e) => setTrainingTime(e.target.value)}
      />

      {/* Submit Button */}
      <button
        className="col-span-1 md:col-span-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-2xl shadow-lg transition transform hover:-translate-y-0.5"
      >
        Add Player
      </button>
    </form>
  );
}
