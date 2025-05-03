import React from 'react'
import CheckoutLeft from './CheckoutLeft'
import CheckoutRight from './CheckoutRight'

const CheckoutContent = () => {
  return (
    <div className='w-full flex flex-col-reverse md:flex-row'>
      <section className='w-full md:w-3/5'>
        <CheckoutLeft />
      </section>
      <section className='w-full md:w-2/5'>
        <CheckoutRight />
      </section>
    </div>
  )
}

export default CheckoutContent