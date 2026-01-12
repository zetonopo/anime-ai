# VRM Character Module for AI Voice Streaming# VRM Character Module for AI Voice Streaming



This module provides a complete 3D VRM (Virtual Reality Model) character system optimized for AI voice streaming applications. It features lip-sync through procedural mouth movements, humanoid animations, and seamless integration with voice synthesis systems.This module provides a complete 3D VRM (Virtual Reality Model) character system optimized for AI voice streaming applications. It features lip-sync through procedural mouth movements, humanoid animations, and seamless integration with voice synthesis systems.



## Features## Features



- **VRM Model Loading**: Load and display VRM avatars using Three.js and @pixiv/three-vrm- **VRM Model Loading**: Load and display VRM avatars using Three.js and @pixiv/three-vrm

- **Procedural Lip-Sync**: Automatic mouth movements synchronized with voice playback- **Procedural Lip-Sync**: Automatic mouth movements synchronized with voice playback

- **Mixamo Animation Support**: Load and convert FBX animations from Mixamo to VRM-compatible format- **Mixamo Animation Support**: Load and convert FBX animations from Mixamo to VRM-compatible format

- **Smooth Animation Transitions**: Crossfade between animations for seamless playback- **Smooth Animation Transitions**: Crossfade between animations for seamless playback

- **Drag-and-Drop Interface**: Easy animation and model loading in browser- **Drag-and-Drop Interface**: Easy animation and model loading in browser

- **Expression Management**: Control facial expressions (mouth opening/closing)- **Expression Management**: Control facial expressions (mouth opening/closing)

- **Spring Bones**: Physics-based hair and cloth simulation- **Spring Bones**: Physics-based hair and cloth simulation

- **Orbit Controls**: Interactive camera controls for 3D navigation- **Orbit Controls**: Interactive camera controls for 3D navigation

- **Performance Optimized**: VRM utilities for efficient rendering- **Performance Optimized**: VRM utilities for efficient rendering



## Project Structure## Project Structure



``````

anime-ai/anime-ai/

├── humanoid-animations/           # Main character animation module├── humanoid-animations/           # Main character animation module

│   ├── main.js                   # Core animation and VRM loading logic│   ├── main.js                   # Core animation and VRM loading logic

│   ├── loadMixamoAnimation.js    # FBX to VRM animation converter│   ├── loadMixamoAnimation.js    # FBX to VRM animation converter

│   ├── mixamoVRMRigMap.js        # Bone mapping from Mixamo to VRM│   ├── mixamoVRMRigMap.js        # Bone mapping from Mixamo to VRM

│   ├── test.html                 # Demo page with drag-and-drop interface│   ├── test.html                 # Demo page with drag-and-drop interface

│   ├── Breathing Idle.fbx        # Default idle animation│   ├── Breathing Idle.fbx        # Default idle animation

│   └── Writing.fbx               # Writing gesture animation│   └── Writing.fbx               # Writing gesture animation

├── characters/                   # VRM model storage├── characters/                   # VRM model storage

│   └── VRM1_Alicia_Solid.vrm     # Default character model│   └── VRM1_Alicia_Solid.vrm     # Default character model

├── package.json                  # Dependencies and scripts├── package.json                  # Dependencies and scripts

├── tsconfig.json                 # TypeScript configuration├── tsconfig.json                 # TypeScript configuration

└── README.md                     # This documentation└── README.md                     # This documentation

``````



## Dependencies## Dependencies



- **Three.js**: `^0.181.0` - 3D rendering engine- **Three.js**: `^0.181.0` - 3D rendering engine

- **@pixiv/three-vrm**: `^3.4.4` - VRM model loader and utilities- **@pixiv/three-vrm**: `^3.4.4` - VRM model loader and utilities

- **@google/generative-ai**: `^0.24.1` - For AI integration (optional)- **@google/generative-ai**: `^0.24.1` - For AI integration (optional)



## Quick Start## Quick Start



### Basic Setup### Basic Setup



