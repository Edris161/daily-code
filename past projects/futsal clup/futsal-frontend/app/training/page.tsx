"use client";

import { useState } from "react";

interface Training {
  id: number;
  title: string;
  date: string;
  time: string;
  coach: string;
  location: string;
  status: "Upcoming" | "Completed";
}

const sampleTrainings: Training[] = [
  {
    id: 1,
    title: "Morning Fitness",
    date: "2025-01-10",
    time: "08:00 - 10:00",
    coach: "Coach Ahmad",
    location: "Main Court",
    status: "Upcoming",
  },
  {
    id: 2,
    title: "Tactical Training",
    date: "2025-01-08",
    time: "16:00 - 18:00",
    coach: "Coach Reza",
    location: "Court B",
    status: "Completed",
  },
  {
    id: 3,
    title: "Goalkeeper Practice",
    date: "2025-01-12",
    time: "14:00 - 15:30",
    coach: "Coach Ali",
    location: "Training Hall",
    status: "Upcoming",
  },
];

export default function TrainingsPage() {
  const [search, setSearch] = useState("");

  const filteredTrainings = sampleTrainings.filter(
    (training) =>
      training.title.toLowerCase().includes(search.toLowerCase()) ||
      training.coach.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900">
          Trainings
        </h1>

        <input
          type="text"
          placeholder="Search trainings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-4 md:mt-0 w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      {/* Trainings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrainings.map((training) => (
          <div
            key={training.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg
                       transition-shadow duration-200 p-6 flex flex-col"
          >
            {/* Status Badge */}
            <div className="flex justify-between items-center mb-4">
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full
                ${
                  training.status === "Upcoming"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {training.status}
              </span>

              <span className="text-gray-400 text-sm">
                {training.date}
              </span>
            </div>

            {/* Training Info */}
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              {training.title}
            </h2>

            <p className="text-gray-500 text-sm mb-1">
              🕒 {training.time}
            </p>
            <p className="text-gray-500 text-sm mb-1">
              👤 {training.coach}
            </p>
            <p className="text-gray-500 text-sm">
              📍 {training.location}
            </p>

            {/* Actions */}
            <div className="mt-auto pt-4 flex gap-2">
              <button
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg
                           hover:bg-blue-600 transition-all text-sm font-medium"
              >
                View
              </button>

              <button
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg
                           hover:bg-gray-300 transition-all text-sm font-medium"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
