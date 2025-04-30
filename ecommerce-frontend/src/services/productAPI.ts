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

export const getProductById = async (id: number) => {
    try {
        
    } catch (error) {
        handleError(error);
    }
}