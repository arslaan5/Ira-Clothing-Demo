import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 pt-20 pb-12">
        {/* Top brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl tracking-[0.4em] font-light mb-4">IRA</h2>
          <p className="text-sm font-body text-background/40 max-w-md mx-auto leading-relaxed font-light">
            Timeless elegance meets modern sophistication.
            Curated luxury for the discerning woman.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Shop */}
          <div>
            <h3 className="text-[10px] font-body tracking-[0.25em] uppercase mb-5 text-background/30">Shop</h3>
            <ul className="space-y-3">
              {["New Arrivals", "Dresses", "Outerwear", "Knitwear", "Accessories"].map((item) => (
                <li key={item}>
                  <Link to="/shop" className="text-sm font-body text-background/50 hover:text-background transition-colors duration-500 font-light">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-[10px] font-body tracking-[0.25em] uppercase mb-5 text-background/30">Information</h3>
            <ul className="space-y-3">
              {["About Us", "Contact", "FAQ", "Shipping & Returns", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <Link to="/about" className="text-sm font-body text-background/50 hover:text-background transition-colors duration-500 font-light">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-[10px] font-body tracking-[0.25em] uppercase mb-5 text-background/30">Customer Care</h3>
            <ul className="space-y-3">
              {["Size Guide", "Order Tracking", "Returns", "Gift Cards", "Store Locator"].map((item) => (
                <li key={item}>
                  <Link to="/about" className="text-sm font-body text-background/50 hover:text-background transition-colors duration-500 font-light">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[10px] font-body tracking-[0.25em] uppercase mb-5 text-background/30">Newsletter</h3>
            <p className="text-sm font-body text-background/40 mb-5 font-light leading-relaxed">
              Subscribe for exclusive access to new collections and private offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent border-b border-background/15 px-0 py-2.5 text-sm font-body placeholder:text-background/25 focus:border-background/50 outline-none transition-colors duration-500 font-light"
              />
              <button className="border-b border-background/15 px-4 py-2.5 text-[10px] font-body tracking-[0.15em] uppercase text-background/50 hover:text-background transition-colors duration-500">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-background/8 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-body text-background/30 tracking-wide">© 2026 IRA. All rights reserved.</p>
          <div className="flex gap-8">
            {["Instagram", "Pinterest", "Twitter"].map((social) => (
              <a key={social} href="#" className="text-[10px] font-body text-background/30 hover:text-background transition-colors duration-500 tracking-wide">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
