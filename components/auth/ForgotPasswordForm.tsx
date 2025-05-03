"use client";

import Link from "next/link";
import { useState } from "react";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ForgotPasswordForm = () => {
  const [emailSent, setEmailSent] = useState(false);
  const { mutateAsync, isPending, isError, error } = useForgotPassword();

  return (
    <div className="flex items-center justify-center md:min-h-screen w-full md:w-7/12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="w-full md:max-w-md mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6">Forgot Password</h1>
        <p className="text-center text-sm sm:text-base mb-8">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>

        {emailSent ? (
          <div className="text-center text-green-400">
            ✅ Check your inbox for a password reset link!
          </div>
        ) : (
          <Formik
            initialValues={{ email: "" }}
            validationSchema={Yup.object({
              email: Yup.string().email("Invalid email").required("Email is required"),
            })}
            onSubmit={async (values) => {
              try {
                await mutateAsync({ email: values.email });
                setEmailSent(true);
              } catch (error) {
                console.error("Error sending reset email:", error);
              }
            }}
          >
              <Form className="space-y-6">
                <div>
                  <label className="block mb-1 text-white">Email Address</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full p-3 rounded-md border border-[#DBDDE3] text-white focus:ring-2 focus:ring-[var(--color-purple)] outline-none"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
                </div>
                {isError && (
                  <div className="text-red-400 text-sm mt-2">
                    {error instanceof Error ? error.message : "Failed to send reset email."}
                  </div>
                )}

                <div className="text-center text-sm mb-6">
                  <p>
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-blue-500 hover:underline">
                      Sign up
                    </Link>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-[var(--color-purple)] text-white font-semibold p-3 rounded-3xl hover:bg-purple-500 transition duration-200"
                >
                  {isPending ? "Sending..." : "Send Reset Link"}
                </button>
              </Form>
          </Formik>
        )}

        <div className="text-center mt-6">
          <Link href="/login" className="text-blue-500">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
