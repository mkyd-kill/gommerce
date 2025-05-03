"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/useAuth";
import { getOrdersAPI } from "@/services/orderAPI";
import ProtectedRoute from "@/lib/ProtectedRoute";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import receipt from "../../assets/profile/receipt-check1.svg";

interface OrderItem {
  product_name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  full_name: string;
  address: string;
  phone: string;
  total: number;
  created_at: string;
  items: OrderItem[];
}

export default function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersAPI(user?.email || "", page, limit);
        setOrders(data);
      } catch {
        toast.error("Failed to load orders");
      }
    };

    if (user?.email) fetchOrders();
  }, [user, page]);

  return (
    <ProtectedRoute>
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6668 10H3.3335M3.3335 10L8.3335 15M3.3335 10L8.3335 5"
              stroke="#4D0039"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Link href="/products" className="hover:text-blue-500">
            Continue Shopping
          </Link>
        </div>

        <div className="flex items-center bg-gray-300 p-3 rounded mb-4">
          <Image src={receipt} alt="order history" width={24} height={24} />
          <h2 className="ml-2 text-xl font-bold text-black">Order History</h2>
        </div>

        {Array.isArray(orders) && orders.length === 0 ? (
          <p className="text-gray-600 text-center">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {Array.isArray(orders) &&
              orders.map((order) => (
                <div
                  key={order.id}
                  className="border rounded-lg p-4 shadow-sm bg-white"
                >
                  <div className="flex justify-center gap-4 mt-6">
                    <button
                      onClick={() => setPage((p) => Math.max(p - 1, 1))}
                      disabled={page === 1}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="px-3 py-1 text-gray-700">Page {page}</span>
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Next
                    </button>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="font-semibold text-lg">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">
                        Placed on{" "}
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-[#66004b]">
                      Kshs. {order.total.toLocaleString()}
                    </p>
                  </div>

                  <div className="text-sm text-gray-600 mb-3">
                    <p>
                      <strong>Shipping To:</strong> {order.full_name} —{" "}
                      {order.address}
                    </p>
                    <p>
                      <strong>Phone:</strong> {order.phone}
                    </p>
                  </div>

                  <ul className="divide-y">
                    {order.items.map((item, index) => (
                      <li key={index} className="py-2 flex justify-between">
                        <span>
                          {item.product_name} × {item.quantity}
                        </span>
                        <span>
                          Kshs. {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
