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
      className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4"
    >
      <input
        className="border p-2 rounded"
        placeholder="Player Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 rounded"
        placeholder="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <input
        className="border p-2 rounded"
        placeholder="Team"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
      />

      <input
        className="border p-2 rounded"
        placeholder="Training Time"
        value={trainingTime}
        onChange={(e) => setTrainingTime(e.target.value)}
      />

      <button className="bg-blue-600 text-white py-2 rounded col-span-1 md:col-span-4">
        Add Player
      </button>
    </form>
  );
}
