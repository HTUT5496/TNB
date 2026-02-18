import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// Initialize AI with API Key from GitHub Secrets
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function runAI() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  // Specific Dashboard files to modify
  const dashboardFiles = [
    "dashboard.html",
    "dashboard.js",
    "dashboard1.css",
    "dashboard2.css"
  ];

  console.log(`🚀 AI Evolution Started: Upgrading UI/UX...`);

  for (const filePath of dashboardFiles) {
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Skipping: ${filePath} not found.`);
      continue;
    }

    console.log(`✨ Evolving: ${filePath}`);
    const originalCode = fs.readFileSync(filePath, "utf8");

    const prompt = `You are a Senior UI/UX Architect. 
    TASK: Improve the file: ${filePath}

    STRICT EVOLUTION REQUIREMENT:
    - Every update must make the UI/UX more advanced and feature-rich than the current version.
    - Add premium design elements (glassmorphism, advanced CSS variables, or smooth micro-interactions).
    - If it is dashboard.js, optimize the code for high performance.

    SPECIFIC FEATURE:
    - Implement a dynamic category filter.
    - If 'Add Income' is selected, show: Salary, Gift, Interest.
    - If 'Add Expense' is selected, show: Food, Transport, Rent, Bills.
    - If this feature already exists, improve its visual feedback or animation.

    ARCHITECTURE RULES:
    1. NEVER use inline CSS. Move all styling to dashboard1.css or dashboard2.css.
    2. Maintain the existing file structure: index.html (Login), register.html, dashboard.html.
    3. Return ONLY the updated code without any markdown or backticks.`;

    try {
      const result = await model.generateContent([prompt, originalCode]);
      const response = await result.response;
      
      let improvedCode = response.text()
        .replace(/```[a-z]*\n/g, "")
        .replace(/```/g, "")
        .trim();

      fs.writeFileSync(filePath, improvedCode);
      console.log(`✅ Evolution Complete: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error in ${filePath}:`, error.message);
    }
  }
  console.log("🏁 AI Evolution cycle finished.");
}

runAI();
