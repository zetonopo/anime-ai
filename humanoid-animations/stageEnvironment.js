/**
 * Stage Environment - Tạo không gian sân khấu cho Virtual Idol
 * Bao gồm: Platform, DJ Booth, Lighting, Background
 */

import * as THREE from 'three';

export class StageEnvironment {
    constructor(scene) {
        this.scene = scene;
        this.stageObjects = [];
        this.lights = [];
    }

    /**
     * Setup sân khấu đầy đủ
     */
    setup(options = {}) {
        const config = {
            platform: true,
            djBooth: true,
            lighting: 'concert', // 'concert', 'studio', 'simple'
            background: 'gradient', // 'gradient', 'space', 'stage'
            decorations: true,
            ...options
        };

        // Clear existing stage
        this.clear();

        // Build stage elements
        if (config.platform) this.createPlatform();
        if (config.djBooth) this.createDJBooth();
        this.setupLighting(config.lighting);
        this.setupBackground(config.background);
        if (config.decorations) this.createDecorations();

        console.log('🎪 Stage environment created:', config);
    }

    /**
     * Tạo platform sân khấu
     */
    createPlatform() {
        const platformGroup = new THREE.Group();

        // Base platform (bottom layer)
        const baseGeometry = new THREE.BoxGeometry(7, 0.15, 5);
        const baseMaterial = new THREE.MeshStandardMaterial({
            color: 0x0a0a1a,
            metalness: 0.9,
            roughness: 0.1
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = -0.2;
        base.receiveShadow = true;
        platformGroup.add(base);

        // Main platform (glossy surface)
        const mainGeometry = new THREE.BoxGeometry(6.5, 0.1, 4.5);
        const mainMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a0a3e,
            metalness: 0.7,
            roughness: 0.15,
            envMapIntensity: 1.5
        });
        const main = new THREE.Mesh(mainGeometry, mainMaterial);
        main.position.y = -0.05;
        main.receiveShadow = true;
        platformGroup.add(main);

        // Top layer with pattern
        const topGeometry = new THREE.BoxGeometry(6, 0.02, 4);
        const topMaterial = new THREE.MeshStandardMaterial({
            color: 0x2d1b4e,
            metalness: 0.8,
            roughness: 0.2,
            transparent: true,
            opacity: 0.9
        });
        const top = new THREE.Mesh(topGeometry, topMaterial);
        top.position.y = 0.01;
        platformGroup.add(top);

        // Holographic grid lines
        const gridGeometry = new THREE.PlaneGeometry(6, 4);
        const gridMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.15,
            wireframe: true,
            side: THREE.DoubleSide
        });
        const grid = new THREE.Mesh(gridGeometry, gridMaterial);
        grid.rotation.x = -Math.PI / 2;
        grid.position.y = 0.02;
        platformGroup.add(grid);

        // Neon edge strips (4 sides)
        const edgeHeight = 0.08;
        const edgeWidth = 0.03;
        
        // Front edge
        const frontEdge = this.createNeonStrip(6, edgeHeight, edgeWidth, 0xff00ff);
        frontEdge.position.set(0, 0.04, 2);
        platformGroup.add(frontEdge);
        
        // Back edge
        const backEdge = this.createNeonStrip(6, edgeHeight, edgeWidth, 0x00ffff);
        backEdge.position.set(0, 0.04, -2);
        platformGroup.add(backEdge);
        
        // Left edge
        const leftEdge = this.createNeonStrip(4, edgeHeight, edgeWidth, 0xff00ff);
        leftEdge.rotation.y = Math.PI / 2;
        leftEdge.position.set(-3, 0.04, 0);
        platformGroup.add(leftEdge);
        
        // Right edge
        const rightEdge = this.createNeonStrip(4, edgeHeight, edgeWidth, 0x00ffff);
        rightEdge.rotation.y = Math.PI / 2;
        rightEdge.position.set(3, 0.04, 0);
        platformGroup.add(rightEdge);

        // Corner accents
        const corners = [
            [-2.85, 0, 1.85],
            [2.85, 0, 1.85],
            [-2.85, 0, -1.85],
            [2.85, 0, -1.85]
        ];
        
        corners.forEach(pos => {
            const cornerLight = new THREE.Mesh(
                new THREE.CylinderGeometry(0.05, 0.08, 0.3),
                new THREE.MeshStandardMaterial({
                    color: 0xffff00,
                    emissive: 0xffff00,
                    emissiveIntensity: 3
                })
            );
            cornerLight.position.set(...pos);
            platformGroup.add(cornerLight);
        });

        this.scene.add(platformGroup);
        this.stageObjects.push(platformGroup);
    }

    /**
     * Create neon light strip
     */
    createNeonStrip(width, height, depth, color) {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshStandardMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: 2.5,
            transparent: true,
            opacity: 0.9
        });
        return new THREE.Mesh(geometry, material);
    }

    /**
     * Tạo DJ Booth
     */
    createDJBooth() {
        const boothGroup = new THREE.Group();
        boothGroup.position.set(0, 0, -1.3);

        // Booth base/frame
        const frameGeometry = new THREE.BoxGeometry(2.5, 0.1, 1.2);
        const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0x0a0a1a,
            metalness: 0.95,
            roughness: 0.05
        });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.position.y = 0.65;
        boothGroup.add(frame);

        // DJ Table/Desk (main surface)
        const tableGeometry = new THREE.BoxGeometry(2.3, 0.08, 1);
        const tableMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a0a3e,
            metalness: 0.9,
            roughness: 0.15,
            envMapIntensity: 1.5
        });
        const table = new THREE.Mesh(tableGeometry, tableMaterial);
        table.position.y = 0.74;
        table.castShadow = true;
        boothGroup.add(table);

        // Modern legs (angled supports)
        const legGeometry = new THREE.BoxGeometry(0.06, 0.7, 0.06);
        const legMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a2e,
            metalness: 0.9,
            roughness: 0.1
        });
        
        const legPositions = [
            [-1.0, 0.35, -0.5],
            [-1.0, 0.35, 0.5],
            [1.0, 0.35, -0.5],
            [1.0, 0.35, 0.5]
        ];
        
        legPositions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(...pos);
            boothGroup.add(leg);
        });

        // DJ Equipment - Turntables (more detailed)
        const turntableBaseGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.03);
        const turntableBaseMat = new THREE.MeshStandardMaterial({
            color: 0x2a2a2a,
            metalness: 0.8,
            roughness: 0.2
        });

        // Left turntable
        const leftBase = new THREE.Mesh(turntableBaseGeo, turntableBaseMat);
        leftBase.position.set(-0.6, 0.80, 0);
        boothGroup.add(leftBase);
        
        const leftPlatter = new THREE.Mesh(
            new THREE.CylinderGeometry(0.15, 0.15, 0.01),
            new THREE.MeshStandardMaterial({
                color: 0x000000,
                metalness: 1,
                roughness: 0.1
            })
        );
        leftPlatter.position.set(-0.6, 0.82, 0);
        boothGroup.add(leftPlatter);

        // Right turntable
        const rightBase = new THREE.Mesh(turntableBaseGeo, turntableBaseMat);
        rightBase.position.set(0.6, 0.80, 0);
        boothGroup.add(rightBase);
        
        const rightPlatter = new THREE.Mesh(
            new THREE.CylinderGeometry(0.15, 0.15, 0.01),
            new THREE.MeshStandardMaterial({
                color: 0x000000,
                metalness: 1,
                roughness: 0.1
            })
        );
        rightPlatter.position.set(0.6, 0.82, 0);
        boothGroup.add(rightPlatter);

        // Mixer (center) - more detailed
        const mixerBase = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.04, 0.35),
            new THREE.MeshStandardMaterial({
                color: 0x1a1a1a,
                metalness: 0.9,
                roughness: 0.2
            })
        );
        mixerBase.position.set(0, 0.80, 0.1);
        boothGroup.add(mixerBase);

        // Mixer controls (knobs)
        for (let i = -2; i <= 2; i++) {
            const knob = new THREE.Mesh(
                new THREE.CylinderGeometry(0.015, 0.015, 0.02),
                new THREE.MeshStandardMaterial({
                    color: i === 0 ? 0xff0088 : 0x333333,
                    metalness: 0.8
                })
            );
            knob.position.set(i * 0.08, 0.83, 0.1);
            boothGroup.add(knob);
        }

        // LED strips (multiple colors)
        const ledColors = [
            { color: 0xff00ff, pos: [0, 0.69, 0.6] },
            { color: 0x00ffff, pos: [0, 0.69, -0.6] }
        ];
        
        ledColors.forEach(({ color, pos }) => {
            const ledStrip = new THREE.Mesh(
                new THREE.BoxGeometry(2.3, 0.02, 0.03),
                new THREE.MeshStandardMaterial({
                    color: color,
                    emissive: color,
                    emissiveIntensity: 3
                })
            );
            ledStrip.position.set(...pos);
            boothGroup.add(ledStrip);
        });

        // Side panels with glow
        [-1.15, 1.15].forEach(x => {
            const panel = new THREE.Mesh(
                new THREE.BoxGeometry(0.03, 0.4, 1),
                new THREE.MeshStandardMaterial({
                    color: 0x1a0a3e,
                    emissive: 0x4400ff,
                    emissiveIntensity: 0.5,
                    transparent: true,
                    opacity: 0.7
                })
            );
            panel.position.set(x, 0.5, 0);
            boothGroup.add(panel);
        });

        this.scene.add(boothGroup);
        this.stageObjects.push(boothGroup);
    }

    /**
     * Setup ánh sáng sân khấu
     */
    setupLighting(mode = 'concert') {
        // Clear existing lights (keep hemisphere and directional)
        this.lights.forEach(light => this.scene.remove(light));
        this.lights = [];

        switch (mode) {
            case 'concert':
                this.createConcertLighting();
                break;
            case 'studio':
                this.createStudioLighting();
                break;
            default:
                this.createSimpleLighting();
        }
    }

    createConcertLighting() {
        // Spotlight chính (từ trên xuống)
        const mainSpot = new THREE.SpotLight(0xffffff, 3);
        mainSpot.position.set(0, 5, 2);
        mainSpot.angle = Math.PI / 6;
        mainSpot.penumbra = 0.5;
        mainSpot.castShadow = true;
        this.scene.add(mainSpot);
        this.lights.push(mainSpot);

        // Colored stage lights
        const colors = [0xff0080, 0x00d4ff, 0xffff00, 0x00ff88];
        const positions = [
            [-3, 3, 0],
            [3, 3, 0],
            [-2, 2, -2],
            [2, 2, -2]
        ];

        colors.forEach((color, i) => {
            const spotLight = new THREE.SpotLight(color, 2);
            spotLight.position.set(...positions[i]);
            spotLight.angle = Math.PI / 8;
            spotLight.penumbra = 0.8;
            spotLight.decay = 2;
            spotLight.distance = 10;
            this.scene.add(spotLight);
            this.lights.push(spotLight);
        });

        // Rim light (backlight)
        const rimLight = new THREE.DirectionalLight(0x8800ff, 1.5);
        rimLight.position.set(0, 2, -3);
        this.scene.add(rimLight);
        this.lights.push(rimLight);
    }

    createStudioLighting() {
        // Key light
        const keyLight = new THREE.DirectionalLight(0xffffff, 2);
        keyLight.position.set(2, 3, 2);
        keyLight.castShadow = true;
        this.scene.add(keyLight);
        this.lights.push(keyLight);

        // Fill light
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
        fillLight.position.set(-2, 2, 2);
        this.scene.add(fillLight);
        this.lights.push(fillLight);

        // Back light
        const backLight = new THREE.DirectionalLight(0xaaccff, 1.2);
        backLight.position.set(0, 2, -2);
        this.scene.add(backLight);
        this.lights.push(backLight);
    }

    createSimpleLighting() {
        const simpleLight = new THREE.DirectionalLight(0xffffff, 1.5);
        simpleLight.position.set(1, 3, 2);
        simpleLight.castShadow = true;
        this.scene.add(simpleLight);
        this.lights.push(simpleLight);
    }

    /**
     * Setup background
     */
    setupBackground(type = 'gradient') {
        switch (type) {
            case 'gradient':
                this.createGradientBackground();
                break;
            case 'space':
                this.createSpaceBackground();
                break;
            case 'stage':
                this.createStageBackground();
                break;
        }
    }

    createGradientBackground() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        const gradient = ctx.createLinearGradient(0, 0, 0, 512);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(0.5, '#16213e');
        gradient.addColorStop(1, '#0f3460');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);
        
        const texture = new THREE.CanvasTexture(canvas);
        this.scene.background = texture;
    }

    createSpaceBackground() {
        // Starfield background
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        
        // Dark space
        ctx.fillStyle = '#000510';
        ctx.fillRect(0, 0, 1024, 1024);
        
        // Random stars
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 500; i++) {
            const x = Math.random() * 1024;
            const y = Math.random() * 1024;
            const size = Math.random() * 2;
            ctx.fillRect(x, y, size, size);
        }
        
        const texture = new THREE.CanvasTexture(canvas);
        this.scene.background = texture;
    }

    createStageBackground() {
        // Curtain-like backdrop
        const backdropGeometry = new THREE.PlaneGeometry(10, 6);
        const backdropMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a0033,
            side: THREE.DoubleSide
        });
        const backdrop = new THREE.Mesh(backdropGeometry, backdropMaterial);
        backdrop.position.set(0, 2, -3);
        this.scene.add(backdrop);
        this.stageObjects.push(backdrop);
    }

    /**
     * Tạo decorations (screens, particles, etc.)
     */
    createDecorations() {
        // Left screen setup
        const leftScreenGroup = this.createScreenPanel();
        leftScreenGroup.position.set(-3.5, 1.8, -2);
        leftScreenGroup.rotation.y = Math.PI / 8;
        this.scene.add(leftScreenGroup);
        this.stageObjects.push(leftScreenGroup);

        // Right screen setup
        const rightScreenGroup = this.createScreenPanel();
        rightScreenGroup.position.set(3.5, 1.8, -2);
        rightScreenGroup.rotation.y = -Math.PI / 8;
        this.scene.add(rightScreenGroup);
        this.stageObjects.push(rightScreenGroup);

        // Floor spotlights
        const spotPositions = [
            [-2.5, 0.05, 1.5],
            [2.5, 0.05, 1.5],
            [-2, 0.05, -1.5],
            [2, 0.05, -1.5]
        ];
        
        spotPositions.forEach((pos, i) => {
            const spotLight = new THREE.Mesh(
                new THREE.CylinderGeometry(0.12, 0.08, 0.05),
                new THREE.MeshStandardMaterial({
                    color: i % 2 === 0 ? 0xff00ff : 0x00ffff,
                    emissive: i % 2 === 0 ? 0xff00ff : 0x00ffff,
                    emissiveIntensity: 2,
                    metalness: 0.9
                })
            );
            spotLight.position.set(...pos);
            this.scene.add(spotLight);
            this.stageObjects.push(spotLight);
        });

        // Hanging lights
        [-2, 0, 2].forEach((x, i) => {
            const hangingLight = new THREE.Mesh(
                new THREE.SphereGeometry(0.15, 16, 16),
                new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    emissive: [0xff0088, 0x00ffff, 0xffff00][i],
                    emissiveIntensity: 3,
                    transparent: true,
                    opacity: 0.8
                })
            );
            hangingLight.position.set(x, 3.5, 0);
            this.scene.add(hangingLight);
            this.stageObjects.push(hangingLight);
        });
    }

    /**
     * Create detailed screen panel with frame
     */
    createScreenPanel() {
        const group = new THREE.Group();

        // Screen frame
        const frameThickness = 0.05;
        const frameDepth = 0.1;
        const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0x1a1a1a,
            metalness: 0.9,
            roughness: 0.1
        });

        // Frame parts
        const frameParts = [
            new THREE.BoxGeometry(1.7, frameThickness, frameDepth), // top
            new THREE.BoxGeometry(1.7, frameThickness, frameDepth), // bottom
            new THREE.BoxGeometry(frameThickness, 2.2, frameDepth), // left
            new THREE.BoxGeometry(frameThickness, 2.2, frameDepth)  // right
        ];

        const framePositions = [
            [0, 1.1, 0],
            [0, -1.1, 0],
            [-0.85, 0, 0],
            [0.85, 0, 0]
        ];

        frameParts.forEach((geo, i) => {
            const frame = new THREE.Mesh(geo, frameMaterial);
            frame.position.set(...framePositions[i]);
            group.add(frame);
        });

        // Holographic screen
        const screenGeo = new THREE.PlaneGeometry(1.5, 2);
        const screenMat = new THREE.MeshStandardMaterial({
            color: 0x00ffff,
            emissive: 0x00ffff,
            emissiveIntensity: 1.5,
            transparent: true,
            opacity: 0.4,
            side: THREE.DoubleSide
        });
        const screen = new THREE.Mesh(screenGeo, screenMat);
        group.add(screen);

        // Glowing border effect
        const glowGeo = new THREE.PlaneGeometry(1.6, 2.1);
        const glowMat = new THREE.MeshBasicMaterial({
            color: 0xff00ff,
            transparent: true,
            opacity: 0.2,
            side: THREE.DoubleSide
        });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        glow.position.z = -0.01;
        group.add(glow);

        return group;
    }

    /**
     * Update animation loop (for animated effects)
     */
    update(deltaTime, elapsedTime) {
        // Animate LED colors
        this.stageObjects.forEach(obj => {
            if (obj.material && obj.material.emissive) {
                // Pulsing effect
                const pulse = 0.5 + 0.5 * Math.sin(elapsedTime * 2);
                obj.material.emissiveIntensity = pulse * 2;
            }
        });

        // Animate spotlights (rotating)
        this.lights.forEach((light, i) => {
            if (light.type === 'SpotLight') {
                const speed = 0.3 + i * 0.1;
                const radius = 2;
                light.position.x = Math.cos(elapsedTime * speed) * radius;
                light.position.z = Math.sin(elapsedTime * speed) * radius;
            }
        });
    }

    /**
     * Clear all stage objects
     */
    clear() {
        this.stageObjects.forEach(obj => {
            this.scene.remove(obj);
            if (obj.geometry) obj.geometry.dispose();
            if (obj.material) {
                if (Array.isArray(obj.material)) {
                    obj.material.forEach(mat => mat.dispose());
                } else {
                    obj.material.dispose();
                }
            }
        });
        this.stageObjects = [];

        this.lights.forEach(light => this.scene.remove(light));
        this.lights = [];
    }

    /**
     * Toggle stage visibility
     */
    setVisible(visible) {
        this.stageObjects.forEach(obj => {
            obj.visible = visible;
        });
        this.lights.forEach(light => {
            light.visible = visible;
        });
    }

    /**
     * Change stage theme
     */
    setTheme(theme) {
        switch (theme) {
            case 'cyberpunk':
                this.clear();
                this.setup({
                    platform: true,
                    djBooth: true,
                    lighting: 'concert',
                    background: 'gradient',
                    decorations: true
                });
                break;
            case 'minimal':
                this.clear();
                this.setup({
                    platform: true,
                    djBooth: false,
                    lighting: 'studio',
                    background: 'gradient',
                    decorations: false
                });
                break;
            case 'space':
                this.clear();
                this.setup({
                    platform: true,
                    djBooth: true,
                    lighting: 'concert',
                    background: 'space',
                    decorations: true
                });
                break;
        }
    }
}
