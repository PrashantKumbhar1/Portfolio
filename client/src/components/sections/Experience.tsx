import { motion } from "framer-motion";
import { ShieldCheck, Brain, Code, Terminal } from "lucide-react";

export default function Experience() {
  const milestones = [
    {
      title: "AI-Phishing-Guard",
      type: "Project",
      period: "2025",
      icon: <ShieldCheck className="w-5 h-5" />,
      overview:
        "An intelligent system designed to detect phishing attempts using machine learning techniques and real-world threat patterns.",
      impact: {
        problem:
          "Phishing attacks continue to be one of the most common and effective entry points for security breaches.",
        approach:
          "Designed a detection pipeline focusing on URL features, message patterns, and behavior-based indicators.",
        outcome:
          "Strengthened understanding of threat modeling, feature engineering, and building security-aware systems."
      },
      highlight: true
    },
    {
      title: "CivicLens-AI",
      type: "Project",
      period: "2025",
      icon: <Brain className="w-5 h-5" />,
      overview:
        "An AI-driven platform to analyze civic complaints, identify duplicates, assess severity, and highlight abnormal patterns.",
      impact: {
        problem:
          "Manual handling of civic complaints leads to delays, duplication, and missed critical issues.",
        approach:
          "Built an AI-assisted workflow combining text analysis, classification, and prioritization logic.",
        outcome:
          "Gained experience in designing scalable data pipelines and AI-assisted decision systems."
      },
      highlight: true
    },
    {
      title: "TravelMate",
      type: "Academic Project",
      period: "2024",
      icon: <Code className="w-5 h-5" />,
      overview:
        "A full-stack bus booking system prototype with search, filtering, seat selection, and booking flow.",
      impact: {
        problem:
          "Traditional booking flows often suffer from poor UX and complex state handling.",
        approach:
          "Designed a modular frontend with clear state management and a focus on usability.",
        outcome:
          "Improved skills in UI/UX design, frontend architecture, and secure data handling."
      },
      highlight: true
    },
    {
      title: "B.Tech in Computer Engineering",
      type: "Academic Journey",
      period: "2023 – Present",
      icon: <Terminal className="w-5 h-5" />,
      overview:
        "Formal education focused on building a strong engineering foundation and system-level thinking.",
      focusAreas: [
        "Core computer science subjects (DSA, OS, DBMS, Computer Networks)",
        "Understanding how real-world systems are designed and scaled",
        "Applying theoretical concepts through hands-on projects",
        "Developing disciplined problem-solving and analytical thinking"
      ],
      highlight: true
    }
  ];

  return (
    <section id="experience" className="py-24 bg-secondary/30">
      <div className="container px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Experience & Milestones
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Key projects and milestones that highlight my progression from learning fundamentals to building impactful systems.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />

          <div className="space-y-16">
            {milestones.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className={`relative flex flex-col md:flex-row gap-10 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute left-0 md:left-1/2 top-2 w-9 h-9 rounded-full
                    bg-background border-2 flex items-center justify-center z-10
                    -translate-x-1/2
                    ${
                      item.highlight
                        ? "border-primary shadow-[0_0_20px_rgba(59,130,246,0.45)]"
                        : "border-white/30"
                    }`}
                >
                  <span className="text-primary">{item.icon}</span>
                </div>

                {/* Card */}
                <div className="ml-12 md:ml-0 md:w-1/2">
                  <div
                    className={`p-6 bg-card border border-white/5 rounded-xl
                      hover:border-primary/40 transition-all`}
                  >
                    <span className="text-sm font-mono text-primary block mb-2">
                      {item.period}
                    </span>

                    <h3 className="text-xl font-display font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.type}
                    </p>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {item.overview}
                    </p>

                  {/* Impact Strip */}
                  {item.impact ? (
                    <div className="space-y-3 border-l-2 border-primary/20 pl-4">
                    <p className="text-sm">
                      <span className="text-primary font-medium">Problem:</span>{" "}
                      <span className="text-muted-foreground">{item.impact.problem}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-primary font-medium">Approach:</span>{" "}
                      <span className="text-muted-foreground">{item.impact.approach}</span>
                    </p>
                    <p className="text-sm">
                      <span className="text-primary font-medium">Outcome:</span>{" "}
                      <span className="text-muted-foreground">{item.impact.outcome}</span>
                    </p>
                  </div>
              ) : (
                  <div className="space-y-2 border-l-2 border-primary/20 pl-4">
                    <p className="text-sm text-primary font-medium">Focus Areas:</p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {item.focusAreas?.map((area, idx) => (
                          <li key={idx}>{area}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  </div>
                </div>

                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
