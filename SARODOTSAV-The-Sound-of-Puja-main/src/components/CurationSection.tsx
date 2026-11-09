import React, { memo } from 'react';

interface CurationSectionProps {
  onSelectRotation: (dayKey: string) => void;
  onOpenPlaylist: () => void;
}

export const CurationSection: React.FC<CurationSectionProps> = memo(({
  onSelectRotation,
  onOpenPlaylist
}) => {
  return (
    <section 
      id="curation-section"
      className="relative z-10 w-full min-h-screen flex flex-col justify-center py-24 sm:py-32 pb-48 sm:pb-52 px-6 sm:px-10 md:px-16 text-left pointer-events-auto border-t border-white/10 bg-black/40 backdrop-blur-xs"
    >
      <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10 text-[#e6ded8]">
        
        {/* Top Logo & Title */}
        <div className="flex items-center gap-3.5 sm:gap-4">
          {/* Circular Monogram Seal */}
          <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#5c2420] border border-[#a8655b]/60 flex items-center justify-center flex-shrink-0 shadow-md">
            <span className="font-cinzel text-lg sm:text-xl font-bold text-[#fbf6ec] tracking-tighter">
              শ
            </span>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h3 className="font-bengali text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide leading-none">
              শারদোৎসব
            </h3>
            <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-white/60 font-light block mt-1">
              SOUND OF PUJA
            </span>
          </div>
        </div>

        {/* Narrative Paragraph */}
        <p className="font-sans text-xs sm:text-sm md:text-[15px] leading-relaxed text-white/80 font-light max-w-2xl">
          Timeless Bengali songs of Durga Puja, playing round the clock — the kind of soundtrack that echoes across misty autumn mornings, neighborhood pandals, and nostalgic homecomings. From the sacred Mahalaya dawn to the rhythmic dhak of Bijoya Dashami.
        </p>

        {/* Rotations / Day Navigation Grid */}
        <div className="space-y-3 pt-2">
          <h4 className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white/50 font-medium">
            ROTATIONS
          </h4>

          <div className="grid grid-cols-1 xs:grid-cols-2 gap-y-2.5 gap-x-8 max-w-lg text-xs sm:text-sm md:text-[15px] font-sans font-light">
            <div className="space-y-2.5">
              <button
                onClick={() => onSelectRotation('Mahalaya')}
                className="block text-white/85 hover:text-sharodotsav-gold transition-colors text-left cursor-pointer"
              >
                Mahalaya
              </button>
              <button
                onClick={() => onSelectRotation('Maha Shashti')}
                className="block text-white/85 hover:text-sharodotsav-gold transition-colors text-left cursor-pointer"
              >
                Maha Shashti
              </button>
              <button
                onClick={() => onSelectRotation('Maha Saptami')}
                className="block text-white/85 hover:text-sharodotsav-gold transition-colors text-left cursor-pointer"
              >
                Maha Saptami
              </button>
              <button
                onClick={onOpenPlaylist}
                className="block text-white/85 hover:text-sharodotsav-gold transition-colors text-left cursor-pointer pt-1 font-normal"
              >
                All songs
              </button>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => onSelectRotation('Maha Ashtami')}
                className="block text-white/85 hover:text-sharodotsav-gold transition-colors text-left cursor-pointer"
              >
                Maha Ashtami
              </button>
              <button
                onClick={() => onSelectRotation('Maha Nabami')}
                className="block text-white/85 hover:text-sharodotsav-gold transition-colors text-left cursor-pointer"
              >
                Maha Nabami
              </button>
              <button
                onClick={() => onSelectRotation('Bijoya Dashami')}
                className="block text-white/85 hover:text-sharodotsav-gold transition-colors text-left cursor-pointer"
              >
                Bijoya Dashami
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer & Rights Footer */}
        <div className="pt-8 sm:pt-10 border-t border-white/10 space-y-3 text-[11px] sm:text-xs font-sans text-white/60 font-light leading-relaxed">
          <p>
            Audio plays through YouTube's embedded player. Nothing is hosted on this site, and all rights stay with the labels, composers and performers. Song credits are put together from film soundtrack listings.
          </p>
          <p>
            If you want to connect with me and wanna make your own, email{' '}
            <a
              href="mailto:sumit.biswas.pmi.9c@gmail.com"
              className="underline text-white/80 hover:text-sharodotsav-gold transition-colors"
            >
              sumit.biswas.pmi.9c@gmail.com
            </a>{' '}
            and it gets hosted.
          </p>
          <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/40 pt-2">
            © 2026 SHARODOTSAV
          </p>
        </div>

      </div>
    </section>
  );
});

CurationSection.displayName = 'CurationSection';
