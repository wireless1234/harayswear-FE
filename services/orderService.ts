import { OrderData, PaymentData } from "@/types";
import apiClient from "@/lib/apiClient";

/**
 * Create a new order
 * @param orderData Order details
 */
export const createOrder = async ({orderData, session_key}: { orderData: OrderData; session_key?: string }) => {
  const response = await apiClient.post("/orders/orders/", {
      ...orderData,
      session_key,
    });
  return response.data;
};

/**
 * Fetch orders for authenticated user
 */
export const fetchUserOrders = async () => {
  const response = await apiClient.get("/orders/orders/");
  return response.data;
};

/**
 * Fetch a single order by ID
 * @param orderId Order ID
 */
export const fetchOrderById = async (orderId: string, session_key?: string) => {
  const headers = session_key ? { "Session-Key": session_key } : {};
  const response = await apiClient.get(`/orders/orders/${orderId}/`, { headers });
  return response.data.data;
};

/**
 * Cancel an order
 * @param orderId Order ID
 */
export const cancelOrder = async (orderId: string) => {
  const response = await apiClient.post(`/orders/orders/${orderId}/cancel/`);
  return response.data;
};

/**
 * Fetch order status
 * @param orderId Order ID
 */
export const fetchOrderStatus = async (orderId: string) => {
  const response = await apiClient.get(`/payments/payments/status/${orderId}/`);
  return response.data;
};

/**
 * Create a payment
 * @param paymentData Payment details
 */
export const createPayment = async (paymentData: PaymentData) => {
  const response = await apiClient.post("/payments/payments/create/", paymentData);
  return response.data;
};

/**
 * Fetch payment methods
 */
export const fetchPaymentMethods = async () => {
  const response = await apiClient.get(`/payments/payment-options/`);
  return response.data;
};