"use client";

import { motion } from "framer-motion";

const RomanticSection = () => {
  const specialMoments = [
    {
      title: "Our Inside Jokes",
      description: "The secret language only we understand",
    },
    {
      title: "Our Dreams Together",
      description: "All the beautiful plans we're making",
    },
    {
      title: "Our Song",
      description: "The melody that always brings us back to each other",
    },
  ];

  // Function to scroll to videos section
  const scrollToVideos = () => {
    const videosSection = document.getElementById("videos-section");
    if (videosSection) {
      videosSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="min-h-screen py-16 px-4"
      style={{
        background: `linear-gradient(135deg, var(--pink-light) 0%, var(--pink-medium) 100%)`,
      }}
    >
      <div className="container mx-auto">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl mb-6 sm:mb-8 text-center romantic-text"
          style={{ color: "var(--pink-dark)" }}
        >
          Our Love Story
        </h2>

        <p
          className="text-lg sm:text-xl text-center mb-10 sm:mb-16 max-w-2xl mx-auto"
          style={{ color: "rgba(0,0,0,0.7)" }}
        >
          Every moment with you feels like a page from a beautiful, never-ending
          love story
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 max-w-5xl mx-auto">
          {specialMoments.map((moment, index) => (
            <motion.div
              key={index}
              className="bg-white bg-opacity-75 p-5 sm:p-6 rounded-lg shadow-md relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
            >
              {/* Decorative element */}
              <div className="absolute -top-4 -right-4 w-12 sm:w-16 h-12 sm:h-16 bg-pink-200 rounded-full opacity-50"></div>

              <h3
                className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 romantic-text"
                style={{ color: "var(--pink-dark)" }}
              >
                {moment.title}
              </h3>
              <p className="text-gray-700 elegant-text">{moment.description}</p>

              {/* Heart decoration */}
              <div className="absolute bottom-3 right-3 text-pink-400 opacity-50 text-xl sm:text-2xl">
                ❤
              </div>
            </motion.div>
          ))}
        </div>

        {/* Button to Watch Our Videos */}
        <div className="text-center mt-16 mb-8">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-lg rounded-full shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToVideos}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Watch Our Videos ❤
          </motion.button>
          <motion.p
            className="mt-3 text-pink-700 elegant-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Click to see our special moments together
          </motion.p>
        </div>

        {/* Floating elements */}
        <div className="relative h-32 sm:h-40 mt-12 sm:mt-16">
          {["❤", "✨", "💕", "✨", "❤", "✨"].map((symbol, index) => (
            <motion.div
              key={index}
              className="absolute text-lg sm:text-xl md:text-2xl text-pink-400"
              initial={{
                x: 100 * (index - 2.5),
                y: 0,
                opacity: 0,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 0.8, 0.6],
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  duration: 2 + index * 0.5,
                  ease: "easeInOut",
                },
                opacity: {
                  delay: index * 0.3,
                  duration: 1,
                },
              }}
              style={{
                left: `${(index + 1) * 10}%`,
              }}
            >
              {symbol}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RomanticSection;