1. Include the module in your HTML:1. Include the module in your HTML:

```html```html

<!DOCTYPE html><!DOCTYPE html>

<html><html>

<head><head>

    <script type="importmap">    <script type="importmap">

    {    {

        "imports": {        "imports": {

            "three": "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js",            "three": "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js",

            "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/",            "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/",

            "@pixiv/three-vrm": "https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3.4.4/lib/three-vrm.module.js"            "@pixiv/three-vrm": "https://cdn.jsdelivr.net/npm/@pixiv/three-vrm@3.4.4/lib/three-vrm.module.js"

        }        }

    }    }

    </script>    </script>

</head></head>

<body><body>

    <script src="humanoid-animations/main.js" type="module"></script>    <script src="humanoid-animations/main.js" type="module"></script>

</body></body>

</html></html>

``````



2. The module will automatically:2. The module will automatically:

   - Load the default VRM model (`characters/VRM1_Alicia_Solid.vrm`)   - Load the default VRM model (`characters/VRM1_Alicia_Solid.vrm`)

   - Start the breathing idle animation   - Start the breathing idle animation

   - Enable lip-sync mouth movements   - Enable lip-sync mouth movements

   - Set up drag-and-drop for additional animations   - Set up drag-and-drop for additional animations



## Core Components## Core Components



### VRM Loading (`main.js`)### VRM Loading (`main.js`)



```javascript```javascript

// Automatic loading on startup// Automatic loading on startup

const defaultModelUrl = '../characters/VRM1_Alicia_Solid.vrm';const defaultModelUrl = '../characters/VRM1_Alicia_Solid.vrm';

loadVRM(defaultModelUrl); // Loads VRM model with optimizationsloadVRM(defaultModelUrl); // Loads VRM model with optimizations

``````



### Animation System### Animation System



#### Loading Single Animation#### Loading Single Animation

```javascript```javascript

// Load and play a Mixamo FBX animation// Load and play a Mixamo FBX animation

async function loadFBX(animationUrl) {async function loadFBX(animationUrl) {

    const clip = await loadMixamoAnimation(animationUrl, currentVrm);    const clip = await loadMixamoAnimation(animationUrl, currentVrm);

    const action = currentMixer.clipAction(clip);    const action = currentMixer.clipAction(clip);

    action.play();    action.play();

}}

``````



#### Loading Animation Sequence#### Loading Animation Sequence

```javascript```javascript

// Load multiple animations with crossfade transitions// Load multiple animations with crossfade transitions

async function loadSequence(urls) {async function loadSequence(urls) {

    // Loads animations and plays them in sequence with smooth transitions    // Loads animations and plays them in sequence with smooth transitions

}}

``````



### Lip-Sync Implementation### Lip-Sync Implementation



The module includes automatic lip-sync through oscillating mouth expressions:The module includes automatic lip-sync through oscillating mouth expressions:



```javascript```javascript

// In animation loop// In animation loop

const mouthValue = 0.3 + 0.3 * Math.sin(Math.PI * elapsedTime * 2);const mouthValue = 0.3 + 0.3 * Math.sin(Math.PI * elapsedTime * 2);

vrm.expressionManager.setValue('aa', mouthValue); // Controls mouth openingvrm.expressionManager.setValue('aa', mouthValue); // Controls mouth opening

``````



## Animation Files## Text-to-Speech Integration



Current animations included:The module includes Google Gemini API integration for speech generation with automatic lip-sync.

- **Breathing Idle.fbx**: Natural breathing animation for idle state

- **Writing.fbx**: Writing gesture with arm movements### Setup API Key



### Adding New Animations1. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

2. In the demo, click "Set API Key" in the GUI controls

