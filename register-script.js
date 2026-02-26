/* ═══════════════════════════════════════════════
   TNB – Register Script  |  register-script.js
   Supabase auth logic is UNTOUCHED.
═══════════════════════════════════════════════ */

// ── Supabase Client Initialization (UNCHANGED) ──
const { createClient } = supabase;
const _supabase = createClient(
  "https://lqfjeamzbxayfbjntarr.supabase.co",
  "sb_publishable_jDExXkASC_jrulY8B7noFw_r9qut-vQ",
);

// ── Language Data ──
const langData = {
  en: {
    note:         "Welcome to the financial management software. Create your account to start tracking your assets.",
    title:        "Register",
    sub:          "Create your free account",
    user:         "UserName",
    pass:         "Password (min 6 chars)",
    confirm:      "Confirm Password",
    btn:          "Register",
    btnLoading:   "Registering…",
    label:        "Burmese",
    separator:    "Or continue with",
    google:       "Continue with Google",
    googleLoading:"Connecting to Google…",
    loginText:    "Already have an account? ",
    resetText:    "Forgot Password? Reset Password",
    passMismatch: "Passwords do not match!",
    success:      "Success! Please Login.",
  },
  my: {
    note:         "ဘဏ္ဍာရေးစီမံခန့်ခွဲမှု ဆော့ဖ်ဝဲမှ ကြိုဆိုပါသည်။ သင်၏ ပိုင်ဆိုင်မှုနှင့် ဆုံးရှုံးမှုများကို ကောင်းမွန်စွာ ခွဲခြားနိုင်ရန် ကျွန်ုပ်တို့ အမြဲတမ်း ကြိုးစားနေပါမည်။",
    title:        "အကောင့်ဖွင့်ရန်",
    sub:          "အခမဲ့ အကောင့်တစ်ခု ဖန်တီးပါ",
    user:         "အသုံးပြုသူအမည်",
    pass:         "လျှို့ဝှက်နံပါတ် (အနည်းဆုံး ၆ လုံး)",
    confirm:      "လျှို့ဝှက်နံပါတ်ကို ထပ်မံရိုက်ပါ",
    btn:          "မှတ်ပုံတင်မည်",
    btnLoading:   "မှတ်ပုံတင်နေသည်…",
    label:        "English",
    separator:    "သို့မဟုတ် ဆက်လက်ဆောင်ရွက်ရန်",
    google:       "Google ဖြင့် ဆက်လက်ဆောင်ရွက်မည်",
    googleLoading:"Google သို့ ချိတ်ဆက်နေသည်…",
    loginText:    "အကောင့်ရှိပြီးသားလား? ",
    resetText:    "လျှို့ဝှက်နံပါတ် မေ့နေပါသလား? ပြန်လည်သတ်မှတ်ရန်",
    passMismatch: "လျှို့ဝှက်နံပါတ်များ တူညီမှုမရှိပါ။",
    success:      "အောင်မြင်ပါသည်။ လော့ဂ်အင်ဝင်နိုင်ပါပြီ။",
  },
};

let currentLang = "en";

// ── Helpers — btn state ──
const btnText   = () => document.querySelector("#reg-btn .btn-text");
const btnLoader = () => document.querySelector("#reg-btn .btn-loader");
const btnIcon   = () => document.querySelector("#reg-btn .btn-icon");
const regBtn    = () => document.getElementById("reg-btn");

function setRegBtnLoading(loading) {
  const d = langData[currentLang];
  regBtn().disabled = loading;
  if (loading) {
    btnText().textContent     = d.btnLoading;
    btnLoader().style.display = "inline";
    btnIcon().style.display   = "none";
  } else {
    btnText().textContent     = d.btn;
    btnLoader().style.display = "none";
    btnIcon().style.display   = "inline";
  }
}

// ── Password Visibility Toggles ──
// (was in an inline <script> block in register.html — moved here)
[
  ["togglePass1", "toggleIcon1", "password"],
  ["togglePass2", "toggleIcon2", "confirm-password"],
].forEach(([btnId, iconId, inputId]) => {
  const btn  = document.getElementById(btnId);
  const icon = document.getElementById(iconId);
  const inp  = document.getElementById(inputId);
  if (btn) {
    btn.addEventListener("click", () => {
      const isPass   = inp.type === "password";
      inp.type        = isPass ? "text" : "password";
      icon.className  = isPass ? "fas fa-eye-slash" : "fas fa-eye";
    });
  }
});

// ── Language Switcher ──
document.getElementById("lang-btn").onclick = () => {
  currentLang = currentLang === "en" ? "my" : "en";
  const d = langData[currentLang];

  document.getElementById("lang-btn").innerHTML =
    `<i class="fas fa-language"></i> ${d.label}`;
  document.getElementById("note-text").innerText            = d.note;
  document.getElementById("title").innerText                = d.title;
  document.getElementById("page-sub").innerText             = d.sub;
  document.getElementById("username").placeholder           = d.user;
  document.getElementById("password").placeholder           = d.pass;
  document.getElementById("confirm-password").placeholder   = d.confirm;
  document.getElementById("separator-text").innerText       = d.separator;
  document.getElementById("gmail-btn-text").innerText       = d.google;
  btnText().innerText                                        = d.btn;

  document.getElementById("login-text").innerHTML =
    `${d.loginText}<a href="index.html">Login</a>`;
  document.getElementById("reset-text").innerHTML =
    `<a href="reset.html">${d.resetText}</a>`;
};

// ── Theme Toggle ──
document.getElementById("theme-btn").onclick = () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
  document.getElementById("theme-btn").innerText =
    document.body.classList.contains("dark-mode") ? "🌙 Dark" : "☀️ Light";
};

// ── Registration Logic (UNCHANGED Supabase logic) ──
document.getElementById("reg-form").onsubmit = async (e) => {
  e.preventDefault();
  const d       = langData[currentLang];
  const email   = document.getElementById("username").value + "@tnb.com";
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm-password").value;

  // Password match validation
  if (password !== confirm) {
    alert(d.passMismatch);
    return;
  }

  // Show loading state, disable button to prevent double-submit
  setRegBtnLoading(true);

  // UNCHANGED Supabase signUp call
  const { data, error } = await _supabase.auth.signUp({ email, password });

  // Restore button
  setRegBtnLoading(false);

  if (error) {
    alert(error.message);
  } else {
    alert(d.success);
    window.location.href = "index.html";
  }
};

// ── Google OAuth Sign Up ──
// Fixed: redirectTo now uses the correct /TNB/ path (was /TNB-App/)
// Added: shimmer loading state (consistent with login page)
document.getElementById("gmail-btn").onclick = async () => {
  const btn     = document.getElementById("gmail-btn");
  const btnTxt  = document.getElementById("gmail-btn-text");
  const shimmer = document.getElementById("gmail-shimmer");

  // Show loading state
  btn.disabled        = true;
  btn.style.opacity   = "0.85";
  btnTxt.textContent  = langData[currentLang].googleLoading;
  if (shimmer) shimmer.classList.add("active");

  const { data, error } = await _supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://htut5496.github.io/TNB/dashboard.html",
      queryParams: {
        access_type: "offline",
        prompt: "select_account",
      },
    },
  });

  if (error) {
    // Restore button on error
    btn.disabled        = false;
    btn.style.opacity   = "1";
    btnTxt.textContent  = langData[currentLang].google;
    if (shimmer) shimmer.classList.remove("active");
    alert("Google Sign Up Error: " + error.message);
  }
  // On success Supabase redirects the browser immediately.
  // Shimmer stays visible until the page unloads.
};
