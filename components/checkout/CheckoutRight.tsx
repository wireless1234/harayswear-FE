"use client";

import React from "react";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";
import { CartItem } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartItem, removeCartItem } from "@/services/cartService";
import { Trash2 } from "lucide-react";
import Cookies from "js-cookie";

const CheckoutRight = () => {
  const { cart } = useCart();
  const queryClient = useQueryClient();
  const sessionKey = Cookies.get("session_key");

  // Ensure cart is always an array
  const cartArray = Array.isArray(cart) ? cart : [];

  const total = cartArray.reduce(
    (acc, brand) =>
      acc + brand.items.reduce((sum: number, item: CartItem) => sum + item.total_price, 0),
    0
  );

  const tax = 0;
  const grandTotal = total + tax;

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

  return (
    <div className="bg-[linear-gradient(180deg,#131313_75%,#000000_95%)] lg:h-full pt-[6rem]">
      <h2
        style={{ fontFamily: "Neutro, sans-serif" }}
        className="text-[5rem] text-center py-8 bg-gradient-to-b from-white via-white to-black bg-clip-text text-transparent"
      >
        CART
      </h2>

      {/* Cart Items */}
      {cartArray.length > 0 ? (
        cartArray.map((brand) => (
          <section
            key={brand.brand.id}
            className="flex flex-col items-center border-2 py-4 border-black bg-[#00000033] shadow-lg w-10/12 mx-auto rounded-2xl mb-6"
          >
            <Image
              src={brand.brand.logo}
              alt={brand.brand.name}
              width={200}
              height={200}
              className="rounded-full"
            />
            <h3 className="text-white text-2xl font-semibold py-4">{brand.brand.name}</h3>
            <ul className="w-11/12 mx-auto">
              {brand.items.map((item: CartItem) => (
                <li
                  key={item.id}
                  className="w-full flex justify-between text-sm md:text-lg lg:text-xl font-semibold py-2"
                >
                  <span className="text-white w-2/5 text-sm md:text-base lg:text-lg">{item.product_name}</span>
                  <div className="w-1/5 flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.product_id, item.quantity - 1, item.id)}
                      className="text-white px-1 sm:px-2 md:px-2 lg:px-2 rounded-full border"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="text-[#FFFFFF] text-sm md:text-base lg:text-lg">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.product_id, item.quantity + 1, item.id)}
                      className="text-white px-1 sm:px-2 md:px-2 lg:px-2 rounded-full border"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-white w-1/5 text-sm md:text-base lg:text-lg">
                    ${item.total_price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-white flex items-center"
                  >
                    <Trash2 size={12} />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))
      ) : (
        <p className="text-white text-center text-lg py-4">Your cart is empty</p>
      )}

      {/* Total Section */}
      <section className="mt-8 w-10/12 mx-auto text-white">
        <div className="flex justify-between text-xl font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        {/* <div className="flex justify-between text-xl font-semibold">
          <span>Merchant Fee</span>
          <span>${tax.toFixed(2)}</span>
        </div> */}
        <div className="flex justify-between text-xl font-semibold">
          <span>Grand Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </section>
    </div>
  );
};

export default CheckoutRight;
