"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

interface ReportData {
  month: string;
  cost: number;
  usage: number;
}

const sampleReports: ReportData[] = [
  { month: "Jan", cost: 1000, usage: 50 },
  { month: "Feb", cost: 1200, usage: 60 },
  { month: "Mar", cost: 1500, usage: 70 },
  { month: "Apr", cost: 1700, usage: 80 },
  { month: "May", cost: 1600, usage: 75 },
  { month: "Jun", cost: 1800, usage: 90 },
];

export default function ReportsPage() {
  const [filterDept, setFilterDept] = useState<"All" | "HR" | "Engineering" | "Design">("All");

  // Placeholder: filteredReports (can be dynamic later)
  const filteredReports = sampleReports;

  const departments = ["All", "HR", "Engineering", "Design"];

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900 mb-1">
            Reports & Analytics
          </h1>
          <p className="text-sm text-slate-500">
            Monitor costs, license usage, and department spending trends
          </p>
        </div>

        {/* Department Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setFilterDept(dept as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filterDept === dept
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-100"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Line Chart: Cost vs Usage */}
        <div className="bg-white p-6 rounded-xl shadow border border-slate-200 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-slate-900">
            Cost vs Usage Over Time
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredReports}>
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: "#f1f5f9", borderRadius: 8 }}
              />
              <Line type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="usage" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart: License Utilization */}
        <div className="bg-white p-6 rounded-xl shadow border border-slate-200 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-slate-900">
            License Utilization
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredReports}>
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: "#f1f5f9", borderRadius: 8 }} />
              <Bar dataKey="usage" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-3 flex-wrap">
          <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg shadow-sm hover:bg-indigo-700 transition text-sm font-medium">
            Export as PDF
          </button>
          <button className="px-5 py-2.5 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 transition text-sm font-medium">
            Export as Excel
          </button>
        </div>
      </main>
    </div>
  );
}
