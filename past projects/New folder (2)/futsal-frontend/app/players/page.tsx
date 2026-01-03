"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";

type Player = {
  id: number;
  full_name: string;
  age: number;
  position: string;
  training_level: string;
};

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/players/");
        setPlayers(res.data.results ?? res.data); // support pagination or not
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p className="p-6">Loading players...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Players</h1>
      <div className="space-y-3">
        {players.map((p) => (
          <div key={p.id} className="p-4 bg-white shadow rounded">
            <Link href={`/players/${p.id}`}>
              <a className="text-lg font-semibold">{p.full_name}</a>
            </Link>
            <p className="text-sm text-gray-600">{p.position} — {p.training_level}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
