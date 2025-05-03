import Image from 'next/image'
import React from 'react'
import GetInTouchForm from '@/components/aboutus/GetInTouchForm'

const page = () => {
  const ourValues = [
    { src: "/images/premium.png", title: "Premium Selection", text: "We source the best vapes and smokes from trusted brands." },
    { src: "/images/ageverified.png", title: "Age-Verified Sales", text: "We source the best vapes and smokes from trusted brands." },
    { src: "/images/secured.png", title: "Secure Payments & Fast Delivery", text: "We source the best vapes and smokes from trusted brands." },
  ]
  return (
    <div>
      {/* Header Section */}
      <section className='bg-[url("/images/headervector.png")] bg-cover bg-center flex flex-col md:flex-row items-center justify-center pt-[10rem] md:pt-[5rem]'>
        <div className='px-4 md:px-0'>
          <h1 style={{ fontFamily: 'Neutro, sans-serif'}}  className='text-5xl text-white font-bold'>ABOUT US</h1>
          <p className='text-white text-lg mt-4 max-w-2xl'>
            At Uncle V, we are dedicated to providing high-quality vape and smoke products for enthusiasts who value premium flavors, smooth experiences, and top-tier brands. Our carefully curated collection includes e-liquids, disposable vapes, smoking accessories, and more.
          </p>
        </div>
       
        <div className='mt-8'>
          <Image src='/images/aboutus.png' alt='about us' width={500} height={500} className='rounded-full' />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className='py-12'>
        <h2 style={{ fontFamily: 'Neutro, sans-serif'}}  className='text-4xl text-white text-center font-bold'>WHY CHOOSE US</h2>
        <div className='flex flex-col md:flex-row items-center justify-center mt-8 gap-4'>
          {ourValues.map((value, index) => (
            <div key={index} className="flex flex-col mx-4 bg-[#FFFFFF0D] rounded-xl shadow-lg p-6 h-full min-h-[18rem] justify-between">
            <Image className="mx-auto" src={value.src} alt={value.title} width={100} height={100} />
            <h4 className="text-white text-lg mt-2 text-start font-semibold">{value.title}</h4>
            <p className="text-white opacity-70 text-start max-w-3/5">{value.text}</p>
          </div>
          ))}
        </div>
      </section>

      {/* Get In Touch Section */}
      <section className='py-12'>
        <h2
            style={{ fontFamily: "Neutro, sans-serif" }}
            className="text-4xl text-white text-center font-bold mb-4"
        >
            GET IN TOUCH
        </h2>
        <p className='text-white opacity-70 text-center mb-8'>Have questions or need assistance? Reach out to us and we&apos;ll attend to you right away!</p>
        <GetInTouchForm />
      </section>
    </div>
  )
}

export default page