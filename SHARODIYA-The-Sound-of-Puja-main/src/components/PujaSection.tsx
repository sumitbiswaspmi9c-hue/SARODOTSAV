import React from 'react';
import { FESTIVE_DAYS } from '../data/playlist';

interface PujaSectionProps {
  currentTrackIndex: number;
  onSelectTithiTrack: (index: number) => void;
  onHoverTithiTrack?: (index: number) => void;
  onLeaveTithiTrack?: () => void;
}

export const PujaSection: React.FC<PujaSectionProps> = React.memo(({
  currentTrackIndex,
  onSelectTithiTrack,
  onHoverTithiTrack,
  onLeaveTithiTrack
}) => {
  return (
    <section
      id="puja-section"
      className="relative z-10 min-h-screen w-full flex flex-col justify-center items-center py-16 sm:py-20 px-6 sm:px-12 text-center pointer-events-auto"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Subtle Decorative Bengal Motif */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-sharodotsav-gold/60 to-transparent" />
          <span className="font-bengali text-xs tracking-[0.25em] text-sharodotsav-gold/90 font-light select-none">
            শুভ শারদোৎসব
          </span>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-sharodotsav-gold/60 to-transparent" />
        </div>

        {/* Section Heading */}
        <h2 className="font-cinzel text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-normal tracking-[0.14em] sm:tracking-[0.22em] text-sharodotsav-cream uppercase leading-tight select-none px-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          WHEN BENGAL COMES ALIVE.
        </h2>

        {/* Subtitle */}
        <p className="mt-3 sm:mt-6 font-sans text-[11px] sm:text-sm md:text-base tracking-[0.22em] sm:tracking-[0.45em] uppercase text-white/90 font-normal max-w-xl select-none px-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
          Five days. Countless memories.
        </p>

        {/* Minimal 5-Day Festive Typography Sequence */}
        <div className="mt-10 sm:mt-16 md:mt-24 w-full">
          
          {/* Desktop, Tablet & Mobile Inline Separator Row with High Contrast */}
          <div className="flex flex-wrap items-center justify-center gap-y-3 sm:gap-y-6 gap-x-2 xs:gap-x-4 sm:gap-x-8 md:gap-x-10 text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.4em] uppercase font-sans">
            {FESTIVE_DAYS.map((day, idx) => {
              const isSelected = currentTrackIndex === day.trackIndex;
              return (
                <React.Fragment key={day.name}>
                  <button
                    onClick={() => onSelectTithiTrack(day.trackIndex)}
                    onMouseEnter={() => onHoverTithiTrack?.(day.trackIndex)}
                    onMouseLeave={onLeaveTithiTrack}
                    className={`group relative py-1.5 sm:py-2 transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'text-sharodotsav-gold-light scale-105'
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    <span className="font-cinzel font-bold tracking-[0.2em] sm:tracking-[0.28em] text-xs sm:text-base md:text-lg block transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                      {day.name}
                    </span>
                    
                    {/* Glowing underline for active tithi */}
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-sharodotsav-gold transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,1)] ${
                        isSelected ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-70'
                      }`}
                    />
                  </button>
                  {idx < FESTIVE_DAYS.length - 1 && (
                    <span className="text-white/60 text-xs sm:text-sm select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">·</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
});

PujaSection.displayName = 'PujaSection';
