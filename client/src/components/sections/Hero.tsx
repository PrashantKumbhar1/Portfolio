import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { useRef } from "react";

const heroBg = "/hero-bg.png";
const profileImg = "/profile.png";

export default function Hero() {
  const imageRef = useRef<HTMLDivElement | null>(null);

  // Parallax scroll
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section id="hero" className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/95 to-background" />
      <div className="absolute inset-0 cyber-grid opacity-20" />

      <div className="container relative z-10 px-6">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center min-h-[80vh]">

          {/* LEFT — TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                Cybersecurity Engineer
              </span>
              <br />
              Building Secure <br /> Web & AI Systems
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
              3rd-year Computer Engineering student specializing in Cybersecurity.
              I work on AI-driven threat detection, phishing prevention, and
              security-aware web applications with a strong focus on real-world defense.
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <Button size="lg" className="bg-primary text-background font-semibold" asChild>
                <a href="#projects">
                  View Projects <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>

              <Button size="lg" variant="outline" className="border-white/20" asChild>
                <a href="#contact">Contact Me</a>
              </Button>
            </div>

            <p className="text-muted-foreground font-mono tracking-wide">
              AI Security · Phishing Detection · Secure Systems · Web Security
            </p>

            <div className="mt-6 flex gap-4">
              <a
                href="https://github.com/PrashantKumbhar1"
                target="_blank"
                className="icon-btn"
              >
                <Github />
              </a>
              <a
                href="https://www.linkedin.com/in/prashant-kumbhar-784920356/"
                target="_blank"
                className="icon-btn"
              >
                <Linkedin />
              </a>
            </div>
          </motion.div>

          {/* RIGHT — IMAGE */}
          <motion.div
            ref={imageRef}
            style={{ y }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="
              flex justify-center
              lg:justify-end
              translate-x-0
              translate-y-0
              lg:translate-x-[-180px]
              lg:translate-y-[-70px]
            "
          >
            {/* FLOATING IMAGE */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[280px] md:w-[320px] flex flex-col items-center"
            >
              <img
                src={profileImg}
                alt="Prashant Kumbhar"
                className="
                  w-full
                  h-auto
                  rounded-2xl
                  object-cover
                  border border-primary/35
                  shadow-xl
                "
              />

              <p
                className="
                  mt-4
                  text-center
                  text-primary
                  font-mono
                  text-base md:text-lg
                  tracking-widest
                  whitespace-normal
                  sm:whitespace-nowrap
                "
              >
                HELLO, I’M PRASHANT KUMBHAR
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
