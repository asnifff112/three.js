"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

// -------------------------
// SIMPLE ANIMATED BOX
// -------------------------
function RotatingBox() {
  const boxRef = useRef<THREE.Mesh>(null!);

  // useFrame → animation loop
  useFrame((state, delta) => {
    boxRef.current.rotation.x += 0.5 * delta;
    boxRef.current.rotation.y += 0.8 * delta;
  });

  return (
    <mesh ref={boxRef} castShadow receiveShadow>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#6ab7ff" metalness={0.6} roughness={0.3} />
    </mesh>
  );
}

// -------------------------
// MAIN PAGE
// -------------------------
