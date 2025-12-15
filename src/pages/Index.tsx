import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProjectShowcase from "@/components/ProjectShowcase";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Newsletter from "@/components/Newsletter";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WatchDemoModal from "@/components/WatchDemoModal";

const Index = () => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar onOpenDemo={() => setIsDemoOpen(true)} />
      <Hero onOpenDemo={() => setIsDemoOpen(true)} />
      <Features />
      <ProjectShowcase />
      <Testimonials />
      <ContactForm />
      <Newsletter />
      <CTA onOpenDemo={() => setIsDemoOpen(true)} />
      <Footer />
      <WatchDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </main>
  );
};

export default Index;
