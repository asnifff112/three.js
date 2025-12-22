"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Drone() {
  const drone = useRef<THREE.Group | null>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!drone.current) return;

    drone.current.position.y = Math.sin(t) * 0.6;
    drone.current.rotation.y += 0.01;
  });

  return (
    <group ref={drone} scale={1.8}>
      {/* Body */}
      <mesh>
        <cylinderGeometry args={[0.8, 0.8, 0.4, 32]} />
        <meshStandardMaterial color="#555" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Light */}
      <pointLight color="red" intensity={2} position={[0, 0.6, 0]} />
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial emissive="red" />
      </mesh>
    </group>
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 3, 7], fov: 50 }}>
      <Environment preset="night" background />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Drone />
      <OrbitControls />
    </Canvas>
  );
}
