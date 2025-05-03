'use client'
import React, { useRef, useState, MouseEvent } from "react";
import { tabs } from "@/lib/productCategoryData";

interface TabNavigationProps {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

const TabNavigation = ({activeTab, setActiveTab}: TabNavigationProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mouse events for drag scrolling
  const handleMouseDown = (e: MouseEvent) => {
    if (!scrollContainerRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div 
      ref={scrollContainerRef}
      className="hide-scrollbar mx-auto flex bg-white rounded-full p-1 md:p-1.5 border border-gray-300 max-w-[1145px] overflow-x-auto cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`p-2 md:px-6 md:py-2 lg:px-10 lg:py-4 rounded-full text-sm md:text-lg lg:text-2xl xl:text-3xl font-semibold transition-all uppercase whitespace-nowrap duration-200 ${
            activeTab === tab.id ? "bg-black text-white" : "text-gray-700"
          }`}
          onClick={() => {
            // Only change tab if not dragging
            if (!isDragging) {
              setActiveTab(tab.id);
            }
          }}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;