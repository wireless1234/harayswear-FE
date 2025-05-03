"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginLogoutButton() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (user) {
      logout();
    } else {
      router.push("/login");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-white text-xl hover:text-gray-600 cursor-pointer"
    >
      {user ? "Logout" : "Login/Signup"}
    </button>
  );
}