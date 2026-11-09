import React, { useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Track } from '../types/playlist';
import { useSwipe } from '../hooks/useSwipe';

interface MusicPlayerProps {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = React.memo(({
  tracks,
  currentTrackIndex,
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  onPlayPause,
  onNext,
  onPrev,
  onSeek,
  onVolumeChange,
  onToggleMute
}) => {
  const currentTrack = tracks[currentTrackIndex] || tracks[0];
  const progressBarRef = useRef<HTMLDivElement>(null);
  const volumeBarRef = useRef<HTMLDivElement>(null);

  // Setup swipe listeners
  const playerContainerRef = useSwipe<HTMLDivElement>({
    onSwipeLeft: onNext,
    onSwipeRight: onPrev,
    threshold: 30
  });

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || duration <= 0) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(percentage * duration);
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeBarRef.current) return;
    const rect = volumeBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVol = Math.max(0, Math.min(1, clickX / rect.width));
    onVolumeChange(newVol);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const currentVol = isMuted ? 0 : volume;

  return (
    <footer
      id="player"
      ref={playerContainerRef}
      className="fixed bottom-4 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[96vw] sm:max-w-[650px] pointer-events-auto transition-all duration-300"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Moderately Sized Glassmorphism Capsule Box */}
      <div className="glass-player-box px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 md:gap-5 text-white">
        
        {/* Left Side: Circular Art + Track Info + Inline Mini Scrubber */}
        <div className="flex items-center gap-2 sm:gap-3.5 min-w-0 flex-1 relative z-10">
          {/* Circular Artwork */}
          <div className="relative w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 flex-shrink-0 rounded-full overflow-hidden bg-neutral-900 border border-white/20 shadow-sm">
            <img
              src={currentTrack.bgImage}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/assets/images/durga-puja.jpg';
              }}
            />
          </div>

          {/* Title, Artist & Scrubber under */}
          <div className="min-w-0 flex-1">
            <h4 className="font-sans font-bold text-[11px] xs:text-xs sm:text-[13px] text-white truncate leading-tight tracking-normal max-w-[90px] xs:max-w-[130px] sm:max-w-[190px] md:max-w-[220px]">
              {currentTrack.title}
            </h4>
            <p className="font-sans text-[9px] xs:text-[10px] sm:text-[11px] text-[#ded3d0] truncate font-normal leading-tight mt-0.5 max-w-[90px] xs:max-w-[130px] sm:max-w-[190px] md:max-w-[220px]">
              {currentTrack.artist}
            </p>

            {/* Inline Mini Scrubber with Time */}
            <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
              <div
                ref={progressBarRef}
                onClick={handleProgressClick}
                className="relative w-12 xs:w-18 sm:w-28 md:w-36 h-1 bg-white/20 rounded-full cursor-pointer group flex items-center"
              >
                <div
                  className="h-full bg-white/90 rounded-full relative"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#fbf6ec] rounded-full shadow-xs" />
                </div>
              </div>

              <span className="text-[9px] sm:text-[10px] md:text-[11px] font-sans text-white/75 tabular-nums font-normal select-none truncate">
                {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : currentTrack.durationFormatted}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Previous, Solid Circular Play, Next, Volume */}
        <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3.5 flex-shrink-0 relative z-10">
          {/* Previous Button */}
          <button
            onClick={onPrev}
            className="p-1 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Previous Track"
          >
            <SkipBack className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 fill-current" />
          </button>

          {/* Solid Cream Circular Play / Pause Button from reference */}
          <button
            onClick={onPlayPause}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-[#fbf6ec] hover:bg-white text-[#241211] flex items-center justify-center shadow-md transition-transform active:scale-95 hover:scale-105 cursor-pointer flex-shrink-0"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 fill-[#241211]" />
            ) : (
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 fill-[#241211] ml-0.5" />
            )}
          </button>

          {/* Next Button */}
          <button
            onClick={onNext}
            className="p-1 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Next Track"
          >
            <SkipForward className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 fill-current" />
          </button>

          {/* Volume Control */}
          <div className="hidden md:flex items-center gap-2 pl-0.5">
            <button
              onClick={onToggleMute}
              className="text-white/80 hover:text-white transition-colors p-0.5 cursor-pointer"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            <div
              ref={volumeBarRef}
              onClick={handleVolumeClick}
              className="relative w-14 sm:w-18 h-1 bg-white/20 rounded-full cursor-pointer flex items-center group"
            >
              <div
                className="h-full bg-white/90 rounded-full relative"
                style={{ width: `${currentVol * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 bg-[#fbf6ec] rounded-full shadow-xs" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
});

MusicPlayer.displayName = 'MusicPlayer';
