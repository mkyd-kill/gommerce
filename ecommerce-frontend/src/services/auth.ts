import api from "@/lib/axios";
import { AuthResponse } from "@/types/user";

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/users/login", { email, password });
    return res.data;
};

export const register = async (username: string, email: string, password: string) => {
    const res = await api.post("/users/register", { username, email, password });
    return res.data;
}