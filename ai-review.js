import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function runAI() {
  const filePath = "index.html";   // You can change this later
  const originalCode = fs.readFileSync(filePath, "utf8");

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a senior frontend engineer. Improve the UI and clean the code without breaking functionality. Return only the improved full code."
      },
      {
        role: "user",
        content: originalCode
      }
    ]
  });

  const improvedCode = response.choices[0].message.content;

  fs.writeFileSync(filePath, improvedCode);
}

runAI();
