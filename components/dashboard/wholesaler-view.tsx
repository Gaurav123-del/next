"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Package,
  TrendingUp,
  Users,
  DollarSign,
  Search,
  Filter,
  MoreHorizontal,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const MOCK_WHOLESALER = {
  business_name: "Vicky Collection",
  trust_score: 568,
};

export function WholesalerView() {
  return (
    <div className="min-h-screen pb-20 bg-zinc-950 relative overflow-hidden">

      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]" />
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[100px]" />

      {/* Hero */}
      <section className="pt-20 pb-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Badge className="mb-6 bg-zinc-900/50 text-zinc-300 border-zinc-800 px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
            Live for all retailers in India
          </Badge>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Trade Smarter. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            Grow Faster.
          </span>
        </h1>

        <p className="text-zinc-400 max-w-2xl mx-auto text-lg mb-10">
          Welcome back,{" "}
          <span className="text-white font-semibold">
            {MOCK_WHOLESALER.business_name}
          </span>
          . Manage inventory, trust, and orders in one place.
        </p>

        <div className="flex justify-center gap-4">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-5 h-5 mr-2" />
            Add New Product
          </Button>
          <Button size="lg" variant="outline" className="border-zinc-700 text-white">
            View Marketplace
          </Button>
        </div>
      </section>

      {/* Stats */}
      <div className="container mx-auto px-6 mb-12">
        <div className="grid md:grid-cols-4 gap-6">
          <StatsCard title="Total Revenue" value="₹12.5L" trend="+12%" icon={DollarSign} />
          <StatsCard title="Active Orders" value="24" trend="8 Pending" icon={Package} />
          <StatsCard
            title="Trust Score"
            value={MOCK_WHOLESALER.trust_score}
            trend="Top 5%"
            icon={TrendingUp}
          />
          <StatsCard title="Retailer Connections" value="156" trend="+3 this week" icon={Users} />
        </div>
      </div>

      {/* Inventory */}
      <div className="container mx-auto px-6 pb-12">
        <div className="flex justify-between mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Package className="text-purple-400" />
            Inventory Management
          </h2>

          <div className="flex gap-3">
            <div className="relative w-72">
              <Search className="absolute left-3 top-3.5 text-zinc-500 w-4 h-4" />
              <Input
                placeholder="Search products..."
                className="pl-10 bg-zinc-900 border-zinc-800 text-zinc-300"
              />
            </div>
            <Button variant="outline" className="border-zinc-800 text-zinc-300">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3].map(i => (
                <TableRow key={i}>
                  <TableCell className="text-white font-medium">
                    Premium Cotton Shirt
                  </TableCell>
                  <TableCell className="text-zinc-400">Apparel</TableCell>
                  <TableCell className="text-emerald-400">1,200 units</TableCell>
                  <TableCell className="text-white">₹450/pc</TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-500/10 text-emerald-400">
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, value, trend, icon: Icon }: any) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 h-32">
      <CardHeader className="flex flex-row justify-between p-5 pb-0">
        <CardTitle className="text-sm text-zinc-500">{title}</CardTitle>
        <Icon className="w-4 h-4 text-zinc-600" />
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <div className="text-2xl font-bold text-white">{value}</div>
        <p className="text-xs text-zinc-500">{trend}</p>
      </CardContent>
    </Card>
  );
}

