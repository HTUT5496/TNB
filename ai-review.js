import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// GitHub Secrets ထဲက GEMINI_API_KEY ကို အသုံးပြုခြင်း
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// AI က စစ်ဆေးပြီး ပြုပြင်ပေးမယ့် File အမျိုးအစားများ
const targetExtensions = [".html", ".css", ".js"];
// AI မကြည့်ရမယ့် Folder များ
const ignoreDirs = ["node_modules", ".git", ".github"];

/**
 * Repository ထဲက file အားလုံးကို ရှာဖွေပေးမယ့် function
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
 * AI က file တစ်ခုချင်းစီကို review လုပ်ပြီး evolve လုပ်မယ့် ပင်မ function
 */
async function runAI() {
  // ပိုမြန်ပြီး စွမ်းဆောင်ရည်ကောင်းတဲ့ gemini-1.5-flash ကို သုံးထားပါတယ်
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const files = await getAllFiles("./");

  console.log(`🚀 Starting Evolution: Scanning ${files.length} files...`);

  for (const filePath of files) {
    // ဤ script ကိုယ်တိုင် ပြန်မပြင်မိစေရန် စစ်ဆေးခြင်း
    if (filePath === "ai-review.js") continue;

    console.log(`✨ Evolving: ${filePath}`);
    const originalCode = fs.readFileSync(filePath, "utf8");

    // AI ကို ပိုမိုလွတ်လပ်စွာ စဉ်းစားစေမည့် အဆင့်မြင့် Prompt
    const prompt = `You are an Autonomous AI Software Architect. Your mission is to evolve this application to become a world-class digital product.
    1. ANALYZE: Look at the current code and think: "How can I make this UI look more professional, modern (2026 trends), and user-friendly?"
    2. ENHANCE: Add missing features if necessary (e.g., better animations, responsive layout, dark mode support).
    3. CLEAN: Optimize the code logic and strictly follow the "No inline CSS" rule. Use separate CSS files.
    4. STRUCTURE: Maintain existing file links and folder structures.
    5. OUTPUT: Return ONLY the full updated code for this file. No explanations, no markdown backticks.
    
    File Path: ${filePath}`;

    try {
      const result = await model.generateContent([prompt, originalCode]);
      const response = await result.response;
      
      // Markdown စာသားများ ပါလာပါက ဖယ်ရှားခြင်း
      let improvedCode = response.text()
        .replace(/```[a-z]*\n/g, "")
        .replace(/```/g, "")
        .trim();

      // ပြင်ဆင်ထားသော code ကို file ထဲသို့ ပြန်ရေးခြင်း
      fs.writeFileSync(filePath, improvedCode);
      console.log(`✅ Successfully Evolved: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error evolving ${filePath}:`, error.message);
    }
  }
  console.log("🏁 Evolution cycle completed.");
}

runAI();
