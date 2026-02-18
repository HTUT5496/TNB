import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function runAI() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const dashboardFiles = [
    "dashboard.html",
    "dashboard.js",
    "dashboard1.css",
    "dashboard2.css"
  ];

  console.log(`🚀 Starting Evolution Cycle...`);

  for (const filePath of dashboardFiles) {
    if (!fs.existsSync(filePath)) continue;

    const originalCode = fs.readFileSync(filePath, "utf8");

    const prompt = `You are a World-Class UI Developer. 
    CURRENT FILE: ${filePath}

    STRICT INSTRUCTIONS:
    1. You MUST evolve this file to be better than it currently is. 
    2. Add new features, better animations, or more professional styling (Glassmorphism, Neumorphism, or clean Minimalist).
    3. If it's dashboard.js/html: Implement/improve a dynamic filter where 'Add Income' shows (Salary, Gift) and 'Add Expense' shows (Food, Rent).
    4. NO INLINE CSS. Move all styles to dashboard1.css or dashboard2.css.
    5. Ensure the UI feels more "Premium" than the existing code.

    Return ONLY the updated code. No markdown backticks.`;

    try {
      const result = await model.generateContent([prompt, originalCode]);
      const response = await result.response;
      let improvedCode = response.text().replace(/```[a-z]*\n/g, "").replace(/```/g, "").trim();

      // Only write if the AI actually changed something
      if (improvedCode !== originalCode) {
        fs.writeFileSync(filePath, improvedCode);
        console.log(`✅ Evolved: ${filePath}`);
      }
    } catch (error) {
      console.error(`❌ Error in ${filePath}:`, error.message);
    }
  }
}

runAI();
