import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { login, fetchUser, logout } from "@/lib/authApi";

export const useAuth = () => {
  const queryClient = useQueryClient();

  // Fetch user
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false, // Don't retry if unauthenticated
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return {
    user,
    isLoading,
    login: loginMutation.mutateAsync,
    loginError: loginMutation.error,
    logout: logoutMutation.mutate,
  };
};
