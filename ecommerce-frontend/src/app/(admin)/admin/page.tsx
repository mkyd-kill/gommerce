"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAdminStats } from "@/services/adminAPI";

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    products: 0,
    users: 0,
    // orders: 0,
    // revenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getAdminStats();
        console.log("Metric:", res);
        setMetrics(res);
      } catch {
        toast.error("Failed to load metrics");
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Products" value={metrics.products} />
        <MetricCard title="Users" value={metrics.users} />
        {/* <MetricCard title="Orders" value={metrics.orders} />
        <MetricCard title="Total Revenue" value={`Kshs. ${metrics.revenue.toLocaleString()}`} /> */}
      </div>
    </div>
  );
}

function MetricCard({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="bg-white border rounded shadow-sm p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}