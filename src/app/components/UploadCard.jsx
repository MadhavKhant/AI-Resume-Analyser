"use client";

// ==============================
// ✅ imports
// ==============================
import { useRef, useState } from "react";
import { UploadCloud, FileText, X } from "lucide-react";
import Loader from "./Loader";

// ==============================
// ✅ upload card (with file preview)
// ==============================
export default function UploadCard({
  file,
  clearFile,
  role,
  setRole,
  experience,
  setExperience,
  loading,
  progress,
  onFileChange,
  onUpload,
  error,
}) {
  const fileRef = useRef(null);

  // ==============================
  // ⭐ open file dialog
  // ==============================
  function openFilePicker() {
    fileRef.current.click();
  }

  // ==============================
  // ⭐ handle file change
  // ==============================
  function handleFile(e) {
    onFileChange(e); // ⭐ parent handles everything now
  }

  // ==============================
  // ⭐ remove selected file
  // ==============================
  function removeFile() {
    clearFile(); // ⭐ clear parent state
    fileRef.current.value = ""; // ⭐ clear browser input
  }

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 border">


      {/* Header */}
      <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
        📄 Upload Resume
      </h2>

      {/* Role Input */}
      <input
        type="text"
        placeholder="💼 Enter job role (MERN Developer)"
        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      {/* Hidden input */}
      <input
        key={file ? file.name : "empty"} // ⭐ FORCE re-render when file changes
        ref={fileRef}
        type="file"
        accept="application/pdf"
        onChange={handleFile}
        className="hidden"
      />

      {/* ==============================
   ⭐ Experience Input (NEW)
================================ */}
      <input
        type="number"
        min="0"
        placeholder="🧑‍💻 Years of Experience (e.g. 2)"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400"
      />

      {/* ==============================
          Upload Area
      ============================== */}
      <div
        className="cursor-pointer border-2 border-dashed border-indigo-300 rounded-xl p-6 
        sm:p-8 md:p-10 flex flex-col items-center 
        justify-center text-center hover:bg-indigo-50 transition"
        onClick={openFilePicker}
      >
        <UploadCloud size={48} className="text-indigo-600 mb-3" />

        <p className="font-medium text-gray-700">
          Click to upload or drag & drop
        </p>

        <p className="text-sm text-gray-500 mt-1">PDF only • Max 5MB</p>
      </div>

      {/* ==============================
          ⭐ Selected File Preview
      ============================== */}
      {file && (
        <div
          className="
          flex items-center justify-between
          bg-green-50 border border-green-300
          rounded-lg p-3
        "
        >
          <div className="flex items-center gap-3">
            <FileText className="text-green-600" size={20} />

            <div>
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>

          {/* remove button */}
          <button onClick={removeFile}>
            <X size={18} className="text-red-500 hover:text-red-700" />
          </button>
        </div>
      )}

      {/* Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Loader */}
      {loading && <Loader progress={progress} />}

      {/* Upload button */}
      <button
        onClick={onUpload}
        disabled={loading}
        className="
          w-full
          flex items-center justify-center gap-2
          bg-indigo-600 hover:bg-indigo-700
          text-white py-3 rounded-lg
          font-semibold
          transition
        "
      >
        <FileText size={18} />
        Analyze Resume 🚀
      </button>
    </div>
  );
}
