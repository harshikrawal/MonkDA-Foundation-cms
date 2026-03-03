"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleBackground({ scroll }: { scroll: number }) {
  const ref = useRef<THREE.Points>(null);

  // Generate random particles
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(5000 * 3);
    const cols = new Float32Array(5000 * 3);
    const color = new THREE.Color();

    for (let i = 0; i < 5000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;

      // Use the purple/blue theme
      const mixedColor = i % 2 === 0 ? "#A855F7" : "#3B82F6";
      color.set(mixedColor);
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }
    return [pos, cols];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;

    // Rotate based on time + scroll
    const time = state.clock.getElapsedTime();
    ref.current.rotation.y = time * 0.05 + scroll * 2;
    ref.current.rotation.x = time * 0.02 + scroll * 1;

    // Pulse scale based on scroll
    const scale = 1 + Math.sin(scroll * Math.PI) * 0.5;
    ref.current.scale.set(scale, scale, scale);
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function Experience3D({ scroll }: { scroll: number }) {
  return (
    <div className="fixed inset-0 z-0 bg-white">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <color attach="background" args={["#ffffff"]} />
        <ambientLight intensity={0.5} />
        <ParticleBackground scroll={scroll} />
      </Canvas>
    </div>
  );
}
