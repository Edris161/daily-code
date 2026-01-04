"use client";

import { useState, useEffect } from "react";

interface Subscription {
  id?: number;
  appName: string;
  planType: string;
  licenses: number;
  assignedUsers: number;
  renewalDate: string;
}

interface ModalProps {
  subscription: Subscription | null;
  onClose: () => void;
  onSave: (sub: Subscription) => void;
}

export default function SubscriptionModal({ subscription, onClose, onSave }: ModalProps) {
  const [formData, setFormData] = useState<Subscription>({
    appName: "",
    planType: "",
    licenses: 0,
    assignedUsers: 0,
    renewalDate: "",
  });

  useEffect(() => {
    if (subscription) setFormData(subscription);
  }, [subscription]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "licenses" || name === "assignedUsers" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: subscription?.id });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">{subscription ? "Edit Subscription" : "Add Subscription"}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="appName" placeholder="App Name" value={formData.appName} onChange={handleChange} className="w-full p-2 border rounded" required />
          <select name="planType" value={formData.planType} onChange={handleChange} className="w-full p-2 border rounded" required>
            <option value="">Select Plan</option>
            <option value="Free">Free</option>
            <option value="Pro">Pro</option>
            <option value="Business">Business</option>
            <option value="Team">Team</option>
          </select>
          <input type="number" name="licenses" placeholder="Total Licenses" value={formData.licenses} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="number" name="assignedUsers" placeholder="Assigned Users" value={formData.assignedUsers} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="date" name="renewalDate" placeholder="Renewal Date" value={formData.renewalDate} onChange={handleChange} className="w-full p-2 border rounded" required />

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{subscription ? "Save" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
