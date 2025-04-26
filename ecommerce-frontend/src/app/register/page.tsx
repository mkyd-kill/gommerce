"use client";
import { useState } from "react";
import { register } from "@/services/auth";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await register(username, email, password);
      router.push("/");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.response?.data?.error || "Registration Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Account Registration</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
      <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-3 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-2 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}