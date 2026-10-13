// Simple, clean Web Audio API sound generator for cute playful feedback

let audioCtx: AudioContext | null = null;
let isMuted = false;

export function initAudio() {
  if (typeof window === 'undefined') return;
  const saved = localStorage.getItem('ecopals_sound_muted');
  if (saved !== null) {
    isMuted = saved === 'true';
  }
}

export function isAudioMuted(): boolean {
  return isMuted;
}

export function toggleAudioMute(): boolean {
  isMuted = !isMuted;
  if (typeof window !== 'undefined') {
    localStorage.setItem('ecopals_sound_muted', String(isMuted));
  }
  return isMuted;
}

function getAudioContext(): AudioContext | null {
  if (isMuted || typeof window === 'undefined') return null;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtx && AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

// Gentle friendly pop sound
export function playPop() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  } catch {
    // Ignore audio errors gracefully
  }
}

// Correct chime sound
export function playSuccess() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      const time = now + idx * 0.08;
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.14, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.25);
    });
  } catch {
    // Ignore
  }
}

// Gentle try again tone (soft, non-punishing)
export function playWrong() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.linearRampToValueAtTime(260, now + 0.15);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  } catch {
    // Ignore
  }
}

// Fanfare cheer when quiz finishes
export function playFanfare() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    const now = ctx.currentTime;
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      const time = now + i * 0.1;
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.16, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.35);
    });
  } catch {
    // Ignore
  }
}
