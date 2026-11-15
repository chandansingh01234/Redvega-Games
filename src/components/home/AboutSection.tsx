import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Target, Eye, ShieldAlert, Cpu, Award, Lightbulb, Users, HeartHandshake } from 'lucide-react';

const values = [
  {
    title: 'Innovation',
    desc: 'Pushing boundaries with unique game mechanics, real-time networking, and original IP concepts.',
    icon: Lightbulb,
    color: '#E63946',
  },
  {
    title: 'Performance',
    desc: 'Ensuring silky-smooth 60 FPS mobile gameplay through rigorous memory & shader optimization.',
    icon: Cpu,
    color: '#00F0FF',
  },
  {
    title: 'Quality',
    desc: 'Polishing graphics, haptics, UI, and audio to meet AAA independent standards.',
    icon: Award,
    color: '#A855F7',
  },
  {
    title: 'Creativity',
    desc: 'Crafting atmospheric worlds and immersive storylines without generic asset-flipping.',
    icon: ShieldAlert,
    color: '#F59E0B',
  },
  {
    title: 'Player First',
    desc: 'Listening closely to community feedback, delivering active updates, and respecting player time.',
    icon: HeartHandshake,
    color: '#10B981',
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#08090D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="STUDIO PROFILE"
          title="About Redvega Games"
          subtitle="Crafting high-octane mobile survival and multiplayer PvP titles with passion and precision."
        />

        {/* Who We Are Main Panel */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E63946]/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#E63946] animate-ping" />
                Who We Are
              </h3>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                Redvega Games is an independent game development company focused on creating engaging mobile games, multiplayer experiences, and innovative gameplay systems. Every project is designed with attention to performance, creativity, and player experience.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                As a solo game developer studio, Redvega Games handles the full pipeline—from C# engine architecture, Photon multiplayer synchronization, 3D asset modeling in Blender, to live ops deployment on Google Play.
              </p>
            </div>

            {/* Solo Dev Badge Card */}
            <div className="lg:col-span-4 bg-[#10131C] p-6 rounded-2xl border border-white/10 space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#E63946] to-[#FF2E4D] p-0.5 mx-auto shadow-[0_0_20px_rgba(230,57,70,0.4)]">
                <div className="w-full h-full bg-[#08090D] rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-[#E63946]" />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Solo Game Developer</h4>
                <p className="text-xs text-slate-400">100% Dedicated Independent Creator</p>
              </div>
              <div className="pt-2 border-t border-white/10 text-xs text-slate-400 flex justify-around">
                <div>
                  <span className="block font-bold text-white text-sm">Unity</span>
                  <span>Engine</span>
                </div>
                <div>
                  <span className="block font-bold text-white text-sm">C#</span>
                  <span>Logic</span>
                </div>
                <div>
                  <span className="block font-bold text-white text-sm">Blender</span>
                  <span>Art</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-panel p-8 rounded-3xl border border-[#E63946]/30 hover:border-[#E63946] transition-all duration-300 relative group">
            <div className="w-14 h-14 rounded-2xl bg-[#E63946]/15 border border-[#E63946]/40 flex items-center justify-center text-[#E63946] mb-6 group-hover:scale-110 transition-transform">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-slate-300 text-base leading-relaxed">
              Create games that players enjoy for years.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-[#00F0FF]/30 hover:border-[#00F0FF] transition-all duration-300 relative group">
            <div className="w-14 h-14 rounded-2xl bg-[#00F0FF]/15 border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF] mb-6 group-hover:scale-110 transition-transform">
              <Eye className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Our Vision</h3>
            <p className="text-slate-300 text-base leading-relaxed">
              Build memorable gaming experiences through creativity and technology.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div>
          <h3 className="text-xl font-bold text-white uppercase tracking-wider text-center mb-8 border-b border-white/10 pb-4">
            Core Values
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-[#E63946]/40 transition-all duration-300 group hover:-translate-y-1"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${val.color}15`, color: val.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{val.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
