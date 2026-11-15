'use client';

import React, { useState } from 'react';
import newsData from '../../data/news.json';
import { NewsItem } from '../../types';
import { SectionHeading } from '../ui/SectionHeading';
import { Calendar, Clock, ArrowRight, X, Newspaper } from 'lucide-react';
import { Button } from '../ui/Button';

export const NewsSection: React.FC = () => {
  const articles: NewsItem[] = newsData as NewsItem[];
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  return (
    <section id="news" className="py-24 relative overflow-hidden bg-[#08090D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="STUDIO DEVLOGS"
          title="Latest News & Updates"
          subtitle="Behind-the-scenes engineering deep dives, patch notes, and release announcements."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item) => (
            <div
              key={item.id}
              className="glass-panel rounded-3xl overflow-hidden border border-white/10 group hover:border-[#E63946]/50 flex flex-col justify-between transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="relative h-48 w-full overflow-hidden bg-[#08090D]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#E63946] text-[10px] font-bold text-white uppercase tracking-wider">
                    {item.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#E63946]" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {item.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-gradient-red transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedArticle(item)}
                  className="w-full py-2.5 rounded-xl bg-[#161A26] border border-white/10 hover:border-[#E63946]/40 text-xs font-bold text-white flex items-center justify-center gap-2 group-hover:bg-[#E63946] transition-all"
                >
                  <span>Read Full Devlog</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Devlog Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-[#10131C] border border-[#E63946]/40 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 text-slate-300 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#08090D] border border-white/10 text-white flex items-center justify-center hover:bg-[#E63946] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#E63946] text-xs font-bold text-white uppercase tracking-wider">
                {selectedArticle.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white">{selectedArticle.title}</h2>
              <div className="text-xs text-slate-400 flex items-center gap-4">
                <span>By {selectedArticle.author}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-white/10 max-h-64">
              <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
            </div>

            <div className="text-sm leading-relaxed space-y-4 text-slate-300">
              <p className="font-semibold text-white">{selectedArticle.excerpt}</p>
              <p>{selectedArticle.content}</p>
              <p>
                Stay tuned for further engineering announcements and performance benchmark graphs in our upcoming releases!
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
