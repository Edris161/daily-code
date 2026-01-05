"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Bell, AlertTriangle, DollarSign } from "lucide-react";

interface Notification {
  id: number;
  type: "renewal" | "usage" | "cost";
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const sampleNotifications: Notification[] = [
  {
    id: 1,
    type: "renewal",
    title: "Subscription Expiring",
    message: "Slack subscription expires in 7 days",
    date: "2026-01-05",
    read: false,
  },
  {
    id: 2,
    type: "usage",
    title: "Low Usage Warning",
    message: "Notion licenses are underused",
    date: "2026-01-03",
    read: false,
  },
  {
    id: 3,
    type: "cost",
    title: "Over Budget Alert",
    message: "AWS monthly cost exceeded budget",
    date: "2026-01-01",
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(sampleNotifications);

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const clearNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((n) => n.id !== id)
    );
  };

  const iconMap = {
    renewal: <Bell className="text-blue-600 w-6 h-6" />,
    usage: <AlertTriangle className="text-yellow-500 w-6 h-6" />,
    cost: <DollarSign className="text-red-600 w-6 h-6" />,
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900 mb-1">
            Notifications & Alerts
          </h1>
          <p className="text-sm text-slate-500">
            Keep track of expiring subscriptions, usage, and costs
          </p>
        </div>

        {/* No notifications */}
        {notifications.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center text-slate-400 text-sm">
            No notifications 🎉
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`bg-white rounded-xl shadow p-4 flex justify-between items-start transition 
                  ${n.read ? "opacity-60" : "opacity-100 hover:shadow-md"}`}
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">{iconMap[n.type]}</div>
                  <div>
                    <h3 className="font-medium text-slate-900">{n.title}</h3>
                    <p className="text-sm text-slate-600 mt-0.5">{n.message}</p>
                    <span className="text-xs text-slate-400 mt-1 block">{n.date}</span>
                  </div>
                </div>

                <div className="flex gap-3 ml-4">
                  {!n.read && (
                    <button
                      onClick={() => markAsRead(n.id)}
                      className="text-indigo-600 text-sm font-medium hover:underline"
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => clearNotification(n.id)}
                    className="text-red-600 text-sm font-medium hover:underline"
                  >
                    Clear
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
