import apiClient from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";

export const useForgotPassword = () => {
    return useMutation({
      mutationFn: async (data: { email: string }) => {
        const res = await apiClient.post(`/auth/forgot-password/`, data);
        return res.data;
      },
    });
  };