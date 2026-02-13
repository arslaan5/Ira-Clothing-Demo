import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const productImages: Record<string, string> = {};

const imageModules = import.meta.glob("@/assets/product-*.jpg", { eager: true, import: "default" }) as Record<string, string>;
Object.entries(imageModules).forEach(([path, url]) => {
  const match = path.match(/product-(\d+)/);
  if (match) {
    productImages[`/product-${match[1]}`] = url;
  }
});

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { wishlist, toggleWishlist } = useCart();
  const isWishlisted = wishlist.includes(product.id);
  const imageSrc = productImages[product.image] || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          <motion.img
            src={imageSrc}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.06]"
            loading="lazy"
          />
          {/* Rose gold hover border accent */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 transition-all duration-700 pointer-events-none" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="text-[9px] font-body tracking-[0.2em] uppercase bg-foreground text-background px-3 py-1.5">
                New
              </span>
            )}
            {product.originalPrice && (
              <span className="text-[9px] font-body tracking-[0.2em] uppercase bg-primary text-primary-foreground px-3 py-1.5">
                Sale
              </span>
            )}
          </div>

          {/* Bottom hover overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out p-5">
            <div className="bg-background/95 backdrop-blur-sm text-center py-3 text-[10px] font-body tracking-[0.2em] uppercase cursor-pointer hover:bg-foreground hover:text-background transition-colors duration-300">
              Quick View
            </div>
          </div>
        </div>
      </Link>

      {/* Wishlist button */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-4 right-4 w-9 h-9 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary hover:text-primary-foreground"
        style={{ boxShadow: "var(--shadow-soft)" }}
        aria-label="Add to wishlist"
      >
        <Heart
          size={14}
          className={isWishlisted ? "fill-primary text-primary group-hover/btn:fill-primary-foreground" : "text-foreground"}
        />
      </motion.button>

      {/* Product Info */}
      <div className="mt-5 space-y-2">
        <h3 className="font-display text-base tracking-wide group-hover:text-primary transition-colors duration-500">
          {product.name}
        </h3>
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-body font-medium">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xs font-body text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        {/* Color swatches */}
        <div className="flex gap-2 mt-2 pt-1">
          {product.colors.map((color) => (
            <span
              key={color.name}
              className="w-3.5 h-3.5 rounded-full border border-border/60 transition-transform duration-300 hover:scale-125"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
