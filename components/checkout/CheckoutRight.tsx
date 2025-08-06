"use client";

import React from "react";
import { useCart } from "@/hooks/useCart";
import { useServiceCharge } from "@/hooks/useServiceCharge";
import { CartItem } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartItem, removeCartItem } from "@/services/cartService";
import { Trash2 } from "lucide-react";
import Cookies from "js-cookie";


const CheckoutRight = () => {
  const { cart } = useCart();
  const { serviceChargeAmount, isLoading: serviceChargeLoading } = useServiceCharge();
  const queryClient = useQueryClient();
  const sessionKey = Cookies.get("session_key");

  // Ensure cart is always an array
  const cartArray = Array.isArray(cart) ? cart : [];

  const total = cartArray.reduce(
    (acc, brand) =>
      acc + brand.items.reduce((sum: number, item: CartItem) => sum + item.total_price, 0),
    0
  );

  const serviceCharge = serviceChargeAmount;
  const tax = 0;
  const grandTotal = total + serviceCharge + tax;

  const updateQuantityMutation = useMutation({
    mutationFn: ({ product_id, quantity, cartItemId }: { product_id: number; quantity: number; cartItemId: number }) =>
      updateCartItem(product_id, quantity, cartItemId, sessionKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // Revalidate the cart query key
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: ({ cartItemId }: { cartItemId: number }) =>
      removeCartItem(cartItemId, sessionKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // Revalidate the cart query key
    },
  });

  const handleUpdateQuantity = (product_id: number, quantity: number, cartItemId: number) => {
    updateQuantityMutation.mutate({ product_id, quantity, cartItemId });
  };

  const handleRemoveItem = (cartItemId: number) => {
    removeItemMutation.mutate({ cartItemId });
  };

  // Flatten all items from all brands into a single array
  const allItems: CartItem[] = cartArray.flatMap((brand) => brand.items);

  return (
    <div className="lg:h-full pt-[6rem]">
      <h2 className="text-2xl font-semibold text-center mb-4">Your Cart</h2>
      {/* Cart Items */}
      {allItems.length > 0 ? (
        <ul className="w-10/12 mx-auto">
          {allItems.map((item: CartItem) => (
            <li
              key={item.id}
              className="w-full flex justify-between text-sm md:text-lg lg:text-xl font-semibold py-2 border-b border-gray-700"
            >
              <span className="w-2/5 text-sm md:text-base lg:text-lg">{item.product_name}</span>
              <div className="w-1/5 flex items-center gap-2">
                <button
                  onClick={() => handleUpdateQuantity(item.product_id, item.quantity - 1, item.id)}
                  className="px-1 sm:px-2 md:px-2 lg:px-2 rounded-full border"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="text-sm md:text-base lg:text-lg">{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.product_id, item.quantity + 1, item.id)}
                  className="px-1 sm:px-2 md:px-2 lg:px-2 rounded-full border"
                >
                  +
                </button>
              </div>
              <span className="tw-1/5 text-sm md:text-base lg:text-lg">
                ${item.total_price.toFixed(2)}
              </span>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="flex items-center"
              >
                <Trash2 size={12} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-lg py-4">Your cart is empty</p>
      )}

      {/* Total Section */}
      <section className="mt-8 w-10/12 mx-auto">
        <div className="flex justify-between text-xl font-semibold">
          <span>Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl font-semibold">
          <span>Service Charge</span>
          <span>
            {serviceChargeLoading ? (
              <span className="text-gray-400">Loading...</span>
            ) : (
              `$${serviceCharge.toFixed(2)}`
            )}
          </span>
        </div>
        {/* <div className="flex justify-between text-xl font-semibold">
          <span>Merchant Fee</span>
          <span>${tax.toFixed(2)}</span>
        </div> */}
        <div className="flex justify-between text-xl font-semibold border-t pt-2">
          <span>Grand Total</span>
          <span>
            {serviceChargeLoading ? (
              <span className="text-gray-400">Loading...</span>
            ) : (
              `$${grandTotal.toFixed(2)}`
            )}
          </span>
        </div>
      </section>
    </div>
  );
};

export default CheckoutRight;
