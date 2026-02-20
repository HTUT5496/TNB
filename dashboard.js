/* ══════════════════════════════════════════════════════
   FINPAY – SMART FINANCE  |  dashboard.js  v5.0
   ──────────────────────────────────────────────────────
   Modules:
     1.  Supabase Init
     2.  Translations
     3.  Categories
     4.  App State
     5.  LocalStorage
     6.  Finance Calculations
     7.  DOM Helpers
     8.  Animated Counter
     9.  Update Totals
    10.  Transaction Card Builder
    11.  Render Feeds
    12.  Usage Summary
    13.  Category Breakdown
    14.  Spending Chart
    15.  Quick Actions
    16.  Notification System
    17.  Toast System
    18.  Transaction CRUD
    19.  Filter Logic
    20.  Render All
    21.  Navigation
    22.  Modal
    23.  Theme System
    24.  Language System
    25.  Greeting & Date
    26.  Export CSV
    27.  Profile (Manual + Google/Social)
    28.  Password Management
    29.  Avatar Upload
    30.  FAB
    31.  Close All Panels
    32.  Search
    33.  Event Wiring
    34.  Init
══════════════════════════════════════════════════════ */
'use strict';

/* ═══════════════════════════════════════════
   1. SUPABASE INIT
═══════════════════════════════════════════ */
const SUPABASE_URL     = 'https://vnemlphmqmrjpenxlsxx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_7nh01CaeLQs9TyhA_Qu8Yw_UzwXgOvq';

