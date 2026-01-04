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

  // Filtered data placeholder
  const filteredReports = sampleReports; // Can filter by department when connected to backend

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Reports & Analytics</h1>

        {/* Department Filter */}
        <div className="flex gap-2 mb-6">
          {["All", "HR", "Engineering", "Design"].map((dept) => (
            <button
              key={dept}
              onClick={() => setFilterDept(dept as any)}
              className={`px-4 py-2 rounded ${
                filterDept === dept
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Cost vs Usage Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Cost vs Usage Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredReports}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="usage" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* License Utilization Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">License Utilization</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredReports}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="usage" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Export as PDF</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Export as Excel</button>
        </div>
      </main>
    </div>
  );
}
