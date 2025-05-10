/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import ProtectedRoute from "@/lib/ProtectedRoute";
import Image from "next/image";
import Link from "next/link";
import user_profile from "../../assets/profile/user-01.svg";
import eye from "../../assets/auth/eye.svg";
import eyeOff from "../../assets/auth/eye-off.svg";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { useAuth } from "@/context/useAuth";

export default function Profile() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [icon, setIcon] = useState(eyeOff);
  const [type, setType] = useState("password");
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const { user } = useAuth();
  const userID = user?.user_id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/user/profile-update/${userID}`);
        const { profile, cards } = res.data;
        setFirstname(profile.firstname || "");
        setLastname(profile.lastname || "");
        setPhoneNumber(profile.phoneNumber || "");
        setCards(cards || []);
      } catch (error) {
        toast.error("Failed to fetch profile");
      }
    };
    fetchProfile();
  }, [userID]);

  const handleToggle = () => {
    setIcon(type === "password" ? eye : eyeOff);
    setType(type === "password" ? "text" : "password");
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.put(`/user/profile-update/${userID}`, {
        body: JSON.stringify({
          firstname,
          lastname,
          phoneNumber,
          newPassword,
        }),
      });
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("An error occurred while updating your profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="p-4">
        {/* Navigation */}
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

        {/* Header */}
        <div className="flex items-center bg-gray-300 p-3 rounded mb-4">
          <Image src={user_profile} alt="user profile" width={24} height={24} />
          <h2 className="ml-2 text-xl font-bold text-black">
            User Account Profile
          </h2>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded">
            <h3 className="text-lg font-semibold mb-4">Basic Details</h3>

            <form
              onSubmit={handleProfileUpdate}
              className="flex flex-col gap-3 w-full"
            >
              <div className="flex flex-col gap-3">
                {/* First Name */}
                <div>
                  <label className="text-xs font-medium text-[#344054]">
                    First Name
                  </label>
                  <input
                    className="w-full border border-[#d0d5dd] rounded-md py-2.5 px-3 text-black"
                    type="text"
                    placeholder="Enter your first name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="text-xs font-medium text-[#344054]">
                    Last Name
                  </label>
                  <input
                    className="w-full border border-[#d0d5dd] rounded-md py-2.5 px-3 text-black"
                    type="text"
                    placeholder="Enter your last name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs font-medium text-[#344054]">
                    Phone Number
                  </label>
                  <input
                    className="w-full border border-[#d0d5dd] rounded-md py-2.5 px-3 text-black"
                    type="tel"
                    placeholder="e.g. 0712345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="text-xs font-medium text-[#344054]">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      className="w-full border border-[#d0d5dd] rounded-md py-2.5 px-3 text-black pr-10"
                      type={type}
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                    />
                    <span
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                      onClick={handleToggle}
                    >
                      <Image src={icon} alt="toggle password" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-4 flex justify-center items-center px-[18px] py-2.5 rounded-lg bg-[#66004b] text-white font-semibold border border-[#66004b] hover:bg-[#55003f] transition-colors cursor-pointer"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>

          {/* Card Details Section (Placeholder) */}
          <div className="bg-white p-4 rounded">
            <h3 className="text-lg font-semibold mb-4">Card Details</h3>
            <p className="text-sm text-gray-500">
              Card information will be shown here if available.
            </p>
            {/* Future Enhancement: Map saved payment methods here */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
              {cards.length > 0 ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                cards.map((card: any) => (
                  <div
                    key={card.id}
                    className="border border-gray-200 p-3 rounded-md shadow-sm"
                  >
                    <p className="text-sm font-medium text-gray-700">
                      {card.card.brand.toUpperCase()} **** {card.card.last4}
                    </p>
                    <p className="text-xs text-gray-500">
                      Exp: {card.card.exp_month}/{card.card.exp_year}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center">No saved cards found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
