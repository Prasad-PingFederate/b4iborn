class AudioEngine {
    constructor() {
        this.ctx = null;
        this.masterVolume = null;
        this.instruments = {};
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();

        this.masterVolume = this.ctx.createGain();
        this.masterVolume.gain.value = 0.7;
        this.masterVolume.connect(this.ctx.destination);

        this.isInitialized = true;
        console.log("Audio Engine Initialized");
    }

    setVolume(value) {
        if (this.masterVolume) {
            this.masterVolume.gain.setTargetAtTime(value / 100, this.ctx.currentTime, 0.1);
        }
    }

    // A simple synthesizer for instruments
    playNote(frequency, type = 'piano', duration = 0.5) {
        if (!this.ctx) this.init();
        if (this.ctx.state === 'suspended') this.ctx.resume();

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Instrument sound profiles
        switch (type) {
            case 'piano':
                osc.type = 'sine';
                gain.gain.setValueAtTime(0, this.ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.5, this.ctx.currentTime + 0.01);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
                break;
            case 'keyboard':
                osc.type = 'square';
                const synthFilter = this.ctx.createBiquadFilter();
                synthFilter.type = "lowpass";
                synthFilter.frequency.setValueAtTime(2000, this.ctx.currentTime);
                synthFilter.frequency.exponentialRampToValueAtTime(500, this.ctx.currentTime + duration);
                osc.connect(synthFilter);
                synthFilter.connect(gain);

                gain.gain.setValueAtTime(0, this.ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
                break;
            case 'guitar':
                osc.type = 'triangle';
                gain.gain.setValueAtTime(0, this.ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.01);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration * 2);
                break;
            case 'drums':
                // Simple kick/snare logic can go here
                osc.type = 'sine';
                osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
                gain.gain.setValueAtTime(1, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
                break;
            case 'violin':
                osc.type = 'sawtooth';
                const filter = this.ctx.createBiquadFilter();
                filter.type = "lowpass";
                filter.frequency.value = 1000;
                osc.connect(filter);
                filter.connect(gain);

                gain.gain.setValueAtTime(0, this.ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.1);
                gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + duration);
                break;
            default:
                osc.type = 'sine';
        }

        if (type !== 'violin') osc.connect(gain);
        gain.connect(this.masterVolume);

        osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }
}

const engine = new AudioEngine();
window.audioEngine = engine;
