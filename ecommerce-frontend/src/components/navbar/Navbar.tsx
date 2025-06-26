"use client";
import Link from "next/link";
import { useAuth } from "@/context/useAuth";
import Image from "next/image";
import avatar from "../../assets/default-avatar.jpg";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  Heart,
  ShoppingCart,
  ShoppingBag,
  XIcon,
  Menu,
  LogOut,
  Receipt,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { isLoggedIn, logout } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const wishlistCount = wishlist.reduce((sum, item) => sum + item.id, 0);

  return (
    <nav className="sticky top-0 z-50 bg-slate-50 px-4 py-2 flex items-center justify-between">
      <Link href="/">
        <div className="flex flex-col leading-tight">
          <span className="text-lg md:text-2xl font-bold text-[#a91f64]">
            Gommerce
          </span>
          <span className="text-sm text-gray-500 tracking-widest self-center">
            Online Store
          </span>
        </div>
      </Link>

      <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
        <li>
          <Link href="/" className="hover:text-[#a01f64]">
            Home
          </Link>
        </li>
        <li>
          <Link href="/products" className="hover:text-[#a01f64]">
            Products
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-3 text-gray-600 text-xl">
        <div className="flex gap-4">
          <Link href="/wishlist" className="relative">
            <Heart className="hover:text-[#a01f64] h-6 w-6" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingCart className="hover:text-[#a01f64] h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {isLoggedIn() && (
            <>
              <Link href="/checkout">
                <ShoppingBag className="hover:text-[#a01f64]" />
              </Link>
              <Link href="/orders">
                <Receipt className="hover:text-[#a01f64]" />
              </Link>
            </>
          )}
        </div>

        <div className="flex flex-row md:flex-row md:items-center gap-1.5 md:space-x-3 space-y-2 md:space-y-0">
          {isLoggedIn() ? (
            <>
              <Link href="/profile">
                <Image
                  src={avatar}
                  alt="user-avatar"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </Link>
              <button
                onClick={logout}
                className="hover:bg-red-500 px-2 py-1 rounded hover:opacity-75 cursor-pointer"
              >
                <LogOut />
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-green-600 px-1.5 py-0.5 rounded hover:bg-green-700 hover:text-white"
            >
              Login
            </Link>
          )}
        </div>

        <div className="md:hidden flex">
          <button onClick={toggleMenu}>
            {isMenuOpen ? (
              <XIcon className="text-2xl hover:text-[#a01f64] cursor-pointer" />
            ) : (
              <Menu className="text-2xl hover:text-[#a01f64] cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {isMenuOpen && (
        <ul className="absolute top-full left-0 w-full bg-white flex flex-col items-center gap-3 py-4 text-gray-700 font-medium md:hidden shadow-md">
          <li>
            <Link
              href="/"
              className="hover:text-[#a01f64]"
              onClick={toggleMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="hover:text-[#a01f64]"
              onClick={toggleMenu}
            >
              Products
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
