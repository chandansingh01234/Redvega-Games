'use client';

import React from 'react';
import testimonialsData from '../../data/testimonials.json';
import { Testimonial } from '../../types';
import { SectionHeading } from '../ui/SectionHeading';
import { Quote, Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = testimonialsData as Testimonial[];

  return (
    <section className="py-24 relative overflow-hidden bg-[#0A0C12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="COMMUNITY ACCLAIM"
          title="What Players & Reviewers Say"
          subtitle="Feedback from competitive players, mobile gaming journalists, and community beta testers."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-[#E63946]/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-[#E63946] opacity-60" />
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#E63946] to-[#FF2E4D] font-bold text-white flex items-center justify-center text-xs">
                  {item.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-[11px] text-slate-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
