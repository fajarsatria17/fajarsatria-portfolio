import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface AbstractOrbProps {
  pointerTarget: React.RefObject<[number, number]>;
}

export const AbstractOrb: React.FC<AbstractOrbProps> = ({ pointerTarget }) => {
  const outerGroupRef = useRef<THREE.Group>(null);
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const wireMeshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Current interpolated rotation state for smooth lerping
  const currentTilt = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useFrame((_, delta) => {
    // 1. Smooth Idle Rotation (HR-004)
    // Rotate wireframe and inner core in slight opposing angles for visual depth
    if (wireMeshRef.current) {
      wireMeshRef.current.rotation.y += delta * 0.18;
      wireMeshRef.current.rotation.x += delta * 0.08;
    }

    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.y -= delta * 0.12;
      coreMeshRef.current.rotation.z += delta * 0.06;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15;
    }

    // 2. Interactive Pointer Parallax Lerp (HR-003 / MOT-003)
    if (outerGroupRef.current) {
      const [targetX = 0, targetY = 0] = pointerTarget.current ?? [0, 0];

      // Lerp factor 0.04 - smooth and controlled without jitter or abrupt snapping
      currentTilt.current.x += (targetY * 0.35 - currentTilt.current.x) * 0.04;
      currentTilt.current.y += (targetX * 0.35 - currentTilt.current.y) * 0.04;

      outerGroupRef.current.rotation.x = currentTilt.current.x;
      outerGroupRef.current.rotation.y = currentTilt.current.y;
    }
  });

  return (
    <group ref={outerGroupRef}>
      {/* Outer Wireframe Cage: IcosahedronGeometry detail 1 */}
      <mesh ref={wireMeshRef}>
        <icosahedronGeometry args={[1.75, 1]} />
        <meshStandardMaterial
          wireframe
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={0.65}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Inner Geometric Core: IcosahedronGeometry detail 2 */}
      <mesh ref={coreMeshRef}>
        <icosahedronGeometry args={[1.35, 2]} />
        <meshStandardMaterial
          color="#001833"
          emissive="#004488"
          emissiveIntensity={0.4}
          roughness={0.3}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Subtle Orbital Halo Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.2, 0.015, 16, 64]} />
        <meshBasicMaterial
          color="#00D4FF"
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
};
