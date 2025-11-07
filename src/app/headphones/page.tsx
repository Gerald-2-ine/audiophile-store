import CategoryNav from "../../components/CategoryNav";
import InfoSection from "../../components/home/InfoSection";
import ProductCard from "../../components/ProductCard";
import { products } from "../../lib/products";

export default function HeadphonesPage() {
  const headphones = products.filter((p) => p.category === "headphones");

  return (
    <main className="w-full">
      {/* Category Header Section */}
      <section className="bg-black text-white w-full py-24 text-center">
        <h1 className="text-3xl font-bold tracking-widest uppercase">
          Headphones
        </h1>
      </section>

      {/* Product List Section */}
      <section className="container mx-auto px-6 py-16 flex flex-col gap-24">
        {headphones.map((product, index) => (
          <ProductCard
            key={product.slug}
            product={product}
            reverse={index % 2 !== 0}
          />
        ))}
      </section>

      {/* Bottom Category Navigation (Headphones / Speakers / Earphones) */}
      <CategoryNav />

      {/* "Bringing You the Best" Section */}
      <InfoSection />
    </main>
  );
}
