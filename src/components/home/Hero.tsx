'use client';

import React from 'react';
import { Gamepad2, Sparkles, ChevronDown, Flame, ShieldCheck, Zap, Download } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  const scrollToGames = () => {
    const el = document.getElementById('games');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Ambient Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial from-[#E63946]/20 via-[#FF2E4D]/5 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-cyan-500/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Floating Interactive 3D Cyber Elements */}
      <div className="absolute top-28 left-8 lg:left-24 hidden md:block animate-float">
        <div className="glass-panel p-3.5 rounded-2xl border border-white/10 flex items-center gap-3 shadow-[0_0_20px_rgba(230,57,70,0.2)]">
          <div className="p-2 rounded-xl bg-[#E63946]/20 text-[#E63946]">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">UNITY ENGINE</div>
            <div className="text-[10px] text-slate-400">Universal Render Pipeline</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-32 right-8 lg:right-24 hidden md:block animate-float-slow">
        <div className="glass-panel p-3.5 rounded-2xl border border-[#00F0FF]/30 flex items-center gap-3 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">60Hz PHOTON SYNC</div>
            <div className="text-[10px] text-slate-400">Real-Time PvP Netcode</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Studio Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#10131C] border border-[#E63946]/40 text-[#E63946] text-xs font-bold uppercase tracking-widest mb-8 shadow-[0_0_20px_rgba(230,57,70,0.2)] animate-pulse">
          <Flame className="w-4 h-4 text-[#FF2E4D]" />
          <span>INDIE SOLO GAME DEVELOPMENT STUDIO</span>
        </div>

        {/* Hero Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
          Creating Unique <br className="hidden sm:inline" />
          <span className="text-gradient-red drop-shadow-[0_0_25px_rgba(230,57,70,0.4)]">
            Gaming Experiences
          </span>
        </h1>

        {/* Subheading */}
        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-10">
          Redvega Games is an independent game development studio creating immersive mobile and multiplayer games powered by Unity.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button
            size="lg"
            variant="primary"
            onClick={scrollToGames}
            icon={<Gamepad2 className="w-5 h-5" />}
            showArrow
          >
            Explore Games
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={scrollToContact}
          >
            Contact Studio
          </Button>
        </div>

        {/* Studio Live Achievement Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/10">
          <div className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-[#E63946]/30 transition-colors">
            <div className="text-2xl sm:text-3xl font-black text-white text-gradient-red">750,000+</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Total Downloads</div>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-[#E63946]/30 transition-colors">
            <div className="text-2xl sm:text-3xl font-black text-white">4.8 ★</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Average Rating</div>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-[#E63946]/30 transition-colors">
            <div className="text-2xl sm:text-3xl font-black text-white text-gradient-cyan">60 FPS</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Mobile Optimization</div>
          </div>
          <div className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-[#E63946]/30 transition-colors">
            <div className="text-2xl sm:text-3xl font-black text-white">2+ Titles</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Released & Active</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={scrollToGames}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-all animate-bounce"
            aria-label="Scroll down to games"
          >
            <ChevronDown className="w-6 h-6 text-[#E63946]" />
          </button>
        </div>
      </div>
    </section>
  );
};
