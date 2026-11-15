'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Gamepad2, Send, Mail, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, GithubIcon } from '../ui/SocialIcons';
import confetti from 'canvas-confetti';
import { Button } from '../ui/Button';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubscribed(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#E63946', '#FF2E4D', '#38BDF8'],
    });

    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  return (
    <footer className="relative bg-[#05060A] border-t border-white/10 pt-16 pb-12 overflow-hidden text-slate-400">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E63946]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Column 1 & 2: Studio Brand Profile */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="#home" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E63946] to-[#FF2E4D] p-0.5 shadow-[0_0_15px_rgba(230,57,70,0.5)]">
                <div className="w-full h-full bg-[#08090D] rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-5 h-5 text-[#E63946]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-wider text-white">
                  REDVEGA <span className="text-[#E63946]">GAMES</span>
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest -mt-1 font-semibold">
                  Adventure Awaits
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Redvega Games is an independent game development studio creating immersive mobile and multiplayer games powered by Unity Engine. Crafted with passion, precision, and player experience at heart.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/redvegagames/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#10131C] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#E63946] hover:bg-[#E63946]/10 hover:shadow-[0_0_15px_rgba(230,57,70,0.3)] transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@RedVegaGames"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#10131C] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#E63946] hover:bg-[#E63946]/10 hover:shadow-[0_0_15px_rgba(230,57,70,0.3)] transition-all"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://play.google.com/store/apps/dev?id=6900533808962356909&hl=hr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#10131C] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#E63946] hover:bg-[#E63946]/10 hover:shadow-[0_0_15px_rgba(230,57,70,0.3)] transition-all"
                aria-label="Google Play Store Page"
              >
                <Gamepad2 className="w-4 h-4 text-[#00F0FF]" />
              </a>
              <a
                href="mailto:redvegagames@gmail.com"
                className="w-10 h-10 rounded-xl bg-[#10131C] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#E63946] hover:bg-[#E63946]/10 hover:shadow-[0_0_15px_rgba(230,57,70,0.3)] transition-all"
                aria-label="Email Studio"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#E63946] pl-3">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#home" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white hover:translate-x-1 inline-block transition-transform">About Studio</a>
              </li>
              <li>
                <a href="#games" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Our Games</a>
              </li>
              <li>
                <a href="#tech" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Tech Stack</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Media Gallery</a>
              </li>
              <li>
                <a href="#process" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Dev Process</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Games Portfolio */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#E63946] pl-3">
              Studio Titles
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#games" className="hover:text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E63946]" />
                  <span>Stone Island: Apocalypse</span>
                </a>
              </li>
              <li>
                <a href="#games" className="hover:text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                  <span>Infinity Space PvP</span>
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                  <span>Cyber Core: Horizon</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Newsletter Sign Up */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#E63946] pl-3">
              Newsletter
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe for exclusive devlogs, beta testing invites, and game launch notifications.
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-[#E63946]/10 border border-[#E63946]/30 text-[#E63946] flex items-center gap-2 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#FF2E4D]" />
                <span>Subscribed! Welcome to Redvega Vanguard.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter player email..."
                    required
                    className="w-full bg-[#10131C] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#E63946] focus:ring-1 focus:ring-[#E63946] transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-[#E63946] text-white hover:bg-[#FF2E4D] transition-colors"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Redvega Games. All rights reserved. Powered by Unity Engine.</p>
          
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveLegalModal('privacy')}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#E63946]" />
              <span>Privacy Policy</span>
            </button>
            <button
              onClick={() => setActiveLegalModal('terms')}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-[#E63946]" />
              <span>Terms of Service</span>
            </button>
          </div>
        </div>
      </div>

      {/* Legal Modals */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#10131C] border border-white/10 rounded-2xl max-w-xl w-full p-6 text-slate-300 space-y-4 shadow-2xl relative">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              {activeLegalModal === 'privacy' ? <ShieldCheck className="text-[#E63946]" /> : <FileText className="text-[#E63946]" />}
              <span>{activeLegalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}</span>
            </h3>
            <div className="max-h-60 overflow-y-auto pr-2 text-xs leading-relaxed space-y-2 text-slate-400">
              <p>
                At Redvega Games, player privacy and transparent game operations are paramount. We collect minimal telemetry data solely used for performance optimization, multiplayer connectivity, and crash report logging.
              </p>
              <p>
                No personally identifiable information is sold or shared with unauthorized third parties. All game purchases on Google Play are processed securely through Google Billing APIs.
              </p>
              <p>
                By accessing Redvega Games applications and services, you agree to abide by community sportsmanship guidelines in multiplayer arenas.
              </p>
            </div>
            <div className="flex justify-end pt-2">
              <Button size="sm" variant="secondary" onClick={() => setActiveLegalModal(null)}>
                Close Window
              </Button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
