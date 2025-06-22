"use client";
import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { UserProfile } from "@/types/user";
import { loginAPI, registerAPI } from "@/services/authAPI";
import api from "@/lib/axios";

type UserContextType = {
  user: UserProfile | null;
  accessToken: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

type Props = { children: React.ReactNode };

export const UserProvider = ({ children }: Props) => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("accessToken");

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setAccessToken(storedToken);
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
      }
    }

    setIsReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerUser = (email: string, username: string, password: string) => {
    registerAPI(username, email, password)
      .then(() => {
        router.push("/login");
        toast.success("Registration successful!");
      })
      .catch(() => toast.error("Server error occurred"));
  };

  const loginUser = (email: string, password: string) => {
    loginAPI(email, password)
      .then((res) => {
        const { user_id, token, username, email } = res.data;

        const userObj = { user_id, username, email };
        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(userObj));

        setAccessToken(token);
        setUser(userObj);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        router.push("/profile");
        toast.success("Login successful!");
      })
      .catch(() => toast.error("Invalid login credentials"));
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    setAccessToken(null);
    toast.success("Logout successful!");
    router.push("/");
  };

  const isLoggedIn = () => !!user;

  return (
    <UserContext.Provider
      value={{ user, accessToken, loginUser, registerUser, logout, isLoggedIn }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
