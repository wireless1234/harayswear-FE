import React from 'react'

const ShippingInformationPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Shipping Information</h1>

      <div className="prose prose-lg max-w-none space-y-8">
        <div>
          <p className="mb-6 text-lg text-gray-700">
            At Vaperoo, we strive to process and deliver your orders efficiently, while keeping you informed every step of the way. Below are the details of our shipping process and policies.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Processing and Dispatch Times</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Orders are processed within 2 business days of payment confirmation.</li>
            <li>Once processed, orders are dropped off to Australia Post within the next business day.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Delivery Details</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-lg font-medium text-blue-900">
              Express postage - $20 for all states
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Important Information</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Delivery times are estimated and based on Australia Post&apos;s service from NSW to your location.</li>
            <li>Once an order is handed over to Australia Post, delivery times are subject to their network, and we cannot be held responsible for delays caused by external factors (e.g., weather, public holidays, or high demand periods).</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Tracking Your Order</h2>
          <p className="mb-6">
            You will receive tracking details via email once your order has been dispatched. These allow you to monitor your delivery directly through Australia Post.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Handling Out-of-Stock Items</h2>
          <p className="mb-4">
            While we work hard to maintain accurate stock levels, there may be rare instances where an item in your order is temporarily out of stock. In such cases:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>We will dispatch the available items in your order within the regular dispatch timeframe to avoid delays.</li>
            <li>The missing item(s) will be shipped to you separately as soon as they arrive, at no additional shipping cost to you.</li>
          </ul>
          <p className="mb-6">
            Our goal is to ensure you receive as much of your order as quickly as possible, while minimising any inconvenience caused by stock shortages.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Express Shipping Delivery Estimates</h2>
          <p className="mb-4">After dispatch, delivery times depend on your location:</p>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    State/Territory
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                    Estimated Delivery Time (Business Days)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">New South Wales (NSW)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2-3 days</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Victoria (VIC)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2-3 days</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Queensland (QLD)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2-3 days</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">South Australia (SA)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2-3 days</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Western Australia (WA)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2-3 days</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tasmania (TAS)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2-3 days</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Northern Territory (NT)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2-3 days</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Australian Capital Territory (ACT)</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2-3 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Please Note</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800">
              <strong>Important:</strong> It is the customer&apos;s responsibility to make sure the address information provided is accurate, including City, State, and Postcode to prevent any error or further delays in shipping.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-lg text-gray-700 mb-2">
            Didn&apos;t find what you are looking for?
          </p>
          <p className="text-lg">
            Contact us at <a href="mailto:info@vaperoo.com.au" className="text-blue-600 hover:underline font-medium">info@vaperoo.com.au</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ShippingInformationPage