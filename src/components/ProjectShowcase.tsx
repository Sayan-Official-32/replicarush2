import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Folder } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  category: string;
  link: string | null;
  featured: boolean | null;
}

const sampleProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "Modern online store with seamless checkout experience",
    image_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    category: "Web Development",
    link: "#",
    featured: true,
  },
  {
    id: "2",
    title: "Brand Identity",
    description: "Complete brand redesign for a tech startup",
    image_url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    category: "Branding",
    link: "#",
    featured: true,
  },
  {
    id: "3",
    title: "Mobile App UI",
    description: "Intuitive mobile banking application design",
    image_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    category: "UI/UX Design",
    link: "#",
    featured: true,
  },
  {
    id: "4",
    title: "SaaS Dashboard",
    description: "Analytics dashboard with real-time data visualization",
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    category: "Web Development",
    link: "#",
    featured: false,
  },
  {
    id: "5",
    title: "Marketing Campaign",
    description: "Digital marketing strategy and execution",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    category: "Marketing",
    link: "#",
    featured: false,
  },
  {
    id: "6",
    title: "Corporate Website",
    description: "Professional website for a consulting firm",
    image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    category: "Web Development",
    link: "#",
    featured: false,
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative rounded-2xl overflow-hidden glass"
    >
      <div className="aspect-[4/3] overflow-hidden">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <Folder className="w-16 h-16 text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/20 text-primary mb-3">
          {project.category}
        </span>
        <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          {project.description}
        </p>
        {project.link && (
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors"
            whileHover={{ x: 5 }}
          >
            View Project
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

const ProjectShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState<Project[]>(sampleProjects);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        setProjects(data);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Folder className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Our Portfolio</span>
          </motion.div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Featured </span>
            <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our latest work and see how we've helped businesses transform their digital presence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
