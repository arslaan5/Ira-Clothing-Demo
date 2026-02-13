import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <main className="pt-[73px]">
      <section className="section-beige py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="font-display text-4xl sm:text-5xl font-light tracking-wide">About IRA</h1>
          <p className="font-body text-sm text-muted-foreground mt-3 max-w-lg mx-auto leading-relaxed">
            Where timeless elegance meets modern craftsmanship
          </p>
        </motion.div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 space-y-12">
        {[
          {
            title: "Our Story",
            text: "Founded with a vision to redefine luxury fashion, IRA creates pieces that speak to the modern woman. Every garment is a testament to our commitment to quality, sustainability, and timeless design.",
          },
          {
            title: "Craftsmanship",
            text: "We partner with skilled artisans and source only the finest materials from ethical suppliers around the world. Each piece is designed to be treasured for years, not just seasons.",
          },
          {
            title: "Sustainability",
            text: "At IRA, sustainability isn't an afterthought — it's woven into every decision. From our eco-conscious packaging to our responsible production practices, we're committed to a better future.",
          },
        ].map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <h2 className="font-display text-2xl tracking-wide mb-4">{section.title}</h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">{section.text}</p>
          </motion.div>
        ))}
      </section>

      <section className="section-beige py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl tracking-wide mb-6">Get In Touch</h2>
          <p className="font-body text-sm text-muted-foreground mb-2">support@irafashion.com</p>
          <p className="font-body text-sm text-muted-foreground">+91 98765 43210</p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
