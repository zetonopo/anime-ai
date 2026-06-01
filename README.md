# VRM Character Module for AI Voice Streaming

A lightweight VRM avatar system built with Three.js and `@pixiv/three-vrm`, designed for AI-powered voice streaming applications.

This module provides:

* VRM avatar loading and rendering
* Mixamo animation support
* Smooth animation transitions
* Real-time lip-sync
* Google Gemini Text-to-Speech integration
* Drag-and-drop model and animation loading
* Spring bone physics support
* Interactive camera controls

---

## Features

### 🎭 VRM Avatar System

* Load and render VRM 1.0 avatars
* VRM optimization utilities
* Expression management
* Spring bone simulation

### 🎬 Animation System

* Mixamo FBX animation support
* Automatic Mixamo → VRM retargeting
* Smooth crossfade transitions
* Animation sequence playback

### 🗣️ Text-to-Speech & Lip Sync

* Google Gemini TTS integration
* Multiple voice options
* Real-time mouth movement synchronization
* Audio-driven expression updates

### 🖱️ User-Friendly Controls

* Drag-and-drop VRM loading
* Drag-and-drop FBX animation loading
* Orbit camera controls
* Runtime animation testing

---

## Project Structure

```text
anime-ai/
├── humanoid-animations/
│   ├── main.js
│   ├── tts.js
│   ├── loadMixamoAnimation.js
│   ├── mixamoVRMRigMap.js
│   ├── test.html
│   ├── Breathing Idle.fbx
│   └── Writing.fbx
│
├── characters/
│   └── VRM1_Alicia_Solid.vrm
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## Quick Start

### Install Dependencies

```bash
npm install
```

### Run Demo

Open:

```text
humanoid-animations/test.html
```

The application will:

1. Load the default VRM character
2. Start the idle animation
3. Enable lip-sync functionality
4. Allow drag-and-drop animation testing

---

## Supported Formats

| Type      | Format        |
| --------- | ------------- |
| Avatar    | .vrm          |
| Animation | .fbx (Mixamo) |

---

## Text-to-Speech Example

```javascript
import { GeminiTTS, VoiceCharacter } from './humanoid-animations/tts.js';

const tts = new GeminiTTS(API_KEY);

const character = new VoiceCharacter(
  currentVrm,
  currentMixer,
  tts
);

await character.speak(
  "Hello! How can I help you today?",
  {
    voice: "Puck",
    speakingRate: 1.0,
  }
);
```

---

## Performance Optimizations

The module automatically applies:

* Vertex optimization
* Skeleton merging
* Morph target merging
* Frustum culling adjustments

using VRM utility functions from `@pixiv/three-vrm`.

---

## Browser Support

* Chrome 80+
* Firefox 75+
* Safari 13+
* Any browser supporting WebGL and ES Modules

---

## License

Part of the Anime AI project.
See the project license for details.
