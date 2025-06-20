"use client";
import { useCart } from "@/context/CartContext";
import { fetchAllProducts } from "@/services/productAPI";
import { ProductList } from "@/components/catalog/product-list";
import { useEffect, useState } from "react";
import { ProductModel } from "@/types/product";

export default function ProductPage() {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetchAllProducts();
    setProducts(res);
    }
    getProducts();
  }, []);
  return (
    <div>products</div>
  )
}