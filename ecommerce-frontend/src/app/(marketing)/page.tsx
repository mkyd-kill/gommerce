"use client";
import CategoryCard from "@/components/homepage/CategoryCard";
import HotDeals from "@/components/homepage/HotDeals";
import FeaturedProduct from "@/components/homepage/FeaturedProduct";
import Trending from "@/components/homepage/Trending";
import Brand from "@/components/homepage/Brand";

export default function Home() {
  return (
    <div className="container">
      <CategoryCard />
      <HotDeals />
      <FeaturedProduct />
      <Brand />
      <Trending />
    </div>
  );
}
