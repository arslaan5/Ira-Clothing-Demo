import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="pt-[73px]">
      <section className="min-h-[80vh] flex items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl tracking-[0.3em]">IRA</h1>
            <p className="font-body text-sm text-muted-foreground mt-2">
              {isLogin ? "Welcome back" : "Create your account"}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              {!isLogin && (
                <div>
                  <label className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground">Full Name</label>
                  <input
                    type="text"
                    className="w-full mt-2 bg-transparent border-b border-border py-2 text-sm font-body outline-none focus:border-foreground transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
              )}
              <div>
                <label className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground">Email</label>
                <input
                  type="email"
                  className="w-full mt-2 bg-transparent border-b border-border py-2 text-sm font-body outline-none focus:border-foreground transition-colors"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="text-xs font-body tracking-[0.1em] uppercase text-muted-foreground">Password</label>
                <input
                  type="password"
                  className="w-full mt-2 bg-transparent border-b border-border py-2 text-sm font-body outline-none focus:border-foreground transition-colors"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="btn-luxury w-full bg-foreground text-background mt-4"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </motion.form>
          </AnimatePresence>

          <p className="text-center text-sm font-body text-muted-foreground mt-8">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-foreground underline hover:text-primary transition-colors"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
};

export default Login;
