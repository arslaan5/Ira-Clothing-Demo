import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import heroImage1 from "@/assets/hero-1.jpg";
import heroImage2 from "@/assets/hero-2.jpg";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { products } from "@/data/products";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";

const Index = () => {
  const newArrivals = products.filter((p) => p.isNew);
  const trending = products.filter((p) => p.isTrending);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <PageTransition>
      <main>
        {/* Hero Section — Full Viewport */}
        <section ref={heroRef} className="relative h-screen overflow-hidden">
          <motion.div
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 18, ease: "easeOut" }}
            style={{ y: heroY }}
            className="absolute inset-0"
          >
            <img
              src={heroImage1}
              alt="IRA Spring Summer 2026 Collection"
              className="w-full h-full object-cover"
            />
          </motion.div>
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0" style={{ background: "var(--gradient-dark-overlay)" }} />

          <motion.div
            style={{ opacity: heroOpacity }}
            className="relative h-full flex items-end pb-24 lg:pb-32 px-8 lg:px-16"
          >
            <div className="max-w-3xl">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="h-[1px] bg-background/50 mb-8"
              />
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-[11px] font-body tracking-[0.35em] uppercase text-background/70 mb-5"
              >
                Spring / Summer 2026
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="font-display text-6xl sm:text-7xl lg:text-[110px] font-light text-background leading-[0.9] tracking-wide"
              >
                Timeless
                <br />
                <span className="italic font-light">Elegance</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-sm font-body text-background/60 mt-6 max-w-md leading-relaxed font-light"
              >
                Discover a collection where craftsmanship meets contemporary grace.
                Each piece tells a story of refined beauty.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-10"
              >
                <Link
                  to="/shop"
                  className="btn-luxury inline-block border-2 border-background/80 text-background hover:bg-background hover:text-foreground"
                >
                  Explore Collection
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-8 bg-background/30"
            />
          </motion.div>
        </section>

        {/* Brand Statement */}
        <section className="py-28 lg:py-36">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="luxury-divider mb-10" />
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide leading-snug italic">
                "Where modern femininity meets timeless artistry —
                <br className="hidden sm:block" />
                designed for women who define elegance on their own terms."
              </h2>
              <div className="luxury-divider mt-10" />
            </motion.div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="max-w-7xl mx-auto px-8 lg:px-12 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4"
          >
            <div>
              <p className="luxury-label mb-3">Just In</p>
              <h2 className="luxury-heading text-4xl sm:text-5xl">New Arrivals</h2>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-xs font-body tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors duration-500 group"
            >
              View All
              <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform duration-500" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {newArrivals.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </section>

        {/* Editorial Banner */}
        <section className="relative overflow-hidden section-beige">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9 }}
                className="flex items-center px-8 lg:px-16 py-20 lg:py-0"
              >
                <div className="max-w-lg">
                  <div className="luxury-divider !mx-0 mb-8" />
                  <p className="luxury-label mb-6">The Edit</p>
                  <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-light tracking-wide leading-[1.05]">
                    Effortless
                    <br />
                    <span className="italic">Sophistication</span>
                  </h2>
                  <p className="font-body text-sm text-muted-foreground leading-[1.8] max-w-md mt-8 font-light">
                    Discover pieces designed for the modern woman who values both comfort and style.
                    Each garment is crafted with the finest materials and meticulous attention to detail,
                    creating a wardrobe that transcends fleeting trends.
                  </p>
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-3 text-xs font-body tracking-[0.2em] uppercase text-foreground hover:text-primary transition-colors duration-500 group mt-10"
                  >
                    Shop The Edit
                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1 }}
                className="relative min-h-[60vh] lg:min-h-0"
              >
                <img
                  src={heroImage2}
                  alt="Editorial lookbook"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trending / AI Curated */}
        <section className="max-w-7xl mx-auto px-8 lg:px-12 py-28 lg:py-36">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles size={14} className="text-primary" />
              <p className="luxury-label !text-primary">AI Curated For You</p>
              <Sparkles size={14} className="text-primary" />
            </div>
            <h2 className="luxury-heading text-4xl sm:text-5xl">Trending Now</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {trending.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              to="/shop"
              className="btn-luxury inline-block border-2 border-foreground text-foreground hover:bg-foreground hover:text-background"
            >
              View All Pieces
            </Link>
          </motion.div>
        </section>

        {/* Brand Values */}
        <section className="section-beige py-28 lg:py-32">
          <div className="max-w-6xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="luxury-divider mb-8" />
              <p className="luxury-label">Our Promise</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              {[
                { title: "Sustainably Crafted", desc: "Ethically sourced materials and conscious production methods that honor both artistry and the environment." },
                { title: "Timeless Design", desc: "Pieces that transcend seasons and trends, made to be cherished and worn for years to come." },
                { title: "Complimentary Styling", desc: "Personal styling advice from our expert team, ensuring every piece feels uniquely yours." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                >
                  <h3 className="font-display text-2xl tracking-wide mb-4 font-light">{item.title}</h3>
                  <p className="text-sm font-body text-muted-foreground leading-[1.8] font-light">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-28 lg:py-36">
          <div className="max-w-2xl mx-auto px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="luxury-label mb-4">Stay Connected</p>
              <h2 className="luxury-heading text-3xl sm:text-4xl mb-6">
                Join the IRA World
              </h2>
              <p className="text-sm font-body text-muted-foreground leading-relaxed mb-10 font-light">
                Be the first to discover new collections, exclusive events, and curated style inspiration.
              </p>
              <div className="flex max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-transparent border-b-2 border-border px-1 py-3 text-sm font-body placeholder:text-muted-foreground/50 focus:border-primary outline-none transition-colors duration-500"
                />
                <button className="border-b-2 border-foreground px-6 py-3 text-[11px] font-body tracking-[0.2em] uppercase hover:border-primary hover:text-primary transition-colors duration-500">
                  Subscribe
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
};

export default Index;
