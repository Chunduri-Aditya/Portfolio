import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * The hero showpiece: a slowly rotating distorted icosahedron with an iridescent
 * gradient material, drifting on a Float and nudged by the pointer. Self
 * contained — no external HDRI, just scene lights. Lazy-loaded and never mounted
 * under reduced-motion / on small screens (see Hero.tsx).
 *
 * The mesh must fit inside the camera frustum or the near planes shear it flat
 * and it reads as a ball in a box. At z=6 with fov=42 the frustum half-extent
 * is 6 * tan(21deg) = 2.30 world units. MeshDistortMaterial displaces vertices
 * outward by roughly `distort`, so the real silhouette radius is about
 * scale * (1 + distort), not `scale`. It was 2.15 * 1.4 = 3.01 against a 2.30
 * budget, which is exactly why the top, sides and bottom rendered as straight
 * edges. Keep scale * (1 + distort) under about 2.1 to leave margin for Float.
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
      <mesh ref={mesh} scale={1.6}>
        <icosahedronGeometry args={[1, 24]} />
        <MeshDistortMaterial
          color="#1f7fb8"
          emissive="#0b2f4a"
          emissiveIntensity={0.45}
          roughness={0.28}
          metalness={0.35}
          clearcoat={0.9}
          clearcoatRoughness={0.25}
          distort={0.35}
          speed={1.6}
        />
      </mesh>
    </Float>
  );
}

const HeroScene: React.FC = () => (
  <Canvas
    className="!absolute -inset-[9%]"
    dpr={[1, 1.75]}
    camera={{ position: [0, 0, 6], fov: 42 }}
    gl={{ antialias: true, alpha: true }}
  >
    <ambientLight intensity={0.5} />
    <directionalLight position={[4, 5, 3]} intensity={2.6} color="#17b3b3" />
    <directionalLight position={[-5, -2, -4]} intensity={2.0} color="#e3b23c" />
    <directionalLight position={[0, 3, -6]} intensity={1.4} color="#ffffff" />
    <pointLight position={[2, -3, 4]} intensity={30} color="#22c48c" distance={12} />
    <Blob />
  </Canvas>
);

export default HeroScene;
