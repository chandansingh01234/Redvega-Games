import React from 'react';
import { Sparkles } from 'lucide-react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  centered = true,
  className = '',
}) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'} ${className}`}>
      {badge && (
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E63946]/10 border border-[#E63946]/30 text-[#E63946] text-xs font-semibold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(230,57,70,0.15)] ${
            centered ? 'mx-auto' : ''
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FF2E4D] animate-pulse" />
          <span>{badge}</span>
        </div>
      )}
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
        {title.includes('Redvega') ? (
          <>
            {title.split('Redvega')[0]}
            <span className="text-gradient-red">Redvega</span>
            {title.split('Redvega')[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-base md:text-lg text-slate-400 font-normal leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`mt-4 h-1 w-20 bg-gradient-to-r from-[#E63946] to-[#FF2E4D] rounded-full ${centered ? 'mx-auto' : ''}`} />
    </div>
  );
};
