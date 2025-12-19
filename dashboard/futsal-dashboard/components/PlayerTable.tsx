"use client";

type Player = {
  id: number;
  name: string;
  age: number;
  team: string;
  trainingTime: string;
  feePaid: boolean;
};

export default function PlayerTable({ players }: { players: Player[] }) {
  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Age</th>
            <th className="p-3 text-left">Team</th>
            <th className="p-3 text-left">Training</th>
            <th className="p-3 text-left">Fee</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id} className="border-t">
              <td className="p-3">{player.name}</td>
              <td className="p-3">{player.age}</td>
              <td className="p-3">{player.team}</td>
              <td className="p-3">{player.trainingTime}</td>
              <td className="p-3">
                {player.feePaid ? (
                  <span className="text-green-600 font-semibold">Paid</span>
                ) : (
                  <span className="text-red-600 font-semibold">Unpaid</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
