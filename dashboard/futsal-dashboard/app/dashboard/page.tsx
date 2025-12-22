"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiFetch } from "@/lib/api";

type Stats = {
  total_players: number;
  total_teams: number;
  paid_fees: number;
  unpaid_fees: number;
  total_income: number;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    apiFetch("/dashboard/stats/")
      .then(setStats)
      .catch(console.error);
  }, []);

  if (!stats) return <div className="text-white p-6">Loading...</div>;

  return (
    <ProtectedRoute>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">

        <StatCard title="Total Players" value={stats.total_players} />
        <StatCard title="Teams" value={stats.total_teams} />
        <StatCard title="Paid Fees" value={stats.paid_fees} />
        <StatCard title="Unpaid Fees" value={stats.unpaid_fees} />
        <StatCard title="Total Income" value={`$${stats.total_income}`} />

      </div>
    </ProtectedRoute>
  );
}

function StatCard({ title, value }: { title: string; value: any }) {
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow">
      <p className="text-slate-400 text-sm">{title}</p>
      <h2 className="text-3xl font-bold text-white mt-2">{value}</h2>
    </div>
  );
}
