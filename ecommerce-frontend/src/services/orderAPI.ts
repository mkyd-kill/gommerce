import api from "@/lib/axios";

const baseUrl = "/user/order/"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createOrderAPI = async (order: any) => {
    return await api.post(baseUrl + "create", order);
};