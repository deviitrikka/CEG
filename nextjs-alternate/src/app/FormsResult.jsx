"use client";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ResultsDisplay from "@/components/ResultsDisplay";
import URLInputForm from "@/components/URLInputForm";

export default function FormsResult() {
    const [url, setUrl] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [emailType, setEmailType] = useState("process1");
    const handleSubmit = async (endpoint) => {
        setLoading(true);
        setError("");
        setResults([]);
        try {
            const response = await axios.post(
                `api/${endpoint}`,
                { input: url }
            );
            setResults(response.data.results);
        } catch (err) {
            setError("Failed to fetch data. Please try again.");
        }
        setLoading(false);
    };
    const onGenerate = () => {
        handleSubmit(emailType);
    };
    return (
        <motion.div
            className="flex flex-col items-center justify-center m-0 p-0 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <URLInputForm
                url={url}
                setUrl={setUrl}
                emailType={emailType}
                setEmailType={setEmailType}
                loading={loading}
                onGenerate={onGenerate}
                error={error}
            />
            {results.length > 0 && (
                <ResultsDisplay results={results} />
            )}
        </motion.div>
    );
}
