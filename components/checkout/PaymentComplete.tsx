"use client";

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import React from 'react';

const PaymentComplete = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const status = searchParams.get('status');

    const renderStatusMessage = () => {
        if (status === 'failed') {
            return <p className="text-red-500 mt-2 text-lg font-semibold">Order Failed</p>;
        }
        if (status === 'canceled') {
            return <p className="text-yellow-500 mt-2 text-lg font-semibold">Order Canceled</p>;
        }
        return <>
                    <Image
                        src="/images/ordersuccess.png"
                        alt="Order Status"
                        width={200}
                        height={200}
                    />
                    <p className="text-black mt-2 text-lg font-semibold">Thank you for your Purchase</p>
                    {/* <p className="text-white mt-2 text-md font-semibold">Please make your payment at the counter to collect your Items</p> */}
                    
                </>;
    };

    return (
        <div className="flex flex-col items-center w-full px-2 md:px-0">
            {renderStatusMessage()}
            
            <p className="text-black mt-2">#Order-ID: {orderId}</p>
        </div>
    );
};

export default PaymentComplete;
