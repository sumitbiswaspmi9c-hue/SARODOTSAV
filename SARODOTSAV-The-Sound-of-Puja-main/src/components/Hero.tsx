import React from 'react';
import { Volume2 } from 'lucide-react';

interface HeroProps {
  onEnter: () => void;
  hasStarted: boolean;
  isPlaying: boolean;
  activeTrackTitle: string;
}

export const Hero: React.FC<HeroProps> = React.memo(({
  onEnter,
  hasStarted,
  isPlaying,
  activeTrackTitle
}) => {
  return (
    <section
      id="hero"
      className="relative z-10 min-h-screen w-full flex flex-col justify-center items-center text-center px-6 pointer-events-auto"
    >
      {/* Decorative Traditional Subtle Top Glyph */}
      <div className="mb-6 flex flex-col items-center gap-2">
        <span className="font-bengali text-xs md:text-sm tracking-[0.2em] text-sharodotsav-gold/80 font-light select-none">
          শুভ শারদোৎসব
        </span>
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-sharodotsav-gold/50 to-transparent"></div>
      </div>

      {/* Main Large Typography */}
      <h1 className="font-cinzel text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-[0.14em] sm:tracking-[0.22em] text-sharodotsav-cream uppercase select-none drop-shadow-sm leading-tight">
        SHARODOTSAV
      </h1>

      {/* Tagline */}
      <p className="mt-3 sm:mt-4 md:mt-6 font-sans text-xs sm:text-sm md:text-base tracking-[0.22em] sm:tracking-[0.45em] uppercase text-sharodotsav-cream/80 font-light">
        The Sound of Puja
      </p>

      {/* ENTER CTA Button with Rounded Full & Transparent BG */}
      <div className="mt-8 sm:mt-10 md:mt-14 flex flex-col items-center gap-4">
        <button
          onClick={onEnter}
          className="group relative px-6 sm:px-9 py-3 sm:py-3.5 rounded-full border border-white/25 hover:border-white/50 bg-transparent hover:bg-white/10 backdrop-blur-xs transition-all duration-500 ease-out flex items-center gap-2.5 sm:gap-3 cursor-pointer shadow-lg shadow-black/40"
          aria-label="Enter Sharodotsav Experience"
        >
          <span className="font-sans text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/90 font-light group-hover:text-white transition-colors">
            {hasStarted ? (isPlaying ? 'NOW PLAYING' : 'RESUME MUSIC') : 'ENTER'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/70 group-hover:scale-125 transition-transform duration-300"></span>
        </button>

        {/* Live track indicator pill */}
        {hasStarted && (
          <div className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-sharodotsav-cream/60 font-light">
            <Volume2 className={`w-3.5 h-3.5 text-sharodotsav-gold ${isPlaying ? 'animate-pulse' : 'opacity-40'}`} />
            <span>{activeTrackTitle}</span>
          </div>
        )}
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
