import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Academics from "@/components/sections/Academics";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Academics />
        <Experience />
        <Contact />
      </main>
      <footer className="py-8 text-center text-muted-foreground text-sm border-t border-white/5 bg-background">
        <p>© {new Date().getFullYear()} Prashant Kumbhar. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
}
