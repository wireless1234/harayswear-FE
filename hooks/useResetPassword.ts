import apiClient from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";

interface ResetPasswordPayload {
  uidb64: string;
  token: string;
  password: string;
  confirmPassword: string;
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({ uidb64, token, password, confirmPassword }: ResetPasswordPayload) => {
      const response = await apiClient.post(`/auth/reset-password/${uidb64}/${token}`, {
        password,
        confirm_password: confirmPassword,
      });
      return response.data;
    },
  });
};
