"use client";

import { useState, useEffect } from "react";

interface ModalProps {
  app: any | null;
  onClose: () => void;
  onSave: (app: any) => void;
}

export default function Modal({ app, onClose, onSave }: ModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    provider: "",
    licenses: 0,
    cost: "",
    renewalDate: "",
    activeUsers: 0,
  });

  useEffect(() => {
    if (app) {
      setFormData(app);
    }
  }, [app]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      licenses: Number(formData.licenses),
      activeUsers: Number(formData.activeUsers),
      id: app?.id,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg border border-gray-200">
        <h2 className="text-xl font-bold mb-5 text-slate-900">{app ? "Edit App" : "Add New App"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="text"
            name="provider"
            placeholder="Provider"
            value={formData.provider}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="number"
            name="licenses"
            placeholder="Licenses"
            value={formData.licenses}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="text"
            name="cost"
            placeholder="Cost"
            value={formData.cost}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="date"
            name="renewalDate"
            placeholder="Renewal Date"
            value={formData.renewalDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="number"
            name="activeUsers"
            placeholder="Active Users"
            value={formData.activeUsers}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />

          <div className="flex justify-end gap-3 mt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {app ? "Save Changes" : "Add App"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