let supabase = null;
try {
  if (window.supabase && window.supabase.createClient) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch (e) {
  console.warn('Supabase not available, running in localStorage mode.', e);
}

/* ═══════════════════════════════════════════
   2. TRANSLATIONS
═══════════════════════════════════════════ */
const TRANSLATIONS = {
  en: {
    brand: 'FinPay',
    nav_dashboard:      'Home',
    nav_transactions:   'History',
    nav_reports:        'Reports',
    nav_settings:       'Settings',
    premium_member:     'Premium Member',
    good_morning:       'Good morning,',
    good_afternoon:     'Good afternoon,',
    good_evening:       'Good evening,',
    available_balance:  'Balance',
    income:             'Income',
    expense:            'Expense',
    add_income:         'Add Income',
    add_expense:        'Add Expense',
    reports:            'Reports',
    spending_overview:  'Spending Overview',
    last_7:             'Last 7 Days',
    last_30:            'Last 30 Days',
    all_transactions:   'All Transactions',
    all:                'All',
    export_csv:         'Export CSV',
    total_income:       'Total Income',
    total_expense:      'Total Expense',
    net_balance:        'Net Balance',
    total_transactions: 'Transactions',
    category_breakdown: 'Category Breakdown',
    settings:           'Settings',
    dark_mode:          'Dark Mode',
    dark_mode_sub:      'Switch between dark and light',
    language:           'Language',
    language_sub:       'English / Burmese',
    notifications_setting: 'Notifications',
    notifications_sub:  'Balance change alerts',
    clear_data:         'Clear All Data',
    clear_data_sub:     'Remove all transactions',
    clear:              'Clear',
    logout:             'Logout',
    notifications:      'Notifications',
    clear_all:          'Clear All',
    no_notifs:          'No notifications yet',
    amount:             'Amount ($)',
    category:           'Category',
    description:        'Description',
    date:               'Date',
    add_transaction:    'Add Transaction',
    cancel:             'Cancel',
    confirm:            'Confirm',
    modal_income_title:  'Add Income',
    modal_expense_title: 'Add Expense',
    notif_balance_now:   'Your balance is now',
    notif_added_income:  '↑ Income Added',
    notif_added_expense: '↓ Expense Added',
    confirm_delete:      'Delete this transaction?',
    confirm_delete_msg:  'This action cannot be undone.',
    confirm_clear:       'Clear all data?',
    confirm_clear_msg:   'All transactions will be permanently removed.',
    no_transactions:     'No transactions yet',
    add_first:           'Tap + to add your first entry',
    search_results:      'Search Results',
    quick_actions:       'Quick Actions',
    tap_to_add:          'Tap to add transaction',
    usage_summary:       'Usage Summary',
    qa_total_added:      'Total Added',
    qa_total_used:       'Total Used',
    filter_type:         'Type',
    start_date:          'From',
    end_date:            'To',
    apply_filter:        'Apply Filter',
    reset_filter:        'Reset',
    err_date_range:      'Start date must be before end date.',
    err_date_required:   'Please select both start and end dates.',
    filter_active:       'Filter active',
    change_password:     'Change Password',
    change_password_sub: 'Update your account password',
    current_password:    'Current Password',
    new_password:        'New Password',
    confirm_password:    'Confirm Password',
    save_password:       'Save Password',
    pw_strength_weak:    'Weak',
    pw_strength_fair:    'Fair',
    pw_strength_good:    'Good',
    pw_strength_strong:  'Strong',
    pw_mismatch:         'Passwords do not match.',
    pw_too_short:        'Password must be at least 8 characters.',
    pw_wrong_current:    'Current password is incorrect.',
    pw_saved:            'Password updated successfully!',
    change:              'Change',
    social_account:      'Social Account',
    provider_label:      'Provider:',
    google_account:      'Google Account',
    set_password:        'Set Password',
    set_password_sub:    'Create a password for manual login',
    cat_salary:          'Salary',
    cat_freelance:       'Freelance',
    cat_investment:      'Invest',
    cat_gift:            'Gift',
    cat_other_income:    'Other Income',
    cat_food:            'Food',
    cat_transport:       'Transport',
    cat_shopping:        'Shopping',
    cat_bills:           'Bills',
    cat_health:          'Health',
    cat_entertainment:   'Entertain',
    cat_education:       'Education',
    cat_rent:            'Rent',
    cat_other_expense:   'Other',
  },
  my: {
    brand: 'FinPay',
    nav_dashboard:      'ဒက်ရ်ဘုတ်',
    nav_transactions:   'မှတ်တမ်း',
    nav_reports:        'အစီရင်ခံ',
    nav_settings:       'ဆက်တင်',
    premium_member:     'ပရီမီယံ အဖွဲ့ဝင်',
    good_morning:       'မင်္ဂလာနံနက်ခင်းပါ၊',
    good_afternoon:     'မင်္ဂလာနေ့လည်ပါ၊',
    good_evening:       'မင်္ဂလာညနေပါ၊',
    available_balance:  'လက်ကျန်',
    income:             'ဝင်ငွေ',
    expense:            'ထွက်ငွေ',
    add_income:         'ဝင်ငွေထည့်',
    add_expense:        'ထွက်ငွေထည့်',
    reports:            'အစီရင်ခံ',
    spending_overview:  'ငွေသုံးမှု အနှစ်ချုပ်',
    last_7:             'ၿပီးခဲ့သော ၇ ရက်',
    last_30:            'ၿပီးခဲ့သော ၃၀ ရက်',
    all_transactions:   'ငွေသွင်း/ထုတ် အားလုံး',
    all:                'အားလုံး',
    export_csv:         'CSV ထုတ်ယူ',
    total_income:       'စုစုပေါင်း ဝင်ငွေ',
    total_expense:      'စုစုပေါင်း ထွက်ငွေ',
    net_balance:        'အသားတင် လက်ကျန်',
    total_transactions: 'ငွေလွှဲ စုစုပေါင်း',
    category_breakdown: 'အမျိုးအစားအလိုက်',
    settings:           'ဆက်တင်',
    dark_mode:          'အမဲရောင် မုဒ်',
    dark_mode_sub:      'အမဲ / အဖြူ ပြောင်းလဲ',
    language:           'ဘာသာစကား',
    language_sub:       'အင်္ဂလိပ် / မြန်မာ',
    notifications_setting: 'အကြောင်းကြားချက်',
    notifications_sub:  'လက်ကျန်ငွေ သတိပေး',
    clear_data:         'ဒေတာ အားလုံး ရှင်းလင်း',
    clear_data_sub:     'ငွေသွင်း/ထုတ် အားလုံး ဖျက်မည်',
    clear:              'ရှင်းလင်း',
    logout:             'ထွက်မည်',
    notifications:      'အကြောင်းကြားချက်',
    clear_all:          'အားလုံး ရှင်းလင်း',
    no_notifs:          'အကြောင်းကြားချက် မရှိသေးပါ',
    amount:             'ငွေပမာဏ ($)',
    category:           'အမျိုးအစား',
    description:        'ဖော်ပြချက်',
    date:               'ရက်စွဲ',
    add_transaction:    'ငွေသွင်း/ထုတ် ထည့်',
    cancel:             'မလုပ်တော့',
    confirm:            'အတည်ပြု',
    modal_income_title:  'ဝင်ငွေ ထည့်သည်',
    modal_expense_title: 'ထွက်ငွေ ထည့်သည်',
    notif_balance_now:   'သင့်လက်ကျန်ငွေ',
    notif_added_income:  '↑ ဝင်ငွေ ထည့်ပြီး',
    notif_added_expense: '↓ ထွက်ငွေ ထည့်ပြီး',
    confirm_delete:      'ဤငွေလွှဲကို ဖျက်မလား?',
    confirm_delete_msg:  'ဤလုပ်ဆောင်ချက်ကို ပြန်မလုပ်နိုင်ပါ။',
    confirm_clear:       'ဒေတာ အားလုံး ရှင်းမလား?',
    confirm_clear_msg:   'ငွေသွင်း/ထုတ် အားလုံး ပြည်တမ်း ဖျက်မည်။',
    no_transactions:     'ငွေသွင်း/ထုတ် မရှိသေးပါ',
    add_first:           '+ ကိုနှိပ်၍ ထည့်ပါ',
    search_results:      'ရှာဖွေမှု ရလဒ်',
    quick_actions:       'မြန်ဆန်သော လုပ်ဆောင်ချက်',
    tap_to_add:          'ငွေသွင်း/ထုတ် ထည့်ရန် နှိပ်ပါ',
    usage_summary:       'အသုံးပြုမှု အနှစ်ချုပ်',
    qa_total_added:      'စုစုပေါင်း ထည့်သည်',
    qa_total_used:       'စုစုပေါင်း သုံးသည်',
    filter_type:         'အမျိုးအစား',
    start_date:          'စတင်ရက်',
    end_date:            'ပြီးဆုံးရက်',
    apply_filter:        'စစ်ထုတ်မည်',
    reset_filter:        'ပြန်သတ်မှတ်',
    err_date_range:      'စတင်ရက်သည် ပြီးဆုံးရက်မတိုင်မီ ဖြစ်ရမည်။',
    err_date_required:   'ရက်စွဲ နှစ်ခု ရွေးပါ။',
    filter_active:       'စစ်ထုတ်မှု ဖွင့်ထားသည်',
    change_password:     'စကားဝှက် ပြောင်းရန်',
    change_password_sub: 'အကောင့် စကားဝှက် ပြောင်းမည်',
    current_password:    'လက်ရှိ စကားဝှက်',
    new_password:        'စကားဝှက် အသစ်',
    confirm_password:    'စကားဝှက် အတည်ပြု',
    save_password:       'စကားဝှက် သိမ်းမည်',
    pw_strength_weak:    'အားနည်း',
    pw_strength_fair:    'သင့်တော်',
    pw_strength_good:    'ကောင်း',
    pw_strength_strong:  'ခိုင်မာ',
    pw_mismatch:         'စကားဝှက် မတူညီပါ။',
    pw_too_short:        'စကားဝှက် အနည်းဆုံး ၈ လုံး ဖြစ်ရမည်။',
    pw_wrong_current:    'လက်ရှိ စကားဝှက် မှားယွင်းနေသည်။',
    pw_saved:            'စကားဝှက် ပြောင်းလဲ ပြီးပါပြီ!',
    change:              'ပြောင်းမည်',
    social_account:      'ဆိုရှယ် အကောင့်',
    provider_label:      'ဝန်ဆောင်မှု:',
    google_account:      'Google အကောင့်',
    set_password:        'စကားဝှက် သတ်မှတ်ရန်',
    set_password_sub:    'ကိုယ်တိုင် ဝင်ရောက်မှု အတွက်',
    cat_salary:          'လစာ',
    cat_freelance:       'ဖရီးလန်စ်',
    cat_investment:      'ရင်းနှီး',
    cat_gift:            'လက်ဆောင်',
    cat_other_income:    'အခြား ဝင်ငွေ',
    cat_food:            'အစားအသောက်',
    cat_transport:       'သယ်ယူ',
    cat_shopping:        'ဈေးဝယ်',
    cat_bills:           'ဘီလ်',
    cat_health:          'ကျန်းမာ',
    cat_entertainment:   'အပျော်',
    cat_education:       'ပညာ',
    cat_rent:            'အငှားခ',
    cat_other_expense:   'အခြား',
  }
};

/* ═══════════════════════════════════════════
   3. CATEGORIES
═══════════════════════════════════════════ */
const CATEGORIES = {
  income: [
    { key: 'cat_salary',       icon: '💼' },
    { key: 'cat_freelance',    icon: '💻' },
    { key: 'cat_investment',   icon: '📈' },
    { key: 'cat_gift',         icon: '🎁' },
    { key: 'cat_other_income', icon: '💰' },
  ],
  expense: [
    { key: 'cat_food',          icon: '🍜' },
    { key: 'cat_transport',     icon: '🚗' },
    { key: 'cat_shopping',      icon: '🛍️' },
    { key: 'cat_bills',         icon: '📄' },
    { key: 'cat_health',        icon: '💊' },
    { key: 'cat_entertainment', icon: '🎬' },
    { key: 'cat_education',     icon: '📚' },
    { key: 'cat_rent',          icon: '🏠' },
    { key: 'cat_other_expense', icon: '💸' },
  ]
};

const QUICK_ACTIONS = [
  { key: 'cat_salary',     type: 'income',  icon: '💼' },
  { key: 'cat_freelance',  type: 'income',  icon: '💻' },
  { key: 'cat_investment', type: 'income',  icon: '📈' },
  { key: 'cat_food',       type: 'expense', icon: '🍜' },
  { key: 'cat_transport',  type: 'expense', icon: '🚗' },
  { key: 'cat_shopping',   type: 'expense', icon: '🛍️' },
  { key: 'cat_bills',      type: 'expense', icon: '📄' },
  { key: 'cat_health',     type: 'expense', icon: '💊' },
];

/* ═══════════════════════════════════════════
   4. APP STATE
═══════════════════════════════════════════ */
const S = {
  transactions:  [],
  notifications: [],
  lang:          'en',
  theme:         'dark',
  notifEnabled:  true,
  userName:      'Alex Morgan',
  userAvatar:    '',
  userEmail:     '',
  userProvider:  '',
  isSocialLogin: false,
  supabaseUserId: '',
  /* Password (manual login - stored as hash for demo; real use: Supabase updateUser) */
  userPasswordHash: '',
  txnFilter:       'all',
  txnDateFrom:     '',
  txnDateTo:       '',
  txnFilterActive: false,
  searchQuery:     '',
  fabOpen:         false,
  confirmCb:       null,
};

/* ═══════════════════════════════════════════
   5. LOCAL STORAGE
═══════════════════════════════════════════ */
const LS = {
  transactions:     'finpay_transactions',
  notifications:    'finpay_notifications',
  lang:             'finpay_lang',
  theme:            'finpay_theme',
  notifEnabled:     'finpay_notif',
  userName:         'finpay_username',
  userAvatar:       'finpay_avatar',
  userEmail:        'finpay_email',
  userProvider:     'finpay_provider',
  isSocialLogin:    'finpay_social',
  supabaseUserId:   'finpay_uid',
  userPasswordHash: 'finpay_pwhash',
};

const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const lsGet = (k, fb) => { try { const v = localStorage.getItem(k); return v !== null ? JSON.parse(v) : fb; } catch { return fb; } };

function loadState() {
  S.transactions     = lsGet(LS.transactions,  []);
  S.notifications    = lsGet(LS.notifications, []);
  S.lang             = lsGet(LS.lang,  'en');
  S.theme            = lsGet(LS.theme, 'dark');
  S.notifEnabled     = lsGet(LS.notifEnabled, true);
  S.userName         = lsGet(LS.userName,     'Alex Morgan');
  S.userAvatar       = lsGet(LS.userAvatar,    '');
  S.userEmail        = lsGet(LS.userEmail,     '');
  S.userProvider     = lsGet(LS.userProvider,  '');
  S.isSocialLogin    = lsGet(LS.isSocialLogin, false);
  S.supabaseUserId   = lsGet(LS.supabaseUserId,'');
  S.userPasswordHash = lsGet(LS.userPasswordHash, '');
}

const saveTxns   = () => lsSet(LS.transactions,  S.transactions);
const saveNotifs = () => lsSet(LS.notifications, S.notifications);

/* ═══════════════════════════════════════════
   6. FINANCE CALCULATIONS
═══════════════════════════════════════════ */
function calcTotals() {
  let inc = 0, exp = 0;
  for (const t of S.transactions) {
    t.type === 'income' ? (inc += t.amount) : (exp += t.amount);
  }
  return { inc, exp, bal: inc - exp };
}

function groupByCategory() {
  const map = new Map();
  for (const t of S.transactions) {
    const existing = map.get(t.categoryKey);
    if (existing) {
      existing.total += t.amount;
    } else {
      const meta = getCatMeta(t.type, t.categoryKey);
      map.set(t.categoryKey, { total: t.amount, type: t.type, icon: meta.icon });
    }
  }
  return map;
}

const fmt = n => new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2, maximumFractionDigits: 2
}).format(n);

