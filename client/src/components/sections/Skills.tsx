import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function Skills() {
  const skills = {
    "Languages": ["JavaScript", "Python", "C", "SQL", "Java (Basics)"],
    "Web Technologies": ["HTML5", "CSS3", "React", "Node.js (Basic)", "Express", "Tailwind CSS"],
    "Cybersecurity": ["Network Security", "OWASP Top 10", "Cryptography Basics", "Wireshark", "Burp Suite", "Nmap"],
    "Tools & Platforms": ["Git", "GitHub", "VS Code", "Linux (Kali/Ubuntu)", "Postman"],
    "CS Fundamentals": ["Data Structures", "Algorithms", "DBMS", "OS", "Computer Networks"]
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Technical Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Object.entries(skills).map(([category, items], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card/50 border border-white/5 p-6 rounded-xl hover:border-primary/30 transition-all group"
            >
              <h3 className="text-xl font-display font-semibold mb-6 text-primary group-hover:text-glow transition-all">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-colors py-1.5 px-3"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
