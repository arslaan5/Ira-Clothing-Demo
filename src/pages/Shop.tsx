import { useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { products, categories } from "@/data/products";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const filtered = selectedCategory === "All"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  return (
    <PageTransition>
      <main className="pt-[85px]">
        {/* Header */}
        <section className="section-beige py-20 lg:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="luxury-divider mb-6" />
            <h1 className="luxury-heading text-5xl sm:text-6xl">Shop</h1>
            <p className="font-body text-sm text-muted-foreground mt-4 font-light">Discover our curated collection</p>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-8 lg:px-12 py-16">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-between gap-6 mb-14"
          >
            <div className="flex flex-wrap gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[10px] font-body tracking-[0.15em] uppercase px-5 py-2.5 border transition-all duration-500 ${
                    selectedCategory === cat
                      ? "bg-foreground text-background border-foreground"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-[10px] font-body tracking-[0.1em] bg-transparent border border-border px-4 py-2.5 outline-none cursor-pointer uppercase"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
            {sorted.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {sorted.length === 0 && (
            <p className="text-center text-muted-foreground font-body py-24 font-light">No products found in this category.</p>
          )}
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Shop;
