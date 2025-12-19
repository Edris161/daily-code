"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import StatCard from "@/components/StatCard";
import { FaUsers, FaUserAlt, FaMoneyBillWave } from "react-icons/fa";
import { useState } from "react";

export default function DashboardPage() {
  const [players] = useState([
    { id: 1, name: "Ali Ahmad", age: 14, team: "U14", feePaid: true },
    { id: 2, name: "Karim Noor", age: 18, team: "U18", feePaid: false },
    { id: 3, name: "Hamid Rahimi", age: 16, team: "U14", feePaid: true },
  ]);

  const totalPlayers = players.length;
  const u14Players = players.filter((p) => p.team === "U14").length;
  const u18Players = players.filter((p) => p.team === "U18").length;
  const unpaidFees = players.filter((p) => !p.feePaid).length;

  return (
    <ProtectedRoute>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Players" value={totalPlayers} icon={<FaUsers />} />
        <StatCard title="U14 Players" value={u14Players} icon={<FaUserAlt />} />
        <StatCard title="U18 Players" value={u18Players} icon={<FaUserAlt />} />
        <StatCard title="Unpaid Fees" value={unpaidFees} icon={<FaMoneyBillWave />} />
      </div>
    </ProtectedRoute>
  );
}
