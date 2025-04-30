import Link from "next/link";
import { useAuth } from "@/context/useAuth";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white px-5 py-5 flex justify-between shadow-md">
      <div className="space-x-5 flex items-center">
        <div className="text-xl font-bold text-green-500">Gommerce</div>
        <Link href="/" className="hover:text-blue-500">
          Home
        </Link>
        <Link href="/products" className="hover:text-blue-500">
          Products
        </Link>
        {isLoggedIn() ? <Link href="/cart">Cart</Link> : <></>}
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
              className="mr-4 bg-green-600 rounded px-4 py-3 cursor-pointer hover:text-black hover:text-bold"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="cursor-pointer hover:text-blue-500 hover:text-bold"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
