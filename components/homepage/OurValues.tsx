import Image from 'next/image'
import React from 'react'

const values = [
  {
    icon: '/icons/support.svg',
    title: '24/7 SUPPORT',
    description: 'Delivery under 2 hours...',
  },
  {
    icon: '/icons/secure.svg',
    title: 'SECURE PAYMENT',
    description: 'Delivery under 2 hours...',
  },
  {
    icon: '/icons/discreet.svg',  
    title: 'DISCREET DELIVERY',
    description: 'Delivery under 2 hours...',
  }
]

const OurValues = () => {
  return (
    <div className='w-full my-32 px-6 xl:px-[5.25rem] md:py-52'>
      <div className='max-w-[1440px] flex flex-col items-center justify-center  mx-auto'>
        <h2 style={{  fontFamily: 'Neutro Outline, sans-serif', fontStyle: 'normal'}} 
          className="text-3xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[117.69px] font-bold uppercase text-black text-center">
            Our Values

        </h2>
        <div className='mt-10 flex items-center justify-between w-[90%] lg:w-[80%] mx-auto '>
          {values.map((value, index) => (
            <div key={index} className='flex flex-col items-center justify-center'>
              <Image src={value.icon} alt={value.title} width={180.98} height={180.98} className='size-[54.63px] md:size-[180.98px]' />
              <div className='mt-6 text-white'>
                <p className='text-black text-sm md:text-2xl lg:text-3xl text-center'>{value.title}</p>
                <p className='text-black text-[5.74px] md:text-lg lg:text-[19px] mt-1 md:mt-3 text-center'>{value.description}</p>
              </div>
            </div>
          ))}
          
        </div>

      </div>

    </div>
  )
}

export default OurValues