/* ═══════════════════════════════════════════
   7. DOM HELPERS
═══════════════════════════════════════════ */
const $       = id => document.getElementById(id);
const setText = (id, v) => { const e = $(id); if (e) e.textContent = v; };

/* ═══════════════════════════════════════════
   8. ANIMATED COUNTER
═══════════════════════════════════════════ */
function animCount(elId, target) {
  const el = $(elId);
  if (!el) return;
  const from = parseFloat(el.textContent.replace(/,/g, '')) || 0;
  const diff = target - from;
  const dur  = 660;
  let t0     = null;
  const step = ts => {
    if (!t0) t0 = ts;
    const p    = Math.min((ts - t0) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(from + diff * ease);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ═══════════════════════════════════════════
   9. UPDATE TOTALS
═══════════════════════════════════════════ */
function updateTotals() {
  const { inc, exp, bal } = calcTotals();
  setText('r2Balance', '$' + fmt(bal));
  setText('r2Income',  '$' + fmt(inc));
  setText('r2Expense', '$' + fmt(exp));
  setText('repIncome',  '$' + fmt(inc));
  setText('repExpense', '$' + fmt(exp));
  setText('repBalance', '$' + fmt(bal));
  setText('repCount',   S.transactions.length);
  const rb = $('repBalance');
  if (rb) rb.style.color = bal >= 0 ? 'var(--inc)' : 'var(--exp)';
}

/* ═══════════════════════════════════════════
   10. TRANSACTION CARD BUILDER
═══════════════════════════════════════════ */
function getCatMeta(type, key) {
  return (CATEGORIES[type] || []).find(c => c.key === key)
    || { icon: type === 'income' ? '💰' : '💸' };
}

function makeTxnCard(txn, idx) {
  const T    = TRANSLATIONS[S.lang];
  const meta = getCatMeta(txn.type, txn.categoryKey);
  const lbl  = T[txn.categoryKey] || txn.category;
  const sign = txn.type === 'income' ? '+' : '-';
  const ds   = txn.date
    ? new Date(txn.date + 'T00:00:00').toLocaleDateString('en-US',
        { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  const div = document.createElement('div');
  div.className    = 'txn-card';
  div.dataset.type = txn.type;
  div.style.animationDelay = Math.min(idx * 0.04, 0.5) + 's';
  div.innerHTML = `
    <div class="txn-ico ${txn.type}">${meta.icon}</div>
    <div class="txn-info">
      <div class="txn-cat">${lbl}</div>
      <div class="txn-desc">${txn.description || ''}</div>
    </div>
    <div class="txn-meta">
      <div class="txn-amt ${txn.type}">${sign}$${fmt(txn.amount)}</div>
      <div class="txn-date">${ds}</div>
    </div>
    <button class="txn-del" data-id="${txn.id}" title="Delete">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
        <polyline points="3 6 5 6 21 6"/>
        <path d="M19 6l-1 14H6L5 6"/>
        <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
      </svg>
    </button>`;

  div.querySelector('.txn-del').addEventListener('click', e => {
    e.stopPropagation();
    const id = e.currentTarget.dataset.id;
    const T2 = TRANSLATIONS[S.lang];
    showConfirm(T2.confirm_delete, T2.confirm_delete_msg, () => deleteTxn(id));
  });
  return div;
}

function emptyEl() {
  const T   = TRANSLATIONS[S.lang];
  const div = document.createElement('div');
  div.className = 'empty-state';
  div.innerHTML = `
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
      <path d="M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
      <path d="M16 3H8v4h8V3z"/>
    </svg>
    <p>${T.no_transactions}</p>
    <p style="font-size:.7rem">${T.add_first}</p>`;
  return div;
}

/* ═══════════════════════════════════════════
   11. RENDER FEEDS
═══════════════════════════════════════════ */
function renderTxnFeed() {
  const el = $('txnFeed');
  if (!el) return;

  let list = [...S.transactions].reverse().filter(t => {
    const typeOk = S.txnFilter === 'all' || t.type === S.txnFilter;
    let dateOk   = true;
    if (S.txnFilterActive) {
      if (S.txnDateFrom) dateOk = dateOk && t.date >= S.txnDateFrom;
      if (S.txnDateTo)   dateOk = dateOk && t.date <= S.txnDateTo;
    }
    return typeOk && dateOk;
  });

  el.innerHTML = '';
  if (!list.length) { el.appendChild(emptyEl()); return; }
  list.forEach((t, i) => el.appendChild(makeTxnCard(t, i)));
}

function renderSearch(q) {
  const el = $('searchFeed');
  if (!el) return;
  const T   = TRANSLATIONS[S.lang];
  const low = q.toLowerCase().trim();
  if (!low) { el.innerHTML = ''; return; }
  const hits = [...S.transactions].reverse().filter(t => {
    const lbl  = (T[t.categoryKey] || t.category || '').toLowerCase();
    const desc = (t.description || '').toLowerCase();
    return lbl.includes(low) || desc.includes(low);
  });
  el.innerHTML = '';
  if (!hits.length) { el.appendChild(emptyEl()); return; }
  hits.forEach((t, i) => el.appendChild(makeTxnCard(t, i)));
}

/* ═══════════════════════════════════════════
   12. USAGE SUMMARY
═══════════════════════════════════════════ */
function renderUsageSummary(catTotals) {
  const el = $('usageSummary');
  if (!el) return;

  const T = TRANSLATIONS[S.lang];
  el.innerHTML = '';

  if (!catTotals.size) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.style.cssText = 'background:none;border:none';
    empty.innerHTML = `<p>${T.no_transactions}</p><p style="font-size:.7rem">${T.add_first}</p>`;
    el.appendChild(empty);
    return;
  }

  const entries = [...catTotals.entries()]
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 8);

  const maxTotal = entries[0][1].total;

  entries.forEach(([key, data], i) => {
    const label = T[key] || key;
    const pct   = (data.total / maxTotal) * 100;
    const color = data.type === 'income' ? 'var(--inc)' : 'var(--exp)';
    const typeLabel = data.type === 'income'
      ? (T.qa_total_added || 'Total Added')
      : (T.qa_total_used  || 'Total Used');

    const row = document.createElement('div');
    row.className = 'usage-row';
    row.style.animationDelay = (i * 0.04) + 's';
    row.innerHTML = `
      <div class="usage-ico ${data.type}">${data.icon}</div>
      <div class="usage-info">
        <div class="usage-cat">${label}</div>
        <span class="usage-type-badge ${data.type}">${typeLabel}</span>
      </div>
      <div class="usage-bar-wrap">
        <div class="usage-bar" style="width:0%;background:${color}"></div>
      </div>
      <div class="usage-amount ${data.type}">$${fmt(data.total)}</div>`;

    el.appendChild(row);
    requestAnimationFrame(() =>
      setTimeout(() => {
        const bar = row.querySelector('.usage-bar');
        if (bar) bar.style.width = pct + '%';
      }, 50 + i * 40)
    );
  });
}

/* ═══════════════════════════════════════════
   13. CATEGORY BREAKDOWN
═══════════════════════════════════════════ */
const CAT_COLORS = [
  '#f5a623','#00e896','#ff3d71','#a78bfa','#38bdf8',
  '#34d399','#f97316','#e879f9','#60a5fa','#fb923c'
];

function renderCatBreakdown() {
  const el = $('catBreakdown');
  if (!el) return;
  el.innerHTML = '';
  const T   = TRANSLATIONS[S.lang];
  const map = {};
  for (const txn of S.transactions) {
    const lbl = T[txn.categoryKey] || txn.category;
    if (!map[lbl]) map[lbl] = { total: 0, type: txn.type };
    map[lbl].total += txn.amount;
  }
  const entries = Object.entries(map).sort((a, b) => b[1].total - a[1].total);
  if (!entries.length) {
    el.innerHTML = '<p style="color:var(--tx3);font-size:.8rem;text-align:center;padding:20px">No data yet</p>';
    return;
  }
  const maxV = entries[0][1].total;
  entries.forEach(([name, data], i) => {
    const pct   = (data.total / maxV) * 100;
    const color = data.type === 'income' ? 'var(--inc)' : CAT_COLORS[i % CAT_COLORS.length];
    const row   = document.createElement('div');
    row.className = 'cat-row';
    row.innerHTML = `
      <div class="cat-dot" style="background:${color}"></div>
      <span class="cat-name">${name}</span>
      <div class="cat-bar-wrap"><div class="cat-bar" style="width:0%;background:${color}"></div></div>
      <span class="cat-amt" style="color:${color}">$${fmt(data.total)}</span>`;
    el.appendChild(row);
    requestAnimationFrame(() =>
      setTimeout(() => { row.querySelector('.cat-bar').style.width = pct + '%'; }, 60 + i * 55)
    );
  });
}

/* ═══════════════════════════════════════════
   14. SPENDING CHART
═══════════════════════════════════════════ */
function drawChart() {
  const canvas = $('spendingCanvas');
  if (!canvas) return;
  const days = parseInt($('chartPeriod')?.value) || 7;
  const ctx  = canvas.getContext('2d');
  const dpr  = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width  = rect.width  * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width  = rect.width  + 'px';
  canvas.style.height = rect.height + 'px';
  ctx.scale(dpr, dpr);

  const W = rect.width, H = rect.height;
  const PAD = { t: 12, r: 12, b: 26, l: 46 };
  const now = new Date();

  const buckets = {};
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    buckets[d.toISOString().split('T')[0]] = 0;
  }
  for (const txn of S.transactions) {
    if (txn.type === 'expense' && buckets[txn.date] !== undefined)
      buckets[txn.date] += txn.amount;
  }

  const labels = Object.keys(buckets);
  const vals   = Object.values(buckets);
  const maxV   = Math.max(...vals, 1);
  const cW     = W - PAD.l - PAD.r;
  const cH     = H - PAD.t - PAD.b;
  const step   = cW / (labels.length - 1 || 1);

  const pts = labels.map((_, i) => ({
    x: PAD.l + i * step,
    y: PAD.t + cH - (vals[i] / maxV) * cH
  }));

  ctx.clearRect(0, 0, W, H);

  const g = ctx.createLinearGradient(0, PAD.t, 0, PAD.t + cH);
  g.addColorStop(0, 'rgba(245,166,35,0.30)');
  g.addColorStop(1, 'rgba(245,166,35,0.00)');
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    const cx = (pts[i-1].x + pts[i].x) / 2;
    ctx.bezierCurveTo(cx, pts[i-1].y, cx, pts[i].y, pts[i].x, pts[i].y);
  }
  ctx.lineTo(pts[pts.length - 1].x, PAD.t + cH);
  ctx.lineTo(pts[0].x, PAD.t + cH);
  ctx.closePath();
  ctx.fillStyle = g;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    const cx = (pts[i-1].x + pts[i].x) / 2;
    ctx.bezierCurveTo(cx, pts[i-1].y, cx, pts[i].y, pts[i].x, pts[i].y);
  }
  ctx.strokeStyle = '#f5a623';
  ctx.lineWidth   = 2.4;
  ctx.stroke();

  const muted = '#2e3d55';
  ctx.fillStyle = muted;
  ctx.font      = '10px DM Mono, monospace';
  ctx.textAlign = 'right';
  ctx.fillText('$' + Math.round(maxV), PAD.l - 6, PAD.t + 10);
  const fd = d => new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  ctx.textAlign = 'left';  ctx.fillText(fd(labels[0]), PAD.l, H - 5);
  ctx.textAlign = 'right'; ctx.fillText(fd(labels[labels.length - 1]), W - PAD.r, H - 5);

  pts.forEach(p => {
    ctx.beginPath(); ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#f5a623'; ctx.fill();
    ctx.strokeStyle = 'rgba(245,166,35,0.3)'; ctx.lineWidth = 3; ctx.stroke();
  });
}

