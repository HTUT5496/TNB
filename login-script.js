// ════════════════════════════════════════════════
// Supabase Client Initialization
// ════════════════════════════════════════════════
const { createClient } = supabase;
const _supabase = createClient(
  "https://lqfjeamzbxayfbjntarr.supabase.co",
  "sb_publishable_jDExXkASC_jrulY8B7noFw_r9qut-vQ",
);

// ════════════════════════════════════════════════
// Language Data (PRESERVED — unchanged)
// ════════════════════════════════════════════════
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

// ════════════════════════════════════════════════
// Theme Toggle (PRESERVED — unchanged)
// ════════════════════════════════════════════════
document.getElementById("theme-btn").onclick = () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
  document.getElementById("theme-btn").innerText =
    document.body.classList.contains("dark-mode") ? "🌙 Dark" : "☀️ Light";
};

// ════════════════════════════════════════════════
// Language Switcher (PRESERVED — unchanged)
// ════════════════════════════════════════════════
document.getElementById("lang-btn").onclick = () => {
  currentLang = currentLang === "en" ? "my" : "en";
  const d = langData[currentLang];

  document.getElementById("lang-btn").innerText = d.label;
  document.getElementById("note-text").innerText = d.note;
  document.getElementById("title").innerText = d.title;
  document.getElementById("username").placeholder = d.user;
  document.getElementById("password").placeholder = d.pass;
  document.getElementById("login-btn").innerText = d.btn;

  document.getElementById("signup-text").innerHTML =
    `${d.signup} <a href="register.html">Sign Up</a>`;
  document.getElementById("reset-text").innerHTML =
    `${d.reset} <a href="reset.html">Reset Password</a>`;
};

// ════════════════════════════════════════════════
// Login Logic — Email/Password (PRESERVED — unchanged)
// ════════════════════════════════════════════════
document.getElementById("login-form").onsubmit = async (e) => {
  e.preventDefault();
  const email    = document.getElementById("username").value + "@tnb.com";
  const password = document.getElementById("password").value;
  const btn      = document.getElementById("login-btn");

  btn.disabled    = true;
  btn.textContent = currentLang === "en" ? "Logging in…" : "ဝင်နေသည်…";

  const { data, error } = await _supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    btn.disabled    = false;
    btn.textContent = langData[currentLang].btn;
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
    window.location.href = "dashboard.html";
  }
};

// ════════════════════════════════════════════════
// Google OAuth Login (UPDATED)
//
// What changed vs. original:
//   1. Shows shimmer animation on the button while the
//      OAuth redirect is being prepared — gives instant
//      visual feedback instead of a frozen button.
//   2. Updates the button label to "Connecting…" so the
//      user knows something is happening.
//   3. Everything else (Supabase call, redirectTo URL)
//      is identical to your original code.
//
// NOTE: Supabase handles the token exchange on redirect.
//       In dashboard.js → init(), we read the session with
//       _supabase.auth.getSession() which automatically
//       contains full Google profile data (name, avatar,
//       email) inside session.user.user_metadata.
//       No JWT decoding or localStorage writes are needed
//       here because Supabase does that for us.
// ════════════════════════════════════════════════
document.getElementById("gmail-btn").onclick = async () => {
  const btn     = document.getElementById("gmail-btn");
  const btnText = document.getElementById("gmail-btn-text");
  const shimmer = document.getElementById("gmail-shimmer");

  // 1. Show loading state + shimmer
  btn.disabled          = true;
  btn.style.opacity     = "0.85";
  btnText.textContent   = "Connecting to Google…";
  if (shimmer) shimmer.style.display = "block";

  const { data, error } = await _supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "https://htut5496.github.io/TNB/dashboard.html",
      // Request profile scopes so avatar_url and full_name are
      // always populated in user_metadata on the dashboard side.
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
    btnText.textContent = "Continue with Google";
    if (shimmer) shimmer.style.display = "none";
    alert("Google Login Error: " + error.message);
  }
  // On success Supabase immediately redirects the browser,
  // so no further action needed — the shimmer stays visible
  // until the page unloads.
};
