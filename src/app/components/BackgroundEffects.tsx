"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface BackgroundElement {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
  type: "heart" | "flower1" | "flower2" | "sparkle" | "petal";
  delay: number;
  opacity: number;
  path?: string;
}

const BackgroundEffects = ({ enabled = true }: { enabled?: boolean }) => {
  const [elements, setElements] = useState<BackgroundElement[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Create flower petals and heart shapes
  const flowerPetal = "M15,0 C15,10 25,15 15,30 C5,15 15,10 15,0";
  const heartPath =
    "M25,12.5 C25,5.596 19.404,0 12.5,0 C5.596,0 0,5.596 0,12.5 C0,20.394 11.354,29.312 12.5,30 C13.646,29.312 25,20.394 25,12.5 Z";

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

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (!enabled || dimensions.width === 0) return;

    // Generate initial background elements
    const initialElements: BackgroundElement[] = [];
    const elementCount = Math.min(Math.floor(dimensions.width / 30), 40); // Increased count

    for (let i = 0; i < elementCount; i++) {
      initialElements.push(
        createRandomElement(dimensions.width, dimensions.height)
      );
    }

    setElements(initialElements);

    // Create new elements at intervals
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        // Increased frequency (changed from 0.7)
        setElements((prev) => {
          // Remove old elements if we have too many
          if (prev.length > 50) {
            // Increased max elements
            return [
              ...prev.slice(1),
              createRandomElement(dimensions.width, dimensions.height),
            ];
          }
          return [
            ...prev,
            createRandomElement(dimensions.width, dimensions.height),
          ];
        });
      }
    }, 600); // Reduced interval time

    return () => clearInterval(interval);
  }, [enabled, dimensions]);

  const createRandomElement = (
    width: number,
    height: number
  ): BackgroundElement => {
    const types = ["heart", "flower1", "flower2", "sparkle", "petal"] as const;
    const type = types[Math.floor(Math.random() * types.length)];

    return {
      id: Date.now() + Math.random(),
      x: Math.random() * width,
      y: Math.random() * height,
      size: 15 + Math.random() * 35,
      rotation: Math.random() * 360,
      duration: 10 + Math.random() * 25,
      type,
      delay: Math.random() * 5,
      opacity: 0.4 + Math.random() * 0.6,
      path:
        type === "petal"
          ? flowerPetal
          : type === "heart"
          ? heartPath
          : undefined,
    };
  };

  // Don't render if not enabled or no dimensions yet
  if (!enabled || dimensions.width === 0) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-20">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          initial={{
            x: element.x,
            y: element.y + 100,
            opacity: 0,
            rotate: element.rotation,
          }}
          animate={{
            x: element.x + (Math.random() * 200 - 100),
            y: -100,
            opacity: [0, element.opacity, element.opacity, 0],
            rotate: element.rotation + 360,
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            ease: "easeInOut",
            times: [0, 0.1, 0.8, 1],
          }}
          style={{
            width: element.size,
            height: element.size,
          }}
        >
          {element.type === "heart" && (
            <div className="w-full h-full text-pink-400 flex items-center justify-center">
              <svg
                viewBox="0 0 25 30"
                width="100%"
                height="100%"
                fill="currentColor"
              >
                <path d={heartPath} />
              </svg>
            </div>
          )}
          {element.type === "flower1" && (
            <div className="w-full h-full text-pink-300 flex items-center justify-center">
              <div className="relative w-full h-full">
                {[0, 72, 144, 216, 288].map((angle) => (
                  <div
                    key={angle}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <svg
                      viewBox="0 0 30 30"
                      width="100%"
                      height="100%"
                      fill="currentColor"
                    >
                      <path d={flowerPetal} />
                    </svg>
                  </div>
                ))}
                <div className="absolute top-1/2 left-1/2 w-1/4 h-1/4 rounded-full bg-yellow-400 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          )}
          {element.type === "flower2" && (
            <div className="w-full h-full text-purple-300 flex items-center justify-center">
              <div className="relative w-full h-full">
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <div
                    key={angle}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <svg
                      viewBox="0 0 30 30"
                      width="100%"
                      height="100%"
                      fill="currentColor"
                    >
                      <ellipse cx="15" cy="7" rx="7" ry="5" />
                    </svg>
                  </div>
                ))}
                <div className="absolute top-1/2 left-1/2 w-1/4 h-1/4 rounded-full bg-yellow-500 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          )}
          {element.type === "sparkle" && (
            <div
              className="w-full h-full text-gold flex items-center justify-center"
              style={{ color: "var(--gold)" }}
            >
              <svg
                viewBox="0 0 24 24"
                width="100%"
                height="100%"
                fill="currentColor"
              >
                <path d="M12,0 L14,9 L23,12 L14,15 L12,24 L10,15 L1,12 L10,9 Z" />
              </svg>
            </div>
          )}
          {element.type === "petal" && (
            <div className="w-full h-full text-pink-200 flex items-center justify-center">
              <svg
                viewBox="0 0 30 30"
                width="100%"
                height="100%"
                fill="currentColor"
              >
                <path d={flowerPetal} />
              </svg>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default BackgroundEffects;
