'use client';

import React from 'react';
import roadmapData from '../../data/roadmap.json';
import { RoadmapItem } from '../../types';
import { SectionHeading } from '../ui/SectionHeading';
import { Calendar, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const GameRoadmap: React.FC = () => {
  const items: RoadmapItem[] = roadmapData as RoadmapItem[];

  return (
    <section id="roadmap" className="py-24 relative overflow-hidden bg-[#0A0C12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="FUTURE MILESTONES"
          title="Development Roadmap"
          subtitle="Track past launches and upcoming feature expansions for Redvega Games titles."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {items.map((item, idx) => {
            const isCompleted = item.status === 'completed';
            const isInProgress = item.status === 'in-progress';

            return (
              <div
                key={idx}
                className={`glass-panel p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                  isInProgress
                    ? 'border-[#E63946] shadow-[0_0_25px_rgba(230,57,70,0.3)] bg-[#E63946]/5'
                    : isCompleted
                    ? 'border-emerald-500/30'
                    : 'border-white/10 opacity-80'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#E63946] uppercase tracking-wider">
                      {item.quarter}
                    </span>
                    {isCompleted ? (
                      <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    ) : isInProgress ? (
                      <span className="p-1 rounded-full bg-[#E63946]/20 text-[#E63946] animate-pulse">
                        <Sparkles className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="p-1 rounded-full bg-white/5 text-slate-500">
                        <Clock className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                </div>

                <div className="flex flex-wrap gap-1 pt-4 border-t border-white/10">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-slate-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
