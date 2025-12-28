/** @format */

import { motion, AnimatePresence } from "framer-motion";

interface Props {
  image: string;
  index: number;
}

export const BannerBackground = ({ image, index }: Props) => (
  <AnimatePresence mode="popLayout">
    <motion.div
      // Changing the key triggers the AnimatePresence transition
      key={`bg-${index}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 z-0"
    >
      {/* 1. Background Image (Blurred for ambiance) */}
      <div
        className="w-full h-full bg-cover bg-center blur-3xl scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* 2. Dark Overlay */}
      {/* Provides contrast for the white text on top */}
      <div className="absolute inset-0 bg-bg-footer/60" />
    </motion.div>
  </AnimatePresence>
);