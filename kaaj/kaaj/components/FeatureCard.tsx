import React from 'react';

type Props = {
  icon: React.ReactNode;
  title: string;
  desc?: string;
  bgColor?: string;
  className?: string;
};

export default function FeatureCard({ icon, title, desc, bgColor = 'bg-white', className = '' }: Props) {
  return (
    <div className={`feature-card p-4 ${bgColor} ${className}`}>
      <div className="flex items-start gap-4">
        <div className="feature-icon bg-white/10 text-indigo-600 p-2 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-900">{title}</h4>
          {desc && <div className="text-sm text-gray-600">{desc}</div>}
        </div>
      </div>
    </div>
  );
}
