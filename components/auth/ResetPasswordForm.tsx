"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useResetPassword } from "@/hooks/useResetPassword";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const uidb64 = searchParams.get("uid")!;
  const token = searchParams.get("token")!;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate, isPending, isError, error, isSuccess } = useResetPassword();

  return (
    <div className="flex items-center justify-center md:min-h-screen w-full md:w-7/12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-6">Reset Password</h1>
        <p className="text-center text-sm mb-6">Enter your new password below.</p>
          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={Yup.object({
              password: Yup.string().min(6, "At least 6 characters").required("Required"),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords must match")
                .required("Required"),
            })}
            onSubmit={(values) => {
              mutate({
                uidb64,
                token,
                password: values.password,
                confirmPassword: values.confirmPassword,
              });
            }}
          >
              <Form className="space-y-6">
                <div className="relative">
                  <label className="block mb-1">New Password</label>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full p-3 rounded-md border border-[#DBDDE3] text-white focus:ring-2 focus:ring-[var(--color-purple)]"
                    placeholder="Enter new password"
                  />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-10 cursor-pointer text-gray-500"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                  <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
                </div>

                <div className="relative">
                  <label className="block mb-1">Confirm Password</label>
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="w-full p-3 rounded-md border border-[#DBDDE3] text-white focus:ring-2 focus:ring-[var(--color-purple)]"
                    placeholder="Confirm new password"
                  />
                      <span
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-10 cursor-pointer text-gray-500"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-400 text-sm mt-1" />
                </div>

                {isError && (
                    <div className="text-red-400 text-sm mt-1">
                    {error instanceof Error && error.message ? error.message : "An error occurred. Please try again."}
                    </div>
                )}
                {isSuccess && (
                  <div className="text-green-400 text-sm mt-1">
                    ✅ Password reset successful. You can now log in with your new password.
                  </div>
                )}
                <div className="text-center text-sm mb-6">
                  <p>
                    Remembered your password?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">
                      Log in
                    </Link>
                  </p>
                </div>
                <div className="text-center text-sm mb-6">
                  <p>
                    By clicking &quot;Reset Password&quot;, you agree to our{" "}
                    <a href="/terms" className="text-blue-500 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-blue-500 hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-[var(--color-purple)] text-white font-semibold p-3 rounded-3xl hover:bg-purple-500 transition"
                >
                  {isPending ? "Submitting..." : "Reset Password"}
                </button>
              </Form>
          </Formik>
      </div>
    </div>
  );
}
