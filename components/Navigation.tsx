"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, FileText } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Metrics", href: "#metrics" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#publications" },
  { label: "Highlights", href: "#highlights" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <Image
            src="/logo.png"
            alt="Sam Adeyemi Logo"
            width={36}
            height={36}
            className="object-contain"
            priority
          />
          <span className="text-sm text-gray-400 hidden sm:inline-block group-hover:text-cyan-300 transition-colors">
            Sam Adeyemi
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-gray-400 hover:text-cyan-300 transition-colors whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/Sam_Adeyemi_CV.pdf"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-all text-sm font-medium border border-cyan-500/20 whitespace-nowrap"
            download
          >
            <FileText size={16} />
            CV
          </a>
        </div>

        <button
          className="md:hidden text-gray-400 hover:text-cyan-300 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-gray-400 hover:text-cyan-300 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/Sam_Adeyemi_CV.pdf"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-all text-sm font-medium border border-cyan-500/20 w-fit"
            download
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FileText size={16} />
            Download CV
          </a>
        </div>
      )}
    </header>
  );
}