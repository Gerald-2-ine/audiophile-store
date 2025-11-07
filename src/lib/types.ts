export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'headphones' | 'speakers' | 'earphones';
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: { quantity: number; item: string }[];
  gallery: {
    first: string;
    second: string;
    third: string;
  };
  others: { slug: string; name: string; image: string }[];
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  categoryImage: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  cartImage: string;
}