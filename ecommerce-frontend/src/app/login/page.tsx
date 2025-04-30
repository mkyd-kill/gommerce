"use client";
import { useState } from "react";
import { useAuth } from "@/context/useAuth";
import eye from "../../assets/eye.svg";
import eyeOff from "../../assets/eye-off.svg";
import google from "../../assets/sigup/Social button.svg";
import facebook from "../../assets/sigup/Social button groups (1).svg";
import apple from "../../assets/sigup/Social button groups.svg";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const { loginUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginUser(email, password);
  };

  return (
    <div className="flex w-full justify-between my-6">
      <div className="flex flex-col justify-center items-center self-stretch flex-grow mx-auto p-4 sm:p-0">
        <div className="flex flex-col justify-center items-center gap-8 w-full max-w-md">
          <div className="flex flex-col justify-start items-center self-stretch gap-6 w-full">
            <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-3">
              <p className="self-stretch flex-grow-0 flex-shrink-0 text-3xl font-semibold text-center text-[#101828]">
                One of Us ?
              </p>
              <p className="self-stretch flex-grow-0 flex-shrink-0 text-base text-center text-[#667085]">
                Continue Shopping...
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-start items-center self-stretch gap-6 rounded-xl w-full">
            {/* login form */}
            <form
              onSubmit={handleLogin}
              className="flex flex-col justify-start items-center self-stretch gap-6 rounded-xl w-full"
            >
              <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-5">
                <div className="flex flex-col w-full justify-start items-start flex-grow relative gap-1.5">
                  <label className="flex-grow-0  flex-shrink-0 text-xs font-medium text-left text-[#344054]">
                    Email
                  </label>
                  <input
                    className="put appearance-none w-full  border border-[#d0d5dd] rounded-md py-2.5 px-3 text-black  focus:outline-none"
                    type="email"
                    placeholder="Enter your email address"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col w-full justify-start items-start flex-grow relative gap-1.5">
                  <label className="flex-grow-0  flex-shrink-0 text-xs font-medium text-left text-[#344054]">
                    Password
                  </label>
                  <div className="relative w-full">
                    <input
                      className="put appearance-none w-full border border-[#d0d5dd] rounded-md py-2.5 px-3 text-black pr-8 focus:outline-none"
                      type={type}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
              <button type="submit"
                className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2 px-[18px] py-2.5 rounded-lg bg-[#66004b] border border-[#66004b] cursor-pointer"
                style={{
                  boxShadow: "0px 1px 2px 0 rgba(16,24,40,0.05)",
                }}
              >
                <div
                  className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-white cursor-pointer"
                >
                  Sign in
                </div>
              </button>
            </form>

            {/* sign in by accounts */}
            <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
              <p className="self-stretch flex-grow-0 flex-shrink-0 text-base text-[#667085]">
                Or sign in with:
              </p>
              <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
                <div className="flex justify-center items-center flex-grow gap-3 cursor-pointer">
                  <Image src={apple} alt="apple" />
                </div>
                <div className="flex justify-center items-center flex-grow gap-3 cursor-pointer">
                  <Image src={google} alt="google" />
                </div>
                <div className="flex justify-center items-center flex-grow gap-3 cursor-pointer">
                  <Image src={facebook} alt="facebook" />
                </div>
              </div>

              <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2">
                <p className="flex-grow-0 flex-shrink-0 text-sm font-semibold text-left text-[#475467]">
                  Don&apos;t have an account?{" "}
                  <span className="text-[#66004b] cursor-pointer">
                    <Link href="/register">Sign Up</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
