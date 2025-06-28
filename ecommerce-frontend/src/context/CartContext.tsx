"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CartItem } from "@/types/product";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const addToCart = (item: CartItem) => {
    const existing = cart.find((prod) => prod.id === item.id);
  
    if (existing) {
      setCart((prev) =>
        prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
      toast.success("Increased Quantity of Item");
    } else {
      setCart((prev) => [...prev, { ...item, quantity: 1 }]);
      toast.success("Item Added to Cart");
    }
  };
  
  const removeFromCart = (id: number) => {
    const item = cart.find((i) => i.id === id);
    if (item) toast.info("Item Removed from Cart");
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const increment = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantityInCart: item.quantity + 1 }
          : item
      )
    );
    toast.success("Increased Quantity of Item");
  };

  const decrement = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantityInCart: Math.max(1, item.quantity - 1) }
          : item
      )
    );
    toast.warning("Decreased Quantity of Item");
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increment,
        decrement,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
