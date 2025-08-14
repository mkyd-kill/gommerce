/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import React from "react";
import { UserProfile } from "@/types/user";
import { loginAPI, registerAPI } from "@/services/auth-api";
import api from "@/lib/axios";
import { jwtDecode } from "jwt-decode";
import CookieStore from "@/lib/cookie-store";

type UserContextType = {
  user: UserProfile | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function loadUser() {
      // check for token-access cookie
      const access = await CookieStore("auth-token");
      const decode: any = jwtDecode(access as string);
      const now = Math.floor(Date.now() / 1000);

      if (decode.exp > now) {
        const res = await api.get("/user/profile");
        if (res.status === 200) {
          setUser(res.data);
        }
      }
    }
    loadUser();
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      await registerAPI(username, email, password);
      toast.success("Registration Successful!");
      router.push("/login");
    } catch {
      toast.warning("Registration failed");
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const res = await loginAPI(email, password);
      if (res.status === 200) {
        toast.success("Login Successful!");
        router.push("/products");
      } else {
        toast.error("Invalid credentials");
      }
    } catch {
      toast.error("Network Error");
    }
  };

  const logout = async () => {
    try {
      await api.post("/user/logout");
      setUser(null);
      router.push("/");
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    }
  };

  const isLoggedIn = () => !!user;

  return (
    <UserContext.Provider
      value={{
        user,
        registerUser,
        loginUser,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);