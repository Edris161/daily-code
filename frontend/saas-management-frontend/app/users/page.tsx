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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Users & Roles</h1>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add User
          </button>
        </div>

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
