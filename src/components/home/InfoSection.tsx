"use client";

import Image from "next/image";
import React from "react";

const InfoSection: React.FC = () => {
  return (
    <section className="w-full px-6 md:px-8 lg:px-20 mt-[160px]">
      <div className="max-w-[1110px] mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-20">
        
        {/* ✅ TEXT SECTION */}
        <div className="text-center  max-w-[430px] lg:pr-10 ">
          <h2 className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[40px] font-bold uppercase tracking-[1px] text-blackleading-[100%] font-Manrope lg:text-left">
            Bringing you the <span className="text-[#D87D4A]">best</span> audio gear
          </h2>
          <p className="text-[15px] md:text-[16px] text-black/60 mt-6 leading-[25px] top-448px justify-center letting-[0] font-Manrope px-1 lg:text-left">
           Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>

        {/* ✅ IMAGE SECTION */}
        <div className="w-full max-w-[540px] lg:max-w-[800px] lg:gap">
          <Image
            src="/assets/shared/desktop/image-best-gear.jpg"
            alt="Best audio gear"
            width={540}
            height={588}
            className="rounded-lg w-full object-cover "
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
