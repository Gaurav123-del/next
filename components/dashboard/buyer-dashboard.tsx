"use client";

import { useEffect, useState, memo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export function BuyerDashboard() {
  const router = useRouter();
  const user = MOCK_USER;

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate API delay
    setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    }, 600);
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="min-h-screen pb-20 dark:bg-zinc-950 bg-background relative">
      <div className="container mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
            Welcome back,{" "}
            <span className="text-blue-600 dark:text-blue-500">{user.name}</span>
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg">
            Find the best products for your shop.
          </p>
        </div>

        {/* Recommended */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="text-emerald-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  Recommended for You
                </h2>
                <p className="text-sm text-zinc-500">
                  High demand products
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              onClick={() => router.push("/marketplace")}
              className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            >
              View Marketplace <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <ScrollArea className="w-full whitespace-nowrap pb-4">
            <div className="flex gap-6 pb-4">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>
      </div>
    </div>
  );
}

const ProductCard = memo(function ProductCard({
  product,
  index,
}: {
  product: any;
  index: number;
}) {
  return (
    <motion.div
      className="inline-block w-[320px]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 p-6 shadow-sm">
        <Badge className="mb-3 bg-emerald-500 text-white">
          {product.demand_level} Demand
        </Badge>

        <h3 className="font-bold text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-zinc-500 mb-3">
          {product.description}
        </p>

        <div className="flex justify-between mb-4">
          <span className="font-semibold">₹{product.base_price}</span>
          <span className="text-emerald-500 font-bold">
            +{product.expected_margin}%
          </span>
        </div>

        <Button className="w-full">Add to Cart</Button>
      </div>
    </motion.div>
  );
});

function DashboardSkeleton() {
  return (
    <div className="min-h-screen p-10 space-y-10">
      <Skeleton className="h-12 w-64" />
      <div className="flex gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-80 w-80 rounded-3xl" />
        ))}
      </div>
    </div>
  );
}



const MOCK_USER = {
  name: "Amit Retailer",
};

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Smart Watch Pro",
    category: "Electronics",
    base_price: 1299,
    unit: "piece",
    min_order_quantity: 10,
    description: "Best-selling smartwatch with heart rate monitoring",
    expected_margin: 45,
    demand_level: "High",
    image_url: "",
  },
  {
    id: 2,
    name: "Cotton Double Bed Sheet",
    category: "Home & Kitchen",
    base_price: 899,
    unit: "piece",
    min_order_quantity: 10,
    description: "Premium cotton bedsheet set",
    expected_margin: 28,
    demand_level: "Medium",
    image_url: "",
  },
  {
    id: 3,
    name: "SS Water Bottle",
    category: "Electronics",
    base_price: 350,
    unit: "piece",
    min_order_quantity: 20,
    description: "Stainless steel insulated bottle",
    expected_margin: 20,
    demand_level: "High",
    image_url: "",
  },
];
