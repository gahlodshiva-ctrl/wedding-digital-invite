/**
 * Audio Controller & Web Audio Sound Effects
 */

class WeddingAudioManager {
  constructor() {
    this.audioElement = new Audio();
    this.audioElement.loop = true;
    this.audioElement.preload = "auto";
    this.isPlaying = false;
    this.audioContext = null;
    
    // UI elements
    this.musicBar = document.getElementById("floating-music-bar");
    this.diskBtn = document.getElementById("music-disk-btn");
    this.statusText = document.getElementById("music-status");
    this.titleText = document.getElementById("music-title");

    this.initAudio();
  }

  initAudio() {
    const config = window.WEDDING_CONFIG?.audio || {};
    this.audioElement.src = config.musicSrc || "assets/audio/music.mp3";
    this.audioElement.volume = config.defaultVolume || 0.7;

    if (this.titleText && config.title) {
      this.titleText.textContent = config.title;
    }

    if (this.diskBtn) {
      this.diskBtn.addEventListener("click", () => this.togglePlay());
    }

    // Keep UI in sync with audio state
    this.audioElement.addEventListener("play", () => this.updateUI(true));
    this.audioElement.addEventListener("pause", () => this.updateUI(false));
  }

  /**
   * Initializes Web Audio Context for synthesized chimes
   */
  getAudioContext() {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    if (this.audioContext && this.audioContext.state === "suspended") {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  /**
   * Generates a magical golden chime / wax seal break sound using Web Audio API
   */
  playChimeSound() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      // Beautiful harmonic major chord (F# - A# - C# - F#)
      const frequencies = [587.33, 739.99, 880.00, 1174.66, 1479.98];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        // Bell-like decay envelope
        gain.gain.setValueAtTime(0, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 1.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 1.5);
      });
    } catch (e) {
      console.warn("Web Audio Chime error:", e);
    }
  }

  /**
   * Starts playing background music with gentle fade-in
   */
  startBackgroundMusic() {
    this.getAudioContext();
    this.playChimeSound();

    const targetVolume = window.WEDDING_CONFIG?.audio?.defaultVolume || 0.7;
    this.audioElement.volume = 0.05;

    const playPromise = this.audioElement.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.updateUI(true);

          // Fade volume in smoothly
          let vol = 0.05;
          const fadeInterval = setInterval(() => {
            if (vol < targetVolume) {
              vol = Math.min(targetVolume, vol + 0.05);
              this.audioElement.volume = vol;
            } else {
              clearInterval(fadeInterval);
            }
          }, 120);
        })
        .catch((err) => {
          console.warn("Autoplay was prevented by browser policy:", err);
          this.updateUI(false);
        });
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.audioElement.pause();
      this.isPlaying = false;
      this.updateUI(false);
    } else {
      this.audioElement.play().then(() => {
        this.isPlaying = true;
        this.updateUI(true);
      });
    }
  }

  updateUI(isPlaying) {
    if (this.diskBtn) {
      if (isPlaying) {
        this.diskBtn.classList.add("playing");
        this.diskBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1"></rect>
            <rect x="14" y="4" width="4" height="16" rx="1"></rect>
          </svg>
        `;
      } else {
        this.diskBtn.classList.remove("playing");
        this.diskBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        `;
      }
    }

    if (this.musicBar) {
      if (isPlaying) {
        this.musicBar.classList.add("playing");
      } else {
        this.musicBar.classList.remove("playing");
      }
    }

    if (this.statusText) {
      this.statusText.textContent = isPlaying ? "Now Playing" : "Paused";
    }
  }
}

window.weddingAudio = new WeddingAudioManager();
