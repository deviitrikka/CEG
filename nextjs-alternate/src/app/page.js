"use client";

import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Lanyard from "@/components/Lanyard";
import { Badge } from "@/components/ui/badge";
import TextType from "@/components/TextType";

export default function Home() {
  const [url, setUrl] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [emailType, setEmailType] = useState("process1");

  const handleSubmit = async (endpoint) => {
    setLoading(true);
    setError("");
    setResults([]);
    try {
      const response = await axios.post(
        `api/${endpoint}`,
        { url }
      );
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
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 bg-zinc-900 text-white">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-linear-to-r fromWhy be resume #847 in a pile no one reads?-zinc-800 to-black opacity-50"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />

<TextType text={["Why be resume #847 in a pile no one reads?", "Be the email that actually gets a reply."]} className="text-2xl font-bold mb-4 text-center" initialDelay={5000} />
<Lanyard position={[10, 0, 25]} gravity={[0, -60, 0]} />
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

        {/* Two Buttons for Different Email Types */}
        <div className="flex gap-4">
  <Select value={emailType} onValueChange={setEmailType} disabled={loading}>
    <SelectTrigger className="w-full bg-zinc-900 text-white border-zinc-600">
      <SelectValue placeholder="Select email type..." />
    </SelectTrigger>
    <SelectContent className="bg-zinc-800 text-white border-zinc-700"
    position="popper"
    side="bottom">
      <SelectItem value="process1" textValue="Email as Individual">
      </SelectItem>
      <SelectItem value="process2" textValue="Email as Business Executive">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Badge className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-0 px-1.5">Pro</Badge>
        </div>
        <span className="text-xs text-zinc-400 mt-0.5">uses vector db</span>
      </div>
      </SelectItem>
    </SelectContent>
  </Select>

  <motion.button
    onClick={() => handleSubmit(emailType)}
    className="px-6 bg-white text-zinc-900 py-2 rounded font-bold disabled:opacity-50 whitespace-nowrap"
    disabled={!url || !emailType || loading}
    whileHover={{ scale: 1.05 }}
  >
    {loading ? "Processing..." : "Generate"}
  </motion.button>
</div>

        {error && <motion.p
          className="text-red-400 mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >{error}</motion.p>}
      </motion.div>
      {results.length > 0 && (
      <motion.div
        className="w-full max-w-3xl mt-6 p-4 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {results.map((item, index) => (
          <motion.div
            key={index}
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
                onClick={() => handleCopy(item.email, index)}
                className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
              >
                {copiedIndex === index ? "Copied!" : "Copy"}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
      )}
    </div>
  );
}