import { getProductByIdAPI, getAllProductAPI } from "@/services/productAPI";
import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { ProductModel } from "@/types/product";

interface ProductContextType {
  getProducts: () => void;
  getProductById: (id: number) => void;
}

const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [product, setProduct] = useState<ProductModel>();
  const [products, setProducts] = useState<ProductModel[]>([]);
  const getProducts = () => {
    getAllProductAPI()
      .then((res) => {
        setProducts(res.data);
        return products;
      })
      .catch(() => toast.warning("Failed to load products"));
  };

  const getProductById = (id: number) => {
    getProductByIdAPI(id)
      .then((res) => {
        setProduct(res.data);
        return product;
      })
      .catch(() => toast.warning("Failed to load product details"));
  };

  return (
    <ProductContext.Provider value={{ getProducts, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
