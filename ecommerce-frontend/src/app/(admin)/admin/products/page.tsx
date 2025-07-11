"use client";
import { useEffect, useState } from "react";
import { ProductModel } from "@/types/product";
import { FetchAllProducts, DeleteProductById } from "@/services/productAPI";
import Link from "next/link";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await FetchAllProducts();
        setProducts(data);
      } catch {
        toast.error("Failed to load products");
      }
    };
    loadProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      await DeleteProductById(id);
      setProducts((prev) => prev.filter((p) => p.ID !== id));
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Product Management</h1>
      <Link
        href="/admin/products/new"
        className="justify-center text-center mb-4 inline-block bg-[#66004b] text-white px-4 py-2 rounded"
      >
        <div className="flex">
          <Plus size={20} /> Add Product
        </div>
      </Link>

      <div className="overflow-x-auto border rounded shadow-sm">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Price</th>
              <th className="text-left px-4 py-2">Stock</th>
              <th className="text-left px-4 py-2">Category</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, key) => (
              <tr key={key} className="border-t">
                <td className="px-4 py-2">{prod.name}</td>
                <td className="px-4 py-2">
                  Kshs. {prod.price.toLocaleString()}
                </td>
                <td className="px-4 py-2">{prod.stock}</td>
                <td className="px-4 py-2">{prod.category}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    href={`/admin/products/edit/${prod.ID}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(prod.ID)}
                    className="text-red-600 hover:underline cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-4">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
