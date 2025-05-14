import api from "@/lib/axios";
import { handleError } from "@/helpers/ErrorHandler";

export const getAllProductAPI = async () => {
    try {
        const res = await api.get("/product/all");
        return res.data;
    } catch (error) {
        handleError(error);
    }
};

export const getProductByIdAPI = async (productId: number) => {
    try {
        const res = await api.get(`/product/get/${productId}`);
        return res.data;
    } catch (error) {
        handleError(error);
    }
}