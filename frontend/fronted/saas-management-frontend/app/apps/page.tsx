"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Table from "../../components/tables/Table";
import Modal from "../../components/modals/Modal";

interface SaaSApp {
  id: number;
  name: string;
  category: string;
  provider: string;
  licenses: number;
  cost: string;
  renewalDate: string;
  activeUsers: number;
}

const sampleApps: SaaSApp[] = [
  { id: 1, name: "Slack", category: "Communication", provider: "Slack Inc.", licenses: 50, cost: "$500", renewalDate: "2026-02-15", activeUsers: 48 },
  { id: 2, name: "Zoom", category: "Video Conferencing", provider: "Zoom", licenses: 30, cost: "$300", renewalDate: "2026-03-01", activeUsers: 28 },
  { id: 3, name: "Notion", category: "Productivity", provider: "Notion Labs", licenses: 20, cost: "$200", renewalDate: "2026-04-10", activeUsers: 18 },
];

export default function AppsPage() {
  const [apps, setApps] = useState<SaaSApp[]>(sampleApps);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<SaaSApp | null>(null);

  const handleAdd = () => {
    setEditingApp(null);
    setIsModalOpen(true);
  };

  const handleEdit = (app: SaaSApp) => {
    setEditingApp(app);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this app?")) {
      setApps(apps.filter((app) => app.id !== id));
    }
  };

  const handleSave = (app: SaaSApp) => {
    if (editingApp) {
      setApps(apps.map((a) => (a.id === app.id ? app : a)));
    } else {
      setApps([...apps, { ...app, id: apps.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  // Highlight apps expiring in less than 30 days
  const today = new Date();
  const appsWithHighlight = apps.map((app) => {
    const renewal = new Date(app.renewalDate);
    const daysLeft = (renewal.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return { ...app, isExpiring: daysLeft <= 30 };
  });

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-900">SaaS Inventory</h1>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 shadow transition"
          >
            Add New App
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Name", "Category", "Provider", "Licenses", "Cost", "Renewal Date", "Active Users", "Actions"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appsWithHighlight.map((app) => (
                <tr
                  key={app.id}
                  className={`hover:bg-gray-50 transition ${app.isExpiring ? "bg-yellow-50" : ""}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{app.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{app.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{app.provider}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{app.licenses}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{app.cost}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{app.renewalDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{app.activeUsers}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex gap-2">
                    <button
                      onClick={() => handleEdit(app)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <Modal
            app={editingApp}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
          />
        )}
      </main>
    </div>
  );
}
