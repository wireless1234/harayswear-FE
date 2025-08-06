import React from 'react'
import Newsletter from '@/components/newsletter/Newsletter'

const NewsletterPage = () => {
  return (
    <div>
      <div className="text-center py-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to the Vaperoo!</h1>
        <p className="text-lg text-gray-600 mb-8">Want early access to our VIP offers, sign up today!</p>
      </div>
      <Newsletter />
    </div>
  )
}

export default NewsletterPage