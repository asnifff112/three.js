"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Drone() {
  const droneRef = useRef<THREE.Group | null>(null);
  const lightRef = useRef<THREE.Mesh | null>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (droneRef.current) {
      droneRef.current.position.y = 2 + Math.sin(t * 2) * 0.4;
      droneRef.current.rotation.y = t * 0.6;
      droneRef.current.rotation.z = Math.sin(t) * 0.1;
    }

   
    if (lightRef.current) {
      const blink = Math.abs(Math.sin(t * 4));
      (lightRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        blink * 5;
    }
  });

  return (
    <group ref={droneRef}>

      <mesh castShadow>
        <cylinderGeometry args={[0.6, 0.8, 0.3, 32]} />
        <meshStandardMaterial color="#222222" metalness={0.6} roughness={0.3} />
      </mesh>

   
      <mesh position={[0, -0.15, 0.5]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      
      <mesh ref={lightRef} position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          emissive="red"
          color="red"
          emissiveIntensity={1}
        />
      </mesh>

      {[-0.6, 0.6].map((x) =>
        [-0.6, 0.6].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.15, z]}>
            <cylinderGeometry args={[0.3, 0.3, 0.05, 16]} />
            <meshStandardMaterial color="gray" />
          </mesh>
        ))
      )}
    </group>
  );
}

export default function Home() { 
  return (
    <main className="w-screen h-screen bg-black">
      <Canvas camera={{ position: [0, 3, 7], fov: 45 }} shadows>
        <ambientLight intensity={0.4} />
        <directionalLight castShadow position={[5, 8, 5]} intensity={1} />
        <Environment preset="warehouse" />
        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.7}
          scale={10}
          blur={2.5}
          far={4}
        />

        <Drone />

        <OrbitControls enableZoom={false} />
      </Canvas>
    </main>
  );
}
