"use client";

import { motion } from "framer-motion";
import EmailTypeSelector from "./EmailTypeSelector";

export default function URLInputForm({ 
  url, 
  setUrl, 
  emailType, 
  setEmailType, 
  loading, 
  onGenerate,
  error 
}) {
  return (
    <motion.div
      className="w-full max-w-2xl p-6 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-2xl font-bold mb-4 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Cold Email Generator
      </motion.h1>
      
      <motion.input
        type="text"
        placeholder="Enter an URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 mb-4 rounded bg-zinc-700 text-white"
        whileFocus={{ scale: 1.01 }}
      />

      <div className="flex gap-4">
        <EmailTypeSelector
          value={emailType}
          onValueChange={setEmailType}
          disabled={loading}
        />

        <motion.button
          onClick={onGenerate}
          className="px-6 bg-white text-zinc-900 py-2 rounded font-bold disabled:opacity-50 whitespace-nowrap"
          disabled={!url || !emailType || loading}
          whileHover={{ scale: 1.05 }}
        >
          {loading ? "Processing..." : "Generate"}
        </motion.button>
      </div>

      {error && (
        <motion.p
          className="text-red-400 mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}

