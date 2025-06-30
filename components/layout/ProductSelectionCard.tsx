"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { Product } from "@/types";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import Cookies from "js-cookie";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// import { v4 as uuidv4 } from "uuid";

interface Props {
  products: Product[];
  isLoading: boolean;
  onAddToCartSuccess?: () => void;
}

const ProductSelectionCard = ({ products, isLoading, onAddToCartSuccess }: Props) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  // Ensure sessionKey exists for guest users
  const guestSessionKey = Cookies.get("session_key");

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    if (products && products.length > 0) {
      setQuantities(products.reduce((acc, product) => ({ ...acc, [product.id]: 0 }), {}));
    }
    console.log("Products updated:", products);
  }, [products]);

  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const updateQuantity = (productId: number, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [productId]: Math.max(0, quantity) }));
  };

  const selectedItems = Object.entries(quantities)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => ({ productId: Number(id), quantity: qty }));

  const handleAddToCart = async () => {
    if (selectedItems.length === 0) return;
    setIsAddingToCart(true);
    try {
      await addToCart({ items: selectedItems, sessionKey: user ? undefined : guestSessionKey });
      if (onAddToCartSuccess) {
        onAddToCartSuccess();
      }
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleCheckout = async () => {
    if (selectedItems.length === 0) return;
    await addToCart({ items: selectedItems, sessionKey: user ? undefined : guestSessionKey });
    router.push("/checkout");
  };

  const total = useMemo(() => {
    return selectedItems.reduce((acc, item) => {
      const product = products.find((p) => p.id === item.productId);
      return acc + (product ? product.price * item.quantity : 0);
    }, 0);
  }, [selectedItems, products]);

  const tax = 0;
  const grandTotal = total + tax;

  return (
    <div className="border border-[#F5EE62] bg-white text-black text-lg md:text-xl p-4 md:p-8 rounded-[2rem] md:rounded-[4rem] shadow-md w-11/12 md:w-8/12 mx-auto font-semibold">
      <div className="hidden md:flex items-center justify-around">
        <span className="font-semibold text-sm md:text-base">Flavor</span>
        <span className="font-semibold text-sm md:text-base">Unit Price</span>
        <span className="font-semibold text-sm md:text-base">Qty</span>
      </div>
      <hr className="my-4 md:my-8 mx-4 md:mx-8 border-t border-t-[#F5EE62]" />

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} height={40} width="100%" />
          ))}
        </div>
      ) : (
        products.map((product) => (
          <div key={product.id} className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-8 mb-2 md:mb-4 pb-2 md:pb-4">
            <span className="w-full md:w-1/2 text-center md:text-left text-sm md:text-base">{product.name}</span>
            <span className="w-full md:w-1/4 text-center text-sm md:text-base">${product.price.toFixed(2)}</span>
            <div className="w-full md:w-1/4 flex items-center justify-between p-1 md:p-2 border border-[#F5EE62] rounded-lg md:rounded-xl">
              <button
                type="button"
                className="px-1 md:px-2 cursor-pointer"
                onClick={() => updateQuantity(product.id, quantities[product.id] - 1)}
              >
                -
              </button>
              <span className="text-sm md:text-base">{quantities[product.id] || 0}</span>
              <button
                type="button"
                className="px-1 md:px-2 cursor-pointer"
                onClick={() => updateQuantity(product.id, quantities[product.id] + 1)}
              >
                +
              </button>
            </div>
          </div>
        ))
      )}

      <hr className="my-4 md:my-8 mx-4 md:mx-8 border-t border-t-[#F5EE62]" />

      {/* Totals Section */}
      <div className="mt-4 mx-4 md:mx-8">
        <p className="flex justify-between text-xs md:text-sm">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </p>
        {/* <p className="flex justify-between text-xs md:text-sm">
          <span>Merchant Fee <span className="text-[#FFFFFF80]">@ 3%</span></span>
          <span>${tax.toFixed(2)}</span>
        </p> */}
        <p className="font-bold flex justify-between text-xs md:text-sm"> 
          <span>Grand Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-col md:flex-row justify-between gap-2 md:gap-4">
        <button onClick={handleCheckout} className="border text-[#F5EE62] border-[#F5EE62] px-6 py-2 md:px-8 md:py-3 rounded-2xl md:rounded-4xl cursor-pointer text-sm md:text-base">
          Continue to Checkout
        </button>
        <button
          onClick={handleAddToCart}
          className="bg-[#F5EE62] text-black px-6 py-2 md:px-8 md:py-3 rounded-2xl md:rounded-4xl cursor-pointer text-sm md:text-base"
          disabled={isAddingToCart}
        >
          {isAddingToCart ? "Adding..." : <><ShoppingCart className="inline" /> Add to Cart | {grandTotal.toFixed(2)}</>}
        </button>
      </div>
    </div>
  );
};

export default ProductSelectionCard;
