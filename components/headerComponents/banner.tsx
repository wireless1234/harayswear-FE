"use client";

import Link from "next/link";
import React, {useState, useEffect} from "react";
import { motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";


const banners = [
  {
    image: "/images/purple.png",
    imageBlur: "/images/purple-blur.png",
    imageBg: "/images/purple-bg.png",
    alt: "grape ice",
    color: "#7C3AED",
    colorHover: "#7C3AED9d",
  },
  {
    image: "/images/red.png",
    imageBlur: "/images/red-blur.png",
    imageBg: "/images/red-bg.png",
    alt: "cherry pomegranate",
    color: "#B1182F",
    colorHover: "#B1182F9d",
  },
  {
    image: "/images/green.png",
    imageBlur: "/images/green-blur.png",
    imageBg: "/images/green-bg.png",
    alt: "double apple",
    color: "#7DA932",
    colorHover: "#7DA9329d",
  }
]

const PremiumVapingBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const item = banners[currentIndex];

  
  return (
    <div className="relative px-6 lg:px-[3.88rem] xl:px-[67px] flex items-center justify-between h-screen text-white ">
      <Image src={item.imageBg} alt="background" layout="fill" objectFit="cover" />
      <div className="max-w-[1440px] relative w-full flex items-center h-full mx-auto">
        {/* Left Content */}
        <div className="xl:max-w-[1112px] z-10">
          {/* Title */}
          <h1 className="text-4xl md:text-7xl lg:text-[6.5rem] xl:text-[147.69px] font-bold uppercase leading-tight relative" style={{ fontFamily: 'Neutro, sans-serif' }}>
            <span className="block">Premium</span>
            <span style={{ 
              fontFamily: 'Neutro Outline, sans-serif', 
              fontStyle: 'normal',
              color: item.color }} 
              className="absolute inset-5 md:inset-10 lg:inset-12 xl:inset-20 left-1 md:left-2 lg:left-2.5 xl:left-3 font-bold text-left">
                Vaping

            </span>
          </h1>

          {/* Description */}
          <p className="text-[22px] lg:w-[55%] font-semibold text-[#E5E7EBA6] mt-16">
            Welcome to Uncle V, your go-to destination for premium vape products delivered straignt to your door.
          </p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className=" mt-6 px-6 py-3 text-lg xl:text-2xl font-semibold text-white rounded-full flex items-center shadow-lg transition-all"
            style={{
              backgroundColor: item.color,
              boxShadow: `0px 4px 10px ${item.color}`,
            }}
          >
              <Link href="/#our-products"> Order Now </Link>
            <IoIosArrowForward className="mt-1 ml-2" />
          </motion.button>
        </div>

        {/* Vaping Device Image */}
        <div
          className="blur-cont absolute hidden md:block bottom-0 right-0 md:right-3 lg:-right-3 xl:-right-16  z-10"
        >
          <Image src={item.imageBlur} alt={item.alt} width={393} height={726} className="blur-img w-full h-full md:w-[393px] md:h-[450.54px] xl:w-[440px] xl:h-[540.54]"/>
          
        </div>
        <div
          className="vector md:absolute hidden md:block md:bottom-8 lg:bottom-16 xl:bottom-20 md:right-14 lg:right-6 xl:-right-10 z-10"
        >
          <Image src="/images/Vector.png" alt="vector" width={395} height={142.51} unoptimized className="vector-img w-full h-full md:w-[300px] md:h-[250.51px] lg:h-[200.51px] xl:w-[340px] xl:h-[260px]" />
          
        </div>
        <div
          className="image-cont md:absolute hidden md:block md:-bottom-24 lg:-bottom-[5rem] xl:-bottom-24 md:right-0 lg:-right-7 xl:-right-24 z-10"
        >
          <Image src={item.image} alt={item.alt} width={464.42} height={771.54} className="img w-full h-full md:w-[393px] md:h-[530.54px] xl:w-[440px] xl:h-[650.54] transform hover:rotate-3 transition-transform duration-300 ease-in-out " />
          
        </div>
        
      </div>
    </div>

  );
};

export default PremiumVapingBanner;


