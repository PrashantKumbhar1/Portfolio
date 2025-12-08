import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { User, Globe, Shield, Code } from "lucide-react";

export default function About() {
  const highlights = [
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Cybersecurity",
      desc: "Network security, secure coding, and ethical hacking fundamentals."
    },
    {
      icon: <Globe className="w-6 h-6 text-primary" />,
      title: "Web Development",
      desc: "Full-stack web apps with modern frameworks and clean UX."
    },
    {
      icon: <User className="w-6 h-6 text-primary" />,
      title: "Student",
      desc: "3rd Year B.Tech Computer Engineering @ Pillai College of Engineering."
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
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg text-foreground font-medium">
                Hello! I'm Prashant Kumbhar, a Computer Engineering student from India.
              </p>
              <p>
                I specialize in <span className="text-primary">Cybersecurity</span> and software development. 
                My primary focus is on building resilient systems, understanding vulnerability assessments, 
                and implementing secure coding practices.
              </p>
              <p>
                Currently, I'm deepening my knowledge in network security, ethical hacking, and 
                cryptography while maintaining a strong foundation in modern web development.
              </p>
              <p>
                My goal is to evolve into a Cybersecurity Expert who can bridge the gap between 
                development velocity and robust security posture.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-background/50 border-white/5 hover:border-primary/50 transition-colors">
                    <CardContent className="p-6 flex flex-col gap-3">
                      <div className="p-3 bg-primary/10 w-fit rounded-lg">
                        {item.icon}
                      </div>
                      <h3 className="font-display font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
