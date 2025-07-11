"use client";
import Image from "next/image";
import Link from "next/link";
import ProtectedRoute from "@/lib/ProtectedRoute";
import shoppingCart from "../../../assets/shopping-cart-03.svg";
import deleteIcon from "../../../assets/DeleteButton.svg";
import plus from "../../../assets/plus.svg";
import minus from "../../../assets/minus.svg";
import clipboard from "../../../assets/Clipboard.svg";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, increment, decrement, removeFromCart } = useCart();

  const calculateSubtotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatCurrency = (value: number) =>
    value.toLocaleString("en-KE", { minimumFractionDigits: 2 });

  return (
    <ProtectedRoute>
      <div className="p-1">
        {/* Header */}
        <div className="flex items-center bg-gray-300 p-3 rounded mb-4">
          <Image src={shoppingCart} alt="cart" width={24} height={24} />
          <h2 className="ml-2 text-xl font-bold text-black">Shopping Cart</h2>
        </div>

        {/* Cart Items */}
        {cart.length === 0 ? (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.map((item, key) => (
              <div key={key} className="flex items-center justify-between p-4 border rounded-md">
                <div className="flex items-center gap-4">
                  <Image
                    src={item.image || ""}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-contain rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Kshs. {formatCurrency(item.price)} each
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded px-2 py-1">
                    <Image
                      src={minus}
                      alt="decrement"
                      width={20}
                      className="cursor-pointer"
                      onClick={() => decrement(item.ID)}
                    />
                    <span className="px-3">{item.quantity}</span>
                    <Image
                      src={plus}
                      alt="increment"
                      width={20}
                      className="cursor-pointer"
                      onClick={() => increment(item.ID)}
                    />
                  </div>
                  <p className="text-xl font-semibold">
                    Kshs. {formatCurrency(item.price * item.quantity)}
                  </p>
                  <Image
                    src={deleteIcon}
                    alt="remove"
                    width={40}
                    height={40}
                    className="cursor-pointer"
                    onClick={() => removeFromCart(item.ID)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {cart.length > 0 && (
          <div className="mt-8 border-t pt-4 max-w-md mx-auto bg-gray-50 p-4 rounded shadow">
            <div className="flex items-center mb-2">
              <Image src={clipboard} alt="summary" width={20} />
              <p className="ml-2 font-semibold text-lg">Order Summary</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Subtotal</p>
              <p>Kshs. {formatCurrency(calculateSubtotal())}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Shipping</p>
              <p>Kshs. 500.00</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Tax (14%)</p>
              <p>
                Kshs. {formatCurrency(calculateSubtotal() * 0.14)}
              </p>
            </div>
            <div className="flex justify-between mb-4">
              <p>Discount</p>
              <p>Kshs. 0.00</p>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg mt-2">
              <p>Total</p>
              <p>
                Kshs.{" "}
                {formatCurrency(
                  calculateSubtotal() * 1.14 + 500
                )}
              </p>
            </div>
            <Link
              href="/checkout"
              className="block text-center bg-[#66004b] text-white py-2 rounded mt-4"
            >
              Proceed to Checkout →
            </Link>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}