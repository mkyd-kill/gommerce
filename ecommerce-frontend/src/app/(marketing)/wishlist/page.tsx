"use client";
import { useWishlist } from "@/context/WishlistContext";
import Selected from "../../../assets/State=Selected.svg";
import heart from "../../../assets/Heartwithribbon.svg";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import Link from "next/link";

export default function WishList() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="p-1">
      <div className="flex items-center bg-gray-300 p-3 rounded mb-4">
        <Image src={heart} alt="wishlist" width={24} height={24} />
        <h2 className="ml-2 text-xl font-bold text-black">Wishlist</h2>
      </div>

      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-center">Your wishlist is empty</p>
      ) : (
        <div className="justify-center grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 xl:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-3">
          {wishlist.map((item) => (
            <div
              className="myComponent hover:bg-gradient-to-r from-[#F6CEEC] to-[#D939cd] p-[2px]  hover:rounded-2xl border border-[#eaecf0] rounded-xl"
              key={item.id}
            >
              <div className="relative m-0 p-0">
                <Image
                  src={Selected}
                  alt="selected"
                  className="absolute top-2 right-2 h-8 w-8 cursor-pointer"
                  height={10}
                  width={10}
                />
                <Image
                  src={item.image}
                  alt={item.name}
                  className="rounded-tl-md w-full rounded-tr-md object-contain h-40 mb-2"
                  height={300}
                  width={300}
                />
              </div>
              <div className="flex flex-col justify-end items-center self-stretch flex-grow-0 flex-shrink-0 h-[136px] gap-5 px-3">
                <div className="flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-1">
                  <div className="flex justify-center items-start self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden">
                    <p
                      className="line-clamp-2 text-black font-medium text-sm text-center"
                      style={{
                        lineHeight: "1.2",
                        maxHeight: "2.4em",
                        overflow: "hidden",
                      }}
                    >
                      {item.name}
                    </p>
                  </div>
                  <div className="flex justify-center items-start flex-grow-0 flex-shrink-0 relative">
                    <p className="flex-grow-0 flex-shrink-0 text-xl text-center text-[#870064]">
                      Kshs.
                    </p>
                    <p className="flex-grow-0 flex-shrink-0 text-xl font-semibold text-center text-[#870064]">
                      {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-end items-center self-stretch flex-grow-0 flex-shrink-0 gap-2">
                  <div className="flex justify-between items-center mt-2">
                    <button className="myBtn flex-grow-0 flex-shrink-0 text-sm font-medium text-center text-white">
                      <Link
                        href={`/products/${item.id}`}
                        className="myBtn flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2 px-3.5 py-2 rounded-lg bg-[#66004b] border border-[#66004b] rounded-full"
                      >
                        <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-center text-white">
                          View Product
                        </p>
                      </Link>
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
