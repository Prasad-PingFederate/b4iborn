# PlayTune Studio

PlayTune Studio is a professional-grade virtual musical instrument application that runs directly in your browser. It offers a suite of high-fidelity instruments including Piano, Guitar, Drums, Violin, Pan Flute, and more, allowing users to create, record, and export music.

## Features

-   **Virtual Instruments**: Play Piano, Guitar, Drums, Violin, Pan Flute, Flute, Clarinet, Recorder, Xylophone, Glockenspiel, Bongos, and Ukulele.
-   **Studio Recorder**: Record your sessions, visualize the audio, and save/export your tracks.
-   **Audio Engine**: Low-latency synthesized sound engine with multiple voices and effects.
-   **Responsive Design**: Works on desktop and mobile devices with touch support.
-   **Interactive UI**: Visual feedback, hover-to-play options, and keyboard shortcuts.

## Getting Started

### Prerequisites

-   A modern web browser (Chrome, Firefox, Edge, Safari).
-   No installation required for the web version.

### Running Locally

1.  Clone the repository or download the source code.
2.  Open `index.html` in your browser.
    *   *Note: For the best experience with audio contexts and icons, use a local development server.*
    *   Example with Python: `python -m http.server 8000` inside the project folder.
    *   Example with VS Code: Use the "Live Server" extension.

## Technologies Used

-   **HTML5 & CSS3**: For structure and styling (Dark/Light themes).
-   **Vanilla JavaScript**: Core application logic and DOM manipulation.
-   **Web Audio API**: For synthesizing sounds and handling audio playback.

## Instruments Guide

### Flute
-   **Visual**: Realistic Concert Flute with key overlays.
-   **Controls**:
    -   **Mouse/Touch**: Click or hover over the yellow key indicators.
    -   **Keyboard**: Keys `1` through `8` map to notes C through C (Octave).

### Pan Flute
-   **Controls**: Hover to play or use mapped keyboard keys.

### Guitar
-   **Controls**: Select chords and strum the strings or click the strum area.

## Future Plans

-   Add more instruments (Trumpet, Saxophone).
-   Implement MIDI keyboard support.
-   Multi-track recording.

## License

This project is open-source.
