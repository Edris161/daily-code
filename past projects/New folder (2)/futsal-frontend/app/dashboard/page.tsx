"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/api";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    total_players: 0,
    total_teams: 0,
    monthly_income: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSummary() {
      try {
        const res = await api.get("/reports/summary/");
        setSummary(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load dashboard summary", err);
        setError("Failed to load dashboard data");
        setLoading(false);
      }
    }

    fetchSummary();
  }, []);

  if (loading) return <p className="p-6">Loading dashboard...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 shadow rounded p-4">
          <p className="text-gray-500">Total Players</p>
          <p className="text-2xl font-bold">{summary.total_players}</p>
        </div>

        <div className="bg-green-50 shadow rounded p-4">
          <p className="text-gray-500">Total Teams</p>
          <p className="text-2xl font-bold">{summary.total_teams}</p>
        </div>

        <div className="bg-yellow-50 shadow rounded p-4">
          <p className="text-gray-500">Monthly Income</p>
          <p className="text-2xl font-bold">
            ${summary.monthly_income.toLocaleString()}
          </p>
        </div>
      </div>
    </main>
  );
}
