// ==============================
// ✅ imports
// ==============================
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import pdf from "pdf-parse-fixed";
import { getGroqChatCompletion } from "@/app/lib/groq";

// ==============================
// ✅ POST API
// ==============================

export async function POST(req) {
  try {
    // ==============================
    // ✅ get form data
    // ==============================
    const formData = await req.formData();

    // must match frontend input name
    const file = formData.get("pdf");
    const role = formData.get("role");
    const experience = formData.get("experience");

    // ==============================
    // ✅ validation
    // ==============================
    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 },
      );
    }

    if (!role || !experience) {
      return NextResponse.json(
        { success: false, message: "Role or experience missing" },
        { status: 400 },
      );
    }

    // ==============================
    // ✅ validate file type
    // ==============================
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { success: false, message: "Only PDF allowed" },
        { status: 400 },
      );
    }

    // ==============================
    // ✅ file size limit (5MB) ⭐ ADDED
    // ==============================
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB in bytes

    // file.size is provided by browser automatically
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, message: "File size must be less than 5MB" },
        { status: 400 },
      );
    }

    // ==============================
    // ✅ convert file → buffer
    // ==============================
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ==============================
    // ✅ extract text from pdf ⭐
    // ==============================
    const pdfData = await pdf(buffer);
    const resumeText = pdfData.text;
    const AIReport = await getGroqChatCompletion(resumeText, role, experience);
    let aiData;

    try {
      aiData = JSON.parse(AIReport); // convert string → object
    } catch {
      aiData = { error: "Invalid AI response", raw: AIReport };
    }

    return NextResponse.json({
      success: true,
      analysis: aiData,
    });
  } catch (err) {
    console.log("error: ", err.message);

    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}
