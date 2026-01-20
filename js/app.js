document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.nav-links a, .scroll-link');
    const instrumentCards = document.querySelectorAll('.instrument-card');
    const studioWorkspace = document.getElementById('studio-workspace');
    const exitStudio = document.getElementById('exit-studio');
    const recordBtn = document.getElementById('record-btn');
    const stopRecordBtn = document.getElementById('stop-record');
    const recordingTray = document.querySelector('.compact-recording-tray');
    const bpmInput = document.getElementById('bpm-input');

    let recorder = null;
    let metronomeInterval = null;
    let isMetronomeOn = false;

    // Metronome Logic
    function playMetronomeTick() {
        if (!isMetronomeOn) return;
        window.audioEngine.playNote(1000, 'drums', 0.05); // High tick
    }

    bpmInput.addEventListener('change', () => {
        if (isMetronomeOn) {
            stopMetronome();
            startMetronome();
        }
    });

    function startMetronome() {
        const bpm = parseInt(bpmInput.value) || 120;
        const interval = (60 / bpm) * 1000;
        isMetronomeOn = true;
        metronomeInterval = setInterval(playMetronomeTick, interval);
    }

    function stopMetronome() {
        isMetronomeOn = false;
        clearInterval(metronomeInterval);
    }

    // SPA Navigation
    function showSection(sectionId) {
        sections.forEach(sec => {
            sec.classList.remove('active');
            if (sec.id === sectionId) sec.classList.add('active');
        });

        // Update Nav
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) link.classList.add('active');
        });

        window.scrollTo(0, 0);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.getAttribute('href').substring(1);
            showSection(id);
        });
    });

    // Instrument Selection
    instrumentCards.forEach(card => {
        card.addEventListener('click', () => {
            const instrumentId = card.dataset.instrument;
            loadStudio(instrumentId);
        });
    });

    function loadStudio(instrumentId) {
        const instrument = window.Instruments[instrumentId];
        if (!instrument) return;

        document.getElementById('active-instrument-name').innerText = instrument.name;
        const container = document.querySelector('.instrument-canvas-container');

        // Initialize Audio if not done
        window.audioEngine.init();

        // Render Instrument
        instrument.render(container);

        showSection('studio-workspace');

        // Initialize Recorder
        if (!recorder) {
            recorder = new window.Recorder(window.audioEngine);
        }
    }

    exitStudio.addEventListener('click', () => {
        showSection('instruments');
    });

    // Recording Controls
    recordBtn.addEventListener('click', () => {
        if (!recorder) return;
        recorder.start();
        recordBtn.classList.add('hide');
        recordingTray.classList.remove('hide');
    });

    stopRecordBtn.addEventListener('click', () => {
        if (!recorder) return;
        recorder.stop();
        recordBtn.classList.remove('hide');
        recordingTray.classList.add('hide');
        showSection('my-recordings');
        renderRecordings();
    });

    // Render Recordings List
    function renderRecordings() {
        const list = document.getElementById('recordings-list');
        const recordings = JSON.parse(localStorage.getItem('recordings') || '[]');

        if (recordings.length === 0) {
            list.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-music"></i>
                    <p>No recordings yet. Start playing to create some magic!</p>
                    <a href="#instruments" class="btn btn-primary" onclick="document.querySelector('[href=\'#instruments\']').click()">Load an Instrument</a>
                </div>
            `;
            return;
        }

        list.innerHTML = recordings.map(rec => `
            <div class="recording-item">
                <div class="rec-info">
                    <h4>${rec.name}</h4>
                    <span>${rec.date}</span>
                </div>
                <div class="rec-actions">
                    <audio src="${rec.url}" controls></audio>
                    <a href="${rec.url}" download="${rec.name}.wav" class="btn btn-sm btn-primary">Download</a>
                    <button class="btn btn-sm btn-danger" onclick="deleteRecording(${rec.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    window.deleteRecording = (id) => {
        let recordings = JSON.parse(localStorage.getItem('recordings') || '[]');
        recordings = recordings.filter(r => r.id !== id);
        localStorage.setItem('recordings', JSON.stringify(recordings));
        renderRecordings();
    };

    // Initial Render
    renderRecordings();

    // Environment Detection for Dev Mode
    if (window.location.hostname.includes('vercel.app')) {
        const banner = document.createElement('div');
        banner.className = 'dev-banner';
        banner.innerHTML = '<i class="fas fa-tools"></i> Dev Mode';
        document.body.appendChild(banner);
    }
});
