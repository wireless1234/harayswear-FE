"use client";

import React from 'react';
import ProductSelectionCard from "@/components/layout/ProductSelectionCard";
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from "@/services/productService";

const ProductSelection = ({ brandid, onAddToCartSuccess }: { brandid: number; onAddToCartSuccess?: () => void }) => {
  const queryKey = ['products', brandid];
  const queryFn = () => getAllProducts(undefined, brandid);
  const { data: products, isLoading, error } = useQuery({ queryKey, queryFn });

  if (error) return <div className="text-red-500">Error loading products</div>;

  return (
    <div className="w-full">
      <ProductSelectionCard
        isLoading={isLoading}
        products={products || []}
        onAddToCartSuccess={onAddToCartSuccess}
      />
    </div>
  );
};

export default ProductSelection;
