import { products } from "../../lib/products";
import ProductCard from "../../components/ProductCard";
import CategoryNav from "../../components/CategoryNav";
import InfoSection from "../../components/home/InfoSection";

export default function CategoryPage({ params }: { params: { category: string } }) {
  // Filter products by category
  const categoryProducts = products.filter(p => p.category === params.category);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-black text-white py-16 md:py-20 text-center">
        <h1 className="text-[28px] md:text-[40px] font-bold uppercase tracking-[2px]">
          {params.category}
        </h1>
      </div>

      {/* Products */}
      <div className="max-w-[1110px] mx-auto px-6 md:px-10 lg:px-0 py-16 md:py-24">
        {categoryProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found in this category.</p>
        ) : (
          <div className="space-y-24 md:space-y-32">
            {categoryProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} reverse={index % 2 !== 0} />
            ))}
          </div>
        )}
      </div>

      {/* Category Navigation */}
      <CategoryNav />

      {/* About Section */}
      <InfoSection />
    </main>
  );
}