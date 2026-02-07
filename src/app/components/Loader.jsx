"use client";

// ==============================
// ✅ loader with percentage
// ==============================
export default function Loader({ progress }) {

  return (
    <div className="text-center text-xs sm:text-sm text-gray-600">

      {/* progress bar */}
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${progress}%` }} // ⭐ dynamic width
        />
      </div>

      {/* text */}
      <p className="text-center text-sm text-gray-600">
        ⏳ Analyzing resume... {progress}%
      </p>

    </div>
  );
}
