"use client";

import { useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Card from "@/components/cards/Card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const sampleData = [
  { month: "Jan", cost: 4000, licenses: 240 },
  { month: "Feb", cost: 3000, licenses: 139 },
  { month: "Mar", cost: 2000, licenses: 980 },
  { month: "Apr", cost: 2780, licenses: 390 },
  { month: "May", cost: 1890, licenses: 480 },
  { month: "Jun", cost: 2390, licenses: 380 },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card title="Total SaaS Apps" value="24" />
          <Card title="Active Licenses" value="120" />
          <Card title="Monthly Cost" value="$3,500" />
          <Card title="Expiring Subscriptions" value="5" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Cost vs Licenses</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sampleData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="licenses" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">License Usage Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sampleData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="licenses" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Add New SaaS App
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
            Generate Report
          </button>
        </div>
      </main>
    </div>
  );
}
