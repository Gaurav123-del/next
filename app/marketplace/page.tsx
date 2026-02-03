'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Filter, ShieldCheck, Star } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/marketplace/product-cart";

/* ---------------- MOCK PRODUCTS ---------------- */

const MOCK_PRODUCTS = Array.from({ length: 80 }).map((_, i) => ({
  id: i + 1,
  name: `Wholesale Product ${i + 1}`,
  category: [
    'Grains',
    'Pulses',
    'Spices',
    'Electronics',
    'Home & Kitchen',
    'Fashion'
  ][i % 6],
  base_price: 300 + (i % 10) * 200,
  min_order_quantity: [20, 50, 120, 250][i % 4],
  description: 'Premium quality wholesale product',
}));

/* ---------------- MARKETPLACE CONTENT ---------------- */

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  // Filters
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [minRating, setMinRating] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [moqFilter, setMoqFilter] = useState<string | null>(null);

  // Pagination
  const ITEMS_PER_PAGE = 24;
  const [page, setPage] = useState(0);

  const categories = ['all', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))];

  const filteredProducts = MOCK_PRODUCTS.filter(p => {
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesPrice = p.base_price >= priceRange[0] && p.base_price <= priceRange[1];
    const matchesRating = 4.5 >= minRating;

    let matchesMoq = true;
    if (moqFilter === 'low') matchesMoq = p.min_order_quantity < 50;
    if (moqFilter === 'medium') matchesMoq = p.min_order_quantity >= 50 && p.min_order_quantity <= 200;
    if (moqFilter === 'high') matchesMoq = p.min_order_quantity > 200;

    return matchesCategory && matchesPrice && matchesRating && matchesMoq;
  });

  const paginatedProducts = filteredProducts.slice(
    0,
    (page + 1) * ITEMS_PER_PAGE
  );

  const hasMore = paginatedProducts.length < filteredProducts.length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">

      {/* Top Result Bar */}
      <div className="sticky top-0 z-30 bg-white/90 dark:bg-[#0a0a0a]/90 border-b border-zinc-200 dark:border-white/5 backdrop-blur">
        <div className="container mx-auto px-4 py-3 text-sm text-zinc-500">
          <b className="text-zinc-900 dark:text-white">{filteredProducts.length}</b>{' '}
          results for{' '}
          <span className="text-blue-600 font-bold">
            {categoryFilter === 'all' ? 'All Products' : categoryFilter}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex gap-8">

        {/* Sidebar */}
        <aside className="hidden md:block w-64 space-y-8">

          {/* Category */}
          <div>
            <h3 className="font-bold mb-3">Department</h3>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`block text-sm mb-1 ${
                  categoryFilter === cat
                    ? 'text-blue-600 font-bold'
                    : 'text-zinc-500'
                }`}
              >
                {cat === 'all' ? 'Any Department' : cat}
              </button>
            ))}
          </div>

          {/* Price */}
          <div>
            <h3 className="font-bold mb-3">Price</h3>
            
            <div className="flex justify-between text-xs mt-2 text-zinc-500">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}+</span>
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="font-bold mb-3">Avg. Customer Review</h3>
            {[4, 3, 2, 1].map(stars => (
              <div
                key={stars}
                onClick={() => setMinRating(stars)}
                className="flex items-center gap-2 cursor-pointer mb-2"
              >
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < stars ? "currentColor" : "none"}
                    className={i < stars ? "text-yellow-500" : "text-zinc-300"}
                  />
                ))}
                <span className="text-xs">& Up</span>
              </div>
            ))}
          </div>

          {/* MOQ */}
          <div>
            <h3 className="font-bold mb-3">Minimum Order Qty</h3>
            {['low', 'medium', 'high'].map(type => (
              <div key={type} className="flex items-center gap-2 mb-2">
                <Checkbox
                  checked={moqFilter === type}
                  onCheckedChange={(c) => setMoqFilter(c ? type : null)}
                />
                <span className="text-sm">
                  {type === 'low' ? '< 50 units' : type === 'medium' ? '50 - 200 units' : '> 200 units'}
                </span>
              </div>
            ))}
          </div>

          {/* Supplier */}
          <div className="flex items-center gap-2">
            <Checkbox
              checked={verifiedOnly}
              onCheckedChange={(c) => setVerifiedOnly(!!c)}
            />
            <span className="text-sm flex items-center gap-1">
              Verified Supplier <ShieldCheck size={14} />
            </span>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={() => console.log('Add to cart', product.id)}
                getCategoryEmoji={getCategoryEmoji}
              />
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center mt-12">
              <Button
                variant="outline"
                onClick={() => setPage(p => p + 1)}
              >
                Load More Products
              </Button>
            </div>
          )}

          {/* Empty */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-24">
              <Filter className="mx-auto mb-4 text-zinc-400" />
              <h3 className="font-bold mb-2">No products found</h3>
              <Button
                variant="outline"
                onClick={() => {
                  setCategoryFilter('all');
                  setPriceRange([0, 5000]);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- PAGE ---------------- */

export default function MarketplacePage() {
  return (
    <Suspense fallback={<MarketplaceSkeleton />}>
      <MarketplaceContent />
    </Suspense>
  );
}

/* ---------------- SKELETON ---------------- */

function MarketplaceSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-52 w-full rounded-2xl" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- UTIL ---------------- */

function getCategoryEmoji(category: string): string {
  const emojiMap: Record<string, string> = {
    'Grains': '🌾',
    'Pulses': '🫘',
    'Spices': '🌶️',
    'Electronics': '⌚',
    'Home & Kitchen': '🏠',
    'Fashion': '👕',
  };
  return emojiMap[category] || '📦';
}
