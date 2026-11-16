/**
 * ============================================================================
 * SOUND ENGINE (Web Audio API) — PT GARIS CERITA KARYA
 * ============================================================================
 * Menghasilkan efek suara telepon meja klasik (dual-bell mechanical ring,
 * bunyi angkat gagang telepon, dan nada sambung) serta efek pensil/kertas
 * arsitektur secara prosedural tanpa ketergantungan file MP3 eksternal.
 */

class StudioSoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.isRinging = false;
    this.ringTimeouts = [];
    this.onRingStateChange = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
      this.stopPhoneRing();
    }
    return this.muted;
  }

  /**
   * Efek halus goresan pensil ketika kursor menyentuh hotspot 3D
   */
  playHoverTick() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.045);

      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.055);
    } catch (_) {
      // Ignore audio autoplay blocks prior to user gesture
    }
  }

  /**
   * Efek suara zoom / buka lembar kertas sketsa
   */
  playPaperZoom() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Filtered noise burst for warm paper rustle + subtle chime
      const bufferSize = this.ctx.sampleRate * 0.14;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1100, now);
      filter.Q.setValueAtTime(1.8, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
    } catch (_) {}
  }

  /**
   * Efek Suara Utama: Dering Telepon Studio Klasik + Angkat Gagang + Nada Sambung
   */
  playTelephoneRingSequence(onUpdateCallback) {
    this.stopPhoneRing();
    this.initContext();
    if (!this.ctx || this.muted) {
      if (onUpdateCallback) onUpdateCallback("muted");
      return;
    }

    this.isRinging = true;
    if (this.onRingStateChange) this.onRingStateChange(true);
    if (onUpdateCallback) onUpdateCallback("ringing-1");

    // 1. Dering Pertama (0.0s - 0.85s)
    this._triggerMechanicalBellBurst(0.0, 0.85);

    // 2. Dering Kedua (1.15s - 2.0s)
    const t1 = setTimeout(() => {
      if (!this.isRinging) return;
      if (onUpdateCallback) onUpdateCallback("ringing-2");
    }, 1150);
    this._triggerMechanicalBellBurst(1.15, 0.85);

    // 3. Bunyi Klik Angkat Gagang Telepon + Sapaan Nada Sambung Studio (2.2s)
    const t2 = setTimeout(() => {
      if (!this.isRinging) return;
      this._triggerPickupAndDialTone();
      if (onUpdateCallback) onUpdateCallback("connected");
    }, 2200);

    // 4. Selesai (3.6s)
    const t3 = setTimeout(() => {
      this.isRinging = false;
      if (this.onRingStateChange) this.onRingStateChange(false);
      if (onUpdateCallback) onUpdateCallback("idle");
    }, 3650);

    this.ringTimeouts.push(t1, t2, t3);
  }

  _triggerMechanicalBellBurst(startOffsetSec, durationSec) {
    if (!this.ctx || this.muted) return;
    const start = this.ctx.currentTime + startOffsetSec;
    const end = start + durationSec;

    // Dua frekuensi lonceng kuningan telepon meja klasik + harmonik
    const freqs = [820, 1085, 1640, 2170];
    const weights = [0.14, 0.12, 0.04, 0.03];

    // Modulator pemukul lonceng mekanik (22 Hz clapper)
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.type = "square";
    lfo.frequency.setValueAtTime(22, start);
    lfoGain.gain.setValueAtTime(0.5, start);

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, start);
    masterGain.gain.linearRampToValueAtTime(0.28, start + 0.03);
    masterGain.gain.setValueAtTime(0.26, end - 0.06);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, end);

    lfo.connect(lfoGain);
    lfoGain.connect(masterGain.gain);
    masterGain.connect(this.ctx.destination);

    freqs.forEach((f, idx) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = idx < 2 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(f, start);
      oscGain.gain.setValueAtTime(weights[idx], start);
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start(start);
      osc.stop(end + 0.02);
    });

    lfo.start(start);
    lfo.stop(end + 0.02);
  }

  _triggerPickupAndDialTone() {
    if (!this.ctx || this.muted) return;
    const now = this.ctx.currentTime;

    // 1. Klik Mekanik Gagang Telepon Diangkat
    const clickOsc = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    clickOsc.type = "sawtooth";
    clickOsc.frequency.setValueAtTime(190, now);
    clickOsc.frequency.exponentialRampToValueAtTime(65, now + 0.06);
    clickGain.gain.setValueAtTime(0.18, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);
    clickOsc.connect(clickGain);
    clickGain.connect(this.ctx.destination);
    clickOsc.start(now);
    clickOsc.stop(now + 0.07);

    // 2. Nada Sambung Hangat (Dual-tone 350Hz + 440Hz + Chime Sambutan)
    const toneStart = now + 0.1;
    const toneEnd = now + 1.3;
    [350, 440].forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, toneStart);
      gain.gain.setValueAtTime(0.001, toneStart);
      gain.gain.linearRampToValueAtTime(0.055, toneStart + 0.05);
      gain.gain.setValueAtTime(0.05, toneEnd - 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, toneEnd);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(toneStart);
      osc.stop(toneEnd);
    });
  }

  stopPhoneRing() {
    this.isRinging = false;
    this.ringTimeouts.forEach((t) => clearTimeout(t));
    this.ringTimeouts = [];
    if (this.onRingStateChange) this.onRingStateChange(false);
  }
}

window.soundEngine = new StudioSoundEngine();
