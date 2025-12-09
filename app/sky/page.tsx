"use client";

import { Canvas } from "@react-three/fiber";
import { Sky, Environment, OrbitControls, ContactShadows } from "@react-three/drei";

export default function Home() {
  return (
    <main className="w-screen h-screen bg-black">
      <Canvas
        shadows
        camera={{ position: [0, 2.5, 6], fov: 45 }}
      >
        {/* ---------- SKY (BACKGROUND SKY) ---------- */}
        <Sky
          sunPosition={[10, 20, 10]}
          turbidity={8}
          rayleigh={2}
          mieCoefficient={0.005}
          mieDirectionalG={0.8}
        />

        {/* ---------- ENVIRONMENT MAP (LIGHT + REFLECTION) ---------- */}
        <Environment preset="sunset" />

        {/* ---------- LIGHTS ---------- */}
        <ambientLight intensity={0.4} />

        <directionalLight
          castShadow
          position={[4, 6, 4]}
          intensity={1}
          shadow-mapSize={[2048, 2048]}
        />

        {/* ---------- OBJECT ---------- */}
        <mesh castShadow position={[0, 1.2, 0]}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            color="white"
            metalness={0.85}
            roughness={0.15}
          />
        </mesh>

        {/* ---------- FLOOR ---------- */}
        <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, 0, 0]}>
          <planeGeometry args={[15, 15]} />
          <meshStandardMaterial color="#111" roughness={0.8} />
        </mesh>

        {/* ---------- CONTACT SHADOWS ---------- */}
        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.6}
          scale={12}
          blur={2.5}
          far={5}
        />

        {/* ---------- CAMERA CONTROL ---------- */}
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.8}
          enablePan={false}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>
    </main>
  );
}
