"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="bg-gray-800 text-white px-5 py-5 flex justify-between">
      <div className="space-x-5">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        {loggedIn && <Link href="/cart">Cart</Link>}
      </div>
      <div>
        {loggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded cursor-pointer hover:opacity-70"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              href="/login"
              className="mr-4 bg-green-600 rounded px-4 py-3 cursor-pointer"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="cursor-pointer"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
