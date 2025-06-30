"use client";

import Link from "next/link";
import Image from "next/image";


const banners = [
  {
    image: "/images/purple.png",
    imageBlur: "/images/purple-blur.png",
    imageBg: "/images/chicken-shnitzel.png",
    alt: "grape ice",
    color: "#7C3AED",
    colorHover: "#7C3AED9d",
  },
  {
    image: "/images/red.png",
    imageBlur: "/images/red-blur.png",
    imageBg: "/images/charcuteria-board.png",
    alt: "cherry pomegranate",
    color: "#B1182F",
    colorHover: "#B1182F9d",
  },
  {
    image: "/images/green.png",
    imageBlur: "/images/green-blur.png",
    imageBg: "/images/burger.png",
    alt: "double apple",
    color: "#7DA932",
    colorHover: "#7DA9329d",
  },
  {
    image: "/images/purple.png",
    imageBlur: "/images/green-purple.png",
    imageBg: "/images/rump.png",
    alt: "double apple",
    color: "#7C3AED",
    colorHover: "#7C3AED9d",
  },
  {
    image: "/images/red.png",
    imageBlur: "/images/red-blur.png",
    imageBg: "/images/pork-ribs.png",
    alt: "double apple",
    color: "#B1182F",
    colorHover: "#B1182F9d",
  },
]

const PremiumVapingBanner = () => {
  const item = banners[0]; // single banner now

  return (
    <div className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <Image
        src={item.imageBg}
        alt={item.alt}
        layout="fill"
        objectFit="cover"
        quality={100}
        className="z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />

      {/* Centered Content */}
      <div className="z-20 text-center px-6">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
          Browse our latest products
        </h1>
        <Link
          href="/#our-products"
          className="inline-block mt-4 px-6 py-3 border border-white text-white font-semibold rounded-md hover:bg-opacity-90 transition"
        >
          Shop all
        </Link>
      </div>
    </div>
  );
};


export default PremiumVapingBanner;


