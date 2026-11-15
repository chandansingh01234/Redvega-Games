'use client';

import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Lightbulb, Layers, Compass, Code, TestTube, Rocket, RefreshCw, ChevronDown } from 'lucide-react';

const steps = [
  {
    num: '01',
    title: 'Idea',
    icon: Lightbulb,
    desc: 'Brainstorming core gameplay loops, setting thematic art direction, and scoping high-concept game pitch mechanics.',
    color: '#E63946',
  },
  {
    num: '02',
    title: 'Prototype',
    icon: Layers,
    desc: 'Building grey-box physics prototypes in Unity to test player movement feel, shooting response, and fun factor.',
    color: '#F59E0B',
  },
  {
    num: '03',
    title: 'Game Design',
    icon: Compass,
    desc: 'Fleshing out level layout maps, item balancing math, weapon recoil patterns, and UI flow UX architecture.',
    color: '#38BDF8',
  },
  {
    num: '04',
    title: 'Programming',
    icon: Code,
    desc: 'Writing clean modular C# systems, integrating Photon 60Hz netcode, and building Unity Addressables asset pipelines.',
    color: '#A855F7',
  },
  {
    num: '05',
    title: 'Testing',
    icon: TestTube,
    desc: 'Running closed community playtests, profiling memory & FPS on low-end Android hardware, and fixing edge bugs.',
    color: '#10B981',
  },
  {
    num: '06',
    title: 'Publishing',
    icon: Rocket,
    desc: 'Deploying store listings to Google Play, creating promotional screenshots, trailer videos, and ASO optimization.',
    color: '#FF2E4D',
  },
  {
    num: '07',
    title: 'Updates',
    icon: RefreshCw,
    desc: 'Gathering community feedback, delivering monthly seasonal content patches, bug fixes, and continuous balance passes.',
    color: '#00F0FF',
  },
];

export const ProcessTimeline: React.FC = () => {
  return (
    <section id="process" className="py-24 relative overflow-hidden bg-[#0A0C12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="STUDIO WORKFLOW"
          title="Development Process"
          subtitle="Our systematic 7-stage engineering pipeline for turning creative ideas into polished, high-performance titles."
        />

        <div className="relative">
          {/* Vertical Central Line for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#E63946] via-[#00F0FF] to-[#E63946] -translate-x-1/2 opacity-30 rounded-full" />

          <div className="space-y-12 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={step.num}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Step Card Content */}
                  <div className="w-full lg:w-1/2">
                    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-[#E63946]/50 transition-all duration-300 relative group hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className="text-2xl font-black"
                          style={{ color: step.color }}
                        >
                          {step.num}
                        </span>
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 transition-transform group-hover:scale-110"
                          style={{ backgroundColor: `${step.color}15`, color: step.color }}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-sm text-slate-300 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Central Node Badge */}
                  <div className="hidden lg:flex w-12 h-12 rounded-full bg-[#10131C] border-2 border-[#E63946] items-center justify-center text-[#E63946] font-bold text-sm shadow-[0_0_15px_rgba(230,57,70,0.5)] shrink-0 z-10">
                    {idx + 1}
                  </div>

                  {/* Spacer for 2-column alignment */}
                  <div className="hidden lg:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
