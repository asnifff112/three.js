"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

/* ---------- Planet Component ---------- */
function Planet({
  distance,
  size,
  speed,
  color,
}: {
  distance: number;
  size: number;
  speed: number;
  color: string;
}) {
  const planetRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    planetRef.current.position.x = Math.sin(t * speed) * distance;
    planetRef.current.position.z = Math.cos(t * speed) * distance;
    planetRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={planetRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

/* ---------- Sun ---------- */
function Sun() {
  return (
    <mesh>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial
        emissive="yellow"
        emissiveIntensity={1.5}
        color="orange"
      />
    </mesh>
  );
}

/* ---------- Main Scene ---------- */
export default function page() {
  return (
    <main className="w-screen h-screen bg-black">
      <Canvas camera={{ position: [0, 6, 12], fov: 50 }}>
        {/* Lights */}
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={2} />

        {/* Objects */}
        <Sun />
        <Planet distance={4} size={0.4} speed={1} color="blue" />
        <Planet distance={6} size={0.5} speed={0.8} color="red" />
        <Planet distance={8} size={0.6} speed={0.6} color="green" />

        {/* Camera Control */}
        <OrbitControls enableZoom />
      </Canvas>
    </main>
  );
}
