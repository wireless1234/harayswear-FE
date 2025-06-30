"use client";

import React, { useState } from "react";
import apiClient from "@/lib/apiClient";
import { IoIosArrowForward } from "react-icons/io";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubscribe = async () => {
    if (!email) return setError("Email is required.");
    setSubmitting(true);
    setMessage("");
    setError("");

    try {
      const res = await apiClient.post("/newsletter/subscribe/", { email });
      setMessage(res.data.message || "Subscribed successfully.");
      setEmail("");
    } catch (err) {
      const error = err as { response?: { data?: { email?: string[] } } };
      if (error.response?.data?.email) {
        setError(error.response.data.email[0]);
      } else {
        setError('Something went wrong.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-center py-12 px-4">
      <h2 className="text-xl md:text-2xl font-medium mb-6">Subscribe to our emails</h2>

      <div className="flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-400 px-4 py-3 text-base focus:outline-none"
          />
          <button
            onClick={handleSubscribe}
            disabled={submitting}
            className="absolute right-0 top-0 h-full px-4 text-lg flex items-center justify-center hover:bg-gray-100 transition"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default Newsletter;
