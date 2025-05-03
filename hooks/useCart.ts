import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCart, addToCart, clearCart } from "@/services/cartService";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { Cart } from "@/types";
import { useAuth } from "./useAuth";

// Hook for managing cart state
export const useCart = () => {
  const { user, isLoading: isUserLoading } = useAuth();
  const queryClient = useQueryClient();
  let sessionKey = Cookies.get("session_key");

  // Ensure sessionKey exists
  if (!sessionKey && !isUserLoading && !user) {
    sessionKey = uuidv4(); // Generate UUID if missing
    console.log("user", user)
    console.log("Generated new session key for guest user usecart");
    Cookies.set("session_key", sessionKey as string, { expires: 7 }); // Store for 7 days
  }

  // Fetch Cart Items
  const { data: cart, isLoading, error } = useQuery<Cart>({
    queryKey: ["cart", sessionKey],
    queryFn: () => fetchCart(sessionKey),
  });

  // Add to Cart Mutation
  const addToCartMutation = useMutation({
    mutationFn: ({ items, sessionKey }: { items: { productId: number; quantity: number }[]; sessionKey?: string }) =>
      addToCart({ items, sessionKey: sessionKey || Cookies.get("session_key") }), // Ensure sessionKey is used
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", sessionKey] });
    },
  });

  // Clear Cart Mutation
  const clearCartMutation = useMutation({
    mutationFn: () => clearCart(sessionKey),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", sessionKey] });
    },
  });

  return {
    cart,
    isLoading,
    error,
    addToCart: addToCartMutation.mutateAsync, // Use mutateAsync to return a Promise
    clearCart: clearCartMutation.mutate,
    sessionKey,
  };
};
