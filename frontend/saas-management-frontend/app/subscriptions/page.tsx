"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Table from "@/components/tables/Table";
import Modal from "@/components/modals/Modal";

interface Subscription {
  id: number;
  appName: string;
  planType: string;
  licenses: number;
  assignedUsers: number;
  renewalDate: string;
}

const sampleSubscriptions: Subscription[] = [
  { id: 1, appName: "Slack", planType: "Pro", licenses: 50, assignedUsers: 48, renewalDate: "2026-02-15" },
  { id: 2, appName: "Zoom", planType: "Business", licenses: 30, assignedUsers: 28, renewalDate: "2026-03-01" },
  { id: 3, appName: "Notion", planType: "Team", licenses: 20, assignedUsers: 18, renewalDate: "2026-04-10" },
];

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(sampleSubscriptions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState<Subscription | null>(null);

  const handleAdd = () => {
    setEditingSub(null);
    setIsModalOpen(true);
  };

  const handleEdit = (sub: Subscription) => {
    setEditingSub(sub);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this subscription?")) {
      setSubscriptions(subscriptions.filter((s) => s.id !== id));
    }
  };

  const handleSave = (sub: Subscription) => {
    if (editingSub) {
      setSubscriptions(subscriptions.map((s) => (s.id === sub.id ? sub : s)));
    } else {
      setSubscriptions([...subscriptions, { ...sub, id: subscriptions.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Subscriptions / Licenses</h1>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Subscription
          </button>
        </div>

        <Table
          data={subscriptions.map((s) => ({
            ...s,
            // Highlight expiring licenses if renewal date < 30 days
            renewalDate: new Date(s.renewalDate) < new Date(new Date().setDate(new Date().getDate() + 30))
              ? `${s.renewalDate} ⚠️`
              : s.renewalDate
          }))}
          columns={[
            { header: "App Name", accessor: "appName" },
            { header: "Plan Type", accessor: "planType" },
            { header: "Licenses", accessor: "licenses" },
            { header: "Assigned Users", accessor: "assignedUsers" },
            { header: "Renewal Date", accessor: "renewalDate" },
          ]}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {isModalOpen && (
          <Modal
            {...({ subscription: editingSub, onClose: () => setIsModalOpen(false), onSave: handleSave } as any)}
          />
        )}
      </main>
    </div>
  );
}
