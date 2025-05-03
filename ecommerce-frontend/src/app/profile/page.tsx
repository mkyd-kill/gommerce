"use client";
import ProtectedRoute from "@/lib/ProtectedRoute";
import Image from "next/image";
import Link from "next/link";
import user from "../../assets/profile/user-01.svg";

export default function Profile() {
  return (
    <ProtectedRoute>
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6668 10H3.3335M3.3335 10L8.3335 15M3.3335 10L8.3335 5"
              stroke="#4D0039"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Link href="/products" className="hover:text-blue-500">
            Continue Shopping
          </Link>
        </div>

        <div className="flex items-center bg-gray-300 p-3 rounded mb-4">
          <Image src={user} alt="user profile" width={24} height={24} />
          <h2 className="ml-2 text-xl font-bold text-black">User Profile</h2>
        </div>
      </div>
    </ProtectedRoute>
  );
}
