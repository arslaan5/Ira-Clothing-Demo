import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";

import lookbook1 from "@/assets/lookbook-1.jpg";
import lookbook2 from "@/assets/lookbook-2.jpg";
import lookbook3 from "@/assets/lookbook-3.jpg";
import lookbook4 from "@/assets/lookbook-4.jpg";
import lookbook5 from "@/assets/lookbook-5.jpg";
import lookbook6 from "@/assets/lookbook-6.jpg";
import lookbook7 from "@/assets/lookbook-7.jpg";

interface LookbookImage {
  src: string;
  alt: string;
  category: string;
  span: "tall" | "wide" | "normal";
}

const images: LookbookImage[] = [
  { src: lookbook1, alt: "Silk draped gown in champagne", category: "Evening", span: "tall" },
  { src: lookbook2, alt: "Tailored ivory blazer set", category: "Tailoring", span: "wide" },
  { src: lookbook3, alt: "Rose gold jewelry detail", category: "Accessories", span: "normal" },
  { src: lookbook4, alt: "Champagne evening gown editorial", category: "Evening", span: "tall" },
  { src: lookbook5, alt: "Cashmere scarves flat lay", category: "Accessories", span: "normal" },
  { src: lookbook6, alt: "Black silk dress in courtyard", category: "Editorial", span: "wide" },
  { src: lookbook7, alt: "Lace embroidery detail", category: "Details", span: "normal" },
];

const categories = ["All", "Evening", "Tailoring", "Accessories", "Editorial", "Details"];

const Lookbook = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = selectedCategory === "All"
    ? images
    : images.filter((img) => img.category === selectedCategory);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filtered.length);
    }
  };

  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
    }
  };

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="pt-32 pb-16 px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-body tracking-[0.4em] uppercase text-muted-foreground mb-4"
          >
            Spring / Summer 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-light tracking-[0.15em] text-foreground"
          >
            Lookbook
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-[1px] mx-auto mt-6 origin-center"
            style={{ background: "var(--gradient-rose-soft)" }}
          />
        </section>

        {/* Category filters */}
        <div className="flex justify-center gap-6 px-6 pb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-[11px] font-body tracking-[0.2em] uppercase transition-all duration-300 pb-1 border-b ${
                selectedCategory === cat
                  ? "text-foreground border-foreground"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((img, i) => (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="break-inside-avoid group cursor-pointer relative overflow-hidden"
                  onClick={() => openLightbox(i)}
                >
                  <div className="overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500 flex items-end">
                    <div className="p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="text-[10px] font-body tracking-[0.3em] uppercase text-background/80">
                        {img.category}
                      </p>
                      <p className="text-sm font-body text-background mt-1">
                        {img.alt}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[90] bg-foreground/95 flex items-center justify-center"
              onClick={closeLightbox}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 text-background/60 hover:text-background transition-colors z-10"
                aria-label="Close lightbox"
              >
                <X size={24} />
              </button>

              {/* Prev */}
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 sm:left-8 text-background/40 hover:text-background transition-colors z-10"
                aria-label="Previous image"
              >
                <ChevronLeft size={32} />
              </button>

              {/* Image */}
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                className="max-h-[85vh] max-w-[90vw] object-contain"
                onClick={(e) => e.stopPropagation()}
              />

              {/* Next */}
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 sm:right-8 text-background/40 hover:text-background transition-colors z-10"
                aria-label="Next image"
              >
                <ChevronRight size={32} />
              </button>

              {/* Caption */}
              <div className="absolute bottom-8 text-center">
                <p className="text-[10px] font-body tracking-[0.3em] uppercase text-background/40">
                  {filtered[lightboxIndex].category}
                </p>
                <p className="text-sm font-body text-background/70 mt-1">
                  {filtered[lightboxIndex].alt}
                </p>
                <p className="text-[10px] font-body text-background/30 mt-2">
                  {lightboxIndex + 1} / {filtered.length}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Lookbook;
