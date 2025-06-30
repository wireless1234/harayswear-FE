"use client";

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const PaymentProcessing = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    let redirectLink = searchParams.get('redirectlink');
    if (redirectLink) {
        // Ensure the redirectLink is an absolute URL
        if (!redirectLink.startsWith('http://') && !redirectLink.startsWith('https://')) {
          redirectLink = `https://${redirectLink}`;
        }
        window.location.href = redirectLink; // Redirect to the external link
    }
  }, [searchParams]);

  return (
    <div>Redirecting to Payment Provider Page....</div>
  );
};

export default PaymentProcessing;