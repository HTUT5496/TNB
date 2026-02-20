/* ══════════════════════════════════════════════════
   TNB Finance – Reset Password Script
   Supabase: vnemlphmqmrjpenxlsxx.supabase.co
══════════════════════════════════════════════════ */
'use strict';

const { createClient } = supabase;
const _supabase = createClient(
  'https://vnemlphmqmrjpenxlsxx.supabase.co',
  'sb_publishable_7nh01CaeLQs9TyhA_Qu8Yw_UzwXgOvq'
);

const langData = {
  en: {
    title:               'Reset Password',
    emailPlaceholder:    'Enter your Gmail',
    sendBtn:             'Send OTP Code',
    modalTitle:          'Verify OTP',
    otpPlaceholder:      '6-digit code',
    newPassPlaceholder:  'New password (min 6 chars)',
    confirmPlaceholder:  'Re-enter new password',
    updateBtn:           'Update & Login',
    cancelBtn:           'Cancel',
    alertEmail:          'Please enter your Gmail address!',
    alertSent:           '✓ OTP code sent to your Gmail. Check your inbox.',
    alertMismatch:       'Passwords do not match!',
    alertInvalid:        'Invalid OTP code. Please try again.',
    alertSuccess:        '✓ Password updated successfully!',
    label:               'Burmese',
  },
  my: {
    title:               'လျှို့ဝှက်နံပါတ် ပြောင်းရန်',
    emailPlaceholder:    'Gmail ကိုရိုက်ထည့်ပါ',
    sendBtn:             'OTP ပို့မည်',
    modalTitle:          'OTP စစ်ဆေးခြင်း',
    otpPlaceholder:      '၆ လုံး နံပါတ်',
    newPassPlaceholder:  'လျှို့ဝှက်နံပါတ်အသစ်',
    confirmPlaceholder:  'ထပ်မံရိုက်ပါ',
    updateBtn:           'ပြင်ဆင်ပြီး ဝင်မည်',
    cancelBtn:           'ပယ်ဖျက်မည်',
    alertEmail:          'Gmail ရိုက်ထည့်ပေးပါ!',
    alertSent:           '✓ OTP နံပါတ်ကို Gmail သို့ ပို့လိုက်ပါပြီ။',
    alertMismatch:       'လျှို့ဝှက်နံပါတ်များ တူညီမှုမရှိပါ။',
    alertInvalid:        'OTP နံပါတ် မှားယွင်းနေပါသည်။',
    alertSuccess:        '✓ လျှို့ဝှက်နံပါတ် ပြောင်းလဲပြီးပါပြီ။',
    label:               'English',
  }
};

let currentLang = 'en';

/* ── Theme ── */
document.getElementById('theme-btn').onclick = () => {
  const isLight = document.body.classList.toggle('light-mode');
  document.body.classList.toggle('dark-mode', !isLight);
  document.getElementById('theme-btn').innerHTML = isLight
    ? '<i class="fas fa-sun"></i> Light'
    : '<i class="fas fa-moon"></i> Dark';
};

/* ── Language ── */
document.getElementById('lang-btn').onclick = () => {
  currentLang = currentLang === 'en' ? 'my' : 'en';
  applyLang();
};

function applyLang() {
  const d = langData[currentLang];
  document.getElementById('lang-btn').innerHTML           = `<i class="fas fa-language"></i> ${d.label}`;
  document.getElementById('title').textContent            = d.title;
  document.getElementById('reset-email').placeholder      = d.emailPlaceholder;
  document.getElementById('otp-btn-text').textContent     = d.sendBtn;
  document.getElementById('modal-title').textContent      = d.modalTitle;
  document.getElementById('otp-code').placeholder         = d.otpPlaceholder;
  document.getElementById('new-password').placeholder     = d.newPassPlaceholder;
  document.getElementById('confirm-new-password').placeholder = d.confirmPlaceholder;
  document.getElementById('verify-btn-text').textContent  = d.updateBtn;
  document.getElementById('close-modal').innerHTML        = `<i class="fas fa-times"></i> ${d.cancelBtn}`;
}

/* ── Send OTP ── */
document.getElementById('send-otp-btn').onclick = async () => {
  const d     = langData[currentLang];
  const email = document.getElementById('reset-email').value.trim();
  if (!email) { alert(d.alertEmail); return; }

  const btnText    = document.getElementById('otp-btn-text');
  const btnIcon    = document.getElementById('otp-btn-icon');
  const btnSpinner = document.getElementById('otp-btn-spinner');
  const btn        = document.getElementById('send-otp-btn');

  btnText.textContent = 'Sending…';
  btnIcon.classList.add('hidden');
  btnSpinner.classList.remove('hidden');
  btn.disabled = true;

  const { error } = await _supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://htut5496.github.io/TNB/reset.html',
  });

  btnText.textContent = d.sendBtn;
  btnIcon.classList.remove('hidden');
  btnSpinner.classList.add('hidden');
  btn.disabled = false;

  if (error) {
    alert(error.message);
  } else {
    document.getElementById('otp-modal').style.display = 'block';
    alert(d.alertSent);
  }
};

/* ── Close modal ── */
document.getElementById('close-modal').onclick = () => {
  document.getElementById('otp-modal').style.display = 'none';
};

/* ── Verify & Update ── */
document.getElementById('verify-btn').onclick = async () => {
  const d           = langData[currentLang];
  const email       = document.getElementById('reset-email').value.trim();
  const otp         = document.getElementById('otp-code').value.trim();
  const newPass     = document.getElementById('new-password').value;
  const confirmPass = document.getElementById('confirm-new-password').value;

  if (newPass !== confirmPass) { alert(d.alertMismatch); return; }

  /* Verify OTP */
  const { error } = await _supabase.auth.verifyOtp({
    email,
    token: otp,
    type:  'recovery',
  });

  if (error) {
    alert(d.alertInvalid);
    return;
  }

  /* Update password */
  const { error: updateError } = await _supabase.auth.updateUser({ password: newPass });

  if (updateError) {
    alert(updateError.message);
  } else {
    alert(d.alertSuccess);
    location.href = 'dashboard.html';
  }
};
