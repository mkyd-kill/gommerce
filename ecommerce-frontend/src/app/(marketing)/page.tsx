"use client";
import HotDeals from "@/components/homepage/HotDeals";
import FeaturedProduct from "@/components/homepage/FeaturedProduct";
import Trending from "@/components/homepage/Trending";
import Brand from "@/components/homepage/Brand";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className="container">
      <HotDeals />
      <FeaturedProduct />
      <Brand />
      <Trending />
      <Footer />
    </div>
  );
}
