"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const PhotoGallery = () => {
  // Placeholder image URLs - replace with actual photos later
  const placeholderImages = [
    "/images/labi.jpg",
    "/images/9.jpg",
    "/images/bebe1.jpg",
    "/images/bebe2.jpg",
    "/images/bebe3.jpg",
    "/images/bebe4.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % placeholderImages.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [placeholderImages.length]);

  return (
    <div
      className="min-h-screen py-20 px-4"
      style={{ backgroundColor: "var(--pink-light)" }}
    >
      <div className="container mx-auto">
        <h2
          className="text-4xl md:text-5xl mb-12 text-center romantic-text"
          style={{ color: "var(--pink-dark)" }}
        >
          Our Moments Together
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderImages.map((image, index) => (
            <motion.div
              key={index}
              className="rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                y: [0, Math.random() * -15, 0],
                x: [0, Math.random() * 10, 0],
              }}
              transition={{
                opacity: { duration: 1, delay: index * 0.2 },
                y: {
                  repeat: Infinity,
                  duration: 3 + Math.random() * 2,
                  ease: "easeInOut",
                },
                x: {
                  repeat: Infinity,
                  duration: 4 + Math.random() * 3,
                  ease: "easeInOut",
                },
              }}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <img
                src={image}
                alt={`Our Photo ${index + 1}`}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-white bg-opacity-90">
                <p className="text-pink-800 elegant-text text-center">
                  Memory #{index + 1}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
