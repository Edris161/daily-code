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
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      
      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white blur-2xl transition" />

      <div className="relative z-10 flex items-center gap-4 text-white">
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-3xl shadow-inner">
            {icon}
          </div>
        )}

        <div>
          <p className="text-sm font-medium text-blue-100 tracking-wide">
            {title}
          </p>
          <p className="text-3xl font-extrabold tracking-tight">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
