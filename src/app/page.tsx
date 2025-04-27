"use client";

import { useState, useEffect } from "react";
import Landing from "./components/Landing";
import Greeting from "./components/Greeting";
import PhotoGallery from "./components/PhotoGallery";
import TvComponent from "./components/TvComponent";
import LetterComponent from "./components/LetterComponent";
import RomanticSection from "./components/RomanticSection";
import BackgroundEffects from "./components/BackgroundEffects";
import GlowingEffects from "./components/GlowingEffects";
import ParticleEffects from "./components/ParticleEffects";
import InteractiveEffects from "./components/InteractiveEffects";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleExplore = () => {
    setShowLanding(false);
    setTimeout(() => {
      setShowContent(true);
      document.body.style.backgroundColor = "var(--pink-light)";

      // Create initial animation burst for better visibility
      setTimeout(() => {
        // Create several click effects at different positions
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Simulate clicks at various positions
        [
          { x: centerX, y: centerY },
          { x: centerX - 200, y: centerY + 100 },
          { x: centerX + 200, y: centerY - 150 },
          { x: centerX - 100, y: centerY - 200 },
          { x: centerX + 150, y: centerY + 200 },
        ].forEach((pos) => {
          const event = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: pos.x,
            clientY: pos.y,
          });
          document.dispatchEvent(event);
        });
      }, 500);
    }, 500);
  };

  // Floating hearts that follow cursor
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hearts, setHearts] = useState<
    { id: number; x: number; y: number; size: number }[]
  >([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Occasionally create a floating heart
      if (Math.random() > 0.92 && showContent) {
        const newHeart = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          size: 10 + Math.random() * 20,
        };

        setHearts((prevHearts) => [...prevHearts, newHeart]);

        // Remove heart after animation
        setTimeout(() => {
          setHearts((prevHearts) =>
            prevHearts.filter((heart) => heart.id !== newHeart.id)
          );
        }, 2000);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [showContent]);

  return (
    <>
      {/* Background effects only shown after landing screen */}
      <BackgroundEffects enabled={showContent} />
      <GlowingEffects enabled={showContent} />
      <ParticleEffects enabled={showContent} />
      <InteractiveEffects enabled={showContent} />

      <AnimatePresence>
        {showLanding && (
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50"
          >
            <Landing onExplore={handleExplore} />
          </motion.div>
        )}
      </AnimatePresence>

      {showContent && (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <section id="greeting">
            <Greeting />
          </section>

          <section id="photos">
            <PhotoGallery />
          </section>

          <section id="romantic">
            <RomanticSection />
          </section>

          <section id="videos">
            <TvComponent />
          </section>

          <section id="letter">
            <LetterComponent />
          </section>

          {/* Decorative floating hearts */}
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              className="fixed pointer-events-none z-40 text-pink-500"
              initial={{
                x: heart.x,
                y: heart.y,
                opacity: 0.8,
                scale: 0.5,
                rotate: Math.random() * 30 - 15,
              }}
              animate={{
                y: heart.y - 100 - Math.random() * 100,
                opacity: 0,
                scale: 1,
                rotate: Math.random() * 60 - 30,
              }}
              transition={{ duration: 2, ease: "easeOut" }}
              style={{ fontSize: `${heart.size}px` }}
            >
              ❤
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}