/* ═══════════════════════════════════════════
   15. QUICK ACTIONS
═══════════════════════════════════════════ */
function renderQuickActions(catTotals) {
  const grid = $('qcatGrid');
  if (!grid) return;

  const T = TRANSLATIONS[S.lang];
  grid.innerHTML = '';

  QUICK_ACTIONS.forEach((qa, idx) => {
    const entry   = catTotals.get(qa.key);
    const total   = entry ? entry.total : 0;
    const hasData = total > 0;

    const subtitle = qa.type === 'income'
      ? (T.qa_total_added || 'Total Added')
      : (T.qa_total_used  || 'Total Used');

    const card = document.createElement('button');
    card.className    = `qcat-card qcat-${qa.type}`;
    card.dataset.type = qa.type;
    card.dataset.cat  = qa.key;
    card.style.cssText = `animation: cardSlide 0.28s cubic-bezier(0.4,0,0.2,1) ${idx * 0.05}s both`;

    card.innerHTML = `
      <div class="qcat-icon-wrap"><span class="qcat-emoji">${qa.icon}</span></div>
      <span class="qcat-name">${T[qa.key] || qa.key}</span>
      <span class="qcat-subtitle">${subtitle}</span>
      <span class="qcat-amount${hasData ? '' : ' zero'}">$${hasData ? fmt(total) : '0.00'}</span>
      <span class="qcat-add-chip" aria-hidden="true">+</span>`;

    card.addEventListener('click', () => openModal(qa.type, qa.key));
    grid.appendChild(card);
  });
}

/* ═══════════════════════════════════════════
   16. NOTIFICATION SYSTEM
═══════════════════════════════════════════ */
function addNotif(type, amount, newBalance) {
  if (!S.notifEnabled) return;
  const T   = TRANSLATIONS[S.lang];
  const msg = type === 'income'
    ? `${T.notif_added_income} $${fmt(amount)}. ${T.notif_balance_now} $${fmt(newBalance)}`
    : `${T.notif_added_expense} $${fmt(amount)}. ${T.notif_balance_now} $${fmt(newBalance)}`;

  S.notifications.unshift({
    id:   Date.now().toString(),
    type, msg, time: new Date().toISOString(), read: false
  });
  if (S.notifications.length > 20) S.notifications.length = 20;
  saveNotifs();
  renderNotifPanel();
  showToast(type, msg);
}

