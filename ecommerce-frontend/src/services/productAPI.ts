import api from "@/lib/axios";
import { ProductModel } from "@/types/product";

export const fetchAllProducts = async (): Promise<ProductModel[]> => {
    const res = await api.get("/product/all");
    return res.data;
}

export const fetchProductById = async (id: string | number): Promise<ProductModel> => {
    const res = await api.get(`/product/get/${id}`);
    return res.data;
}

export const DeleteProductById = async (id: string | number): Promise<ProductModel> => {
    return await api.delete(`/product/delete/${id}`);
}