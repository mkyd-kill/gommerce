"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { WishlistItem } from "@/types/product";

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType>(
  {} as WishlistContextType
);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    if (stored) setWishlist(JSON.parse(stored));
  }, []);

  const addToWishlist = (item: WishlistItem) => {
    if (wishlist.some((prod) => prod.ID === item.ID)) {
      toast.info("Item already in wishlist");
      return;
    }
    setWishlist([...wishlist, { ...item, Quantity: 1 }]);
    toast.success("Added to wishlist");
  };

  const removeFromWishlist = (id: number) => {
    setWishlist(wishlist.filter((item) => item.ID !== id));
    toast.warning("Removed from wishlist");
  };

  const isInWishlist = (id: number) => wishlist.some((item) => item.ID === id);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);