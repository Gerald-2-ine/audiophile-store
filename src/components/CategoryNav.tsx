"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Headphones",
    image: "/assets/headphones.png",
    link: "/headphones",
  },
  {
    name: "Speakers",
    image: "/assets/shared/desktop/image-category-thumbnail-speakers.png",
    link: "/speakers",
  },
  {
    name: "Earphones",
    image: "/assets/shared/desktop/image-category-thumbnail-earphones.png",
    link: "/earphones",
  },
];

export default function CategoryNav() {
  return (
    <section className="w-full mt-24 px-6 md:px-10 lg:px-0 mb-24">
      <div className="max-w-[1110px] mx-auto grid gap-16 md:gap-4 md:grid-cols-3 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.link}
            className="relative bg-[#F1F1F1] rounded-lg h-[180px] flex flex-col items-center justify-end pb-6 hover:scale-105 transition group"
          >
            <div className="absolute -top-12">
              <Image
                src={category.image}
                alt={category.name}
                width={150}
                height={150}
                className="object-contain"
              />
            </div>
            <h3 className="text-[15px] font-bold uppercase tracking-wide mb-2">
              {category.name}
            </h3>
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 group-hover:text-[#D87D4A] transition">
              Shop
              <Image
                src="/assets/shared/desktop/icon-arrow-right.svg"
                alt="arrow"
                width={8}
                height={12}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}