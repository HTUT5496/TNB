/**
 * AI Evolution Logic - Targeted for Dashboard
 */
async function runAI() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  // Explicitly defining only the files you want to update
  const dashboardFiles = [
    "dashboard.html",
    "dashboard.js",
    "dashboard1.css",
    "dashboard2.css"
  ];

  console.log(`🚀 AI Evolution Started: Updating Dashboard components...`);

  for (const filePath of dashboardFiles) {
    // Check if file exists before processing
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Skipping: ${filePath} not found.`);
      continue;
    }

    console.log(`✨ Analyzing & Improving: ${filePath}`);
    const originalCode = fs.readFileSync(filePath, "utf8");

    const prompt = `You are an expert Frontend Architect. 
    TASK: Improve the file: ${filePath}
    
    SPECIFIC FEATURE REQUEST:
    - In dashboard.html and dashboard.js, implement a dynamic category filter.
    - Click 'Add Income' -> Category dropdown shows: Salary, Gift, Interest.
    - Click 'Add Expense' -> Category dropdown shows: Food, Transport, Rent, Bills.
    - Modernize dashboard1.css and dashboard2.css for a premium UI.

    STRICT RULES:
    1. NO INLINE CSS. Keep styles in the .css files only.
    2. Maintain the link between dashboard.html and the specific CSS/JS files.
    3. Return ONLY the code. No markdown, no backticks.`;

    try {
      const result = await model.generateContent([prompt, originalCode]);
      const response = await result.response;
      
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
  console.log("🏁 Dashboard Update Cycle Finished.");
}
