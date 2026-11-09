export interface Track {
  id: string;
  number: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  durationFormatted: string;
  audioSrc: string;
  bgImage: string;
  description?: string;
  tithi?: string;
}

export interface PlayerState {
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  hasStarted: boolean;
}
