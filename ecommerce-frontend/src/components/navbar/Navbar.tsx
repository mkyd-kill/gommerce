"use client";
import Link from "next/link";
import { useAuth } from "@/context/useAuth";
import Image from "next/image";
import avatar from "../../assets/default-avatar.jpg";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  Heart,
  ShoppingCart,
  ShoppingBag,
  XIcon,
  BadgeX,
  LogOut,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { isLoggedIn, logout } = useAuth();
  const { cart } = useCart();

  const cartCount = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + item.quantityInCart, 0)
    : 0;

  return (
    <nav className="sticky top-0 z-50 bg-slate-50 px-4 py-2 flex items-center justify-between">
      <div className="flex flex-col leading-tight">
        <span className="text-lg md:text-2xl font-bold text-[#a91f64]">
          Gommerce
        </span>
        <span className="text-sm text-gray-500 tracking-widest self-center">
          Online Store
        </span>
      </div>

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

      <div className="flex items-center gap-4 text-gray-600 text-xl">
        <div className="flex gap-4">
          <Link href="/cart" className="flex">
            <ShoppingCart className="hover:text-[#a01f64]" />
            {cartCount > 0 && (
              <span className="text-sm relative top-3 justify-center items-center text-gray-800">
                {cartCount}
              </span>
            )}
          </Link>
          {isLoggedIn() && (
            <>
              <Link href="/wishlist">
                <Heart className="hover:text-[#a01f64]" />
              </Link>
              <Link href="/checkout">
                <ShoppingBag className="hover:text-[#a01f64]" />
              </Link>
            </>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:space-x-3 space-y-2 md:space-y-0">
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
              <BadgeX className="text-2xl hover:text-[#a01f64] cursor-pointer" />
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
