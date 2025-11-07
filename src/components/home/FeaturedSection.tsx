"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const FeaturedProducts: React.FC = () => {
  return (
    <section className="w-full px-6 md:px-8 lg:px-10 mx-auto mt-[120px] space-y-[48px] md:space-y-[56px] lg:space-y-[64px]">
      {/* ✅ ZX9 SPEAKER */}
      <div className="max-w-[1110px] bg-[#D87D4A] rounded-lg overflow-hidden flex flex-col md:flex-col lg:flex-row items-center text-center md:text-center px-6 md:px-14 lg:px-20 py-16 md:py-20 lg:py-24 mx-auto relative">
        {/* Circle background */}
        <div className="absolute w-[500px] h-[500px] md:w-[550px] md:h-[550px] rounded-full bg-[#FBAF85] opacity-20 -top-[250px] left-1/2 -translate-x-1/2 md:left-[-100px] md:top-[-80px]"></div>

        {/* Product Image */}
        <div className="relative z-10 flex justify-center md:justify-center mb-10 md:mb-10">
          <Image
            src="/assets/home/desktop/image-speaker-zx9.png"
            alt="ZX9 Speaker"
            width={300}
            height={300}
            className="md:w-[260px] lg:w-[350px] h-auto"
            priority
          />
        </div>

        {/* Text content */}
        <div className="relative z-10 lg:ml-16 max-w-sm font-Manrope">
          <h2 className="text-white text-5xl md:text-6xl text-center lg:text-6xl font-Manrope font-bold leading-tight -700 leading-[58px] tracking-[2px]">
            ZX9 SPEAKER
          </h2>
          <p className="text-white opacity-75 mt-6 mb-8 text-sm md:text-base font-medium font-Manrope leading-[25px] text-[25px]">
            Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
          </p>
          <Link href="/product/zx9-speaker">
            <button className="bg-black text-white py-3 px-6 uppercase tracking-wider hover:bg-[#4C4C4C] transition">
              See Product
            </button>
          </Link>
        </div>
      </div>

      {/* ✅ ZX7 SPEAKER */}
      <div className="
        relative rounded-lg overflow-hidden 
        bg-[url('/assets/home/mobile/image-speaker-zx7.jpg')] 
        md:bg-[url('/assets/home/tablet/image-speaker-zx7.jpg')]
        lg:bg-[url('/assets/home/desktop/image-speaker-zx7.jpg')]
        bg-cover bg-center 
        min-h-[320px] 
        md:761.49px w-auto
        top--178px 
        flex items-center px-6 md:px-12 lg:px-20"
      >
        <div>
          <h2 className="text-black text-2xl md:text-3xl font-bold font-Manrope leading-[100%] tracking-[2px]">ZX7 SPEAKER</h2>
          <Link href="/product/product-zx7-speaker">
            <button className="mt-6 border border-black py-2 px-6 uppercase text-sm tracking-wider hover:bg-black hover:text-white transition">
              See Product
            </button>
          </Link>
        </div>
      </div>

      {/* ✅ YX1 EARPHONES */}
      <div className="grid md:grid-cols-2 gap-6 max-w-[1110px] mx-auto">
        {/* Left Image */}
        <div className="overflow-hidden rounded-lg">
          {/* Mobile */}
          <Image
            src="/assets/home/mobile/image-earphones-yx1.jpg"
            alt="YX1 Earphones"
            width={540}
            height={320}
            className="w-full h-full object-cover md:hidden"
          />
          {/* Tablet */}
          <Image
            src="/assets/home/tablet/image-earphones-yx1.jpg"
            alt="YX1 Earphones Tablet"
            width={540}
            height={320}
            className="w-full h-full object-cover hidden md:block lg:hidden"
          />
          {/* Desktop */}
          <Image
            src="/assets/home/desktop/image-earphones-yx1.jpg"
            alt="YX1 Earphones Desktop"
            width={540}
            height={320}
            className="w-full h-full object-cover hidden lg:block"
          />
        </div>

        {/* Right Content */}
        <div className="bg-[#F1F1F1] rounded-lg flex flex-col justify-center px-6 md:px-8 py-12 font-Manrope ">
          <h2 className="text-black text-2xl md:text-3xl font-bold leading-[100%] tracking-[2px]">YX1 EARPHONES</h2>
          <Link href="/product/yx1">
            <button className="mt-10 border border-black py-2 px-6 uppercase text-sm tracking-wider hover:bg-black hover:text-white transition">
              See Product
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
