"use client";
import ProtectedRoute from "@/lib/ProtectedRoute";
import Image from "next/image";
import Link from "next/link";
import user from "../../assets/profile/user-01.svg";
import eye from "../../assets/auth/eye.svg";
import eyeOff from "../../assets/auth/eye-off.svg";
import { toast } from "react-toastify";
import { useState } from "react";

export default function Profile() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [icon, setIcon] = useState(eyeOff);
  const [type, setType] = useState("password");

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Update form working");
  };

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
          <h2 className="ml-2 text-xl font-bold text-black">
            User Account Profile
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded">
            <h3 className="text-lg font-semibold mb-4">Basic Details</h3>

            <form
              onSubmit={handleProfileUpdate}
              className="flex flex-col justify-start items-center self-stretch gap-3 rounded-xl w-full"
            >
              <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-3">
                <div className="flex flex-col w-full justify-start items-start flex-grow relative gap-1.5">
                  <label className="flex-grow-0  flex-shrink-0 text-xs font-medium text-left text-[#344054]">
                    First Name
                  </label>
                  <input
                    className="put appearance-none w-full  border border-[#d0d5dd] rounded-md py-2.5 px-3 text-black  focus:outline-none"
                    type="text"
                    placeholder="Enter your first name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col w-full justify-start items-start flex-grow relative gap-3">
                  <label className="flex-grow-0  flex-shrink-0 text-xs font-medium text-left text-[#344054]">
                    Last Name
                  </label>
                  <input
                    className="put appearance-none w-full  border border-[#d0d5dd] rounded-md py-2.5 px-3 text-black  focus:outline-none"
                    type="text"
                    placeholder="Enter your last name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col w-full justify-start items-start flex-grow relative gap-3">
                  <label className="flex-grow-0  flex-shrink-0 text-xs font-medium text-left text-[#344054]">
                    Phone Number
                  </label>
                  <input
                    className="put appearance-none w-full  border border-[#d0d5dd] rounded-md py-2.5 px-3 text-black  focus:outline-none"
                    type="number"
                    placeholder="Enter your phone number (e.g 0712345678)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col w-full justify-start items-start flex-grow relative gap-3">
                  <label className="flex-grow-0  flex-shrink-0 text-xs font-medium text-left text-[#344054]">
                    New Password
                  </label>
                  <div className="relative w-full">
                    <input
                      className="put appearance-none w-full border border-[#d0d5dd] rounded-md py-2.5 px-3 text-black pr-8 focus:outline-none"
                      type={type}
                      placeholder="Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                    />
                    <span
                      className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer"
                      onClick={handleToggle}
                    >
                      <Image src={icon} alt="icon" />
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2 px-[18px] py-2.5 rounded-lg bg-[#66004b] border border-[#66004b] cursor-pointer"
                style={{
                  boxShadow: "0px 1px 2px 0 rgba(16,24,40,0.05)",
                }}
              >
                <div className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-white cursor-pointer">
                  Update Profile
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