function renderNotifPanel() {
  const body  = $('npBody');
  const empty = $('npEmpty');
  const dot   = $('bellDot');
  const bell  = $('bellBtn');
  if (!body) return;

  const unread = S.notifications.filter(n => !n.read).length;
  if (dot)  dot.style.display = unread > 0 ? 'block' : 'none';
  if (bell) bell.classList.toggle('ringing', unread > 0);

  body.querySelectorAll('.np-item').forEach(el => el.remove());

  if (!S.notifications.length) {
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

  S.notifications.forEach((n, i) => {
    const div = document.createElement('div');
    div.className = 'np-item';
    div.style.animationDelay = (i * 0.035) + 's';
    div.innerHTML = `
      <div class="np-dot ${n.type || 'info'}"></div>
      <div class="np-content">
        <div class="np-msg">${n.msg}</div>
        <div class="np-time">${relTime(new Date(n.time))}</div>
      </div>
      ${!n.read ? '<div class="np-unread-dot"></div>' : ''}`;
    body.appendChild(div);
  });
}

function markAllRead() {
  S.notifications.forEach(n => (n.read = true));
  saveNotifs();
  renderNotifPanel();
}

function relTime(date) {
  const s = Math.floor((Date.now() - date) / 1000);
  if (s < 60)    return 'Just now';
  if (s < 3600)  return Math.floor(s / 60)   + 'm ago';
  if (s < 86400) return Math.floor(s / 3600) + 'h ago';
  return Math.floor(s / 86400) + 'd ago';
}

/* ═══════════════════════════════════════════
   17. TOAST SYSTEM
═══════════════════════════════════════════ */
function showToast(type, msg) {
  const container = $('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-dot ${type}"></div>
    <div class="toast-msg">${msg}</div>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('out');
    setTimeout(() => toast.remove(), 280);
  }, 3500);
}

/* ═══════════════════════════════════════════
   18. TRANSACTION CRUD
═══════════════════════════════════════════ */
function addTxn(type, amount, categoryKey, category, description, date) {
  S.transactions.push({
    id: Date.now().toString(),
    type, amount, categoryKey, category, description, date
  });
  saveTxns();
  const { bal } = calcTotals();
  addNotif(type, amount, bal);
  renderAll();
}

function deleteTxn(id) {
  S.transactions = S.transactions.filter(t => t.id !== id);
  saveTxns();
  renderAll();
}

/* ═══════════════════════════════════════════
   19. FILTER LOGIC
═══════════════════════════════════════════ */
function applyTxnFilter() {
  const T     = TRANSLATIONS[S.lang];
  const from  = $('txnDateFrom')?.value || '';
  const to    = $('txnDateTo')?.value   || '';
  const errEl = $('afpError');

  if (errEl) errEl.style.display = 'none';

  if ((from && !to) || (!from && to)) {
    if (errEl) { errEl.textContent = T.err_date_required; errEl.style.display = 'block'; }
    return;
  }
  if (from && to && from > to) {
    if (errEl) { errEl.textContent = T.err_date_range; errEl.style.display = 'block'; }
    return;
  }

  S.txnDateFrom     = from;
  S.txnDateTo       = to;
  S.txnFilterActive = !!(from || to);

  updateFilterBadge();
  renderTxnFeed();
}

function resetTxnFilter() {
  S.txnFilter       = 'all';
  S.txnDateFrom     = '';
  S.txnDateTo       = '';
  S.txnFilterActive = false;

  const fromEl = $('txnDateFrom'), toEl = $('txnDateTo'), errEl = $('afpError');
  if (fromEl) fromEl.value = '';
  if (toEl)   toEl.value   = '';
  if (errEl)  errEl.style.display = 'none';

  $('txnTabs')?.querySelectorAll('.ftab').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === 'all');
  });

  updateFilterBadge();
  renderTxnFeed();
}

function updateFilterBadge() {
  const T     = TRANSLATIONS[S.lang];
  const badge = $('afpActiveBadge');
  const text  = $('afpActiveText');
  if (!badge || !text) return;

  if (!S.txnFilterActive && S.txnFilter === 'all') {
    badge.style.display = 'none';
    return;
  }

  let parts = [];
  if (S.txnFilter !== 'all') parts.push(T[S.txnFilter] || S.txnFilter);
  if (S.txnDateFrom) parts.push(S.txnDateFrom);
  if (S.txnDateTo)   parts.push('→ ' + S.txnDateTo);

  text.textContent    = (T.filter_active || 'Filter active') + ': ' + parts.join(' · ');
  badge.style.display = 'flex';
}

/* ═══════════════════════════════════════════
   20. RENDER ALL
═══════════════════════════════════════════ */
function renderAll() {
  const catTotals = groupByCategory();
  updateTotals();
  renderQuickActions(catTotals);
  renderUsageSummary(catTotals);
  renderTxnFeed();
  renderCatBreakdown();
  drawChart();
}

/* ═══════════════════════════════════════════
   21. NAVIGATION
═══════════════════════════════════════════ */
function goTo(page) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.classList.add('hidden');
  });
  const target = $('page-' + page);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('active');
  }
  document.querySelectorAll('.bn-btn').forEach(b => b.classList.remove('active'));
  const btn = $('bn-' + page);
  if (btn) btn.classList.add('active');

  closeAll();
  if (page === 'reports') { renderCatBreakdown(); setTimeout(drawChart, 80); }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goSearch() {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active'); p.classList.add('hidden');
  });
  const p = $('page-search');
  if (p) { p.classList.remove('hidden'); p.classList.add('active'); }
  document.querySelectorAll('.bn-btn').forEach(b => b.classList.remove('active'));
  $('bn-dashboard')?.classList.add('active');
}

/* ═══════════════════════════════════════════
   22. MODAL
═══════════════════════════════════════════ */
function openModal(type, prefillCat = '') {
  const T   = TRANSLATIONS[S.lang];
  const box = $('txnCard');
  $('txnType').value = type;
  setText('mcTitle', type === 'income' ? T.modal_income_title : T.modal_expense_title);
  box.className = `modal-card modal-${type}`;

  const sel = $('txnCategory');
  sel.innerHTML = '';
  CATEGORIES[type].forEach(cat => {
    const opt = document.createElement('option');
    opt.value       = cat.key;
    opt.textContent = cat.icon + ' ' + (T[cat.key] || cat.key);
    sel.appendChild(opt);
  });
  if (prefillCat) sel.value = prefillCat;

  $('txnDate').value   = new Date().toISOString().split('T')[0];
  $('txnAmount').value = '';
  $('txnDesc').value   = '';
  setText('txnSubmit', T.add_transaction);

  $('txnVeil').classList.add('open');
  setTimeout(() => $('txnAmount')?.focus(), 230);
}

function closeModal() { $('txnVeil').classList.remove('open'); }

function showConfirm(title, msg, cb) {
  setText('cfmTitle', title);
  setText('cfmMsg',   msg);
  S.confirmCb = cb;
  $('cfmVeil').classList.add('open');
}
function closeConfirm() { $('cfmVeil').classList.remove('open'); S.confirmCb = null; }

/* ═══════════════════════════════════════════
   23. THEME SYSTEM
═══════════════════════════════════════════ */
function applyTheme(t) {
  S.theme = t;
  document.documentElement.dataset.theme = t;
  const tc = $('themeCheck');  if (tc) tc.checked = t === 'dark';
  const tt = $('themeToggle'); if (tt) tt.checked = t === 'dark';
  lsSet(LS.theme, t);
  setTimeout(drawChart, 60);
}

/* ═══════════════════════════════════════════
   24. LANGUAGE SYSTEM
═══════════════════════════════════════════ */
function applyLang(lang) {
  S.lang = lang;
  const T = TRANSLATIONS[lang];
  lsSet(LS.lang, lang);

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n;
    if (T[k] !== undefined) el.textContent = T[k];
  });

  const isEn = lang === 'en';
  setText('langBtnLbl',    isEn ? 'English' : 'မြန်မာ');
  setText('menuLangLabel', isEn ? 'Switch to မြန်မာ' : 'Switch to English');

  updateFilterBadge();
  updateGreeting();
  renderAll();
  renderNotifPanel();
  updateProfileLabels();
}

const toggleLang = () => applyLang(S.lang === 'en' ? 'my' : 'en');

/* ═══════════════════════════════════════════
   25. GREETING & DATE
═══════════════════════════════════════════ */
function updateGreeting() {
  const h = new Date().getHours();
  const T = TRANSLATIONS[S.lang];
  setText('greetText', h < 12 ? T.good_morning : h < 17 ? T.good_afternoon : T.good_evening);
  setText('greetName', S.userName.split(' ')[0] + ' 👋');
}

