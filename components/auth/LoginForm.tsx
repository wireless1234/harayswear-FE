"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { CustomErrorResponse } from "@/types";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginForm() {
  const { login, loginError } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center md:min-h-screen w-full md:w-7/12 px-4 sm:px-6 lg:px-8">
      <div className="w-full md:w-2/3 mx-auto text-white">
        <h1 className="text-4xl sm:text-5xl font-bold text-white text-center mb-6">Log in</h1>
        <p className="text-center text-sm sm:text-base">Don&apos;t have an account? <Link href="/signup" className="text-blue-500">Sign Up</Link></p>

        <Formik
          initialValues={{ email: "", password: "", rememberMe: false }}
          validationSchema={Yup.object({
            email: Yup.string().required("Email is required"),
            password: Yup.string().min(6, "Must be at least 6 characters").required("Password is required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await login(values);
              router.push("/");
            } catch (error) {
              console.error("Login failed:", error);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-8 mt-8">
              {/* Error Message */}
              {loginError && (
                <div className="text-red-400 text-center mb-4">
                  {((loginError as AxiosError<CustomErrorResponse>).response?.data?.errors?.detail) || 
                    (loginError as AxiosError<CustomErrorResponse>).response?.data?.message || 
                    "An error occurred during login."}
                </div>
              )}
              {/* Emails */}
              <div>
                <label className="text-white block mb-1">Email</label>
                <Field
                  type="text"
                  name="email"
                  className="w-full p-3 rounded-md border border-[#DBDDE3] text-white focus:ring-2 focus:ring-[var(--color-purple)] outline-none"
                  placeholder="Enter your Email"
                />
                <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
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

              <div className="flex justify-between items-center">
                {/* Remember Me */}
                <div className="flex items-center">
                  <Field type="checkbox" name="rememberMe" className="mr-2" />
                  <label className="text-white">Remember Me</label>
                </div>
                
                {/* Forgot Password */}
                <div className="text-right">
                  <Link href="/forgot-password" className="text-blue-500">Forgot Password?</Link>
                </div>
              </div>



              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/2 block mx-auto bg-[var(--color-purple)] text-white font-semibold p-3 rounded-3xl hover:bg-purple-500 transition duration-200 cursor-pointer"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
