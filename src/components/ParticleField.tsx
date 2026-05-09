import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import * as THREE from 'three';

const R = 8;

type ParticleTier = 'off' | 'low' | 'mid' | 'high';

function tierToCount(tier: ParticleTier): number {
  switch (tier) {
    case 'off':
      return 0;
    case 'low':
      return 520;
    case 'mid':
      return 1100;
    default:
      return 2000;
  }
}

function useParticleTier(): ParticleTier {
  const [tier, setTier] = useState<ParticleTier>(() => {
    if (typeof window === 'undefined') return 'high';
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return 'off';
    if (window.matchMedia('(max-width: 639px)').matches) return 'low';
    if (window.matchMedia('(max-width: 1023px)').matches) return 'mid';
    return 'high';
  });

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const narrow = window.matchMedia('(max-width: 639px)');
    const tablet = window.matchMedia('(max-width: 1023px)');
    const sync = () => {
      if (reduce.matches) setTier('off');
      else if (narrow.matches) setTier('low');
      else if (tablet.matches) setTier('mid');
      else setTier('high');
    };
    sync();
    reduce.addEventListener('change', sync);
    narrow.addEventListener('change', sync);
    tablet.addEventListener('change', sync);
    return () => {
      reduce.removeEventListener('change', sync);
      narrow.removeEventListener('change', sync);
      tablet.removeEventListener('change', sync);
    };
  }, []);

  return tier;
}

function ParticleCloud({
  mouse,
  count,
}: {
  mouse: MutableRefObject<{ x: number; y: number }>;
  count: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
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
  }, [count]);

  useFrame(() => {
    const mesh = ref.current;
    if (!mesh) return;
    mesh.rotation.y += count >= 1500 ? 0.0004 : 0.00035;
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
  count,
}: {
  mouse: MutableRefObject<{ x: number; y: number }>;
  count: number;
}) {
  return (
    <>
      <fogExp2 attach="fog" args={['#0a0a0a', 0.15]} />
      <ParticleCloud mouse={mouse} count={count} />
    </>
  );
}

export function HeroParticleCanvas({
  mouse,
}: {
  mouse: MutableRefObject<{ x: number; y: number }>;
}) {
  const tier = useParticleTier();
  const count = tierToCount(tier);
  const antialias = tier === 'high';
  const dprMax = tier === 'low' ? 1.25 : tier === 'mid' ? 1.5 : 2;

  if (count === 0) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-0 min-h-full w-full bg-transparent"
        aria-hidden
      />
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 min-h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 50 }}
        gl={{
          alpha: true,
          antialias,
          powerPreference: 'high-performance',
        }}
        dpr={[1, dprMax]}
        frameloop="always"
        className="!absolute inset-0 h-full w-full !touch-none"
      >
        <Suspense fallback={null}>
          <Scene mouse={mouse} count={count} />
        </Suspense>
      </Canvas>
    </div>
  );
}