function updateDate() {
  const el = $('dateChip');
  if (el) el.textContent = new Date().toLocaleDateString('en-US',
    { month: 'short', day: 'numeric', year: 'numeric' });
}

/* ═══════════════════════════════════════════
   26. EXPORT CSV
═══════════════════════════════════════════ */
function exportCSV() {
  const T   = TRANSLATIONS[S.lang];
  const hdr = ['Date','Type','Category','Description','Amount'].join(',');
  const rows = S.transactions.map(t => [
    t.date, t.type,
    (T[t.categoryKey] || t.category).replace(/,/g, ';'),
    (t.description || '').replace(/,/g, ';'),
    t.amount.toFixed(2)
  ].join(','));
  const csv = [hdr, ...rows].join('\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  const a   = document.createElement('a');
  a.href = url; a.download = `finpay-${new Date().toISOString().split('T')[0]}.csv`;
  a.click(); URL.revokeObjectURL(url);
}

/* ═══════════════════════════════════════════
   27. PROFILE — Manual + Social Login
═══════════════════════════════════════════ */

/** Update navbar avatar, name, provider label */
function updateNavAvatar() {
  const avatarImg    = $('avatarImg');
  const avatarLetter = $('avatarLetter');
  const name         = S.userName;
  const init         = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'A';

  if (avatarImg && avatarLetter) {
    if (S.userAvatar) {
      avatarImg.src              = S.userAvatar;
      avatarImg.alt              = name;
      avatarImg.style.display    = 'block';
      avatarLetter.style.display = 'none';
    } else {
      avatarImg.style.display    = 'none';
      avatarLetter.style.display = 'block';
      avatarLetter.textContent   = init[0];
    }
  }

  const providerEl = $('avatarProvider');
  if (providerEl) {
    if (S.isSocialLogin && S.userProvider) {
      providerEl.textContent    = S.userProvider + ' Account';
      providerEl.style.display  = 'block';
    } else {
      providerEl.style.display  = 'none';
    }
  }

  setText('avatarName', name.split(' ')[0]);
}

/** Update the full settings/profile card */
function updateProfileCard() {
  const name = S.userName;
  const init = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'A';
  const T    = TRANSLATIONS[S.lang];

  /* Profile avatar */
  const pcAvatar = $('pcAvatar');
  if (pcAvatar) {
    if (S.userAvatar) {
      let img = pcAvatar.querySelector('img');
      if (!img) {
        img = document.createElement('img');
        pcAvatar.appendChild(img);
      }
      img.src = S.userAvatar;
      pcAvatar.dataset.initials = '';
    } else {
      const img = pcAvatar.querySelector('img');
      if (img) img.remove();
      pcAvatar.textContent = init[0];
    }
  }

  /* Name input */
  const ni = $('profileNameInput');
  if (ni) {
    ni.value    = name;
    ni.readOnly = S.isSocialLogin;
  }

  /* Social vs manual display */
  const socialInfo   = $('pcSocialInfo');
  const manualInfo   = $('pcManualInfo');
  const socialBadge  = $('pcSocialBadge');
  const socialProv   = $('pcSocialProvider');
  const emailEl      = $('pcEmail');
  const emailManual  = $('pcEmailManual');

  if (S.isSocialLogin) {
    if (socialInfo)  socialInfo.style.display  = 'flex';
    if (manualInfo)  manualInfo.style.display  = 'none';
    if (socialBadge) socialBadge.textContent   = T.google_account || 'Google Account';
    if (socialProv)  socialProv.textContent    = (T.provider_label || 'Provider:') + ' ' + S.userProvider;
    if (emailEl)     emailEl.textContent       = S.userEmail;
  } else {
    if (socialInfo)  socialInfo.style.display  = 'none';
    if (manualInfo)  manualInfo.style.display  = S.userEmail ? 'block' : 'none';
    if (emailManual) emailManual.textContent   = S.userEmail;
  }
}

/** Update password card labels based on login type */
function updatePasswordCard() {
  const T            = TRANSLATIONS[S.lang];
  const pwCardTitle  = $('pwCardTitle');
  const currentField = $('currentPwField');

  if (S.isSocialLogin) {
    /* Google user — no current password needed; show "Set Password" */
    if (pwCardTitle)  pwCardTitle.textContent = T.set_password   || 'Set Password';
    if (currentField) currentField.style.display = 'none';
  } else {
    if (pwCardTitle)  pwCardTitle.textContent = T.change_password || 'Change Password';
    if (currentField) currentField.style.display = 'flex';
  }
}

/** Update translated labels in profile section */
function updateProfileLabels() {
  updatePasswordCard();
}

/** Full profile update — called on init and whenever profile data changes */
function updateProfile() {
  updateNavAvatar();
  updateProfileCard();
  updatePasswordCard();
  updateGreeting();
}

/**
 * setGoogleUser — call when Supabase auth returns a social login session
 * @param {string} name
 * @param {string} avatarUrl
 * @param {string} email
 * @param {string} provider
 */
function setGoogleUser(name, avatarUrl, email = '', provider = 'Google') {
  S.userName      = name     || S.userName;
  S.userAvatar    = avatarUrl || '';
  S.userEmail     = email    || '';
  S.userProvider  = provider || 'Google';
  S.isSocialLogin = true;
  lsSet(LS.userName,      S.userName);
  lsSet(LS.userAvatar,    S.userAvatar);
  lsSet(LS.userEmail,     S.userEmail);
  lsSet(LS.userProvider,  S.userProvider);
  lsSet(LS.isSocialLogin, true);
  updateProfile();
}

/* ═══════════════════════════════════════════
   28. PASSWORD MANAGEMENT
═══════════════════════════════════════════ */

/** Simple password strength scorer (0-4) */
function scorePassword(pw) {
  let score = 0;
  if (pw.length >= 8)  score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

/** Render strength bar under new password field */
function renderPwStrength(pw) {
  const wrap = $('pwStrength');
  if (!wrap) return;
  const T     = TRANSLATIONS[S.lang];
  const score = pw ? scorePassword(pw) : 0;
  const labels = ['', T.pw_strength_weak, T.pw_strength_fair, T.pw_strength_good, T.pw_strength_strong];
  const colors = ['', '#ef4444', '#f97316', '#eab308', '#22c55e'];

  wrap.innerHTML = '';
  for (let i = 1; i <= 4; i++) {
    const bar = document.createElement('div');
    bar.className = 'pw-strength-bar';
    bar.style.background = i <= score ? colors[score] : 'var(--raised)';
    wrap.appendChild(bar);
  }
  if (pw && score > 0) {
    const lbl = document.createElement('div');
    lbl.className   = 'pw-strength-label';
    lbl.textContent = labels[score];
    lbl.style.color = colors[score];
    wrap.appendChild(lbl);
  }
}

/** Simple hash (demo) — in real app Supabase handles passwords server-side */
async function simpleHash(str) {
  try {
    const buf  = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    return btoa(str); /* fallback for unsupported env */
  }
}

async function handlePasswordSave() {
  const T           = TRANSLATIONS[S.lang];
  const newPw       = $('newPassword')?.value      || '';
  const confirmPw   = $('confirmPassword')?.value  || '';
  const currentPw   = $('currentPassword')?.value  || '';
  const errEl       = $('pwError');

  const showPwErr = msg => {
    if (errEl) { errEl.textContent = msg; errEl.style.display = 'block'; }
  };
  if (errEl) errEl.style.display = 'none';

  /* Validation */
  if (newPw.length < 8) { showPwErr(T.pw_too_short); return; }
  if (newPw !== confirmPw) { showPwErr(T.pw_mismatch); return; }

  /* For manual login: verify current password */
  if (!S.isSocialLogin && S.userPasswordHash) {
    const currentHash = await simpleHash(currentPw);
    if (currentHash !== S.userPasswordHash) {
      showPwErr(T.pw_wrong_current);
      return;
    }
  }

  /* Supabase: update password */
  if (supabase) {
    try {
      const { error } = await supabase.auth.updateUser({ password: newPw });
      if (error) { showPwErr(error.message); return; }
    } catch (e) {
      console.warn('Supabase password update failed:', e);
    }
  }

  /* Store new hash locally */
  const newHash = await simpleHash(newPw);
  S.userPasswordHash = newHash;
  lsSet(LS.userPasswordHash, newHash);

  /* Clear fields & close panel */
  if ($('currentPassword')) $('currentPassword').value = '';
  if ($('newPassword'))     $('newPassword').value     = '';
  if ($('confirmPassword')) $('confirmPassword').value = '';
  renderPwStrength('');

  const pwBody   = $('pwBody');
  const pwToggle = $('pwToggle');
  if (pwBody)   pwBody.style.display   = 'none';
  if (pwToggle) { pwToggle.classList.remove('open'); pwToggle.setAttribute('aria-expanded','false'); }

  showToast('income', T.pw_saved || 'Password saved!');
}

/* ═══════════════════════════════════════════
   29. AVATAR UPLOAD
═══════════════════════════════════════════ */
function handleAvatarFile(file) {
  if (!file || !file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = async (e) => {
    const dataUrl = e.target.result;
    S.userAvatar = dataUrl;
    lsSet(LS.userAvatar, dataUrl);

    /* Try to upload to Supabase Storage */
    if (supabase && S.supabaseUserId) {
      try {
        const { data, error } = await supabase.storage
          .from('avatars')
          .upload(`public/${S.supabaseUserId}.jpg`, file, { upsert: true });
        if (!error && data) {
          const { data: urlData } = supabase.storage
            .from('avatars').getPublicUrl(data.path);
          if (urlData?.publicUrl) {
            S.userAvatar = urlData.publicUrl;
            lsSet(LS.userAvatar, S.userAvatar);
            /* Update profiles table */
            await supabase.from('profiles').upsert({
              id: S.supabaseUserId,
              avatar_url: S.userAvatar,
              display_name: S.userName,
              updated_at: new Date().toISOString()
            });
          }
        }
      } catch (e) {
        console.warn('Avatar upload to Supabase failed:', e);
      }
    }

    updateProfile();
    showToast('income', '✓ Profile photo updated');
  };
  reader.readAsDataURL(file);
}

/* ═══════════════════════════════════════════
   30. FAB
═══════════════════════════════════════════ */
function toggleFab(force) {
  const open = force !== undefined ? force : !S.fabOpen;
  S.fabOpen  = open;
  $('fabMain')?.classList.toggle('open', open);
  $('fabSub')?.classList.toggle('open', open);
  $('fabBackdrop')?.classList.toggle('show', open);
}

/* ═══════════════════════════════════════════
   31. CLOSE ALL PANELS
═══════════════════════════════════════════ */
function closeAll() {
  $('dotsMenu')?.classList.remove('open');
  $('dotsBtn')?.classList.remove('open');
  $('notifPanel')?.classList.remove('open');
  toggleFab(false);
}

/* ═══════════════════════════════════════════
   32. SEARCH
═══════════════════════════════════════════ */
function handleSearch(q) {
  S.searchQuery = q;
  const clear = $('searchClear');
  if (clear) clear.classList.toggle('show', q.length > 0);

  if (q.trim()) {
    goSearch();
    renderSearch(q);
    setText('searchResultLabel',
      TRANSLATIONS[S.lang].search_results + ': "' + q + '"');
  } else {
    goTo('dashboard');
  }
}

/* ═══════════════════════════════════════════
   33. EVENT WIRING
═══════════════════════════════════════════ */
function wire() {

  /* Bottom nav */
  document.querySelectorAll('.bn-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', () => goTo(btn.dataset.page));
  });

  /* FAB */
  $('fabMain')?.addEventListener('click', e => { e.stopPropagation(); toggleFab(); });
  $('fabIncome')?.addEventListener('click',   () => { toggleFab(false); openModal('income'); });
  $('fabExpense')?.addEventListener('click',  () => { toggleFab(false); openModal('expense'); });
  $('fabBackdrop')?.addEventListener('click', () => toggleFab(false));

  /* Avatar → Settings */
  $('avatarBtn')?.addEventListener('click', () => goTo('settings'));

  /* 3-dots */
  $('dotsBtn')?.addEventListener('click', e => {
    e.stopPropagation();
    const open = $('dotsMenu').classList.toggle('open');
    $('dotsBtn').classList.toggle('open', open);
    if (open) $('notifPanel')?.classList.remove('open');
  });
  $('themeCheck')?.addEventListener('change',   e => applyTheme(e.target.checked ? 'dark' : 'light'));
  $('menuAddIncome')?.addEventListener('click',  () => { closeAll(); openModal('income'); });
  $('menuAddExpense')?.addEventListener('click', () => { closeAll(); openModal('expense'); });
  $('menuHistory')?.addEventListener('click',   () => { closeAll(); goTo('transactions'); });
  $('menuLang')?.addEventListener('click',      () => { toggleLang(); closeAll(); });

  /* Search */
  $('searchInput')?.addEventListener('input',   e => handleSearch(e.target.value));
  $('searchInput')?.addEventListener('keydown', e => {
    if (e.key === 'Escape') { $('searchInput').value = ''; handleSearch(''); }
  });
  $('searchClear')?.addEventListener('click', () => {
    $('searchInput').value = ''; handleSearch(''); $('searchInput')?.focus();
  });

  /* Bell */
  $('bellBtn')?.addEventListener('click', e => {
    e.stopPropagation();
    const open = $('notifPanel').classList.toggle('open');
    if (open) {
      $('dotsMenu')?.classList.remove('open');
      $('dotsBtn')?.classList.remove('open');
      markAllRead();
    }
  });
  $('npMarkRead')?.addEventListener('click', markAllRead);
  $('npClear')?.addEventListener('click', () => {
    S.notifications = []; saveNotifs(); renderNotifPanel();
  });

  /* Close panels on outside click */
  document.addEventListener('click', e => {
    if (!$('dotsShell')?.contains(e.target)) {
      $('dotsMenu')?.classList.remove('open');
      $('dotsBtn')?.classList.remove('open');
    }
    if (!$('bellShell')?.contains(e.target)) {
      $('notifPanel')?.classList.remove('open');
    }
  });

  /* History: type filter */
  $('txnTabs')?.addEventListener('click', e => {
    const btn = e.target.closest('.ftab');
    if (!btn) return;
    $('txnTabs').querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    S.txnFilter = btn.dataset.filter;
    updateFilterBadge();
    renderTxnFeed();
  });

  $('afpApply')?.addEventListener('click',     applyTxnFilter);
  $('afpReset')?.addEventListener('click',     resetTxnFilter);
  $('afpBadgeClear')?.addEventListener('click',resetTxnFilter);

  $('txnDateFrom')?.addEventListener('change', () => {
    const errEl = $('afpError'); if (errEl) errEl.style.display = 'none';
  });
  $('txnDateTo')?.addEventListener('change', () => {
    const errEl = $('afpError'); if (errEl) errEl.style.display = 'none';
  });

  /* CSV */
  $('csvBtnTxn')?.addEventListener('click', exportCSV);

  /* Transaction modal */
  $('mcClose')?.addEventListener('click', closeModal);
  $('txnVeil')?.addEventListener('click', e => { if (e.target === $('txnVeil')) closeModal(); });
  $('txnSubmit')?.addEventListener('click', () => {
    const type   = $('txnType').value;
    const amount = parseFloat($('txnAmount').value);
    const catKey = $('txnCategory').value;
    const desc   = $('txnDesc').value.trim();
    const date   = $('txnDate').value;
    const T      = TRANSLATIONS[S.lang];

    if (!amount || amount <= 0) {
      const inp = $('txnAmount');
      inp.style.borderColor = 'var(--exp)';
      inp.style.boxShadow   = '0 0 0 3px var(--exp-bg)';
      inp.classList.add('shake');
      inp.focus();
      setTimeout(() => {
        inp.style.borderColor = '';
        inp.style.boxShadow   = '';
        inp.classList.remove('shake');
      }, 1600);
      return;
    }

    const catName = T[catKey] || catKey
      || (type === 'income' ? T.cat_other_income : T.cat_other_expense);
    addTxn(type, amount, catKey || 'cat_other_' + type, catName, desc, date);
    closeModal();
  });

  /* Confirm modal */
  $('cfmCancel')?.addEventListener('click', closeConfirm);
  $('cfmVeil')?.addEventListener('click',   e => { if (e.target === $('cfmVeil')) closeConfirm(); });
  $('cfmOk')?.addEventListener('click',     () => { S.confirmCb?.(); closeConfirm(); });

  /* Settings: theme, lang, notif */
  $('themeToggle')?.addEventListener('change', e => applyTheme(e.target.checked ? 'dark' : 'light'));
  $('langBtn')?.addEventListener('click', toggleLang);
  $('notifToggle')?.addEventListener('change', e => {
    S.notifEnabled = e.target.checked;
    lsSet(LS.notifEnabled, S.notifEnabled);
  });

  /* Profile name (manual login only) */
  $('profileNameInput')?.addEventListener('input', e => {
    if (S.isSocialLogin) return;
    S.userName = e.target.value || 'User';
    lsSet(LS.userName, S.userName);
    updateNavAvatar();
    updateGreeting();
  });

  /* Avatar upload */
  $('avatarFileInput')?.addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (file) handleAvatarFile(file);
  });
  /* Also allow clicking avatar in settings to trigger upload */
  $('pcAvatar')?.addEventListener('click', () => {
    if (!S.isSocialLogin) $('avatarFileInput')?.click();
  });

  /* Password card toggle */
  const pwHeader = document.querySelector('.pw-header');
  const pwBody   = $('pwBody');
  const pwToggle = $('pwToggle');
  pwHeader?.addEventListener('click', () => {
    const isOpen = pwBody.style.display !== 'none';
    pwBody.style.display = isOpen ? 'none' : 'flex';
    pwToggle?.classList.toggle('open', !isOpen);
    pwToggle?.setAttribute('aria-expanded', String(!isOpen));
  });

  /* Password eye toggles */
  document.querySelectorAll('.pw-eye').forEach(btn => {
    btn.addEventListener('click', () => {
      const inp = $(btn.dataset.target);
      if (!inp) return;
      inp.type = inp.type === 'password' ? 'text' : 'password';
      btn.textContent = inp.type === 'password' ? '👁' : '🙈';
    });
  });

  /* Password strength meter */
  $('newPassword')?.addEventListener('input', e => renderPwStrength(e.target.value));

  /* Password save */
  $('pwSaveBtn')?.addEventListener('click', handlePasswordSave);

  /* Clear data */
  $('clearBtn')?.addEventListener('click', () => {
    const T = TRANSLATIONS[S.lang];
    showConfirm(T.confirm_clear, T.confirm_clear_msg, () => {
      S.transactions = []; saveTxns(); renderAll();
    });
  });

  /* Logout */
  $('logoutBtn')?.addEventListener('click', () => {
    showConfirm('Logout?', 'Your data is safely stored locally.', async () => {
      if (supabase) {
        try { await supabase.auth.signOut(); } catch {}
      }
      localStorage.clear();
      location.reload();
    });
  });

  /* Chart period */
  $('chartPeriod')?.addEventListener('change', drawChart);

  /* Keyboard shortcuts */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeModal(); closeConfirm(); closeAll();
      const si = $('searchInput');
      if (si && si.value) { si.value = ''; handleSearch(''); }
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault(); $('searchInput')?.focus();
    }
  });

  /* Resize: redraw chart */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawChart, 220);
  });
}

