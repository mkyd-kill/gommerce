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
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      if (exists) {
        toast.success(`Increased quantity of ${item.name}`);
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantityInCart: p.quantityInCart + 1 } : p
        );
      }
      toast.success("Added to cart");
      return [...prev, { ...item, quantityInCart: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    const item = cart.find((i) => i.id === id);
    if (item) toast.info(`${item.name} removed`);
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const increment = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantityInCart: item.quantityInCart + 1 }
          : item
      )
    );
    toast.success("Quantity increased");
  };

  const decrement = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantityInCart: Math.max(1, item.quantityInCart - 1) }
          : item
      )
    );
    toast.warning("Quantity decreased");
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
