import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { PLAYLIST, MAHALAYA_TRACK } from './data/playlist';
import { BackgroundManager } from './components/BackgroundManager';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { MahalayaView } from './components/MahalayaView';
import { MusicPlayer } from './components/MusicPlayer';
import { PujaSection } from './components/PujaSection';
import { CurationSection } from './components/CurationSection';
import { PlaylistDrawer } from './components/PlaylistDrawer';
import { AboutModal } from './components/AboutModal';
import { ambientSound } from './utils/audioFallback';
import { Track } from './types/playlist';

const ALL_TRACKS: Track[] = [MAHALAYA_TRACK, ...PLAYLIST];

export function App() {
  const [activeView, setActiveView] = useState<'puja' | 'mahalaya'>('puja');
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [activeTrack, setActiveTrack] = useState<Track>(PLAYLIST[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(PLAYLIST[0].duration);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isSynthesizerActive, setIsSynthesizerActive] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthTimerRef = useRef<number | null>(null);

  // Set default audio volume on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  }, []);

  // Helper to start fallback synthesized audio
  const startFallbackAudio = useCallback((track: Track, vol: number) => {
    setIsSynthesizerActive(true);
    const effectiveVol = isMuted ? 0 : vol;
    const trackIdx = track.id === 'track-mahalaya' ? 0 : currentTrackIndex;
    ambientSound.playTrackAtmosphere(trackIdx, effectiveVol);

    if (synthTimerRef.current) clearInterval(synthTimerRef.current);
    synthTimerRef.current = window.setInterval(() => {
      setCurrentTime(prev => {
        const next = prev + 1;
        if (next >= track.duration) {
          return 0;
        }
        return next;
      });
    }, 1000);
  }, [isMuted, currentTrackIndex]);

  // Handle Playback for any track (Puja or Mahalaya)
  const playSpecificTrack = useCallback(async (track: Track, index?: number) => {
    if (index !== undefined) {
      setCurrentTrackIndex(index);
    }
    setActiveTrack(track);
    setDuration(track.duration);
    setCurrentTime(0);

    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }

    if (audioRef.current) {
      audioRef.current.src = track.audioSrc;
      audioRef.current.volume = isMuted ? 0 : volume;

      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setIsSynthesizerActive(false);
        ambientSound.stop();
      } catch {
        // Autoplay restricted or MP3 placeholder 404 -> Switch seamlessly to atmospheric synthesized audio
        setIsPlaying(true);
        startFallbackAudio(track, volume);
      }
    }
  }, [isMuted, volume, startFallbackAudio]);

  const playPujaTrack = useCallback((index: number) => {
    setActiveView('puja');
    playSpecificTrack(PLAYLIST[index], index);
  }, [playSpecificTrack]);

  const playMahalaya = useCallback(() => {
    setActiveView('mahalaya');
    setHasStarted(true);
    playSpecificTrack(MAHALAYA_TRACK);
  }, [playSpecificTrack]);

  const togglePlayPause = useCallback(() => {
    if (!hasStarted) {
      setHasStarted(true);
      if (activeView === 'mahalaya') {
        playSpecificTrack(MAHALAYA_TRACK);
      } else {
        playSpecificTrack(PLAYLIST[currentTrackIndex], currentTrackIndex);
      }
      return;
    }

    if (isPlaying) {
      if (audioRef.current && !isSynthesizerActive) {
        audioRef.current.pause();
      }
      if (isSynthesizerActive) {
        ambientSound.stop();
        if (synthTimerRef.current) clearInterval(synthTimerRef.current);
      }
      setIsPlaying(false);
    } else {
      if (isSynthesizerActive) {
        startFallbackAudio(activeTrack, volume);
        setIsPlaying(true);
      } else if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          startFallbackAudio(activeTrack, volume);
          setIsPlaying(true);
        });
      }
    }
  }, [hasStarted, activeView, isPlaying, isSynthesizerActive, playSpecificTrack, currentTrackIndex, startFallbackAudio, activeTrack, volume]);

  const handleNextTrack = useCallback(() => {
    if (activeView === 'mahalaya') {
      // Switching from Mahalaya to first Puja track
      playPujaTrack(0);
      return;
    }
    const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
    if (isPlaying || hasStarted) {
      playPujaTrack(nextIndex);
    } else {
      setCurrentTrackIndex(nextIndex);
      setActiveTrack(PLAYLIST[nextIndex]);
      setDuration(PLAYLIST[nextIndex].duration);
      setCurrentTime(0);
    }
  }, [activeView, currentTrackIndex, isPlaying, hasStarted, playPujaTrack]);

  const handlePrevTrack = useCallback(() => {
    if (activeView === 'mahalaya') {
      playPujaTrack(PLAYLIST.length - 1);
      return;
    }
    const prevIndex = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    if (isPlaying || hasStarted) {
      playPujaTrack(prevIndex);
    } else {
      setCurrentTrackIndex(prevIndex);
      setActiveTrack(PLAYLIST[prevIndex]);
      setDuration(PLAYLIST[prevIndex].duration);
      setCurrentTime(0);
    }
  }, [activeView, currentTrackIndex, isPlaying, hasStarted, playPujaTrack]);

  const handleSeek = useCallback((newTime: number) => {
    setCurrentTime(newTime);
    if (audioRef.current && !isSynthesizerActive) {
      audioRef.current.currentTime = newTime;
    }
  }, [isSynthesizerActive]);

  const handleVolumeChange = useCallback((newVol: number) => {
    setVolume(newVol);
    setIsMuted(false);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
    if (isSynthesizerActive) {
      ambientSound.setVolume(newVol);
    }
  }, [isSynthesizerActive]);

  const handleToggleMute = useCallback(() => {
    setIsMuted((prevMuted) => {
      const nextMuted = !prevMuted;
      if (audioRef.current) {
        audioRef.current.volume = nextMuted ? 0 : volume;
      }
      if (isSynthesizerActive) {
        ambientSound.setVolume(nextMuted ? 0 : volume);
      }
      return nextMuted;
    });
  }, [volume, isSynthesizerActive]);

  const handleEnter = useCallback(() => {
    if (!hasStarted) {
      setHasStarted(true);
      playSpecificTrack(PLAYLIST[currentTrackIndex], currentTrackIndex);
      const el = document.getElementById('puja-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      togglePlayPause();
    }
  }, [hasStarted, playSpecificTrack, currentTrackIndex, togglePlayPause]);

  // HTML5 Audio Event Listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let lastTimeUpdate = 0;
    const onTimeUpdate = () => {
      if (!isSynthesizerActive) {
        const now = performance.now();
        // Throttle timeupdate to ~12fps for buttery UI without clogging main thread
        if (now - lastTimeUpdate > 80) {
          lastTimeUpdate = now;
          setCurrentTime(audio.currentTime);
        }
      }
    };

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onEnded = () => {
      if (activeView === 'mahalaya' || activeTrack.id === 'track-mahalaya') {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }
      } else {
        handleNextTrack();
      }
    };

    const onError = () => {
      if (isPlaying) {
        startFallbackAudio(activeTrack, volume);
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [activeTrack, activeView, handleNextTrack, isPlaying, isSynthesizerActive, startFallbackAudio, volume]);

  const currentOverallIndex = useMemo(() => {
    return activeView === 'mahalaya' ? 0 : currentTrackIndex + 1;
  }, [activeView, currentTrackIndex]);

  const handleOpenMahalaya = useCallback(() => {
    playMahalaya();
  }, [playMahalaya]);

  const handleBackToPuja = useCallback(() => {
    setActiveView('puja');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleOpenPlaylist = useCallback(() => {
    setIsPlaylistOpen(true);
  }, []);

  const handleClosePlaylist = useCallback(() => {
    setIsPlaylistOpen(false);
  }, []);

  const handleSelectPlaylistTrack = useCallback((idx: number) => {
    setHasStarted(true);
    if (idx === 0) {
      playMahalaya();
    } else {
      playPujaTrack(idx - 1);
    }
    setIsPlaylistOpen(false);
  }, [playMahalaya, playPujaTrack]);

  const handleSelectTithiTrack = useCallback((idx: number) => {
    setHasStarted(true);
    playPujaTrack(idx);
  }, [playPujaTrack]);

  const handleHoverTithiTrack = useCallback((idx: number) => {
    setCurrentTrackIndex(idx);
  }, []);

  const handleSelectRotation = useCallback((dayKey: string) => {
    setHasStarted(true);
    if (dayKey === 'Mahalaya') {
      playMahalaya();
    } else {
      setActiveView('puja');
      const idx = PLAYLIST.findIndex(t => t.tithi?.toLowerCase() === dayKey.toLowerCase());
      if (idx !== -1) {
        playPujaTrack(idx);
      }
    }
  }, [playMahalaya, playPujaTrack]);

  const playerTracks = useMemo(() => {
    return activeView === 'mahalaya' ? [MAHALAYA_TRACK] : PLAYLIST;
  }, [activeView]);

  return (
    <div className="relative min-h-screen w-full bg-sharodotsav-dark text-sharodotsav-cream selection:bg-sharodotsav-gold/30">
      {/* Hidden HTML5 Audio Element with Loop on Mahalaya */}
      <audio
        ref={audioRef}
        loop={activeView === 'mahalaya' || activeTrack.id === 'track-mahalaya'}
        preload="metadata"
      />

      {/* Static Background Image Manager */}
      <BackgroundManager
        tracks={PLAYLIST}
        currentTrackIndex={currentTrackIndex}
        hasStarted={hasStarted}
        isMahalayaView={activeView === 'mahalaya'}
      />

      {/* Minimal Top Navigation with Back / Mahalaya and Playlist */}
      <Navigation
        activeView={activeView}
        onOpenMahalaya={handleOpenMahalaya}
        onBackToPuja={handleBackToPuja}
        onOpenPlaylist={handleOpenPlaylist}
      />

      {/* Main View: Either Mahalaya Page or Puja Experience */}
      <main>
        {activeView === 'mahalaya' ? (
          <MahalayaView
            track={MAHALAYA_TRACK}
            isPlaying={isPlaying && activeTrack.id === 'track-mahalaya'}
            onPlayMahalaya={playMahalaya}
          />
        ) : (
          <>
            <Hero
              onEnter={handleEnter}
              hasStarted={hasStarted}
              isPlaying={isPlaying && activeTrack.id !== 'track-mahalaya'}
              activeTrackTitle={activeTrack.title}
            />

            <PujaSection
              currentTrackIndex={currentTrackIndex}
              onSelectTithiTrack={handleSelectTithiTrack}
              onHoverTithiTrack={handleHoverTithiTrack}
            />

            {/* Editorial Curation & Rotations Section matching reference */}
            <CurationSection
              onSelectRotation={handleSelectRotation}
              onOpenPlaylist={handleOpenPlaylist}
            />
          </>
        )}
      </main>

      {/* Fixed Bottom Minimal Music Player */}
      <MusicPlayer
        tracks={playerTracks}
        currentTrackIndex={activeView === 'mahalaya' ? 0 : currentTrackIndex}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isMuted={isMuted}
        onPlayPause={togglePlayPause}
        onNext={handleNextTrack}
        onPrev={handlePrevTrack}
        onSeek={handleSeek}
        onVolumeChange={handleVolumeChange}
        onToggleMute={handleToggleMute}
      />

      {/* Editorial Playlist Drawer (includes Mahalaya + All 5 Days) */}
      <PlaylistDrawer
        isOpen={isPlaylistOpen}
        onClose={handleClosePlaylist}
        tracks={ALL_TRACKS}
        currentTrackIndex={currentOverallIndex}
        isPlaying={isPlaying}
        onSelectTrack={handleSelectPlaylistTrack}
      />

      {/* Editorial About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
}

export default App;
