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

  // Highlight subscriptions expiring within 30 days
  const today = new Date();
  const expiringThreshold = new Date();
  expiringThreshold.setDate(today.getDate() + 30);

  const displayData = subscriptions.map((s) => ({
    ...s,
    renewalDateDisplay:
      new Date(s.renewalDate) < expiringThreshold
        ? <span className="text-red-600 font-semibold">{s.renewalDate} ⚠️</span>
        : s.renewalDate
  }));

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              Subscriptions / Licenses
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Track subscription plans, licenses, and renewal dates
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg shadow-sm
                       hover:bg-indigo-700 transition text-sm font-medium"
          >
            + Add Subscription
          </button>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <Table
            data={displayData}
            columns={[
              { header: "App Name", accessor: "appName" },
              { header: "Plan Type", accessor: "planType" },
              { header: "Licenses", accessor: "licenses" },
              { header: "Assigned Users", accessor: "assignedUsers" },
              { header: "Renewal Date", accessor: "renewalDateDisplay" },
            ]}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* Modal */}
        {isModalOpen && (
          <Modal
            {...({ subscription: editingSub, onClose: () => setIsModalOpen(false), onSave: handleSave } as any)}
          />
        )}
      </main>
    </div>
  );
}
