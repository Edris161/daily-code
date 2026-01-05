"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Table from "@/components/tables/Table";
import UserModal from "../../components/modals/UserModal";

interface User {
  id?: number;
  name: string;
  email: string;
  role: "Admin" | "Manager" | "Employee";
  assignedApps: string;
}

const sampleUsers: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", assignedApps: "Slack, Zoom" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Manager", assignedApps: "Notion" },
  { id: 3, name: "Charlie Lee", email: "charlie@example.com", role: "Employee", assignedApps: "Slack" },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleSave = (user: User) => {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      setUsers([...users, { ...user, id: users.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sticky Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">
              Users & Roles
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage users, roles, and assigned applications
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg
                       shadow-sm hover:bg-indigo-700 transition
                       text-sm font-medium"
          >
            + Add User
          </button>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <Table
            data={users}
            columns={[
              { header: "Name", accessor: "name" },
              { header: "Email", accessor: "email" },
              { header: "Role", accessor: "role" },
              { header: "Assigned Apps", accessor: "assignedApps" },
            ]}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        {/* Modal */}
        {isModalOpen && (
          <UserModal
            user={editingUser}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
          />
        )}
      </main>
    </div>
  );
}
