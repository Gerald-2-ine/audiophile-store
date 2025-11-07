import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    name: string;
    new: boolean;
    description: string;
    categoryImage: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  };
  reverse?: boolean;
}

export default function ProductCard({ product, reverse }: ProductCardProps) {
  return (
    <div className={`grid lg:grid-cols-2 gap-10 lg:gap-20 items-center ${reverse ? 'lg:grid-flow-dense' : ''}`}>
      <div className={reverse ? 'lg:col-start-2' : ''}>
        <div className="relative w-full h-[352px] lg:h-[560px] bg-[#F1F1F1] rounded-lg overflow-hidden">
          <Image
            src={product.categoryImage.mobile}
            alt={product.name}
            fill
            className="object-contain md:hidden"
          />
          <Image
            src={product.categoryImage.tablet}
            alt={product.name}
            fill
            className="object-contain hidden md:block lg:hidden"
          />
          <Image
            src={product.categoryImage.desktop}
            alt={product.name}
            fill
            className="object-contain hidden lg:block"
          />
        </div>
      </div>
      
      <div className={`flex flex-col justify-center text-center lg:text-left ${reverse ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
        {product.new && (
          <p className="text-[#D87D4A] text-sm tracking-[10px] mb-4 uppercase font-normal">
            New Product
          </p>
        )}
        <h2 className="text-[28px] md:text-[40px] font-bold mb-6 uppercase tracking-[1.5px] leading-[1.1] max-w-md mx-auto lg:mx-0">
          {product.name}
        </h2>
        <p className="text-black/50 text-[15px] leading-[25px] mb-8 max-w-md mx-auto lg:mx-0">
          {product.description}
        </p>
        <div>
          <Link 
            href={`/product/${product.slug}`}
            className="inline-block bg-[#D87D4A] hover:bg-[#FBAF85] text-white px-8 py-4 uppercase text-[13px] tracking-wider font-bold transition"
          >
            See Product
          </Link>
        </div>
      </div>
    </div>
  );
}