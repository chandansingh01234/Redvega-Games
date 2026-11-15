'use client';

import React from 'react';
import Image from 'next/image';
import { Game } from '../../types';
import { Button } from '../ui/Button';
import { Smartphone, Monitor, Star, Download, ExternalLink, Info } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onOpenModal: (game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onOpenModal }) => {
  return (
    <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden flex flex-col group hover:border-[#E63946]/50 hover:shadow-[0_10px_35px_rgba(230,57,70,0.25)] transition-all duration-300">
      {/* Cover Image Container */}
      <div className="relative h-64 w-full overflow-hidden bg-[#08090D]">
        <img
          src={game.coverImage}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#10131C] via-[#10131C]/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-[#08090D]/80 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white uppercase tracking-wider">
            {game.genre}
          </span>
          {game.badge && (
            <span className="px-3 py-1 rounded-full bg-[#E63946] text-[10px] font-extrabold text-white uppercase tracking-wider shadow-[0_0_12px_rgba(230,57,70,0.6)]">
              {game.badge}
            </span>
          )}
        </div>

        {/* Platform Badge */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-[#08090D]/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-xs font-semibold text-slate-300">
          <Smartphone className="w-3.5 h-3.5 text-[#E63946]" />
          <span>{game.platform}</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{game.status}</span>
            {game.rating && <span className="text-amber-400 font-bold">{game.rating}</span>}
          </div>
          <h3 className="text-2xl font-black text-white group-hover:text-gradient-red transition-colors">
            {game.title}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
            {game.tagline}
          </p>
        </div>

        {/* Feature Highlights Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
          {game.features.slice(0, 3).map((feat, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2.5 py-1 rounded-md bg-[#161A26] border border-white/5 text-slate-400"
            >
              ✓ {feat}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => onOpenModal(game)}
            icon={<Info className="w-4 h-4" />}
          >
            Learn More
          </Button>

          {game.googlePlayUrl && game.googlePlayUrl !== '#' ? (
            <a
              href={game.googlePlayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#E63946] text-white hover:bg-[#FF2E4D] shadow-[0_0_15px_rgba(230,57,70,0.3)] transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Google Play</span>
            </a>
          ) : (
            <button
              disabled
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#161A26] text-slate-500 border border-white/5 cursor-not-allowed"
            >
              <span>Wishlist</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
