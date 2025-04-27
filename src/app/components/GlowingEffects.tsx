"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const GlowingEffects = ({ enabled = true }: { enabled?: boolean }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsHovering(true);

        // Reset hovering state after a delay if mouse stops moving
        const timeout = setTimeout(() => {
          setIsHovering(false);
        }, 3000);

        return () => clearTimeout(timeout);
      };

      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  // Don't render if not enabled or no dimensions yet
  if (!enabled || dimensions.width === 0) return null;

  // Calculate positions for the radial gradients
  const radialGradients = [
    {
      x: dimensions.width * 0.2,
      y: dimensions.height * 0.3,
      size: dimensions.width * 0.4,
      color: "rgba(231, 84, 128, 0.08)", // pink
      pulseSize: [1, 1.2, 1],
      pulseOpacity: [0.08, 0.15, 0.08],
      duration: 8,
    },
    {
      x: dimensions.width * 0.7,
      y: dimensions.height * 0.6,
      size: dimensions.width * 0.35,
      color: "rgba(255, 182, 193, 0.1)", // light pink
      pulseSize: [1, 1.3, 1],
      pulseOpacity: [0.1, 0.18, 0.1],
      duration: 10,
    },
    {
      x: dimensions.width * 0.5,
      y: dimensions.height * 0.8,
      size: dimensions.width * 0.3,
      color: "rgba(255, 215, 0, 0.05)", // gold
      pulseSize: [1, 1.25, 1],
      pulseOpacity: [0.05, 0.12, 0.05],
      duration: 12,
    },
  ];

  // Mouse follower glow
  const mouseGlow = {
    x: mousePosition.x,
    y: mousePosition.y,
    size: dimensions.width * 0.2,
    color: "rgba(231, 84, 128, 0.15)",
    opacity: isHovering ? 0.15 : 0,
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Fixed position radial gradients */}
      {radialGradients.map((gradient, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          initial={{
            x: gradient.x - gradient.size / 2,
            y: gradient.y - gradient.size / 2,
            width: gradient.size,
            height: gradient.size,
            background: gradient.color,
            opacity: gradient.pulseOpacity[0],
          }}
          animate={{
            width: [
              gradient.size,
              gradient.size * gradient.pulseSize[1],
              gradient.size,
            ],
            height: [
              gradient.size,
              gradient.size * gradient.pulseSize[1],
              gradient.size,
            ],
            opacity: gradient.pulseOpacity,
          }}
          transition={{
            duration: gradient.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `radial-gradient(circle, ${gradient.color.replace(
              /[\d.]+\)$/,
              "0.7)"
            )} 0%, transparent 70%)`,
          }}
        />
      ))}

      {/* Mouse follower glow */}
      <motion.div
        className="absolute rounded-full"
        animate={{
          x: mouseGlow.x - mouseGlow.size / 2,
          y: mouseGlow.y - mouseGlow.size / 2,
          width: mouseGlow.size,
          height: mouseGlow.size,
          opacity: mouseGlow.opacity,
        }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 100,
          opacity: { duration: 0.5 },
        }}
        style={{
          backgroundImage: `radial-gradient(circle, ${mouseGlow.color.replace(
            /[\d.]+\)$/,
            "0.6)"
          )} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
};

export default GlowingEffects;
