import type { AmbientId } from '../types';

interface AmbientProfile {
  filterType: BiquadFilterType;
  filterFreq: number;
  filterQ: number;
  lfoRate: number; // Hz, slow swell
  lfoDepth: number; // 0..1 of base gain
  blips?: { minMs: number; maxMs: number; freqMin: number; freqMax: number };
}

const PROFILES: Record<AmbientId, AmbientProfile> = {
  ocean: { filterType: 'lowpass', filterFreq: 450, filterQ: 0.7, lfoRate: 0.09, lfoDepth: 0.6 },
  wind: { filterType: 'bandpass', filterFreq: 700, filterQ: 0.5, lfoRate: 0.13, lfoDepth: 0.5 },
  fireplace: { filterType: 'lowpass', filterFreq: 900, filterQ: 0.3, lfoRate: 0.5, lfoDepth: 0.35, blips: { minMs: 300, maxMs: 1400, freqMin: 1800, freqMax: 3200 } },
  'library-hush': { filterType: 'lowpass', filterFreq: 300, filterQ: 0.2, lfoRate: 0.04, lfoDepth: 0.2 },
  rain: { filterType: 'highpass', filterFreq: 1200, filterQ: 0.2, lfoRate: 0.2, lfoDepth: 0.3 },
  'magic-shimmer': { filterType: 'bandpass', filterFreq: 2200, filterQ: 4, lfoRate: 0.07, lfoDepth: 0.7, blips: { minMs: 900, maxMs: 2600, freqMin: 1800, freqMax: 3600 } },
  forge: { filterType: 'lowpass', filterFreq: 600, filterQ: 0.4, lfoRate: 0.6, lfoDepth: 0.4, blips: { minMs: 1200, maxMs: 2600, freqMin: 300, freqMax: 700 } },
  birdsong: { filterType: 'lowpass', filterFreq: 500, filterQ: 0.2, lfoRate: 0.06, lfoDepth: 0.3, blips: { minMs: 700, maxMs: 2400, freqMin: 2200, freqMax: 4200 } },
  underwater: { filterType: 'lowpass', filterFreq: 220, filterQ: 0.6, lfoRate: 0.1, lfoDepth: 0.5 },
  'greenhouse-drip': { filterType: 'lowpass', filterFreq: 350, filterQ: 0.2, lfoRate: 0.05, lfoDepth: 0.25, blips: { minMs: 1600, maxMs: 4200, freqMin: 900, freqMax: 1500 } },
  'great-hall-murmur': { filterType: 'bandpass', filterFreq: 500, filterQ: 0.3, lfoRate: 0.3, lfoDepth: 0.3 },
  'night-crickets': { filterType: 'bandpass', filterFreq: 3200, filterQ: 6, lfoRate: 0.4, lfoDepth: 0.4, blips: { minMs: 200, maxMs: 500, freqMin: 3000, freqMax: 3600 } },
};

export class AmbientEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private nodes: AudioNode[] = [];
  private blipTimer: number | null = null;
  private current: AmbientId | null = null;

  start(ambientId: AmbientId, volume: number) {
    this.stop();
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    const ctx = new Ctor();
    this.ctx = ctx;
    this.current = ambientId;
    const profile = PROFILES[ambientId];

    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i += 1) data[i] = Math.random() * 2 - 1;

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = profile.filterType;
    filter.frequency.value = profile.filterFreq;
    filter.Q.value = profile.filterQ;

    const master = ctx.createGain();
    master.gain.value = volume;
    this.master = master;

    const swell = ctx.createGain();
    swell.gain.value = 1 - profile.lfoDepth / 2;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = profile.lfoRate;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = profile.lfoDepth / 2;
    lfo.connect(lfoGain).connect(swell.gain);
    lfo.start();

    noise.connect(filter).connect(swell).connect(master).connect(ctx.destination);
    noise.start();

    this.nodes = [noise, filter, master, swell, lfo, lfoGain];

    if (profile.blips) {
      const scheduleBlip = () => {
        const { minMs, maxMs, freqMin, freqMax } = profile.blips!;
        const delay = minMs + Math.random() * (maxMs - minMs);
        this.blipTimer = window.setTimeout(() => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const g = this.ctx.createGain();
          osc.frequency.value = freqMin + Math.random() * (freqMax - freqMin);
          osc.type = 'sine';
          const t = this.ctx.currentTime;
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.18, t + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
          osc.connect(g).connect(master);
          osc.start(t);
          osc.stop(t + 0.4);
          scheduleBlip();
        }, delay);
      };
      scheduleBlip();
    }
  }

  setVolume(volume: number) {
    if (this.master) this.master.gain.value = volume;
  }

  stop() {
    if (this.blipTimer) { window.clearTimeout(this.blipTimer); this.blipTimer = null; }
    this.nodes.forEach((n) => { try { (n as OscillatorNode).stop?.(); } catch { /* already stopped */ } });
    this.nodes = [];
    if (this.ctx) { this.ctx.close().catch(() => {}); this.ctx = null; }
    this.master = null;
    this.current = null;
  }

  get playingId() { return this.current; }
}
