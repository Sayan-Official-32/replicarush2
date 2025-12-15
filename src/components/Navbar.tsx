import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
  { name: "Projects", href: "#projects" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact-form" },
];

interface NavbarProps {
  onOpenDemo?: () => void;
}

const Navbar = ({ onOpenDemo }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleAuthAction = async () => {
    if (user) {
      await signOut();
    } else {
      navigate("/auth");
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="font-display font-bold text-primary-foreground text-xl">A</span>
            </div>
            <span className="font-display font-bold text-xl text-foreground">agency.io</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="relative text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3 }}
                whileHover={{ y: -2 }}
              >
                {link.name}
                <motion.span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Auth & CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="hidden md:flex items-center gap-3"
          >
            {user && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full glass text-sm">
                <User className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">{user.email?.split("@")[0]}</span>
              </div>
            )}
            <Button
              variant="outline"
              onClick={handleAuthAction}
              className="border-border bg-transparent text-foreground hover:bg-muted font-medium rounded-full px-4"
            >
              {user ? (
                <>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </>
              )}
            </Button>
            <Button 
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold px-6 py-2 rounded-full glow-button hover:scale-105 transition-transform duration-300"
            >
              Get Started
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium py-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
                {user && (
                  <div className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4 text-primary" />
                    <span>{user.email}</span>
                  </div>
                )}
                <Button
                  variant="outline"
                  onClick={handleAuthAction}
                  className="border-border bg-transparent text-foreground hover:bg-muted font-medium rounded-full"
                >
                  {user ? "Logout" : "Login"}
                </Button>
                <Button 
                  onClick={() => navigate("/auth")}
                  className="bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold px-6 py-2 rounded-full mt-2"
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
