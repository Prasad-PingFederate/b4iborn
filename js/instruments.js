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

                keyEl.addEventListener('mousedown', () => {
                    window.audioEngine.playNote(key.freq, 'piano');
                    keyEl.classList.add('active');
                });

                keyEl.addEventListener('mouseup', () => keyEl.classList.remove('active'));
                keyEl.addEventListener('mouseleave', () => keyEl.classList.remove('active'));

                keysContainer.appendChild(keyEl);
            });
        }
    },

    drums: {
        name: "Drum Pad",
        render: (container) => {
            const pads = [
                { name: 'Kick', freq: 60, icon: '🥁' },
                { name: 'Snare', freq: 150, icon: ' snare' },
                { name: 'Hi-Hat', freq: 1000, icon: '🎩' },
                { name: 'Clap', freq: 800, icon: '👏' }
            ];

            container.innerHTML = '<div class="drum-pads-container"></div>';
            const padsContainer = container.querySelector('.drum-pads-container');
            padsContainer.style.display = 'grid';
            padsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
            padsContainer.style.gap = '20px';

            pads.forEach(pad => {
                const padEl = document.createElement('div');
                padEl.className = 'drum-pad';
                padEl.innerHTML = `<span>${pad.icon}</span><p>${pad.name}</p>`;
                padEl.style.background = 'var(--bg-card)';
                padEl.style.border = '2px solid var(--glass-border)';
                padEl.style.borderRadius = '20px';
                padEl.style.padding = '40px';
                padEl.style.textAlign = 'center';
                padEl.style.cursor = 'pointer';
                padEl.style.transition = 'var(--transition)';

                padEl.addEventListener('mousedown', () => {
                    window.audioEngine.playNote(pad.freq, 'drums', 0.1);
                    padEl.style.borderColor = 'var(--accent)';
                    padEl.style.transform = 'scale(0.95)';
                });

                padEl.addEventListener('mouseup', () => {
                    padEl.style.borderColor = 'var(--glass-border)';
                    padEl.style.transform = 'scale(1)';
                });

                padsContainer.appendChild(padEl);
            });
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

                keyEl.addEventListener('mousedown', () => {
                    window.audioEngine.playNote(key.freq, 'keyboard', 0.8);
                    keyEl.classList.add('active');
                });

                keyEl.addEventListener('mouseup', () => keyEl.classList.remove('active'));
                keyEl.addEventListener('mouseleave', () => keyEl.classList.remove('active'));

                keysContainer.appendChild(keyEl);
            });
        }
    },

    guitar: {
        name: "Acoustic Guitar",
        render: (container) => {
            const strings = [
                { note: 'E2', freq: 82.41 },
                { note: 'A2', freq: 110.00 },
                { note: 'D3', freq: 146.83 },
                { note: 'G3', freq: 196.00 },
                { note: 'B3', freq: 246.94 },
                { note: 'E4', freq: 329.63 }
            ];

            container.innerHTML = `
                <div class="guitar-fretboard">
                    <div class="strings-container"></div>
                </div>
            `;
            const stringsContainer = container.querySelector('.strings-container');
            stringsContainer.style.display = 'flex';
            stringsContainer.style.flexDirection = 'column';
            stringsContainer.style.justifyContent = 'space-around';
            stringsContainer.style.height = '100%';
            stringsContainer.style.width = '100%';
            stringsContainer.style.padding = '40px 0';

            strings.forEach((string, index) => {
                const stringEl = document.createElement('div');
                stringEl.className = 'guitar-string';
                stringEl.style.height = `${2 + index}px`;
                stringEl.style.background = 'linear-gradient(to bottom, #ddd, #888, #ddd)';
                stringEl.style.width = '100%';
                stringEl.style.cursor = 'pointer';
                stringEl.style.transition = '0.1s';
                stringEl.style.boxShadow = '0 2px 5px rgba(0,0,0,0.5)';

                stringEl.addEventListener('mouseenter', (e) => {
                    if (e.buttons === 1 || e.type === 'mousedown') {
                        window.audioEngine.playNote(string.freq, 'guitar', 1.5);
                        stringEl.style.transform = 'translateY(2px)';
                        setTimeout(() => stringEl.style.transform = 'translateY(0)', 100);
                    }
                });

                stringEl.addEventListener('mousedown', () => {
                    window.audioEngine.playNote(string.freq, 'guitar', 1.5);
                });

                stringsContainer.appendChild(stringEl);
            });
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

            // Violin styling and motion logic
            const violinContainer = container.querySelector('.violin-container');
            violinContainer.style.position = 'relative';
            violinContainer.style.width = '100%';
            violinContainer.style.height = '100%';
            violinContainer.style.display = 'flex';
            violinContainer.style.justifyContent = 'center';
            violinContainer.style.alignItems = 'center';

            const stringsNodes = container.querySelectorAll('.violin-string');
            stringsNodes.forEach(s => {
                s.style.width = '2px';
                s.style.height = '80%';
                s.style.background = '#eee';
                s.style.margin = '0 20px';
                s.style.boxShadow = '0 0 10px rgba(255,255,255,0.2)';
                s.style.transition = '0.1s';

                s.addEventListener('mouseenter', () => {
                    window.audioEngine.playNote(parseFloat(s.dataset.freq), 'violin', 1.2);
                    s.style.background = 'var(--accent)';
                    s.style.boxShadow = '0 0 20px var(--accent)';
                    setTimeout(() => {
                        s.style.background = '#eee';
                        s.style.boxShadow = '0 0 10px rgba(255,255,255,0.2)';
                    }, 500);
                });
            });

            // Creative Bow Effect
            const body = container.querySelector('.violin-body');
            body.style.display = 'flex';
            body.style.background = '#321414';
            body.style.padding = '20px 40px';
            body.style.borderRadius = '50px';
            body.style.border = '2px solid #502828';

            const bow = container.querySelector('.violin-bow');
            bow.style.position = 'absolute';
            bow.style.width = '100%';
            bow.style.height = '4px';
            bow.style.background = 'rgba(255,255,255,0.8)';
            bow.style.boxShadow = '0 0 20px white';
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
    }
};

window.Instruments = Instruments;
