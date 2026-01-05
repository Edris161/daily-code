"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { BsMicrosoft } from "react-icons/bs";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // ✅ MOCK LOGIN (Frontend only)
    if (email && password) {
      localStorage.setItem("access_token", "mock-token");
      router.push("/dashboard");
    } else {
      setError("Please enter email and password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 to-blue-500">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-6">
          SaaS Manager Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Email or Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        {/* Optional: Forgot Password */}
        <div className="text-right mt-2">
          <a href="#" className="text-sm text-indigo-600 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-slate-300" />
          <span className="px-3 text-sm text-slate-500">or login with</span>
          <hr className="flex-1 border-slate-300" />
        </div>

        {/* Social Login Buttons (mocked) */}
        <div className="flex gap-4 justify-center">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-gray-100 transition">
            <FcGoogle size={20} />
            Google
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-gray-100 transition">
            <BsMicrosoft size={20} className="text-blue-600" />
            Microsoft
          </button>
        </div>
      </div>
    </div>
  );
}
