"use client";

import Image from "next/image";
import Link from "next/link";

export default function CategorySection() {
  const categories = [
    {
      name: "Headphones",
      image: "/assets/shared/desktop/image-category-thumbnail-headphones.png",
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

  return (
    <section className="w-full mt-35 px-6 md:px-10 lg:px-0">
      <div className="max-w-[1110px] mx-auto grid gap-16 md:gap-4 md:grid-cols-3 lg:grid-cols-3">
        {categories.map((category) => (
          <div
            key={category.name}
            className="relative bg-[#F1F1F1] rounded-lg h-[180px] flex flex-col items-center justify-end pb-6"
          >
            {/* Category Image */}
            <div className="absolute -top-12">
              <Image
                src={category.image}
                alt={category.name}
                width={150}
                height={150}
                className="object-contain"
              />
            </div>

            {/* Category Name */}
            <h3 className="text-[15px] font-bold uppercase tracking-wide mb-2">
              {category.name}
            </h3>

            {/* Shop Link */}
            <Link
              href={category.link}
              className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-orange-500 transition"
            >
              Shop
              <Image
                src="/assets/shared/desktop/icon-arrow-right.svg"
                alt="arrow"
                width={8}
                height={12}
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
