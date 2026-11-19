import React, { useMemo, useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface ParticlePortraitProps {
  pointerTarget: React.RefObject<[number, number]>;
  imageSrc?: string;
}

// Custom AI Biometric & Holographic Melt Shader
// Features:
// 1) Smooth organic melt materialization on intro
// 2) Real-time holographic scanner beam sweeping down the portrait
// 3) Dynamic interactive cyan sheen responding to mouse pointer
// 4) 100% sharp, high-definition photo fidelity with zero particles
const BiometricShader = {
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uProgress;
    uniform float uTime;
    uniform vec2 uPointer;
    varying vec2 vUv;

    // Procedural noise for organic dissolve/melt effect
    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    void main() {
      vec4 texColor = texture2D(uTexture, vUv);
      if (texColor.a < 0.02) discard;

      // Multi-scale organic melt noise for intro transition
      float n1 = noise(vUv * 10.0);
      float n2 = noise(vUv * 24.0 + uTime * 0.4);
      float n = n1 * 0.7 + n2 * 0.3;

      // Directional melt: reveals smoothly upward
      float verticalBias = (1.0 - vUv.y) * 0.3;
      float meltThreshold = (uProgress * 1.32) - verticalBias;

      float diff = meltThreshold - n;
      if (diff < 0.0) discard;

      vec3 finalColor = texColor.rgb;
      vec3 cyanGlow = vec3(0.0, 0.83, 1.0); // Electric Cyan #00D4FF

      // 1. Edge burn / melt glow during initial intro transition
      float edgeWidth = 0.07;
      if (diff < edgeWidth && uProgress < 0.99) {
        float glowFactor = 1.0 - (diff / edgeWidth);
        finalColor = mix(finalColor, cyanGlow * 1.6, glowFactor * 0.8);
      }

      // 2. Real-time Holographic Biometric Scanner Beam
      // Sweeps top to bottom every ~3.2 seconds
      if (uProgress >= 0.85) {
        float scanPeriod = 3.2;
        float scanTime = mod(uTime, scanPeriod);
        // Active scan phase takes first 2.0 seconds, then 1.2s pause
        if (scanTime < 2.0) {
          float scanPos = 1.05 - (scanTime / 2.0) * 1.1; // sweeps 1.05 down to -0.05
          float scanDist = abs(vUv.y - scanPos);

          // Intense core scanline beam
          float beam = smoothstep(0.035, 0.0, scanDist) * 0.55;

          // Subtle holographic trailing tail above the beam
          float trail = smoothstep(0.18, 0.0, vUv.y - scanPos) * step(scanPos, vUv.y) * 0.22;

          // Subtle horizontal grid interference in the scanner
          float gridPulse = sin(vUv.x * 90.0) * 0.08 + 0.92;

          finalColor += cyanGlow * (beam + trail) * gridPulse;
        }
      }

      // 3. Dynamic Interactive Specular Sheen (follows mouse cursor)
      vec2 lightCenter = uPointer * 0.35 + vec2(0.5, 0.5);
      float lightDist = length(vUv - lightCenter);
      float sheen = max(0.0, 1.0 - lightDist * 1.8) * 0.06;
      finalColor += cyanGlow * sheen;

      gl_FragColor = vec4(finalColor, texColor.a);
    }
  `,
};

export const ParticlePortrait: React.FC<ParticlePortraitProps> = ({
  pointerTarget,
  imageSrc = '/images/fajar-suit-portrait.png',
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Dimensions of portrait plane (matching 841 x 1024 aspect ratio)
  const planeWidth = 3.2;
  const planeHeight = 3.9;

  // Load high-resolution photo texture
  useEffect(() => {
    let active = true;
    const loader = new THREE.TextureLoader();
    loader.load(imageSrc, (loadedTex) => {
      if (!active) return;
      loadedTex.generateMipmaps = true;
      loadedTex.minFilter = THREE.LinearMipmapLinearFilter;
      loadedTex.magFilter = THREE.LinearFilter;
      setTexture(loadedTex);
    });

    return () => {
      active = false;
    };
  }, [imageSrc]);

  // Shader uniforms
  const uniforms = useMemo(() => {
    return {
      uTexture: { value: null as THREE.Texture | null },
      uProgress: { value: 0.0 },
      uTime: { value: 0.0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
    };
  }, []);

  // Sync texture when loaded
  useEffect(() => {
    if (materialRef.current && texture && materialRef.current.uniforms['uTexture']) {
      materialRef.current.uniforms['uTexture'].value = texture;
    }
  }, [texture]);

  // Animation Loop: Smooth Melt Materialization + Scanner + 3D Parallax Tilt
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (startTimeRef.current === null) {
      startTimeRef.current = time;
    }

    const elapsed = time - startTimeRef.current;
    const [ptrX, ptrY] = pointerTarget.current || [0, 0];

    // Smooth whole-group 3D parallax tilt (follows mouse with depth)
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, ptrX * 0.22, 0.06);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -ptrY * 0.16, 0.06);
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        Math.sin(time * 1.5) * 0.03,
        0.04
      );
    }

    // Materialization progress: melts smoothly into the clear photo over 1.6s
    const meltDuration = 1.6;
    const progress = Math.min(elapsed / meltDuration, 1.0);
    // Ease-out cubic
    const easedProgress = 1.0 - Math.pow(1.0 - progress, 3);

    if (materialRef.current?.uniforms) {
      const u = materialRef.current.uniforms;
      if (u['uProgress']) u['uProgress'].value = easedProgress;
      if (u['uTime']) u['uTime'].value = time;
      if (u['uPointer']) u['uPointer'].value.set(ptrX, ptrY);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.08, 0]}>
      {texture && (
        <mesh ref={meshRef}>
          <planeGeometry args={[planeWidth, planeHeight, 32, 32]} />
          <shaderMaterial
            ref={materialRef}
            vertexShader={BiometricShader.vertexShader}
            fragmentShader={BiometricShader.fragmentShader}
            uniforms={uniforms}
            transparent={true}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Subtle Cyan Holographic Ambient Lighting behind the portrait */}
      <pointLight position={[0, 0.5, 0.8]} color="#00D4FF" intensity={0.6} distance={6} />
    </group>
  );
};
