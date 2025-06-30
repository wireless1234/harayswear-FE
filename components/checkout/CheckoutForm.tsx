"use client";
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from "js-cookie";
import { createOrder, createPayment } from '@/services/orderService';
import { OrderData } from '@/types';
import { useAuth } from '@/hooks/useAuth';

interface CheckoutFormValues {
  email: string;
  phone: string;
  country: string;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  zip: string;
  terms: boolean;
  paymentMethod: string;
  cardNumber: string;
  billingAddress?: string;
  shippingAddress: string;
  comments?: string;
}

const CheckoutForm: React.FC = () => {
  const [useShippingAddress, setUseShippingAddress] = useState<boolean>(true);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState<boolean>(false);
  const { user } = useAuth();
  const isLoggedIn = !!user; // Check if user is logged in

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      console.log("Order created successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["cart",] });
      setIsPaymentProcessing(true);

      const paymentData = {
        amount: data.data.total_price * 100 * 0.6, // Convert to base currency unit, convert to AUD,
        currency_code: "USD",
        order_id: data.data.id,
        success_url: `https://javcorp.com.au/checkout/order-success?status=success&orderId=${data.data.id}`,
        cancel_url: `https://javcorp.com.au/checkout/order-success?status=canceled&orderId=${data.data.id}`,
        failure_url: `https://javcorp.com.au/checkout/order-success?status=failed&orderId=${data.data.id}`,
      };

      createPaymentMutation(paymentData);
    },
    onError: (error) => {
      // console.error("Order creation failed:", error);
      if (error instanceof Error) {
        const errorMessage =
          (error as { response?: { data?: { message?: string } } })?.response?.data
            ?.message || error.message;
      
        alert(`Failed to place order. Please try again. Error: ${errorMessage}`);
      } else {
        alert("Failed to place order. Please try again. Unknown error.");
      }
    },
  });

  const { mutate: createPaymentMutation } = useMutation({
    mutationFn: createPayment,
    onSuccess: (data) => {
      console.log("Payment created successfully:", data);
      // alert("Redirecting to payment page...");
      setIsPaymentProcessing(false);
      window.location.href = data.data.payment_url; // Redirect to payment URL
    },
    onError: (error) => {
      console.error("Payment creation failed:", error);
      alert("Failed to process payment. Please try again.");
      setIsPaymentProcessing(false);
    },
  });

  const initialValues: CheckoutFormValues = {
    email: '',
    phone: '',
    country: 'Australia',
    firstName: '',
    lastName: '',
    city: 'Yeppoon',
    state: 'Queensland',
    zip: '4703',
    terms: false,
    paymentMethod: 'ziina',
    cardNumber: '',
    shippingAddress: '',
    billingAddress: '',
    comments: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email')
      .when([], {
        is: () => !isLoggedIn,
        then: (schema) => schema.required('Required'),
      }),
    phone: Yup.string().when([], {
      is: () => !isLoggedIn,
      then: (schema) => schema.required('Required'),
    }),
    country: Yup.string().required('Required'),
    firstName: Yup.string().when([], {
      is: () => !isLoggedIn,
      then: (schema) => schema.required('Required'),
    }),
    lastName: Yup.string().when([], {
      is: () => !isLoggedIn,
      then: (schema) => schema.required('Required'),
    }),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    zip: Yup.string().required('Required'),
    terms: Yup.boolean().oneOf([true], 'You must accept the Terms and Conditions'),
    paymentMethod: Yup.string().required('Required'),
    billingAddress: Yup.string().when('useShippingAddress', {
      is: false,
      then: (schema) => schema.required('Required'),
    }),
  });

  const handleSubmit = (values: CheckoutFormValues) => {
    const session_key = Cookies.get("session_key");
    const isGuest = !Cookies.get("access_token");
  
    const orderData: OrderData = {
      payment_method: values.paymentMethod,
      shipping_address: values.shippingAddress || "Same as shipping",
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      city: values.city,
      state: values.state,
      zip_code: values.zip,
      country: values.country,
      phone_number: values.phone,
      billing_address: !useShippingAddress ? values.billingAddress : undefined,
      // card_last_four_digits: values.cardNumber.slice(-4),
      card_last_four_digits: "1234", // Placeholder for card number
      comments: values.comments,
    };
  
    mutate(isGuest ? { orderData, session_key } : { orderData });
  };

    // Function to format card number dynamically
    // const formatCardNumber = (value: string) => {
    //   return value
    //     .replace(/\D/g, "") // Remove non-numeric characters
    //     .replace(/(\d{4})/g, "$1 ") // Add space after every 4 digits
    //     .trim(); // Remove trailing space
    // };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {() => (
        <Form className="w-full p-8 rounded-lg text-black">
          {/* Contact Details */}
          {!isLoggedIn && (
            <>
              <h2 className="text-xl font-semibold mb-4">Contact</h2>
              <div className="mb-3">
                <label>Email address *</label>
                <Field type="email" name="email" placeholder="Enter email address" className="w-full border p-2 rounded-lg" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-3">
                <label>Phone Number *</label>
                <Field type="text" name="phone" placeholder="Enter enter phone number (preferably whatsapp)" className="w-full border p-2 rounded-lg" />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
              </div>
            </>
          )}

          {/* Delivery Address */}
          <h2 className="text-xl font-semibold mt-6 mb-4">Delivery</h2>
          <div className="grid grid-cols-2 gap-4 mb-3">
            {!isLoggedIn && (
              <>
                <div>
                  <label>First Name</label>
                  <Field type="text" name="firstName" className="w-full border p-2 rounded-lg" />
                  <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label>Last Name</label>
                  <Field type="text" name="lastName" className="w-full border p-2 rounded-lg" />
                  <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                </div>
              </>
            )}
          </div>
          <div className="mb-3">
            <label>Country/Region *</label>
            <Field as="select" name="country" className="w-full border p-2 rounded-lg">
              <option value="Australia">Australia</option>
              {/* <option value="USA">USA</option>
              <option value="UK">UK</option> */}
            </Field>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label>State</label>
              <Field type="text" name="state" disabled className="w-full border p-2 rounded-lg" />
              <ErrorMessage name="state" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label>City</label>
              <Field type="text" name="city" disabled className="w-full border p-2 rounded-lg" />
              <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label>ZIP Code</label>
              <Field type="text" name="zip" disabled className="w-full border p-2 rounded-lg" />
              <ErrorMessage name="zip" component="div" className="text-red-500 text-sm" />
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <Field type="checkbox" name="terms" className="rounded-lg" />
              <span>I have read and agree to the Terms and Conditions</span>
            </label>
            <ErrorMessage name="terms" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Payment */}
          <h2 className="text-xl font-semibold mt-6 mb-4">Payment</h2>
          <div className="mb-3">
            <label>Payment Method *</label>
            <Field as="select" name="paymentMethod" className="w-full border p-2 rounded-lg">
              {/* <option value="stripe">Stripe</option> */}
              <option value="ziina">Ziina</option>
              {/* <option value="Square">Square</option> */}
              {/* <option value="pay_at_counter">Pay At Counter</option> */}

            </Field>
            <ErrorMessage name="paymentMethod" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Shipping Address */}
          <div className="mb-3">
            <label>Street Address</label>
            <Field type="text" name="shippingAddress" className="w-full border p-2 rounded-lg" />
            <ErrorMessage name="shippingAddress" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Card Details */}
          {/* <div className="mb-3">
            <label>Debit Card</label>
            <Field
              type="text"
              name="cardNumber"
              placeholder="**** **** **** 4578"
              className="w-full border p-2 rounded-lg"
              value={values.cardNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFieldValue("cardNumber", formatCardNumber(e.target.value));
              }}
              maxLength={19}
            />
            <ErrorMessage name="cardNumber" component="div" className="text-red-500 text-sm" />
          </div> */}

          {/* Comments */}
          <div className="mb-3">
            <label>Comments</label>
            <Field
              as="textarea"
              name="comments"
              placeholder="Enter any special instructions or comments"
              className="w-full border p-2 rounded-lg"
              rows={4}
            />
            <ErrorMessage name="comments" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Billing Address */}
          <h2 className="text-xl font-semibold mt-6 mb-4">Billing Address</h2>
          <div className="mb-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className='rounded-lg'
                checked={useShippingAddress}
                onChange={() => setUseShippingAddress(!useShippingAddress)}
              />
              <span>Same as shipping address</span>
            </label>
          </div>
          {!useShippingAddress && (
            <div className="mb-3">
              <label>Billing Address</label>
              <Field type="text" name="billingAddress" className="w-full border p-2 rounded-lg" />
              <ErrorMessage name="billingAddress" component="div" className="text-red-500 text-sm" />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="text-xl w-1/3 border border-black py-4 mt-4 rounded-3xl mx-auto block cursor-pointer"
            disabled={isPending || isPaymentProcessing}
          >
            {isPending
              ? "Processing..."
              : isPaymentProcessing
              ? "Generating Payment Link..."
              : "Proceed to Checkout"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CheckoutForm;
