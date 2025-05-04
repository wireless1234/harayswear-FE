"use client";

import React, { useState } from 'react'
import apiClient from '@/lib/apiClient';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubscribe = async () => {
    setSubmitting(true);
    setMessage('');
    setError('');

    try {
      const res = await apiClient.post('/newsletter/subscribe/', { email });
      setMessage(res.data.message);
      setEmail('');
    } catch (err) {
      const error = err as { response?: { data?: { email?: string[] } } };
      if (error.response?.data?.email) {
        setError(error.response.data.email[0]);
      } else {
        setError('Something went wrong.');
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className='bg-[url("/images/newsletter-bg.png")] md:h-screen overflow-x-hidden bg-no-repeat bg-center px-6 py-20 md:p-24 bg-cover'>
      <div className='max-w-[1440px] flex h-full flex-col mx-auto'>
        <h2 style={{  fontFamily: 'Neutro Outline, sans-serif', fontStyle: 'normal'}} 
          className="text-3xl md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-[117.69px] font-bold uppercase text-black text-center">
            Newsletter

        </h2>
        <p className='text-center mt-4 text-black font-semibold text-sm md:text-[19px] font-sans'>Delivery under 2 hours...</p>
        <div className="flex-grow hidden md:block"></div>
        <div className="flex items-center mx-auto py-1 md:p-4 rounded-full md:flex-1 w-full max-w-3xl mt-2.5 md:mt-0">
          <input
            type="email"
            placeholder="you@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="md:flex-1 md:placeholder:text-center text-base md:text-[19px] h-fit bg-white text-gray-400 py-[9.5px] px-2 lg:px-6 lg:py-3 font-medium rounded-[10px] outline-none"
          />
          <button
            onClick={handleSubscribe}
            disabled={submitting}
            className="ml-2 md:ml-4 md:px-8 md:py-3 py-[9.5px] text-base md:text-[18px] px-4 text-white bg-black border border-purple-500 rounded-full font-bold hover:bg-purple-500 transition">
            {submitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>

        {message && <p className="text-green-400 text-center mt-3 font-medium">{message}</p>}
        {error && <p className="text-red-400 text-center mt-3 font-medium">{error}</p>}
      </div>
    </div>
  )
}

export default Newsletter