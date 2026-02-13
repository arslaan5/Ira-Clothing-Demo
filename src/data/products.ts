export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images?: string[];
  description: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: number;
  rating: number;
  isNew?: boolean;
  isTrending?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Silk Draped Midi Dress",
    price: 12999,
    originalPrice: 18999,
    category: "Dresses",
    image: "/product-1",
    description: "A luxurious silk midi dress with elegant draping. Perfect for evening occasions, this piece embodies timeless sophistication with its fluid silhouette and lustrous finish.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Champagne", hex: "#F5E6D3" },
      { name: "Noir", hex: "#2C2C2C" },
      { name: "Dusty Rose", hex: "#D4A0A0" },
    ],
    stock: 15,
    rating: 4.8,
    isNew: true,
  },
  {
    id: "2",
    name: "Tailored Wool Blazer",
    price: 9999,
    category: "Outerwear",
    image: "/product-2",
    description: "Impeccably tailored blazer in premium Italian wool. Features a relaxed shoulder and single-button closure for effortless elegance.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Cream", hex: "#F5F0E8" },
      { name: "Charcoal", hex: "#3C3C3C" },
    ],
    stock: 8,
    rating: 4.9,
    isTrending: true,
  },
  {
    id: "3",
    name: "Flowing Maxi Skirt",
    price: 7499,
    category: "Skirts",
    image: "/product-3",
    description: "A graceful maxi skirt in flowing fabric with a subtle sheen. The gentle movement creates an ethereal silhouette for any occasion.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Dusty Rose", hex: "#D4A0A0" },
      { name: "Ivory", hex: "#FFFFF0" },
    ],
    stock: 20,
    rating: 4.7,
    isNew: true,
  },
  {
    id: "4",
    name: "Cashmere Knit Sweater",
    price: 11499,
    originalPrice: 14999,
    category: "Knitwear",
    image: "/product-4",
    description: "Ultra-soft cashmere sweater in a relaxed fit. The perfect layering piece that transitions seamlessly from casual to refined.",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Oatmeal", hex: "#E8DCC8" },
      { name: "Camel", hex: "#C19A6B" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    stock: 12,
    rating: 4.9,
    isTrending: true,
  },
  {
    id: "5",
    name: "Wide Leg Trousers",
    price: 8499,
    category: "Trousers",
    image: "/product-5",
    description: "Elegantly tailored wide-leg trousers with a high waist. Crafted from premium fabric with a beautiful drape and clean finish.",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Taupe", hex: "#B8A99A" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    stock: 18,
    rating: 4.6,
  },
  {
    id: "6",
    name: "Silk Charmeuse Blouse",
    price: 6999,
    category: "Tops",
    image: "/product-6",
    description: "A refined silk charmeuse blouse with a subtle lustre. Features a relaxed fit with delicate button details for understated luxury.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Champagne", hex: "#F5E6D3" },
      { name: "Blush", hex: "#F2D7D5" },
      { name: "White", hex: "#FEFEFE" },
    ],
    stock: 25,
    rating: 4.8,
    isNew: true,
    isTrending: true,
  },
];

export const categories = ["All", "Dresses", "Outerwear", "Skirts", "Knitwear", "Trousers", "Tops"];
