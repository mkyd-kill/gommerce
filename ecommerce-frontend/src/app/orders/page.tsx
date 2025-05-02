"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/useAuth";
import { getOrdersAPI } from "@/services/orderAPI";
import ProtectedRoute from "@/lib/ProtectedRoute";
import { toast } from "react-toastify";

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

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersAPI(user?.email || "");
        setOrders(data);
      } catch {
        toast.error("Failed to load orders");
      }
    };

    if (user?.email) fetchOrders();
  }, [user]);

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Order History</h1>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
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
