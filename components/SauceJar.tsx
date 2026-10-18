"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type Progress = { current: number };

// Outer glass profile (radius, height), bottom to neck
const GLASS_PROFILE = [
  new THREE.Vector2(0.0, -1.25),
  new THREE.Vector2(0.72, -1.25),
  new THREE.Vector2(0.86, -1.12),
  new THREE.Vector2(0.88, -0.7),
  new THREE.Vector2(0.88, 0.45),
  new THREE.Vector2(0.8, 0.72),
  new THREE.Vector2(0.52, 0.84),
  new THREE.Vector2(0.48, 0.96),
  new THREE.Vector2(0.48, 1.0),
];

// Sauce fills the inside of the glass
const SAUCE_PROFILE = [
  new THREE.Vector2(0.0, -1.1),
  new THREE.Vector2(0.7, -1.1),
  new THREE.Vector2(0.8, -0.68),
  new THREE.Vector2(0.8, 0.42),
  new THREE.Vector2(0.72, 0.58),
  new THREE.Vector2(0.0, 0.58),
];

function makeLabelTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const glow = ctx.createRadialGradient(512, 230, 40, 512, 230, 380);
    glow.addColorStop(0, "rgba(255, 90, 0, 0.55)");
    glow.addColorStop(1, "rgba(255, 90, 0, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ff5a00";
    ctx.font = "bold 170px Anton, Impact, sans-serif";
    ctx.fillText("FLAMME", 512, 220);

    ctx.fillStyle = "#fff4e8";
    ctx.font = "bold 46px Inter, sans-serif";
    ctx.fillText("PIMENT FUMÉ", 512, 370);

    ctx.font = "28px Inter, sans-serif";
    ctx.fillStyle = "rgba(255, 244, 232, 0.7)";
    ctx.fillText("250 ML · SAUCE GOURMET", 512, 430);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeSoftTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  return new THREE.CanvasTexture(canvas);
}

// Lights the scene with a neutral studio room so the glass has reflections to show
function StudioEnvironment() {
  const scene = useThree((state) => state.scene);
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    return () => {
      scene.environment = null;
      envTexture.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);

  return null;
}

function Steam() {
  const { geometry, seeds, material } = useMemo(() => {
    const count = 70;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    const randomSeeds = Array.from({ length: count }, () => Math.random());
    const mat = new THREE.PointsMaterial({
      size: 0.32,
      map: makeSoftTexture(),
      color: "#ffd2b0",
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
    });
    return { geometry: geo, seeds: randomSeeds, material: mat };
  }, []);

  useFrame(({ clock }) => {
    const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;
    const t = clock.elapsedTime;
    seeds.forEach((seed, i) => {
      const life = (t * 0.16 + seed) % 1;
      const y = 1.05 + life * 2.2;
      const spread = 0.12 + life * 0.4;
      const angle = t * 0.8 + seed * 40;
      attribute.setXYZ(i, Math.cos(angle) * spread, y, Math.sin(angle) * spread);
    });
    attribute.needsUpdate = true;
  });

  return <points geometry={geometry} material={material} />;
}

function SpiceParticles() {
  const { geometry, seeds, material } = useMemo(() => {
    const count = 45;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
    const randomSeeds = Array.from({ length: count }, () => Math.random());
    const mat = new THREE.PointsMaterial({
      size: 0.055,
      color: "#ffb13b",
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });
    return { geometry: geo, seeds: randomSeeds, material: mat };
  }, []);

  useFrame(({ clock }) => {
    const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;
    const t = clock.elapsedTime;
    seeds.forEach((seed, i) => {
      const radius = 1.5 + seed * 0.9;
      const angle = seed * Math.PI * 2 + t * (0.15 + seed * 0.3);
      const y = Math.sin(t * 0.5 + seed * 10) * 1.1;
      attribute.setXYZ(i, Math.cos(angle) * radius, y, Math.sin(angle) * radius);
    });
    attribute.needsUpdate = true;
  });

  return <points geometry={geometry} material={material} />;
}

function Jar({ progress }: { progress: Progress }) {
  const group = useRef<THREE.Group>(null);
  const label = useMemo(() => makeLabelTexture(), []);
  const glassGeometry = useMemo(() => new THREE.LatheGeometry(GLASS_PROFILE, 96), []);
  const sauceGeometry = useMemo(() => new THREE.LatheGeometry(SAUCE_PROFILE, 96), []);

  useFrame(({ clock, pointer }) => {
    const jar = group.current;
    if (!jar) return;
    const t = clock.elapsedTime;
    // Idle spin, plus scroll-driven turns, plus a slight tilt toward the pointer
    jar.rotation.y = t * 0.25 + progress.current * Math.PI * 2;
    jar.rotation.x = THREE.MathUtils.lerp(jar.rotation.x, pointer.y * 0.12, 0.05);
    jar.position.y = Math.sin(t * 1.2) * 0.04;
  });

  return (
    <group ref={group}>
      {/* Glass shell with physical transmission for refraction */}
      <mesh geometry={glassGeometry}>
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={1}
          thickness={0.6}
          roughness={0.05}
          ior={1.45}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.4}
          attenuationColor="#ffb07a"
          attenuationDistance={1.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Sauce */}
      <mesh geometry={sauceGeometry}>
        <meshPhysicalMaterial
          color="#ff4a00"
          emissive="#ff2a00"
          emissiveIntensity={0.25}
          roughness={0.2}
          transmission={0.5}
          thickness={1}
          clearcoat={0.6}
        />
      </mesh>

      {/* Label */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.95, 96, 1, true]} />
        <meshStandardMaterial map={label} side={THREE.DoubleSide} roughness={0.4} metalness={0} />
      </mesh>

      {/* Black cap */}
      <mesh position={[0, 1.12, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.28, 64]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.3} metalness={0.7} />
      </mesh>

      <Steam />
      <SpiceParticles />
    </group>
  );
}

function Scene({ progress }: { progress: Progress }) {
  const light = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    // Orange key light orbits the jar for moving highlights on the glass
    light.current?.position.set(Math.sin(t * 0.8) * 3.2, 1.6 + Math.cos(t * 0.6) * 0.8, 2.6);
  });

  return (
    <>
      <StudioEnvironment />
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} color="#fff3e6" />
      <pointLight ref={light} color="#ff6a1a" intensity={30} distance={10} />
      <Jar progress={progress} />
      <ContactShadows position={[0, -1.5, 0]} opacity={0.6} scale={6} blur={2.4} far={3} color="#ff5a00" />
    </>
  );
}

export default function SauceJar({ progress }: { progress: Progress }) {
  // Pull the camera back on portrait screens so the whole jar fits
  const isPortrait = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.2, isPortrait ? 7.4 : 5.4], fov: 34 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene progress={progress} />
    </Canvas>
  );
}
