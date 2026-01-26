import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { User, Globe, Shield, Code } from "lucide-react";

export default function About() {
  const highlights = [
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Cybersecurity",
    desc: "AI security, phishing detection, secure coding, and network security fundamentals."
  },
  {
    icon: <Globe className="w-6 h-6 text-primary" />,
    title: "Web Development",
    desc: "Modern web applications built with security-aware architecture and clean UX."
  },
  {
    icon: <Code className="w-6 h-6 text-primary" />,
    title: "Smart India Hackathon ( SIH )",
    desc: "Collaborated in a national-level hackathon to build a real-world solution under tight timelines, strengthening system design and problem-solving skills."
  }
];

  return (
    <section id="about" className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="container px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              About Me
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT: TEXT */}
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg text-foreground font-medium">
                I’m Prashant Kumbhar, a 3rd-year Computer Engineering student specializing in
                <span className="text-primary"> Cybersecurity</span>.
              </p>

              <p>
                My primary focus is on building <span className="text-foreground">secure, resilient systems </span>
                and understanding how real-world cyber threats operate. I enjoy working at the
                intersection of security, AI, and software engineering.
              </p>

              <p>
                I actively work on projects involving <span className="text-foreground">AI-driven threat detection</span>,
                phishing prevention, and security-aware application design. Alongside cybersecurity,
                I also build modern web applications with a strong emphasis on clean architecture,
                secure data handling, and performance.
              </p>

              <p>
                My goal is to grow into a <span className="text-foreground">Cybersecurity or Security Engineering role</span>,
                where I can contribute to application security, AI-based defense systems,
                and large-scale secure platforms.
              </p>
            </div>        
          
            {/* RIGHT: HIGHLIGHT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.slice(0, 2).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
            
            <Card className="h-full bg-background/50 border-white/5 hover:border-primary/50 transition-colors">
            <CardContent className="p-6 flex flex-col gap-3">
              <div className="p-3 bg-primary/10 w-fit rounded-lg">
                {item.icon}
              </div>
              <h3 className="font-display font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.desc}
              </p>
            </CardContent>
            </Card>
          </motion.div>
    ))}

          {/* THIRD CARD — FULL WIDTH */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="sm:col-span-2"
          >
          <Card className="h-full bg-background/50 border-white/5 hover:border-primary/50 transition-colors">
          <CardContent className="p-6 flex flex-col gap-3">
            <div className="p-3 bg-primary/10 w-fit rounded-lg">
              {highlights[2].icon}
            </div>
            <h3 className="font-display font-semibold text-foreground">
              {highlights[2].title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {highlights[2].desc}
            </p>
          </CardContent>
          </Card>
        </motion.div>
        </div>
      </div>
      </motion.div>
    </div>
    </section>
  );
}
