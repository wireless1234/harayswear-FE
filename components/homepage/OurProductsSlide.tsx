"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { IoIosArrowDown } from "react-icons/io";
import ProductSelection from './ProductSelection';

const OurProductsSlide = () => {
  const category = [
    { id: 4, name: 'Mains', description: 'Aioli', image: '/images/pumpkin.png' },
    { id: 5, name: 'Small Plates', description: "Za'Tar, cauliflower, date rice, blacken tomato, caraway seed sauce, coconut yoghurt, fried pita", image: '/images/chicken-wings.png' },
    { id: 6, name: 'Burgers', description: 'Smokey BBQ sauce', image: '/images/Reuben Sandwich.png' },
    { id: 7, name: 'Grill', description: 'Smokey BBQ sauce', image: '/images/Chargrilled Lamb Loin Chops.png' },
  ];

  const [selectedCategory, setSelectedCategory] = useState(4); // Default to LV
  const [showProductSelection, setShowProductSelection] = useState(false);

  const toggleProductSelection = () => {
    setShowProductSelection(!showProductSelection);
  };

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  // Dynamically reorder brands: Move selected brand to the middle
  const orderedCategory = [
    category.find((b) => b.id === selectedCategory)!,
    ...category.filter((b) => b.id !== selectedCategory),
  ];

  return (
    <div id="our-products" className='max-w-[1440px] mx-auto p-10 2xl:my-72 lg:my-36'>
     
      <div className='mb-5 xl:mb-4 bg-gradient-to-b text-center from-black via-black to-white
      text-transparent bg-clip-text uppercase text-4xl md:text-7xl xl:text-[100px] mx-auto w-fit font-bold'>Our products</div>

      <div className='w-full grid lg:grid-cols-4 gap-8 md:gap-12 lg:gap-4 mt-10 transition-all duration-300'>
        {orderedCategory.map((category, index) => (
          <div
            key={category.id}
            className={`w-full transition-transform ${
              index === 0 ? 'order-2' : index === 1 ? 'order-1' : 'order-3'
            } ${category.id === selectedCategory ? 'scale-110' : 'scale-100'} lg:scale-100`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <Image
              src={category.image}
              alt={`${category.name} brand`}
              width={414.81}
              height={414.81}
              className="w-full cursor-pointer"
            />
          </div>
        ))}
      </div>

      <div className="flex lg:col-span-3 flex-col items-center justify-center text-black pt-10 space-y-4">
        <h1 className="text-4xl md:text-6xl text-center font-bold uppercase">
          {category.find((b) => b.id === selectedCategory)?.name}
        </h1>
        <p className="text-gray-400 text-center text-xl">{category.find((b) => b.id === selectedCategory)?.description}</p>
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
          categoryid={selectedCategory}
          onAddToCartSuccess={() => setShowProductSelection(false)}
        />
      )}
    </div>
  );
};

export default OurProductsSlide;
