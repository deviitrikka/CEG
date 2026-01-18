"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <motion.div
      className="absolute inset-0 bg-linear-to-r from-zinc-800 to-black opacity-50"
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      style={{ backgroundSize: "200% 200%" }}
    />
  );
}

