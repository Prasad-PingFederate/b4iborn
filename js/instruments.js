const Instruments = {
    piano: {
        name: "Grand Piano",
        sustain: false,
        preset: 'piano',
        render: (container) => {
            const piano = Instruments.piano;

            // Full 5-Octave Piano Logic (C2 to C7)
            const keyMapping = [
                // Octave 2 (Low)
                { note: 'C2', type: 'white', label: '1', key: '1' },
                { note: 'Db2', type: 'black', label: '!', key: '!' },
                { note: 'D2', type: 'white', label: '2', key: '2' },
                { note: 'Eb2', type: 'black', label: '@', key: '@' },
                { note: 'E2', type: 'white', label: '3', key: '3' },
                { note: 'F2', type: 'white', label: '4', key: '4' },
                { note: 'Gb2', type: 'black', label: '$', key: '$' },
                { note: 'G2', type: 'white', label: '5', key: '5' },
                { note: 'Ab2', type: 'black', label: '%', key: '%' },
                { note: 'A2', type: 'white', label: '6', key: '6' },
                { note: 'Bb2', type: 'black', label: '^', key: '^' },
                { note: 'B2', type: 'white', label: '7', key: '7' },

                // Octave 3 
                { note: 'C3', type: 'white', label: '8', key: '8' },
                { note: 'Db3', type: 'black', label: '*', key: '*' },
                { note: 'D3', type: 'white', label: '9', key: '9' },
                { note: 'Eb3', type: 'black', label: '(', key: '(' },
                { note: 'E3', type: 'white', label: '0', key: '0' },
                { note: 'F3', type: 'white', label: 'q', key: 'q' },
                { note: 'Gb3', type: 'black', label: 'Q', key: 'Q' },
                { note: 'G3', type: 'white', label: 'w', key: 'w' },
                { note: 'Ab3', type: 'black', label: 'W', key: 'W' },
                { note: 'A3', type: 'white', label: 'e', key: 'e' },
                { note: 'Bb3', type: 'black', label: 'E', key: 'E' },
                { note: 'B3', type: 'white', label: 'r', key: 'r' },

                // Octave 4 (Mid)
                { note: 'C4', type: 'white', label: 't', key: 't' },
                { note: 'Db4', type: 'black', label: 'T', key: 'T' },
                { note: 'D4', type: 'white', label: 'y', key: 'y' },
                { note: 'Eb4', type: 'black', label: 'Y', key: 'Y' },
                { note: 'E4', type: 'white', label: 'u', key: 'u' },
                { note: 'F4', type: 'white', label: 'i', key: 'i' },
                { note: 'Gb4', type: 'black', label: 'I', key: 'I' },
                { note: 'G4', type: 'white', label: 'o', key: 'o' },
                { note: 'Ab4', type: 'black', label: 'O', key: 'O' },
                { note: 'A4', type: 'white', label: 'p', key: 'p' },
                { note: 'Bb4', type: 'black', label: 'P', key: 'P' },
                { note: 'B4', type: 'white', label: 'a', key: 'a' },

                // Octave 5
                { note: 'C5', type: 'white', label: 's', key: 's' },
                { note: 'Db5', type: 'black', label: 'S', key: 'S' },
                { note: 'D5', type: 'white', label: 'd', key: 'd' },
                { note: 'Eb5', type: 'black', label: 'D', key: 'D' },
                { note: 'E5', type: 'white', label: 'f', key: 'f' },
                { note: 'F5', type: 'white', label: 'g', key: 'g' },
                { note: 'Gb5', type: 'black', label: 'G', key: 'G' },
                { note: 'G5', type: 'white', label: 'h', key: 'h' },
                { note: 'Ab5', type: 'black', label: 'H', key: 'H' },
                { note: 'A5', type: 'white', label: 'j', key: 'j' },
                { note: 'Bb5', type: 'black', label: 'J', key: 'J' },
                { note: 'B5', type: 'white', label: 'k', key: 'k' },

                // Octave 6 + C7
                { note: 'C6', type: 'white', label: 'l', key: 'l' },
                { note: 'Db6', type: 'black', label: 'L', key: 'L' },
                { note: 'D6', type: 'white', label: 'z', key: 'z' },
                { note: 'Eb6', type: 'black', label: 'Z', key: 'Z' },
                { note: 'E6', type: 'white', label: 'x', key: 'x' },
                { note: 'F6', type: 'white', label: 'c', key: 'c' },
                { note: 'Gb6', type: 'black', label: 'C', key: 'C' },
                { note: 'G6', type: 'white', label: 'v', key: 'v' },
                { note: 'Ab6', type: 'black', label: 'V', key: 'V' },
                { note: 'A6', type: 'white', label: 'b', key: 'b' },
                { note: 'Bb6', type: 'black', label: 'B', key: 'B' },
                { note: 'B6', type: 'white', label: 'n', key: 'n' },
                { note: 'C7', type: 'white', label: 'm', key: 'm' }
            ];



            // HTML Structure
            container.innerHTML = `
                <div class="piano-wrapper">
                    <div class="piano-dashboard premium-dash">
                        <div class="dash-left">
                            <div class="piano-brand premium-text">Royal Grand <span class="badge">PRO</span></div>
                            <div class="preset-selector">
                                <button class="btn-preset active" data-preset="piano">Grand</button>
                                <button class="btn-preset" data-preset="jazz-piano">Jazz</button>
                                <button class="btn-preset" data-preset="bright-piano">Bright</button>
                            </div>
                        </div>
                        <div class="dash-center">
                            <div class="piano-screen neon-screen" id="piano-screen">WELCOME</div>
                        </div>
                        <div class="dash-right">
                            <button id="sustain-btn" class="btn-toggle-sustain">SUSTAIN: OFF</button>
                            <div class="visual-meter">
                                <span></span><span></span><span></span><span></span>
                            </div>
                        </div>
                    </div>
                    <div class="piano-keys-container"></div>
                </div>
            `;

            const keysContainer = container.querySelector('.piano-keys-container');
            const screen = container.querySelector('#piano-screen');
            const sustainBtn = container.querySelector('#sustain-btn');
            const presetBtns = container.querySelectorAll('.btn-preset');

            // Sustain Toggle
            sustainBtn.onclick = () => {
                piano.sustain = !piano.sustain;
                sustainBtn.innerText = `SUSTAIN: ${piano.sustain ? 'ON' : 'OFF'}`;
                sustainBtn.classList.toggle('active', piano.sustain);
            };

            // Preset Selector
            presetBtns.forEach(btn => {
                btn.onclick = () => {
                    presetBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    piano.preset = btn.dataset.preset;
                    screen.innerText = `${btn.innerText} Mode`;
                    screen.style.color = '#00d2ff';
                };
            });

            // Play Logic
            const playNote = (note, keyEl) => {
                const freq = window.audioEngine.getFreq(note);
                const duration = piano.sustain ? 2.5 : 0.8;
                window.audioEngine.playNote(freq, piano.preset, duration);

                keyEl.classList.add('active');
                screen.innerText = note;

                // Visual feedback in dash
                const bars = container.querySelectorAll('.visual-meter span');
                bars.forEach(b => {
                    b.style.height = `${Math.random() * 100}%`;
                    setTimeout(() => b.style.height = '10%', 200);
                });

                setTimeout(() => {
                    keyEl.classList.remove('active');
                }, 200);
            };

            // Render White Keys
            keyMapping.filter(k => k.type === 'white').forEach(key => {
                const keyEl = document.createElement('div');
                keyEl.className = 'white-key';
                keyEl.dataset.note = key.note;
                keyEl.dataset.input = key.key;

                keyEl.innerHTML = `<span class="key-label">${key.label}</span>`;

                keyEl.addEventListener('mousedown', () => playNote(key.note, keyEl));
                keyEl.addEventListener('mouseenter', (e) => {
                    if (e.buttons === 1) playNote(key.note, keyEl);
                });
                keysContainer.appendChild(keyEl);
            });

            // Render Black Keys
            const whiteKeyCount = keyMapping.filter(k => k.type === 'white').length;
            const whiteKeyWidth = 100 / whiteKeyCount;

            let whiteIndex = 0;
            keyMapping.forEach(key => {
                if (key.type === 'white') {
                    whiteIndex++;
                } else {
                    const keyEl = document.createElement('div');
                    keyEl.className = 'black-key';
                    keyEl.dataset.note = key.note;

                    // Position Logic
                    const leftPos = ((whiteIndex - 1) * whiteKeyWidth) + (whiteKeyWidth * 0.65);
                    keyEl.style.left = `${leftPos}%`;
                    keyEl.style.width = `${whiteKeyWidth * 0.7}%`;

                    keyEl.innerHTML = `<span class="key-label" style="opacity:0.5; position:absolute; bottom:5px;">${key.label}</span>`;

                    keyEl.addEventListener('mousedown', () => playNote(key.note, keyEl));
                    keyEl.addEventListener('mouseenter', (e) => {
                        if (e.buttons === 1) playNote(key.note, keyEl);
                    });
                    keysContainer.appendChild(keyEl);
                }
            });

            // Global Key Handler
            const keyHandler = (e) => {
                if (!container.isConnected) return;
                if (e.repeat) return;

                // Sustain with Spacebar
                if (e.code === 'Space') {
                    e.preventDefault();
                    if (!piano.sustain) sustainBtn.click();
                    return;
                }

                const kObj = keyMapping.find(k => k.key === e.key);
                if (kObj) {
                    const allKeys = Array.from(keysContainer.children);
                    const target = allKeys.find(el => el.dataset.note === kObj.note);
                    if (target) {
                        playNote(kObj.note, target);
                    }
                }
            };

            const keyUpHandler = (e) => {
                if (e.code === 'Space') {
                    if (piano.sustain) sustainBtn.click();
                }
            };

            if (container._pianoKeyHandler) document.removeEventListener('keydown', container._pianoKeyHandler);
            if (container._pianoKeyUpHandler) document.removeEventListener('keyup', container._pianoKeyUpHandler);

            container._pianoKeyHandler = keyHandler;
            container._pianoKeyUpHandler = keyUpHandler;

            document.addEventListener('keydown', keyHandler);
            document.addEventListener('keyup', keyUpHandler);
        }
    },

    drums: {
        name: "Drum Studio",
        render: (container) => {
            const pads = [
                { name: 'Kick 1', freq: 60, icon: '🥁', color: '#ff4b2b', key: 'a' },
                { name: 'Kick 2', freq: 61, icon: '🥁', color: '#ff4b2b', key: 's' },
                { name: 'Snare', freq: 150, icon: '⚪', color: '#e0e0e0', key: 'd' },
                { name: 'Rimshot', freq: 151, icon: '⚪', color: '#999', key: 'f' },
                { name: 'H-Hat C', freq: 1000, icon: '⛔', color: '#ffd700', key: 'q' },
                { name: 'H-Hat O', freq: 1001, icon: '⭕', color: '#ffd700', key: 'w' },
                { name: 'Ride', freq: 1002, icon: '📀', color: '#ffd700', key: 'e' },
                { name: 'Crash', freq: 4000, icon: '💥', color: '#ff0844', key: 'r' },
                { name: 'Tom 1', freq: 400, icon: '🥁', color: '#4facfe', key: '1' },
                { name: 'Tom 2', freq: 300, icon: '🥁', color: '#4facfe', key: '2' },
                { name: 'Tom 3', freq: 200, icon: '🥁', color: '#4facfe', key: '3' },
                { name: 'Clap', freq: 800, icon: '👏', color: '#f093fb', key: '4' }
            ];

            container.innerHTML = `
                <div class="drum-studio-wrapper">
                    <div class="drum-dashboard">
                        <div class="dash-item"><i class="fas fa-microchip"></i> LATENCY: 2ms</div>
                        <div class="dash-item neon-text">B4I STUDIO DRUMS PRO</div>
                        <div class="dash-item"><i class="fas fa-compact-disc"></i> 44.1kHz</div>
                    </div>
                    <div class="drum-pads-grid"></div>
                    <div class="drum-info">Keys: ASDF (Core) | QWER (Cymbals) | 1234 (Toms/Perc)</div>
                </div>
            `;

            const grid = container.querySelector('.drum-pads-grid');

            pads.forEach(pad => {
                const padEl = document.createElement('div');
                padEl.className = 'drum-pad-pro';
                padEl.dataset.key = pad.key.toLowerCase();
                padEl.style.setProperty('--pad-color', pad.color);

                padEl.innerHTML = `
                    <div class="pad-inner">
                        <span class="pad-icon">${pad.icon}</span>
                        <span class="pad-name">${pad.name}</span>
                        <span class="pad-key">${pad.key.toUpperCase()}</span>
                    </div>
                `;

                const playPad = () => {
                    window.audioEngine.playNote(pad.freq, 'drums', 0.2);
                    padEl.classList.add('active');
                    setTimeout(() => padEl.classList.remove('active'), 100);
                };

                padEl.addEventListener('mousedown', playPad);
                padEl.addEventListener('touchstart', (e) => { e.preventDefault(); playPad(); });

                grid.appendChild(padEl);
            });

            const keyHandler = (e) => {
                if (!container.isConnected) return;
                const char = e.key.toLowerCase();
                const pad = pads.find(p => p.key === char);
                if (pad) {
                    const padEl = grid.querySelector(`[data-key="${char}"]`);
                    if (padEl) {
                        window.audioEngine.playNote(pad.freq, 'drums', 0.2);
                        padEl.classList.add('active');
                        setTimeout(() => padEl.classList.remove('active'), 100);
                    }
                }
            };

            if (container._drumKeyHandler) document.removeEventListener('keydown', container._drumKeyHandler);
            container._drumKeyHandler = keyHandler;
            document.addEventListener('keydown', keyHandler);
        }
    },



    guitar: {
        name: "Acoustic Guitar",
        currentChord: 'C',
        chords: {
            'C': [0, 3, 2, 0, 1, 0],
            'G': [3, 2, 0, 0, 0, 3],
            'D': [-1, -1, 0, 2, 3, 2],
            'A': [-1, 0, 2, 2, 2, 0],
            'E': [0, 2, 2, 1, 0, 0],
            'F': [1, 3, 3, 2, 1, 1],
            'Am': [-1, 0, 2, 2, 1, 0],
            'Dm': [-1, -1, 0, 2, 3, 1]
        },
        baseFreqs: [82.41, 110.00, 146.83, 196.00, 246.94, 329.63],
        render: (container) => {
            container.innerHTML = `
                <div class="guitar-studio-wrapper">
                    <div class="chord-ribbon"></div>
                    <div class="guitar-body-premium">
                        <div class="guitar-neck">
                            <div class="fretboard-gloss"></div>
                            ${[...Array(6)].map((_, i) => `<div class="string-line" data-string="${i}"></div>`).join('')}
                        </div>
                        <div class="sound-hole-pro">
                             <div class="strum-visualizer"></div>
                        </div>
                        <div class="guitar-bridge"></div>
                    </div>
                    <div class="guitar-controls">
                        <p>SPACE or ENTER to Strum | Hover Strings | Keys A-G for Chords</p>
                    </div>
                </div>
            `;

            const chordRibbon = container.querySelector('.chord-ribbon');
            const guitar = Instruments.guitar;

            Object.keys(guitar.chords).forEach(chord => {
                const btn = document.createElement('button');
                btn.className = `chord-btn ${guitar.currentChord === chord ? 'active' : ''}`;
                btn.innerText = chord;
                btn.onclick = () => {
                    guitar.currentChord = chord;
                    container.querySelectorAll('.chord-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                };
                chordRibbon.appendChild(btn);
            });

            const strum = (delay) => {
                const chordNotes = guitar.chords[guitar.currentChord];
                chordNotes.forEach((fret, i) => {
                    if (fret !== -1) {
                        const freq = guitar.baseFreqs[i] * Math.pow(2, fret / 12);
                        setTimeout(() => {
                            window.audioEngine.playNote(freq, 'guitar', 1.5);
                            const string = container.querySelector(`[data-string="${i}"]`);
                            string.classList.add('vibrating');
                            setTimeout(() => string.classList.remove('vibrating'), 200);
                        }, i * delay * 1000);
                    }
                });
            };

            // Interactions
            container.querySelector('.sound-hole-pro').onclick = () => strum(0.04);
            container.querySelector('.sound-hole-pro').onmouseenter = (e) => { if (e.buttons === 1) strum(0.04); };

            container.querySelectorAll('.string-line').forEach((string, i) => {
                string.onmouseenter = () => {
                    const fret = guitar.chords[guitar.currentChord][i];
                    if (fret !== -1) {
                        const freq = guitar.baseFreqs[i] * Math.pow(2, fret / 12);
                        window.audioEngine.playNote(freq, 'guitar', 1.5);
                        string.classList.add('vibrating');
                        setTimeout(() => string.classList.remove('vibrating'), 150);
                    }
                };
            });

            // Keyboard support
            const keyMap = { 'a': 'A', 'b': 'B', 'c': 'C', 'd': 'D', 'e': 'E', 'f': 'F', 'g': 'G' };
            const handler = (e) => {
                if (!container.isConnected) return;
                const chord = keyMap[e.key.toLowerCase()];
                if (chord && guitar.chords[chord]) {
                    const btn = Array.from(chordRibbon.children).find(b => b.innerText === chord);
                    if (btn) btn.click();
                }
                if (e.key === 'Enter' || e.code === 'Space') {
                    e.preventDefault();
                    strum(0.03);
                }
            };
            if (container._guitarKeyHandler) document.removeEventListener('keydown', container._guitarKeyHandler);
            container._guitarKeyHandler = handler;
            document.addEventListener('keydown', handler);
        }
    },

    violin: {
        name: "Virtuoso Violin",
        render: (container) => {
            const strings = [
                { note: 'G3', freq: 196.00 },
                { note: 'D4', freq: 293.66 },
                { note: 'A4', freq: 440.00 },
                { note: 'E5', freq: 659.25 }
            ];

            // Positions (fret-like for visual guidance)
            const positions = [
                { label: '0', shift: 0, key: 'A' },
                { label: '1', shift: 1, key: 'S' },
                { label: '2', shift: 2, key: 'D' },
                { label: '3', shift: 3, key: 'F' },
                { label: '4', shift: 4, key: 'G' },
                { label: '5', shift: 5, key: 'H' },
                { label: '6', shift: 6, key: 'J' }
            ];

            let activeShift = 0;

            container.innerHTML = `
                <div class="violin-studio-premium">
                    <div class="violin-neck-column">
                        <div class="violin-scroll"></div>
                        <div class="violin-fingerboard">
                            <div class="fingerboard-wood">
                                ${strings.map((s, i) => `
                                    <div class="v-string-pro" data-string="${i}">
                                        <div class="string-vibration-layer"></div>
                                    </div>
                                `).join('')}
                                <div class="finger-overlay"></div>
                            </div>
                        </div>
                    </div>
                    <div class="violin-controls">
                        <div class="bowing-area">
                            <span class="bow-label">GLIDE HERE TO BOW</span>
                            <div class="bow-line"></div>
                        </div>
                        <div class="position-selector">
                            ${positions.map(p => `
                                <button class="btn-pos ${p.shift === 0 ? 'active' : ''}" data-shift="${p.shift}">
                                    ${p.label}<br><small>${p.key}</small>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;

            const playString = (strIndex, velocity = 0.8) => {
                const baseFreq = strings[strIndex].freq;
                const freq = baseFreq * Math.pow(2, activeShift / 12);
                window.audioEngine.playNote(freq, 'violin', 1.5);

                const strEl = container.querySelector(`[data-string="${strIndex}"]`);
                strEl.classList.add('bowed');
                setTimeout(() => strEl.classList.remove('bowed'), 200);
            };

            // String Interaction
            container.querySelectorAll('.v-string-pro').forEach((s, i) => {
                s.onmouseenter = () => playString(i, 0.6);
                s.onmousedown = () => playString(i, 0.9);
            });

            // Bow Area Interaction
            const bowArea = container.querySelector('.bowing-area');
            bowArea.onmousemove = (e) => {
                if (e.buttons === 1 || Math.abs(e.movementX) > 2) {
                    const rect = bowArea.getBoundingClientRect();
                    const relY = e.clientY - rect.top;
                    const strIndex = Math.floor((relY / rect.height) * 4);
                    if (strIndex >= 0 && strIndex < 4) {
                        playString(strIndex, 0.5);
                    }
                }
            };

            // Position Handling
            const posBtns = container.querySelectorAll('.btn-pos');
            posBtns.forEach(btn => {
                btn.onclick = () => {
                    activeShift = parseInt(btn.dataset.shift);
                    posBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                };
            });

            // Keyboard Mapping
            const keyMap = { 'a': 0, 's': 1, 'd': 2, 'f': 3, 'g': 4, 'h': 5, 'j': 6 };
            const handler = (e) => {
                if (!container.isConnected) return;
                const shift = keyMap[e.key.toLowerCase()];
                if (shift !== undefined) {
                    const btn = container.querySelector(`[data-shift="${shift}"]`);
                    if (btn) btn.click();
                }

                // Also map 1, 2, 3, 4 to play strings
                const strKeys = { '1': 0, '2': 1, '3': 2, '4': 3 };
                if (strKeys[e.key]) {
                    playString(strKeys[e.key]);
                }
            };

            if (container._violinHandler) document.removeEventListener('keydown', container._violinHandler);
            container._violinHandler = handler;
            document.addEventListener('keydown', handler);
        }
    },

    keyboard: {
        name: "Neon Synth",
        render: (container) => {
            const keyMapping = [
                { note: 'C3', type: 'white', label: '1', key: '1' },
                { note: 'Db3', type: 'black', label: '!', key: '!' },
                { note: 'D3', type: 'white', label: '2', key: '2' },
                { note: 'Eb3', type: 'black', label: '@', key: '@' },
                { note: 'E3', type: 'white', label: '3', key: '3' },
                { note: 'F3', type: 'white', label: '4', key: '4' },
                { note: 'Gb3', type: 'black', label: '$', key: '$' },
                { note: 'G3', type: 'white', label: '5', key: '5' },
                { note: 'Ab3', type: 'black', label: '%', key: '%' },
                { note: 'A3', type: 'white', label: '6', key: '6' },
                { note: 'Bb3', type: 'black', label: '^', key: '^' },
                { note: 'B3', type: 'white', label: '7', key: '7' },
                { note: 'C4', type: 'white', label: '8', key: '8' }
            ];

            container.innerHTML = `
                <div class="piano-wrapper synth-mode">
                    <div class="piano-dashboard premium-dash" style="background: linear-gradient(180deg, #0f0c29, #302b63, #24243e); height:80px;">
                        <div class="dash-left">
                            <div class="piano-brand premium-text" style="color:var(--primary); font-size:1.2rem;">NEON SYNTH <span class="badge">V1</span></div>
                        </div>
                        <div class="dash-center">
                            <div class="neon-screen" id="synth-screen" style="min-width:100px; text-align:center;">READY</div>
                        </div>
                    </div>
                    <div class="piano-keys-container" id="synth-keys" style="height:200px; position:relative;"></div>
                </div>
             `;

            const screen = container.querySelector('#synth-screen');
            const keysContainer = container.querySelector('#synth-keys');

            const playNote = (note, el) => {
                window.audioEngine.playNote(window.audioEngine.getFreq(note), 'keyboard', 1.0);
                el.classList.add('active');
                screen.innerText = note;
                setTimeout(() => el.classList.remove('active'), 200);
            };

            const whiteKeys = keyMapping.filter(k => k.type === 'white');
            const whiteWidth = 100 / whiteKeys.length;

            keyMapping.forEach((k, i) => {
                const el = document.createElement('div');
                el.className = k.type === 'white' ? 'white-key' : 'black-key';
                el.dataset.note = k.note;
                el.innerHTML = `<span class="key-label">${k.key}</span>`;

                if (k.type === 'white') {
                    el.style.width = `${whiteWidth}%`;
                } else {
                    const prevWhites = keyMapping.slice(0, keyMapping.indexOf(k)).filter(x => x.type === 'white').length;
                    el.style.left = `${prevWhites * whiteWidth - (whiteWidth * 0.35)}%`;
                    el.style.width = `${whiteWidth * 0.7}%`;
                    el.style.position = 'absolute';
                    el.style.zIndex = '10';
                }

                el.onmousedown = () => playNote(k.note, el);
                keysContainer.appendChild(el);
            });

            const handler = (e) => {
                if (!container.isConnected) return;
                const kObj = keyMapping.find(k => k.key === e.key);
                if (kObj) {
                    const el = Array.from(keysContainer.children).find(item => item.dataset.note === kObj.note);
                    if (el) playNote(kObj.note, el);
                }
            };
            if (container._synthHandler) document.removeEventListener('keydown', container._synthHandler);
            container._synthHandler = handler;
            document.addEventListener('keydown', handler);
        }
    },
    panFlute: {
        name: "Andean Pan Flute",
        render: (container) => {
            const pipes = [
                { note: 'G4', freq: 392.00, key: '1' },
                { note: 'A4', freq: 440.00, key: '2' },
                { note: 'B4', freq: 493.88, key: '3' },
                { note: 'C5', freq: 523.25, key: '4' },
                { note: 'D5', freq: 587.33, key: '5' },
                { note: 'E5', freq: 659.25, key: '6' },
                { note: 'F#5', freq: 739.99, key: '7' },
                { note: 'G5', freq: 783.99, key: '8' },
                { note: 'A5', freq: 880.00, key: '9' }
            ];

            container.innerHTML = `
                <div class="woodwind-studio-wrapper">
                    <div class="woodwind-instrument-view pan-flute-container" style="display:flex; align-items:flex-start; gap:5px; padding:60px 40px;">
                        ${pipes.map((p, i) => `
                            <div class="pan-pipe-pro" data-freq="${p.freq}" data-key="${p.key}" 
                                 style="width:35px; height:${250 - (i * 15)}px; background:linear-gradient(90deg, #e3c099, #fff3e0, #d2a679); border-radius:0 0 15px 15px; border:1px solid #8B4513; cursor:pointer; transition:all 0.1s; position:relative;">
                                <div style="width:20px; height:8px; background:#2e1a0f; border-radius:50%; margin:10px auto; opacity:0.6;"></div>
                                <span style="position:absolute; bottom:15px; width:100%; text-align:center; color:#5d4037; font-weight:800; font-size:0.7rem;">${p.key}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

            container.querySelectorAll('.pan-pipe-pro').forEach(pipe => {
                const play = () => {
                    window.audioEngine.playNote(parseFloat(pipe.dataset.freq), 'panFlute', 0.8);
                    pipe.style.transform = 'translateY(15px)';
                    pipe.style.background = 'var(--accent)';
                    setTimeout(() => {
                        pipe.style.transform = 'translateY(0)';
                        pipe.style.background = 'linear-gradient(90deg, #e3c099, #fff3e0, #d2a679)';
                    }, 150);
                };
                pipe.onmouseenter = play;
                pipe.onmousedown = play;
            });

            const handler = (e) => {
                if (!container.isConnected) return;
                const pipe = Array.from(container.querySelectorAll('.pan-pipe-pro')).find(p => p.dataset.key === e.key);
                if (pipe) {
                    window.audioEngine.playNote(parseFloat(pipe.dataset.freq), 'panFlute', 0.8);
                    pipe.style.transform = 'translateY(15px)';
                    setTimeout(() => pipe.style.transform = 'translateY(0)', 150);
                }
            };
            if (container._panHandler) document.removeEventListener('keydown', container._panHandler);
            container._panHandler = handler;
            document.addEventListener('keydown', handler);
        }
    },

    flute: {
        name: "Premium Flute",
        render: (container) => {
            const keys = [
                { note: 'C5', freq: 523.25, key: '1', left: '20%' },
                { note: 'D5', freq: 587.33, key: '2', left: '30%' },
                { note: 'E5', freq: 659.25, key: '3', left: '40%' },
                { note: 'F5', freq: 698.46, key: '4', left: '50%' },
                { note: 'G5', freq: 783.99, key: '5', left: '60%' },
                { note: 'A5', freq: 880.00, key: '6', left: '70%' },
                { note: 'B5', freq: 987.77, key: '7', left: '80%' }
            ];

            container.innerHTML = `
                <div class="woodwind-studio-wrapper">
                    <div class="woodwind-instrument-view" style="width:700px; height:60px; background:linear-gradient(180deg, #eee, #aaa, #ddd); border-radius:30px; border:1px solid #999; box-shadow:0 10px 40px rgba(0,0,0,0.5); position:relative; display:flex; align-items:center;">
                        ${keys.map(k => `
                            <div class="flute-key-pro" data-freq="${k.freq}" data-key="${k.key}" 
                                 style="position:absolute; left:${k.left}; width:30px; height:30px; background:rgba(255,255,255,0.2); border:2px solid #fff; border-radius:50%; cursor:pointer; transition:all 0.1s;">
                                <span style="position:absolute; top:-25px; left:50%; transform:translateX(-50%); color:#666; font-weight:800; font-size:0.7rem;">${k.key}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

            container.querySelectorAll('.flute-key-pro').forEach(key => {
                const play = () => {
                    window.audioEngine.playNote(parseFloat(key.dataset.freq), 'flute', 0.8);
                    key.classList.add('active');
                    setTimeout(() => key.classList.remove('active'), 200);
                };
                key.onmousedown = play;
            });

            const handler = (e) => {
                if (!container.isConnected) return;
                const hole = Array.from(container.querySelectorAll('.flute-key-pro')).find(h => h.dataset.key === e.key);
                if (hole) {
                    window.audioEngine.playNote(parseFloat(hole.dataset.freq), 'flute', 0.8);
                    hole.classList.add('active');
                    setTimeout(() => hole.classList.remove('active'), 200);
                }
            };
            if (container._fluteHandler) document.removeEventListener('keydown', container._fluteHandler);
            container._fluteHandler = handler;
            document.addEventListener('keydown', handler);
        }
    },

    clarinet: {
        name: "Premium Clarinet",
        render: (container) => {
            const keys = [
                { note: 'C4', freq: 261.63, key: '1' },
                { note: 'D4', freq: 293.66, key: '2' },
                { note: 'E4', freq: 329.63, key: '3' },
                { note: 'F4', freq: 349.23, key: '4' },
                { note: 'G4', freq: 392.00, key: '5' },
                { note: 'A4', freq: 440.00, key: '6' }
            ];

            container.innerHTML = `
                <div class="woodwind-studio-wrapper">
                    <div class="woodwind-instrument-view" style="width:70px; height:450px; background:linear-gradient(90deg, #111, #333, #000); border-radius:10px 10px 30px 30px; border:2px solid #222; display:flex; flex-direction:column; justify-content:space-evenly; align-items:center;">
                        ${keys.map(k => `
                            <div class="flute-key-pro" data-freq="${k.freq}" data-key="${k.key}" style="width:40px; height:40px; background:radial-gradient(circle at 30% 30%, #eee, #999); border:1px solid #777; border-radius:50%; cursor:pointer;">
                                <span style="position:absolute; right:-30px; color:#555; font-weight:800; font-size:0.7rem;">${k.key}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

            container.querySelectorAll('.flute-key-pro').forEach(key => {
                const play = () => {
                    window.audioEngine.playNote(parseFloat(key.dataset.freq), 'clarinet', 1.0);
                    key.classList.add('active');
                    setTimeout(() => key.classList.remove('active'), 200);
                };
                key.onmousedown = play;
            });

            const handler = (e) => {
                if (!container.isConnected) return;
                const hole = Array.from(container.querySelectorAll('.flute-key-pro')).find(h => h.dataset.key === e.key);
                if (hole) {
                    window.audioEngine.playNote(parseFloat(hole.dataset.freq), 'clarinet', 1.0);
                    hole.classList.add('active');
                    setTimeout(() => hole.classList.remove('active'), 200);
                }
            };
            if (container._clarinetHandler) document.removeEventListener('keydown', container._clarinetHandler);
            container._clarinetHandler = handler;
            document.addEventListener('keydown', handler);
        }
    },

    recorder: {
        name: "Premium Recorder",
        render: (container) => {
            const notes = [
                { note: 'C5', freq: 523.25, key: '1' },
                { note: 'D5', freq: 587.33, key: '2' },
                { note: 'E5', freq: 659.25, key: '3' },
                { note: 'F5', freq: 698.46, key: '4' },
                { note: 'G5', freq: 783.99, key: '5' },
                { note: 'A5', freq: 880.00, key: '6' },
                { note: 'B5', freq: 987.77, key: '7' },
                { note: 'C6', freq: 1046.50, key: '8' }
            ];

            container.innerHTML = `
                <div class="woodwind-studio-wrapper">
                    <div class="woodwind-instrument-view" style="width:50px; height:450px; background:linear-gradient(90deg, #e6dace, #fffbf0, #dcd0c0); border-radius:5px 5px 20px 20px; border:1px solid #ccc; display:flex; flex-direction:column; justify-content:space-around; align-items:center; box-shadow:0 10px 40px rgba(0,0,0,0.5);">
                        ${notes.map(n => `
                            <div class="recorder-hole" data-freq="${n.freq}" data-key="${n.key}" style="width:18px; height:18px; background:#443322; border-radius:50%; box-shadow:inset 1px 2px 4px #000; cursor:pointer; position:relative;">
                                <span style="position:absolute; right:-30px; color:#999; font-weight:800; font-size:0.7rem;">${n.key}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

            container.querySelectorAll('.recorder-hole').forEach(hole => {
                const play = () => {
                    window.audioEngine.playNote(parseFloat(hole.dataset.freq), 'recorder', 0.8);
                    hole.classList.add('active');
                    setTimeout(() => hole.classList.remove('active'), 200);
                };
                hole.onmousedown = play;
                hole.onmouseenter = (e) => { if (e.buttons === 1) play(); };
            });

            const handler = (e) => {
                if (!container.isConnected) return;
                const hole = Array.from(container.querySelectorAll('.recorder-hole')).find(h => h.dataset.key === e.key);
                if (hole) {
                    window.audioEngine.playNote(parseFloat(hole.dataset.freq), 'recorder', 0.8);
                    hole.classList.add('active');
                    setTimeout(() => hole.classList.remove('active'), 200);
                }
            };
            if (container._recorderHandler) document.removeEventListener('keydown', container._recorderHandler);
            container._recorderHandler = handler;
            document.addEventListener('keydown', handler);
        }
    },

    xylophone: {
        name: "Studio Xylophone",
        render: (container) => {
            const notes = [
                { note: 'C4', freq: 261.63, key: '1' },
                { note: 'D4', freq: 293.66, key: '2' },
                { note: 'E4', freq: 329.63, key: '3' },
                { note: 'F4', freq: 349.23, key: '4' },
                { note: 'G4', freq: 392.00, key: '5' },
                { note: 'A4', freq: 440.00, key: '6' },
                { note: 'B4', freq: 493.88, key: '7' },
                { note: 'C5', freq: 523.25, key: '8' },
                { note: 'D5', freq: 587.33, key: '9' }
            ];

            container.innerHTML = `
                <div class="mallet-studio-wrapper">
                    <div class="mallet-bars-container">
                        ${notes.map((n, i) => `
                            <div class="mallet-bar" data-freq="${n.freq}" data-key="${n.key}" style="height: ${100 - (i * 5)}%;">
                                <span class="mallet-label">${n.key}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="drum-info" style="margin-top:20px;">Glide over bars to play</div>
                </div>
            `;

            container.querySelectorAll('.mallet-bar').forEach(bar => {
                const play = () => {
                    window.audioEngine.playNote(parseFloat(bar.dataset.freq), 'xylophone', 0.6);
                    bar.classList.add('active');
                    setTimeout(() => bar.classList.remove('active'), 150);
                };
                bar.onmousedown = play;
                bar.onmouseenter = play;
            });

            const handler = (e) => {
                if (!container.isConnected) return;
                const note = notes.find(n => n.key === e.key);
                if (note) {
                    const el = container.querySelector(`[data-key="${note.key}"]`);
                    if (el) {
                        window.audioEngine.playNote(note.freq, 'xylophone', 0.6);
                        el.classList.add('active');
                        setTimeout(() => el.classList.remove('active'), 150);
                    }
                }
            };
            if (container._xyloHandler) document.removeEventListener('keydown', container._xyloHandler);
            container._xyloHandler = handler;
            document.addEventListener('keydown', handler);
        }
    },

    glockenspiel: {
        name: "Pro Glockenspiel",
        render: (container) => {
            const notes = [
                { note: 'C5', freq: 523.25, key: '1' },
                { note: 'D5', freq: 587.33, key: '2' },
                { note: 'E5', freq: 659.25, key: '3' },
                { note: 'F5', freq: 698.46, key: '4' },
                { note: 'G5', freq: 783.99, key: '5' },
                { note: 'A5', freq: 880.00, key: '6' },
                { note: 'B5', freq: 987.77, key: '7' },
                { note: 'C6', freq: 1046.50, key: '8' }
            ];

            container.innerHTML = `
                <div class="mallet-studio-wrapper">
                    <div class="mallet-bars-container" style="background:rgba(0,0,0,0.6); border-color:var(--accent);">
                        ${notes.map((n, i) => `
                            <div class="mallet-bar glock" data-freq="${n.freq}" data-key="${n.key}" style="height: ${90 - (i * 6)}%;">
                                <span class="mallet-label">${n.key}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="drum-info" style="margin-top:20px; color:var(--accent);">Hover to play glissando</div>
                </div>
            `;

            container.querySelectorAll('.mallet-bar').forEach(bar => {
                const play = () => {
                    window.audioEngine.playNote(parseFloat(bar.dataset.freq), 'glockenspiel', 1.0);
                    bar.classList.add('active');
                    setTimeout(() => bar.classList.remove('active'), 200);
                };
                bar.onmousedown = play;
                bar.onmouseenter = play;
            });

            const handler = (e) => {
                if (!container.isConnected) return;
                const note = notes.find(n => n.key === e.key);
                if (note) {
                    const el = container.querySelector(`[data-key="${note.key}"]`);
                    if (el) {
                        window.audioEngine.playNote(note.freq, 'glockenspiel', 1.0);
                        el.classList.add('active');
                        setTimeout(() => el.classList.remove('active'), 200);
                    }
                }
            };
            if (container._glockHandler) document.removeEventListener('keydown', container._glockHandler);
            container._glockHandler = handler;
            document.addEventListener('keydown', handler);
        }
    },

    bongos: {
        name: "Latin Bongos",
        render: (container) => {
            container.innerHTML = `
                <div class="woodwind-studio-wrapper">
                    <div class="bongo-studio-wrapper">
                        <div class="bongo-drum" data-freq="400" data-key="L">HIGH [L]</div>
                        <div class="bongo-drum" data-freq="200" data-key="R" style="width:240px; height:240px;">LOW [R]</div>
                    </div>
                </div>
            `;
            const play = (drum) => {
                window.audioEngine.playNote(parseFloat(drum.dataset.freq), 'bongos', 0.2);
                drum.classList.add('active');
                setTimeout(() => drum.classList.remove('active'), 100);
            };
            container.querySelectorAll('.bongo-drum').forEach(d => {
                d.onmousedown = () => play(d);
            });
            const handler = (e) => {
                if (!container.isConnected) return;
                const key = e.key.toUpperCase();
                const drum = container.querySelector(`[data-key="${key}"]`);
                if (drum) play(drum);
            };
            if (container._bongoHandler) document.removeEventListener('keydown', container._bongoHandler);
            container._bongoHandler = handler;
            document.addEventListener('keydown', handler);
        }
    },

    ukulele: {
        name: "Island Ukulele",
        currentChord: 'C',
        chords: {
            'C': [0, 0, 0, 3],
            'G': [0, 2, 3, 2],
            'F': [2, 0, 1, 0],
            'Am': [2, 0, 0, 0],
            'D7': [2, 2, 2, 3]
        },
        baseFreqs: [392.00, 261.63, 329.63, 440.00], // G-C-E-A
        render: (container) => {
            container.innerHTML = `
                <div class="guitar-studio-wrapper">
                    <div class="chord-ribbon"></div>
                    <div class="guitar-body-premium" style="width:500px; height:240px; border-radius:100px 80px 80px 100px;">
                        <div class="guitar-neck" style="height:100px;">
                            ${[...Array(4)].map((_, i) => `<div class="string-line" data-string="${i}"></div>`).join('')}
                        </div>
                        <div class="sound-hole-pro" style="width:120px; height:120px; right:15%;"></div>
                    </div>
                </div>
            `;
            const uke = Instruments.ukulele;
            const rib = container.querySelector('.chord-ribbon');
            Object.keys(uke.chords).forEach(c => {
                const b = document.createElement('button');
                b.className = `chord-btn ${uke.currentChord === c ? 'active' : ''}`;
                b.innerText = c;
                b.onclick = () => {
                    uke.currentChord = c;
                    rib.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                    b.classList.add('active');
                };
                rib.appendChild(b);
            });

            const strum = () => {
                uke.chords[uke.currentChord].forEach((f, i) => {
                    const freq = uke.baseFreqs[i] * Math.pow(2, f / 12);
                    setTimeout(() => {
                        window.audioEngine.playNote(freq, 'ukulele', 1.0);
                        const s = container.querySelector(`[data-string="${i}"]`);
                        s.classList.add('vibrating');
                        setTimeout(() => s.classList.remove('vibrating'), 150);
                    }, i * 30);
                });
            };
            container.querySelector('.sound-hole-pro').onclick = strum;
            container.querySelector('.sound-hole-pro').onmouseenter = (e) => { if (e.buttons === 1) strum(); };

            container.querySelectorAll('.string-line').forEach((s, i) => {
                const playStr = () => {
                    const f = uke.chords[uke.currentChord][i];
                    window.audioEngine.playNote(uke.baseFreqs[i] * Math.pow(2, f / 12), 'ukulele', 1.0);
                    s.classList.add('vibrating');
                    setTimeout(() => s.classList.remove('vibrating'), 150);
                };

                s.onmouseenter = playStr;
                s.onmousedown = playStr;
            });
            const handler = (e) => {
                if (!container.isConnected) return;
                if (e.code === 'Space' || e.key === 'Enter') {
                    e.preventDefault();
                    strum();
                }
            };
            if (container._ukeHandler) document.removeEventListener('keydown', container._ukeHandler);
            container._ukeHandler = handler;
            document.addEventListener('keydown', handler);
        }
    }
};

window.Instruments = Instruments;
