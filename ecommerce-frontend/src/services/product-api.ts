import api from "@/lib/axios";
import { ProductModel } from "@/types/product";

export const FetchProductById = async (id: string): Promise<ProductModel> => {
    const res = await api.get(`/products/get/${id}`);
    return res.data;
}

export const DeleteProductById = async (id: number) => {
    return await api.delete(`/products/delete/${id}`);
}

export const UpdateProductById = async (id: string, data: Partial<ProductModel | null>) => {
    await api.put(`/products/update/${id}`, data);
}