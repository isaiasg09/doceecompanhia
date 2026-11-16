import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function createBokehTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const grad = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
  grad.addColorStop(0, 'rgba(255, 252, 245, 1)');
  grad.addColorStop(0.38, 'rgba(246, 235, 220, 0.7)');
  grad.addColorStop(1, 'rgba(246, 235, 220, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function SugarDustField({ pointerRef }) {
  const pointsRef = useRef(null);
  const count = 135;

  const { positions, colors, speeds } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    const sugarWhite = new THREE.Color('#fbf5ea');
    const warmCaramel = new THREE.Color('#dba256');

    for (let i = 0; i < count; i += 1) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;

      spd[i] = 0.25 + Math.random() * 0.55;

      const mixTone = Math.random() > 0.72 ? warmCaramel : sugarWhite;
      col[i * 3] = mixTone.r;
      col[i * 3 + 1] = mixTone.g;
      col[i * 3 + 2] = mixTone.b;
    }

    return { positions: pos, colors: col, speeds: spd };
  }, []);

  const particleMap = useMemo(() => createBokehTexture(), []);

  useEffect(() => {
    return () => {
      if (particleMap) particleMap.dispose();
    };
  }, [particleMap]);

  useFrame((state, delta) => {
    const pts = pointsRef.current;
    if (!pts) return;

    const attr = pts.geometry.attributes.position;
    const array = attr.array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i += 1) {
      const idx = i * 3;
      const speed = speeds[i];
      array[idx + 1] -= delta * 0.16 * speed;
      array[idx] += Math.sin(t * 0.45 + i) * delta * 0.08;

      if (array[idx + 1] < -4.6) {
        array[idx + 1] = 4.6;
        array[idx] = (Math.random() - 0.5) * 14;
      }
    }
    attr.needsUpdate = true;

    const targetX = (pointerRef.current?.x ?? 0) * 0.28;
    const targetY = (pointerRef.current?.y ?? 0) * 0.18;
    pts.rotation.y = THREE.MathUtils.lerp(pts.rotation.y, targetX, 0.04);
    pts.rotation.x = THREE.MathUtils.lerp(pts.rotation.x, -targetY, 0.04);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        map={particleMap || undefined}
        vertexColors
        transparent
        opacity={0.58}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export default function SugarParticlesCanvas() {
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event) => {
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 5.5], fov: 48 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.4} color="#f6ebdc" />
        <SugarDustField pointerRef={pointerRef} />
      </Canvas>
    </div>
  );
}
