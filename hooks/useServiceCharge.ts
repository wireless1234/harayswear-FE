import { useQuery } from "@tanstack/react-query";
import { getServiceChargeById, ServiceCharge } from "@/services/serviceChargeService";

export const useServiceCharge = (id: number = 1) => {
  const { data: serviceCharge, isLoading, error } = useQuery<ServiceCharge>({
    queryKey: ["serviceCharge", id],
    queryFn: () => getServiceChargeById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes - service charges don't change often
    gcTime: 10 * 60 * 1000, // 10 minutes (gcTime is the new name for cacheTime in v5)
  });

  return {
    serviceCharge,
    isLoading,
    error,
    serviceChargeAmount: serviceCharge?.amount || 0,
  };
};
