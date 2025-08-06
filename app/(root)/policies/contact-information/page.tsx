import React from 'react'

const ContactInformationPage = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Contact Information</h1>
        <p>If you have any questions or need assistance, please reach out to us at:</p>
        <ul className="list-disc pl-5 mt-2">
            <li>Email: <a href="mailto:info@vaperoo.com.au" className="text-blue-600 hover:underline">info@vaperoo.com.au</a></li>
        </ul>
    </div>
  )
}

export default ContactInformationPage