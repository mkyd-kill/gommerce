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
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { isLoggedIn, logout } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const wishlistCount = wishlist.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 bg-slate-50 px-4 py-2 flex items-center justify-between">
      <Link href="/">
        <div className="flex flex-col leading-tight">
          <span className="text-lg md:text-2xl font-bold text-[#a91f64]">
            Gommerce
          </span>
          <span className="hidden md:flex text-sm text-gray-500 tracking-widest self-center">
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

      <div className="flex items-center gap-2 text-gray-700 text-xl">
        <div className="flex gap-3 md:gap-4">
          <Link href="/wishlist" className="relative">
            <Heart size={20} className="hover:text-[#a01f64]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingCart size={20} className="hover:text-[#a01f64]" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {isLoggedIn() && (
            <>
              <Link href="/checkout">
                <ShoppingBag size={20} className="hover:text-[#a01f64]" />
              </Link>
            </>
          )}
        </div>

        <div className="flex flex-row md:flex-row md:items-center gap-1.5 md:space-x-2 space-y-2 md:space-y-0">
          {isLoggedIn() ? (
            <>
              <Link href="/profile">
                <Image
                  src={avatar}
                  alt="user-avatar"
                  width={20}
                  height={20}
                  className="rounded-full w-auto h-auto"
                />
              </Link>
              <button
                onClick={logout}
                className="hover:bg-red-500 px-2 py-1 rounded hover:opacity-75 cursor-pointer"
              >
                <LogOut size={20} />
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
              <XIcon size={20} className="hover:text-[#a01f64] cursor-pointer" />
            ) : (
              <Menu size={20} className="hover:text-[#a01f64] cursor-pointer" />
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
