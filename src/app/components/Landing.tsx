"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface LandingProps {
  onExplore: () => void;
}

const Landing: React.FC<LandingProps> = ({ onExplore }) => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black">
      <motion.button
        className="px-8 py-3 text-xl font-medium rounded-full bg-white text-black hover:bg-gray-200 focus:outline-none transition-all"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        onClick={onExplore}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Explore
      </motion.button>
    </div>
  );
};

export default Landing;
