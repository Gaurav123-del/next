"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

const MOCK_RETAILER = {
  business_name: "Gupta Electronics",
  location: "Delhi NCR",
};

export function RetailerView() {
  const user = MOCK_RETAILER;

  return (
    <div className="min-h-screen pb-20 bg-zinc-950 relative selection:bg-blue-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950" />
      </div>

      <div className="container mx-auto px-6 py-10 relative z-10">
        {/* Hero */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <Badge className="mb-6 bg-emerald-500/20 text-emerald-400 border-emerald-500/50 px-3 py-1">
              <Sparkles className="w-3 h-3 mr-2" />
              AI-Powered Insights
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Retail{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Intelligence.
              </span>
            </h1>

            <p className="text-zinc-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Welcome back, <span className="text-white font-medium">{user.business_name}</span>.
              Top-selling opportunities in <span className="text-white">{user.location}</span>.
            </p>

            {/* Search */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                <Input
                  placeholder="Ask AI or search products..."
                  className="pl-12 bg-black/40 border-white/5 text-white h-14 rounded-xl"
                />
                <Button className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500">
                  Search
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trending */}
        <section className="mb-16">
          <div className="flex justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <TrendingUp className="text-emerald-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Trending Near You</h2>
                <p className="text-sm text-zinc-500">High demand items</p>
              </div>
            </div>
            <Button variant="ghost" className="text-zinc-400 hover:text-white">
              View Analysis <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <ScrollArea className="w-full whitespace-nowrap pb-4">
            <div className="flex gap-6 pb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <ProductCard key={i} index={i} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>
      </div>
    </div>
  );
}

function ProductCard({ index }: { index: number }) {
  return (
    <motion.div
      className="inline-block w-[320px]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="rounded-3xl bg-zinc-900 border border-white/5 overflow-hidden p-6">
        <h3 className="text-white font-bold mb-2">Smart Watch Pro</h3>
        <p className="text-zinc-500 text-sm mb-4">High-selling wearable product</p>
        <Button className="w-full bg-white text-black">Add to Stock</Button>
      </div>
    </motion.div>
  );
}
