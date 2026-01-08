"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const TIME_SCALE = 50;

function OrbitRing({ radius }: { radius: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.02, radius + 0.02, 128]} />
      <meshBasicMaterial
        color="white"
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
function Planet({
  distance,
  size,
  orbitalPeriod,
  textureUrl,
}: {
  distance: number;
  size: number;
  orbitalPeriod: number;
  textureUrl: string;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const texture = useLoader(THREE.TextureLoader, textureUrl);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const speed = (1 / orbitalPeriod) * TIME_SCALE;

    ref.current.position.x = Math.sin(t * speed) * distance;
    ref.current.position.z = Math.cos(t * speed) * distance;
    ref.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function Sun() {
  const sunTexture = useLoader(
    THREE.TextureLoader,
    "/imgg/sunn.jpg"
  );

  return (
    <mesh>
      <sphereGeometry args={[1.8, 64, 64]} />
      <meshStandardMaterial
        map={sunTexture}
       
        emissiveIntensity={1.5}
      />
    </mesh>   
  );
}

export default function SolarSystem() {
  return (
    <main className="w-screen h-screen bg-black">
      <Canvas camera={{ position: [0, 10, 20], fov: 50 }}>
  
        <ambientLight intensity={1} />
        <pointLight position={[0, 0, 0]} intensity={2} />

        <Stars radius={200} depth={60} count={7000} factor={4} />
        <Sun />
        <OrbitRing radius={3} />
        <OrbitRing radius={4} />
        <OrbitRing radius={5} />
        <OrbitRing radius={6} />
        <OrbitRing radius={8} />
        <OrbitRing radius={10} />
        <OrbitRing radius={12} />
        <OrbitRing radius={14} />

        <Planet distance={3} size={0.25} orbitalPeriod={88} textureUrl="/imgg/mercurymap.jpg" />
        <Planet distance={4} size={0.35} orbitalPeriod={225} textureUrl="/imgg/venuess.jpg" />
        <Planet distance={5} size={0.4} orbitalPeriod={365} textureUrl="/imgg/earth.jpg" />
        <Planet distance={6} size={0.3} orbitalPeriod={687} textureUrl="/imgg/mars.jpg" />
        <Planet distance={8} size={0.9} orbitalPeriod={4333} textureUrl="/imgg/jupiter.jpg" />
        <Planet distance={10} size={0.8} orbitalPeriod={10759} textureUrl="/imgg/saturn.jpg" />
        <Planet distance={12} size={0.6} orbitalPeriod={30687} textureUrl="/imgg/uranus.jpg" />
        <Planet distance={14} size={0.6} orbitalPeriod={60190} textureUrl="/imgg/neptune.jpg" />
        <OrbitControls enableZoom />
      </Canvas>
    </main>
  );
}
