"use client"

import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image";
import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { getProductById } from "@/services/productService"
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

const ViewItem = () => {
  const [quantity, setQuantity] = useState(1)
  const handleIncrease = () => setQuantity(q => q + 1)
  const handleDecrease = () => setQuantity(q => (q > 1 ? q - 1 : 1))
  const { addToCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId ? Number(productId) : 0),
    enabled: !!productId,
  });

  // Ensure sessionKey exists for guest users
  const guestSessionKey = Cookies.get("session_key");

  const handleAddToCart = async () => {
    if (!product) return;
    await addToCart({
      items: [{ productId: product.id, quantity }],
      sessionKey: user ? undefined : guestSessionKey,
    });
    // Optionally, show a success message or redirect
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !product) return <div>Product not found.</div>;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
      {/* Product Image */}
      <Image
        width={500}
        height={500}
        src={'https://res.cloudinary.com/dti5ce0mx/'+product.images}
        alt={product.name}
        className="w-full h-auto rounded-lg object-cover shadow"
      />

      {/* Product Details */}
      <div>
        <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">{product.brand?.name || "My Store"}</p>
        <h1 className="text-4xl font-semibold mb-4">{product.name}</h1>
        <p className="text-xl mb-1">${product.price} AUD</p>
        <p className="text-sm text-gray-600 mb-6">
          <a href="#" className="underline">Shipping</a> calculated at checkout.
        </p>

        {/* Quantity */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <div className="inline-flex border rounded">
            <button onClick={handleDecrease} className="px-3 py-1 text-lg">−</button>
            <div className="px-4 py-1 text-lg">{quantity}</div>
            <button onClick={handleIncrease} className="px-3 py-1 text-lg">+</button>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2 mb-6">
          <button
            className="w-full border border-black py-3 text-sm font-medium hover:bg-gray-100"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          <button
            className="w-full bg-black text-white py-3 text-sm font-medium hover:bg-gray-800"
            onClick={() => {
              handleAddToCart();
              router.push("/checkout");
            }}
          >
            Buy it now
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4">No description available.</p>

        {/* Share */}
        <button className="text-sm text-gray-600 flex items-center gap-2 hover:underline">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12v-1a7 7 0 0114 0v1m0 0a7 7 0 01-14 0v-1m14 0l4 4m0 0l-4 4m4-4H10" />
          </svg>
          Share
        </button>
      </div>
    </section>
  )
}

export default ViewItem
