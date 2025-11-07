"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#101010] text-white w-full mt-32">
      {/* Orange Accent Line */}
      <div className="h-[4px] w-24 bg-[#D87D4A] mx-auto md:mx-0"></div>

      {/* Main Footer Content */}
      <div className="max-w-[1110px] mx-auto px-6 md:px-8 lg:px-10 py-14 flex flex-col gap-10">
        {/* Logo & Nav */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between text-center lg:text-left">
          {/* Centered logo on mobile */}
          <Link href="/" className="mx-auto md:mx-0 lg:mx-0">
            <Image
              src="/assets/shared/desktop/logo.svg"
              alt="Audiophile Logo"
              width={143}
              height={25}
            />
          </Link>

          {/* Nav links under logo in mobile */}
          <nav className="mt-8 lg:mt-0">
            <ul className="flex flex-col md:flex-row gap-5 md:gap-8 text-sm tracking-widest uppercase">
              <li>
                <Link href="/" className="hover:text-[#D87D4A]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/headphones" className="hover:text-[#D87D4A]">
                  Headphones
                </Link>
              </li>
              <li>
                <Link href="/speakers" className="hover:text-[#D87D4A]">
                  Speakers
                </Link>
              </li>
              <li>
                <Link href="/earphones" className="hover:text-[#D87D4A]">
                  Earphones
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Description & Social Icons Row */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-10 lg:gap-0">
          {/* Description text stretches to where social icons end */}
          <p className="text-white/70 text-[15px] leading-[25px] mx-auto md:mx-0 max-w-[680px] lg:max-w-[540px]">
            Audiophile is an all in one stop to fulfill your audio needs. We are
            a small team of music lovers and sound specialists who are devoted
            to helping you get the most out of personal audio. Come and visit
            our demo facility - we’re open 7 days a week.
          </p>

          {/* Social Icons right aligned on md+ */}
          <div className="flex justify-center lg:justify-end gap-6 md:hidden lg:flex">
            <Link href="#">
              <Image
                src="/assets/shared/desktop/icon-facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
            </Link>
            <Link href="#">
              <Image
                src="/assets/shared/desktop/icon-twitter.svg"
                alt="Twitter"
                width={24}
                height={24}
              />
            </Link>
            <Link href="#">
              <Image
                src="/assets/shared/desktop/icon-instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </div>

        {/* Copywright */}

        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          {/* Copyright */}
          <p className="text-center md:text-left text-white/70 text-sm order-2 md:order-1">
            Copyright 2021. All Rights Reserved
          </p>

          {/* Social Icons – move beside copyright on tablet */}
          <div className="flex justify-center md:justify-end gap-6 mb-10 md:mb-0 order-1 md:order-2 lg:hidden hidden md:flex">
            <Link href="#">
              <Image
                src="/assets/shared/desktop/icon-facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
            </Link>
            <Link href="#">
              <Image
                src="/assets/shared/desktop/icon-twitter.svg"
                alt="Twitter"
                width={24}
                height={24}
              />
            </Link>
            <Link href="#">
              <Image
                src="/assets/shared/desktop/icon-instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
