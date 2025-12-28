"use client";

import { useState } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie"; // ✅ FIXED IMPORT
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/token/", {
        username,
        password,
      });

      // ✅ SAFETY CHECK
      if (!res.data?.access || !res.data?.refresh) {
        throw new Error("Invalid token response");
      }

      // ✅ CORRECT COOKIE USAGE
      Cookies.set("access_token", res.data.access, {
        secure: true,
        sameSite: "strict",
      });

      Cookies.set("refresh_token", res.data.refresh, {
        secure: true,
        sameSite: "strict",
      });

      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Sign in</h1>

      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="w-full border p-2 rounded"
      />

      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded"
      >
        Login
      </button>
    </form>
  );
}
