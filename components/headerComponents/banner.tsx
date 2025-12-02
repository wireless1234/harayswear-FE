"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  { src: "/images/abaya1.webp", alt: "Abaya", text: "Elegant and stylish abayas for every occasion." },
  { src: "/images/abaya2.webp", alt: "Under Abaya", text: "Discover the perfect blend of tradition and modernity." },
  { src: "/images/abaya3.webp", alt: "Jalabiya", text: "Comfortable and chic designs for your wardrobe." },
];

const PremiumVapingBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      <div className="w-full h-full">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="relative w-full h-[70vh] overflow-hidden">
              <div className="absolute inset-0 z-0">
                <Image
                  src={image.src}
                  alt={image.alt}
                  height={700}
                  width={700}
                  className="object-cover"
                  quality={90}
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-10" />
              </div>

              <div className="relative z-20 h-full flex flex-col justify-end items-center text-center px-6 pb-12">
                <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-2 animate-fade-in-up">
                  {image.alt}
                </h2>
                <p className="text-white text-base md:text-lg font-medium animate-fade-in-up delay-200">
                  {image.text}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default PremiumVapingBanner;