/* ═══════════════════════════════════════════
   SUPABASE AUTH INTEGRATION
═══════════════════════════════════════════ */
async function initSupabaseAuth() {
  if (!supabase) return;

  try {
    /* Restore existing session */
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) handleAuthUser(session.user);

    /* Listen for auth changes */
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        handleAuthUser(session.user);
      }
      if (event === 'SIGNED_OUT') {
        S.isSocialLogin = false;
        S.userAvatar    = '';
        S.userProvider  = '';
        updateProfile();
      }
    });
  } catch (e) {
    console.warn('Supabase auth init failed:', e);
  }
}

function handleAuthUser(user) {
  const meta     = user.user_metadata || {};
  const provider = user.app_metadata?.provider || 'email';

  S.supabaseUserId = user.id;
  lsSet(LS.supabaseUserId, user.id);

  if (provider !== 'email') {
    /* Social login */
    setGoogleUser(
      meta.full_name || meta.name || user.email || S.userName,
      meta.avatar_url || meta.picture || '',
      user.email || '',
      provider.charAt(0).toUpperCase() + provider.slice(1)
    );
  } else {
    /* Manual email login */
    S.userEmail     = user.email || '';
    S.isSocialLogin = false;
    lsSet(LS.userEmail,     S.userEmail);
    lsSet(LS.isSocialLogin, false);

    /* Try to load profile from DB */
    loadProfileFromDB(user.id);
    updateProfile();
  }

  /* Load transactions from Supabase */
  loadTransactionsFromDB(user.id);
}

