import { handleError } from "@/helpers/ErrorHandler";
import api from "@/lib/axios";

const baseUrl = "/admin/";

export const getAdminStats = async () => {
    try {
        const res = await api.get(baseUrl);
        return res.data;
    } catch (error) {
        handleError(error);
    }
}