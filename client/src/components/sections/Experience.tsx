import { motion } from "framer-motion";
import { Briefcase, Code, Terminal } from "lucide-react";

export default function Experience() {
  const milestones = [
    {
      role: "SDE Intern",
      company: "Bluestock Fintech",
      period: "Remote Internship",
      description: "Contributed to financial market tools, improving user experience and implementing secure coding practices in a fintech environment.",
      icon: <Briefcase className="w-5 h-5" />,
      current: true
    },
    {
      role: "TravelMate Prototype",
      company: "Academic Project",
      period: "2024",
      description: "Designed and developed a full-featured bus booking system prototype, focusing on complex state management and UI/UX.",
      icon: <Code className="w-5 h-5" />,
      current: false
    },
    {
      role: "Started B.Tech",
      company: "Computer Engineering",
      period: "2023",
      description: "Began journey in Computer Science with a specialization in Cybersecurity. Building strong foundations in algorithms and networking.",
      icon: <Terminal className="w-5 h-5" />,
      current: false
    }
  ];

  return (
    <section id="experience" className="py-24 bg-secondary/30">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Experience & Milestones</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

          <div className="space-y-12">
            {milestones.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10 -translate-x-1/2">
                  <div className="text-primary">{item.icon}</div>
                </div>

                <div className="ml-12 md:ml-0 md:w-1/2">
                  <div className={`p-6 bg-card border border-white/5 rounded-xl hover:border-primary/30 transition-colors ${
                    index % 2 === 0 ? "md:text-left" : "md:text-right"
                  }`}>
                    <span className="text-sm font-mono text-primary mb-2 block">{item.period}</span>
                    <h3 className="text-xl font-display font-bold text-foreground">{item.role}</h3>
                    <h4 className="text-muted-foreground font-medium mb-4">{item.company}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
                
                {/* Empty space for the other side */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
