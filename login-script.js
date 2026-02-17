// Supabase Client Initialization
const { createClient } = supabase;
const _supabase = createClient(
  "https://lqfjeamzbxayfbjntarr.supabase.co",
  "sb_publishable_jDExXkASC_jrulY8B7noFw_r9qut-vQ",
);

const langData = {
  en: {
    note: "Welcome to the financial management software. We will always try to distinguish your assets and losses.",
    title: "Login",
    user: "UserName",
    pass: "Password",
    btn: "Login",
    label: "Burmese",
    signup: "If you don't have an account? ",
    reset: "Forgot password? ",
  },
  my: {
    note: "ဘဏ္ဍာရေးစီမံခန့်ခွဲမှု ဆော့ဖ်ဝဲမှ ကြိုဆိုပါသည်။ သင်၏ ပိုင်ဆိုင်မှုနှင့် ဆုံးရှုံးမှုများကို ခွဲခြားနိုင်ရန် ကျွန်ုပ်တို့ အမြဲတမ်း ကြိုးစားနေပါမည်။",
    title: "လော့ဂ်အင်",
    user: "အသုံးပြုသူအမည်",
    pass: "လျှို့ဝှက်နံပါတ်",
    btn: "ဝင်မည်",
    label: "English",
    signup: "အကောင့်မရှိသေးဘူးလား? ",
    reset: "လျှို့ဝှက်နံပါတ် မေ့နေပါသလား? ",
  },
};

let currentLang = "en";

// Theme Toggle (Dark/Light Mode)
document.getElementById("theme-btn").onclick = () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
  document.getElementById("theme-btn").innerText =
    document.body.classList.contains("dark-mode") ? "🌙 Dark" : "☀️ Light";
};

// Language Switcher (ဘာသာစကားပြောင်းလဲခြင်း)
document.getElementById("lang-btn").onclick = () => {
  currentLang = currentLang === "en" ? "my" : "en";
  const d = langData[currentLang];

  document.getElementById("lang-btn").innerText = d.label;
  document.getElementById("note-text").innerText = d.note;
  document.getElementById("title").innerText = d.title;
  document.getElementById("username").placeholder = d.user;
  document.getElementById("password").placeholder = d.pass;
  document.getElementById("login-btn").innerText = d.btn;

  // Folder မရှိတော့သဖြင့် လမ်းကြောင်းများကို တိုက်ရိုက်ဖိုင်အမည်များသို့ ပြောင်းလဲထားသည်
  document.getElementById("signup-text").innerHTML =
    `${d.signup} <a href="register.html">Sign Up</a>`;
  document.getElementById("reset-text").innerHTML =
    `${d.reset} <a href="reset.html">Reset Password</a>`;
};

// Login Logic (Supabase Authentication)
document.getElementById("login-form").onsubmit = async (e) => {
  e.preventDefault();
  const email = document.getElementById("username").value + "@tnb.com";
  const password = document.getElementById("password").value;

  const { data, error } = await _supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(
      currentLang === "en"
        ? "Invalid Username or Password!"
        : "အသုံးပြုသူအမည် သို့မဟုတ် လျှို့ဝှက်နံပါတ် မှားယွင်းနေပါသည်။",
    );
  } else {
    // အောင်မြင်ပါက dashboard.html သို့ တိုက်ရိုက်သွားမည်
    location.href = "dashboard.html";
  }
};

// Gmail Login (Google OAuth)
document.getElementById("gmail-btn").onclick = async () => {
  await _supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      // GitHub Pages ပေါ်တွင် လမ်းကြောင်းမှန်ကန်စေရန် TNB-App အမည်ထည့်သွင်းထားသည်
      redirectTo: window.location.origin + "/TNB-App/dashboard.html",
    },
  });
};
