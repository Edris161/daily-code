interface CardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode; // optional icon for visual cue
}

export default function Card({ title, value, icon }: CardProps) {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
      </div>
      {icon && <div className="text-blue-600">{icon}</div>}
    </div>
  );
}
