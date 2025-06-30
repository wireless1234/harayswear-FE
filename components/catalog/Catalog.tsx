"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import React from "react"
import { getAllProducts } from "@/services/productService"
import { useQuery } from "@tanstack/react-query"

const Catalog = () => {
  const searchParams = useSearchParams()
  const category = searchParams.get("categoryId")
  const categoryName = searchParams.get("categoryName")
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", category],
    queryFn: () => getAllProducts(category ? Number(category) : undefined),
  })
  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">{categoryName}</h1>
      <p className="text-gray-600 mb-8">
        This approach allows for more variety in a single meal and encourages a shared experience
      </p>

      {/* Filter and Sort Controls */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex gap-4 text-sm text-gray-700">
          <div>
            <label className="mr-1 font-medium">Filter:</label>
            <select className="border rounded px-2 py-1">
              <option>Availability</option>
            </select>
          </div>
          <div>
            <select className="border rounded px-2 py-1">
              <option>Price</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-700">
          <label className="font-medium">Sort by:</label>
          <select className="border rounded px-2 py-1">
            <option>Best selling</option>
          </select>
          <span>12 products</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        { data && data.length === 0 && (
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
        {data && data.map((item, index) => (
          <Link href={`/view-item?productId=${item.id}`} key={index}>
            <div key={index} className="group">
              <Image
                width={500}
                height={500}
                src={'https://res.cloudinary.com/dti5ce0mx/'+item.images}
                alt={item.name}
                className="w-full h-60 object-cover rounded-lg shadow-sm transition-transform group-hover:scale-105"
              />
              <h3 className="mt-3 font-medium text-lg">{item.name}</h3>
              <p className="text-gray-700">${item.price} AUD</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Catalog
