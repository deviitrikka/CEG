"use client";

import { motion } from "framer-motion";
import EmailCard from "./EmailCard";

export default function ResultsDisplay({ results, onCopy, copiedIndex }) {
  if (results.length === 0) return null;

  return (
    <motion.div
      className="w-full max-w-3xl mt-6 p-4 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {results.map((item, index) => (
        <EmailCard
          key={index}
          item={item}
          index={index}
          onCopy={onCopy}
          copiedIndex={copiedIndex}
        />
      ))}
    </motion.div>
  );
}