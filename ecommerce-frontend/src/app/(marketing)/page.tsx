import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/footer/Footer";
import { FetchAllProducts } from "@/services/productAPI";
import banner from "../../assets/defaults/banner.svg";
import { Deals } from "@/components/homepage/Deals";
import feature from "../../assets/Clipboard.svg";

export default async function Home() {
  const products = await FetchAllProducts();

  return (
    <div className="container">
      <section className="rounded-xl bg-gray-100 py-6 sm:py-12">
        <div className="mx-auto grid grid-cols-2 items-center justify-items-center gap-8 px-8 sm:px-16">
          <div className="max-w-md space-y-4">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Welcome to Gommerce Ecommerce
            </h2>
            <p className="text-gray-600">
              Discover the latest products at the best prices
            </p>
            <button className="myBtn flex-grow-0 flex-shrink-0 text-sm font-medium text-center text-white">
              <Link
                href="/products"
                className="myBtn flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2 px-3.5 py-2 rounded-lg bg-[#66004b] border border-[#66004b] rounded-full"
              >
                <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-center text-white">
                  Browse All Products
                </p>
              </Link>
            </button>
          </div>
          <Image
            className="rounded-xl object-cover"
            alt="Banner Image"
            src={banner}
            width={400}
            height={600}
          />
        </div>
      </section>
      <section className="py-3 my-2">
        <div className="px-2 flex">
          <Image alt="Feature Products" src={feature} />
          <p className="text-xl font-semibold text-black">Featured Products</p>
        </div>
        <Deals products={products} />
      </section>
      <Footer />
    </div>
  );
}
