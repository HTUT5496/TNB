/* ══════════════════════════════════════════════════
   TNB Finance – Register Script
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
    note:         'Welcome! Create your account to start tracking your assets and expenses.',
    title:        'Register',
    subtitle:     'Join thousands managing their finances',
    labelUser:    'Username',
    labelPass:    'Password',
    labelConfirm: 'Confirm Password',
    btn:          'Create Account',
    label:        'Burmese',
    loginText:    'Already have an account?',
    resetText:    'Forgot Password? Reset',
    passMismatch: 'Passwords do not match!',
    passWeak:     'Password is too weak (min 6 chars)!',
    success:      '✓ Account created! Please check your email to verify, then login.',
    errExists:    'This username is already registered.',
  },
  my: {
    note:         'ကြိုဆိုပါသည်။ အကောင့်ဖွင့်၍ သင်၏ ပိုင်ဆိုင်မှုနှင့် ထွက်ငွေများကို မှတ်တမ်းတင်ပါ။',
    title:        'အကောင့်ဖွင့်ရန်',
    subtitle:     'ငွေကြေးစီမံခန့်ခွဲမှုတွင် ပါဝင်ပါ',
    labelUser:    'အသုံးပြုသူအမည်',
    labelPass:    'လျှို့ဝှက်နံပါတ်',
    labelConfirm: 'လျှို့ဝှက်နံပါတ်ကို ထပ်မံရိုက်ပါ',
    btn:          'မှတ်ပုံတင်မည်',
    label:        'English',
    loginText:    'အကောင့်ရှိပြီးသားလား?',
    resetText:    'လျှို့ဝှက်နံပါတ် မေ့နေပါသလား? ပြန်လည်သတ်မှတ်ရန်',
    passMismatch: 'လျှို့ဝှက်နံပါတ်များ တူညီမှုမရှိပါ။',
    passWeak:     'လျှို့ဝှက်နံပါတ် အားနည်းနေသည် (အနည်းဆုံး ၆ လုံး)!',
    success:      '✓ အကောင့်ဖွင့်ပြီးပါပြီ။ အီးမေးလ် စစ်ဆေးပြီး ဝင်ရောက်ပါ။',
    errExists:    'ဤအသုံးပြုသူအမည် အသုံးပြုနေပြီးဖြစ်သည်။',
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
  document.getElementById('lang-btn').innerHTML    = `<i class="fas fa-language"></i> ${d.label}`;
  document.getElementById('note-text').textContent = d.note;
  document.getElementById('title').textContent     = d.title;
  document.getElementById('form-subtitle').textContent = d.subtitle;
  document.getElementById('label-user').textContent    = d.labelUser;
  document.getElementById('label-pass').textContent    = d.labelPass;
  document.getElementById('label-confirm').textContent = d.labelConfirm;
  document.getElementById('btn-text').textContent  = d.btn;
  document.getElementById('login-text').innerHTML  = `${d.loginText} <a href="index.html">Login</a>`;
  document.getElementById('reset-text').innerHTML  = `<a href="reset.html">${d.resetText}</a>`;
}

/* ── Password toggle ── */
document.getElementById('togglePass').onclick = () => {
  const pwd  = document.getElementById('password');
  const icon = document.getElementById('eyeIcon');
  if (pwd.type === 'password') {
    pwd.type = 'text'; icon.className = 'fas fa-eye-slash';
  } else {
    pwd.type = 'password'; icon.className = 'fas fa-eye';
  }
};

/* ── Password strength meter ── */
document.getElementById('password').addEventListener('input', (e) => {
  const val  = e.target.value;
  const wrap = document.getElementById('strengthWrap');
  const fill = document.getElementById('strengthFill');
  const lbl  = document.getElementById('strengthLabel');

  if (!val) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'flex';

  let score = 0;
  if (val.length >= 6)  score++;
  if (val.length >= 10) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;

  const levels = [
    { pct: '20%', color: '#EF4444', label: 'Very Weak' },
    { pct: '40%', color: '#F97316', label: 'Weak' },
    { pct: '60%', color: '#EAB308', label: 'Fair' },
    { pct: '80%', color: '#10B981', label: 'Strong' },
    { pct: '100%',color: '#10B981', label: 'Very Strong' },
  ];
  const level = levels[Math.min(score - 1, 4)] || levels[0];
  fill.style.width      = level.pct;
  fill.style.background = level.color;
  lbl.textContent       = level.label;
  lbl.style.color       = level.color;
});

/* ── Register ── */
document.getElementById('reg-form').onsubmit = async (e) => {
  e.preventDefault();
  const d       = langData[currentLang];
  const btnText    = document.getElementById('btn-text');
  const btnIcon    = document.getElementById('btn-icon');
  const btnSpinner = document.getElementById('btn-spinner');
  const regBtn     = document.getElementById('reg-btn');

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const confirm  = document.getElementById('confirm-password').value;

  if (password !== confirm) { alert(d.passMismatch); return; }
  if (password.length < 6)  { alert(d.passWeak); return; }

  /* Loading */
  btnText.textContent = 'Creating…';
  btnIcon.classList.add('hidden');
  btnSpinner.classList.remove('hidden');
  regBtn.disabled = true;

  const email = username + '@tnb.com';

  const { data, error } = await _supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username, full_name: username }
    }
  });

  /* Try to create a profile row */
  if (data?.user) {
    await _supabase.from('profiles').upsert({
      id:         data.user.id,
      username:   username,
      avatar_url: null,
    }, { onConflict: 'id' });
  }

  btnText.textContent = d.btn;
  btnIcon.classList.remove('hidden');
  btnSpinner.classList.add('hidden');
  regBtn.disabled = false;

  if (error) {
    alert(error.message);
  } else {
    alert(d.success);
    window.location.href = 'index.html';
  }
};

/* ── Google Sign Up ── */
document.getElementById('gmail-btn').onclick = async () => {
  const { error } = await _supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://htut5496.github.io/TNB/dashboard.html',
    }
  });
  if (error) alert('Google Sign Up Error: ' + error.message);
};