async function loadProfileFromDB(userId) {
  if (!supabase) return;
  try {
    const { data } = await supabase
      .from('profiles')
      .select('display_name, avatar_url')
      .eq('id', userId)
      .single();
    if (data) {
      if (data.display_name) {
        S.userName = data.display_name;
        lsSet(LS.userName, S.userName);
      }
      if (data.avatar_url) {
        S.userAvatar = data.avatar_url;
        lsSet(LS.userAvatar, S.userAvatar);
      }
      updateProfile();
    }
  } catch {}
}

async function loadTransactionsFromDB(userId) {
  if (!supabase) return;
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (!error && data && data.length > 0) {
      S.transactions = data.map(row => ({
        id:          row.id,
        type:        row.type,
        amount:      row.amount,
        categoryKey: row.category,
        category:    row.category,
        description: row.description || '',
        date:        row.created_at.split('T')[0],
      }));
      saveTxns();
      renderAll();
    }
  } catch (e) {
    console.warn('Could not load transactions from Supabase:', e);
  }
}

/* ═══════════════════════════════════════════
   34. INIT
═══════════════════════════════════════════ */
function init() {
  loadState();
  applyTheme(S.theme);
  applyLang(S.lang);
  updateDate();
  updateProfile();

  const nt = $('notifToggle');
  if (nt) nt.checked = S.notifEnabled;

  wire();
  renderAll();
  renderNotifPanel();

  /* Initialize Supabase auth */
  initSupabaseAuth();

  /* Seed demo data only if no transactions exist */
  if (!S.transactions.length) {
    const td = new Date().toISOString().split('T')[0];
    const yd = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const d2 = new Date(Date.now() - 172800000).toISOString().split('T')[0];
    S.transactions = [
      { id:'1', type:'income',  amount:3000, categoryKey:'cat_salary',      category:'Salary',    description:'Monthly salary',     date:d2 },
      { id:'2', type:'income',  amount:2000, categoryKey:'cat_freelance',    category:'Freelance', description:'Design project',     date:yd },
      { id:'3', type:'expense', amount:450,  categoryKey:'cat_food',         category:'Food',      description:'Groceries & dining', date:d2 },
      { id:'4', type:'expense', amount:120,  categoryKey:'cat_transport',    category:'Transport', description:'Grab rides',         date:yd },
      { id:'5', type:'expense', amount:299,  categoryKey:'cat_shopping',     category:'Shopping',  description:'Online order',       date:td },
      { id:'6', type:'expense', amount:85,   categoryKey:'cat_bills',        category:'Bills',     description:'Electricity',        date:td },
    ];
    saveTxns();
    renderAll();
  }

  console.log('%c FinPay v5.0 Ready ✓ ', 'background:#f5a623;color:#1a0f00;padding:4px 12px;border-radius:4px;font-weight:bold;font-family:monospace');
  console.log('%c Supabase URL:', 'color:#60a5fa;font-weight:bold', SUPABASE_URL);
  console.log('%c API: setGoogleUser(name, avatarUrl, email, provider) ', 'background:#00e896;color:#001a0d;padding:2px 8px;border-radius:4px;font-size:11px');
}

/* Boot */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
