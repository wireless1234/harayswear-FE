"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { IoIosArrowDown } from "react-icons/io";
import ProductSelection from './ProductSelection';

const OurProductsSlide = () => {
  const brands = [
    { id: 15, name: 'Small Plates', description: "Za'Tar, cauliflower, date rice, blacken tomato, caraway seed sauce, coconut yoghurt, fried pita", image: '/images/chicken-wings.png' },
    { id: 16, name: 'Mains', description: 'Aioli', image: '/images/pumpkin.png' },
    { id: 17, name: 'Burgers', description: 'Smokey BBQ sauce', image: '/images/Reuben Sandwich.png' },
    { id: 18, name: 'Grill', description: 'Smokey BBQ sauce', image: '/images/Chargrilled Lamb Loin Chops.png' },
  ];

  const [selectedBrand, setSelectedBrand] = useState(17); // Default to LV
  const [showProductSelection, setShowProductSelection] = useState(false);

  const toggleProductSelection = () => {
    setShowProductSelection(!showProductSelection);
  };

  const handleBrandClick = (brandId: number) => {
    setSelectedBrand(brandId);
  };

  // Dynamically reorder brands: Move selected brand to the middle
  const orderedBrands = [
    brands.find((b) => b.id === selectedBrand)!,
    ...brands.filter((b) => b.id !== selectedBrand),
  ];

  return (
    <div id="our-products" className='max-w-[1440px] mx-auto p-10 2xl:my-72 lg:my-36'>
     
      <div className='mb-5 xl:mb-4 bg-gradient-to-b text-center from-black via-black to-white
      text-transparent bg-clip-text uppercase text-4xl md:text-7xl xl:text-[100px] mx-auto w-fit font-bold'>Our products</div>

      <div className='w-full grid lg:grid-cols-4 gap-8 md:gap-12 lg:gap-4 mt-10 transition-all duration-300'>
        {orderedBrands.map((brand, index) => (
          <div
            key={brand.id}
            className={`w-full transition-transform ${
              index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'
            } ${brand.id === selectedBrand ? 'scale-110' : 'scale-100'} lg:scale-100`}
            onClick={() => handleBrandClick(brand.id)}
          >
            <Image
              src={brand.image}
              alt={`${brand.name} brand`}
              width={414.81}
              height={414.81}
              className="w-full cursor-pointer"
            />
          </div>
        ))}
      </div>

      <div className="flex lg:col-span-3 flex-col items-center justify-center text-black pt-10 space-y-4">
        <h1 className="text-4xl md:text-6xl text-center font-bold uppercase">
          {brands.find((b) => b.id === selectedBrand)?.name}
        </h1>
        <p className="text-gray-400 text-center text-xl">{brands.find((b) => b.id === selectedBrand)?.description}</p>
        <button 
          className="group flex mx-auto items-center gap-2 cursor-pointer border border-yellow-400 hover:text-white text-black px-6 py-3 rounded-full hover:bg-yellow-400 transition"
          onClick={toggleProductSelection}
        >
          Select Flavor
          <IoIosArrowDown className="w-5 h-5 text-yellow-400 group-hover:text-white" />
        </button>
      </div>
      
      {showProductSelection && (
        <ProductSelection
          brandid={selectedBrand}
          onAddToCartSuccess={() => setShowProductSelection(false)}
        />
      )}
    </div>
  );
};

export default OurProductsSlide;
