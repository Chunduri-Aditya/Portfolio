import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * The hero showpiece: a slowly rotating distorted icosahedron with an iridescent
 * gradient material, drifting on a Float and nudged by the pointer. Self
 * contained — no external HDRI, just scene lights. Lazy-loaded and never mounted
 * under reduced-motion / on small screens (see Hero.tsx).
 */
function Blob() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.12 + pointer.y * 0.3;
    mesh.current.rotation.y = t * 0.16 + pointer.x * 0.3;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh} scale={2.15}>
        <icosahedronGeometry args={[1, 24]} />
        <MeshDistortMaterial
          color="#7c5cff"
          emissive="#2a1a6b"
          emissiveIntensity={0.45}
          roughness={0.28}
          metalness={0.35}
          clearcoat={0.9}
          clearcoatRoughness={0.25}
          distort={0.4}
          speed={1.6}
        />
      </mesh>
    </Float>
  );
}

const HeroScene: React.FC = () => (
  <Canvas
    className="!absolute inset-0"
    dpr={[1, 1.75]}
    camera={{ position: [0, 0, 6], fov: 42 }}
    gl={{ antialias: true, alpha: true }}
  >
    <ambientLight intensity={0.5} />
    <directionalLight position={[4, 5, 3]} intensity={2.6} color="#22d3ee" />
    <directionalLight position={[-5, -2, -4]} intensity={2.0} color="#ec4899" />
    <directionalLight position={[0, 3, -6]} intensity={1.4} color="#ffffff" />
    <pointLight position={[2, -3, 4]} intensity={30} color="#8b5cf6" distance={12} />
    <Blob />
  </Canvas>
);

export default HeroScene;
