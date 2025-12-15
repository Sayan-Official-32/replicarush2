import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const emailSchema = z.string().trim().email("Please enter a valid email address");

const Newsletter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0]?.message || "Invalid email");
      return;
    }

    setIsSubmitting(true);
    
    const { error: dbError } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email: result.data }]);

    if (dbError) {
      if (dbError.code === "23505") {
        toast({
          title: "Already Subscribed",
          description: "This email is already on our list!",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to subscribe. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      setIsSubscribed(true);
      toast({
        title: "Subscribed!",
        description: "Welcome to our newsletter!",
      });
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
    
    setIsSubmitting(false);
  };

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center glass p-12 rounded-3xl relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6"
            >
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">
              <span className="text-foreground">Stay </span>
              <span className="text-gradient">Updated</span>
            </h3>
            
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Get the latest news, tips, and exclusive offers delivered straight to your inbox.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-card/50 border-border h-12 w-full"
                />
                {error && <p className="text-destructive text-sm mt-1 text-left">{error}</p>}
              </div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold px-8 h-12 rounded-full glow-button whitespace-nowrap"
                >
                  {isSubmitting ? (
                    "..."
                  ) : isSubscribed ? (
                    <>
                      <CheckCircle className="mr-2 w-5 h-5" />
                      Done!
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 w-5 h-5" />
                      Subscribe
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
