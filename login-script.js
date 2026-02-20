/* ═══════════════════════════════════════════════
   TNB – Login Script  |  login-script.js
   ⚠️  Supabase logic is UNTOUCHED.
   Only UI feedback improvements added.
═══════════════════════════════════════════════ */

// ── Supabase Client Initialization (UNCHANGED) ──
const { createClient } = supabase;
const _supabase = createClient(
  "https://lqfjeamzbxayfbjntarr.supabase.co",
  "sb_publishable_jDExXkASC_jrulY8B7noFw_r9qut-vQ",
);

// ── Language Data (UNCHANGED) ──
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

// ── Theme Toggle (UNCHANGED behavior) ──
document.getElementById("theme-btn").onclick = () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
  document.getElementById("theme-btn").innerText =
    document.body.classList.contains("dark-mode") ? "🌙 Dark" : "☀️ Light";
};

// ── Language Switcher (UNCHANGED behavior) ──
document.getElementById("lang-btn").onclick = () => {
  currentLang = currentLang === "en" ? "my" : "en";
  const d = langData[currentLang];
  document.getElementById("lang-btn").innerHTML =
    `<i class="fas fa-language"></i> ${d.label}`;
  document.getElementById("note-text").innerText = d.note;
  document.getElementById("title").innerText = d.title;
  document.getElementById("username").placeholder = d.user;
  document.getElementById("password").placeholder = d.pass;
  document.querySelector("#login-btn .btn-text").innerText = d.btn;
  document.getElementById("signup-text").innerHTML =
    `${d.signup} <a href="register.html">Sign Up</a>`;
  document.getElementById("reset-text").innerHTML =
    `${d.reset} <a href="reset.html">Reset Password</a>`;
};

// ── Login Logic — Email/Password (UNCHANGED Supabase logic) ──
document.getElementById("login-form").onsubmit = async (e) => {
  e.preventDefault();
  const email    = document.getElementById("username").value + "@tnb.com";
  const password = document.getElementById("password").value;

  // UI: show loading state
  const btnText   = document.querySelector("#login-btn .btn-text");
  const btnLoader = document.querySelector("#login-btn .btn-loader");
  if (btnText)   btnText.style.display   = "none";
  if (btnLoader) btnLoader.style.display = "inline";

  // UNCHANGED Supabase auth call
  const { data, error } = await _supabase.auth.signInWithPassword({
    email,
    password,
  });

  // UI: restore button
  if (btnText)   btnText.style.display   = "inline";
  if (btnLoader) btnLoader.style.display = "none";

  if (error) {
    // UNCHANGED error handling behavior
    alert(
      currentLang === "en"
        ? "Invalid Username or Password!"
        : "အသုံးပြုသူအမည် သို့မဟုတ် လျှို့ဝှက်နံပါတ် မှားယွင်းနေပါသည်။",
    );
  } else {
    // UNCHANGED redirect
    location.href = "dashboard.html";
  }
};

// ── Gmail Login — Google OAuth (UNCHANGED Supabase logic) ──
document.getElementById("gmail-btn").onclick = async () => {
  const { data, error } = await _supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      // UNCHANGED redirect URL
      redirectTo: "https://htut5496.github.io/TNB/dashboard.html",
    },
  });
  if (error) {
    alert("Google Login Error: " + error.message);
  }
};
