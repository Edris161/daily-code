"use client";

import Sidebar from "@/components/layout/Sidebar";
import Card from "@/components/cards/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">
            Overview of your SaaS apps, licenses, and costs
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card title="Total SaaS Apps" value="24" iconColor="bg-indigo-500" />
          <Card title="Active Licenses" value="120" iconColor="bg-green-500" />
          <Card title="Monthly Cost" value="$3,500" iconColor="bg-blue-500" />
          <Card
            title="Expiring Subscriptions"
            value="5"
            iconColor="bg-red-500"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-4 text-slate-900">
              Cost vs Licenses
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sampleData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="cost"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="licenses"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-4 text-slate-900">
              License Usage Trends
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sampleData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="licenses"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4">
          <button className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow hover:shadow-lg">
            Add New SaaS App
          </button>
          <button className="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow hover:shadow-lg">
            Generate Report
          </button>
        </div>
      </main>
    </div>
  );
}
