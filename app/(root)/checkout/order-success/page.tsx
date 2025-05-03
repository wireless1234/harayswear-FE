import React, { Suspense } from 'react'
import OrderComplete from '@/components/checkout/OrderComplete';

const OrderSuccess = () => {
  return (
    <div>
        <div className="flex flex-col items-center justify-center min-h-screen pt-[6rem] w-full">
            <Suspense fallback={<div>Loading...</div>}>
                <OrderComplete />
            </Suspense>
        </div>
    </div>
  )
}

export default OrderSuccess