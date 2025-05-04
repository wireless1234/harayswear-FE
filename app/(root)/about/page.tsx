import Image from 'next/image'
import React from 'react'
import GetInTouchForm from '@/components/aboutus/GetInTouchForm'
import { MdDeliveryDining } from "react-icons/md";
import { BiDish } from "react-icons/bi";
import { GiThreeLeaves } from "react-icons/gi";
import { FiHeart } from "react-icons/fi";

const page = () => {
  const ourValues = [
    { src: <MdDeliveryDining className='size-20 mx-auto'/>, title: "Fast Delivery", text: "Get your meals hot and fresh in under 2 hours." },
    { src: <BiDish className='size-20 mx-auto'/>, title: "Restaurant Quality", text: "Every bite tastes and feels like you are dining out." },
    { src: <GiThreeLeaves className='size-20 mx-auto'/>, title: "Fresh Ingredients", text: "We cook with premium meat and garden fresh produce." },
    { src: <FiHeart className='size-20 mx-auto'/>, title: "Customer First", text: "Friendly service and satisfaction guaranteed." },
  ]
  return (
    <div>
      {/* Header Section */}
      <section className='bg-[url("/images/burger.png")] bg-cover bg-center flex flex-col md:flex-row items-center h-[50vh]'>
        <div className='px-4 mx-auto max-w-[1440px]  md:px-10'>
          <h1 style={{ fontFamily: 'Neutro, sans-serif'}}  className='text-4xl max-w-3xl text-black font-bold'>Crafted With Passion, Delivered With Care</h1>
          <p className='text-black font-medium text-lg mt-4 max-w-3xl'>
            
            Savour the flavors of expertlly made gourmet meals fom the comfort of your home.
          </p>
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
          At Javcorp, we believe food should be more than just sustenance — it should be an experience. 
          Born from a deep love for bold flavours, generous portions, and the kind of meals that stick with you, 
          Javcorp is all about comfort food made with heart. From our kitchen to your table, 
          every dish we serve is a celebration of great taste, honest ingredients, and good old-fashioned hospitality.
            
          </p>
          <p className='mt-2'> 
          Proudly Australian, our story started with a simple vision: to bring people together over food that warms the soul and satisfies every craving. 
          Whether you&apos;re in the mood for a smoky rack of ribs slow-cooked to perfection, a thick and juicy burger loaded with all the trimmings, 
          a wood-fired gourmet pizza, a tender steak grilled just the way you like it, or a vibrant, freshly tossed salad — our menu has something for everyone.
          </p>
          <p className='mt-2'> 
          At Javcorp, we don&apos;t cut corners. We prepare every dish with care, using high-quality ingredients sourced from trusted local suppliers. 
          Our chefs are passionate about flavour and dedicated to consistency, ensuring that each bite hits the mark — every single time.
          </p>
          <p className='mt-2'> 
          And we know that comfort shouldn&apos;t stop at the table — that&apos;s why we deliver. Whether you&apos;re chilling at home, 
          hosting friends, or just don&apos;t feel like cooking, we bring the Javcorp experience right to your door. 
          Fast, fresh, and always delicious.
          </p>
          <p className='mt-2'> 
          So go on — tuck into something truly satisfying. At Javcorp, we&apos;re not just feeding your appetite. We&apos;re serving up memories, one hearty meal at a time.
          </p>
        </div>
        <Image
          src="/images/pork-ribs.png"
          alt="food"
          width={500}
          height={500}
          layout='responsive'
          className='w-full h-auto max-w-[800px] rounded-2xl mt-8 xl:mt-0 md:ml-8 '
        />
       
      </section>

      <section id='our-promise' className='py-12 max-w-[1440px] mx-auto'>
        <h2 style={{ fontFamily: 'Neutro, sans-serif'}}  className='text-4xl text-black text-center font-bold'>OUR PROMISE</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  mt-8 gap-4'>
          {ourValues.map((value, index) => (
            <div key={index} className="flex flex-col mx-4 bg-[#FFFFFF0D] rounded-xl shadow-lg p-6 h-full min-h-[15rem] justify-between">
            {value.src}
            <h4 className="text-black text-center text-lg mt-2  font-semibold">{value.title}</h4>
            <p className="text-black text-center opacity-70  ">{value.text}</p>
          </div>
          ))}
        </div>
      </section>

      <div className='bg-black text-white text-3xl px-6 flex items-center justify-center py-10 my-5'>
        <h3
        style={{ fontFamily: 'Neutro, sans-serif'}}
        >Hungry Yet?</h3>
      </div>

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