1. Download FBX files from [Mixamo](https://www.mixamo.com/)3. Enter your API key (stored locally in browser)

2. Drag and drop into the browser when `test.html` is running

3. Or programmatically load using `loadFBX()` function### TTS Features



## API Reference- **Multiple Voices**: Puck, Charon, Kore, Fenrir, Aoede

- **Voice Parameters**: Speed, pitch, volume control

### Main Functions- **Real-time Lip-sync**: Mouth movements synchronized with speech

- **Audio Analysis**: Automatic mouth expression based on audio levels

#### `loadVRM(modelUrl)`

Loads a VRM model and sets up the animation mixer.### Using TTS Programmatically

- **Parameters**: `modelUrl` (string) - Path to VRM file

- **Effects**: Initializes VRM, creates AnimationMixer, loads default animation```javascript

import { GeminiTTS, VoiceCharacter } from './humanoid-animations/tts.js';

#### `loadFBX(animationUrl)`

Loads and plays a single FBX animation.// Initialize TTS

- **Parameters**: `animationUrl` (string) - Path to FBX fileconst tts = new GeminiTTS('your-gemini-api-key');

- **Effects**: Converts Mixamo animation to VRM format, plays with crossfade

// Create voice character (combines VRM + TTS)

#### `loadSequence(urls)`const voiceCharacter = new VoiceCharacter(vrm, mixer, tts);

Loads multiple animations and plays them in sequence.

- **Parameters**: `urls` (array) - Array of FBX file URLs// Speak with lip-sync

- **Effects**: Creates smooth transitions between animationsawait voiceCharacter.speak('Hello! How can I help you today?', {

    voice: 'Puck',

### VRM Object Properties    speakingRate: 1.0,

    pitch: 0.0

- `currentVrm`: Active VRM instance});

- `currentMixer`: Three.js AnimationMixer for the VRM

- `currentAction`: Currently playing animation action// Stop speaking

voiceCharacter.stop();

### Expression Controls```



```javascript### TTS API Reference

// Mouth expressions

vrm.expressionManager.setValue('aa', value); // 0-1, controls mouth opening#### `GeminiTTS` Class



// Other available expressions (if defined in VRM):- `generateSpeech(text, options)`: Generate audio from text

// 'ih', 'ou', 'ee', 'oh', 'blink', etc.- `playAudio(audioBuffer)`: Play generated audio with lip-sync

```- `speak(text, options)`: Generate and play speech

- `stop()`: Stop current speech

## Integration with AI Voice Streaming- `setOnAudioData(callback)`: Set lip-sync callback



### Basic Voice Synchronization#### `VoiceCharacter` Class



```javascript- `speak(text, options)`: Speak with automatic lip-sync

class VoiceCharacter {- `stop()`: Stop speaking

    constructor(vrm, mixer) {- `isSpeaking()`: Check if currently speaking

        this.vrm = vrm;- `updateMouth(volumeLevel)`: Update mouth expression

        this.mixer = mixer;

        this.isTalking = false;### Voice Options

    }

```javascript

    startTalking() {const options = {

        this.isTalking = true;    voice: 'Puck',        // Puck, Charon, Kore, Fenrir, Aoede

        // Switch to talking animation if available    language: 'en-US',    // Language code

        this.loadAnimation('talking.fbx');    speakingRate: 1.0,    // 0.5 - 2.0 (speed)

    }    pitch: 0.0,          // -10.0 - 10.0

    volumeGainDb: 0.0     // Volume adjustment

    stopTalking() {};

        this.isTalking = false;```

        // Return to idle

        this.loadAnimation('Breathing Idle.fbx');```

    }

## Animation Files

    updateMouth(audioLevel) {

        // Map audio level to mouth expressionCurrent animations included:

        const mouthValue = Math.min(audioLevel * 2, 1);- **Breathing Idle.fbx**: Natural breathing animation for idle state

        this.vrm.expressionManager.setValue('aa', mouthValue);- **Writing.fbx**: Writing gesture with arm movements

    }

}### Adding New Animations

```

1. Download FBX files from [Mixamo](https://www.mixamo.com/)

### Advanced Audio Analysis2. Drag and drop into the browser when `test.html` is running

3. Or programmatically load using `loadFBX()` function

For more sophisticated lip-sync, analyze audio frequency:

## API Reference

```javascript

