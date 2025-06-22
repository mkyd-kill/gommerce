import api from "@/lib/axios";
import { AuthResponse, UserProfile } from "@/types/user";
import { handleError } from "@/helpers/ErrorHandler";

export const loginAPI = async (email: string, password: string) => {
  try {
    const res = await api.post<AuthResponse>("/user/login", {
      email,
      password,
    });
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const res = await api.post("/user/register", {
      username,
      email,
      password,
    });
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const UpdateUserProfile = async (details: Partial<UserProfile>): Promise<Partial<UserProfile>> => {
  const res = await api.patch("/user/update", details);
  return res.data;
}