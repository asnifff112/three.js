"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function cube() {
  const cubeRef = useRef<THREE.Mesh | null>(null);

  useFrame((state, delta) => {
    if (!cubeRef.current) return;

    const t = state.clock.getElapsedTime();

    // rotation
    cubeRef.current.rotation.y += delta;
    cubeRef.current.rotation.x += delta * 0.5;

    // floating
    cubeRef.current.position.y = Math.sin(t) * 0.5;
  });

  return (
    <mesh ref={cubeRef} castShadow>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        color="#6ab7ff"
        metalness={0.6}
        roughness={0.3}
      />
    </mesh>
  );
}
