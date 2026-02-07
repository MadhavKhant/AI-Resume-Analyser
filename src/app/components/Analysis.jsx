"use client";

// ==============================
// ✅ analysis result UI
// ==============================
export default function Analysis({ result }) {

  // ✅ if no result → don't render
  if (!result) return null;

  return (
    <div className="bg-white shadow-2xl rounded-2xl p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 border">

      {/* ==============================
          HEADER
      ============================== */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
        📊 Resume Analysis Report
      </h2>


      {/* ==============================
          ⭐ SCORE SECTION (big highlight)
      ============================== */}
      <div className="flex justify-center">
        <div
          className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-indigo-600 text-white flex 
          items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold shadow-lg"
        >
          {result.score}% {/* dynamic score */}
        </div>
      </div>


      {/* ==============================
          SKILLS GRID
      ============================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

        {/* ✅ Matched Skills */}
        <div className="bg-green-50 p-5 rounded-xl border border-green-200">
          <h3 className="font-semibold mb-3 text-green-700">
            ✅ Matched Skills
          </h3>

          <div className="flex flex-wrap gap-2">
            {result.matchedSkills?.map((s, i) => (
              <span
                key={i}
                className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>


        {/* ❌ Missing Skills */}
        <div className="bg-red-50 p-5 rounded-xl border border-red-200">
          <h3 className="font-semibold mb-3 text-red-600">
            ❌ Missing Skills
          </h3>

          <div className="flex flex-wrap gap-2">
            {result.missingSkills?.map((s, i) => (
              <span
                key={i}
                className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>



      {/* ==============================
          ⭐ Strengths & Weaknesses
      ============================== */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* 💪 Strengths */}
        <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200">
          <h3 className="font-semibold mb-3 text-emerald-700">
            💪 Strengths
          </h3>

          <ul className="space-y-2 text-sm">
            {result.strengths?.map((s, i) => (
              <li key={i}>• {s}</li>
            ))}
          </ul>
        </div>


        {/* ⚠️ Weaknesses */}
        <div className="bg-orange-50 p-5 rounded-xl border border-orange-200">
          <h3 className="font-semibold mb-3 text-orange-700">
            ⚠️ Weaknesses
          </h3>

          <ul className="space-y-2 text-sm">
            {result.weaknesses?.map((s, i) => (
              <li key={i}>• {s}</li>
            ))}
          </ul>
        </div>
      </div>



      {/* ==============================
          💡 Suggestions (full width)
      ============================== */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <h3 className="font-semibold mb-3 text-blue-700">
          💡 Suggestions
        </h3>

        <ul className="list-disc ml-5 space-y-2 text-sm">
          {result.suggestions?.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}
