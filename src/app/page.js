"use client";

// ==============================
// ✅ imports
// ==============================
import { useState } from "react";
import UploadCard from "./components/UploadCard";
import Analysis from "./components/Analysis";

// ==============================
// ✅ parent page
// ==============================
export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState(""); // years
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // ==============================
  // ⭐ file change
  // ==============================
  function handleFileChange(e) {
    const f = e.target.files[0];

    if (!f) return;

    const MAX = 5 * 1024 * 1024;

    if (f.size > MAX) {
      setError("❌ Max 5MB allowed");
      return;
    }

    setFile(f);
    setError("");
  }

  // ==============================
  // ⭐ upload handler
  // ==============================
  async function handleUpload() {
    if (!file || !role || !experience) {
      setError("⚠️ Fill all fields");
      return;
    }

    setLoading(true);
    setProgress(0);
    setResult(null);
    setError(""); // ✅ NEW → clear old error before request

    const timer = setInterval(() => {
      setProgress((p) => (p < 90 ? p + 5 : p));
    }, 150);

    const formData = new FormData();

    formData.append("pdf", file);
    formData.append("role", role);
    formData.append("experience", experience);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      clearInterval(timer);
      setProgress(100);
      setLoading(false);

      // ===================================================
      // ✅ NEW → AI response validation (VERY IMPORTANT)
      // ===================================================

      const valid =
        data?.success &&
        data?.analysis &&
        typeof data.analysis.score === "number" &&
        Array.isArray(data.analysis.matchedSkills) &&
        Array.isArray(data.analysis.missingSkills) &&
        Array.isArray(data.analysis.suggestions);

      if (!valid) {
        // ❌ invalid AI response → ask upload again
        setResult(null);
        clearFile(); // ⭐ better
        setError("❌ Invalid AI response. Please upload again.");
        return;
      }

      // ✅ valid response
      setResult(data.analysis);
    } catch (err) {
      // ✅ NEW → network/server crash safety
      clearInterval(timer);
      setLoading(false);
      setError("❌ Something went wrong. Please try again.");
    }
  }

  // ==============================
  // ⭐ clear file (NEW)
  // ==============================
  function clearFile() {
    setFile(null); // clear parent file
  }

  // ==============================
  // ⭐ UI
  // ==============================
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-blue-100 p-10 space-y-10">
      <h1 className="text-4xl font-bold text-center">
        🧠 AI Resume Analyzer 🚀
      </h1>

      <div className="max-w-xl mx-auto">
        <UploadCard
          file={file} 
          clearFile={clearFile}
          role={role}
          setRole={setRole}
          experience={experience} 
          setExperience={setExperience} 
          loading={loading}
          progress={progress}
          onFileChange={handleFileChange}
          onUpload={handleUpload}
          error={error}
        />
      </div>

      <div className="max-w-3xl mx-auto">
        <Analysis result={result} />
      </div>
    </div>
  );
}
