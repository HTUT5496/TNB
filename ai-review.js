    const prompt = `You are an expert Frontend Architect and UI/UX Designer. 
    TASK: Evolve the file: ${filePath}

    EVOLUTIONARY GOAL:
    - Do not just maintain the code; you must IMPROVE the UI/UX to be more advanced than the current version.
    - Add modern CSS animations, glassmorphism, or better spacing if they are missing.
    - If it's a JS file, optimize the logic and add helpful user feedback (like loading states or toast notifications).

    SPECIFIC FEATURE REQUEST:
    - Dashboard Dynamic Filter: 'Add Income' -> Salary, Gift, Interest. 'Add Expense' -> Food, Transport, Rent, Bills.
    - If this feature exists, make it more robust (e.g., add icons to the dropdown or smooth transitions).

    STRICT RULES:
    1. NO INLINE CSS. Use separate files as per the folder structure: dashboard1.css and dashboard2.css.
    2. Maintain all existing functionality while adding new "premium" feel improvements.
    3. Return ONLY the code. No markdown, no backticks.`;
