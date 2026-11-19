import type { Vector3 } from 'three';

export interface OrbConfig {
  radius: number;
  detail: number;
  wireframe: boolean;
  color: string;
  wireframeColor: string;
  emissiveColor: string;
}

export interface ParallaxState {
  target: [number, number];
  current: [number, number];
  position?: Vector3;
}
