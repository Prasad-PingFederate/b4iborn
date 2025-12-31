const Instruments = {
    piano: {
        name: "Grand Piano",
        render: (container) => {
            const keys = [
                { note: 'C4', freq: 261.63, type: 'white' },
                { note: 'Db4', freq: 277.18, type: 'black' },
                { note: 'D4', freq: 293.66, type: 'white' },
                { note: 'Eb4', freq: 311.13, type: 'black' },
                { note: 'E4', freq: 329.63, type: 'white' },
                { note: 'F4', freq: 349.23, type: 'white' },
                { note: 'Gb4', freq: 369.99, type: 'black' },
                { note: 'G4', freq: 392.00, type: 'white' },
                { note: 'Ab4', freq: 415.30, type: 'black' },
                { note: 'A4', freq: 440.00, type: 'white' },
                { note: 'Bb4', freq: 466.16, type: 'black' },
                { note: 'B4', freq: 493.88, type: 'white' },
                { note: 'C5', freq: 523.25, type: 'white' }
            ];

            container.innerHTML = '<div class="piano-keys-container"></div>';
            const keysContainer = container.querySelector('.piano-keys-container');

            keys.forEach(key => {
                const keyEl = document.createElement('div');
                keyEl.className = `${key.type}-key`;
                keyEl.dataset.note = key.note;
                keyEl.dataset.freq = key.freq;

                const playKey = () => {
                    window.audioEngine.playNote(key.freq, 'piano');
                    keyEl.classList.add('active');
                    setTimeout(() => keyEl.classList.remove('active'), 200);
                };

                keyEl.addEventListener('mousedown', playKey);
                keyEl.addEventListener('mouseenter', playKey); // Hover support

                keyEl.addEventListener('mouseup', () => keyEl.classList.remove('active'));
                keyEl.addEventListener('mouseleave', () => keyEl.classList.remove('active'));

                keysContainer.appendChild(keyEl);
            });
        }
    },

    drums: {
        name: "Drum Kit",
        render: (container) => {
            const pads = [
                { name: 'Crash', freq: 4000, icon: '💥', color: '#FFD700' },  // Row 1
                { name: 'Hi-Tom', freq: 400, icon: '🥁', color: '#FF5722' },
                { name: 'Ride', freq: 5000, icon: '◎', color: '#FFD700' },

                { name: 'Open Hat', freq: 1001, icon: '⭕', color: '#FFC107' }, // Row 2
                { name: 'Mid-Tom', freq: 300, icon: '🥁', color: '#E64A19' },
                { name: 'Hi-Hat', freq: 1000, icon: '⛔', color: '#FFC107' },

                { name: 'Floor Tom', freq: 200, icon: '🥁', color: '#D84315' }, // Row 3
                { name: 'Snare', freq: 150, icon: '⚪', color: '#EEEEEE' },
                { name: 'Kick', freq: 60, icon: '⚫', color: '#212121' }
            ];

            container.innerHTML = '<div class="drum-pads-container"></div>';
            const padsContainer = container.querySelector('.drum-pads-container');
            padsContainer.style.display = 'grid';
            padsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
            padsContainer.style.gap = '15px';
            padsContainer.style.maxWidth = '600px';
            padsContainer.style.padding = '20px';
            padsContainer.style.margin = '0 auto';
            padsContainer.style.background = 'rgba(0,0,0,0.2)';
            padsContainer.style.borderRadius = '20px';

            pads.forEach(pad => {
                const padEl = document.createElement('div');
                padEl.className = 'drum-pad';
                padEl.innerHTML = `<span style="font-size: 2rem;">${pad.icon}</span><p style="margin-top:5px; font-size:0.8rem; font-weight:600; color:var(--text-main);">${pad.name}</p>`;
                padEl.style.background = 'var(--bg-card)';
                padEl.style.border = `2px solid ${pad.color}`;
                padEl.style.borderRadius = '12px';
                padEl.style.padding = '20px';
                padEl.style.textAlign = 'center';
                padEl.style.cursor = 'pointer';
                padEl.style.transition = 'all 0.1s ease';
                padEl.style.boxShadow = `0 4px 0 ${pad.color}40`; // slight 3D effect
                padEl.style.userSelect = 'none';

                const playPad = () => {
                    window.audioEngine.playNote(pad.freq, 'drums', 0.2);
                    padEl.style.transform = 'translateY(4px)';
                    padEl.style.boxShadow = 'none';
                    padEl.style.borderColor = '#fff';
                    setTimeout(() => {
                        padEl.style.transform = 'translateY(0)';
                        padEl.style.boxShadow = `0 4px 0 ${pad.color}40`;
                        padEl.style.borderColor = pad.color;
                    }, 100);
                };

                padEl.addEventListener('mousedown', playPad);
                padEl.addEventListener('mouseenter', (e) => { if (e.buttons === 1) playPad(); }); // Drag to play

                // Multi-touch support
                padEl.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    playPad();
                });

                padsContainer.appendChild(padEl);
            });

            // Instructions
            const info = document.createElement('div');
            info.innerHTML = "Tap or use Keyboard (Coming Soon)";
            info.style.textAlign = 'center';
            info.style.marginTop = '10px';
            info.style.color = 'var(--text-dim)';
            container.appendChild(info);
        }
    },

    keyboard: {
        name: "Neon Synth",
        render: (container) => {
            const keys = [
                { note: 'C3', freq: 130.81, type: 'white' },
                { note: 'Db3', freq: 138.59, type: 'black' },
                { note: 'D3', freq: 146.83, type: 'white' },
                { note: 'Eb3', freq: 155.56, type: 'black' },
                { note: 'E3', freq: 164.81, type: 'white' },
                { note: 'F3', freq: 174.61, type: 'white' },
                { note: 'Gb3', freq: 185.00, type: 'black' },
                { note: 'G3', freq: 196.00, type: 'white' },
                { note: 'Ab3', freq: 207.65, type: 'black' },
                { note: 'A3', freq: 220.00, type: 'white' },
                { note: 'Bb3', freq: 233.08, type: 'black' },
                { note: 'B3', freq: 246.94, type: 'white' }
            ];

            container.innerHTML = '<div class="piano-keys-container synth-mode"></div>';
            const keysContainer = container.querySelector('.piano-keys-container');
            keysContainer.style.background = 'linear-gradient(180deg, #111, #222)';

            keys.forEach(key => {
                const keyEl = document.createElement('div');
                keyEl.className = `${key.type}-key`;
                keyEl.style.boxShadow = key.type === 'white' ? '0 0 5px var(--accent-glow)' : '0 0 10px var(--primary-glow)';

                const playSynth = () => {
                    window.audioEngine.playNote(key.freq, 'keyboard', 0.8);
                    keyEl.classList.add('active');
                    setTimeout(() => keyEl.classList.remove('active'), 200);
                };

                keyEl.addEventListener('mousedown', playSynth);
                keyEl.addEventListener('mouseenter', playSynth); // Hover support

                keyEl.addEventListener('mouseup', () => keyEl.classList.remove('active'));
                keyEl.addEventListener('mouseleave', () => keyEl.classList.remove('active'));

                keysContainer.appendChild(keyEl);
            });
        }
    },

        recorder: {
        name: "Soprano Recorder",
        render: (container) => {
            // Realistic Soprano Recorder (Cream/Ivory color)
            // Keys 1-9
            const notes = [
                { note: 'C5', freq: 523.25, key: '1', label: 'C' },
                { note: 'D5', freq: 587.33, key: '2', label: 'D' },
                { note: 'E5', freq: 659.25, key: '3', label: 'E' },
                { note: 'F5', freq: 698.46, key: '4', label: 'F' },
                { note: 'G5', freq: 783.99, key: '5', label: 'G' },
                { note: 'A5', freq: 880.00, key: '6', label: 'A' },
                { note: 'B5', freq: 987.77, key: '7', label: 'B' },
                { note: 'C6', freq: 1046.50, key: '8', label: 'C' },
                { note: 'D6', freq: 1174.66, key: '9', label: 'D' }
            ];

            container.innerHTML = `
                <div class="recorder-wrapper" style="display:flex; flex-direction:column; align-items:center; height:100%; padding:20px; user-select:none;">
                    <!-- Recorder Instrument -->
                    <div class="recorder-instrument" style="position:relative; width:45px; height:500px; display:flex; flex-direction:column; align-items:center;">
                        
                        <!-- HEAD JOINT -->
                        <div class="head-joint" style="width:100%; height:120px; background:linear-gradient(90deg, #e6dace 0%, #fffbf0 40%, #dcd0c0 100%); border-radius:10px 10px 2px 2px; position:relative; box-shadow:5px 5px 15px rgba(0,0,0,0.3); border:1px solid #ccc; z-index:3;">
                            <!-- Mouthpiece/Beak -->
                            <div style="width:100%; height:30px; background:linear-gradient(90deg, #e6dace, #fffbf0, #dcd0c0); clip-path: polygon(20% 0, 80% 0, 100% 100%, 0% 100%);"></div>
                            <!-- Window/Labium -->
                            <div style="width:20px; height:12px; background:#443322; margin:20px auto 0; border-radius:2px; box-shadow:inset 0 0 5px #000;"></div>
                            <!-- Joint Ring -->
                            <div style="position:absolute; bottom:0; width:110%; left:-5%; height:10px; background:linear-gradient(90deg, #d4c4b0, #f0e6d6, #d4c4b0); border-radius:2px;"></div>
                        </div>

                        <!-- BODY JOINT -->
                        <div class="body-joint" style="flex:1; width:90%; background:linear-gradient(90deg, #e6dace 0%, #fffbf0 40%, #dcd0c0 100%); display:flex; flex-direction:column; justify-content:space-evenly; align-items:center; padding:10px 0; box-shadow:5px 0 15px rgba(0,0,0,0.2); border-left:1px solid #ccc; border-right:1px solid #ccc; z-index:2;">
                            ${notes.filter((_, i) => i < 7).map((n) => `
                                <div class="recorder-hole" data-key="${n.key}" data-freq="${n.freq}" style="width:16px; height:16px; background:radial-gradient(circle, #3d2b1f 40%, #5d4037 100%); border-radius:50%; box-shadow:inset 1px 2px 4px rgba(0,0,0,0.8); cursor:pointer; position:relative;">
                                    <div class="finger-cover" style="position:absolute; top:-2px; left:-2px; width:20px; height:20px; background:rgba(255,200,150,0.6); border-radius:50%; opacity:0; transition:opacity 0.1s;"></div>
                                </div>
                            `).join('')}
                             <!-- Double holes for low notes usually, but simplifying to single for 1-9 mapping -->
                        </div>

                        <!-- FOOT JOINT -->
                        <div class="foot-joint" style="width:105%; height:80px; background:linear-gradient(90deg, #e6dace 0%, #fffbf0 40%, #dcd0c0 100%); border-radius:2px 2px 15px 15px; position:relative; box-shadow:5px 5px 15px rgba(0,0,0,0.3); border:1px solid #ccc; display:flex; flex-direction:column; justify-content:center; align-items:center; z-index:1; margin-top:-2px;">
                            <!-- Joint Ring Top -->
                            <div style="width:105%; height:8px; background:linear-gradient(90deg, #d4c4b0, #f0e6d6, #d4c4b0); position:absolute; top:0; border-radius:2px;"></div>
                            
                            <!-- Last Holes (C6, D6 mapped here for visual distribution) -->
                            ${notes.filter((_, i) => i >= 7).map((n) => `
                                <div class="recorder-hole" data-key="${n.key}" data-freq="${n.freq}" style="width:14px; height:14px; background:radial-gradient(circle, #3d2b1f 40%, #5d4037 100%); border-radius:50%; box-shadow:inset 1px 2px 4px rgba(0,0,0,0.8); cursor:pointer; margin:4px 0; position:relative;">
                                    <div class="finger-cover" style="position:absolute; top:-2px; left:-2px; width:18px; height:18px; background:rgba(255,200,150,0.6); border-radius:50%; opacity:0; transition:opacity 0.1s;"></div>
                                </div>
                            `).join('')}

                            <!-- Bell Flare -->
                            <div style="position:absolute; bottom:0; width:120%; height:15px; background:linear-gradient(90deg, #d4c4b0, #f0e6d6, #d4c4b0); border-radius:0 0 50% 50%;"></div>
                        </div>
                    </div>
                    
                    <div style="margin-top:20px; color:var(--text-dim); text-align:center;">
                        High Pitch Soprano Recorder<br>
                        Hover holes or Keys 1-9
                    </div>
                </div>
            `;

            const rContainer = container.querySelector('.recorder-wrapper');
            const holes = rContainer.querySelectorAll('.recorder-hole');

            const playNote = (hole) => {
                const freq = parseFloat(hole.dataset.freq);
                window.audioEngine.playNote(freq, 'recorder', 0.5);
                
                const cover = hole.querySelector('.finger-cover');
                cover.style.opacity = '1';
                hole.style.boxShadow = '0 0 10px var(--accent)'; // Glow effect
                
                setTimeout(() => {
                    cover.style.opacity = '0';
                    hole.style.boxShadow = 'inset 1px 2px 4px rgba(0,0,0,0.8)';
                }, 150);
            };

            holes.forEach(hole => {
                hole.addEventListener('mousedown', () => playNote(hole));
                hole.addEventListener('mouseenter', () => playNote(hole));
            });

            // Keyboard Handler
            const keyHandler = (e) => {
                if (!container.isConnected) return;
                const hole = Array.from(holes).find(h => h.dataset.key === e.key);
                if (hole) playNote(hole);
            };

            if (container._recorderKeyHandler) {
                document.removeEventListener('keydown', container._recorderKeyHandler);
            }
            container._recorderKeyHandler = keyHandler;
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
                <div class="guitar-container" style="display:flex; flex-direction:column; height:100%; width:100%; padding:20px;">
                    <div class="chord-selector" style="display:flex; justify-content:center; gap:10px; margin-bottom:30px; flex-wrap:wrap;"></div>
                    <div class="guitar-body" style="flex:1; background:radial-gradient(circle at center, #8B4513, #3E2723); border-radius:40px; border:8px solid #2d1b0f; position:relative; overflow:hidden; display:flex; align-items:center; padding:0 40px; box-shadow: inset 0 0 50px rgba(0,0,0,0.8);">
                        <div class="sound-hole" style="position:absolute; right:15%; width:200px; height:200px; background:#1a0f0a; border-radius:50%; border:4px solid #5D4037; z-index:1;"></div>
                        <div class="fretboard" style="position:absolute; left:0; width:100%; height:140px; background:linear-gradient(90deg, #222, #333); display:flex; flex-direction:column; justify-content:space-around; z-index:5;">
                            ${[1, 2, 3, 4, 5, 6].map((idx) => `<div class="string-line" style="height:${idx}px; background:linear-gradient(90deg, #ccc, #fff, #ccc); width:100%; box-shadow:0 2px 2px rgba(0,0,0,0.5);"></div>`).join('')}
                        </div>
                        <div class="strum-area" style="position:absolute; right:15%; width:200px; height:200px; border-radius:50%; z-index:10; cursor:pointer;">
                            <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); color:rgba(255,255,255,0.2); font-size:1.5rem; text-transform:uppercase; letter-spacing:2px; pointer-events:none;">Strum</div>
                        </div>
                    </div>
                    <div style="text-align:center; margin-top:20px; color:var(--text-dim);">Select chord + Click/Hover Strum Area or individual strings</div>
                </div>
            `;

            const chordSelector = container.querySelector('.chord-selector');
            const guitar = Instruments.guitar;

            Object.keys(guitar.chords).forEach(chord => {
                const btn = document.createElement('button');
                btn.className = `btn btn-sm ${guitar.currentChord === chord ? 'btn-primary' : 'btn-outline'}`;
                btn.innerText = chord;
                btn.style.minWidth = '50px';
                btn.onclick = () => {
                    guitar.currentChord = chord;
                    container.querySelectorAll('.chord-selector button').forEach(b => b.className = 'btn btn-sm btn-outline');
                    btn.className = 'btn btn-sm btn-primary';
                };
                chordSelector.appendChild(btn);
            });

            const strumArea = container.querySelector('.strum-area');
            const strum = (delay) => {
                const chordNotes = guitar.chords[guitar.currentChord];
                chordNotes.forEach((fret, i) => {
                    if (fret !== -1) {
                        const freq = guitar.baseFreqs[i] * Math.pow(2, fret / 12);
                        setTimeout(() => {
                            window.audioEngine.playNote(freq, 'guitar', 1.5);
                            const string = container.querySelectorAll('.string-line')[i];
                            string.style.transform = 'translateY(1px)';
                            string.style.background = '#ffd700'; // Gold when playing
                            setTimeout(() => {
                                string.style.transform = 'translateY(0)';
                                string.style.background = 'linear-gradient(90deg, #ccc, #fff, #ccc)';
                            }, 100);
                        }, i * delay * 1000);
                    }
                });
            };

            strumArea.onmousedown = () => strum(0.04);
            strumArea.onmouseenter = () => strum(0.04); // Hover to strum

            // String interaction
            container.querySelectorAll('.string-line').forEach((string, i) => {
                string.addEventListener('mouseenter', () => {
                    const fret = guitar.chords[guitar.currentChord][i];
                    if (fret !== -1) {
                        const freq = guitar.baseFreqs[i] * Math.pow(2, fret / 12);
                        window.audioEngine.playNote(freq, 'guitar', 1.5);
                        string.style.background = '#ffd700';
                        setTimeout(() => string.style.background = 'linear-gradient(90deg, #ccc, #fff, #ccc)', 150);
                    }
                });
            });

            // Keyboard support
            const keyMap = { 'a': 'A', 'b': 'B', 'c': 'C', 'd': 'D', 'e': 'E', 'f': 'F', 'g': 'G' };
            const handler = (e) => {
                if (!container.isConnected) return;
                const chord = keyMap[e.key.toLowerCase()];
                if (chord && guitar.chords[chord]) {
                    const btn = Array.from(chordSelector.children).find(b => b.innerText === chord);
                    if (btn) btn.click();
                }
                if (e.key === 'Enter') strum(0.02);
            };
            document.onkeydown = handler;
        }
    },

    violin: {
        name: "Virtuoso Violin",
        render: (container) => {
            container.innerHTML = `
                <div class="violin-container">
                    <div class="violin-body">
                        <div class="violin-string" data-freq="196.00"></div>
                        <div class="violin-string" data-freq="293.66"></div>
                        <div class="violin-string" data-freq="440.00"></div>
                        <div class="violin-string" data-freq="659.25"></div>
                    </div>
                    <div class="violin-bow"></div>
                </div>
            `;

            const violinContainer = container.querySelector('.violin-container');
            violinContainer.style.position = 'relative';
            violinContainer.style.width = '100%';
            violinContainer.style.height = '100%';
            violinContainer.style.display = 'flex';
            violinContainer.style.justifyContent = 'center';
            violinContainer.style.alignItems = 'center';

            const stringsNodes = container.querySelectorAll('.violin-string');
            stringsNodes.forEach(s => {
                s.style.width = '3px';
                s.style.height = '80%';
                s.style.background = 'silver';
                s.style.margin = '0 20px';
                s.style.boxShadow = '0 2px 5px rgba(0,0,0,0.5)';
                s.style.transition = '0.1s';

                s.addEventListener('mouseenter', () => {
                    window.audioEngine.playNote(parseFloat(s.dataset.freq), 'violin', 1.2);
                    s.style.background = '#ffd700';
                    s.style.boxShadow = '0 0 15px #ffd700';
                    setTimeout(() => {
                        s.style.background = 'silver';
                        s.style.boxShadow = '0 2px 5px rgba(0,0,0,0.5)';
                    }, 500);
                });
            });

            const body = container.querySelector('.violin-body');
            body.style.display = 'flex';
            body.style.background = 'linear-gradient(45deg, #321414, #502828)';
            body.style.padding = '20px 40px';
            body.style.borderRadius = '50px';
            body.style.border = '4px solid #1a0a0a';
            body.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';

            const bow = container.querySelector('.violin-bow');
            bow.style.position = 'absolute';
            bow.style.width = '100%';
            bow.style.height = '6px';
            bow.style.background = 'rgba(255,255,255,0.7)';
            bow.style.boxShadow = '0 0 10px white';
            bow.style.pointerEvents = 'none';
            bow.style.display = 'none';

            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const y = e.clientY - rect.top;
                bow.style.display = 'block';
                bow.style.top = `${y}px`;
            });
            container.addEventListener('mouseleave', () => bow.style.display = 'none');
        }
    },

    panFlute: {
        name: "Pan Flute",
        render: (container) => {
            // Enhanced 15-pipe Pan Flute matching virtualmusicalinstruments.com
            // Range: G4 to G6
            const pipes = [
                { note: 'G4', freq: 392.00, key: '1' },
                { note: 'A4', freq: 440.00, key: '2' },
                { note: 'B4', freq: 493.88, key: '3' },
                { note: 'C5', freq: 523.25, key: '4' },
                { note: 'D5', freq: 587.33, key: '5' },
                { note: 'E5', freq: 659.25, key: '6' },
                { note: 'F#5', freq: 739.99, key: '7' },
                { note: 'G5', freq: 783.99, key: '8' },
                { note: 'A5', freq: 880.00, key: '9' },
                { note: 'B5', freq: 987.77, key: '0' },
                { note: 'C6', freq: 1046.50, key: 'q' },
                { note: 'D6', freq: 1174.66, key: 'w' },
                { note: 'E6', freq: 1318.51, key: 'e' },
                { note: 'F#6', freq: 1479.98, key: 'r' },
                { note: 'G6', freq: 1567.98, key: 't' }
            ];

            // Calculate height gradient
            const maxH = 280;
            const minH = 80;
            pipes.forEach((p, i) => {
                p.height = maxH - ((maxH - minH) / (pipes.length - 1)) * i;
            });

            container.innerHTML = `
                <div class="pan-flute-wrapper" style="position:relative; display:inline-block; padding:30px; user-select:none;">
                    <div class="pan-flute-container" style="display:flex; align-items:flex-start; height:100%;"></div>
                    <!-- Curved Binding -->
                    <div class="pan-binding-curve" style="position:absolute; top:60px; left:-2%; width:104%; height:35px; background:linear-gradient(to right, #5D4037, #8B4513, #5D4037); border-radius:50% / 100% 100% 0 0; box-shadow:0 5px 10px rgba(0,0,0,0.4); pointer-events:none; z-index:10;"></div>
                    <div style="text-align:center; margin-top:30px; color:var(--text-dim); font-size:0.9rem;">Hover to play | Keys: 1-0, Q-T</div>
                </div>
            `;
            const wrapper = container.querySelector('.pan-flute-wrapper');
            wrapper.parentNode.style.display = 'flex';
            wrapper.parentNode.style.justifyContent = 'center';
            wrapper.parentNode.style.alignItems = 'center';

            const pfContainer = container.querySelector('.pan-flute-container');

            pipes.forEach(p => {
                const pipe = document.createElement('div');
                pipe.className = 'pan-pipe';
                pipe.dataset.key = p.key;
                pipe.style.width = '35px';
                pipe.style.height = `${p.height}px`;
                pipe.style.background = 'linear-gradient(90deg, #e3c099 10%, #fff3e0 40%, #d2a679 90%)'; // Realistic bamboo
                pipe.style.border = '1px solid #8B4513';
                pipe.style.borderBottomLeftRadius = '18px';
                pipe.style.borderBottomRightRadius = '18px';
                pipe.style.margin = '0 2px';
                pipe.style.boxShadow = '3px 5px 10px rgba(0,0,0,0.3)';
                pipe.style.cursor = 'pointer';
                pipe.style.position = 'relative';
                pipe.style.transition = 'transform 0.05s, background 0.05s';
                pipe.style.zIndex = '1';

                // Pipe visual details (hole + key label)
                pipe.innerHTML = `
                    <div style="width:20px; height:8px; background:radial-gradient(circle, #2e1a0f, #000); border-radius:50%; margin:5px auto 0; opacity:0.6;"></div>
                    <div style="position:absolute; bottom:15px; width:100%; text-align:center; color:#5d4037; font-size:11px; font-weight:bold; opacity:0.8; pointer-events:none;">${p.key.toUpperCase()}</div>
                `;

                const play = () => {
                    window.audioEngine.playNote(p.freq, 'panFlute', 0.5);
                    pipe.style.transform = 'translateY(12px)';
                    pipe.style.background = 'linear-gradient(90deg, #ffd54f 10%, #fff 40%, #ffca28 90%)'; // Gold highlight
                    pipe.style.boxShadow = '0 0 15px #ffd700';
                    setTimeout(() => {
                        pipe.style.transform = 'translateY(0)';
                        pipe.style.background = 'linear-gradient(90deg, #e3c099 10%, #fff3e0 40%, #d2a679 90%)';
                        pipe.style.boxShadow = '3px 5px 10px rgba(0,0,0,0.3)';
                    }, 150);
                };

                // Mouse interactions
                pipe.addEventListener('mousedown', play);
                pipe.addEventListener('mouseenter', play); // Hover to play as requested

                pfContainer.appendChild(pipe);
            });

            // Keyboard support (global listener for this instrument rendering)
            const keyHandler = (e) => {
                if (!container.isConnected) return; // Stop if instrument is unmounted
                if (e.repeat) return;
                
                const key = e.key.toLowerCase();
                const pipe = Array.from(pfContainer.children).find(el => el.dataset.key === key);
                
                if (pipe) {
                    const pObj = pipes.find(p => p.key === key);
                    if(pObj) {
                        window.audioEngine.playNote(pObj.freq, 'panFlute', 0.5);
                        pipe.style.transform = 'translateY(12px)';
                        pipe.style.background = 'linear-gradient(90deg, #ffd54f 10%, #fff 40%, #ffca28 90%)';
                        pipe.style.boxShadow = '0 0 15px #ffd700';
                        setTimeout(() => {
                            pipe.style.transform = 'translateY(0)';
                            pipe.style.background = 'linear-gradient(90deg, #e3c099 10%, #fff3e0 40%, #d2a679 90%)';
                            pipe.style.boxShadow = '3px 5px 10px rgba(0,0,0,0.3)';
                        }, 150);
                    }
                }
            };
            
            // Remove previous listener if exists (to avoid duplicates on re-render)
            if (container._panFluteKeyHandler) {
                document.removeEventListener('keydown', container._panFluteKeyHandler);
            }
            container._panFluteKeyHandler = keyHandler;
            document.addEventListener('keydown', keyHandler);
        }
    },

    flute: {
        name: "Concert Flute",
        render: (container) => {
            // Metallic Silver Flute with specific key layout
            container.innerHTML = `
                <div class="flute-container" style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:100%;">
                    <div class="flute-body" style="width:90%; height:50px; background:linear-gradient(to bottom, #d7d7d7 0%, #f0f0f0 50%, #adadad 100%); border-radius:4px; position:relative; display:flex; justify-content:space-evenly; align-items:center; box-shadow:0 10px 20px rgba(0,0,0,0.4); border:1px solid #999;">
                         <div class="mouthpiece" style="position:absolute; left:20px; width:40px; height:30px; background:linear-gradient(to bottom, #ccc, #eee); border-radius:50%; border:1px solid #aaa;"></div>
                         <div style="width:60px;"></div> <!-- Spacer for mouthpiece -->
                         ${[523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77].map((freq) => `
                             <div class="flute-hole-key" data-freq="${freq}" style="width:35px; height:35px; background:radial-gradient(circle at 30% 30%, #fff, #silver, #666); border-radius:50%; border:1px solid #888; cursor:pointer; box-shadow:0 2px 4px rgba(0,0,0,0.3); display:flex; justify-content:center; align-items:center;">
                                <div style="width:20px; height:20px; border-radius:50%; background:inset rgba(0,0,0,0.1);"></div>
                             </div>
                         `).join('')}
                    </div>
                    <div style="margin-top:20px; color:var(--text-dim); font-size:0.9rem;">Tap keys to play</div>
                </div>
            `;

            container.querySelectorAll('.flute-hole-key').forEach(hole => {
                const play = () => {
                    const freq = parseFloat(hole.dataset.freq);
                    window.audioEngine.playNote(freq, 'flute', 0.5);
                    hole.style.transform = 'translateY(2px)';
                    hole.style.background = 'radial-gradient(circle at 30% 30%, #fff, #ffd700, #b8860b)'; // Gold highlight
                    setTimeout(() => {
                        hole.style.transform = 'translateY(0)';
                        hole.style.background = 'radial-gradient(circle at 30% 30%, #fff, #silver, #666)';
                    }, 150);
                };
                hole.onmousedown = play;
                hole.onmouseenter = (e) => { if (e.buttons === 1) play(); };
            });
        }
    },

    clarinet: {
        name: "Clarinet",
        render: (container) => {
            // Vertical Black Wood/Plastic tube with silver keys
            container.innerHTML = `
                <div class="clarinet-container" style="display:flex; justify-content:center; align-items:center; height:100%; padding:20px;">
                    <div class="clarinet-body" style="width:60px; height:100%; max-height:500px; background:linear-gradient(90deg, #000, #222, #000); border-radius:10px 10px 40px 40px; position:relative; display:flex; flex-direction:column; justify-content:space-evenly; align-items:center; box-shadow:0 15px 30px rgba(0,0,0,0.6); border:1px solid #333;">
                         <div style="width:100%; height:2px; background:#444; position:absolute; top:40px;"></div>
                         <div style="width:100%; height:2px; background:#444; position:absolute; bottom:60px;"></div>
                         
                         ${[261.63, 293.66, 329.63, 349.23, 392.00, 440.00].map((freq) => `
                             <div class="clarinet-key" data-freq="${freq}" style="width:40px; height:40px; background:radial-gradient(circle at 30% 30%, #e0e0e0, #999); border-radius:50%; border:1px solid #666; cursor:pointer; box-shadow:0 3px 5px rgba(0,0,0,0.5); z-index:2;"></div>
                         `).join('')}
                         
                         <div style="width:70px; height:40px; background:#111; border-radius:0 0 50% 50%; position:absolute; bottom:-10px; z-index:1;"></div> <!-- Bell -->
                    </div>
                </div>
            `;
            container.querySelectorAll('.clarinet-key').forEach(key => {
                const play = () => {
                    window.audioEngine.playNote(parseFloat(key.dataset.freq), 'clarinet', 0.6);
                    key.style.transform = 'scale(0.95)';
                    key.style.background = 'radial-gradient(circle at 30% 30%, #fff, #ffd700, #b8860b)';
                    setTimeout(() => {
                        key.style.transform = 'scale(1)';
                        key.style.background = 'radial-gradient(circle at 30% 30%, #e0e0e0, #999)';
                    }, 150);
                };
                key.onmousedown = play;
                key.onmouseenter = (e) => { if (e.buttons === 1) play(); };
            });
        }
    },

    recorder: {
        name: "Soprano Recorder",
        render: (container) => {
            // Light wood texture
            container.innerHTML = `
                <div class="recorder-container" style="display:flex; justify-content:center; align-items:center; height:100%;">
                    <div class="recorder-body" style="width:45px; height:90%; background:linear-gradient(90deg, #d2a679, #f5deb3, #d2a679); border-radius:10px 10px 20px 20px; position:relative; display:flex; flex-direction:column; justify-content:space-evenly; align-items:center; box-shadow:2px 5px 15px rgba(0,0,0,0.3); border:1px solid #c19a6b;">
                         <div style="width:100%; height:15px; background:#8b4513; margin-top:20px;"></div> <!-- Joint -->
                         
                         <div style="width:30px; height:10px; background:#333; margin-top:-40px; clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);"></div> <!-- Window -->

                         ${[523.25, 587.33, 659.25, 698.46, 783.99, 880.00].map((freq) => `
                             <div class="recorder-hole" data-freq="${freq}" style="width:18px; height:18px; background:#3d2b1f; border-radius:50%; cursor:pointer; box-shadow:inset 1px 2px 4px rgba(0,0,0,0.6);"></div>
                         `).join('')}
                         
                         <div style="width:55px; height:25px; background:#8b4513; border-radius:0 0 15px 15px; position:absolute; bottom:0;"></div> <!-- Foot joint -->
                    </div>
                </div>
            `;
            container.querySelectorAll('.recorder-hole').forEach(hole => {
                const play = () => {
                    window.audioEngine.playNote(parseFloat(hole.dataset.freq), 'recorder', 0.5);
                    hole.style.background = '#8B4513';
                    hole.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        hole.style.background = '#3d2b1f';
                        hole.style.transform = 'scale(1)';
                    }, 150);
                };
                hole.onmousedown = play;
                hole.onmouseenter = (e) => { if (e.buttons === 1) play(); };
            });
        }
    },

    xylophone: {
        name: "Xylophone",
        render: (container) => {
            const bars = [261, 293, 329, 349, 392, 440, 493, 523];
            container.innerHTML = `
                <div class="xylophone-frame" style="background:#5D4037; padding:20px; border-radius:10px; display:inline-block; box-shadow:0 10px 20px rgba(0,0,0,0.5);">
                    <div class="xylophone-container" style="display:flex; justify-content:center; align-items:center; gap:8px;"></div>
                </div>
            `;
            container.style.display = 'flex';
            container.style.justifyContent = 'center';
            container.style.alignItems = 'center';
            const xCont = container.querySelector('.xylophone-container');

            bars.forEach((freq, i) => {
                const bar = document.createElement('div');
                bar.style.width = '45px';
                bar.style.height = `${280 - (i * 20)}px`;
                // Rainbow wood texture
                const hue = i * 45;
                bar.style.background = `linear-gradient(to right, hsl(${hue}, 70%, 50%), hsl(${hue}, 70%, 60%))`;
                bar.style.borderRadius = '4px';
                bar.style.cursor = 'pointer';
                bar.style.boxShadow = '0 5px 0 rgba(0,0,0,0.2)';
                bar.style.border = '1px solid rgba(255,255,255,0.2)';
                bar.style.position = 'relative';

                // Screw heads
                const screw = "width:8px; height:8px; background:#ccc; border-radius:50%; position:absolute; left:50%; transform:translateX(-50%); box-shadow:inset 0 1px 2px rgba(0,0,0,0.5);";
                bar.innerHTML = `<div style="${screw} top:10px;"></div><div style="${screw} bottom:10px;"></div>`;

                const play = () => {
                    window.audioEngine.playNote(freq, 'xylophone', 0.4);
                    bar.style.transform = 'translateY(4px)';
                    bar.style.boxShadow = 'none';
                    bar.style.filter = 'brightness(1.2)';
                    setTimeout(() => {
                        bar.style.transform = 'translateY(0)';
                        bar.style.boxShadow = '0 5px 0 rgba(0,0,0,0.2)';
                        bar.style.filter = 'brightness(1)';
                    }, 100);
                };

                bar.onmousedown = play;
                bar.onmouseenter = (e) => { if (e.buttons === 1) play(); };
                xCont.appendChild(bar);
            });
        }
    },

    glockenspiel: {
        name: "Glockenspiel",
        render: (container) => {
            const bars = [523, 587, 659, 698, 783, 880, 987, 1046];
            container.innerHTML = `
                <div class="glock-frame" style="background:#333; padding:20px; border-radius:4px; display:inline-block; box-shadow:0 10px 25px rgba(0,0,0,0.5); border:2px solid #555;">
                    <div class="glock-container" style="display:flex; justify-content:center; align-items:center; gap:8px;"></div>
                </div>
            `;
            container.style.display = 'flex';
            container.style.justifyContent = 'center';
            container.style.alignItems = 'center';
            const gCont = container.querySelector('.glock-container');

            bars.forEach((freq, i) => {
                const bar = document.createElement('div');
                bar.style.width = '40px';
                bar.style.height = `${240 - (i * 15)}px`;
                bar.style.background = 'linear-gradient(135deg, #e0e0e0 0%, #ffffff 50%, #c0c0c0 100%)'; // Shiny metal
                bar.style.borderRadius = '2px';
                bar.style.cursor = 'pointer';
                bar.style.boxShadow = '0 4px 0 #999';
                bar.style.border = '1px solid #fff';
                bar.style.position = 'relative';

                // Screw heads
                const screw = "width:6px; height:6px; background:#555; border-radius:50%; position:absolute; left:50%; transform:translateX(-50%); opacity:0.6;";
                bar.innerHTML = `<div style="${screw} top:8px;"></div><div style="${screw} bottom:8px;"></div>`;

                const play = () => {
                    window.audioEngine.playNote(freq, 'glockenspiel', 0.6);
                    bar.style.transform = 'translateY(4px)';
                    bar.style.boxShadow = 'none';
                    bar.style.background = 'linear-gradient(135deg, #fff 0%, #fff 100%)'; // Flash white
                    setTimeout(() => {
                        bar.style.transform = 'translateY(0)';
                        bar.style.boxShadow = '0 4px 0 #999';
                        bar.style.background = 'linear-gradient(135deg, #e0e0e0 0%, #ffffff 50%, #c0c0c0 100%)';
                    }, 100);
                };
                bar.onmousedown = play;
                bar.onmouseenter = (e) => { if (e.buttons === 1) play(); };
                gCont.appendChild(bar);
            });
        }
    },

    bongos: {
        name: "Bongos",
        render: (container) => {
            container.innerHTML = `
                <div class="bongos-container" style="display:flex; justify-content:center; gap:20px; align-items:center; height:100%;">
                    <div class="bongo-left" style="display:flex; flex-direction:column; align-items:center;">
                        <div class="bongo-drum" data-freq="200" style="width:180px; height:180px; background:radial-gradient(circle at 40% 40%, #f5deb3, #d2a679); border-radius:50%; border:12px solid #8B4513; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 20px 40px rgba(0,0,0,0.5); position:relative;">
                            <div style="position:absolute; width:100%; height:100%; border-radius:50%; box-shadow:inset 0 0 20px rgba(0,0,0,0.2);"></div>
                            <span style="font-size:2rem; opacity:0.3; user-select:none;">Low</span>
                        </div>
                        <div style="width:140px; height:80px; background:#5D4037; margin-top:-40px; z-index:-1; border-radius:0 0 20px 20px;"></div>
                    </div>
                    
                     <div class="bongo-connector" style="width:40px; height:20px; background:#333; border-radius:5px;"></div>

                    <div class="bongo-right" style="display:flex; flex-direction:column; align-items:center;">
                        <div class="bongo-drum" data-freq="400" style="width:140px; height:140px; background:radial-gradient(circle at 40% 40%, #f5deb3, #d2a679); border-radius:50%; border:10px solid #8B4513; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 15px 30px rgba(0,0,0,0.5); position:relative;">
                             <div style="position:absolute; width:100%; height:100%; border-radius:50%; box-shadow:inset 0 0 20px rgba(0,0,0,0.2);"></div>
                             <span style="font-size:1.5rem; opacity:0.3; user-select:none;">High</span>
                        </div>
                        <div style="width:110px; height:60px; background:#5D4037; margin-top:-30px; z-index:-1; border-radius:0 0 20px 20px;"></div>
                    </div>
                </div>
            `;
            container.querySelectorAll('.bongo-drum').forEach(drum => {
                const play = () => {
                    window.audioEngine.playNote(parseFloat(drum.dataset.freq), 'bongos', 0.2);
                    drum.style.transform = 'scale(0.96)';
                    drum.style.filter = 'brightness(0.9)';
                    setTimeout(() => {
                        drum.style.transform = 'scale(1)';
                        drum.style.filter = 'brightness(1)';
                    }, 100);
                };
                drum.onmousedown = play;
                drum.onmouseenter = (e) => { if (e.buttons === 1) play(); };
            });
        }
    },

    ukulele: {
        name: "Ukulele",
        render: (container) => {
            // 4 strings
            const strings = [
                { note: 'A4', freq: 440.00 },
                { note: 'E4', freq: 329.63 },
                { note: 'C4', freq: 261.63 },
                { note: 'G4', freq: 392.00 }
            ];

            container.innerHTML = `
                <div class="ukulele-wrapper" style="display:flex; justify-content:center; height:100%; align-items:center;">
                    <div class="uke-body" style="width:220px; height:340px; background:radial-gradient(circle at center, #ffd700, #d2691e); border-radius:40% 40% 50% 50% / 35% 35% 50% 50%; border:6px solid #8B4513; position:relative; box-shadow:0 20px 50px rgba(0,0,0,0.5); display:flex; justify-content:center; padding-top:80px;">
                        
                        <!-- Sound Hole -->
                        <div style="width:80px; height:80px; background:#221; border-radius:50%; border:5px solid rgba(0,0,0,0.2); box-shadow:inset 0 0 20px #000; z-index:1;"></div>

                        <!-- Bridge -->
                        <div style="position:absolute; bottom:50px; width:100px; height:20px; background:#3e2723; border-radius:5px; z-index:2; box-shadow:0 5px 10px rgba(0,0,0,0.5);"></div>

                        <!-- Neck (Visual only, goes up) -->
                        <div style="position:absolute; top:-100px; width:40px; height:120px; background:#5D4037; z-index:0; border-radius:5px 5px 0 0;"></div>

                        <!-- Strings Overlay -->
                        <div class="uke-strings-container" style="position:absolute; top:-100px; bottom:60px; width:40px; display:flex; justify-content:space-between; z-index:5;">
                            ${strings.map((s, i) => `
                                <div class="uke-string" data-index="${i}" data-freq="${s.freq}" style="width:2px; background:rgba(255,255,255,0.8); height:100%; cursor:pointer; box-shadow:1px 0 2px rgba(0,0,0,0.3);"></div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                <div style="text-align:center; margin-top:-40px; color:var(--text-dim); position:relative; z-index:10;">Strum strings</div>
            `;

            container.querySelectorAll('.uke-string').forEach(s => {
                const play = () => {
                    window.audioEngine.playNote(parseFloat(s.dataset.freq), 'ukulele', 1.0);
                    s.style.transform = 'translateX(2px)';
                    s.style.background = '#fff';
                    s.style.boxShadow = '0 0 5px #fff';
                    setTimeout(() => {
                        s.style.transform = 'translateX(0)';
                        s.style.background = 'rgba(255,255,255,0.8)';
                        s.style.boxShadow = '1px 0 2px rgba(0,0,0,0.3)';
                    }, 100);
                };
                s.onmousedown = play;
                s.onmouseenter = (e) => { if (e.buttons === 1) play(); };
            });
        }
    }
};

window.Instruments = Instruments;
