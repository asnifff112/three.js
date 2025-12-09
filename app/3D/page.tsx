"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

function Juggler() {
  const groupRef = useRef<THREE.Group | null>(null);
  const ballRef = useRef<THREE.Mesh | null>(null);
  const rightFootRef = useRef<THREE.Mesh | null>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Small idle movement for whole body
    if (groupRef.current) {
      groupRef.current.position.y = 0.05 * Math.sin(t * 2);
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
    }

    // Juggling motion
    const speed = 2.5;
    const cycle = t * speed;
    const bounce = Math.abs(Math.sin(cycle)); // 0 → 1 → 0

    if (ballRef.current) {
      // Ball up & down
      ballRef.current.position.y = 1.0 + bounce * 1.2;
    }

    if (rightFootRef.current) {
      // Foot kicking motion
      rightFootRef.current.rotation.x = -0.4 + bounce * 0.6;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Torso */}
      <mesh castShadow position={[0, 1.4, 0]}>
        <boxGeometry args={[0.6, 1.2, 0.3]} />
        <meshStandardMaterial color={"#1e90ff"} />
      </mesh>

      {/* Head */}
      <mesh castShadow position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color={"#ffcc99"} />
      </mesh>

      {/* Left leg */}
      <mesh castShadow position={[-0.15, 0.45, 0]}>
        <boxGeometry args={[0.18, 0.9, 0.18]} />
        <meshStandardMaterial color={"#00aa88"} />
      </mesh>

      {/* Right leg */}
      <mesh castShadow position={[0.15, 0.45, 0]}>
        <boxGeometry args={[0.18, 0.9, 0.18]} />
        <meshStandardMaterial color={"#00aa88"} />
      </mesh>

      {/* Right foot (kicking) */}
      <mesh
        ref={rightFootRef}
        castShadow
        position={[0.22, -0.05, 0.18]}
        rotation={[-0.4, 0, 0]}
      >
        <boxGeometry args={[0.32, 0.12, 0.4]} />
        <meshStandardMaterial color={"#ffffff"} />
      </mesh>

      {/* Ball */}
      <mesh ref={ballRef} castShadow position={[0.22, 1.0, 0.18]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial color={"white"} />
      </mesh>
    </group>
  );
}

export default function page() {
  return (
    <main className="w-screen h-screen bg-black">
      <Canvas
        shadows
        camera={{ position: [0, 2.5, 6], fov: 45 }}
      >
        {/* Lights */}
        <ambientLight intensity={0.4} />
        <directionalLight
          castShadow
          position={[4, 8, 4]}
          intensity={1.1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Ground shadow */}
        <ContactShadows
          opacity={0.6}
          scale={10}
          blur={2.5}
          far={4.5}
          resolution={1024}
        />

        {/* Environment lighting */}
        <Environment preset="city" />

        {/* Our juggler */}
        <Juggler />

        {/* Camera controls (mouse move) */}
        <OrbitControls enablePan={false} />
      </Canvas>
    </main>
  );
}
