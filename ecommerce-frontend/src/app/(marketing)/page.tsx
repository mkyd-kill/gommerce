import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/footer/Footer";
import { fetchAllProducts } from "@/services/productAPI";
import banner from "../../assets/defaults/banner.svg";
import { Deals } from "@/components/homepage/Deals";

export default async function Home() {
  const products = await fetchAllProducts();

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
            width={600}
            height={400}
          />
        </div>
      </section>
      <section className="py-2">
        <Deals />
      </section>
      <Footer />
    </div>
  );
}
