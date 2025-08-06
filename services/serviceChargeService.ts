import apiClient from "@/lib/apiClient";

export interface ServiceCharge {
  id: number;
  name: string;
  charge_type: string;
  amount: number;
  currency: string;
  description: string;
  minimum_order_amount: number | null;
  maximum_charge_amount: number | null;
  calculated_charge: number | null;
}

// Get service charge by ID
export const getServiceChargeById = async (id: number): Promise<ServiceCharge> => {
  const { data } = await apiClient.get(`/payments/service-charges/${id}/`);
  return data;
};

// Get all service charges (if needed in the future)
export const getAllServiceCharges = async (): Promise<ServiceCharge[]> => {
  const { data } = await apiClient.get("/payments/service-charges/");
  return data;
};
