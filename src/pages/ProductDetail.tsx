import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, ArrowLeft } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const productImages: Record<string, string> = {};
const imageModules = import.meta.glob("@/assets/product-*.jpg", { eager: true, import: "default" }) as Record<string, string>;
Object.entries(imageModules).forEach(([path, url]) => {
  const match = path.match(/product-(\d+)/);
  if (match) productImages[`/product-${match[1]}`] = url;
});

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem, wishlist, toggleWishlist } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="pt-[85px] min-h-screen flex items-center justify-center">
        <p className="font-body text-muted-foreground font-light">Product not found.</p>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const imageSrc = productImages[product.image] || "";
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor);
    }
  };

  return (
    <PageTransition>
      <main className="pt-[85px]">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-12">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <Link to="/shop" className="inline-flex items-center gap-2 text-[10px] font-body text-muted-foreground hover:text-foreground transition-colors duration-500 tracking-[0.1em] uppercase">
              <ArrowLeft size={13} />
              Back to Shop
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="aspect-[3/4] bg-secondary overflow-hidden group"
            >
              <img
                src={imageSrc}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col justify-center"
            >
              {product.isNew && (
                <span className="luxury-label !text-primary mb-3">New Arrival</span>
              )}
              <h1 className="font-display text-4xl sm:text-5xl font-light tracking-wide mb-3">{product.name}</h1>
              <div className="flex items-center gap-3 mb-8">
                <span className="font-body text-lg font-medium">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="font-body text-sm text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="luxury-divider !mx-0 mb-8" />

              <p className="font-body text-sm text-muted-foreground leading-[1.8] mb-10 font-light">{product.description}</p>

              {/* Color */}
              <div className="mb-8">
                <p className="luxury-label mb-4">
                  Color {selectedColor && `— ${selectedColor}`}
                </p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-9 h-9 rounded-full border-2 transition-all duration-500 ${
                        selectedColor === color.name ? "border-foreground scale-110" : "border-border hover:border-muted-foreground"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mb-8">
                <p className="luxury-label mb-4">Size</p>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-13 h-11 px-4 border text-[10px] font-body tracking-[0.1em] transition-all duration-500 ${
                        selectedSize === size
                          ? "bg-foreground text-background border-foreground"
                          : "border-border text-foreground hover:border-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-10">
                <p className="luxury-label mb-4">Quantity</p>
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 border border-border rounded-full flex items-center justify-center hover:border-foreground transition-colors duration-500"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="font-body text-sm w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 border border-border rounded-full flex items-center justify-center hover:border-foreground transition-colors duration-500"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !selectedColor}
                  className="btn-luxury flex-1 bg-foreground text-background disabled:opacity-30 disabled:cursor-not-allowed hover:bg-foreground/90"
                >
                  Add to Bag
                </button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-13 h-13 border flex items-center justify-center transition-all duration-500 ${
                    isWishlisted ? "border-primary bg-primary/10" : "border-border hover:border-foreground"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart size={18} className={isWishlisted ? "fill-primary text-primary" : ""} />
                </motion.button>
              </div>

              <p className="luxury-label mt-6">
                {product.stock > 0 ? `${product.stock} pieces remaining` : "Currently unavailable"}
              </p>
            </motion.div>
          </div>

          {/* Related Products */}
          <section className="py-24 lg:py-28">
            <div className="luxury-divider mb-10" />
            <h2 className="luxury-heading text-3xl text-center mb-14">You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </PageTransition>
  );
};

export default ProductDetail;
