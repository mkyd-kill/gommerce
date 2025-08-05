"use client";
import { createContext, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import React from "react";
import { UserProfile } from "@/types/user";
import { loginAPI, registerAPI } from "@/services/authAPI";
import api from "@/lib/axios";

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
      if (res?.status === 200) {
        router.push("/profile");
        toast.success("Login Successful!");
        const userRes = await api.get("/user/profile");
        setUser(userRes.data);
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
      { children }
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);