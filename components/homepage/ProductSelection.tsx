"use client";

import React from 'react';
import ProductSelectionCard from "@/components/layout/ProductSelectionCard";
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from "@/services/productService";

const ProductSelection = ({ categoryid, onAddToCartSuccess }: { categoryid: number; onAddToCartSuccess?: () => void }) => {
  const queryKey = ['products', categoryid];
  const queryFn = () => getAllProducts(categoryid, undefined);
  const { data: products, isLoading, error } = useQuery({ queryKey, queryFn });

  if (error) return <div className="text-red-500">Error loading products</div>;

  return (
    <div className="w-full absolute translate-x-1/2 right-1/2 z-30 ">
      <ProductSelectionCard
        isLoading={isLoading}
        products={products || []}
        onAddToCartSuccess={onAddToCartSuccess}
      />
    </div>
  );
};

export default ProductSelection;
