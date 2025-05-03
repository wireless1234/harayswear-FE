"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { fetchOrderById } from '@/services/orderService';
import { Order, OrderItem } from '@/types';

const OrderComplete = () => {
    const session_key = Cookies.get('session_key');
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const status = searchParams.get('status');
    const router = useRouter();

    const { data: order, isLoading, isError } = useQuery<Order>({
        queryKey: ['order', orderId],
        queryFn: () => fetchOrderById(orderId!, session_key),
        enabled: !!orderId,
    });

    if (isLoading) return <p className="text-white">Loading...</p>;
    if (isError) return <p className="text-white">Failed to load order details.</p>;

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
                    <p className="text-white mt-2 text-lg font-semibold">Thank you for your Order</p>
                   {/*  <p className="text-white mt-2 text-md font-semibold">Please make your payment at the counter to collect your Items</p>*/}
                    
                </>;
    };

    return (
        <div className="flex flex-col items-center w-full px-2 md:px-0">
            {renderStatusMessage()}
            
            <p className="text-white mt-2">#Order-ID: {orderId}</p>
            {order && (
                <div className="text-white mt-4 bg-[#131313] shadow-2xl rounded-lg p-4 w-full md:w-1/3">
                    <ul>
                        {order.items.map((item: OrderItem) => (
                            <li key={item.id} className="flex items-center justify-between mb-4">
                                <Image
                                    src={`https://res.cloudinary.com/dti5ce0mx/${item.product.images}`}
                                    alt={item.product.name}
                                    width={50}
                                    height={50}
                                    className="rounded"
                                />
                                <div className="ml-4 flex-1">
                                    <p className="text-white font-semibold">{item.product.name}</p>
                                    <p className="text-white">X {item.quantity}</p>
                                </div>
                                <p className="text-gray-400 font-semibold">${item.price}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <button
                className="mt-4 px-4 py-2 bg-[var(--color-purple)] text-white font-semibold rounded-2xl w-1/5 cursor-pointer hover:bg-[var(--color-purple-dark)] transition duration-300"
                onClick={() => router.push('/')}
            >
                Go Home
            </button>
        </div>
    );
};

export default OrderComplete;
