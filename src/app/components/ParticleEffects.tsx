"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  type: "heart" | "circle" | "star";
}

const ParticleEffects = ({ enabled = true }: { enabled?: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);

  // Create initial particles
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set dimensions
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // Handle resize
      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Initialize particles when dimensions are set
  useEffect(() => {
    if (!enabled || dimensions.width === 0) return;

    // Initialize particles
    const particleCount = Math.min(Math.floor(dimensions.width / 60), 25);
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push(createParticle(dimensions.width, dimensions.height));
    }

    particles.current = newParticles;

    // Setup canvas
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Animation loop
    const animate = () => {
      const ctx = canvas?.getContext("2d");
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.current.forEach((p, index) => {
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Check boundaries
        if (
          p.x < -50 ||
          p.x > dimensions.width + 50 ||
          p.y < -50 ||
          p.y > dimensions.height + 50
        ) {
          // Reset particle if it's off-screen
          particles.current[index] = createParticle(
            dimensions.width,
            dimensions.height
          );
        }

        // Draw particle
        drawParticle(ctx, p);
      });

      // Request next frame
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [dimensions, enabled]);

  // Create a single particle
  const createParticle = (width: number, height: number): Particle => {
    const size = 12 + Math.random() * 18; // Larger size
    const types = ["heart", "circle", "star"] as const;
    const type = types[Math.floor(Math.random() * types.length)];

    // Colors - increased opacity
    const colors = [
      "rgba(231, 84, 128, 0.85)", // pink
      "rgba(255, 182, 193, 0.85)", // light pink
      "rgba(255, 215, 0, 0.85)", // gold
      "rgba(255, 105, 180, 0.85)", // hot pink
      "rgba(219, 112, 147, 0.85)", // pale violet red
    ];

    // Position - start from edges
    let x, y;
    if (Math.random() > 0.5) {
      // Start from sides
      x = Math.random() > 0.5 ? -size : width + size;
      y = Math.random() * height;
    } else {
      // Start from top/bottom
      x = Math.random() * width;
      y = Math.random() > 0.5 ? -size : height + size;
    }

    // Speed - always move towards center
    const centerX = width / 2;
    const centerY = height / 2;
    const angle = Math.atan2(centerY - y, centerX - x);
    const baseSpeed = 0.2 + Math.random() * 0.8;

    return {
      x,
      y,
      size,
      speedX: Math.cos(angle) * baseSpeed,
      speedY: Math.sin(angle) * baseSpeed,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.3 + Math.random() * 0.7,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      type,
    };
  };

  // Draw particle based on type
  const drawParticle = (ctx: CanvasRenderingContext2D, p: Particle) => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;

    if (p.type === "heart") {
      // Draw heart
      ctx.beginPath();
      ctx.moveTo(0, -p.size / 4);
      ctx.bezierCurveTo(
        p.size / 4,
        -p.size / 2,
        p.size / 2,
        -p.size / 4,
        p.size / 2,
        p.size / 4
      );
      ctx.bezierCurveTo(p.size / 2, p.size / 2, 0, p.size, 0, p.size);
      ctx.bezierCurveTo(
        0,
        p.size,
        -p.size / 2,
        p.size / 2,
        -p.size / 2,
        p.size / 4
      );
      ctx.bezierCurveTo(
        -p.size / 2,
        -p.size / 4,
        -p.size / 4,
        -p.size / 2,
        0,
        -p.size / 4
      );
      ctx.fill();
    } else if (p.type === "star") {
      // Draw star
      const spikes = 5;
      const outerRadius = p.size / 2;
      const innerRadius = p.size / 4;

      ctx.beginPath();
      ctx.moveTo(0, -outerRadius);

      for (let i = 0; i < spikes; i++) {
        const outerAngle = Math.PI / spikes - (Math.PI * 2 * i) / spikes;
        const innerAngle =
          (Math.PI * 2) / (spikes * 2) - (Math.PI * 2 * i) / spikes;

        ctx.lineTo(
          Math.cos(outerAngle) * outerRadius,
          Math.sin(outerAngle) * outerRadius
        );
        ctx.lineTo(
          Math.cos(innerAngle) * innerRadius,
          Math.sin(innerAngle) * innerRadius
        );
      }

      ctx.closePath();
      ctx.fill();
    } else {
      // Draw circle
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
      style={{ opacity: 0.8 }}
    />
  );
};

export default ParticleEffects;
