"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/token/",
        { username, password }
      );

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      router.push("/projects");
    } catch {
      setError("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <input
          className="w-full p-2 border mb-3"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 border mb-4"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
