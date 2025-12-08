import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

export default function Academics() {
  return (
    <section id="academics" className="py-24 relative">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Academics</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Main Degree Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-card to-card/50 border border-white/10 p-8 rounded-2xl mb-12 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <GraduationCap className="w-32 h-32" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-display font-bold text-primary mb-2">Bachelor of Technology</h3>
              <p className="text-xl text-foreground mb-4">Computer Engineering (Cybersecurity)</p>
              <p className="text-muted-foreground mb-6">Currently in 3rd Year (TE) at Pillai College of Engineering, New Panvel</p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                  <span className="text-sm text-muted-foreground block mb-1">Overall CGPA</span>
                  <span className="text-3xl font-mono font-bold text-primary">9.0<span className="text-lg text-muted-foreground">/10</span></span>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                   <span className="text-sm text-muted-foreground block mb-1">Latest SGPA</span>
                   <span className="text-3xl font-mono font-bold text-purple-400">10.0<span className="text-lg text-muted-foreground">/10</span></span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Detailed Scores */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" /> Performance History
            </h4>
            
            <div className="grid gap-4">
              {[
                { label: "SE - Semester IV", score: "10.0 SGPA" },
                { label: "SE - Semester III", score: "9.0 SGPA" },
                { label: "FE Aggregate", score: "8.7 / 10" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center p-4 bg-secondary/30 rounded-lg border border-white/5 hover:border-primary/20 transition-colors"
                >
                  <span className="font-medium text-foreground">{item.label}</span>
                  <span className="font-mono text-primary">{item.score}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
