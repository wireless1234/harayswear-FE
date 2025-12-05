"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { getAllProducts } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";
import { Product, PaginatedResponse } from "@/types/product";

const Catalog = () => {
  const { data, isLoading, error } = useQuery<PaginatedResponse<Product>>({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });
  const [sortBy, setSortBy] = useState<string>("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);

  const filteredProducts = data?.results
    .filter((product) => {
      const matchesAvailability =
        availabilityFilter === "all" ||
        (availabilityFilter === "in" ? product.stock > 1 : product.stock <= 1);

      const matchesPrice =
        !priceRange ||
        (product.price >= priceRange[0] && product.price <= priceRange[1]);

      return matchesAvailability && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === "bestSelling") {
        return a.stock - b.stock; // Best selling = stock 0 → highest
      }
      return 0; // no sort if future options added
    });

  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">Products</h1>

      {/* Filter and Sort Controls */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex gap-4 text-sm text-gray-700">
          <div>
            <label className="mr-1 font-medium">Filter:</label>
            <select
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="all">Availability</option>
              <option value="in">In stock</option>
              <option value="out">Out of stock</option>
            </select>
          </div>
          <div>
            <select
              onChange={(e) => {
                const value = e.target.value;
                setPriceRange(
                  value === "all"
                    ? null
                    : (value.split("-").map(Number) as [number, number])
                );
              }}
              className="border rounded px-2 py-1"
            >
              <option value="all">Price</option>
              <option value="0-25">$0 - $25</option>
              <option value="25-50">$25 - $50</option>
              <option value="50-75">$50 - $75</option>
              <option value="75-100">$75 - $100</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-700">
          <label className="font-medium">Sort by:</label>
          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="all">All</option>
            <option value="bestSelling">Best selling</option>
          </select>
          <span>
            {data
              ? `${data.count} products`
              : isLoading
              ? "Loading..."
              : "0 products"}
          </span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts && filteredProducts.length === 0 && (
          <div className="col-span-4 text-center text-gray-500">
            No products found in this category.
          </div>
        )}
        {isLoading && (
          <div className="col-span-4 text-center text-gray-500">
            Loading products...
          </div>
        )}
        {error && (
          <div className="col-span-4 text-center text-red-500">
            Error loading products: {error.message}
          </div>
        )}
        {filteredProducts &&
          filteredProducts
            .slice()
            .reverse()
            .map((item, index) => (
              <Link href={`/view-item?productId=${item.id}`} key={index}>
                <div key={index} className="group">
                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg shadow-sm bg-gray-50">
                    <Image
                      fill
                      src={`https://res.cloudinary.com/dti5ce0mx/${item.images}`}
                      alt={item.name}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover object-center transition-transform group-hover:scale-105"
                      priority={index < 4} // prioritize first few images
                    />
                  </div>
                  <h3 className="mt-3 font-medium text-lg">{item.name}</h3>
                  <p className="text-gray-700">${item.price} USD</p>
                </div>
              </Link>
            ))}
      </div>
    </section>
  );
};

export default Catalog;
