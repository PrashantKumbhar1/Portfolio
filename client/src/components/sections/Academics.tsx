import { motion } from "framer-motion";
import { Award, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

export default function Academics() {
  const [showLogo, setShowLogo] = useState(false);

  // Auto flip every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowLogo(prev => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="academics" className="py-24 relative">
      <div className="container px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Academics
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Academic performance and coursework supporting my foundation in
            computer engineering and cybersecurity.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-16">
          {/* Degree Card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // premium easing
            className="relative bg-card/70 border border-white/10 rounded-2xl p-8 overflow-hidden
                       hover:border-primary/40 transition-all"
          >
            {/* AUTO FLIP COLLEGE ICON */}
            <div className="absolute top-6 right-6 w-20 h-20 flip-container">
              <div
                className="flip-card rounded-xl border border-primary/30 shadow-lg"
                style={{
                  transform: showLogo ? "rotateY(180deg)" : "rotateY(0deg)"
                }}
              >
                {/* FRONT — College Image */}
                <div className="flip-face overflow-hidden rounded-xl bg-black">
                  <img
                    src="/pillai-college.jpg"
                    alt="Pillai College Campus"
                    className="w-full h-full object-cover brightness-110 contrast-105"
                  />
                </div>

                {/* BACK — College Logo */}
                <div className="flip-face flip-back flex items-center justify-center rounded-xl bg-card">
                  <img
                    src="/pillai-logo.png"
                    alt="Pillai College Logo"
                    className="w-20 h-20 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-display font-bold text-foreground">
                  Bachelor of Technology
                </h3>
              </div>

              <p className="text-lg text-primary font-medium mb-1">
                Computer Engineering (Cybersecurity)
              </p>
              <p className="text-muted-foreground mb-6">
                3rd Year (TE) · Pillai College of Engineering, New Panvel
              </p>

              {/* CGPA / SGPA */}
              <div className="grid sm:grid-cols-2 gap-6 mt-6">
                <div className="bg-secondary/30 border border-white/5 rounded-xl p-5 hover:border-primary/30 transition-colors">
                  <span className="text-sm text-muted-foreground block mb-1">
                    Overall CGPA
                  </span>
                  <span className="text-3xl font-mono font-bold text-primary">
                    9.0
                    <span className="text-lg text-muted-foreground"> / 10</span>
                  </span>
                </div>

                <div className="bg-secondary/30 border border-white/5 rounded-xl p-5 hover:border-purple-400/30 transition-colors">
                  <span className="text-sm text-muted-foreground block mb-1">
                    Latest SGPA
                  </span>
                  <span className="text-3xl font-mono font-bold text-purple-400">
                    10.0
                    <span className="text-lg text-muted-foreground"> / 10</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Performance History */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-primary" />
              <h4 className="text-lg font-semibold text-foreground">
                Academic Performance
              </h4>
            </div>

            <div className="space-y-4">
              {[
                { label: "SE – Semester IV", score: "10.0 SGPA" },
                { label: "SE – Semester III", score: "9.0 SGPA" },
                { label: "FE Aggregate", score: "8.7 / 10" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.45, ease: "easeOut" }}
                  className="flex justify-between items-center
                             bg-secondary/30 border border-white/5 rounded-lg px-5 py-4
                             hover:border-primary/30 transition-all"
                >
                  <span className="font-medium text-foreground">
                    {item.label}
                  </span>
                  <span className="font-mono text-primary">
                    {item.score}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
