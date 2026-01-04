"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

interface Alert {
  id: number;
  type: "Renewal" | "Usage" | "Cost";
  message: string;
  date: string;
  read: boolean;
}

const sampleAlerts: Alert[] = [
  { id: 1, type: "Renewal", message: "Slack subscription expiring in 5 days", date: "2026-01-10", read: false },
  { id: 2, type: "Usage", message: "Zoom licenses underused", date: "2026-01-04", read: false },
  { id: 3, type: "Cost", message: "Notion monthly cost over budget", date: "2026-01-03", read: true },
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(sampleAlerts);
  const [filter, setFilter] = useState<"All" | "Renewal" | "Usage" | "Cost">("All");

  const filteredAlerts = filter === "All" ? alerts : alerts.filter((a) => a.type === filter);

  const markAsRead = (id: number) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, read: true } : a)));
  };

  const clearAlert = (id: number) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Notifications & Alerts</h1>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4">
          {["All", "Renewal", "Usage", "Cost"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded ${
                filter === f ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Alerts List */}
        <div className="space-y-2">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg flex justify-between items-center shadow ${
                alert.read ? "bg-gray-100" : "bg-red-50"
              }`}
            >
              <div>
                <p className="font-semibold">{alert.type} Alert</p>
                <p className="text-gray-700">{alert.message}</p>
                <p className="text-sm text-gray-500">{alert.date}</p>
              </div>
              <div className="flex gap-2">
                {!alert.read && (
                  <button
                    onClick={() => markAsRead(alert.id)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => clearAlert(alert.id)}
                  className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Clear
                </button>
              </div>
            </div>
          ))}

          {filteredAlerts.length === 0 && (
            <p className="text-gray-500 mt-4">No alerts to display.</p>
          )}
        </div>
      </main>
    </div>
  );
}
