"use client";
import { ReactNode } from "react";

export default function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number | string;
  icon?: ReactNode;
}) {
  return (
    <div className="bg-linear-to-r from-blue-500 to-blue-700 text-white shadow-lg rounded-xl p-6 flex items-center gap-4 hover:scale-105 transform transition duration-200">
      {icon && <div className="text-4xl">{icon}</div>}
      <div>
        <p className="text-sm opacity-90">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
