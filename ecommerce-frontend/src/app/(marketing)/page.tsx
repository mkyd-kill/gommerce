"use client";
import Link from "next/link";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className="container">
      <section>
        <div>
          <div>
            <h2>Welcome to Gommerce Ecommerce</h2>
            <p>Discover the latest products at the best prices</p>
            <button className="myBtn flex-grow-0 flex-shrink-0 text-sm font-medium text-center text-white">
              <Link
                href="/products"
                className="myBtn flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden gap-2 px-3.5 py-2 rounded-lg bg-[#66004b] border border-[#66004b]"
              >
                <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-center text-white">
                  Browse All Products
                </p>
              </Link>
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
