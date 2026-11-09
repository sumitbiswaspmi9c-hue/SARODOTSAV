/**
 * Ambient Audio Synthesizer Fallback
 * Provides warm, meditative festive soundscapes (Harmonic Tanpura drone + soft resonant bell pulses)
 * when local MP3 placeholder files are not yet present in the directory.
 */
class AmbientSoundGenerator {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private pulseInterval: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playTrackAtmosphere(trackIndex: number, volume: number = 0.7) {
    this.stop();
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.isRunning = true;
    this.setVolume(volume);

    // Root frequencies for different mood sessions
    // C# (138.59Hz), D# (155.56Hz), F# (185.00Hz), G# (207.65Hz)
    const baseFreqs = [138.59, 155.56, 185.0, 207.65];
    const root = baseFreqs[trackIndex % baseFreqs.length];

    // Harmonic Tanpura-style drone layers
    const intervals = [1, 1.5, 2, 2.99]; // Root, Fifth, Octave, Ninth
    this.oscillators = [];

    intervals.forEach((mult, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(root * mult, this.ctx.currentTime);

      // Subtle LFO vibrato / warmth
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.15 + i * 0.05, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(1.5, this.ctx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      const individualGain = 0.08 / (i + 1);
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(individualGain, this.ctx.currentTime + 2.0);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start();
      this.oscillators.push(osc);
    });

    // Gentle rhythmic temple bell / dhak pulse
    let beatStep = 0;
    this.pulseInterval = window.setInterval(() => {
      if (!this.isRunning || !this.ctx || !this.masterGain) return;
      this.triggerBell(root * (beatStep % 4 === 0 ? 3 : 4), beatStep % 4 === 0 ? 0.08 : 0.04);
      beatStep++;
    }, 1800);
  }

  private triggerBell(frequency: number, amplitude: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);

    gain.gain.setValueAtTime(amplitude, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 2.3);
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      const safeVol = Math.max(0, Math.min(1, vol)) * 0.5;
      this.masterGain.gain.setTargetAtTime(safeVol, this.ctx.currentTime, 0.1);
    }
  }

  public stop() {
    this.isRunning = false;
    if (this.pulseInterval) {
      clearInterval(this.pulseInterval);
      this.pulseInterval = null;
    }
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // already stopped
      }
    });
    this.oscillators = [];
  }
}

export const ambientSound = new AmbientSoundGenerator();
