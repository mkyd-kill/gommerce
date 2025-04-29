"use client";
import CategoryCard from "@/components/homepage/CategoryCard";
import HotDeals from "@/components/homepage/HotDeals";

export default function Home() {
    return (
        <div className="container">
            <CategoryCard />
            <HotDeals />
        </div>
    )
}
