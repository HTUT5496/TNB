/* ══════════════════════════════════════════════════
   TNB Finance – Login Script
   Supabase: vnemlphmqmrjpenxlsxx.supabase.co
══════════════════════════════════════════════════ */
'use strict';

const { createClient } = supabase;
const _supabase = createClient(
  'https://vnemlphmqmrjpenxlsxx.supabase.co',
  'sb_publishable_7nh01CaeLQs9TyhA_Qu8Yw_UzwXgOvq'
);

/* ── i18n ── */
const langData = {
  en: {
    note:      'Welcome to the financial management software. We will always try to distinguish your assets and losses.',
    title:     'Login',
    subtitle:  'Sign in to your account',
    labelUser: 'Username',
    labelPass: 'Password',
    btn:       'Login',
    label:     'Burmese',
    signup:    "Don't have an account?",
    reset:     'Forgot password?',
    errInvalid:'Invalid Username or Password!',
    errGoogle: 'Google Login Error',
  },
  my: {
    note:      'ဘဏ္ဍာရေးစီမံခန့်ခွဲမှု ဆော့ဖ်ဝဲမှ ကြိုဆိုပါသည်။ သင်၏ ပိုင်ဆိုင်မှုနှင့် ဆုံးရှုံးမှုများကို ခွဲခြားနိုင်ရန် ကျွန်ုပ်တို့ အမြဲတမ်း ကြိုးစားနေပါမည်။',
    title:     'လော့ဂ်အင်',
    subtitle:  'အကောင့်သို့ ဝင်ရောက်ပါ',
    labelUser: 'အသုံးပြုသူအမည်',
    labelPass: 'လျှို့ဝှက်နံပါတ်',
    btn:       'ဝင်မည်',
    label:     'English',
    signup:    'အကောင့်မရှိသေးဘူးလား?',
    reset:     'လျှို့ဝှက်နံပါတ် မေ့နေပါသလား?',
    errInvalid:'အသုံးပြုသူအမည် သို့မဟုတ် လျှို့ဝှက်နံပါတ် မှားယွင်းနေပါသည်။',
    errGoogle: 'Google ဝင်ရောက်မှု အမှား',
  }
};

let currentLang = 'en';

/* ── Theme ── */
const themeBtn = document.getElementById('theme-btn');
themeBtn.onclick = () => {
  const isLight = document.body.classList.toggle('light-mode');
  document.body.classList.toggle('dark-mode', !isLight);
  themeBtn.innerHTML = isLight
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
  document.getElementById('lang-btn').innerHTML = `<i class="fas fa-language"></i> ${d.label}`;
  document.getElementById('note-text').textContent = d.note;
  document.getElementById('title').textContent = d.title;
  document.getElementById('form-subtitle').textContent = d.subtitle;
  document.getElementById('label-user').textContent = d.labelUser;
  document.getElementById('label-pass').textContent = d.labelPass;
  document.getElementById('btn-text').textContent = d.btn;
  document.getElementById('signup-text').innerHTML = `${d.signup} <a href="register.html" id="signup-link">Sign Up</a>`;
  document.getElementById('reset-text').innerHTML  = `${d.reset} <a href="reset.html" id="reset-link">Reset Password</a>`;
}

/* ── Password toggle ── */
document.getElementById('togglePass').onclick = () => {
  const pwd  = document.getElementById('password');
  const icon = document.getElementById('eyeIcon');
  if (pwd.type === 'password') {
    pwd.type = 'text';
    icon.className = 'fas fa-eye-slash';
  } else {
    pwd.type = 'password';
    icon.className = 'fas fa-eye';
  }
};

/* ── Login ── */
document.getElementById('login-form').onsubmit = async (e) => {
  e.preventDefault();
  const btnText    = document.getElementById('btn-text');
  const btnIcon    = document.getElementById('btn-icon');
  const btnSpinner = document.getElementById('btn-spinner');
  const loginBtn   = document.getElementById('login-btn');

  /* Loading state */
  btnText.textContent = 'Signing in…';
  btnIcon.classList.add('hidden');
  btnSpinner.classList.remove('hidden');
  loginBtn.disabled = true;

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const email    = username + '@tnb.com';

  const { data, error } = await _supabase.auth.signInWithPassword({ email, password });

  btnText.textContent = langData[currentLang].btn;
  btnIcon.classList.remove('hidden');
  btnSpinner.classList.add('hidden');
  loginBtn.disabled = false;

  if (error) {
    alert(langData[currentLang].errInvalid);
  } else {
    location.href = 'dashboard.html';
  }
};

/* ── Google OAuth ── */
document.getElementById('gmail-btn').onclick = async () => {
  const btn = document.getElementById('gmail-btn');
  btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Connecting…';
  btn.disabled = true;

  const { error } = await _supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://htut5496.github.io/TNB/dashboard.html',
    }
  });

  if (error) {
    alert(langData[currentLang].errGoogle + ': ' + error.message);
    btn.innerHTML = '<i class="fab fa-google social-icon google-icon"></i><span>Continue with Google</span>';
    btn.disabled = false;
  }
};

/* ── Auto-redirect if already logged in ── */
(async () => {
  const { data: { session } } = await _supabase.auth.getSession();
  if (session) location.href = 'dashboard.html';
})();
