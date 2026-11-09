import React, { memo, useState, useEffect } from 'react';
import { Track } from '../types/playlist';

interface BackgroundManagerProps {
  tracks: Track[];
  currentTrackIndex: number;
  hasStarted?: boolean;
  isMahalayaView?: boolean;
}

export const BackgroundManager: React.FC<BackgroundManagerProps> = memo(({
  tracks,
  currentTrackIndex,
  hasStarted = false,
  isMahalayaView = false
}) => {
  const showHeroBg = !hasStarted || isMahalayaView;
  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  // Keep track of active and previous background for super lightweight, high-FPS crossfading
  const [bgState, setBgState] = useState<{
    currentBg: string;
    prevBg: string | null;
  }>({
    currentBg: currentTrack?.bgImage || '/assets/images/hero-bg.png',
    prevBg: null
  });

  useEffect(() => {
    const targetBg = showHeroBg ? '/assets/images/hero-bg.png' : (currentTrack?.bgImage || '/assets/images/hero-bg.png');
    if (targetBg !== bgState.currentBg) {
      setBgState({
        prevBg: bgState.currentBg,
        currentBg: targetBg
      });
    }
  }, [showHeroBg, currentTrack?.bgImage, bgState.currentBg]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-sharodotsav-dark transform-gpu">
      {/* Previous Background Crossfade Out */}
      {bgState.prevBg && (
        <div
          key={bgState.prevBg}
          className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out opacity-0 z-0 will-change-opacity"
        >
          <img
            src={bgState.prevBg}
            alt="Previous Scene"
            className="w-full h-full object-cover object-center transform-gpu brightness-[0.95] contrast-[1.02] saturate-[1.04]"
            loading="eager"
          />
        </div>
      )}

      {/* Current Active Background Crossfade In */}
      <div
        key={bgState.currentBg}
        className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out opacity-100 z-10 will-change-opacity"
      >
        <img
          src={bgState.currentBg}
          alt="Active Scene"
          className="w-full h-full object-cover object-center transform-gpu brightness-[0.95] contrast-[1.02] saturate-[1.04]"
          loading="eager"
          onError={(e) => {
            e.currentTarget.src = '/assets/images/durga-puja.jpg';
          }}
        />
      </div>

      {/* Balanced Ambient Vignette & Atmospheric Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/50 pointer-events-none z-20" />
      <div className="absolute inset-0 bg-radial-gradient opacity-80 pointer-events-none z-20" />
    </div>
  );
});

BackgroundManager.displayName = 'BackgroundManager';
