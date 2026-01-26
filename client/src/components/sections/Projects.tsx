import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ShieldCheck } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "AI-Phishing-Guard",
      subtitle: "AI-Based Phishing Detection System",
      description:
        "An intelligent cybersecurity system that detects phishing attempts using machine learning. It analyzes URLs and message patterns to identify malicious behavior, focusing on real-world attack scenarios and proactive cyber defense.",
      tags: ["Cybersecurity", "Machine Learning", "Phishing Detection", "AI Security"],
      featured: true,
      securityFocus: true
    },
    {
      title: "CivicLens-AI",
      subtitle: "AI-Powered Civic Issue Reporting & Urban Intelligence Platform",
      description:
        "CivicLens-AI is a smart civic platform that lets citizens report city issues using images and location data. It uses AI to analyze complaints, detect severity and duplicates, and help authorities prioritize and resolve issues faster through dashboards, maps, and analytics.",
      tags: ["AI", "React", "Node.js", "MongoDB", "Threat Intelligence"],
      featured: true
    },
    {
      title: "TravelMate",
      subtitle: "Online Bus Booking Platform",
      description:
        "A full-stack web application for online bus booking with search, filters, seat selection, and a smooth booking flow. Built with strong emphasis on UI/UX, clean architecture, and secure data handling.",
      tags: ["JavaScript", "HTML", "CSS", "SQL", "UI/UX"],
      featured: false
    },
    {
      title: "Gamified Learning Platform",
      subtitle: "Education Technology Concept",
      description:
        "A conceptual learning platform designed to increase student engagement using challenges, rewards, and leaderboards, focusing on product thinking and scalable feature design.",
      tags: ["React Concept", "Gamification", "Education"],
      featured: false
    }
  ];

  return (
    <section id="projects" className="py-24 bg-secondary/30">
      <div className="container px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Projects
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Selected projects showcasing my focus on Cybersecurity, AI-driven Systems,
            and Secure Software Development.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              whileHover={{ y: -8, scale: 1.01 }}
            >
              <Card
                className={`relative h-full flex flex-col bg-card border-white/5 overflow-hidden
                transition-all duration-300
                hover:border-primary/50 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.4)]
                ${project.featured ? "ring-1 ring-primary/30" : ""}`}
              >
                {/* Accent line */}
                <div className="h-1.5 bg-gradient-to-r from-primary to-purple-600 w-full group-hover:opacity-100" />

                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CardTitle className="font-display text-xl text-foreground">
                      {project.title}
                    </CardTitle>

                    {project.securityFocus && (
                      <Badge className="bg-primary/15 text-primary border border-primary/40 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Security Focus
                      </Badge>
                    )}
                  </div>

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
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-white/10 bg-white/5 text-xs"
                      >
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
