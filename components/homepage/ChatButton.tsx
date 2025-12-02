'use client';

import Image from "next/image";
import React from "react";
// import { motion } from "framer-motion";
// import { RiMessage2Fill } from "react-icons/ri";
import Whatsapp from "@/public/images/whatsapp.png";

const ChatButton = () => {
  return (
    <div className="w-fit fixed top-[70vh] md:top-[80vh] right-5 z-20 flexitems-center justify-end py-16 px-3">
      <div className="relative self-end w-fit"> 
        {/* Button */}         
        {/* <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
         className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-semibold bg-[#7C3AED] shadow-[#7C3AED] hover:bg-[#7C3AED9d] shadow-xl transition-all">
          <RiMessage2Fill className="w-5 h-5" />
          Chat
        </motion.button> */}

        {/* Notification Badge */}
        {/* <div className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-[#8F55F2] text-white text-xs font-bold rounded-full shadow-md">
          1
        </div> */}
        <Image 
          src={Whatsapp} 
          alt="whatsapp" 
          width={200} 
          height={100} 
          className="rounded-full shadow-lg cursor-pointer"
          onClick={() => window.open('https://wa.me/61450787224', '_blank')}
        />
      </div>
    </div>

  );
};

export default ChatButton;