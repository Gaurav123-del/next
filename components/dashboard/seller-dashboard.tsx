"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, TrendingUp, AlertTriangle, Truck } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export function SellerDashboard() {
  const router = useRouter();
  const user = MOCK_SELLER;

  const [inventory, setInventory] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setInventory(MOCK_INVENTORY);
      setOrders(MOCK_ORDERS);
      setLoading(false);
    }, 600);
  }, []);

  const lowStockItems = inventory.filter(i => i.min_order_quantity < 5);
  const totalSales = "₹45.2K";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-zinc-950 text-white">
      <div className="container mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">Welcome, {user.name}</h1>
          <p className="text-zinc-400">Manage inventory and orders</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Revenue" value={totalSales} icon={TrendingUp} />
          <StatCard title="Low Stock Items" value={lowStockItems.length} icon={AlertTriangle} />
          <StatCard title="Active Products" value={inventory.length} icon={Package} />
        </div>

        {/* Orders Table */}
        <Card className="bg-zinc-900 border-zinc-800">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Pending Orders</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono">#{order.id}</TableCell>
                    <TableCell>{order.product.name}</TableCell>
                    <TableCell className="text-emerald-400 font-bold">
                      ₹{order.total_amount}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-500"
                        onClick={() =>
                          setOrders(prev => prev.filter(o => o.id !== order.id))
                        }
                      >
                        <Truck className="w-4 h-4 mr-1" /> Mark Shipped
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {orders.length === 0 && (
              <div className="text-center py-10 text-zinc-500">
                No pending orders 🎉
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon }: any) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800"
    >
      <div className="flex justify-between items-center mb-2">
        <Icon className="text-purple-400" />
        <Badge variant="outline">{title}</Badge>
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </motion.div>
  );
}

const MOCK_SELLER = {
  id: "seller_101",
  name: "Rahul Wholesaler",
};

const MOCK_INVENTORY = [
  {
    id: "p1",
    name: "Smart Fitness Band",
    category: "Electronics",
    base_price: 1299,
    min_order_quantity: 3,
  },
  {
    id: "p2",
    name: "Cotton Bed Sheet",
    category: "Home & Kitchen",
    base_price: 899,
    min_order_quantity: 12,
  },
];

const MOCK_ORDERS = [
  {
    id: "ORD12345",
    product: { name: "Smart Fitness Band" },
    quantity: 20,
    total_amount: 25980,
    status: "payment_in_escrow",
  },
  {
    id: "ORD54321",
    product: { name: "Cotton Bed Sheet" },
    quantity: 10,
    total_amount: 8990,
    status: "payment_in_escrow",
  },
];