// Using Web Audio API### Main Functions

const audioContext = new AudioContext();

const analyser = audioContext.createAnalyser();#### `loadVRM(modelUrl)`

analyser.fftSize = 256;Loads a VRM model and sets up the animation mixer.

- **Parameters**: `modelUrl` (string) - Path to VRM file

function updateLipSync() {- **Effects**: Initializes VRM, creates AnimationMixer, loads default animation

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    analyser.getByteFrequencyData(dataArray);#### `loadFBX(animationUrl)`

Loads and plays a single FBX animation.

    // Analyze frequency for phonemes- **Parameters**: `animationUrl` (string) - Path to FBX file

    const lowFreq = dataArray.slice(0, 10).reduce((a, b) => a + b) / 10;- **Effects**: Converts Mixamo animation to VRM format, plays with crossfade

    const midFreq = dataArray.slice(10, 20).reduce((a, b) => a + b) / 10;

#### `loadSequence(urls)`

    // Map to expressionsLoads multiple animations and plays them in sequence.

    if (lowFreq > 100) {- **Parameters**: `urls` (array) - Array of FBX file URLs

        vrm.expressionManager.setValue('aa', 0.8); // Open mouth- **Effects**: Creates smooth transitions between animations

    } else if (midFreq > 80) {

        vrm.expressionManager.setValue('ih', 0.6); // Narrow mouth### VRM Object Properties

    }

}- `currentVrm`: Active VRM instance

```- `currentMixer`: Three.js AnimationMixer for the VRM

- `currentAction`: Currently playing animation action

## Demo and Testing

### Expression Controls

### Running the Demo

```javascript

1. Open `humanoid-animations/test.html` in a modern browser// Mouth expressions

2. The character will load automatically with breathing animationvrm.expressionManager.setValue('aa', value); // 0-1, controls mouth opening

3. Drag and drop additional FBX files to test animations

4. Drag and drop VRM files to change characters// Other available expressions (if defined in VRM):

// 'ih', 'ou', 'ee', 'oh', 'blink', etc.

### Browser Compatibility```



- Chrome 80+## Integration with AI Voice Streaming

- Firefox 75+

- Safari 13+### Basic Voice Synchronization

- Any browser supporting WebGL and ES6 modules

```javascript

## Performance Considerationsclass VoiceCharacter {

    constructor(vrm, mixer) {

- VRM models are optimized using `VRMUtils.removeUnnecessaryVertices()`        this.vrm = vrm;

- Skeleton combining with `VRMUtils.combineSkeletons()`        this.mixer = mixer;

- Morph target combining with `VRMUtils.combineMorphs()`        this.isTalking = false;

- Frustum culling disabled for character visibility    }



## Customization    startTalking() {

        this.isTalking = true;

### Adding New Expressions        // Switch to talking animation if available

        this.loadAnimation('talking.fbx');

```javascript    }

// Check available expressions in your VRM

