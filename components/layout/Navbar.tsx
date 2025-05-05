"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import LoginLogoutButton from '../ui/LoginLogoutButton';
import { usePathname } from "next/navigation";
import { useCart } from '@/hooks/useCart';
import { CartItem } from '@/types';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useCart();

  // Ensure cart is always an array
  const cartArray = Array.isArray(cart) ? cart : [];

  // Calculate total cart items
  const totalItems = cartArray?.reduce((acc, brand) => {
    return acc + brand.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
  }, 0) || 0;

  return (
    <div className="w-11/12 lg:w-8/12 mx-auto flex justify-between items-center px-4 lg:px-8 bg-[#00000066] text-white rounded-3xl shadow-lg backdrop-blur-md fixed left-1/2 -translate-x-1/2 top-2 z-100">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        <Image 
        src="/images/unclevlogo.png" 
        alt="Logo" 
        width={80} 
        height={80} className='size-[60px] md:size-[80px]' />
      </Link>

      {/* Mobile Menu Toggle */}
      <button
        className="lg:hidden text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Links */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } lg:flex lg:w-5/12 flex-col lg:flex-row gap-4 justify-center absolute lg:static top-16 left-0 w-full bg-[#00000066] lg:bg-transparent py-4 lg:py-8 rounded-lg lg:rounded-none`}
      >
        <nav className="w-full flex flex-col lg:flex-row items-center lg:justify-between">
          {["Home", "Shop", "About"].map((name) => {
            const path = name.toLowerCase() === "home" ? "/" : `/${name.toLowerCase()}`;
            const isShop = name.toLowerCase() === "shop";
            return (
              <Link
                key={path}
                href={isShop ? "/#our-products" : path}
                className="relative hover:text-gray-400 capitalize text-xl mb-4 lg:mb-0"
              >
                <span className={pathname === path ? "pb-1" : ""}>
                  {name}
                </span>
                {pathname === path && (
                  <span className="absolute left-1/2 -bottom-2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2" />
                )}
              </Link>
            );
          })}
          <LoginLogoutButton />
        </nav>
      </div>

      {/* Cart & Login */}
      <div className="flex items-center gap-4">
        <Link href="/checkout" className="relative">
          <ShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
