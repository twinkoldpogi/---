"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScatterParticle {
  id: string;
  x: number;
  y: number;
  size: number;
  angle: number;
  distance: number;
  color: string;
  type: "heart" | "star" | "circle";
}

const InteractiveEffects = ({ enabled = true }: { enabled?: boolean }) => {
  const [clickPosition, setClickPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [particles, setParticles] = useState<ScatterParticle[]>([]);

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (e: MouseEvent) => {
      // Set click position
      setClickPosition({ x: e.clientX, y: e.clientY });

      // Generate particles
      const newParticles: ScatterParticle[] = [];
      const particleCount = 12 + Math.floor(Math.random() * 8);

      const types = ["heart", "star", "circle"] as const;
      const colors = [
        "#e75480", // pink
        "#ffb6c1", // light pink
        "#ff69b4", // hot pink
        "#ffd700", // gold
        "#f8c8dc", // pale pink
      ];

      // Current timestamp to ensure uniqueness across batches
      const timestamp = Date.now();

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: `particle-${timestamp}-${i}-${Math.random()
            .toString(36)
            .substring(2, 9)}`,
          x: e.clientX,
          y: e.clientY,
          size: 5 + Math.random() * 15,
          angle: Math.random() * Math.PI * 2,
          distance: 50 + Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: types[Math.floor(Math.random() * types.length)],
        });
      }

      setParticles((prev) => [...prev, ...newParticles]);

      // Clear particles after animation
      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => !newParticles.some((np) => np.id === p.id))
        );
      }, 1500);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [enabled]);

  // Render particle shape based on type
  const renderParticleShape = (
    type: "heart" | "star" | "circle",
    color: string
  ) => {
    switch (type) {
      case "heart":
        return (
          <svg viewBox="0 0 25 25" fill={color} width="100%" height="100%">
            <path d="M12.5,21.5c-1-0.9-10-8.2-10-14c0-5.5,7.5-7.1,10-0.4c2.5-6.7,10-5.1,10,0.4C22.5,13.3,13.5,20.6,12.5,21.5z" />
          </svg>
        );
      case "star":
        return (
          <svg viewBox="0 0 25 25" fill={color} width="100%" height="100%">
            <path d="M12.5,1.6l2.7,8.4h8.7l-7,5.1l2.7,8.3l-7-5.1l-7,5.1l2.7-8.3l-7-5.1h8.7L12.5,1.6z" />
          </svg>
        );
      case "circle":
      default:
        return (
          <div
            className="w-full h-full rounded-full"
            style={{ backgroundColor: color }}
          />
        );
    }
  };

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <AnimatePresence>
        {clickPosition &&
          particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute"
              initial={{
                x: particle.x,
                y: particle.y,
                scale: 0.2,
                opacity: 1,
              }}
              animate={{
                x: particle.x + Math.cos(particle.angle) * particle.distance,
                y: particle.y + Math.sin(particle.angle) * particle.distance,
                scale: 0.8,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1 + Math.random() * 0.5,
                ease: "easeOut",
              }}
              style={{
                width: particle.size,
                height: particle.size,
              }}
            >
              {renderParticleShape(particle.type, particle.color)}
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};

// Custom click effect hook that can be used on any element
export const useClickEffect = () => {
  const [clickEffects, setClickEffects] = useState<
    { id: string; x: number; y: number }[]
  >([]);

  const createClickEffect = (e: React.MouseEvent) => {
    const newEffect = {
      id: `effect-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      x: e.clientX,
      y: e.clientY,
    };

    setClickEffects((prev) => [...prev, newEffect]);

    // Remove effect after animation completes
    setTimeout(() => {
      setClickEffects((prev) =>
        prev.filter((effect) => effect.id !== newEffect.id)
      );
    }, 1000);
  };

  return { clickEffects, createClickEffect };
};

export default InteractiveEffects;
