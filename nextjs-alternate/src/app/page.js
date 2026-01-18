"use client";

import { useState } from "react";
import axios from "axios";
import Lanyard from "@/components/Lanyard";
import TextType from "@/components/TextType";
import AnimatedBackground from "@/components/AnimatedBackground";
import URLInputForm from "@/components/URLInputForm";
import ResultsDisplay from "@/components/ResultsDisplay";

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

  const handleGenerate = () => {
    handleSubmit(emailType);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 bg-zinc-900 text-white">
      <AnimatedBackground />
      
      <TextType 
        text={["Why be resume #847 in a pile no one reads?", "Be the email that actually gets a reply."]} 
        className="text-2xl font-bold mb-4 text-center" 
        initialDelay={5000} 
      />
      
      <Lanyard position={[10, 0, 25]} gravity={[0, -60, 0]} />
      
      <URLInputForm
        url={url}
        setUrl={setUrl}
        emailType={emailType}
        setEmailType={setEmailType}
        loading={loading}
        onGenerate={handleGenerate}
        error={error}
      />
      
      <ResultsDisplay
        results={results}
        onCopy={handleCopy}
        copiedIndex={copiedIndex}
      />
    </div>
  );
}