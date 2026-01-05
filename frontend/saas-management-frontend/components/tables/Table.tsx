interface TableProps {
  data: any[];
  columns: { header: string; accessor: string }[];
  onEdit: (row: any) => void;
  onDelete: (id: number) => void;
}

export default function Table({ data, columns, onEdit, onDelete }: TableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, idx) => (
            <tr
              key={row.id}
              className={`transition hover:bg-gray-50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              {columns.map((col) => (
                <td key={col.accessor} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {row[col.accessor]}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex gap-2">
                <button
                  onClick={() => onEdit(row)}
                  className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(row.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
