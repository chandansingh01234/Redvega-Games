'use client';

import React, { useState } from 'react';
import gamesData from '../../data/games.json';
import { Game } from '../../types';
import { SectionHeading } from '../ui/SectionHeading';
import { GameCard } from '../games/GameCard';
import { GameModal } from '../games/GameModal';
import { Gamepad2 } from 'lucide-react';

export const FeaturedGames: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const gamesList: Game[] = gamesData as Game[];

  const filterOptions = ['ALL', 'ACTION', 'MULTIPLAYER', 'ANDROID', 'IN DEVELOPMENT'];

  const filteredGames = gamesList.filter((game) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'ACTION') return game.genre.toLowerCase().includes('action') || game.genre.toLowerCase().includes('survival');
    if (selectedFilter === 'MULTIPLAYER') return game.genre.toLowerCase().includes('multiplayer') || game.genre.toLowerCase().includes('pvp');
    if (selectedFilter === 'ANDROID') return game.platform.toLowerCase().includes('android');
    if (selectedFilter === 'IN DEVELOPMENT') return game.status.toLowerCase().includes('development');
    return true;
  });

  return (
    <section id="games" className="py-24 relative overflow-hidden bg-[#0A0C12]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#E63946]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="STUDIO PORTFOLIO"
          title="Featured Games"
          subtitle="Explore our flagship mobile survival, PvP starfighter dogfight, and tactical RPG titles engineered in Unity."
        />

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                selectedFilter === filter
                  ? 'bg-[#E63946] text-white shadow-[0_0_15px_rgba(230,57,70,0.4)]'
                  : 'bg-[#10131C] text-slate-400 hover:text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} onOpenModal={(g) => setSelectedGame(g)} />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
    </section>
  );
};
