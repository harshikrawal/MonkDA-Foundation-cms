"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ThemeManager() {
  const { scrollYProgress } = useScroll();

  // Transition between black, very dark gray, and a deep obsidian
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["#000000", "#09090b", "#020617", "#000000"],
  );

  return (
    <motion.div
      style={{ backgroundColor }}
      className="fixed inset-0 -z-10 transition-colors duration-1000"
    />
  );
}
