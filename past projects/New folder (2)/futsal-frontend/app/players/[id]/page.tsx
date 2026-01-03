"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";

export default function PlayerDetail() {
  const { id } = useParams();
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/players/${id}/`);
        setPlayer(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    if (id) load();
  }, [id]);

  if (!player) return <p className="p-6">Loading player...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-2">{player.full_name}</h1>
      <p>Age: {player.age}</p>
      <p>Position: {player.position}</p>
      <p>Training level: {player.training_level}</p>
      <p>Fitness score: {player.fitness_score}</p>
      {/* Add fees, attendance, etc. */}
    </main>
  );
}
