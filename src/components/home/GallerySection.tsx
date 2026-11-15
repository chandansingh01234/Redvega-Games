'use client';

import React, { useState } from 'react';
import galleryData from '../../data/gallery.json';
import { GalleryItem } from '../../types';
import { SectionHeading } from '../ui/SectionHeading';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const items: GalleryItem[] = galleryData as GalleryItem[];
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['ALL', 'Screenshot', 'Artwork', 'UI Render', '3D Model'];

  const filteredItems = items.filter((item) =>
    selectedCategory === 'ALL' ? true : item.category === selectedCategory
  );

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-[#08090D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="VISUAL ARCHIVE"
          title="Studio Gallery"
          subtitle="Explore in-game screenshots, 3D asset renders, and promotional artwork from Redvega Games titles."
        />

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-[#E63946] text-white shadow-[0_0_15px_rgba(230,57,70,0.4)]'
                  : 'bg-[#10131C] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="glass-panel rounded-3xl overflow-hidden border border-white/10 group cursor-pointer hover:border-[#E63946]/50 hover:shadow-[0_10px_30px_rgba(230,57,70,0.25)] transition-all duration-300 relative"
            >
              <div className={`relative w-full ${item.aspectRatio || 'aspect-video'} overflow-hidden bg-[#08090D]`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Hover overlay icon */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#E63946] text-white flex items-center justify-center shadow-[0_0_20px_#FF2E4D] mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-300 font-medium">{item.game} • {item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && filteredItems[activeLightboxIndex] && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 select-none"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-[#10131C] border border-white/20 text-white flex items-center justify-center hover:bg-[#E63946] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={prevImage}
            className="absolute left-6 z-20 w-12 h-12 rounded-full bg-[#10131C] border border-white/20 text-white flex items-center justify-center hover:bg-[#E63946] transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-6 z-20 w-12 h-12 rounded-full bg-[#10131C] border border-white/20 text-white flex items-center justify-center hover:bg-[#E63946] transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Description Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full flex flex-col items-center space-y-4"
          >
            <img
              src={filteredItems[activeLightboxIndex].image}
              alt={filteredItems[activeLightboxIndex].title}
              className="max-h-[75vh] max-w-full rounded-2xl border border-white/20 shadow-2xl object-contain"
            />
            <div className="text-center">
              <h3 className="text-xl font-bold text-white">
                {filteredItems[activeLightboxIndex].title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {filteredItems[activeLightboxIndex].game} — {filteredItems[activeLightboxIndex].category} ({activeLightboxIndex + 1} / {filteredItems.length})
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
