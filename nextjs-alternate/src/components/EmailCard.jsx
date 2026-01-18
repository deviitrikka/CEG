"use client";

import { motion } from "framer-motion";

export default function EmailCard({ item, index, onCopy, copiedIndex }) {
  return (
    <motion.div
      className="p-4 mb-4 bg-zinc-700 rounded"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <h2 className="font-semibold">Role: {item.job.role}</h2>
      <p><strong>Skills:</strong> {item.job.skills.join(", ")}</p>
      <p><strong>Experience:</strong> {item.job.experience}</p>
      <p><strong>Job Details:</strong> {item.job.job_details}</p>

      <h3 className="mt-2 font-semibold">Generated Email:</h3>
      <div className="relative">
        <pre className="p-2 rounded text-sm bg-zinc-600 text-white overflow-auto">
          {item.email}
        </pre>
        <button
          onClick={() => onCopy(item.email, index)}
          className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
        >
          {copiedIndex === index ? "Copied!" : "Copy"}
        </button>
      </div>
    </motion.div>
  );
}

