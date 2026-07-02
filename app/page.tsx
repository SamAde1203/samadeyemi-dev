"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Metrics from "@/components/Metrics";
import Projects from "@/components/Projects";
import Publications from "@/components/Publications";
import Highlights from "@/components/Highlights";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Metrics />
      <Projects />
      <Publications />
      <Highlights />
      <Contact />
    </main>
  );
}
