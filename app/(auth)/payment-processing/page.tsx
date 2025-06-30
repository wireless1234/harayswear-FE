import React, { Suspense } from 'react'
import PaymentProcessing from '@/components/checkout/PaymentProcessing'

const PaymentProcessingPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <PaymentProcessing />
    </Suspense>
  )
}

export default PaymentProcessingPage