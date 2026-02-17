// Supabase Client Initialization
const { createClient } = supabase;
const _supabase = createClient(
  "https://lqfjeamzbxayfbjntarr.supabase.co",
  "sb_publishable_jDExXkASC_jrulY8B7noFw_r9qut-vQ",
);

const langData = {
  en: {
    note: "Welcome to the financial management software. We will always try to distinguish your assets and losses in a good way.",
    title: "Register",
    user: "UserName",
    pass: "Password (min 6 chars)",
    confirm: "Confirm Password",
    btn: "Register",
    label: "Burmese",
    loginText: "If you already have account? ",
    resetText: "Forgot Password? Reset Password",
    passMismatch: "Passwords do not match!",
    success: "Success! Please Login.",
  },
  my: {
    note: "ဘဏ္ဍာရေးစီမံခန့်ခွဲမှု ဆော့ဖ်ဝဲမှ ကြိုဆိုပါသည်။ သင်၏ ပိုင်ဆိုင်မှုနှင့် ဆုံးရှုံးမှုများကို ကောင်းမွန်စွာ ခွဲခြားနိုင်ရန် ကျွန်ုပ်တို့ အမြဲတမ်း ကြိုးစားနေပါမည်။",
    title: "အကောင့်ဖွင့်ရန်",
    user: "အသုံးပြုသူအမည်",
    pass: "လျှို့ဝှက်နံပါတ် (အနည်းဆုံး ၆ လုံး)",
    confirm: "လျှို့ဝှက်နံပါတ်ကို ထပ်မံရိုက်ပါ",
    btn: "မှတ်ပုံတင်မည်",
    label: "English",
    loginText: "အကောင့်ရှိပြီးသားလား? ",
    resetText: "လျှို့ဝှက်နံပါတ် မေ့နေပါသလား? ပြန်လည်သတ်မှတ်ရန်",
    passMismatch: "လျှို့ဝှက်နံပါတ်များ တူညီမှုမရှိပါ။",
    success: "အောင်မြင်ပါသည်။ လော့ဂ်အင်ဝင်နိုင်ပါပြီ။",
  },
};

let currentLang = "en";

// Language Switcher
document.getElementById("lang-btn").onclick = () => {
  currentLang = currentLang === "en" ? "my" : "en";
  const d = langData[currentLang];

  document.getElementById("lang-btn").innerText = d.label;
  document.getElementById("note-text").innerText = d.note;
  document.getElementById("title").innerText = d.title;
  document.getElementById("username").placeholder = d.user;
  document.getElementById("password").placeholder = d.pass;
  document.getElementById("confirm-password").placeholder = d.confirm;
  document.getElementById("reg-btn").innerText = d.btn;

  // Folder မရှိတော့သဖြင့် index.html နှင့် reset.html သို့ တိုက်ရိုက်လမ်းကြောင်းပေးသည်
  document.getElementById("login-text").innerHTML =
    `${d.loginText} <a href="index.html">Login</a>`;
  document.getElementById("reset-text").innerHTML =
    `<a href="reset.html">${d.resetText}</a>`;
};

// Theme Toggle
document.getElementById("theme-btn").onclick = () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
  document.getElementById("theme-btn").innerText =
    document.body.classList.contains("dark-mode") ? "🌙 Dark" : "☀️ Light";
};

// Registration Logic
document.getElementById("reg-form").onsubmit = async (e) => {
  e.preventDefault();
  const d = langData[currentLang];
  const email = document.getElementById("username").value + "@tnb.com";
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm-password").value;

  if (password !== confirm) {
    alert(d.passMismatch);
    return;
  }

  const { data, error } = await _supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message);
  } else {
    alert(d.success);
    // အောင်မြင်ပါက index.html (Login) သို့ တိုက်ရိုက်ပြန်ပို့သည်
    window.location.href = "index.html";
  }
};

// Gmail Sign Up
document.getElementById("gmail-btn").onclick = async () => {
  await _supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      // GitHub Pages ပေါ်တွင် Redirect Path မှန်ကန်စေရန် Repository အမည် ထည့်သွင်းထားသည်
      redirectTo: window.location.origin + "/TNB-App/dashboard.html",
    },
  });
};
