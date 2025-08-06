"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X, User, Search } from 'lucide-react';
import LoginLogoutButton from '../ui/LoginLogoutButton';
import { usePathname } from "next/navigation";
import { useCart } from '@/hooks/useCart';
import { CartItem } from '@/types';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useCart();

  const cartArray = Array.isArray(cart) ? cart : [];
  const totalItems = cartArray?.reduce((acc, brand) => {
    return acc + brand.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
  }, 0) || 0;

  return (
    <section className="relative w-full bg-white border-b border-gray-200">
      {/* Top Banner */}
      <div className="w-full text-center text-sm py-2 text-gray-800 border-b border-gray-200">
        Australia&apos;s #1 trusted online Alibarbar Vape Store
      </div>

      {/* Main Navbar */}
      <div className="w-full flex justify-between items-center px-4 py-4 max-w-7xl mx-auto">

        <div className="flex items-center gap-4">
          <Link href="/" className="block">
            <Image
              src="/images/logo.jpeg"
              alt="Logo"
              width={100}
              height={100}
              className="rounded-full"
            />
          </Link>
          <nav className="hidden lg:flex gap-6 text-gray-700 font-medium">
            {["Home", "Alibarbar", "Contact"].map((name) => {
              const path = name.toLowerCase() === "home" ? "/" : name.toLowerCase() === "alibarbar" ? "/catalog" : `/${name.toLowerCase()}`;
              return (
                <Link
                  key={path}
                  href={path}
                  className={`hover:underline ${
                    pathname === path ? "underline" : ""
                  }`}
                >
                  {name}
                </Link>
              );
            })}
          </nav>
        </div>


        {/* Right: Icons */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Icons (only show on lg and above) */}
          <div className="hidden lg:flex items-center gap-4">
            <Search size={20} />
            <User size={20} />
            <Link href="/checkout" className="relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed top-24 left-0 w-full bg-white shadow-md rounded-b-lg z-40 py-4">
          <nav className="flex flex-col items-center gap-4">
            {["Home", "Alibarbar", "Contact"].map((name) => {
              const path = name.toLowerCase() === "home" ? "/" : name.toLowerCase() === "alibarbar" ? "/catalog" : `/${name.toLowerCase()}`;
              return (
                <Link
                  key={path}
                  href={path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 text-lg font-medium"
                >
                  {name}
                </Link>
              );
            })}
            <LoginLogoutButton />
          </nav>
        </div>
      )}
    </section>
  );
};

export default Navbar;

