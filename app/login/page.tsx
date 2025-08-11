/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  Stars,
  Sphere,
  TorusKnot,
  Icosahedron,
} from "@react-three/drei";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Login failed");
      }
      router.push("/homepage");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 15;
    const y = (e.clientY / window.innerHeight - 0.5) * 15;
    setTilt({ x, y });
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden font-sans"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Background */}
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <color attach="background" args={["#020006"]} />

        {/* Neon lights */}
        <pointLight position={[5, 5, 5]} intensity={2} color="#ff00ff" />
        <pointLight position={[-5, -5, 5]} intensity={2} color="#00ffff" />
        <ambientLight intensity={0.3} />

        {/* Rotating Wireframe */}
        <Float speed={1.2} rotationIntensity={1} floatIntensity={0.5}>
          <Icosahedron args={[3, 1]}>
            <meshStandardMaterial
              color="#0d001a"
              wireframe
              emissive="#ff00ff"
              emissiveIntensity={0.4}
            />
          </Icosahedron>
        </Float>

        {/* Spheres */}
        <Float speed={2} rotationIntensity={2} floatIntensity={2}>
          <Sphere args={[1, 64, 64]} position={[-3, 1, -1]}>
            <meshStandardMaterial
              emissive="#ff00ff"
              emissiveIntensity={2}
              metalness={0.8}
              roughness={0.2}
            />
          </Sphere>
        </Float>

        <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
          <Sphere args={[0.8, 64, 64]} position={[3, -1, -2]}>
            <meshStandardMaterial
              emissive="#00ffff"
              emissiveIntensity={2}
              metalness={0.8}
              roughness={0.2}
            />
          </Sphere>
        </Float>

        {/* Torus Ring */}
        <Float speed={2} rotationIntensity={2} floatIntensity={0.5}>
          <TorusKnot args={[1.5, 0.05, 200, 32]} position={[0, 0, -2]}>
            <meshStandardMaterial
              emissive="#00ffff"
              emissiveIntensity={1.5}
              wireframe
            />
          </TorusKnot>
        </Float>

        {/* Stars */}
        <Stars radius={100} depth={50} count={6000} factor={4} fade speed={2} />

        <OrbitControls enableZoom={false} />
      </Canvas>

      {/* Modern Dark Form */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <motion.div
          style={{
            rotateX: tilt.y,
            rotateY: -tilt.x,
          }}
          animate={{
            y: [0, -5, 0],
            boxShadow: [
              "0px 0px 25px rgba(255, 0, 255, 0.25)",
              "0px 0px 40px rgba(0, 255, 255, 0.3)",
              "0px 0px 25px rgba(255, 0, 255, 0.25)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="relative p-10 rounded-3xl border border-white/10 w-full max-w-md bg-black/50 backdrop-blur-lg overflow-hidden"
        >
          {/* Animated gradient border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 blur-lg opacity-40 animate-pulse"></div>

          <h1 className="text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-300 relative z-10">
            Welcome Back
          </h1>

          {error && (
            <div className="mb-4 p-3 text-sm text-red-200 bg-red-900/40 rounded border border-red-400/30 relative z-10">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-cyan-200 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 rounded-xl bg-black/60 text-cyan-100 border border-white/20 focus:ring-2 focus:ring-pink-500 outline-none placeholder-gray-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-cyan-200 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-3 rounded-xl bg-black/60 text-cyan-100 border border-white/20 focus:ring-2 focus:ring-pink-500 outline-none placeholder-gray-500"
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500 shadow-lg"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-400 relative z-10">
            Don’t have an account?{" "}
            <a href="/register" className="text-pink-400 hover:underline">
              Sign up
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
