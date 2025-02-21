import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function App() {
  const [url, setUrl] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleSubmit = async (endpoint) => {
    setLoading(true);
    setError("");
    setResults([]);
    try {
      const response = await axios.post(`http://localhost:8000/${endpoint}`, { url });
      setResults(response.data.results);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    }
    setLoading(false);
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }).catch(err => {
      console.error("Failed to copy text:", err);
    });
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 bg-gray-900 text-white">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-50"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      <motion.div
        className="w-full max-w-2xl p-6 bg-gray-800 rounded-lg shadow-lg relative z-10"
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
          placeholder="Enter a URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 mb-4 border rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500"
          whileFocus={{ scale: 1.05 }}
        />

        {/* Two Buttons for Different Email Types */}
        <div className="flex gap-4">
          <motion.button
            onClick={() => handleSubmit("process1")}
            className="w-1/2 bg-green-500 text-white py-2 rounded disabled:opacity-50"
            disabled={!url || loading}
            whileHover={{ scale: 1.05 }}
          >
            {loading ? "Processing..." : "Email as Individual"}
          </motion.button>

          <motion.button
            onClick={() => handleSubmit("process2")}
            className="w-1/2 bg-blue-500 text-white py-2 rounded disabled:opacity-50"
            disabled={!url || loading}
            whileHover={{ scale: 1.05 }}
          >
            {loading ? "Processing..." : "Email as Business Executive"}
          </motion.button>
        </div>

        {error && <motion.p
          className="text-red-400 mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >{error}</motion.p>}
      </motion.div>

      <motion.div
        className="w-full max-w-3xl mt-6 p-4 bg-gray-800 rounded-lg shadow-lg relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {results.map((item, index) => (
          <motion.div
            key={index}
            className="p-4 mb-4 bg-gray-700 rounded"
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
              <pre className="p-2 rounded text-sm bg-gray-600 text-white overflow-auto">
                {item.email}
              </pre>
              <button
                onClick={() => handleCopy(item.email, index)}
                className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
              >
                {copiedIndex === index ? "Copied!" : "Copy"}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
