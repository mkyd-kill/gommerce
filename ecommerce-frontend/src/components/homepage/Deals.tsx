"use client";
import { ProductModel } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import SelectedState from "../../assets/State=Selected.svg";
import DefaultState from "../../assets/State=Default.svg";
import placeholder from "../../assets/defaults/placeholder.svg";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import imageURL from "@/lib/imageRoute";

interface Props {
  products: ProductModel[];
}

export const Deals = ({ products }: Props) => {
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="my-2">
      <div className="justify-center items-center grid 2xl:grid-cols-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 2xs:grid-cols-1 gap-3.5 my-2">
        {products.map((product, key) => (
          <div
            className="myComponent hover:bg-gradient-to-r from-[#F6CEEC] to-[#D939cd] p-[2px] hover:rounded-2xl border border-[#eaecf0] rounded-xl"
            key={key}
          >
            <div className="flex flex-col justify-between items-center flex-grow-0 flex-shrink-0 relative overflow-hidden pb-3 rounded-xl bg-white">
              <div className="self-stretch flex-grow-0 flex-shrink-0 h-60 relative overflow-hidden">
                <div className="relative m-0 p-0">
                  {isInWishlist(product.ID) ? (
                    <Image
                      src={SelectedState}
                      alt="Selected"
                      className="absolute top-2 right-2 h-8 w-8 cursor-pointer"
                      onClick={() => removeFromWishlist(product.ID)}
                    />
                  ) : (
                    <Image
                      src={DefaultState}
                      alt="Default"
                      className="absolute top-2 right-2 h-8 w-8 cursor-pointer"
                      onClick={() => addToWishlist(product)}
                    />
                  )}
                  <Link href={`products/${product.ID}`} target="_self" className="cursor-pointer">
                    <Image
                      src={`${imageURL}${product.Image}` || placeholder}
                      alt="Product"
                      width={288}
                      height={256}
                      loading="lazy"
                      className="rounded-tl-md w-full h-72 rounded-tr-md sm:h-60 object-cover"
                    />
                  </Link>
                </div>
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
                      {product.Name}
                    </p>
                  </div>
                  <div className="flex justify-center items-start flex-grow-0 flex-shrink-0 relative">
                    <p className="flex-grow-0 flex-shrink-0 text-xl text-center text-[#870064]">
                      Kshs.
                    </p>
                    <p className="flex-grow-0 flex-shrink-0 text-xl font-semibold text-center text-[#870064]">
                      {product.Price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  className="myBtn flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2 px-3.5 py-2 rounded-lg bg-[#66004b] border border-[#66004b] rounded-full cursor-pointer hover:opacity-80"
                  onClick={() => addToCart(product)}
                >
                  <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-center text-white">
                    Add to Cart
                  </p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
