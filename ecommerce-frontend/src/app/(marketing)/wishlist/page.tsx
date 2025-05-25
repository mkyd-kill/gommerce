"use client";
import { useState } from "react";
import { useWishlist } from "@/context/WishlistContext";
import Selected from "../../../assets/State=Selected.svg";
import Default from "../../../assets/State=Default.svg";
import heart from "../../../assets/Heartwithribbon.svg";
import Image from "next/image";

export default function WishList() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [selected, setSelected] = useState(true);
  const [icon, setIcon] = useState(Default);
  const [type, setType] = useState("default");

  const handleToggle = () => {
    setIcon(type === "selected" ? Selected : Default);
    setType(type === "selected" ? "default" : "selected");
  };

  // fetch wishlist array from localstorage
  return (
    <div className="p-1">
      <div className="flex items-center bg-gray-300 p-3 rounded mb-4">
        <Image src={heart} alt="wishlist" width={24} height={24} />
        <h2 className="ml-2 text-xl font-bold text-black">Wishlist</h2>
      </div>

      {wishlist.length === 0 ? (
        <p className="text-gray-600 text-center">Your wishlist is empty</p>
      ) : (
        <h2>Hello world</h2>
      )}
    </div>
  );
}
