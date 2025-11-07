"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full bg-[#FAFAFA]">
      {/* BACKGROUND IMAGE */}
      <div className="relative w-full h-[600px] lg:mt:10 lg:pl-280px">
        <Image
          src="/assets/home/desktop/image-hero.jpg"
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover hidden lg:block"
        />
        <Image
          src="/assets/home/tablet/image-header.jpg"
          alt="Hero Tablet"
          fill
          priority
          sizes="100vw"
          className="object-cover hidden md:block lg:hidden"
        />
        <Image
          src="/assets/home/mobile/image-header.jpg"
          alt="Hero Mobile"
          fill
          priority
          sizes="100vw"
          className="object-cover md:hidden"
        />
      </div>

      {/* CONTENT CONTAINER (CENTERED WITH EQUAL LEFT/RIGHT MARGINS) */}
      <div className="absolute inset-0 flex  items-center">
        <div className="w-full max-w-[1110px] mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between px-6 md:px-20 lg:px-15">
          
          {/* TEXT ON THE LEFT */}
          <div className="text-center lg:text-left max-w-[400px] lg:mx-300px lg:top-225px lg:mr-100px">
            <p className="uppercase tracking-[0.6em] text-gray-400 text-sm">
              New Product
            </p>
            <h1 className="text-white font-bold text-[36px] leading-tight md:text-[48px] lg:text-[56px] uppercase mt-4 lg:tracking-[2px] leading-[58px] font-Manrope">
              XX99 Mark II <br /> Headphones
            </h1>
            <p className="text-gray-400 mt-6 leading-[25px] tracking-[0px] font-Manrope text-[15px] lg:pr-15">
             Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
            </p>
            <button className="mt-8 bg-[#fbaf85] fonthover:bg-orange-600 text-white px-8 py-3 uppercase tracking-wider">
              See Product
            </button>
          </div>

          {/* (OPTIONAL) IMAGE on the RIGHT INSIDE THE CONTAINER */}
          {/* If your design shows headphones mockup inside container, uncomment below */}
          {/* <div className="hidden lg:block">
            <Image
              src="/assets/home/desktop/hero-headphones.png"
              alt="Headphones"
              width={450}
              height={500}
            />
          </div> */}

        </div>
      </div>
    </section>
  );
}
