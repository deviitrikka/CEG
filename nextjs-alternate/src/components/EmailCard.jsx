"use client";

import { motion } from "framer-motion";

export default function EmailCard({ item, index, onCopy, copiedIndex }) {
  // Helper function to safely render values (handle objects, arrays, etc.)
  const renderValue = (value) => {
    if (value === null || value === undefined) return "N/A";
    if (typeof value === 'object') {
      // If it's an object, stringify it or extract meaningful info
      if (Array.isArray(value)) {
        return value.join(", ");
      }
      // Handle objects like {minimum: "2 years", preferred: "5 years"}
      if (value.minimum && value.preferred) {
        return `${value.minimum} (preferred: ${value.preferred})`;
      }
      // Fallback: stringify the object
      return JSON.stringify(value);
    }
    return String(value);
  };

  return (
    <motion.div
      className="p-4 mb-4 rounded"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <h2 className="font-semibold">Role: {renderValue(item.job.role)}</h2>
      <p><strong>Skills:</strong> {Array.isArray(item.job.skills) ? item.job.skills.join(", ") : renderValue(item.job.skills)}</p>
      <p><strong>Experience:</strong> {renderValue(item.job.experience)}</p>
      <p><strong>Job Details:</strong> {renderValue(item.job.job_details)}</p>

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