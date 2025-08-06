"use client";

import { useRouter } from "next/navigation";
import React from "react";
import CheckoutForm from "./CheckoutForm";
import { useAuth } from "@/hooks/useAuth";

const CheckoutLeft = () => {
  const { user, isLoading: isLoadingUser } = useAuth();
  const router = useRouter();
  
  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="pt-[8rem]">
      {/* Login Section */}
      
      { !user && !isLoadingUser && (
        <>
          <div className="flex flex-col items-center py-8 pl-4 pr-8 relative w-full">
            <h2 className="text-xl text-black font-semibold">Already Have An Account?</h2>
            <button
              onClick={handleLogin}
              className="border border-black text-xl font-semibold py-2 px-4 mt-4 rounded-lg cursor-pointer"
            >
              Log in/Sign Up
            </button>
          </div>

          <div className="relative w-10/12 mx-auto my-8">
            <hr className="border-t-2 border-black" />
            <span
              className="absolute top-1/2 left-1/2 bg-black px-4 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold"
            >
              OR
            </span>
          </div>
        </>
      )}

      {/* Checkout Form */}
      <CheckoutForm />
    </div>
  );
};

export default CheckoutLeft;
