import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// GitHub Secrets မှ API Key ကို ယူသုံးခြင်း
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// စစ်ဆေးမည့် ဖိုင်အမျိုးအစားများနှင့် ကျော်သွားမည့် folder များ
const targetExtensions = [".html", ".css", ".js"];
const ignoreDirs = ["node_modules", ".git", ".github"];

/**
 * Repository တစ်ခုလုံးရှိ ဖိုင်များကို ရှာဖွေပေးမည့် function
 */
async function getAllFiles(dirPath, fileArray = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!ignoreDirs.includes(file)) {
        getAllFiles(filePath, fileArray);
      }
    } else {
      if (targetExtensions.includes(path.extname(filePath))) {
        fileArray.push(filePath);
      }
    }
  });
  return fileArray;
}

/**
 * AI Evolution ပင်မ Logic
 */
async function runAI() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const files = await getAllFiles("./");

  console.log(`🚀 AI Evolution Started: Scanning ${files.length} files...`);

  for (const filePath of files) {
    if (filePath === "ai-review.js") continue; // မိမိဖိုင်ကို ပြန်မပြင်ရန်

    console.log(`✨ Analyzing & Improving: ${filePath}`);
    const originalCode = fs.readFileSync(filePath, "utf8");

    // AI ကို ပေးမည့် အဆင့်မြင့် ညွှန်ကြားချက် (Prompt)
    const prompt = `You are an expert Frontend Architect. Improve this file with the following goals:

    SPECIFIC FEATURE REQUEST:
    - In the Dashboard (dashboard.html/js), implement a dynamic category filter.
    - If a user clicks 'Add Income', the category dropdown must only show Income categories (e.g., Salary, Gift, Interest).
    - If a user clicks 'Add Expense', the category dropdown must only show Expense categories (e.g., Food, Transport, Rent, Bills).
    - Ensure this works smoothly using JavaScript events.

    GENERAL IMPROVEMENTS:
    1. UI/UX: Make the design more modern, clean, and professional (premium feel).
    2. STANDARDS: Strictly follow the "No inline CSS" rule. Move all styles to separate CSS files if found.
    3. CLEAN CODE: Remove redundant code and optimize performance.
    4. STRUCTURE: Keep existing file links and folder structures intact.

    Return ONLY the full updated code for ${filePath} without any markdown backticks or extra talking.`;

    try {
      const result = await model.generateContent([prompt, originalCode]);
      const response = await result.response;
      
      // Markdown formatting များကို ဖယ်ရှားခြင်း
      let improvedCode = response.text()
        .replace(/```[a-z]*\n/g, "")
        .replace(/```/g, "")
        .trim();

      fs.writeFileSync(filePath, improvedCode);
      console.log(`✅ Completed: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error in ${filePath}:`, error.message);
    }
  }
  console.log("🏁 AI Evolution cycle finished.");
}

runAI();
