import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Review လုပ်မယ့် File extension များ
const targetExtensions = [".html", ".css", ".js"];
// ကျော်သွားရမယ့် Folder များ
const ignoreDirs = ["node_modules", ".git", ".github"];

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

async function runAI() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const files = await getAllFiles("./");

  console.log(`Found ${files.length} files to review...`);

  for (const filePath of files) {
    // ai-review.js ကိုယ်တိုင် ပြန်မပြင်မိအောင် စစ်ခြင်း
    if (filePath === "ai-review.js") continue;

    console.log(`Reviewing: ${filePath}`);
    const originalCode = fs.readFileSync(filePath, "utf8");

    const prompt = `You are a senior frontend engineer. Improve the UI and clean the code without breaking functionality. 
    Maintain the existing folder structure and linkings. Return only the improved full code for this file without any markdown backticks or explanations.
    File Path: ${filePath}`;

    try {
      const result = await model.generateContent([prompt, originalCode]);
      const response = await result.response;
      let improvedCode = response.text().replace(/```[a-z]*\n/g, "").replace(/```/g, "").trim();

      fs.writeFileSync(filePath, improvedCode);
      console.log(`✅ Success: ${filePath}`);
    } catch (error) {
      console.error(`❌ Error reviewing ${filePath}:`, error.message);
    }
  }
}

runAI();
