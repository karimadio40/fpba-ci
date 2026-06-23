import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import styles from './Hero.module.css';

/* -------- Animated Particle Field -------- */
function ParticleField() {
  const ref = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const count = 2500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const orangeColor = new THREE.Color('#F26A1F');
    const whiteColor = new THREE.Color('#FFFFFF');

    for (let i = 0; i < count; i++) {
      // Sphere distribution
      const radius = 2.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Mix orange and white colors
      const mixFactor = Math.random();
      const color = mixFactor > 0.6 ? orangeColor : whiteColor;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    ref.current.rotation.x = time * 0.04;
    ref.current.rotation.y = time * 0.06;
    ref.current.rotation.z = time * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} colors={colors}>
      <PointMaterial
        vertexColors
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </Points>
  );
}

/* -------- Pulsing Core Sphere -------- */
function CoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scale = 1 + Math.sin(time * 1.5) * 0.06;
    meshRef.current.scale.setScalar(scale);
    glowRef.current.scale.setScalar(scale * 1.3);
    glowRef.current.material.opacity = 0.08 + Math.sin(time * 1.5) * 0.04;
  });

  return (
    <>
      {/* Glow halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.95, 32, 32]} />
        <meshBasicMaterial color="#F26A1F" transparent opacity={0.1} side={THREE.BackSide} />
      </mesh>
      {/* Core sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshStandardMaterial
          color="#F26A1F"
          emissive="#C9521A"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.8}
        />
      </mesh>
    </>
  );
}

/* -------- Orbiting Ring -------- */
function OrbitRing({ radius, speed, tilt }: { radius: number; speed: number; tilt: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.z = time * speed;
  });

  return (
    <group ref={groupRef} rotation={[tilt, 0, 0]}>
      <mesh>
        <torusGeometry args={[radius, 0.006, 16, 120]} />
        <meshBasicMaterial color="#F26A1F" transparent opacity={0.35} />
      </mesh>
      {/* Orbiting dot */}
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );
}

/* -------- Scene -------- */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#F26A1F" />
      <pointLight position={[-5, -5, -5]} intensity={0.6} color="#FFFFFF" />
      <CoreSphere />
      <ParticleField />
      <OrbitRing radius={1.5} speed={0.4} tilt={0.3} />
      <OrbitRing radius={2.0} speed={-0.25} tilt={1.0} />
      <OrbitRing radius={2.5} speed={0.15} tilt={0.7} />
    </>
  );
}

/* -------- Exported Component -------- */
const HeroCanvas: React.FC = () => {
  return (
    <div className={styles.canvasWrapper}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
