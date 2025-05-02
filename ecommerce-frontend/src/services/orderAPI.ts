import api from "@/lib/axios";

const baseUrl = "/order/"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createOrderAPI = async (order: any) => {
    return await api.post(baseUrl + "create", order);
};

export const getOrdersAPI = async (email: string, page = 1, limit = 5) => {
    const res = await api.get(baseUrl + `?email=${email}&page=${page}&limit=${limit}`);
    return res.data;
}