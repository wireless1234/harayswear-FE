import apiClient from "./apiClient";
import Cookies from "js-cookie";

// Login function
export const login = async (credentials: { email: string; password: string }) => {
  const sessionKey = Cookies.get("session_key");
  if (sessionKey) {
    apiClient.defaults.headers.common["Session-Key"] = sessionKey;
  }
  const { data } = await apiClient.post("/auth/login/", credentials);

  // Store tokens in cookies
  Cookies.set("access_token", data.access, { secure: true, httpOnly: false });
  Cookies.set("refresh_token", data.refresh, { secure: true, httpOnly: false });
  Cookies.remove("session_key");

  return data;
};

// Fetch user
export const fetchUser = async () => {
  const accessToken = Cookies.get("access_token");
  if (!accessToken) {
    console.warn("No access token found.");
    return null;
  }
  const { data } = await apiClient.get("/auth/profile/");
  return data;
};

// Logout
export const logout = async () => {
  try {
    const refreshToken = Cookies.get("refresh_token");

    if (!refreshToken) {
      console.warn("No refresh token found.");
      return;
    }
    // console.log("Logging out...");

    // Send request to backend to blacklist refresh token
    await apiClient.post("/auth/logout/", { refresh: refreshToken });

    // Remove tokens from cookies
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

// Signup function
export const signup = async (credentials: {
  fullName: string;
  email: string;
  dateOfBirth: string;
  phoneNumber: string;
  password: string;
}) => {
  try {
    const { data } = await apiClient.post("/auth/register/", {
      full_name: credentials.fullName,  // Ensure field names match your backend
      email: credentials.email,
      date_of_birth: credentials.dateOfBirth,
      phone_number: credentials.phoneNumber,
      password: credentials.password,
    });
    return data;
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
};

interface ActivateEmailPayload {
  uidb64: string;
  token: string;
}

// Activate email function
export const activateEmail = async ({ uidb64, token }: ActivateEmailPayload) => {
  try {
    const { data } = await apiClient.get(`/auth/auth/activate/${uidb64}/${token}`);
    return data;
  } catch (error) {
    console.error("Email activation failed:", error);
    throw error;
  }
};


