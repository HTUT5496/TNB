// ════════════════════════════════════════════════
// Supabase Client Initialization
// ════════════════════════════════════════════════
const { createClient } = supabase;
const _supabase = createClient(
  "https://lqfjeamzbxayfbjntarr.supabase.co",
  "sb_publishable_jDExXkASC_jrulY8B7noFw_r9qut-vQ",
);

// ════════════════════════════════════════════════
// Language Data
// FIX: Added googleBtn and pageSub keys for full UI translation coverage.
//      Previously switching to Burmese left the Google button, page subtitle,
//      and toggle-pass aria-label in English.
// ════════════════════════════════════════════════
const langData = {
  en: {
    note: "Welcome to the financial management software. We will always try to distinguish your assets and losses.",
    title: "Login",
    pageSub: "Sign in to your account",
    user: "UserName",
    pass: "Password",
    btn: "Login",
    btnLoading: "Logging in…",
    label: "Burmese",
    signup: "If you don't have an account? ",
    reset: "Forgot password? ",
    googleBtn: "Continue with Google",
    googleLoading: "Connecting to Google…",
  },
  my: {
    note: "ဘဏ္ဍာရေးစီမံခန့်ခွဲမှု ဆော့ဖ်ဝဲမှ ကြိုဆိုပါသည်။ သင်၏ ပိုင်ဆိုင်မှုနှင့် ဆုံးရှုံးမှုများကို ခွဲခြားနိုင်ရန် ကျွန်ုပ်တို့ အမြဲတမ်း ကြိုးစားနေပါမည်။",
    title: "လော့ဂ်အင်",
    pageSub: "သင့်အကောင့်သို့ ဝင်ရောက်ပါ",
    user: "အသုံးပြုသူအမည်",
    pass: "လျှို့ဝှက်နံပါတ်",
    btn: "ဝင်မည်",
    btnLoading: "ဝင်နေသည်…",
    label: "English",
    signup: "အကောင့်မရှိသေးဘူးလား? ",
    reset: "လျှို့ဝှက်နံပါတ် မေ့နေပါသလား? ",
    googleBtn: "Google ဖြင့် ဆက်လက်ဝင်ရောက်ပါ",
    googleLoading: "Google သို့ ချိတ်ဆက်နေသည်…",
  },
};

let currentLang = "en";

// ════════════════════════════════════════════════
// Theme Toggle
// ════════════════════════════════════════════════
document.getElementById("theme-btn").onclick = () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
  document.getElementById("theme-btn").innerText =
    document.body.classList.contains("dark-mode") ? "🌙 Dark" : "☀️ Light";
};

// ════════════════════════════════════════════════
// Language Switcher
// FIX: Now also updates page-sub, gmail-btn-text so the full UI translates.
// ════════════════════════════════════════════════
document.getElementById("lang-btn").onclick = () => {
  currentLang = currentLang === "en" ? "my" : "en";
  const d = langData[currentLang];

  document.getElementById("lang-btn").childNodes[2].textContent = " " + d.label;
  document.getElementById("note-text").innerText  = d.note;
  document.getElementById("title").innerText      = d.title;
  document.getElementById("page-sub").innerText   = d.pageSub;
  document.getElementById("username").placeholder = d.user;
  document.getElementById("password").placeholder = d.pass;
  document.getElementById("login-btn").innerHTML  =
    `<i class="fa-solid fa-right-to-bracket"></i> ${d.btn}`;

  // FIX: Google button text was not translated on language switch
  const gmailBtnText = document.getElementById("gmail-btn-text");
  if (gmailBtnText) gmailBtnText.textContent = d.googleBtn;

  document.getElementById("signup-text").innerHTML =
    `${d.signup} <a href="register.html">Sign Up</a>`;
  document.getElementById("reset-text").innerHTML =
    `${d.reset} <a href="reset.html">Reset Password</a>`;
};

// ════════════════════════════════════════════════
// FIX: Password visibility toggle
// The .toggle-pass button exists in the updated HTML but had no JS handler.
// ════════════════════════════════════════════════
document.getElementById("toggle-pass").onclick = () => {
  const passwordInput = document.getElementById("password");
  const icon          = document.getElementById("toggle-pass-icon");
  const isHidden      = passwordInput.type === "password";

  passwordInput.type  = isHidden ? "text" : "password";
  icon.className      = isHidden ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
};

// ════════════════════════════════════════════════
// Login Logic — Email/Password
// FIX: Use window.location.replace() instead of window.location.href so the
//      login page is removed from the browser history (consistent with the
//      session-check redirect at the top of index.html).
// ════════════════════════════════════════════════
document.getElementById("login-form").onsubmit = async (e) => {
  e.preventDefault();
  const email    = document.getElementById("username").value.trim() + "@tnb.com";
  const password = document.getElementById("password").value;
  const btn      = document.getElementById("login-btn");

  btn.disabled   = true;
  btn.innerHTML  = `<i class="fa-solid fa-spinner fa-spin"></i> ${langData[currentLang].btnLoading}`;

  const { data, error } = await _supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    btn.disabled  = false;
    btn.innerHTML = `<i class="fa-solid fa-right-to-bracket"></i> ${langData[currentLang].btn}`;
    alert(
      currentLang === "en"
        ? "Invalid Username or Password!"
        : "အသုံးပြုသူအမည် သို့မဟုတ် လျှို့ဝှက်နံပါတ် မှားယွင်းနေပါသည်။",
    );
  } else {
    await new Promise((resolve) => {
      const { data: { subscription } } = _supabase.auth.onAuthStateChange(
        (event, session) => {
          if (event === "SIGNED_IN" && session) {
            subscription.unsubscribe();
            resolve();
          }
        }
      );
      setTimeout(resolve, 2000);
    });
    // FIX: replace() instead of href= so login page is removed from history
    window.location.replace("dashboard.html");
  }
};

// ════════════════════════════════════════════════
// Google OAuth Login
// FIX: Button now reads its label from langData so it respects the active
//      language when showing the "Connecting…" loading state.
// ════════════════════════════════════════════════
document.getElementById("gmail-btn").onclick = async () => {
  const btn     = document.getElementById("gmail-btn");
  const btnText = document.getElementById("gmail-btn-text");
  const shimmer = document.getElementById("gmail-shimmer");

  // Show loading state + shimmer
  btn.disabled         = true;
  btn.style.opacity    = "0.85";
  btnText.textContent  = langData[currentLang].googleLoading; // FIX: was always English
  if (shimmer) shimmer.style.display = "block";

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
    btn.disabled         = false;
    btn.style.opacity    = "1";
    btnText.textContent  = langData[currentLang].googleBtn; // FIX: restore translated label
    if (shimmer) shimmer.style.display = "none";
    alert("Google Login Error: " + error.message);
  }
  // On success Supabase immediately redirects — shimmer stays until page unloads.
};
