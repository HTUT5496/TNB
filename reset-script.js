// Supabase Client Initialization
const { createClient } = supabase;
const _supabase = createClient(
  "https://lqfjeamzbxayfbjntarr.supabase.co",
  "sb_publishable_jDExXkASC_jrulY8B7noFw_r9qut-vQ",
);

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

// Language Switcher
document.getElementById("lang-btn").onclick = () => {
  currentLang = currentLang === "en" ? "my" : "en";
  const d = langData[currentLang];

  document.getElementById("lang-btn").innerText =
    currentLang === "en" ? "Burmese" : "English";
  document.getElementById("title").innerText = d.title;
  document.getElementById("reset-email").placeholder = d.emailPlaceholder;
  document.getElementById("send-otp-btn").innerText = d.sendBtn;
  document.getElementById("modal-title").innerText = d.modalTitle;
  document.getElementById("otp-code").placeholder = d.otpPlaceholder;
  document.getElementById("new-password").placeholder = d.newPassPlaceholder;
  document.getElementById("confirm-new-password").placeholder =
    d.confirmPassPlaceholder;
  document.getElementById("verify-btn").innerText = d.updateBtn;
  document.getElementById("close-modal").innerText = d.cancelBtn;
};

// Theme Toggle
document.getElementById("theme-btn").onclick = () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
  document.getElementById("theme-btn").innerText =
    document.body.classList.contains("dark-mode") ? "🌙 Dark" : "☀️ Light";
};

// Send OTP Logic
document.getElementById("send-otp-btn").onclick = async () => {
  const d = langData[currentLang];
  const email = document.getElementById("reset-email").value;
  if (!email) return alert(d.alertEmail);

  const { error } = await _supabase.auth.resetPasswordForEmail(email);

  if (error) {
    alert(error.message);
  } else {
    document.getElementById("otp-modal").style.display = "block";
    alert(d.alertSent);
  }
};

// Modal Close
document.getElementById("close-modal").onclick = () => {
  document.getElementById("otp-modal").style.display = "none";
};

// Verify & Update Logic
document.getElementById("verify-btn").onclick = async () => {
  const d = langData[currentLang];
  const email = document.getElementById("reset-email").value;
  const otp = document.getElementById("otp-code").value;
  const newPass = document.getElementById("new-password").value;
  const confirmPass = document.getElementById("confirm-new-password").value;

  if (newPass !== confirmPass) return alert(d.alertMismatch);

  // OTP Verification
  const { data, error } = await _supabase.auth.verifyOtp({
    email: email,
    token: otp,
    type: "recovery",
  });

  if (error) {
    alert(d.alertInvalid);
  } else {
    // Update password
    const { error: updateError } = await _supabase.auth.updateUser({
      password: newPass,
    });
    if (updateError) {
      alert(updateError.message);
    } else {
      alert(d.alertSuccess);
      // Folder မရှိတော့သဖြင့် dashboard.html သို့ တိုက်ရိုက်သွားရန် ပြင်ဆင်သည်
      location.href = "dashboard.html";
    }
  }
};
