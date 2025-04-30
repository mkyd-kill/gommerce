import Link from "next/link";

import { useAuth } from "@/context/useAuth";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white px-5 py-5 flex justify-between">
      <div className="space-x-5">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        {isLoggedIn() ? (
          <Link href="/cart">Cart</Link>
        ): (
          <div></div>
        )}
      </div>
      <div>
        {isLoggedIn() ? (
          <div className="flex items-center space-x-6 text-black">
            <div className="text-white text-semibold">
            Welcome, {user?.username}
          </div>
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded cursor-pointer hover:opacity-70"
          >
            Logout
          </button>
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="mr-4 bg-green-600 rounded px-4 py-3 cursor-pointer"
            >
              Login
            </Link>
            <Link href="/register" className="cursor-pointer">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
