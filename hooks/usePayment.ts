import { useQuery } from "@tanstack/react-query";
import { fetchPaymentMethods } from "@/services/orderService";
import { PaymentMethod } from "@/types";

// Hook for fetching payment methods
export const usePaymentMethods = () => {
  const { data: paymentMethods, isLoading, error } = useQuery<PaymentMethod[]>({
    queryKey: ["paymentMethods"],
    queryFn: fetchPaymentMethods,
  });

  return {
    paymentMethods,
    isLoading,
    error,
  };
}