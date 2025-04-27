"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";

const TvComponent = () => {
  // Placeholder videos - replace with actual video URLs later
  const videos = [
    "/images/1.MOV", // Placeholder, replace with actual videos
    "/images/2.MOV", // Placeholder, replace with actual videos
    "/images/3.MOV", // Placeholder, replace with actual videos
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    setIsPlaying(true);
  };

  const handlePrevVideo = () => {
    setCurrentVideoIndex(
      (prevIndex) => (prevIndex - 1 + videos.length) % videos.length
    );
    setIsPlaying(true);
  };

  return (
    <div
      className="min-h-screen py-20 px-4"
      style={{ backgroundColor: "var(--pink-light)" }}
      id="videos-section"
    >
      <div className="container mx-auto">
        <h2
          className="text-4xl md:text-5xl mb-12 text-center romantic-text"
          style={{ color: "var(--pink-dark)" }}
        >
          Our Special Moments
        </h2>

        <motion.div
          className="vintage-tv mx-auto relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* TV Top */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-1/2 h-6 bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-xl"></div>

          {/* TV Body */}
          <div className="bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 rounded-xl p-6 md:p-8 shadow-2xl max-w-4xl mx-auto">
            {/* TV Antenna */}
            <div className="absolute -top-20 left-1/3 transform -translate-x-1/2 w-1 h-14 bg-gray-800 rotate-12">
              <div className="w-12 h-1 bg-gray-800 absolute top-0 -right-11 rotate-45"></div>
            </div>
            <div className="absolute -top-20 right-1/3 transform translate-x-1/2 w-1 h-14 bg-gray-800 -rotate-12">
              <div className="w-12 h-1 bg-gray-800 absolute top-0 -left-11 -rotate-45"></div>
            </div>

            {/* TV Screen with Rounded Corners */}
            <div className="relative rounded-lg overflow-hidden border-8 border-gray-900 shadow-inner mb-6 z-10">
              <div className="aspect-video bg-black relative">
                <ReactPlayer
                  url={videos[currentVideoIndex]}
                  width="100%"
                  height="100%"
                  playing={isPlaying}
                  controls={true}
                  onPause={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  style={{ position: "absolute", top: 0, left: 0 }}
                />
              </div>
            </div>

            {/* TV Controls Panel */}
            <div className="bg-gray-800 rounded-lg p-4 flex justify-center space-x-6 relative">
              {/* Decorative knobs */}
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 flex space-x-4">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 border-2 border-gray-600"></div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 border-2 border-gray-600"></div>
              </div>

              {/* Control buttons */}
              <motion.button
                className="px-6 py-2 bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-full hover:bg-pink-600 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevVideo}
              >
                Previous
              </motion.button>

              <motion.button
                className="px-6 py-2 bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-full hover:bg-pink-600 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? "Pause" : "Play"}
              </motion.button>

              <motion.button
                className="px-6 py-2 bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-full hover:bg-pink-600 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextVideo}
              >
                Next
              </motion.button>

              {/* Speaker grille */}
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-8 bg-gray-900 rounded-sm overflow-hidden">
                <div className="grid grid-cols-4 grid-rows-3 gap-0.5 p-1">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="bg-gray-700 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* TV Stand */}
          <div className="w-1/3 h-8 bg-gradient-to-b from-gray-700 to-gray-900 mx-auto mt-1 rounded-b-lg"></div>
          <div className="w-1/4 h-3 bg-gray-900 mx-auto rounded-lg"></div>
        </motion.div>

        <p className="text-center mt-8 mb-2 text-pink-800 elegant-text">
          Video {currentVideoIndex + 1} of {videos.length}
        </p>

        <p className="text-center max-w-md mx-auto text-sm text-pink-700">
          Kulitan momints HEHEHE.
        </p>
      </div>
    </div>
  );
};

export default TvComponent;
