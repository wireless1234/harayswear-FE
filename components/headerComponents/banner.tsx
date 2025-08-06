"use client";

import Link from "next/link";
import Image from "next/image";
import banner from "@/public/images/alibarbar-banner.jpg";


const PremiumVapingBanner = () => {

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <Image
        src={banner}
        alt="Alibarbar Banner"
        fill
        sizes="100vw"
        style={{ objectFit: 'cover' }}
        quality={100}
        className="z-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />

      {/* Centered Content */}
      <div className="z-20 text-center px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          Browse our latest products
        </h1>
        <Link
          href="/catalog"
          className="inline-block mt-4 px-4 py-2 sm:px-6 sm:py-3 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-black transition-all duration-300 text-sm sm:text-base"
        >
          Shop all
        </Link>
      </div>
    </div>
  );
};


export default PremiumVapingBanner;


