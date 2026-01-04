"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Table from "../../components/tables/Table";
import Modal from "../../components/modals/Modal"
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
      // Edit
      setApps(apps.map((a) => (a.id === app.id ? app : a)));
    } else {
      // Add
      setApps([...apps, { ...app, id: apps.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">SaaS Inventory</h1>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add New App
          </button>
        </div>

        <Table
          data={apps}
          columns={[
            { header: "Name", accessor: "name" },
            { header: "Category", accessor: "category" },
            { header: "Provider", accessor: "provider" },
            { header: "Licenses", accessor: "licenses" },
            { header: "Cost", accessor: "cost" },
            { header: "Renewal Date", accessor: "renewalDate" },
            { header: "Active Users", accessor: "activeUsers" },
          ]}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

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
