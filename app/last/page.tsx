"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Html, OrbitControls, useGLTF, useProgress } from "@react-three/drei"
import { Suspense, useRef, useState } from "react"
import * as THREE from "three"

export default function Page() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "black" }}>
      <Canvas camera={{ position: [0, 2, 4] }}>
        <Suspense fallback={<Loader />}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <Model />
          <OrbitControls enableDamping />
        </Suspense>
      </Canvas>
    </div>
  )
}

/* ---------------- LOADER ---------------- */

function Loader() {
  const { progress } = useProgress()

  return (
    <Html center>
      <div style={{ color: "white", textAlign: "center" }}>
        <p>Loading...</p>
        <p>{progress.toFixed(0)}%</p>
      </div>
    </Html>
  )
}

/* ---------------- MODEL ---------------- */

function Model() {
  const ref = useRef<THREE.Group>(null)
  const { scene } = useGLTF("/model.glb")
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (!ref.current) return

    // Rotation animation
    ref.current.rotation.y += delta * 0.6

    // Floating animation
    ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2

    // Hover scale effect
    const scale = hovered ? 1.2 : 1
    ref.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1)
  })

  return (
    <primitive
      ref={ref}
      object={scene}
      position={[0, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => alert("Model clicked 😎")}
    />
  )
}
