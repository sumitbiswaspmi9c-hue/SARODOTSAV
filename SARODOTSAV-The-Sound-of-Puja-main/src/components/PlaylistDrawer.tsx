import React, { useMemo, memo } from 'react';
import { X, Play, Volume2 } from 'lucide-react';
import { Track } from '../types/playlist';

interface PlaylistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  onSelectTrack: (index: number) => void;
}

interface DayGroup {
  dayName: string;
  bengaliName: string;
  items: { track: Track; overallIndex: number }[];
}

export const PlaylistDrawer: React.FC<PlaylistDrawerProps> = memo(({
  isOpen,
  onClose,
  tracks,
  currentTrackIndex,
  isPlaying,
  onSelectTrack
}) => {
  // Pre-compute & memoize grouped tracks by day to prevent unnecessary re-computations
  const sections: DayGroup[] = useMemo(() => {
    const dayOrder = [
      { key: 'Mahalaya', title: 'MAHALAYA', bengali: 'মহালয়া' },
      { key: 'Maha Shashti', title: 'MAHA SHASHTI', bengali: 'মহা ষষ্ঠী' },
      { key: 'Maha Saptami', title: 'MAHA SAPTAMI', bengali: 'মহা সপ্তমী' },
      { key: 'Maha Ashtami', title: 'MAHA ASHTAMI', bengali: 'মহা অষ্টমী' },
      { key: 'Maha Nabami', title: 'MAHA NABAMI', bengali: 'মহা নবমী' },
      { key: 'Bijoya Dashami', title: 'BIJOYA DASHAMI', bengali: 'বিজয়া দশমী' },
    ];

    return dayOrder.map((day) => {
      const items = tracks
        .map((track, overallIndex) => ({ track, overallIndex }))
        .filter(({ track }) => track.tithi?.toLowerCase() === day.key.toLowerCase());
      return {
        dayName: day.title,
        bengaliName: day.bengali,
        items
      };
    }).filter((sec) => sec.items.length > 0);
  }, [tracks]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 pointer-events-auto ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 pointer-events-none invisible'
      }`}
    >
      {/* Semi-transparent Backdrop with hardware acceleration */}
      <div 
        className={`absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose} 
      />

      {/* GPU Accelerated Smooth Slide-In Drawer panel */}
      <div 
        className={`relative w-full max-w-full sm:max-w-md md:max-w-lg h-full bg-[#0d0708]/98 border-l border-sharodotsav-border p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl z-10 custom-scrollbar transform-gpu transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ willChange: 'transform' }}
      >
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-sharodotsav-border/60">
            <div>
              <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] font-sans uppercase text-sharodotsav-gold/80 font-light">
                Sharodotsav Soundtrack
              </span>
              <h3 className="font-cinzel text-lg sm:text-xl md:text-2xl text-sharodotsav-cream mt-0.5 tracking-wider">
                PLAYLIST
              </h3>
            </div>
            {/* Rounded Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent hover:bg-white/10 text-sharodotsav-cream/70 hover:text-sharodotsav-gold transition-colors cursor-pointer"
              aria-label="Close Playlist"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Grouped Track List by Days */}
          <div className="mt-6 space-y-7 pb-8">
            {sections.map((section) => (
              <div key={section.dayName} className="space-y-2.5">
                {/* Section Day Header */}
                <div className="flex items-center justify-between border-b border-sharodotsav-border/30 pb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sharodotsav-gold" />
                    <h4 className="font-cinzel text-xs sm:text-sm md:text-base tracking-[0.18em] sm:tracking-[0.2em] text-sharodotsav-gold font-medium">
                      {section.dayName}
                    </h4>
                  </div>
                  <span className="font-bengali text-xs tracking-wider text-sharodotsav-cream/40">
                    {section.bengaliName}
                  </span>
                </div>

                {/* Section Songs */}
                <div className="space-y-1.5">
                  {section.items.map(({ track, overallIndex }, idx) => {
                    const isCurrent = overallIndex === currentTrackIndex;
                    const songNum = String(idx + 1).padStart(2, '0');

                    return (
                      <div
                        key={track.id}
                        onClick={() => {
                          onSelectTrack(overallIndex);
                        }}
                        className={`group p-3 flex items-center justify-between border transition-colors duration-200 cursor-pointer rounded-xl ${
                          isCurrent
                            ? 'border-white/40 bg-white/10 shadow-inner'
                            : 'border-white/5 hover:border-white/20 bg-transparent hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="font-sans text-xs tracking-widest text-sharodotsav-gold/70 tabular-nums">
                            {songNum}
                          </span>

                          <div className="min-w-0 pr-2">
                            <h5 className="font-serif text-xs sm:text-sm md:text-base tracking-wide text-sharodotsav-cream group-hover:text-sharodotsav-gold-light transition-colors truncate">
                              {track.title}
                            </h5>
                            <p className="font-sans text-[10px] sm:text-[11px] tracking-wider text-sharodotsav-cream/50 uppercase truncate mt-0.5">
                              {track.artist}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-xs font-sans text-sharodotsav-cream/40 tabular-nums font-light">
                            {track.durationFormatted}
                          </span>

                          <div className="w-6 h-6 flex items-center justify-center text-sharodotsav-gold">
                            {isCurrent ? (
                              isPlaying ? (
                                <Volume2 className="w-4 h-4 animate-pulse text-sharodotsav-gold" />
                              ) : (
                                <Play className="w-3.5 h-3.5 fill-sharodotsav-gold" />
                              )
                            ) : (
                              <Play className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-sharodotsav-gold" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-4 border-t border-sharodotsav-border/60 text-center">
          <p className="font-bengali text-xs tracking-[0.2em] text-sharodotsav-gold/80 font-light">
            পূজোর সুর · শরতের আলো
          </p>
        </div>

      </div>
    </div>
  );
});

PlaylistDrawer.displayName = 'PlaylistDrawer';
