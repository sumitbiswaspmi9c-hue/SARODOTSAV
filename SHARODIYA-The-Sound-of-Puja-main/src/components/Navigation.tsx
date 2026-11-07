import React, { useState, useEffect } from 'react';

interface NavigationProps {
  onOpenPlaylist?: () => void;
  onOpenAbout?: () => void;
  onOpenMahalaya?: () => void;
  onBackToPuja?: () => void;
  activeView?: 'puja' | 'mahalaya';
}

export const Navigation: React.FC<NavigationProps> = React.memo(({
  onOpenPlaylist,
  onOpenMahalaya,
  onBackToPuja,
  activeView = 'puja'
}) => {
  const [time, setTime] = useState<string>(() => {
    return new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  });

  const [onlineCount, setOnlineCount] = useState<number>(1);

  // Time & True Live Real-Time User/Tab Presence Tracking
  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      );
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    // Unique ID for current active browser session/tab
    const sessionId = Math.random().toString(36).substring(2, 9);
    const STORAGE_KEY = 'sharodotsav_live_active_sessions';

    const getCleanSessions = (): Record<string, number> => {
      try {
        const now = Date.now();
        const raw = localStorage.getItem(STORAGE_KEY);
        const sessions: Record<string, number> = raw ? JSON.parse(raw) : {};
        // Prune stale sessions older than 6 seconds
        return Object.fromEntries(
          Object.entries(sessions).filter(([, ts]) => now - (ts as number) < 6000)
        );
      } catch {
        return {};
      }
    };

    const updatePresence = () => {
      try {
        const now = Date.now();
        const sessions = getCleanSessions();
        sessions[sessionId] = now;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
        const activeCount = Object.keys(sessions).length;
        setOnlineCount(Math.max(1, activeCount));
      } catch {
        setOnlineCount(1);
      }
    };

    updatePresence();
    const heartbeatInterval = setInterval(updatePresence, 2500);

    // BroadcastChannel for immediate instant cross-tab synchronization
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel('sharodotsav_live_presence');
      channel.onmessage = () => {
        const sessions = getCleanSessions();
        const activeCount = Object.keys(sessions).length;
        setOnlineCount(Math.max(1, activeCount));
      };
      channel.postMessage({ type: 'PING', sessionId });
    } catch {
      // BroadcastChannel fallback handled by storage listener
    }

    // Storage event listener for immediate sync across windows/tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        const sessions = getCleanSessions();
        const activeCount = Object.keys(sessions).length;
        setOnlineCount(Math.max(1, activeCount));
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // Cleanup on tab close/unload
    const handleBeforeUnload = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const sessions: Record<string, number> = JSON.parse(raw);
          delete sessions[sessionId];
          localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
        }
        if (channel) {
          channel.postMessage({ type: 'LEAVE', sessionId });
        }
      } catch {
        // Ignore
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(timeInterval);
      clearInterval(heartbeatInterval);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleBeforeUnload();
      if (channel) channel.close();
    };
  }, []);

  const handleClockClick = () => {
    if (activeView === 'mahalaya' && onBackToPuja) {
      onBackToPuja();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-3.5 sm:px-8 md:px-12 py-3.5 sm:py-6 md:py-8 pointer-events-auto">
      {/* Left side: Simple Digital Clock (e.g. 11:30 PM) */}
      <div 
        onClick={handleClockClick}
        className="cursor-pointer font-sans text-[11px] sm:text-xs md:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase font-light text-white/80 hover:text-white transition-colors duration-300 select-none flex-shrink-0"
      >
        {time}
      </div>

      {/* Upper Middle Section: True Live Active People Count with Green Dot & Reduced 'online' */}
      <div className="hidden min-[420px]:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 font-sans select-none pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
        <span className="text-[11px] sm:text-xs md:text-sm tracking-[0.15em] sm:tracking-[0.18em] uppercase font-light text-white/85">
          {onlineCount}
        </span>
        <span className="text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.18em] uppercase font-bold text-white/85">
  BY SUMIT
</span>
      </div>

      {/* Right side: Action Buttons with Upper Row and Spotify/YT Music Row Below */}
      <div className="flex flex-col items-end gap-1.5 sm:gap-2 flex-shrink-0">
        {/* Upper Row: Mahalaya/Back & Playlist */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Back button (when in Mahalaya view) OR Mahalaya button (when in Puja view) */}
          {activeView === 'mahalaya' ? (
            <button
              onClick={onBackToPuja}
              className="group px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/25 hover:border-white/50 bg-transparent hover:bg-white/10 text-white/90 hover:text-white backdrop-blur-xs transition-all duration-300 cursor-pointer text-[10px] sm:text-xs font-sans tracking-[0.18em] sm:tracking-[0.22em] uppercase font-light"
              aria-label="Back to Puja"
            >
              Back
            </button>
          ) : (
            <button
              onClick={onOpenMahalaya}
              className="group px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/25 hover:border-white/50 bg-transparent hover:bg-white/10 text-white/90 hover:text-white backdrop-blur-xs transition-all duration-300 cursor-pointer text-[10px] sm:text-xs font-sans tracking-[0.18em] sm:tracking-[0.22em] uppercase font-light"
              aria-label="Open Mahalaya Page"
            >
              Mahalaya
            </button>
          )}

          {/* Playlist Button */}
          <button
            onClick={onOpenPlaylist}
            className="group px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/25 hover:border-white/50 bg-transparent hover:bg-white/10 text-white/90 hover:text-white backdrop-blur-xs transition-all duration-300 cursor-pointer text-[10px] sm:text-xs font-sans tracking-[0.18em] sm:tracking-[0.22em] uppercase font-light"
            aria-label="Open Playlist"
          >
            Playlist
          </button>
        </div>

        {/* Lower Row: Spotify & YT Music Links below the top buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <a
            href="https://open.spotify.com/search/durga%20puja%20bengali%20songs"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-2.5 sm:px-3.5 py-1 rounded-full border border-white/20 hover:border-white/45 bg-transparent hover:bg-white/10 text-white/80 hover:text-white backdrop-blur-xs transition-all duration-300 cursor-pointer flex items-center gap-1.5 text-[9px] sm:text-[11px] font-sans font-light"
            aria-label="Spotify Search"
          >
            <svg className="w-3 h-3 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.309c-.216.354-.678.468-1.032.252-2.825-1.727-6.381-2.118-10.57-1.162-.404.092-.806-.162-.898-.566-.092-.404.162-.806.566-.898 4.588-1.047 8.523-.604 11.682 1.342.354.216.468.678.252 1.032zm1.47-3.267c-.272.442-.85.584-1.292.312-3.234-1.988-8.163-2.564-11.989-1.402-.498.152-1.026-.134-1.178-.632-.152-.498.134-1.026.632-1.178 4.375-1.328 9.809-.684 13.515 1.594.442.272.584.85.312 1.292zm.126-3.41c-3.878-2.303-10.279-2.515-13.985-1.389-.594.18-1.226-.156-1.406-.75-.18-.594.156-1.226.75-1.406 4.258-1.293 11.319-1.047 15.795 1.611.534.317.708 1.012.391 1.546-.317.534-1.012.708-1.546.391z" />
            </svg>
            <span>Spotify</span>
          </a>

          <a
            href="https://music.youtube.com/search?q=durga+puja+songs"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-2.5 sm:px-3.5 py-1 rounded-full border border-white/20 hover:border-white/45 bg-transparent hover:bg-white/10 text-white/80 hover:text-white backdrop-blur-xs transition-all duration-300 cursor-pointer flex items-center gap-1.5 text-[9px] sm:text-[11px] font-sans font-light"
            aria-label="YouTube Music Search"
          >
            <svg className="w-3 h-3 text-[#FF0000]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.2c-3.978 0-7.2-3.222-7.2-7.2 0-3.978 3.222-7.2 7.2-7.2 3.978 0 7.2 3.222 7.2 7.2 0 3.978-3.222 7.2-7.2 7.2zm0-11.4c-2.316 0-4.2 1.884-4.2 4.2s1.884 4.2 4.2 4.2 4.2-1.884 4.2-4.2-1.884-4.2-4.2-4.2zm-1.8 6.12V10.08L14.52 12 10.2 13.92z" />
            </svg>
            <span>YT Music</span>
          </a>
        </div>
      </div>
    </header>
  );
});

Navigation.displayName = 'Navigation';
