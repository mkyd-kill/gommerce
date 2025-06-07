import { useCart } from "@/context/CartContext";
import { fetchAllProducts } from "@/services/productAPI";
import { ProductList } from "@/components/catalog/product-list";

export default async function ProductPage() {
  const products = await fetchAllProducts();
  const { addToCart } = useCart();
  return (
    <div></div>
  )
}