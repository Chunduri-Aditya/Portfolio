import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

/**
 * The hero showpiece: a slowly rotating distorted icosahedron with an iridescent
 * gradient material, drifting on a Float and nudged by the pointer. Lazy-loaded
 * and never mounted under reduced-motion / on small screens (see Hero.tsx).
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
          color="#8b5cf6"
          emissive="#3b1d80"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.6}
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
    <ambientLight intensity={0.6} />
    <directionalLight position={[4, 5, 3]} intensity={2.2} color="#22d3ee" />
    <directionalLight position={[-5, -2, -4]} intensity={1.6} color="#ec4899" />
    <Blob />
    <Environment preset="city" />
  </Canvas>
);

export default HeroScene;
