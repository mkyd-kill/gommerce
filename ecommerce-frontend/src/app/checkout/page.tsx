"use client";
import Image from "next/image";
import truck from "../../assets/Delivery truck.svg";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ProtectedRoute from "@/lib/ProtectedRoute";
import { useState } from "react";
import { toast } from "react-toastify";
import { createOrderAPI } from "@/services/orderAPI";
import { useAuth } from "@/context/useAuth";

export default function CheckOut() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantityInCart,
      0
    );
    const tax = subtotal * 0.14;
    const shipping = 500;
    return subtotal + tax + shipping;
  };

  const handlePlaceOrder = async () => {
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.phone) {
      toast.warning("Please fill in all shipping fields");
      return;
    }
  
    const order = {
      user_email: user?.email,
      full_name: shippingInfo.name,
      address: shippingInfo.address,
      phone: shippingInfo.phone,
      total: calculateTotal(),
      items: cart.map((item) => ({
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantityInCart,
        price: item.price,
      })),
    };
  
    try {
      await createOrderAPI(order);
      toast.success("Order placed successfully!");
      clearCart();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to place order. Try again.");
    }
  };

  return (
    <ProtectedRoute>
      <div className="mx-4">
        {/* Back nav */}
        <div className="flex items-center gap-2 py-4 text-sm text-gray-600">
          <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6663 10H3.33301M3.33301 10L8.33301 15M3.33301 10L8.33301 5"
              stroke="#4D0039"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Link href="/cart" className="hover:text-blue-400">
            Shopping Cart
          </Link>
        </div>

        {/* Title */}
        <div className="flex items-center bg-gray-300 p-3 rounded mb-6">
          <Image src={truck} alt="truck" width={24} height={24} />
          <h2 className="ml-2 text-xl font-bold text-black">Checkout</h2>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping form */}
          <div className="bg-white p-4 rounded border">
            <h3 className="text-lg font-semibold mb-4">Shipping Info</h3>
            <form className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={shippingInfo.name}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              />
              <input
                type="text"
                name="address"
                placeholder="Shipping Address"
                value={shippingInfo.address}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={shippingInfo.phone}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded"
              />
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-4 rounded border">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <ul className="divide-y">
              {cart.map((item) => (
                <li key={item.id} className="py-2 flex justify-between">
                  <span>{item.name}</span>
                  <span>
                    Kshs. {(item.price * item.quantityInCart).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
            <hr className="my-3" />
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Kshs. 500</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (14%)</span>
              <span>
                Kshs.{" "}
                {(
                  cart.reduce(
                    (sum, item) => sum + item.price * item.quantityInCart,
                    0
                  ) * 0.14
                ).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <span>Total</span>
              <span>Kshs. {calculateTotal().toLocaleString()}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-6 w-full bg-[#66004b] text-white py-2 rounded hover:opacity-90 cursor-pointer"
            >
              Place order
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}