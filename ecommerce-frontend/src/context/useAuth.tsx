import { createContext, useEffect, useState } from "react";
import { UserProfile } from "@/types/user";
import { useRouter } from "next/navigation";
import { loginAPI, registerAPI } from "@/services/auth";
import { toast } from "react-toastify";
import React from "react";
import api from "@/lib/axios";

type UserContextType = {
    user: UserProfile | null;
    accessToken: string | null;
    registerUser: (email: string, username: string, password: string) => void;
    loginUser: (email: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const router = useRouter();
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");
    if (user && accessToken) {
      setUser(JSON.parse(user));
      setAccessToken(accessToken);
      api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
      router.push("/cart");
    }
    setIsReady(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerUser = async (
    email: string,
    username: string,
    password: string
  ) => {
    await registerAPI(username, email, password)
      .then((res) => {
        if (res) {
          toast.success("Registration Successfull!");
          router.push("/login");
        }
      })
      .catch(() => toast.warning("Server error occured"));
  };

  const loginUser = async (email: string, password: string) => {
    await loginAPI(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("accessToken", res?.data.token);
          const userObj = {
            username: res?.data.username,
            email: res?.data.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setAccessToken(res?.data.token);
          setUser(userObj!)
          toast.success("Login Successfull!");
          router.push("/cart");
        } else {
          toast.error("Invalid Login Credentials");
        }
      })
      .catch(() => toast.error("Server error occured"));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    setAccessToken("");
    toast.success("Logout Successfull!");
    router.push("/");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, accessToken, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);