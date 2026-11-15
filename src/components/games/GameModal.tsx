'use client';

import React, { useState } from 'react';
import { Game } from '../../types';
import { X, Smartphone, Download, Star, CheckCircle, Play, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

interface GameModalProps {
  game: Game | null;
  onClose: () => void;
}

export const GameModal: React.FC<GameModalProps> = ({ game, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'screenshots' | 'trailer'>('overview');
  const [activeScreenshot, setActiveScreenshot] = useState<string | null>(null);

  if (!game) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0B0C10] border border-[#E63946]/40 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto text-slate-200 shadow-[0_0_50px_rgba(230,57,70,0.3)] relative flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#10131C]/80 border border-white/20 text-slate-300 hover:text-white hover:bg-[#E63946] flex items-center justify-center transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Banner Header */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#08090D]">
          <img
            src={game.bannerImage}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C10] via-[#0B0C10]/50 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-[#E63946] text-xs font-bold text-white uppercase tracking-wider">
                  {game.genre}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-slate-300">
                  {game.platform}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white text-gradient-red">
                {game.title}
              </h2>
            </div>

            {game.googlePlayUrl && game.googlePlayUrl !== '#' && (
              <a
                href={game.googlePlayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E63946] text-white font-bold hover:bg-[#FF2E4D] shadow-[0_0_20px_rgba(230,57,70,0.5)] transition-all shrink-0"
              >
                <Download className="w-5 h-5" />
                <span>Get on Google Play</span>
              </a>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/10 bg-[#10131C]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'overview'
                ? 'border-[#E63946] text-[#E63946]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Overview & Features
          </button>
          <button
            onClick={() => setActiveTab('screenshots')}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'screenshots'
                ? 'border-[#E63946] text-[#E63946]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Screenshots ({game.screenshots.length})
          </button>
          {game.trailerUrl && (
            <button
              onClick={() => setActiveTab('trailer')}
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                activeTab === 'trailer'
                  ? 'border-[#E63946] text-[#E63946]'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Trailer
            </button>
          )}
        </div>

        {/* Modal Tab Content */}
        <div className="p-6 space-y-6 flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-[#161A26] border border-white/5 text-center">
                <div>
                  <div className="text-xs text-slate-400">Status</div>
                  <div className="text-sm font-bold text-white">{game.status}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Rating</div>
                  <div className="text-sm font-bold text-amber-400">{game.rating || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Downloads</div>
                  <div className="text-sm font-bold text-[#E63946]">{game.downloads || 'N/A'}</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-2">Game Summary</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{game.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">Key Gameplay Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {game.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-[#161A26] border border-white/5 text-xs text-slate-300"
                    >
                      <CheckCircle className="w-4 h-4 text-[#E63946] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'screenshots' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {game.screenshots.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveScreenshot(img)}
                    className="relative h-40 rounded-2xl overflow-hidden border border-white/10 cursor-pointer group hover:border-[#E63946]"
                  >
                    <img src={img} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Sparkles className="w-6 h-6 text-[#E63946]" />
                    </div>
                  </div>
                ))}
              </div>

              {activeScreenshot && (
                <div className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4" onClick={() => setActiveScreenshot(null)}>
                  <img src={activeScreenshot} alt="Enlarged preview" className="max-w-full max-h-[85vh] rounded-2xl border border-white/20" />
                </div>
              )}
            </div>
          )}

          {activeTab === 'trailer' && game.trailerUrl && (
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-black">
              <iframe
                src={game.trailerUrl}
                title={`${game.title} Official Trailer`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
