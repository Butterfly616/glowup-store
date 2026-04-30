import shirt from "@/assets/p-shirt.jpg";
import pants from "@/assets/p-pants.jpg";
import shoes from "@/assets/p-shoes.jpg";
import dress from "@/assets/p-dress.jpg";
import top from "@/assets/p-top.jpg";
import lipstick from "@/assets/p-lipstick.jpg";
import serum from "@/assets/p-serum.jpg";
import hair from "@/assets/p-hair.jpg";
import jeans from "@/assets/p-jeans.jpg";
import bag from "@/assets/p-bag.jpg";
import tshirt from "@/assets/p-tshirt.jpg";
import eyeshadow from "@/assets/p-eyeshadow.jpg";

export type Product = {
  id: string;
  title: string;
  brand: string;
  price: number;
  originalPrice: number;
  image: string;
  category: "men" | "women" | "beauty";
  subcategory: string;
  rating: number;
  description: string;
};

const discount = (price: number, pct: number) => ({
  price: Math.round(price * (1 - pct / 100)),
  originalPrice: price,
});

export const products: Product[] = [
  {
    id: "1", title: "Classic White Linen Shirt", brand: "Urban Edge",
    ...discount(2499, 50), image: shirt,
    category: "men", subcategory: "Shirts", rating: 4.5,
    description: "Breathable linen shirt perfect for casual and semi-formal occasions. Soft, lightweight and effortlessly stylish.",
  },
  {
    id: "2", title: "Royal Blue Chinos", brand: "Northwood",
    ...discount(1999, 40), image: pants,
    category: "men", subcategory: "Pants", rating: 4.3,
    description: "Slim-fit chinos crafted from premium cotton stretch fabric. A wardrobe essential.",
  },
  {
    id: "3", title: "Pearl White Sneakers", brand: "Stride",
    ...discount(3499, 55), image: shoes,
    category: "men", subcategory: "Shoes", rating: 4.7,
    description: "Minimal everyday sneakers with cushioned soles. Pairs perfectly with any look.",
  },
  {
    id: "4", title: "Slim Fit Dark Denim Jeans", brand: "Northwood",
    ...discount(2799, 45), image: jeans,
    category: "men", subcategory: "Pants", rating: 4.4,
    description: "Premium dark-wash denim with a comfortable slim cut.",
  },
  {
    id: "5", title: "Essential Black Polo Tee", brand: "Urban Edge",
    ...discount(1299, 50), image: tshirt,
    category: "men", subcategory: "Shirts", rating: 4.2,
    description: "Soft cotton polo tee that works from gym to lunch.",
  },
  {
    id: "6", title: "Rose Bloom Floral Dress", brand: "Petal & Co.",
    ...discount(2999, 60), image: dress,
    category: "women", subcategory: "Dresses", rating: 4.8,
    description: "Romantic midi dress with delicate floral print and flowy silhouette.",
  },
  {
    id: "7", title: "Ivory Cropped Tank Top", brand: "Petal & Co.",
    ...discount(999, 50), image: top,
    category: "women", subcategory: "Tops", rating: 4.4,
    description: "Buttery soft cropped tank that layers beautifully.",
  },
  {
    id: "8", title: "Blush Leather Handbag", brand: "Lumière",
    ...discount(4999, 35), image: bag,
    category: "women", subcategory: "Tops", rating: 4.6,
    description: "Structured top-handle bag in soft pink vegan leather.",
  },
  {
    id: "9", title: "Velvet Matte Lipstick Set", brand: "Glow Lab",
    ...discount(1599, 70), image: lipstick,
    category: "beauty", subcategory: "Makeup", rating: 4.9,
    description: "Long-wear velvet finish lipstick set in 6 iconic shades.",
  },
  {
    id: "10", title: "Radiance Vitamin C Serum", brand: "Glow Lab",
    ...discount(1899, 40), image: serum,
    category: "beauty", subcategory: "Skincare", rating: 4.7,
    description: "Brightening serum with 10% Vitamin C for a luminous glow.",
  },
  {
    id: "11", title: "Silk Repair Hair Duo", brand: "Mane",
    ...discount(2299, 45), image: hair,
    category: "beauty", subcategory: "Haircare", rating: 4.5,
    description: "Shampoo + conditioner duo that revives dry, damaged hair.",
  },
  {
    id: "12", title: "Sunset Eyeshadow Palette", brand: "Glow Lab",
    ...discount(2499, 55), image: eyeshadow,
    category: "beauty", subcategory: "Makeup", rating: 4.8,
    description: "12-shade palette featuring warm neutrals and shimmery sunsets.",
  },
];

export const categories = {
  men: { label: "Men", subs: ["Shirts", "Pants", "Shoes"] },
  women: { label: "Women", subs: ["Dresses", "Tops", "Makeup"] },
  beauty: { label: "Beauty", subs: ["Skincare", "Haircare", "Makeup"] },
} as const;

export const discountPct = (p: Product) =>
  Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
