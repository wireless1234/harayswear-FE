"use client"

import Link from "next/link"
import Image from "next/image"
import React from 'react'
import { ArrowRight } from 'lucide-react'

const menuItems = [
  {
    label: "Small Plate",
    img: "/images/Charcuterie Board.png",
    category: "1",
  },
  {
    label: "Burgers",
    img: "/images/Fried Chicken Burger.png",
    category: "3",
  },
  {
    label: "Grill",
    img: "/images/250g Rump.png",
    category: "4",
  },
  {
    label: "Mains",
    img: "/images/chicken-shnitzel.png",
    category: "2",
  },
  {
    label: "Salads",
    img: "/images/Roasted Pumpkin Wedge.png",
    category: "5",
  },
  {
    label: "Kids",
    img: "/images/Kids Chicken Nuggets & Chips.png",
    category: "6",
  },
]

const OurMenu = () => {
  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-10 text-center">View Our Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item, index) => (
          <div key={index} className="group relative rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform hover:scale-105">
            <Image
              width={500}
              height={500}
              src={item.img}
              alt={item.label}
              className="w-full h-60 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md p-4 flex justify-between items-center">
              <span className="text-lg font-medium">{item.label}</span>
              <Link href={`/catalog?categoryId=${item.category}&&categoryName=${item.label}`}><ArrowRight className="w-5 h-5" /></Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurMenu
