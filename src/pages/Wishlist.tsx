import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { Heart } from "lucide-react";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useCart();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <main className="pt-[73px]">
      <section className="section-beige py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl font-light tracking-wide">Wishlist</h1>
          <p className="font-body text-sm text-muted-foreground mt-3">{wishlist.length} saved items</p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={48} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="font-display text-xl text-muted-foreground mb-2">Your wishlist is empty</p>
            <p className="font-body text-sm text-muted-foreground mb-6">Save pieces you love for later</p>
            <Link to="/shop" className="btn-luxury inline-block border border-foreground text-foreground hover:bg-foreground hover:text-background">
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {wishlistProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
};

export default Wishlist;
