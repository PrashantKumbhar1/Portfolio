import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "TravelMate",
      subtitle: "Online Bus Booking System",
      description: "A comprehensive bus booking prototype with search, filters, seat selection, and secure payment flow. Features a modern, user-friendly interface.",
      tags: ["JavaScript", "HTML/CSS", "SQL", "UX Design"],
      link: "#",
      github: "#",
      featured: true
    },
    {
      title: "Gamified Learning Platform",
      subtitle: "Educational Tech Concept",
      description: "An engagement-focused platform for engineering students using challenges, levels, and rewards to gamify the learning process.",
      tags: ["React Concept", "Education", "Gamification"],
      link: "#",
      github: "#",
      featured: false
    },
    {
      title: "Algorithm Visualizer",
      subtitle: "Interactive Learning Tool",
      description: "Visualizing complex algorithms like sorting and pathfinding step-by-step to aid understanding of internal logic.",
      tags: ["JavaScript", "DSA", "Visualization"],
      link: "#",
      github: "#",
      featured: false
    }
  ];

  return (
    <section id="projects" className="py-24 bg-secondary/30">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full flex flex-col bg-card border-white/5 hover:border-primary/50 transition-all duration-300 overflow-hidden group">
                <div className="h-2 bg-gradient-to-r from-primary to-purple-600 w-full" />
                <CardHeader>
                  <CardTitle className="font-display text-xl text-foreground flex justify-between items-start">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {project.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-white/10 bg-white/5 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
