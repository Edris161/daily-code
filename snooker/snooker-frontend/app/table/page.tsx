'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import API from '@/lib/api';

export default function Tables() {
  type Table = {
    id: number;
    table_number: number;
    price_per_hour: number;
  };

  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    API.get('tables/')
      .then((res) => {
        if (!mounted) return;
        setTables(res.data);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.response?.data || err.message || 'Failed to load tables');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className="p-10">Loading tables...</div>;
  if (error) return <div className="p-10 text-red-400">Error: {String(error)}</div>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Snooker Tables</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tables.map((t) => (
          <div key={t.id} className="border p-4 rounded bg-gray-800 text-white">
            <h2 className="text-xl">Table #{t.table_number}</h2>
            <p>Price: {t.price_per_hour} per hour</p>
            <Link
              href={`/book?t=${t.id}`}
              className="mt-3 inline-block bg-green-600 px-3 py-1 rounded hover:bg-green-500"
            >
              Book Now
            </Link>
          </div>
        ))}
        {tables.length === 0 && (
          <div className="col-span-full text-center text-gray-300">No tables found.</div>
        )}
      </div>
    </div>
  );
}
