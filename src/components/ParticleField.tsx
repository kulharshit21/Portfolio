import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import type { MutableRefObject } from 'react';
import * as THREE from 'three';

const COUNT = 2000;
const R = 8;

function ParticleCloud({
  mouse,
}: {
  mouse: MutableRefObject<{ x: number; y: number }>;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = R * Math.cbrt(Math.random());
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame(() => {
    const mesh = ref.current;
    if (!mesh) return;
    mesh.rotation.y += 0.0004;
    const tx = mouse.current.x * 0.45;
    const ty = -mouse.current.y * 0.45;
    mesh.position.x += (tx - mesh.position.x) * 0.05;
    mesh.position.y += (ty - mesh.position.y) * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#14b8a6"
        size={0.015}
        transparent
        opacity={0.88}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Scene({
  mouse,
}: {
  mouse: MutableRefObject<{ x: number; y: number }>;
}) {
  return (
    <>
      <fogExp2 attach="fog" args={['#0a0a0a', 0.15]} />
      <ParticleCloud mouse={mouse} />
    </>
  );
}

export function HeroParticleCanvas({
  mouse,
}: {
  mouse: MutableRefObject<{ x: number; y: number }>;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 min-h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 50 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
        className="!absolute inset-0 h-full w-full !touch-none"
      >
        <Suspense fallback={null}>
          <Scene mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}
