import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqChatCompletion(resumeText, role, experience) {
  const prompt = `
You are a strict ATS resume analyzer.

strict output rule follow:
Return ONLY VALID JSON.
No explanation.
No markdown.
No extra text.
Start with { and end with }.

If output might be cut or incomplete, RETURN EMPTY JSON WITH DEFAULT VALUES INSTEAD.
give all field based on role and it's experience and provided resume.

give strictly exactly in this format output not any extra text
{
  "score": 0,
  "matchedSkills": [],
  "missingSkills": [],
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}

Job Role:
${role}

Resume:
${resumeText}
`;

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    max_completion_tokens: 300,
    temperature: 0.3, // more deterministic
    model: "llama-3.1-8b-instant",
  });

  return chatCompletion.choices[0]?.message?.content || "{}";
}
