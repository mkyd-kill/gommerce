"use client";
import Link from "next/link";
import { useAuth } from "@/context/useAuth";
import Image from "next/image";
import avatar from "../../assets/default-avatar.jpg";
import { useState } from "react";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white px-4 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold text-green-500">Gommerce</div>

        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden focus:outline-none"
        >
          ☰
        </button>
      </div>

      <div
        className={`mt-4 md:mt-0 md:flex justify-between items-center ${
          open ? "block" : "hidden"
        } md:flex-row`}
      >
        <div className="space-y-2 md:space-y-0 md:space-x-6 flex flex-col md:flex-row items-start md:items-center">
          <Link href="/" className="hover:text-blue-400">
            Home
          </Link>
          <Link href="/products" className="hover:text-blue-400">
            Products
          </Link>
          {isLoggedIn() && (
            <>
              <Link href="/cart" className="hover:text-blue-400">
                Cart
              </Link>
              <Link href="/checkout" className="hover:text-blue-400">
                Checkout
              </Link>
            </>
          )}
        </div>

        <div className="mt-4 md:mt-0 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
          {isLoggedIn() ? (
            <>
              <Link href="/profile">
                <Image
                  src={avatar}
                  alt="user-avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </Link>
              <div>Welcome, {user?.username?.toUpperCase()}</div>
              <button
                onClick={logout}
                className="bg-red-500 px-3 py-1 rounded hover:opacity-75 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="border border-blue-400 px-4 py-2 rounded hover:bg-blue-500 hover:text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}