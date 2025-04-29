"use client";
import CategoryCard from "@/components/homepage/CategoryCard";
import HotDeals from "@/components/homepage/HotDeals";
import FeaturedProduct from "@/components/homepage/FeaturedProduct";
import Trending from "@/components/homepage/Trending";

export default function Home() {
  return (
    <div
      className="container"
      style={{
        maxWidth: "1280px",
      }}
    >
      <CategoryCard />
      <HotDeals />
      <FeaturedProduct />
      <Trending />
    </div>
  );
}
