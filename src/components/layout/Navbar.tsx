"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import CartModal from "../../components/CartModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  // ✅ Fix hydration: only show cart badge after mount
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 0);
  }, []);

  return (
    <>
      <header className="w-full bg-black text-white flex items-center justify-between px-6 md:px-10 lg:px-20 h-24 relative z-50 border-b border-white/10">
        <div className="max-w-[1110px] mx-auto w-full flex items-center justify-between">
          {/* Mobile Hamburger */}
          <button onClick={() => setIsOpen(true)} className="lg:hidden">
            <Image
              src="/assets/shared/tablet/icon-hamburger.svg"
              alt="Menu"
              width={20}
              height={20}
            />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="flex-1 flex justify-center md:justify-start md:ml-10 lg:justify-start"
          >
            <Image
              src="/assets/shared/desktop/logo.svg"
              alt="Audiophile Logo"
              width={143}
              height={25}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="md:hidden hidden lg:flex md:ml-10 lg:mr-20 gap-8 text-sm tracking-[2px] uppercase absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
            <Link href="/" className="hover:text-[#D87D4A] transition">
              Home
            </Link>
            <Link
              href="/headphones"
              className="hover:text-[#D87D4A] transition"
            >
              Headphones
            </Link>
            <Link href="/speakers" className="hover:text-[#D87D4A] transition">
              Speakers
            </Link>
            <Link href="/earphones" className="hover:text-[#D87D4A] transition">
              Earphones
            </Link>
          </nav>

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative hover:opacity-80 transition"
          >
            <Image
              src="/assets/shared/desktop/icon-cart.svg"
              alt="Cart"
              width={23}
              height={20}
            />

            {/* ✅ Only render after hydration is complete */}
            {isMounted && totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D87D4A] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            ></div>

            <div className="fixed top-24 left-0 right-0 bg-white text-black p-8 z-50 shadow-lg rounded-b-xl transition-all">
              <nav className="max-w-[1110px] mx-auto grid md:grid-cols-3 gap-6">
                <CategoryCard
                  name="Headphones"
                  image="/assets/shared/desktop/image-category-thumbnail-headphones.png"
                  link="/headphones"
                  onClick={() => setIsOpen(false)}
                />
                <CategoryCard
                  name="Speakers"
                  image="/assets/shared/desktop/image-category-thumbnail-speakers.png"
                  link="/speakers"
                  onClick={() => setIsOpen(false)}
                />
                <CategoryCard
                  name="Earphones"
                  image="/assets/shared/desktop/image-category-thumbnail-earphones.png"
                  link="/earphones"
                  onClick={() => setIsOpen(false)}
                />
              </nav>
            </div>
          </>
        )}
      </header>

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

function CategoryCard({
  name,
  image,
  link,
  onClick,
}: {
  name: string;
  image: string;
  link: string;
  onClick: () => void;
}) {
  return (
    <Link href={link} onClick={onClick}>
      <div className="relative bg-[#F1F1F1] rounded-lg h-[165px] flex flex-col items-center justify-end pb-5 hover:scale-105 transition cursor-pointer">
        <div className="absolute -top-12">
          <Image
            src={image}
            alt={name}
            width={140}
            height={140}
            className="object-contain"
          />
        </div>
        <h3 className="text-[15px] font-bold uppercase tracking-wide mb-2">
          {name}
        </h3>
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
          Shop
          <Image
            src="/assets/shared/desktop/icon-arrow-right.svg"
            alt="arrow"
            width={8}
            height={12}
          />
        </div>
      </div>
    </Link>
  );
}
