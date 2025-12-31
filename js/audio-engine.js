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

    // Professional Instrument Synthesis
    playNote(frequency, type = 'piano', duration = 0.5) {
        if (!this.ctx) this.init();
        if (this.ctx.state === 'suspended') this.ctx.resume();

        const now = this.ctx.currentTime;
        const gain = this.ctx.createGain();
        gain.connect(this.masterVolume);

        switch (type) {
            case 'piano':
                this.createPianoSound(frequency, now, duration, gain);
                break;
            case 'drums':
                this.createDrumSound(frequency, now, gain);
                break;
            case 'keyboard':
                this.createSynthSound(frequency, now, duration, gain);
                break;
            case 'guitar':
                this.createGuitarSound(frequency, now, duration, gain);
                break;
            case 'violin':
                this.createViolinSound(frequency, now, duration, gain);
                break;
            case 'panFlute':
                this.createPanFluteSound(frequency, now, duration, gain);
                break;
            case 'flute':
            case 'clarinet':
            case 'recorder':
                this.createWoodwindSound(frequency, now, duration, gain, type);
                break;
            case 'xylophone':
            case 'glockenspiel':
                this.createMalletSound(frequency, now, duration, gain, type);
                break;
            case 'bongos':
                this.createBongoSound(frequency, now, gain);
                break;
            case 'ukulele':
                this.createGuitarSound(frequency * 2, now, duration, gain); // Ukulele is higher pitched guitar
                break;
            default:
                this.createBasicSound(frequency, now, duration, gain);
        }
    }

    createDrumSound(frequency, now, gain) {
        // Frequency/ID mapping: 
        // 60=Kick, 150=Snare, 
        // 1000=HiHat Closed, 1001=HiHat Open
        // 800=Clap
        // 200=Low Tom, 300=Mid Tom, 400=High Tom
        // 4000=Crash, 5000=Ride

        if (frequency === 60) { // KICK
            const osc = this.ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.5);
            gain.gain.setValueAtTime(1.5, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
            osc.connect(gain);
            osc.start(now);
            osc.stop(now + 0.5);
        }
        else if (frequency === 150) { // SNARE
            // Body
            const osc = this.ctx.createOscillator();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(180, now);
            const oscGain = this.ctx.createGain();
            oscGain.gain.setValueAtTime(0.5, now);
            oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.connect(oscGain);
            oscGain.connect(gain);

            // Noise
            const noise = this.ctx.createBufferSource();
            const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.2, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < buffer.length; i++) data[i] = Math.random() * 2 - 1;
            noise.buffer = buffer;
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'highpass';
            filter.frequency.value = 1000;
            noise.connect(filter);
            filter.connect(gain);
            gain.gain.setValueAtTime(1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

            osc.start(now); osc.stop(now + 0.2);
            noise.start(now); noise.stop(now + 0.2);
        }
        else if (frequency >= 1000 && frequency < 2000) { // CIMBALS / HI-HATS
            this.createCymbalSound(frequency, now, gain);
        }
        else if (frequency >= 200 && frequency < 500) { // TOMS
            this.createTomSound(frequency, now, gain);
        }
        else if (frequency >= 4000) { // CRASH / RIDE
            this.createCymbalSound(frequency, now, gain);
        }
        else { // CLAP
            const noise = this.ctx.createBufferSource();
            const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.2, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < buffer.length; i++) data[i] = Math.random() * 2 - 1;
            noise.buffer = buffer;
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 1500;
            noise.connect(filter);
            filter.connect(gain);
            // Clap envelope (multiple bursts)
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.8, now + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            noise.start(now);
            noise.stop(now + 0.2);
        }
    }

    createTomSound(freq, now, gain) {
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + 0.4);

        gain.gain.setValueAtTime(1.0, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

        osc.connect(gain);
        osc.start(now);
        osc.stop(now + 0.4);
    }

    createCymbalSound(freq, now, gain) {
        const duration = (freq === 4000 || freq === 5000) ? 1.5 : (freq === 1001 ? 0.5 : 0.1); // Crash/Ride long, OpenHat med, ClosedHat short

        // Metallic FM synthesis basis
        const fundamental = 40;
        const ratios = [2, 3, 4.16, 5.43, 6.79, 8.21];

        const bandpass = this.ctx.createBiquadFilter();
        bandpass.type = "bandpass";
        bandpass.frequency.value = (freq >= 4000) ? 5000 : 8000;

        const highpass = this.ctx.createBiquadFilter();
        highpass.type = "highpass";
        highpass.frequency.value = 4000;

        ratios.forEach(ratio => {
            const osc = this.ctx.createOscillator();
            osc.type = "square";
            osc.frequency.value = fundamental * ratio;
            osc.connect(bandpass);
            osc.start(now);
            osc.stop(now + duration);
        });

        // White Noise
        const noise = this.ctx.createBufferSource();
        const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * duration, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < buffer.length; i++) data[i] = Math.random() * 2 - 1;
        noise.buffer = buffer;
        noise.connect(highpass);
        noise.start(now);

        bandpass.connect(highpass);
        highpass.connect(gain);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.6, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    }

    createPianoSound(frequency, now, duration, gain) {
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.5, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration);
        osc.frequency.setValueAtTime(frequency, now);
        osc.connect(gain);
        osc.start(now);
        osc.stop(now + duration);
    }

    createSynthSound(frequency, now, duration, gain) {
        const osc = this.ctx.createOscillator();
        osc.type = 'square';
        const filter = this.ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(2000, now);
        filter.frequency.exponentialRampToValueAtTime(500, now + duration);
        osc.connect(filter);
        filter.connect(gain);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration);
        osc.frequency.setValueAtTime(frequency, now);
        osc.start(now);
        osc.stop(now + duration);
    }

    createGuitarSound(frequency, now, duration, gain) {
        const osc = this.ctx.createOscillator();
        osc.type = 'triangle';
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.4, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration * 2);
        osc.frequency.setValueAtTime(frequency, now);
        osc.connect(gain);
        osc.start(now);
        osc.stop(now + duration * 2);
    }

    createViolinSound(frequency, now, duration, gain) {
        const osc = this.ctx.createOscillator();
        osc.type = 'sawtooth';
        const filter = this.ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 1000;
        osc.connect(filter);
        filter.connect(gain);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
        gain.gain.linearRampToValueAtTime(0.01, now + duration);
        osc.frequency.setValueAtTime(frequency, now);
        osc.start(now);
        osc.stop(now + duration);
    }

    createPanFluteSound(frequency, now, duration, gain) {
        // Breathy sine wave
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';

        // Add breath noise
        const noise = this.ctx.createBufferSource();
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.1;
        noise.buffer = buffer;
        const noiseFilter = this.ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.value = frequency * 2; // Breath follows pitch? or fixed?
        noise.connect(noiseFilter);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.1, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2); // Short breath burst
        noiseFilter.connect(noiseGain);
        noiseGain.connect(this.masterVolume);
        noise.start(now);

        // Tone envelope
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.4, now + 0.05); // Soft attack
        gain.gain.linearRampToValueAtTime(0.3, now + 0.1); // Sustain
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration); // Release

        osc.frequency.setValueAtTime(frequency, now);
        osc.connect(gain);
        osc.start(now);
        osc.stop(now + duration);
    }

    createWoodwindSound(frequency, now, duration, gain, type = 'flute') {
        const osc = this.ctx.createOscillator();
        // Flute is closer to sine/triangle, Clarinet is square (hollow), Recorder is sine/triangle
        if (type === 'clarinet') osc.type = 'square';
        else osc.type = 'triangle'; // Flute/Recorder

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = type === 'flute' ? 2000 : 1500;

        osc.connect(filter);
        filter.connect(gain);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
        gain.gain.linearRampToValueAtTime(0, now + duration);

        osc.frequency.setValueAtTime(frequency, now);
        osc.start(now);
        osc.stop(now + duration);
    }

    createMalletSound(frequency, now, duration, gain, type = 'xylophone') {
        const osc = this.ctx.createOscillator();
        osc.type = 'sine'; // Mallets are pure

        // Envelope: Instant attack, short decay
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.5, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration); // Ring out

        if (type === 'glockenspiel') {
            // Add a high overtone for the metallic ring
            const overOsc = this.ctx.createOscillator();
            overOsc.type = 'sine';
            overOsc.frequency.setValueAtTime(frequency * 2.5, now); // Non-integer harmonic usually for bells
            const overGain = this.ctx.createGain();
            overGain.gain.setValueAtTime(0.1, now);
            overGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            overOsc.connect(overGain);
            overGain.connect(this.masterVolume);
            overOsc.start(now);
            overOsc.stop(now + 0.3);
        }

        osc.frequency.setValueAtTime(frequency, now);
        osc.connect(gain);
        osc.start(now);
        osc.stop(now + duration);
    }

    createBongoSound(frequency, now, gain) {
        // High or Low pitch based on freq logic passed from instrument
        // 200Hz = Low, 400Hz = High
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, now);
        osc.frequency.exponentialRampToValueAtTime(frequency * 0.8, now + 0.1); // Pitch drop

        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

        osc.connect(gain);
        osc.start(now);
        osc.stop(now + 0.2);
    }

    createBasicSound(frequency, now, duration, gain) {
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, now);
        osc.connect(gain);
        osc.start(now);
        osc.stop(now + duration);
    }
}

const engine = new AudioEngine();
window.audioEngine = engine;
