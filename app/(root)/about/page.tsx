import Image from 'next/image'
import React from 'react'
import GetInTouchForm from '@/components/aboutus/GetInTouchForm';

const page = () => {
   const ourValues = [
    { title: "We specialize in:", text: [{head: "Abayas", body: "classic, embellished, and modern cuts"}, {head: "Jallabiyas", body: "luxurious and everyday styles"},{head: "Bridal & Occasion Wear", body: "elegant modestwear for celebrations"}] },
    { title: "We prioritize:", text: [{head: "Quality", body: "we use premium quality materials"}, {head: "Etihics", body: "Ethical sourcing and craftsmanship"},{head: "Variety", body: "Versatility for daily wear and special events"}] },
    { title: "Our values:", text: [{head: "Elegance", body: "We design garments that embody grace and timeless beauty"}, {head: "Honesty", body: "Transparent practices and quality you can trust"},{head: "Excellence", body: "Premium craftsmanship in every detail"}] },
    ]
  return (
    <div>
      {/* Header Section */}
      <section className='bg-[url("/images/headervector.png")] bg-cover bg-center flex flex-col md:flex-row items-center justify-center pt-[10rem] md:pt-[5rem]'>
        <div className='px-4 md:px-0'>
          <h1 style={{ fontFamily: 'Neutro, sans-serif'}}  className='text-3xl text-white font-bold'>Elegant. Modest. Timeless.</h1>
          <p className='text-white text-lg mt-4 max-w-2xl'>
            Welcome to Hayrays Wears, your go-to destination for premium Abayas and Jallabiyas — where modesty meets modern elegance.
            We are proudly dedicated to bringing the finest Arabic women&apos;s clothing to your doorstep. With deep roots in Middle Eastern culture and a global outlook, Hayrays Wears is on a mission to redefine modest fashion for today&apos;s confident and style-conscious woman.
          </p>
        </div>
       
        <div className='mt-8'>
          <Image src='/images/aboutus.png' alt='about us' width={500} height={500} className='rounded-full' />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id='who-we-are' className='py-12 px-6 flex flex-col mx-auto max-w-[1440px] xl:flex-row justify-between items-center flex-col'>
        <div className='max-w-2xl'>
          <h2
              style={{ fontFamily: "Neutro, sans-serif" }}
              className="text-4xl text-left text-black text-center font-bold mb-4"
          >
              WHO WE ARE
          </h2>
          <p>
            Hayrays Wears is an online modest fashion brand focused on offering authentic, high-quality Arabic clothing to women around the world.
            
          </p>
          <p className='mt-2'> 
            We serve a community of women who value style, tradition, and comfort, delivering curated collections that reflect both cultural pride and modern sophistication.
          </p>
          <p className='mt-2'> 
            We aim to 3 a global modest fashion leader, connecting tradition with innovation.
            We&apos;re focused on offering stylish Arabic clothing that reflects authenticity, grace, and strength — building a fashion hub that women trust.
          </p>

          
        </div>
        <Image
          src="/images/pink.webp"
          alt="food"
          width={400}
          height={400}
          layout='responsive'
          className='w-full h-auto max-w-[800px] rounded-2xl mt-8 xl:mt-0 md:ml-8 '
        />
       
      </section>


      {/* Why Choose Us Section */}
      <section id='our-promise' className='py-12 max-w-[1440px] mx-auto'>
        <h2 style={{ fontFamily: 'Neutro, sans-serif'}}  className='text-4xl text-black text-center font-bold'>Why Choose Us</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-4'>
          {ourValues.map((value, index) => (
            <div key={index} className="flex flex-col mx-4 bg-[#FFFFFF0D] rounded-xl shadow-lg p-6 h-full min-h-[15rem] justify-between">
            <h4 className="text-black text-center text-2xl mt-2  font-semibold">{value.title}</h4>
            {value.text.map((text, index) => (
              <div key={index} className="space-y-2">
                <h4 className={`text-black text-center text-lg mt-2  font-semibold `}>{text.head} -
                  
                </h4>
                <p className={`text-black text-center opacity-70  ${text.body}`}> {text.body}</p>
              </div>
            ))}
            
          </div>
          ))}
        </div>
      </section>

      {/* Get In Touch Section */}
      <section className='py-12'>
        <h2
            style={{ fontFamily: "Neutro, sans-serif" }}
            className="text-4xl text-black text-center font-bold mb-4"
        >
            GET IN TOUCH
        </h2>
        <p className='text-black opacity-70 text-center mb-8'>Have questions or need assistance? Reach out to us and we&apos;ll attend to you right away!</p>
        <GetInTouchForm />
      </section>
    </div>
  )
}

export default page