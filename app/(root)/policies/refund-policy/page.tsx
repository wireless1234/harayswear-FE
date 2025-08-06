import React from 'react'

const RefundPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>

      <div className="prose prose-lg max-w-none space-y-8">
        <div>
          <p className="mb-4">
            We have a 2-day return policy, which means you have 2 days after receiving your item to request a return.
          </p>
          
          <p className="mb-4">
            To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You&apos;ll also need the receipt or proof of purchase.
          </p>
          
          <p className="mb-4">
            To start a return, you can contact us at <a href="mailto:info@vaperoo.com.au" className="text-blue-600 hover:underline">info@vaperoo.com.au</a>.
          </p>
          
          <p className="mb-4">
            If your return is accepted, we&apos;ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.
          </p>
          
          <p className="mb-6">
            You can always contact us for any return question at <a href="mailto:info@vaperoo.com.au" className="text-blue-600 hover:underline">info@vaperoo.com.au</a>.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Damages and Issues</h2>
          <p className="mb-6">
            Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Exceptions / Non-Returnable Items</h2>
          <p className="mb-4">
            Certain types of items cannot be returned, like:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Perishable goods (such as food, flowers, or plants)</li>
            <li>Custom products (such as special orders or personalized items)</li>
            <li>Personal care goods (such as beauty products)</li>
            <li>Hazardous materials, flammable liquids, or gases</li>
          </ul>
          <p className="mb-4">
            Please get in touch if you have questions or concerns about your specific item.
          </p>
          <p className="mb-6">
            Unfortunately, we cannot accept returns on sale items or gift cards.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Exchanges</h2>
          <p className="mb-6">
            The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Refunds</h2>
          <p className="mb-4">
            We will notify you once we&apos;ve received and inspected your return, and let you know if the refund was approved or not. If approved, you&apos;ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.
          </p>
          <p className="mb-6">
            If more than 15 business days have passed since we&apos;ve approved your return, please contact us at <a href="mailto:info@vaperoo.com.au" className="text-blue-600 hover:underline">info@vaperoo.com.au</a>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default RefundPolicyPage