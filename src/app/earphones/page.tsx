import CategoryNav from "../../components/CategoryNav";
import InfoSection from "../../components/home/InfoSection";
import ProductCard from "../../components/ProductCard";
import { products } from "../../lib/products";

export default function EarphonesPage() {
  const earphones = products.filter((p) => p.category === "earphones");

  return (
    <main className="w-full">
      <section className="bg-black text-white w-full py-24 text-center">
        <h1 className="text-3xl font-bold tracking-widest uppercase">
          Earphones
        </h1>
      </section>

      <section className="container mx-auto px-6 py-16 flex flex-col gap-24">
        {earphones.map((product, index) => (
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
