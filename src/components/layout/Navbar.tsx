'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Gamepad2, Menu, X, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Games', href: '#games' },
  { name: 'Tech', href: '#tech' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Process', href: '#process' },
  { name: 'Roadmap', href: '#roadmap' },
  { name: 'Devlog', href: '#news' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Section spy algorithm
      const sections = navLinks.map((link) => link.href.substring(1));
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const navOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08090D]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Studio Brand Logo */}
          <Link href="#home" onClick={(e) => scrollToSection(e, '#home')} className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E63946] to-[#FF2E4D] p-0.5 shadow-[0_0_15px_rgba(230,57,70,0.5)] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#08090D] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-[#E63946] transition-transform duration-300 group-hover:rotate-12" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider text-white flex items-center gap-1">
                REDVEGA <span className="text-[#E63946] font-bold">GAMES</span>
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest -mt-1 font-semibold">
                Adventure Awaits
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#10131C]/60 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-[#E63946] text-white shadow-[0_0_12px_rgba(230,57,70,0.4)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* CTA Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                const el = document.getElementById('games');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              icon={<Sparkles className="w-3.5 h-3.5" />}
            >
              Explore Games
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-[#10131C] text-slate-300 border border-white/10 hover:text-white hover:border-[#E63946]/40 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#08090D]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all duration-300 py-6 px-6">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="flex items-center justify-between py-3 px-4 rounded-xl text-base font-semibold text-slate-200 hover:text-white hover:bg-[#E63946]/15 hover:border hover:border-[#E63946]/30 transition-all"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-[#E63946]" />
              </a>
            ))}
            <div className="pt-4 border-t border-white/10">
              <Button
                fullWidth
                variant="primary"
                onClick={() => {
                  setMobileMenuOpen(false);
                  const el = document.getElementById('games');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Games
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
