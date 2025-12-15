import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Designer",
    company: "Design Co.",
    content: "The animations are absolutely stunning. Our conversion rate increased by 40% after implementing this framework. Highly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Mike Chen",
    role: "CEO",
    company: "TechStartup",
    content: "Smooth, professional, and incredibly fast. This is exactly what we needed to take our product to the next level. Outstanding work!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Emma Rodriguez",
    role: "Frontend Developer",
    company: "WebAgency",
    content: "Best animation framework I've ever used. The code quality is exceptional and the documentation is clear. A joy to work with!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "David Smith",
    role: "Creative Director",
    company: "Creative Studio",
    content: "Our clients are amazed by the results. The attention to detail and smooth transitions make all the difference. Simply brilliant!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
];

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -100 : 100 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group"
    >
      <div className="relative p-8 rounded-2xl glass card-hover">
        {/* Quote Icon */}
        <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity">
          <Quote className="w-12 h-12 text-primary" />
        </div>

        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ delay: index * 0.15 + i * 0.05 + 0.3 }}
            >
              <Star className="w-5 h-5 fill-primary text-primary" />
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <p className="text-foreground text-lg leading-relaxed mb-6">
          "{testimonial.content}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-4">
          <motion.img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/30"
            whileHover={{ scale: 1.1 }}
          />
          <div>
            <div className="font-display font-semibold text-foreground">
              {testimonial.name}
            </div>
            <div className="text-sm text-muted-foreground">
              {testimonial.role}, {testimonial.company}
            </div>
          </div>
        </div>

        {/* Gradient Border Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-blob w-80 h-80 bg-secondary/15 top-0 left-1/3 animate-float" />
        <div className="floating-blob w-60 h-60 bg-accent/15 bottom-0 right-1/4 animate-float" style={{ animationDelay: "-8s" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
          >
            Testimonials
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Loved by </span>
            <span className="text-gradient">Designers & Developers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied creators who have transformed their 
            projects with our animation framework.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
