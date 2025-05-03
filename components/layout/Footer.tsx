import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoDribbble, IoLogoInstagram } from "react-icons/io5";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-black to-[#3C1177] text-white px-10 2xl:px-0 py-16">
      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row lg:justify-between  text-left">
        {/* Left Section - Socials & Text */}
        <div className="lg:w-[33%]">
          <h2 className="text-2xl text-left font-semibold leading-tight">
            
            Whether you&apos;re a seasoned vaper or just getting started, Uncle V makes shopping easy and convenient with fast, reliable delivery and exceptional customer service.
          </h2>
          <div className="flex justify-center lg:justify-start gap-4 mt-6">
            {/* Social Media Icons */}
            {[{ icon: <FaLinkedin />, key: "linkedin" },
              { icon: <FaXTwitter />, key: "twitter" },
              { icon: <IoLogoDribbble />, key: "dribbble" },
              { icon: <IoLogoInstagram />, key: "instagram" }].map(({ icon, key }) => (
              <Link
                href="#"
                key={key}
                className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition"
              >
                {icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Center Section - Quick Links */}
        <div className="h-full mt-14 lg:mt-0 lg:self-end ">
          <h3 className="text-base font-sans font-normal mb-3">• Quick links</h3>
          <div className="grid grid-cols-3 gap-4 justify-start ">
            {/* Row 1 */}
            <div className="col-span-3 lg:col-span-2 lg:w-full lg:mx-0 grid grid-cols-2 gap-4 w-[85%] mx-auto">
              <Link href='' className="col-span-1 px-6 py-3 flex items-center font-medium font-sans justify-center bg-white/10 rounded-full hover:bg-white/20 transition text-[10px]">WHO WE ARE</Link>
              <Link href='' className="col-span-1 px-6 py-3 flex items-center font-medium font-sans justify-center bg-white/10 rounded-full hover:bg-white/20 transition text-[10px]">OUR PROCESS</Link>
            </div>
            {/* Row 2 */}
            <Link href='' className="col-span-1 px-6 py-3 flex items-center font-medium font-sans justify-center bg-white/10 rounded-full hover:bg-white/20 transition text-[10px]">PROJECTS</Link>
            <Link href='' className="col-span-1 px-6 py-3 flex items-center font-medium font-sans justify-center bg-white/10 rounded-full hover:bg-white/20 transition text-[10px]">SERVICES</Link>
            <Link href='' className="col-span-1 px-6 py-3 flex items-center font-medium font-sans justify-center bg-white/10 rounded-full hover:bg-white/20 transition text-[10px]">PRICING</Link>

            {/* Row 3 mobile */}
            <div className="col-span-3 lg:hidden grid grid-cols-2 gap-4 w-[85%] mx-auto">
              <Link href='' className="col-span-1 px-6 py-3 flex items-center font-medium font-sans justify-center bg-white/10 rounded-full hover:bg-white/20 transition text-[10px]">BLOG</Link>
              <Link href='' className="col-span-1 px-6 py-3 flex items-center font-medium font-sans justify-center bg-white/10 rounded-full hover:bg-white/20 transition text-[10px]">TESTIMONIALS</Link>
            </div>
            {/* Row 3 desktop */}
              <Link href='' className="hidden lg:flex col-span-1 px-6 py-3 items-center font-medium font-sans justify-center bg-white/10 rounded-full hover:bg-white/20 transition text-[10px]">BLOG</Link>
              <Link href='' className="col-span-1 px-6 py-3 hidden lg:flex items-center font-medium font-sans justify-center bg-white/10 rounded-full hover:bg-white/20 transition text-[10px]">TESTIMONIALS</Link>
          </div>

        </div>

        {/* Right Section - Contact */}
        <div className="h-full mt-14 lg:mt-0 text-[#FFFFFF99] text-xs font-sans font-normal text-center lg:text-left lg:self-end">
          <h3 className="text-base text-white font-normal mb-3">• Contact</h3>
          <p className="whitespace-nowrap">admin@unclev.com.au</p>
          <p className="whitespace-nowrap mt-2 ">+ 971 50 146 5980</p>
          {/* <p className="whitespace-nowrap mt-2 lg:hidden">123 Made up Street, Australia, Earth</p> */}
          {/* <p className="whitespace-nowrap hidden lg:block mt-4">123 Made up Street, <br /> Australia, Earth</p> */}
        </div>
      </div>

      
      <div
        style={{ fontFamily: 'Neutro, sans-serif' }}
        className="relative mt-14 max-w-[1215px] text-center mx-auto md:mt-28 font-extrabold uppercase"
      >
        {/* Shadow Text */}
        <span
          className="absolute max-w-[1215px] md:left-3 lg:left-1 xl:left-3.5 top-0 text-[2.50rem] md:text-[5.8rem] lg:text-[130px] xl:text-[163px]
                    text-[#3816749d] blur-[2px] -translate-y-1.5 md:-translate-y-4"
          aria-hidden="true"
        >
          UNCLE V
        </span>

        {/* Main Gradient Text */}
        <span
          className="relative max-w-[1215px] text-[2.50rem] md:text-[5.8rem] lg:text-[130px] xl:text-[163px]
                    bg-gradient-to-b from-[#7C3AED] via-[#7C3AED] to-black bg-clip-text text-transparent"
        >
          UNCLE V
        </span>
      </div>

        
      {/* Bottom Links */}
      <div className=" max-w-5xl md:mx-auto lg:pr-10 text-center flex flex-col-reverse md:flex-row md:items-center justify-between text-sm text-white/70">
        <p className="mt-4 lg:mt-0">©2025 ASCOM GLOBAL ICT SERVICES LTD.</p>
        <div className="flex items-center justify-between md:gap-6 lg:mt-3">
          {["Terms and Conditions", "Privacy Policy", "Site Map"].map((item) => (
            <a
              key={item}
              href={item === "Terms and Conditions" ? "/terms" : item === "Privacy Policy" ? "/privacy" : "#"}
              className={`hover:text-white transition ${item === "Site Map" ? "hidden md:block" : ""}`}
            >
              {item}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
};

export default Footer;
