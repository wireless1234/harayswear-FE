import React, { Suspense } from 'react';
import PaymentComplete from '@/components/checkout/PaymentComplete';

const PaymentSuccess = () => {
  return (
    <div>
        <div className="flex flex-col items-center justify-center min-h-screen pt-[6rem] w-full">
            <Suspense fallback={<div>Loading...</div>}>
                <PaymentComplete />
            </Suspense>
        </div>
    </div>
  )
}

export default PaymentSuccess