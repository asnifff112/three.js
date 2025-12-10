"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Home() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000");

   
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: "#00ffcc" });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    
    const light = new THREE.DirectionalLight("#ffffff", 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    
    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }

    animate();

   
    return () => {
      if (mountRef.current) {
        mountRef.current.innerHTML = "";
      }
    };
  }, []);

return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;


}
