"use client";

import { use } from "react";
import Image from "next/image";
import { useCart } from "../../../contexts/CartContext";
import { products } from "../../../lib/products";
import Link from "next/link";
import { useState } from "react"; 

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params); // ✅ Required for async params in Next.js App Router
  const product = products.find((p) => p.slug === slug);
const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Product not found</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-6 py-8">
      {/* Go Back */}
      <Link
        href="/"
        className="text-sm text-gray-500 mb-6 block hover:underline"
      >
        Go Back
      </Link>

      {/* Product Section */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg flex justify-center items-center w-full md:w-1/2">
          <Image
            src={product.image.mobile}
            alt={product.name}
            width={500}
            height={500}
            className="object-contain w-full"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          {product.new && (
            <p className="text-sm text-orange-500 tracking-[6px] uppercase mb-4">
              New Product
            </p>
          )}

          <h1 className="text-2xl md:text-4xl font-bold uppercase">
            {product.name}
          </h1>
          <p className="text-gray-600 mt-4">{product.description}</p>

          <p className="text-lg font-bold mt-6">
            ${product.price.toLocaleString()}
          </p>

          {/* Add to Cart Section */}
         <div className="flex items-center gap-4">
  <div className="bg-gray-200 flex items-center">
    <button
      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
      className="px-3 py-2"
    >
      -
    </button>
    <span className="px-4">{quantity}</span>
    <button
      onClick={() => setQuantity((prev) => prev + 1)}
      className="px-3 py-2"
    >
      +
    </button>
  </div>

  <button
    onClick={() =>
      addItem(
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.cartImage, // ✅ string (not object)
        },
        quantity // ✅ now it exists!
      )
    }
    className="bg-[#D87D4A] hover:bg-[#FBAF85] text-white px-8 py-2 font-bold uppercase tracking-wider transition"
  >
    Add to Cart
  </button>
</div>


      {/* Features */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold uppercase">Features</h2>
        <p className="text-gray-600 mt-4 whitespace-pre-line">
          {product.features}
        </p>
      </section>

      {/* In the Box */}
      <section className="mt-20 flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold uppercase">In the Box</h2>
          <ul className="mt-4">
            {product.includes.map((item, index) => (
              <li key={index} className="text-gray-600">
                <span className="text-orange-500 font-bold mr-2">
                  {item.quantity}x
                </span>
                {item.item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* You May Also Like */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold uppercase text-center mb-10">
          You may also like
        </h2>
        <div className="flex flex-col md:flex-row gap-10">
          {product.others.map((other, index) => {
            const otherProduct = products.find((p) => p.slug === other.slug);
            if (!otherProduct) return null;
            return (
              <div key={index} className="text-center w-full">
                <Image
                  src={otherProduct.image.mobile}
                  alt={other.name}
                  width={300}
                  height={300}
                  className="rounded-lg mx-auto"
                />
                <h3 className="text-xl font-bold mt-4 uppercase">
                  {other.name}
                </h3>
                <Link
                  href={`/product/${other.slug}`}
                  className="inline-block mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 uppercase tracking-wider"
                >
                  See Product
                </Link>
              </div>
            );
          })}
        </div>
      </section>
        </div>
    </div>
  </main>
  );
}
