interface Player {
  id: number;
  name: string;
  age: number;
  team: number | null;
  training_time: string;
  fee_paid: boolean;
}

export default function PlayerTable({ players }: { players: Player[] }) {
  return (
    <table className="w-full bg-white shadow rounded">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-2">Name</th>
          <th className="p-2">Age</th>
          <th className="p-2">Team</th>
          <th className="p-2">Training</th>
          <th className="p-2">Fee</th>
        </tr>
      </thead>
      <tbody>
        {players.map((p) => (
          <tr key={p.id} className="border-t">
            <td className="p-2">{p.name}</td>
            <td className="p-2">{p.age}</td>
            <td className="p-2">{p.team ?? "-"}</td>
            <td className="p-2">{p.training_time}</td>
            <td className="p-2">
              {p.fee_paid ? "Paid ✅" : "Unpaid ❌"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
