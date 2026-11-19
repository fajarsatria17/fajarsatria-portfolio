import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ParticlePortrait } from './ParticlePortrait';
import { useTabVisibility } from '@hooks/useTabVisibility';

export interface HeroSceneProps {
  pointerTarget: React.RefObject<[number, number]>;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ pointerTarget }) => {
  const isTabVisible = useTabVisibility();
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Limit device pixel ratio to max 2 to prevent GPU strain on 4K/retina (HR-010)
      setDpr(Math.min(window.devicePixelRatio || 1, 2));
    }
  }, []);

  return (
    <div
      className="w-full h-full min-h-[380px] sm:min-h-[460px] flex items-center justify-center pointer-events-none select-none relative"
      aria-hidden="true"
    >
      <Canvas
        frameloop={isTabVisible ? 'always' : 'never'} // Pause render loop when tab inactive (MOT-008)
        dpr={dpr}
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'default',
        }}
        style={{
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {/* Balanced Cyan & Deep Space Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 4, 3]} color="#00D4FF" intensity={2.8} distance={12} />
        <pointLight position={[-3, -3, -2]} color="#0066FF" intensity={1.8} distance={10} />

        {/* 3D Interactive WebGL Organic Melt Materialization Portrait */}
        <ParticlePortrait pointerTarget={pointerTarget} imageSrc="/images/fajar-suit-portrait.png" />
      </Canvas>
    </div>
  );
};

export default HeroScene;
