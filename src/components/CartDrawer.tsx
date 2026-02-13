import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background border-l border-border shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h2 className="font-display text-xl tracking-wide">Shopping Bag</h2>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-muted-foreground/30 mb-4" />
                  <p className="font-display text-lg text-muted-foreground">Your bag is empty</p>
                  <p className="text-sm text-muted-foreground mt-1 font-body">Discover our latest collection</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.product.id + item.size + item.color}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4"
                    >
                      <div className="w-20 h-24 bg-secondary rounded overflow-hidden flex-shrink-0">
                        <div className="w-full h-full bg-muted shimmer" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-sm truncate">{item.product.name}</h3>
                        <p className="text-xs text-muted-foreground font-body mt-1">
                          {item.size} · {item.color}
                        </p>
                        <p className="text-sm font-body mt-1">₹{item.product.price.toLocaleString()}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 border border-border rounded-full flex items-center justify-center hover:border-foreground transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-body w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 border border-border rounded-full flex items-center justify-center hover:border-foreground transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="ml-auto text-xs text-muted-foreground hover:text-foreground font-body underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border px-6 py-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-body text-muted-foreground">Subtotal</span>
                  <span className="font-display text-lg">₹{totalPrice.toLocaleString()}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setIsOpen(false)}
                  className="btn-luxury block w-full text-center bg-foreground text-background hover:bg-foreground/90"
                >
                  Checkout
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center text-xs font-body text-muted-foreground hover:text-foreground tracking-[0.15em] uppercase transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
