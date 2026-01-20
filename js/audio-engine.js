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

    getFreq(noteStr) {
        if (!noteStr) return 440;
        const note = noteStr.slice(0, -1);
        const oct = parseInt(noteStr.slice(-1));
        const notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
        const semiDist = (oct - 4) * 12 + notes.indexOf(note) - 9;
        return 440 * Math.pow(2, semiDist / 12);
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
            case 'jazz-piano':
                this.createJazzPianoSound(frequency, now, duration, gain);
                break;
            case 'bright-piano':
                this.createBrightPianoSound(frequency, now, duration, gain);
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

        if (frequency === 60 || frequency === 61) { // KICKS
            const osc = this.ctx.createOscillator();
            osc.type = 'sine';
            const fStart = frequency === 60 ? 150 : 180;
            const decay = frequency === 60 ? 0.5 : 0.3;
            osc.frequency.setValueAtTime(fStart, now);
            osc.frequency.exponentialRampToValueAtTime(0.01, now + decay);
            gain.gain.setValueAtTime(1.5, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + decay);
            osc.connect(gain);
            osc.start(now);
            osc.stop(now + decay);
        }
        else if (frequency === 150 || frequency === 151) { // SNARE / RIMSHOT
            // Body
            const osc = this.ctx.createOscillator();
            osc.type = frequency === 150 ? 'triangle' : 'sine';
            osc.frequency.setValueAtTime(frequency === 150 ? 180 : 350, now);
            const oscGain = this.ctx.createGain();
            oscGain.gain.setValueAtTime(0.5, now);
            oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.connect(oscGain);
            oscGain.connect(gain);

            // Noise for Snare
            if (frequency === 150) {
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
                noise.start(now); noise.stop(now + 0.2);
            } else {
                // Short click for rimshot
                gain.gain.setValueAtTime(0.8, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
            }
            osc.start(now); osc.stop(now + 0.2);
        }
        else if (frequency >= 1000 && frequency < 2000) { // CYMBALS / HI-HATS
            this.createCymbalSound(frequency, now, gain);
        }
        else if (frequency >= 200 && frequency < 500) { // TOMS
            this.createTomSound(frequency, now, gain);
        }
        else if (frequency >= 4000) { // CRASH
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
        const duration = (freq === 4000 || freq === 5000) ? 2.5 : (freq === 1002 ? 1.8 : (freq === 1001 ? 0.8 : 0.1));

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
        // Multi-harmonic synthesis for a richer piano sound
        const harmonics = [
            { ratio: 1.0, gain: 0.6 },
            { ratio: 2.0, gain: 0.3 },
            { ratio: 3.0, gain: 0.1 },
            { ratio: 4.0, gain: 0.05 },
            { ratio: 5.0, gain: 0.02 }
        ];

        harmonics.forEach(h => {
            const osc = this.ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(frequency * h.ratio, now);

            const hGain = this.ctx.createGain();
            hGain.gain.setValueAtTime(0, now);
            hGain.gain.linearRampToValueAtTime(h.gain * 0.8, now + 0.01);
            hGain.gain.exponentialRampToValueAtTime(0.001, now + duration * (1 - h.ratio * 0.1));

            osc.connect(hGain);
            hGain.connect(gain);
            osc.start(now);
            osc.stop(now + duration);
        });

        // Add "Hammer Strike" noise burst
        const noise = this.ctx.createBufferSource();
        const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.05, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < buffer.length; i++) data[i] = Math.random() * 2 - 1;
        noise.buffer = buffer;

        const noiseFilter = this.ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.value = 1000;

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.15, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(gain);
        noise.start(now);

        // Overall envelope
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(1, now + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration * 1.5);
    }

    createBrightPianoSound(frequency, now, duration, gain) {
        // Bright piano needs more high-end harmonics and a sharper attack
        const fundamental = this.ctx.createOscillator();
        fundamental.type = 'sawtooth';
        fundamental.frequency.setValueAtTime(frequency, now);

        const brightness = this.ctx.createOscillator();
        brightness.type = 'square';
        brightness.frequency.setValueAtTime(frequency * 2, now);

        const fundGain = this.ctx.createGain();
        fundGain.gain.setValueAtTime(0.4, now);

        const brightGain = this.ctx.createGain();
        brightGain.gain.setValueAtTime(0.2, now);
        brightGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(200, now);

        fundamental.connect(fundGain);
        brightness.connect(brightGain);
        fundGain.connect(filter);
        brightGain.connect(filter);
        filter.connect(gain);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.6, now + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

        fundamental.start(now);
        fundamental.stop(now + duration);
        brightness.start(now);
        brightness.stop(now + duration);
    }

    createJazzPianoSound(frequency, now, duration, gain) {
        // Jazz piano is warmer with a bit of "honky-tonk" or "vintage" feel
        const harmonics = [
            { ratio: 1.0, gain: 0.7, detune: 0 },
            { ratio: 1.005, gain: 0.2, detune: 5 }, // Detuned for vintage feel
            { ratio: 2.0, gain: 0.4, detune: 0 },
            { ratio: 3.0, gain: 0.2, detune: 0 },
            { ratio: 4.0, gain: 0.1, detune: 0 }
        ];

        harmonics.forEach(h => {
            const osc = this.ctx.createOscillator();
            osc.type = 'triangle'; // Warmer than sine
            osc.frequency.setValueAtTime(frequency * h.ratio, now);
            osc.detune.setValueAtTime(h.detune, now);

            const hGain = this.ctx.createGain();
            hGain.gain.setValueAtTime(0, now);
            hGain.gain.linearRampToValueAtTime(h.gain * 0.5, now + 0.02);
            hGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 1.2);

            osc.connect(hGain);
            hGain.connect(gain);
            osc.start(now);
            osc.stop(now + duration * 1.2);
        });

        // Add a "Warmth" filter
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(3000, now);
        filter.frequency.exponentialRampToValueAtTime(1000, now + duration);
        gain.connect(filter);
        filter.connect(this.masterVolume);
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
        // Multi-oscillator for richer resonance
        const fundamental = this.ctx.createOscillator();
        const overtone = this.ctx.createOscillator();

        fundamental.type = 'triangle';
        overtone.type = 'sine';

        fundamental.frequency.setValueAtTime(frequency, now);
        overtone.frequency.setValueAtTime(frequency * 2, now);

        const fGain = this.ctx.createGain();
        const oGain = this.ctx.createGain();

        fGain.gain.setValueAtTime(0.5, now);
        oGain.gain.setValueAtTime(0.2, now);

        fundamental.connect(fGain);
        overtone.connect(oGain);

        fGain.connect(gain);
        oGain.connect(gain);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.6, now + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration * 2.5);

        fundamental.start(now);
        fundamental.stop(now + duration * 2.5);
        overtone.start(now);
        overtone.stop(now + duration * 2.5);
    }

    createViolinSound(frequency, now, duration, gain) {
        const osc = this.ctx.createOscillator();
        const sub = this.ctx.createOscillator();

        osc.type = 'sawtooth';
        sub.type = 'triangle';

        // Vibrato LFO
        const lfo = this.ctx.createOscillator();
        const lfoGain = this.ctx.createGain();
        lfo.frequency.value = 5.5; // Vibrato depth
        lfoGain.gain.value = frequency * 0.015;

        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfoGain.connect(sub.frequency);

        osc.frequency.setValueAtTime(frequency, now);
        sub.frequency.setValueAtTime(frequency * 1.002, now);

        const filter = this.ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(3000, now);
        filter.frequency.exponentialRampToValueAtTime(1200, now + duration);

        osc.connect(filter);
        sub.connect(filter);
        filter.connect(gain);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.15); // Slow attack (bowing)
        gain.gain.setValueAtTime(0.3, now + duration - 0.2);
        gain.gain.linearRampToValueAtTime(0, now + duration);

        lfo.start(now);
        lfo.stop(now + duration);
        osc.start(now);
        osc.stop(now + duration);
        sub.start(now);
        sub.stop(now + duration);
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
