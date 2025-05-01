"use client";
import Image from "next/image";
import truck from "../../assets/Delivery truck.svg";
import Link from "next/link";
import ProtectedRoute from "@/lib/ProtectedRoute";

export default function CheckOut() {
  return (
    <ProtectedRoute>
      <div className="mx-4">
        <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5 p-4">
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
            <svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-grow-0 flex-shrink-0 w-5 h-5 relative"
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d="M16.6663 10H3.33301M3.33301 10L8.33301 15M3.33301 10L8.33301 5"
                stroke="#4D0039"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Link
              href="/cart"
              className="flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-[#475467] hover:text-blue-300"
            >
              Shopping Cart
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 h-[62px] p-2 bg-gray-300 rounded mb-1">
          <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative gap-1">
            <Image src={truck} alt="truck" />
            <p className="flex-grow-0 flex-shrink-0 text-2xl font-semibold text-center text-black">
              Checkout
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}