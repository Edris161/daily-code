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
    onSave({ ...formData, licenses: Number(formData.licenses), activeUsers: Number(formData.activeUsers), id: app?.id });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">{app ? "Edit App" : "Add New App"}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="provider" placeholder="Provider" value={formData.provider} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="number" name="licenses" placeholder="Licenses" value={formData.licenses} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="text" name="cost" placeholder="Cost" value={formData.cost} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="date" name="renewalDate" placeholder="Renewal Date" value={formData.renewalDate} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="number" name="activeUsers" placeholder="Active Users" value={formData.activeUsers} onChange={handleChange} className="w-full p-2 border rounded" required />

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{app ? "Save" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
