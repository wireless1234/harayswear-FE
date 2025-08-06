"use client";

import React, { useState } from "react";
import apiClient from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";
import { IoIosArrowForward } from "react-icons/io";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Newsletter = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validationSchema = Yup.object({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone_number: Yup.string().required('Phone number is required'),
  });

  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
  };

  const subscribeMutation = useMutation({
    mutationFn: async (data: {
      email: string;
      first_name: string;
      last_name: string;
      phone_number: string;
    }) => {
      const res = await apiClient.post("/newsletter/subscribe/", data);
      return res.data;
    },
    onSuccess: (data) => {
      setMessage(data.message || "Subscribed successfully.");
      setError("");
    },
    onError: (err: unknown) => {
      const error = err as { response?: { data?: { email?: string[]; first_name?: string[]; last_name?: string[]; phone_number?: string[] } } };
      if (error.response?.data?.email) {
        setError(error.response.data.email[0]);
      } else if (error.response?.data?.first_name) {
        setError(error.response.data.first_name[0]);
      } else if (error.response?.data?.last_name) {
        setError(error.response.data.last_name[0]);
      } else if (error.response?.data?.phone_number) {
        setError(error.response.data.phone_number[0]);
      } else {
        setError('Something went wrong.');
      }
      setMessage("");
    }
  });

  return (
    <div className="bg-white text-center py-12 px-4">
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              setError("");
              setMessage("");
              subscribeMutation.mutate(values, {
                onSuccess: () => {
                  resetForm();
                }
              });
            }}
          >
            {() => (
              <Form className="space-y-4">
                <div>
                  <Field
                    name="first_name"
                    type="text"
                    placeholder="First Name"
                    className="w-full border border-gray-400 px-4 py-3 text-base focus:outline-none"
                  />
                  <ErrorMessage name="first_name" component="div" className="text-red-600 text-sm mt-1 text-left" />
                </div>

                <div>
                  <Field
                    name="last_name"
                    type="text"
                    placeholder="Last Name"
                    className="w-full border border-gray-400 px-4 py-3 text-base focus:outline-none"
                  />
                  <ErrorMessage name="last_name" component="div" className="text-red-600 text-sm mt-1 text-left" />
                </div>

                <div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-400 px-4 py-3 text-base focus:outline-none"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1 text-left" />
                </div>

                <div>
                  <Field
                    name="phone_number"
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full border border-gray-400 px-4 py-3 text-base focus:outline-none"
                  />
                  <ErrorMessage name="phone_number" component="div" className="text-red-600 text-sm mt-1 text-left" />
                </div>

                <button
                  type="submit"
                  disabled={subscribeMutation.isPending}
                  className="w-full bg-black text-white px-4 py-3 text-base hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}
                  {!subscribeMutation.isPending && <IoIosArrowForward />}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default Newsletter;
