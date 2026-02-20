/* ═══════════════════════════════════════════════
   TNB – Reset Script  |  reset-script.js
   ⚠️  Supabase logic is UNTOUCHED.
   Only UI loading state helpers added.
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
    title: "Reset Password",
    emailPlaceholder: "Enter your Gmail",
    sendBtn: "Send OTP",
    modalTitle: "Verify OTP",
    otpPlaceholder: "OTP Code",
    newPassPlaceholder: "New Password",
    confirmPassPlaceholder: "Confirm Password",
    updateBtn: "Update & Login",
    cancelBtn: "Cancel",
    alertEmail: "Please enter email!",
    alertSent: "OTP Code has been sent to your Gmail.",
    alertMismatch: "Passwords do not match!",
    alertInvalid: "Invalid OTP Code!",
    alertSuccess: "Success! Password updated.",
  },
  my: {
    title: "လျှို့ဝှက်နံပါတ် ပြောင်းရန်",
    emailPlaceholder: "သင်၏ Gmail ကိုရိုက်ထည့်ပါ",
    sendBtn: "OTP ပို့မည်",
    modalTitle: "OTP စစ်ဆေးခြင်း",
    otpPlaceholder: "OTP နံပါတ်",
    newPassPlaceholder: "လျှို့ဝှက်နံပါတ်အသစ်",
    confirmPassPlaceholder: "လျှို့ဝှက်နံပါတ်ကို ထပ်မံရိုက်ပါ",
    updateBtn: "ပြင်ဆင်ပြီး ဝင်မည်",
    cancelBtn: "ပယ်ဖျက်မည်",
    alertEmail: "Gmail ရိုက်ထည့်ပေးပါ!",
    alertSent: "OTP နံပါတ်ကို သင်၏ Gmail သို့ ပို့လိုက်ပါပြီ။",
    alertMismatch: "လျှို့ဝှက်နံပါတ်များ တူညီမှုမရှိပါ။",
    alertInvalid: "OTP နံပါတ် မှားယွင်းနေပါသည်။",
    alertSuccess: "အောင်မြင်ပါသည်။ လျှို့ဝှက်နံပါတ် ပြောင်းလဲပြီးပါပြီ။",
  },
};

let currentLang = "en";

// ── UI Helper: set loading state (UI only, no auth logic) ──
function setLoading(btnId, loading) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  const text   = btn.querySelector('.btn-text');
  const loader = btn.querySelector('.btn-loader');
  if (text)   text.style.display   = loading ? 'none'   : 'inline';
  if (loader) loader.style.display = loading ? 'inline' : 'none';
  btn.disabled = loading;
}

// ── Language Switcher (UNCHANGED behavior) ──
document.getElementById("lang-btn").onclick = () => {
  currentLang = currentLang === "en" ? "my" : "en";
  const d = langData[currentLang];

  document.getElementById("lang-btn").innerHTML =
    `<i class="fas fa-language"></i> ${currentLang === "en" ? "Burmese" : "English"}`;
  document.getElementById("title").innerText                       = d.title;
  document.getElementById("reset-email").placeholder              = d.emailPlaceholder;
  document.querySelector("#send-otp-btn .btn-text").innerText      = d.sendBtn;
  document.getElementById("modal-title").innerText                 = d.modalTitle;
  document.getElementById("otp-code").placeholder                  = d.otpPlaceholder;
  document.getElementById("new-password").placeholder              = d.newPassPlaceholder;
  document.getElementById("confirm-new-password").placeholder      = d.confirmPassPlaceholder;
  document.querySelector("#verify-btn .btn-text").innerText        = d.updateBtn;
  document.getElementById("close-modal").innerHTML                 =
    `<i class="fas fa-times"></i> ${d.cancelBtn}`;
};

// ── Theme Toggle (UNCHANGED behavior) ──
document.getElementById("theme-btn").onclick = () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
  document.getElementById("theme-btn").innerText =
    document.body.classList.contains("dark-mode") ? "🌙 Dark" : "☀️ Light";
};

// ── Send OTP Logic (UNCHANGED Supabase logic) ──
document.getElementById("send-otp-btn").onclick = async () => {
  const d     = langData[currentLang];
  const email = document.getElementById("reset-email").value;
  if (!email) return alert(d.alertEmail);

  // UI: loading state
  setLoading("send-otp-btn", true);

  // UNCHANGED Supabase call
  const { error } = await _supabase.auth.resetPasswordForEmail(email);

  // UI: restore button
  setLoading("send-otp-btn", false);

  if (error) {
    // UNCHANGED error handling
    alert(error.message);
  } else {
    // UNCHANGED: show OTP modal
    document.getElementById("otp-modal").style.display = "block";
    alert(d.alertSent);
  }
};

// ── Modal Close (UNCHANGED behavior) ──
document.getElementById("close-modal").onclick = () => {
  document.getElementById("otp-modal").style.display = "none";
};

// ── Verify & Update Logic (UNCHANGED Supabase logic) ──
document.getElementById("verify-btn").onclick = async () => {
  const d           = langData[currentLang];
  const email       = document.getElementById("reset-email").value;
  const otp         = document.getElementById("otp-code").value;
  const newPass     = document.getElementById("new-password").value;
  const confirmPass = document.getElementById("confirm-new-password").value;

  // UNCHANGED password mismatch check
  if (newPass !== confirmPass) return alert(d.alertMismatch);

  // UI: loading state
  setLoading("verify-btn", true);

  // UNCHANGED Supabase OTP verification
  const { data, error } = await _supabase.auth.verifyOtp({
    email: email,
    token: otp,
    type: "recovery",
  });

  if (error) {
    // UNCHANGED error handling
    alert(d.alertInvalid);
    setLoading("verify-btn", false);
  } else {
    // UNCHANGED Supabase password update
    const { error: updateError } = await _supabase.auth.updateUser({
      password: newPass,
    });

    setLoading("verify-btn", false);

    if (updateError) {
      // UNCHANGED error handling
      alert(updateError.message);
    } else {
      // UNCHANGED success and redirect
      alert(d.alertSuccess);
      location.href = "dashboard.html";
    }
  }
};
