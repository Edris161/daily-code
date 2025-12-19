import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">
        Futsal Training Club
      </h1>
      <p className="mb-6 text-gray-600">
        Manage players, teams, and training sessions
      </p>
      <Link
        href="/login"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        Login
      </Link>
    </main>
  );
}
