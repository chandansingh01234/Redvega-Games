'use client';

import React from 'react';
import techData from '../../data/tech.json';
import { Technology } from '../../types';
import { SectionHeading } from '../ui/SectionHeading';
import { Gamepad2, Code2, Wifi, Boxes, Flame, Server, Box, GitBranch } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Gamepad2: <Gamepad2 className="w-8 h-8 text-[#E63946]" />,
  Code2: <Code2 className="w-8 h-8 text-blue-400" />,
  Wifi: <Wifi className="w-8 h-8 text-cyan-400" />,
  Boxes: <Boxes className="w-8 h-8 text-emerald-400" />,
  Flame: <Flame className="w-8 h-8 text-amber-400" />,
  Server: <Server className="w-8 h-8 text-purple-400" />,
  Box: <Box className="w-8 h-8 text-orange-400" />,
  GitBranch: <GitBranch className="w-8 h-8 text-[#FF2E4D]" />,
};

export const TechStack: React.FC = () => {
  const technologies: Technology[] = techData as Technology[];

  return (
    <section id="tech" className="py-24 relative overflow-hidden bg-[#08090D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="ENGINEERING ENGINE"
          title="Technologies We Master"
          subtitle="Our battle-tested stack powering high-performance game logic, real-time multiplayer, and asset streaming."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech) => (
            <div
              key={tech.id}
              className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-[#E63946]/50 hover:shadow-[0_10px_30px_rgba(230,57,70,0.2)] transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Top Accent Lighting */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#E63946]/10 blur-[30px] rounded-full group-hover:bg-[#E63946]/25 transition-all" />

              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-[#10131C] border border-white/10 group-hover:scale-110 group-hover:border-[#E63946]/40 transition-all">
                  {iconMap[tech.iconName] || <Gamepad2 className="w-8 h-8 text-[#E63946]" />}
                </div>
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {tech.category}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient-red transition-colors">
                {tech.name}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {tech.description}
              </p>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-semibold text-slate-200">{tech.level}</span>
                <span className="text-[#E63946] font-bold">{tech.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
