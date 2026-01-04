"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Card from "@/components/cards/Card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

interface BillingItem {
  id: number;
  appName: string;
  department: string;
  monthlyCost: number;
  yearlyCost: number;
}

const sampleBilling: BillingItem[] = [
  { id: 1, appName: "Slack", department: "HR", monthlyCost: 200, yearlyCost: 2400 },
  { id: 2, appName: "Zoom", department: "Engineering", monthlyCost: 300, yearlyCost: 3600 },
  { id: 3, appName: "Notion", department: "Design", monthlyCost: 150, yearlyCost: 1800 },
];

const costTrends = [
  { month: "Jan", cost: 1000 },
  { month: "Feb", cost: 1200 },
  { month: "Mar", cost: 1500 },
  { month: "Apr", cost: 1700 },
  { month: "May", cost: 1600 },
  { month: "Jun", cost: 1800 },
];

export default function BillingPage() {
  const [billingItems, setBillingItems] = useState<BillingItem[]>(sampleBilling);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Billing & Cost Management</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card title="Total SaaS Apps" value={billingItems.length} />
          <Card title="Monthly Spend" value={`$${billingItems.reduce((a, b) => a + b.monthlyCost, 0)}`} />
          <Card title="Yearly Spend" value={`$${billingItems.reduce((a, b) => a + b.yearlyCost, 0)}`} />
          <Card title="Over Budget Items" value={billingItems.filter((b) => b.monthlyCost > 250).length} />
        </div>

        {/* Cost Trends Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Cost Trends Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={costTrends}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cost" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Spending per Department Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Spending per Department</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={billingItems}>
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="monthlyCost" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Billing Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">App Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yearly Cost</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {billingItems.map((item) => (
                <tr key={item.id} className={item.monthlyCost > 250 ? "bg-red-50" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.appName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${item.monthlyCost}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${item.yearlyCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
