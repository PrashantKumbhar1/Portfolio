import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function Skills() {
  const skills = {
    "Cybersecurity & AI Security": [
      "AI-based phishing detection",
      "Threat analysis & Security intelligence",
      "Web application security (OWASP Top 10)",
      "Network security fundamentals",
      "Cryptography & Authentication concepts",
      "Linux (Kali / Ubuntu for security workflows)",
      "Security tools exposure: Wireshark, Nmap, Burp Suite"
    ],
    "Programming & Core Development": [
      "JavaScript",
      "TypeScript",
      "Python",
      "SQL",
      "C",
      "Data Structures & Algorithms"
    ],
    "Web & System Development": [
      "HTML5",
      "CSS3",
      "React",
      "Node.js",
      "Express",
      "Tailwind CSS",
      "Secure API design fundamentals"
    ],
    "Tools & Platforms": [
      "Git",
      "GitHub",
      "VS Code",
      "Browser DevTools",
      "Postman"
    ],
    "Computer Science Foundations": [
      "Operating Systems",
      "Computer Networks",
      "DBMS",
      "Software Engineering fundamentals",
      "Quantum Computing basics (academic exposure)"
    ]
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Technical Skills
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Object.entries(skills).map(([category, items], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.08,
                duration: 0.45,
                ease: "easeOut"
              }}
              whileHover={{ y: -4 }}
              className={`bg-card/50 border border-white/5 p-6 rounded-xl
                hover:border-primary/40 transition-all group
                ${index === 0 ? "lg:col-span-2" : ""}`}
            >
              <h3 className="text-xl font-display font-semibold mb-6 text-primary group-hover:text-glow transition-all">
                {category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-secondary/50 py-1.5 px-3
                      hover:bg-primary/15 hover:text-primary
                      transition-colors cursor-default"
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
