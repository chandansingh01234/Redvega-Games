import React from 'react';
import Link from 'next/link';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Users, Sparkles, Send, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function CareersPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#08090D] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-12">
        <SectionHeading
          badge="JOIN THE VANGUARD"
          title="Careers at Redvega Games"
          subtitle="We are currently an independent solo studio, but we are always open to collaborating with passionate 3D artists, sound designers, and beta testers."
        />

        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 space-y-6 text-left">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-[#E63946]" />
            <h2 className="text-xl font-bold text-white">Freelance & Contract Collaboration</h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            If you specialize in Unity C# performance profiling, low-poly 3D character modeling in Blender, sound effect synthesis, or community localization, feel free to send us your portfolio!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-[#10131C] border border-white/5 text-center">
              <span className="block text-xs font-bold text-[#E63946] mb-1">3D Environment Artist</span>
              <span className="text-[11px] text-slate-400">Blender / PBR Shaders</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#10131C] border border-white/5 text-center">
              <span className="block text-xs font-bold text-[#00F0FF] mb-1">SFX & Audio Composer</span>
              <span className="text-[11px] text-slate-400">Survival & Sci-Fi Audio</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#10131C] border border-white/5 text-center">
              <span className="block text-xs font-bold text-amber-400 mb-1">Community Beta Lead</span>
              <span className="text-[11px] text-slate-400">Discord & QA Testing</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Link href="/#contact">
            <Button size="lg" variant="primary" icon={<Send className="w-4 h-4" />}>
              Send Portfolio / CV
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="secondary" icon={<ArrowLeft className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
