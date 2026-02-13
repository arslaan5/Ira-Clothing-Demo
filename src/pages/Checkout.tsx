import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { CreditCard, Smartphone, Building2, Truck, ChevronRight, ShieldCheck, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

type PaymentMethod = "card" | "upi" | "netbanking" | "cod";

const paymentMethods: { id: PaymentMethod; label: string; icon: React.ReactNode; description: string }[] = [
  { id: "card", label: "Credit / Debit Card", icon: <CreditCard size={20} />, description: "Visa, Mastercard, RuPay" },
  { id: "upi", label: "UPI", icon: <Smartphone size={20} />, description: "Google Pay, PhonePe, Paytm" },
  { id: "netbanking", label: "Net Banking", icon: <Building2 size={20} />, description: "All major banks supported" },
  { id: "cod", label: "Cash on Delivery", icon: <Truck size={20} />, description: "Pay when you receive" },
];

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const shipping = totalPrice > 5000 ? 0 : 499;
  const tax = Math.round(totalPrice * 0.18);
  const grandTotal = totalPrice + shipping + tax;

  const handlePlaceOrder = () => {
    if (items.length === 0) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
      toast({ title: "Order placed successfully!", description: "Thank you for shopping with IRA." });
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <PageTransition>
        <main className="min-h-screen bg-background flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-md"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 rounded-full mx-auto mb-8 flex items-center justify-center"
              style={{ background: "var(--gradient-rose-soft)" }}
            >
              <ShieldCheck size={28} className="text-background" />
            </motion.div>
            <h1 className="font-display text-4xl font-light tracking-[0.15em] text-foreground mb-4">
              Order Confirmed
            </h1>
            <p className="text-sm font-body text-muted-foreground mb-2">
              Order #IRA-{Math.random().toString(36).substring(2, 8).toUpperCase()}
            </p>
            <p className="text-sm font-body text-muted-foreground mb-10">
              We'll send you a confirmation email with tracking details shortly.
            </p>
            <Link
              to="/shop"
              className="inline-block text-[11px] font-body tracking-[0.2em] uppercase border-b border-foreground pb-1 text-foreground hover:opacity-70 transition-opacity"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </main>
      </PageTransition>
    );
  }

  if (items.length === 0) {
    return (
      <PageTransition>
        <main className="min-h-screen bg-background flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="font-display text-4xl font-light tracking-[0.15em] text-foreground mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-sm font-body text-muted-foreground mb-10">
              Add some items to your cart to proceed with checkout.
            </p>
            <Link
              to="/shop"
              className="inline-block text-[11px] font-body tracking-[0.2em] uppercase border-b border-foreground pb-1 text-foreground hover:opacity-70 transition-opacity"
            >
              Browse Collection
            </Link>
          </div>
        </main>
        <Footer />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="pt-32 pb-12 px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl sm:text-5xl font-light tracking-[0.15em] text-foreground"
          >
            Checkout
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-16 h-[1px] mx-auto mt-5 origin-center"
            style={{ background: "var(--gradient-rose-soft)" }}
          />
        </section>

        <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-24">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left: Shipping + Payment */}
            <div className="lg:col-span-3 space-y-12">
              {/* Shipping info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-[11px] font-body tracking-[0.25em] uppercase text-foreground mb-6">
                  Shipping Details
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-3 bg-transparent border border-border text-sm font-body tracking-wide outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-3 bg-transparent border border-border text-sm font-body tracking-wide outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 bg-transparent border border-border text-sm font-body tracking-wide outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground sm:col-span-2"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 bg-transparent border border-border text-sm font-body tracking-wide outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground sm:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full px-4 py-3 bg-transparent border border-border text-sm font-body tracking-wide outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground sm:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full px-4 py-3 bg-transparent border border-border text-sm font-body tracking-wide outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
                  />
                  <input
                    type="text"
                    placeholder="PIN Code"
                    className="w-full px-4 py-3 bg-transparent border border-border text-sm font-body tracking-wide outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
                  />
                </div>
              </motion.div>

              {/* Payment method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-[11px] font-body tracking-[0.25em] uppercase text-foreground mb-6">
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <motion.button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      whileTap={{ scale: 0.995 }}
                      className={`w-full flex items-center gap-4 px-5 py-4 border transition-all duration-300 text-left ${
                        selectedPayment === method.id
                          ? "border-foreground bg-foreground/[0.02]"
                          : "border-border hover:border-foreground/30"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                          selectedPayment === method.id
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                        style={selectedPayment === method.id ? { background: "var(--gradient-rose-soft)" } : {}}
                      >
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-body tracking-wide text-foreground">{method.label}</p>
                        <p className="text-[11px] font-body text-muted-foreground mt-0.5">{method.description}</p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
                          selectedPayment === method.id ? "border-foreground" : "border-border"
                        }`}
                      >
                        <AnimatePresence>
                          {selectedPayment === method.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="w-2.5 h-2.5 rounded-full bg-foreground"
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Card fields */}
                <AnimatePresence>
                  {selectedPayment === "card" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-5 space-y-4">
                        <input
                          type="text"
                          placeholder="Card Number"
                          className="w-full px-4 py-3 bg-transparent border border-border text-sm font-body tracking-wide outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="MM / YY"
                            className="w-full px-4 py-3 bg-transparent border border-border text-sm font-body tracking-wide outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            className="w-full px-4 py-3 bg-transparent border border-border text-sm font-body tracking-wide outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Name on Card"
                          className="w-full px-4 py-3 bg-transparent border border-border text-sm font-body tracking-wide outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* UPI field */}
                <AnimatePresence>
                  {selectedPayment === "upi" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-5">
                        <input
                          type="text"
                          placeholder="Enter UPI ID (e.g. name@upi)"
                          className="w-full px-4 py-3 bg-transparent border border-border text-sm font-body tracking-wide outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Net Banking */}
                <AnimatePresence>
                  {selectedPayment === "netbanking" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-5">
                        <select className="w-full px-4 py-3 bg-transparent border border-border text-sm font-body tracking-wide outline-none focus:border-foreground transition-colors text-muted-foreground">
                          <option value="">Select your bank</option>
                          <option value="sbi">State Bank of India</option>
                          <option value="hdfc">HDFC Bank</option>
                          <option value="icici">ICICI Bank</option>
                          <option value="axis">Axis Bank</option>
                          <option value="kotak">Kotak Mahindra Bank</option>
                          <option value="pnb">Punjab National Bank</option>
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Right: Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="lg:sticky lg:top-28 border border-border p-6 sm:p-8">
                <h2 className="text-[11px] font-body tracking-[0.25em] uppercase text-foreground mb-6">
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-5 mb-8">
                  {items.map((item) => (
                    <div key={item.product.id + item.size + item.color} className="flex gap-4">
                      <div className="w-16 h-20 bg-secondary overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-body text-foreground truncate">{item.product.name}</p>
                        <p className="text-[11px] font-body text-muted-foreground mt-1">
                          {item.size} · {item.color} · Qty {item.quantity}
                        </p>
                        <p className="text-sm font-body text-foreground mt-1">
                          ₹{(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon */}
                <div className="flex gap-2 mb-8">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="flex-1 px-4 py-2.5 bg-transparent border border-border text-sm font-body tracking-wide outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground"
                  />
                  <button className="px-5 py-2.5 bg-foreground text-background text-[11px] font-body tracking-[0.15em] uppercase hover:opacity-90 transition-opacity">
                    Apply
                  </button>
                </div>

                {/* Totals */}
                <div className="space-y-3 border-t border-border pt-6 text-sm font-body">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax (GST 18%)</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-foreground font-medium pt-3 border-t border-border text-base">
                    <span>Total</span>
                    <span>₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Place order */}
                <motion.button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-8 py-4 bg-foreground text-background text-[11px] font-body tracking-[0.25em] uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {isProcessing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full"
                    />
                  ) : (
                    <>
                      Place Order <ChevronRight size={14} />
                    </>
                  )}
                </motion.button>

                {/* Security badge */}
                <div className="flex items-center justify-center gap-2 mt-5 text-muted-foreground">
                  <Lock size={12} />
                  <span className="text-[10px] font-body tracking-[0.15em] uppercase">
                    Secured by Razorpay
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Checkout;
