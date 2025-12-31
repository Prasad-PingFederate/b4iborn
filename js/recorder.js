class Recorder {
    constructor(audioEngine) {
        this.engine = audioEngine;
        this.mediaRecorder = null;
        this.chunks = [];
        this.isRecording = false;
        this.startTime = null;
        this.timerInterval = null;

        // Dest node for recording
        this.dest = this.engine.ctx.createMediaStreamDestination();
        this.engine.masterVolume.connect(this.dest);
    }

    start() {
        if (this.isRecording) return;

        this.chunks = [];
        this.mediaRecorder = new MediaRecorder(this.dest.stream);

        this.mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) this.chunks.push(e.data);
        };

        this.mediaRecorder.onstop = () => {
            const blob = new Blob(this.chunks, { type: 'audio/wav' });
            this.saveRecording(blob);
        };

        this.mediaRecorder.start();
        this.isRecording = true;
        this.startTime = Date.now();
        this.updateTimer();
        this.startVisualizer();

        console.log("Recording started...");
    }

    stop() {
        if (!this.isRecording) return;
        this.mediaRecorder.stop();
        this.isRecording = false;
        clearInterval(this.timerInterval);
    }

    updateTimer() {
        const timerEl = document.querySelector('.recording-timer');
        this.timerInterval = setInterval(() => {
            const delta = Date.now() - this.startTime;
            const seconds = Math.floor((delta / 1000) % 60);
            const minutes = Math.floor((delta / (1000 * 60)) % 60);
            timerEl.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }

    saveRecording(blob) {
        const url = URL.createObjectURL(blob);
        const recording = {
            id: Date.now(),
            url: url,
            name: `Session_${new Date().toLocaleTimeString()}`,
            date: new Date().toLocaleDateString()
        };

        // Save to local storage for persistence
        const recordings = JSON.parse(localStorage.getItem('recordings') || '[]');
        recordings.push(recording);
        localStorage.setItem('recordings', JSON.stringify(recordings));

        // Trigger UI update
        window.dispatchEvent(new CustomEvent('recordingSaved'));
    }

    startVisualizer() {
        const canvas = document.getElementById('recording-visualizer');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const analyzer = this.engine.ctx.createAnalyser();
        this.engine.masterVolume.connect(analyzer);
        analyzer.fftSize = 64;
        const bufferLength = analyzer.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            if (!this.isRecording) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                return;
            }
            requestAnimationFrame(draw);
            analyzer.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const barWidth = (canvas.width / bufferLength) * 2;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = (dataArray[i] / 255) * canvas.height;

                // Creative gradient
                const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradient.addColorStop(0, '#00d2ff');
                gradient.addColorStop(1, '#9d50bb');

                ctx.fillStyle = gradient;
                ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
                x += barWidth;
            }
        };
        draw();
    }
}

window.Recorder = Recorder;
