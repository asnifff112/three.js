"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
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
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.position.x = Math.sin(t * speed) * distance;
    ref.current.position.z = Math.cos(t * speed) * distance;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

/* ---------- Sun ---------- */
function Sun() {
  return (
    <mesh>
      <sphereGeometry args={[1.8, 32, 32]} />
      <meshStandardMaterial
        emissive="orange"
        emissiveIntensity={2}
        color="yellow"
      />
    </mesh>
  );
}

/* ---------- Solar System ---------- */
export default function SolarSystem() {
  return (
    <main className="w-screen h-screen bg-black">
      <Canvas camera={{ position: [0, 8, 18], fov: 50 }}>
        {/* Lights */}
        <ambientLight intensity={0.3} />
        <pointLight position={[0, 0, 0]} intensity={2} />

        {/* Background Stars */}
        <Stars radius={100} depth={50} count={5000} factor={4} />

        {/* Sun */}
        <Sun />

        {/* 8 Planets */}
        <Planet distance={3} size={0.25} speed={1.6} color="#aaa" />   {/* Mercury */}
        <Planet distance={4} size={0.35} speed={1.3} color="#d4af37" /> {/* Venus */}
        <Planet distance={5} size={0.4} speed={1} color="#2a6df4" />   {/* Earth */}
        <Planet distance={6} size={0.3} speed={0.8} color="#c1440e" /> {/* Mars */}
        <Planet distance={8} size={0.9} speed={0.4} color="#d2b48c" /> {/* Jupiter */}
        <Planet distance={10} size={0.8} speed={0.3} color="#deb887" />{/* Saturn */}
        <Planet distance={12} size={0.6} speed={0.2} color="#7fffd4" />{/* Uranus */}
        <Planet distance={14} size={0.6} speed={0.15} color="#4169e1" />{/* Neptune */}

        {/* Controls */}
        <OrbitControls enableZoom />
      </Canvas>
    </main>
  );
}
