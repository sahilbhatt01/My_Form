// app/page.jsx  (or pages/index.jsx) — "use client" is required for Next.js app router client components
"use client";

import React, { useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  Stars,
  TorusKnot,
  PresentationControls,
} from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

/* -------------------------
   3D Subcomponents
   -------------------------*/

// Floating particle cloud (Points)
function FloatingParticles({ count = 300, spread = 25 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) arr[i] = (Math.random() - 0.5) * spread;
    return arr;
  }, [count, spread]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} sizeAttenuation transparent opacity={0.9} />
    </points>
  );
}

// Interactive wireframe sphere with hover glow
function InteractiveSphere({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += 0.2 * delta;
      // subtle bob
      ref.current.position.y = 0.2 * Math.sin(state.clock.elapsedTime * 0.6);
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <group position={position} ref={ref}>
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          castShadow
        >
          <sphereGeometry args={[1.1, 48, 48]} />
          {/* inner translucent body */}
          <meshStandardMaterial
            metalness={0.6}
            roughness={0.1}
            transparent
            opacity={hovered ? 0.35 : 0.25}
            color={hovered ? "#9be7ff" : "#66d0ff"}
            emissive={hovered ? "#66e6ff" : "#2da7ff"}
            emissiveIntensity={hovered ? 0.8 : 0.2}
          />
        </mesh>

        {/* wireframe shell */}
        <mesh>
          <sphereGeometry args={[1.35, 32, 32]} />
          <meshBasicMaterial
            color={hovered ? "#ffd6ff" : "#b8b8ff"}
            wireframe
            toneMapped={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Torus knots that slowly rotate
function FloatingTorus({ pos = [2.8, 1.2, -1] as [number, number, number], color = "#ff6ad5" }: { pos?: [number, number, number]; color?: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.x += 0.5 * delta;
  });

  return (
    <Float speed={0.7} rotationIntensity={0.8} floatIntensity={0.5}>
      <group position={pos} ref={ref}>
        <TorusKnot args={[0.45, 0.12, 128, 20]}>
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.25} />
        </TorusKnot>
      </group>
    </Float>
  );
}

// Floating cubes spread for depth
function FloatingCubes({ amount = 8 }) {
  const cubes = useMemo(() => {
    return new Array(amount).fill(0).map(() => ({
      pos: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 6,
        -1 - Math.random() * 6,
      ] as [number, number, number],
      scale: 0.5 + Math.random() * 0.9,
      rotSpeed: 0.2 + Math.random() * 0.9,
    }));
  }, [amount]);

  return (
    <>
      {cubes.map((c, i) => (
        <Float
          key={i}
          speed={0.6 + i * 0.02}
          rotationIntensity={0.6}
          floatIntensity={0.3 + (i % 3) * 0.1}
        >
          <mesh
            position={c.pos}
            scale={c.scale}
            rotation={[Math.random(), Math.random(), Math.random()]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              metalness={0.5}
              roughness={0.7}
              color={i % 2 ? "#7bd389" : "#ffd27a"}
              opacity={0.9}
              transparent
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/* -------------------------
   Main background 3D canvas
   -------------------------*/
function Background3D() {
  return (
    <Canvas
      className="absolute inset-0 z-0"
      camera={{ position: [0, 0, 7], fov: 60 }}
      shadows
    >
      {/* ambient + directional lights */}
      <ambientLight intensity={0.45} />
      <directionalLight
        intensity={0.7}
        position={[5, 5, 5]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Stars for depth (drei) */}
      <Stars radius={100} depth={60} count={6000} factor={4} fade />

      {/* Particles */}
      <FloatingParticles count={220} spread={40} />

      {/* Main interactive sphere in center */}
      <PresentationControls
        global
        rotation={[0, 0.3, 0]}
        polar={[-0.4, 0.4]}
        azimuth={[-0.5, 0.5]}
      >
        <InteractiveSphere position={[0, 0, 0]} />
        {/* small inner glowing orb as accent (Html label example) */}
        <mesh position={[0, -1.6, -0.4]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshBasicMaterial color="#fff" toneMapped={false} />
        </mesh>
      </PresentationControls>

      {/* Torus knots */}
      <FloatingTorus pos={[-3.2, 1.6, -2.2]} color="#ff8bdb" />
      <FloatingTorus pos={[3.0, -1.8, -2.8]} color="#5ef0c6" />

      {/* Floating cubes for depth */}
      <FloatingCubes amount={10} />

      {/* subtle orbit controls: user can rotate but not zoom/pan */}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.12} />

      {/* fog for depth (subtle) */}
      <fog attach="fog" args={["#000000", 8, 30]} />
    </Canvas>
  );
}

/* -------------------------
   Full Page Component
   -------------------------*/
export default function Page() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/login");
  };

  return (
    <main className="relative min-h-screen w-full text-white bg-gradient-to-br from-indigo-800 via-purple-900 to-black overflow-x-hidden">
      {/* 3D Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Background3D />
      </div>

      {/* Content Container (above canvas) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Hero */}
        <section className="flex flex-col items-center justify-center text-center min-h-[72vh] py-24">
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-block bg-white/8 border border-white/10 px-3 py-1 rounded-full text-sm mb-4"
          >
            🚀 New — Beta invites open
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg max-w-4xl"
          >
            Immersive tools for builders — beautiful, fast, and extensible.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.9 }}
            className="mt-6 text-lg max-w-2xl opacity-90"
          >
            Combine powerful APIs with delightful UI and immersive 3D visuals to create products that stand out.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-8 flex gap-4 flex-wrap justify-center"
          >
            <button
              onClick={handleButtonClick}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl font-semibold"
            >
              Get Started
            </button>
            <a
              href="#features"
              className="px-6 py-3 rounded-full border border-white/20 backdrop-blur-sm hover:bg-white/5"
            >
              Learn More
            </a>
          </motion.div>

          <div className="mt-8 text-sm text-white/60 animate-bounce">↓ Scroll</div>
        </section>

        {/* Features */}
        <section id="features" className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Blazing APIs",
                desc: "Low-latency endpoints and SDKs for all major languages.",
                icon: "⚡",
              },
              {
                title: "Interactive 3D",
                desc: "Built-in three.js components for dashboards, previews, and visualizers.",
                icon: "🪐",
              },
              {
                title: "Enterprise-ready",
                desc: "Role-based access, webhooks, and predictable scaling.",
                icon: "🔒",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="opacity-80 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="py-12">
          <div className="bg-white/5 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { num: "12k+", label: "Developers" },
              { num: "850+", label: "Integrations" },
              { num: "99.99%", label: "Uptime" },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-3xl md:text-4xl font-bold">{s.num}</p>
                <p className="opacity-80">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works (timeline-like) */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">How it works</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Sign up", desc: "Create an account and get API keys." },
              { step: "2", title: "Connect", desc: "Add integrations, webhooks, and secrets." },
              { step: "3", title: "Build", desc: "Ship features with SDKs and visual tools." },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="p-6 bg-white/4 rounded-xl border border-white/10 text-center"
              >
                <div className="mx-auto w-12 h-12 rounded-full bg-white/8 flex items-center justify-center font-semibold mb-3">
                  {t.step}
                </div>
                <h4 className="font-semibold mb-2">{t.title}</h4>
                <p className="text-sm opacity-85">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials (simple) */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Trusted by builders</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {  quote: "The 3D previews helped our product conversions." },
              {  quote: "Integrations were easy — solid docs." },
              {  quote: "The platform scaled with zero friction." },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="p-6 bg-white/5 rounded-xl border border-white/10"
              >
                <p className="italic mb-3">“{t.quote}”</p>
                {/* <p className="font-semibold text-sm">{t.name}</p> */}
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Footer */}
        <footer className="py-16">
          <div className="bg-gradient-to-r from-purple-700 to-indigo-700 p-10 rounded-3xl text-center">
            <h3 className="text-2xl font-bold mb-3">Ready to build with us?</h3>
            <p className="opacity-90 mb-6">Sign up to claim your beta access and join the community.</p>
            <button
              onClick={handleButtonClick}
              className="px-10 py-3 rounded-full bg-white text-black font-semibold shadow-xl"
            >
              Get Beta Access
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}
