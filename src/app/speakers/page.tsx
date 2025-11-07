import CategoryNav from "../../components/CategoryNav";
import InfoSection from "../../components/home/InfoSection";
import ProductCard from "../../components/ProductCard";
import { products } from "../../lib/products";

export default function SpeakersPage() {
  const speakers = products.filter((p) => p.category === "speakers");

  return (
    <main className="w-full">
      <section className="bg-black text-white w-full py-24 text-center">
        <h1 className="text-3xl font-bold tracking-widest uppercase">
          Speakers
        </h1>
      </section>

      <section className="container mx-auto px-6 py-16 flex flex-col gap-24">
        {speakers.map((product, index) => (
          <ProductCard
            key={product.slug}
            product={product}
            reverse={index % 2 !== 0}
          />
        ))}
      </section>

      <CategoryNav />
      <InfoSection />
    </main>
  );
}
