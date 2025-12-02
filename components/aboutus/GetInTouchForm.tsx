"use client";

import React from 'react'
import { Formik } from 'formik'

const GetInTouchForm = () => {
  return (
    <div>
        <Formik
            initialValues={{ name: '', email: '', message: '' }}
            onSubmit={(values) => {
            // Handle form submission
            console.log(values);
            }}
        >
            {({ handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto text-white px-4">
                <div className='flex flex-col md:flex-row items-center justify-between mb-4 w-full space-y-4 md:space-y-0 md:space-x-4'>
                    <div className="w-full md:w-1/2">
                        <label htmlFor="name" className="block mb-1 text-sm font-medium text-black">Your Name</label>
                        <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-black">Your Email Address</label>
                        <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Your Email Address"
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="message" className="block mb-1 text-sm font-medium text-black">Message</label>
                    <textarea
                    id="message"
                    name="message"
                    placeholder="Give us a detailed description about your questions, concern or needed assistance."
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded"
                    rows={6}
                    ></textarea>
                </div>
                <button type="submit" className="bg-black text-white p-3 w-full md:w-1/3 block mx-auto rounded-3xl mt-4">
                Send
                </button>
            </form>
            )}
        </Formik>
    </div>
  )
}

export default GetInTouchForm