"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { signup } from "@/lib/authApi";
import { CustomErrorResponse } from "@/types/error";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUpForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const mutation = useMutation({
    mutationFn: (values: {
      fullName: string;
      email: string;
      dateOfBirth: string;
      phoneNumber: string;
      password: string;
      address: string;
    }) => signup(values),
  });

  return (
    <div className="flex items-center justify-center md:min-h-screen w-full md:w-7/12 px-4 sm:px-6 lg:px-8">
      <div className="w-full md:w-2/3 mx-auto text-white">
        <h1 className="text-4xl sm:text-5xl font-bold text-white text-center mb-6">Sign Up</h1>
        <p className="text-center text-sm sm:text-base">Already have an account? <Link href="/login" className="text-blue-500">Log In</Link></p>
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            dateOfBirth: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            address: "",
            acceptTerms: false,
          }}
          validationSchema={Yup.object({
            fullName: Yup.string().required("Full name is required"),
            email: Yup.string().email("Invalid email address").required("Email is required"),
            dateOfBirth: Yup.date().required("Date of birth is required"),
            phoneNumber: Yup.string().matches(/^\d+$/, "Must be a valid phone number").required("Phone number is required"),
            password: Yup.string()
              .min(8, "Must be at least 8 characters")
              .matches(/^(?!\d+$).*/, "Password cannot be entirely numeric")
              .required("Password is required"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password")], "Passwords must match")
              .required("Confirm password is required"),
            address: Yup.string().required("Address is required"),
            acceptTerms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            mutation.mutate(
              {
                fullName: values.fullName,
                email: values.email,
                dateOfBirth: values.dateOfBirth,
                phoneNumber: values.phoneNumber,
                password: values.password,
                address: values.address,
              },
              {
                onSuccess: (data) => {
                  console.log("Signup successful:", data);
                  toast.success("Signup successful! Cheeck your mail for activation link.");
                  setSubmitting(false);
                  // Redirect to the home page or any other page
                  setTimeout(() => {
                    router.push("/");
                  }, 2000);
                },
                onError: (error) => {
                  console.error("Signup failed:", error);
                  const axiosError = error as AxiosError<CustomErrorResponse>;

                  const errorResponse = axiosError.response?.data;
                
                  if (errorResponse?.errors) {
                    Object.entries(errorResponse.errors).forEach(([field, messages]) => {
                      messages.forEach((msg) => {
                        toast.error(`${field}: ${msg}`);
                      });
                    });
                  } else if (errorResponse?.message) {
                    toast.error(errorResponse.message);
                  } else {
                    toast.error("Something went wrong. Please try again.");
                  }
                  setSubmitting(false);
                },
              }
            );
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-8 mt-8">
              {/* Full Name */}
              <div>
                <label className="text-white block mb-1">Full Name</label>
                <Field
                  type="text"
                  name="fullName"
                  className="w-full p-3 rounded-md border border-[#DBDDE3] text-white focus:ring-2 focus:ring-[var(--color-purple)] outline-none"
                  placeholder="Enter your full name"
                />
                <ErrorMessage name="fullName" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              {/* Email */}
              <div>
                <label className="text-white block mb-1">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full p-3 rounded-md border border-[#DBDDE3] text-white focus:ring-2 focus:ring-[var(--color-purple)] outline-none"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              {/* Date of Birth and Phone Number */}
              <div className="flex space-x-4">
                {/* Date of Birth */}
                <div className="w-1/2">
                  <label className="text-white block mb-1">Date of Birth</label>
                  <Field
                    type="date"
                    name="dateOfBirth"
                    className="w-full p-3 rounded-md border border-[#DBDDE3] text-white focus:ring-2 focus:ring-[var(--color-purple)] outline-none"
                  />
                  <ErrorMessage name="dateOfBirth" component="div" className="text-red-400 text-sm mt-1" />
                </div>

                {/* Phone Number */}
                <div className="w-1/2">
                  <label className="text-white block mb-1">Phone Number</label>
                  <Field
                    type="text"
                    name="phoneNumber"
                    className="w-full p-3 rounded-md border border-[#DBDDE3] text-white focus:ring-2 focus:ring-[var(--color-purple)] outline-none"
                    placeholder="Enter your phone number"
                  />
                  <ErrorMessage name="phoneNumber" component="div" className="text-red-400 text-sm mt-1" />
                </div>
              </div>
              
              {/* Address */}
              <div>
                <label className="text-white block mb-1">Address</label>
                <Field
                  type="text"
                  name="address"
                  className="w-full p-3 rounded-md border border-[#DBDDE3] text-white focus:ring-2 focus:ring-[var(--color-purple)] outline-none"
                  placeholder="Enter your address"
                />
                <ErrorMessage name="address" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="text-white block mb-1">Password</label>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full p-3 rounded-md border border-[#DBDDE3] text-white focus:ring-2 focus:ring-[var(--color-purple)] outline-none"
                  placeholder="Enter your password"
                />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-10 cursor-pointer text-gray-500"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label className="text-white block mb-1">Confirm Password</label>
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="w-full p-3 rounded-md border border-[#DBDDE3] text-white focus:ring-2 focus:ring-[var(--color-purple)] outline-none"
                  placeholder="Confirm your password"
                />
                    <span
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-10 cursor-pointer text-gray-500"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                <ErrorMessage name="confirmPassword" component="div" className="text-red-400 text-sm mt-1" />
              </div>

              {/* Accept Terms */}
              <div className="flex items-center">
                <Field type="checkbox" name="acceptTerms" className="mr-2" />
                <label className="text-white">I hereby accept the terms and conditions of Javcorp</label>
                <ErrorMessage name="acceptTerms" component="div" className="text-red-400 text-sm ml-2" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/2 block mx-auto bg-[var(--color-purple)] text-white font-semibold p-3 rounded-3xl hover:bg-purple-500 transition duration-200 cursor-pointer"
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpForm;