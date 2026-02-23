/* ══════════════════════════════════════════════════════
   PROFILE PAGE  |  profile.js
   Contains:
   - updateProfile() function (moved from dashboard.js)
   - setGoogleUser() function (moved from dashboard.js)
   - Login guard (redirects to index.html if not logged in)
   - Logout logic (moved from dashboard.js settings wiring)
   - Password change row visibility logic
   - Navigation link back to dashboard.html
   
   NOTE: No existing logic was changed. Only moved here
   from dashboard.js and wired to profile.html elements.
══════════════════════════════════════════════════════ */

/* ─── AUTH: Supabase client (same credentials as dashboard.js) ─── */
// AUTH CODE: Initialize Supabase with same project credentials
const { createClient } = supabase;
const _supabase = createClient(
  "https://lqfjeamzbxayfbjntarr.supabase.co",
  "sb_publishable_jDExXkASC_jrulY8B7noFw_r9qut-vQ",
);

("use strict");

/* ─── TRANSLATIONS (profile-relevant keys only) ─── */
const TRANSLATIONS = {
  en: {
    premium_member: "Premium Member",
    change_password: "Change Password",
    change_password_sub: "Update your account password",
    change: "Change",
    social_account: "Social Account",
    provider_label: "Provider:",
    logout: "Logout",
  },
  my: {
    premium_member: "ပရီမီယံ အဖွဲ့ဝင်",
    change_password: "စကားဝှက် ပြောင်းရန်",
    change_password_sub: "အကောင့် စကားဝှက် ပြောင်းမည်",
    change: "ပြောင်းမည်",
    social_account: "ဆိုရှယ် အကောင့်",
    provider_label: "ဝန်ဆောင်မှု:",
    logout: "ထွက်မည်",
  },
};

/* ─── STATE (profile page only needs user fields) ─── */
const S = {
  userName: "Alex Morgan",
  userAvatar: "",
  userEmail: "",
  userProvider: "",
  isSocialLogin: false,
  lang: "en",
  theme: "dark",
};

/* ─── LOCAL STORAGE KEYS (same as dashboard.js) ─── */
const LS = {
  lang: "novapay_lang",
  theme: "novapay_theme",
  userName: "novapay_username",
  userAvatar: "novapay_avatar",
  userEmail: "novapay_email",
  userProvider: "novapay_provider",
  isSocialLogin: "novapay_social",
};

/* ─── HELPERS ─── */
const $ = (id) => document.getElementById(id);
const setText = (id, v) => { const e = $(id); if (e) e.textContent = v; };

const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const lsGet = (k, fb) => {
  try { const v = localStorage.getItem(k); return v !== null ? JSON.parse(v) : fb; }
  catch { return fb; }
};

/* ─── THEME ─── */
function applyTheme(t) {
  S.theme = t;
  document.documentElement.dataset.theme = t;
}

/* ══════════════════════════════════════════════════════
   updateProfile() — MOVED FROM dashboard.js
   Reads S.userName, S.userAvatar, S.isSocialLogin etc.
   and populates the profile card UI elements.
   The existing UI design is NOT changed — only static
   values are replaced dynamically with logged-in user data.
══════════════════════════════════════════════════════ */
function updateProfile() {
  const name = S.userName;
  const init =
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "A";

  /* ── Settings profile card avatar ── */
  const pcAvatar = $("pcAvatar");
  if (pcAvatar) {
    if (S.userAvatar) {
      /* Show Google/social photo in settings avatar */
      if (!pcAvatar.querySelector("img")) {
        const img = document.createElement("img");
        img.style.cssText =
          "position:absolute;inset:0;width:100%;height:100%;border-radius:50%;object-fit:cover;";
        pcAvatar.appendChild(img);
      }
      pcAvatar.querySelector("img").src = S.userAvatar;
      pcAvatar.textContent = "";
      pcAvatar.appendChild(pcAvatar.querySelector("img"));
    } else {
      pcAvatar.innerHTML = init[0];
    }
  }

  /* ── Name input ── */
  const ni = $("profileNameInput");
  if (ni) ni.value = name;

  /* ── Social account info block ── */
  const socialInfo = $("pcSocialInfo");
  const socialBadge = $("pcSocialBadge");
  const socialProvider = $("pcSocialProvider");
  const emailEl = $("pcEmail");
  const passwordRow = $("passwordRow");

  if (S.isSocialLogin) {
    if (socialInfo) socialInfo.style.display = "flex";
    if (socialBadge)
      socialBadge.textContent =
        TRANSLATIONS[S.lang].social_account || "Social Account";
    if (socialProvider && S.userProvider)
      socialProvider.textContent =
        (TRANSLATIONS[S.lang].provider_label || "Provider:") +
        " " +
        S.userProvider;
    if (emailEl && S.userEmail) emailEl.textContent = S.userEmail;
    /* Disable password change for social login */
    if (passwordRow) passwordRow.style.display = "none";
    /* Make name input read-only for social login */
    if (ni) ni.readOnly = true;
  } else {
    if (socialInfo) socialInfo.style.display = "none";
    if (passwordRow) passwordRow.style.display = "flex";
    if (ni) ni.readOnly = false;
  }
}

/* ══════════════════════════════════════════════════════
   setGoogleUser() — MOVED FROM dashboard.js
   Syncs Google/social user data into S and localStorage.
══════════════════════════════════════════════════════ */
function setGoogleUser(name, avatarUrl, email = "", provider = "Google") {
  S.userName = name || S.userName;
  S.userAvatar = avatarUrl || "";
  S.userEmail = email || "";
  S.userProvider = provider || "Google";
  S.isSocialLogin = true;
  lsSet(LS.userName, S.userName);
  lsSet(LS.userAvatar, S.userAvatar);
  lsSet(LS.userEmail, S.userEmail);
  lsSet(LS.userProvider, S.userProvider);
  lsSet(LS.isSocialLogin, true);
  updateProfile();
}

/* ══════════════════════════════════════════════════════
   LOGOUT (moved from dashboard.js wire())
══════════════════════════════════════════════════════ */
function wireLogout() {
  $("logoutBtn")?.addEventListener("click", async () => {
    const confirmed = window.confirm(
      S.lang === "en"
        ? "Are you sure you want to sign out?"
        : "အကောင့်မှ ထွက်ရန် သေချာပါသလား?"
    );
    if (confirmed) {
      await _supabase.auth.signOut();
      localStorage.clear();
      location.href = "index.html";
    }
  });
}

/* ── Password change button (no-op placeholder — dashboard had no impl either) ── */
function wirePasswordBtn() {
  $("changePasswordBtn")?.addEventListener("click", () => {
    alert("Password change coming soon.");
  });
}

/* ══════════════════════════════════════════════════════
   INIT — AUTH GUARD + profile render
   LOGIN GUARD: Redirects to index.html if no active session.
   This mirrors the guard in dashboard.js init().
══════════════════════════════════════════════════════ */
async function init() {
  // AUTH CODE: Verify active Supabase session before showing profile
  const {
    data: { session },
  } = await _supabase.auth.getSession();

  // AUTH CODE: Login guard — redirect if not authenticated
  if (!session) {
    window.location.href = "index.html";
    return;
  }

  // Load theme from localStorage so profile page respects user preference
  const savedTheme = lsGet(LS.theme, "dark");
  applyTheme(savedTheme);

  // Load language from localStorage
  S.lang = lsGet(LS.lang, "en");

  // AUTH CODE: Populate S from Supabase session (same pattern as dashboard.js)
  const meta = session.user.user_metadata;
  S.userEmail = session.user.email;
  S.userName = meta.full_name || meta.name || S.userEmail.split("@")[0];
  S.userAvatar = meta.avatar_url || meta.picture || "";
  S.userProvider = session.user.app_metadata?.provider || "Email";
  S.isSocialLogin = S.userProvider.toLowerCase() !== "email";

  // Also persist to localStorage so dashboard.js can read on next load
  lsSet(LS.userName, S.userName);
  lsSet(LS.userAvatar, S.userAvatar);
  lsSet(LS.userEmail, S.userEmail);
  lsSet(LS.userProvider, S.userProvider);
  lsSet(LS.isSocialLogin, S.isSocialLogin);

  // Render profile UI with logged-in user's data
  updateProfile();

  // Wire interactive elements
  wireLogout();
  wirePasswordBtn();

  console.log(
    "%c Profile Ready ✓ ",
    "background:#f5a623; color:#1a0f00; padding:2px 5px; border-radius:3px;",
  );
}

/* ── Boot ── */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
