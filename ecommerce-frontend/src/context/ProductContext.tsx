"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { ProductModel } from "@/types/product";
import { toast } from "react-toastify";
import { fetchAllProducts } from "@/services/productAPI";

interface ProductContextType {
  products: ProductModel[];
  refreshProducts: () => void;
}

const ProductContext = createContext<ProductContextType>({
  products: [],
  refreshProducts: () => {},
});

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<ProductModel[]>([]);

  const loadProducts = async () => {
    try {
      const data = await fetchAllProducts();
      setProducts(data || []);
    } catch {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, refreshProducts: loadProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);