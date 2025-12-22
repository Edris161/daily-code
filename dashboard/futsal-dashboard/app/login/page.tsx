"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

async function apiFetch(path: string, options: RequestInit = {}) {
  const base = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");
  const url = path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message = (body && (body.detail || body.message)) || res.statusText;
    throw new Error(message);
  }

  return res.json();
}

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await apiFetch("/auth/login/", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
      });

      // ✅ Save tokens
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      router.push("/dashboard");
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-slate-800 p-6 rounded-xl shadow-lg"
      >
        <h1 className="text-2xl font-bold text-white mb-4">Login</h1>

        {error && (
          <p className="mb-3 text-sm text-red-400">{error}</p>
        )}

        <input
          className="w-full mb-3 px-4 py-2 rounded bg-slate-700 text-white"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-4 px-4 py-2 rounded bg-slate-700 text-white"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold">
          Login
        </button>
      </form>
    </div>
  );
}
