import apiClient from "@/lib/apiClient";
import { Cart } from "@/types";

// Fetch cart items
export const fetchCart = async (sessionKey?: string): Promise<Cart> => {
  const config = sessionKey ? { params: { session_key: sessionKey } } : {};
  const { data } = await apiClient.get("/orders/cart/", config);
  return data.data;
};

// Add item to cart
export const addToCart = async ({ items, sessionKey }: { items: { productId: number; quantity: number }[]; sessionKey?: string }) => {
  const payload: any = {
    items: items.map(({ productId, quantity }) => ({
      product_id: productId,
      quantity,
    })),
  };

  if (sessionKey) {
    payload.session_key = sessionKey;
  }

  await apiClient.post("/orders/cart/", payload);
};

// Clear cart
export const clearCart = async (sessionKey?: string) => {
  const payload: { session_key?: string } = {}
  if (sessionKey) {
    payload.session_key = sessionKey;
  }
  await apiClient.post("/orders/cart/clear/", payload);
};

// update cart item
export const updateCartItem = async (product_id: number, quantity: number, cartItemId: number, sessionKey?: string) => {
  const payload: { product_id: number; quantity: number } = {
    product_id: product_id,
    quantity,
  };

  const config = sessionKey ? { params: { session_key: sessionKey } } : {};
  await apiClient.patch(`/orders/cart/${cartItemId}/`, payload, config);
};

// Remove item from cart
export const removeCartItem = async (cartItemId: number, sessionKey?: string) => {
  const config = {
    params: {
      ...(sessionKey && { session_key: sessionKey }),
    },
  };
  await apiClient.delete(`/orders/cart/${cartItemId}/`, config);
}