console.log(vrm.expressionManager.expressions);    stopTalking() {

        this.isTalking = false;

// Set custom expression values        // Return to idle

vrm.expressionManager.setValue('customExpression', 0.8);        this.loadAnimation('Breathing Idle.fbx');

```    }



### Modifying Animation Speed    // Lip-sync is handled automatically in the animation loop

}

```javascript```

// Using the GUI control

params.timeScale = 1.5; // 1.5x speed### Advanced Audio Analysis



// Or programmaticallyFor more sophisticated lip-sync, integrate with Web Audio API:

currentMixer.timeScale = 1.5;

``````javascript

// Analyze audio frequency for phoneme detection

### Camera Controlsconst audioContext = new AudioContext();

const analyser = audioContext.createAnalyser();

The module includes OrbitControls for camera manipulation:

- **Left click + drag**: Rotate camerafunction updateLipSync() {

- **Right click + drag**: Pan camera    const dataArray = new Uint8Array(analyser.frequencyBinCount);

- **Scroll**: Zoom in/out    analyser.getByteFrequencyData(dataArray);



## File Formats    // Map frequency to mouth expression

    const lowFreq = dataArray.slice(0, 10).reduce((a, b) => a + b) / 10;

### Supported Inputs    const mouthValue = Math.min(lowFreq / 255, 1);

- **VRM**: `.vrm` files (Virtual Reality Model format)    vrm.expressionManager.setValue('aa', mouthValue);

- **FBX**: `.fbx` files from Mixamo (converted to VRM animations)}

```

### Animation Conversion

The `loadMixamoAnimation.js` handles:## Demo and Testing

- Bone name mapping from Mixamo to VRM standard

- Position and rotation adjustments### Running the Demo

- Scale normalization based on hip height

1. Open `humanoid-animations/test.html` in a modern browser

## Troubleshooting2. The character will load automatically with breathing animation

3. Drag and drop additional FBX files to test animations

### Common Issues4. Drag and drop VRM files to change characters



1. **Animations not loading**: Check FBX files are from Mixamo and properly exported### Browser Compatibility

2. **Lip-sync not working**: Ensure VRM has 'aa' expression defined

3. **Performance issues**: Reduce model complexity or disable spring bones- Chrome 80+

4. **Crossfade not smooth**: Adjust crossfade duration in `loadSequence()`- Firefox 75+

- Safari 13+

### Debug Information- Any browser supporting WebGL and ES6 modules



Enable console logging to see loading progress and errors:## Performance Considerations

```javascript

// Already included in loadVRM function- VRM models are optimized using `VRMUtils.removeUnnecessaryVertices()`

console.log('Loading model...', percent + '%');- Skeleton combining with `VRMUtils.combineSkeletons()`

console.log(vrm); // Full VRM object inspection- Morph target combining with `VRMUtils.combineMorphs()`

```- Frustum culling disabled for character visibility



## Contributing## Customization



1. Test changes in browser using `test.html`### Adding New Expressions

2. Ensure animations load correctly

3. Add new animation files to `humanoid-animations/` directory```javascript

4. Update this README for new features// Check available expressions in your VRM

5. Follow existing code style and structureconsole.log(vrm.expressionManager.expressions);



## License// Set custom expression values

vrm.expressionManager.setValue('customExpression', 0.8);

This character module is part of the anime-ai project. See project license for details.```

### Modifying Animation Speed

```javascript
// Using the GUI control
params.timeScale = 1.5; // 1.5x speed

// Or programmatically
currentMixer.timeScale = 1.5;
```

### Camera Controls

The module includes OrbitControls for camera manipulation:
- **Left click + drag**: Rotate camera
- **Right click + drag**: Pan camera
- **Scroll**: Zoom in/out

## File Formats

### Supported Inputs
- **VRM**: `.vrm` files (Virtual Reality Model format)
- **FBX**: `.fbx` files from Mixamo (converted to VRM animations)

### Animation Conversion
The `loadMixamoAnimation.js` handles:
- Bone name mapping from Mixamo to VRM standard
- Position and rotation adjustments
- Scale normalization based on hip height

## Troubleshooting

### Common Issues

1. **Animations not loading**: Check FBX files are from Mixamo and properly exported
2. **Lip-sync not working**: Ensure VRM has 'aa' expression defined
3. **Performance issues**: Reduce model complexity or disable spring bones
4. **Crossfade not smooth**: Adjust crossfade duration in `loadSequence()`

### Debug Information

Enable console logging to see loading progress and errors:
```javascript
// Already included in loadVRM function
console.log('Loading model...', percent + '%');
console.log(vrm); // Full VRM object inspection
```

## Contributing

1. Test changes in browser using `test.html`
2. Ensure animations load correctly
3. Add new animation files to `humanoid-animations/` directory
4. Update this README for new features
5. Follow existing code style and structure

## License

This character module is part of the anime-ai project. See project license for details.