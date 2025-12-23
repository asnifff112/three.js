"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function RotatingBox() {
  const boxRef = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    boxRef.current.rotation.x += 0.5 * delta;
    boxRef.current.rotation.y += 0.8 * delta;
  });

  return (
    <mesh ref={boxRef} castShadow receiveShadow>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="red" metalness={0.6} roughness={0.3} />
    </mesh>
  );
}

export default function Home() {
  return (
    <main className="w-screen h-screen bg-black">
      <Canvas
        shadows
        camera={{ position: [3, 3, 6], fov: 50 }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          castShadow
        />
        <Environment preset="sunset" />
        <OrbitControls enableDamping />
        <RotatingBox />
      </Canvas>
    </main>
  );
}
