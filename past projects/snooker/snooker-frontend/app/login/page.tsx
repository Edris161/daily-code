"use client";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });

      Cookies.set("token", res.data.access, { expires: 7 }); // Save token
      setMsg("Login Successful 🎉");
      console.log("TOKEN:", res.data.access);
    } catch (error) {
      setMsg("Login Failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-900 p-8 rounded w-80">
        <h1 className="text-2xl font-bold text-white mb-4">Login</h1>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-green-600 w-full py-2 text-white rounded"
        >
          Login
        </button>

        <p className="text-white mt-3">{msg}</p>
      </div>
    </div>
  );
}
