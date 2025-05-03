import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include tokens
apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh token logic
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = Cookies.get("refresh_token");
      // If there's no refresh token, don't attempt to refresh
      if (!refresh) {
        console.warn("No refresh token found, logging out...");
        return Promise.reject(error);
      }
      console.log("Refreshing token...");
      try {
        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/token/refresh/`, {
          refresh
        });

        Cookies.set("access_token", data.access, { secure: true, httpOnly: false });
        originalRequest.headers.Authorization = `Bearer ${data.access}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
