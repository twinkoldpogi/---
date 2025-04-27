"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Greeting = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center py-12 px-4"
      style={{ backgroundColor: "var(--pink-light)" }}
    >
      {/* Photo with tilted style above the text */}
      <motion.div
        className="mb-12 relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          transform: "rotate(-5deg)",
          transformOrigin: "center",
        }}
      >
        <div className="polaroid-frame">
          <div className="polaroid-container">
            {/* Replace with your actual photo */}
            <Image
              src="/images/lab1.jpg"
              alt="Birthday memory"
              width={270}
              height={220}
              className="polaroid-photo"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="text-center relative"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
      >
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 romantic-text text-pink-600"
          style={{
            color: "var(--pink-dark)",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Happy Birthday, Lovey!
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
        >
          <p className="text-lg sm:text-xl md:text-2xl text-pink-800 mb-6 md:mb-12 elegant-text">
            A special day for the most special person in my life
          </p>

          <motion.div
            className="w-24 h-1 bg-pink-400 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 150 }}
            transition={{ delay: 1.5, duration: 1 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Greeting;
