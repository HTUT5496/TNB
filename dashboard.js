/* ══════════════════════════════════════════════════════
   NOVAPAY – SMART FINANCE DASHBOARD  |  dashboard.js
   ES6 Vanilla JS  |  All finance logic preserved
   NEW: 2-row navbar · Search · 3-dots menu · Bottom nav
        FAB · Quick-category shortcuts · Balance notifs
══════════════════════════════════════════════════════ */
'use strict';

/* ═══════════════════════════════════════════
   1. TRANSLATIONS (English / Burmese) — PRESERVED
═══════════════════════════════════════════ */
const TRANSLATIONS = {
  en: {
    brand: 'NovaPay',
    nav_dashboard: 'Dashboard',
    nav_transactions: 'Transactions',
    nav_reports: 'Reports',
    nav_settings: 'Settings',
    premium_member: 'Premium Member',
    good_morning: 'Good morning,',
    good_afternoon: 'Good afternoon,',
    good_evening: 'Good evening,',
    available_balance: 'Balance',
    income: 'Income',
    expense: 'Expense',
    add_income: 'Add Income',
    add_expense: 'Add Expense',
    reports: 'Reports',
    transfer: 'Transfer',
    spending_overview: 'Spending Overview',
    last_7: 'Last 7 Days',
    last_30: 'Last 30 Days',
    recent_transactions: 'Recent Activity',
    see_all: 'See All',
    all_transactions: 'All Transactions',
    all: 'All',
    export_csv: 'Export CSV',
    total_income: 'Total Income',
    total_expense: 'Total Expense',
    net_balance: 'Net Balance',
    total_transactions: 'Transactions',
    category_breakdown: 'Category Breakdown',
    settings: 'Settings',
    dark_mode: 'Dark Mode',
    dark_mode_sub: 'Switch between dark and light',
    language: 'Language',
    language_sub: 'English / Burmese',
    notifications_setting: 'Notifications',
    notifications_sub: 'Balance change alerts',
    clear_data: 'Clear All Data',
    clear_data_sub: 'Permanently remove all transactions',
    clear: 'Clear',
    logout: 'Logout',
    notifications: 'Notifications',
    clear_all: 'Clear All',
    no_notifs: 'No notifications yet',
    amount: 'Amount ($)',
    category: 'Category',
    description: 'Description',
    date: 'Date',
    add_transaction: 'Add Transaction',
    cancel: 'Cancel',
    confirm: 'Confirm',
    modal_income_title: 'Add Income',
    modal_expense_title: 'Add Expense',
    notif_balance_now: 'Your balance is now',
    notif_added_income: '↑ Income Added',
    notif_added_expense: '↓ Expense Added',
    confirm_delete: 'Delete this transaction?',
    confirm_delete_msg: 'This action cannot be undone.',
    confirm_clear: 'Clear all data?',
    confirm_clear_msg: 'All transactions will be permanently removed.',
    no_transactions: 'No transactions yet',
    add_first: 'Tap + to add your first entry',
    search_results: 'Search Results',
    quick_actions: 'Quick Actions',
    cat_salary: 'Salary',
    cat_freelance: 'Freelance',
    cat_investment: 'Investment',
    cat_gift: 'Gift',
    cat_other_income: 'Other Income',
    cat_food: 'Food',
    cat_transport: 'Transport',
    cat_shopping: 'Shopping',
    cat_bills: 'Bills',
    cat_health: 'Health',
    cat_entertainment: 'Entertain',
    cat_education: 'Education',
    cat_rent: 'Rent',
    cat_other_expense: 'Other Expense',
  },
  my: {
    brand: 'NovaPay',
    nav_dashboard: 'ဒက်ရ်ဘုတ်',
    nav_transactions: 'ငွေသွင်း/ထုတ်',
    nav_reports: 'အစီရင်ခံ',
    nav_settings: 'ဆက်တင်',
    premium_member: 'ပရီမီယံ အဖွဲ့ဝင်',
    good_morning: 'မင်္ဂလာနံနက်ခင်းပါ၊',
    good_afternoon: 'မင်္ဂလာနေ့လည်ပါ၊',
    good_evening: 'မင်္ဂလာညနေပါ၊',
    available_balance: 'လက်ကျန်',
    income: 'ဝင်ငွေ',
    expense: 'ထွက်ငွေ',
    add_income: 'ဝင်ငွေထည့်',
    add_expense: 'ထွက်ငွေထည့်',
    reports: 'အစီရင်ခံ',
    transfer: 'လွှဲပြောင်း',
    spending_overview: 'ငွေသုံးမှု အနှစ်ချုပ်',
    last_7: 'ၿပီးခဲ့သော ၇ ရက်',
    last_30: 'ၿပီးခဲ့သော ၃၀ ရက်',
    recent_transactions: 'မကြာမီ လုပ်ဆောင်ချက်',
    see_all: 'အားလုံးကြည့်',
    all_transactions: 'ငွေသွင်း/ထုတ် အားလုံး',
    all: 'အားလုံး',
    export_csv: 'CSV ထုတ်ယူ',
    total_income: 'စုစုပေါင်း ဝင်ငွေ',
    total_expense: 'စုစုပေါင်း ထွက်ငွေ',
    net_balance: 'အသားတင် လက်ကျန်',
    total_transactions: 'ငွေလွှဲ စုစုပေါင်း',
    category_breakdown: 'အမျိုးအစားအလိုက်',
    settings: 'ဆက်တင်',
    dark_mode: 'အမဲရောင် မုဒ်',
    dark_mode_sub: 'အမဲ / အဖြူ ပြောင်းလဲ',
    language: 'ဘာသာစကား',
    language_sub: 'အင်္ဂလိပ် / မြန်မာ',
    notifications_setting: 'အကြောင်းကြားချက်',
    notifications_sub: 'လက်ကျန်ငွေ ပြောင်းလဲမှု သတိပေး',
    clear_data: 'ဒေတာ အားလုံး ရှင်းလင်း',
    clear_data_sub: 'ငွေသွင်း/ထုတ် အားလုံး ဖျက်မည်',
    clear: 'ရှင်းလင်း',
    logout: 'ထွက်မည်',
    notifications: 'အကြောင်းကြားချက်',
    clear_all: 'အားလုံး ရှင်းလင်း',
    no_notifs: 'အကြောင်းကြားချက် မရှိသေးပါ',
    amount: 'ငွေပမာဏ ($)',
    category: 'အမျိုးအစား',
    description: 'ဖော်ပြချက်',
    date: 'ရက်စွဲ',
    add_transaction: 'ငွေသွင်း/ထုတ် ထည့်',
    cancel: 'မလုပ်တော့',
    confirm: 'အတည်ပြု',
    modal_income_title: 'ဝင်ငွေ ထည့်သည်',
    modal_expense_title: 'ထွက်ငွေ ထည့်သည်',
    notif_balance_now: 'သင့်လက်ကျန်ငွေ',
    notif_added_income: '↑ ဝင်ငွေ ထည့်ပြီး',
    notif_added_expense: '↓ ထွက်ငွေ ထည့်ပြီး',
    confirm_delete: 'ဤငွေလွှဲကို ဖျက်မလား?',
    confirm_delete_msg: 'ဤလုပ်ဆောင်ချက်ကို ပြန်မလုပ်နိုင်ပါ။',
    confirm_clear: 'ဒေတာ အားလုံး ရှင်းမလား?',
    confirm_clear_msg: 'ငွေသွင်း/ထုတ် အားလုံး ပြည်တမ်း ဖျက်မည်။',
    no_transactions: 'ငွေသွင်း/ထုတ် မရှိသေးပါ',
    add_first: '+ ကိုနှိပ်၍ ထည့်ပါ',
    search_results: 'ရှာဖွေမှု ရလဒ်',
    quick_actions: 'မြန်ဆန်သော လုပ်ဆောင်ချက်',
    cat_salary: 'လစာ',
    cat_freelance: 'ဖရီးလန်စ်',
    cat_investment: 'ရင်းနှီးမြှုပ်နှံမှု',
    cat_gift: 'လက်ဆောင်',
    cat_other_income: 'အခြား ဝင်ငွေ',
    cat_food: 'အစားအသောက်',
    cat_transport: 'သယ်ယူပို့ဆောင်',
    cat_shopping: 'ဈေးဝယ်',
    cat_bills: 'ဘီလ်များ',
    cat_health: 'ကျန်းမာရေး',
    cat_entertainment: 'အပျော်အပါး',
    cat_education: 'ပညာရေး',
    cat_rent: 'အငှားခ',
    cat_other_expense: 'အခြား ထွက်ငွေ',
  }
};

/* ═══════════════════════════════════════════
   2. CATEGORIES — PRESERVED
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

/* ═══════════════════════════════════════════
   3. APP STATE
═══════════════════════════════════════════ */
const state = {
  transactions:    [],
  notifications:   [],
  lang:            'en',
  theme:           'dark',
  notifEnabled:    true,
  userName:        'Alex Morgan',
  currentFilter:   'all',     // for full transaction list
  dashFilter:      'all',     // for dashboard feed
  dateFilter:      '',        // for full transaction list
  dashDateFilter:  '',        // for dashboard feed
  confirmCallback: null,
  searchQuery:     '',
  fabOpen:         false,
};

/* ═══════════════════════════════════════════
   4. LOCAL STORAGE HELPERS — PRESERVED
═══════════════════════════════════════════ */
const LS = {
  transactions:  'novapay_transactions',
  notifications: 'novapay_notifications',
  lang:          'novapay_lang',
  theme:         'novapay_theme',
  notifEnabled:  'novapay_notif',
  userName:      'novapay_username',
};

function saveLS(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}
function loadLS(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}
function loadState() {
  state.transactions  = loadLS(LS.transactions,  []);
  state.notifications = loadLS(LS.notifications, []);
  state.lang          = loadLS(LS.lang,  'en');
  state.theme         = loadLS(LS.theme, 'dark');
  state.notifEnabled  = loadLS(LS.notifEnabled, true);
  state.userName      = loadLS(LS.userName, 'Alex Morgan');
}
function saveTxns()   { saveLS(LS.transactions,  state.transactions); }
function saveNotifs() { saveLS(LS.notifications, state.notifications); }

/* ═══════════════════════════════════════════
   5. FINANCE CALCULATIONS — PRESERVED
═══════════════════════════════════════════ */
function calcTotals() {
  let income = 0, expense = 0;
  for (const t of state.transactions) {
    t.type === 'income' ? income += t.amount : expense += t.amount;
  }
  return { income, expense, balance: income - expense };
}

function fmt(n) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(n);
}

/* ═══════════════════════════════════════════
   6. UI: TOTALS + ROW 2 SUMMARY STRIP
═══════════════════════════════════════════ */
function updateTotals() {
  const { income, expense, balance } = calcTotals();

  // Balance card (animated)
  animateNumber('balanceDisplay', balance);
  setTxt('totalIncomeDisplay',  '$' + fmt(income));
  setTxt('totalExpenseDisplay', '$' + fmt(expense));

  // Row 2 summary strip (inline, real-time)
  setTxt('r2Balance', '$' + fmt(balance));
  setTxt('r2Income',  '$' + fmt(income));
  setTxt('r2Expense', '$' + fmt(expense));

  // Reports section
  setTxt('reportIncome',  '$' + fmt(income));
  setTxt('reportExpense', '$' + fmt(expense));
  setTxt('reportBalance', '$' + fmt(balance));
  setTxt('reportCount', state.transactions.length);
  const balEl = document.getElementById('reportBalance');
  if (balEl) balEl.style.color = balance >= 0 ? 'var(--income)' : 'var(--expense)';
}

// Smooth animated number counter — PRESERVED
function animateNumber(elId, target) {
  const el = document.getElementById(elId);
  if (!el) return;
  const start = parseFloat(el.textContent.replace(/,/g, '')) || 0;
  const diff = target - start;
  const duration = 650;
  let t0 = null;
  function step(ts) {
    if (!t0) t0 = ts;
    const p = Math.min((ts - t0) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(start + diff * ease);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function setTxt(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

/* ═══════════════════════════════════════════
   7. TRANSACTION RENDERING — PRESERVED + enhanced
═══════════════════════════════════════════ */
function getCatMeta(type, key) {
  return (CATEGORIES[type] || []).find(c => c.key === key) || { icon: type === 'income' ? '💰' : '💸' };
}

function makeTxnEl(txn, idx) {
  const T    = TRANSLATIONS[state.lang];
  const meta = getCatMeta(txn.type, txn.categoryKey);
  const label  = T[txn.categoryKey] || txn.category;
  const sign   = txn.type === 'income' ? '+' : '-';
  const dateStr = txn.date
    ? new Date(txn.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  const div = document.createElement('div');
  div.className = 'txn-item';
  div.style.animationDelay = Math.min(idx * 0.04, 0.5) + 's';
  div.innerHTML = `
    <div class="txn-icon ${txn.type}">${meta.icon}</div>
    <div class="txn-details">
      <div class="txn-category">${label}</div>
      <div class="txn-desc">${txn.description || ''}</div>
    </div>
    <div class="txn-meta">
      <div class="txn-amount ${txn.type}">${sign}$${fmt(txn.amount)}</div>
      <div class="txn-date">${dateStr}</div>
    </div>
    <button class="txn-delete" data-id="${txn.id}" title="Delete">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
        <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
      </svg>
    </button>
  `;
  div.querySelector('.txn-delete').addEventListener('click', e => {
    e.stopPropagation();
    const id = e.currentTarget.dataset.id;
    showConfirm(
      TRANSLATIONS[state.lang].confirm_delete,
      TRANSLATIONS[state.lang].confirm_delete_msg,
      () => deleteTransaction(id)
    );
  });
  return div;
}

function emptyState() {
  const T = TRANSLATIONS[state.lang];
  const div = document.createElement('div');
  div.className = 'empty-state';
  div.innerHTML = `
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
      <path d="M16 3H8v4h8V3z"/>
    </svg>
    <p>${T.no_transactions}</p>
    <p style="font-size:0.72rem">${T.add_first}</p>
  `;
  return div;
}

/* Dashboard feed: filtered by dashFilter + dashDateFilter, most recent 20 */
function renderDashFeed() {
  const el = document.getElementById('dashTransList');
  if (!el) return;
  const filtered = [...state.transactions]
    .reverse()
    .filter(t => {
      const typeOk = state.dashFilter === 'all' || t.type === state.dashFilter;
      const dateOk = !state.dashDateFilter || t.date === state.dashDateFilter;
      return typeOk && dateOk;
    })
    .slice(0, 20);
  el.innerHTML = '';
  if (!filtered.length) { el.appendChild(emptyState()); return; }
  filtered.forEach((t, i) => el.appendChild(makeTxnEl(t, i)));
}

/* Full transaction list: currentFilter + dateFilter */
function renderFullList() {
  const el = document.getElementById('fullTransList');
  if (!el) return;
  const filtered = [...state.transactions]
    .reverse()
    .filter(t => {
      const typeOk = state.currentFilter === 'all' || t.type === state.currentFilter;
      const dateOk = !state.dateFilter || t.date === state.dateFilter;
      return typeOk && dateOk;
    });
  el.innerHTML = '';
  if (!filtered.length) { el.appendChild(emptyState()); return; }
  filtered.forEach((t, i) => el.appendChild(makeTxnEl(t, i)));
}

/* Search results */
function renderSearchResults(query) {
  const el = document.getElementById('searchResults');
  if (!el) return;
  const T = TRANSLATIONS[state.lang];
  const q = query.trim().toLowerCase();
  if (!q) { el.innerHTML = ''; return; }
  const matches = [...state.transactions].reverse().filter(t => {
    const label = (T[t.categoryKey] || t.category || '').toLowerCase();
    const desc  = (t.description || '').toLowerCase();
    return label.includes(q) || desc.includes(q);
  });
  el.innerHTML = '';
  if (!matches.length) { el.appendChild(emptyState()); return; }
  matches.forEach((t, i) => el.appendChild(makeTxnEl(t, i)));
}

/* ═══════════════════════════════════════════
   8. CATEGORY BREAKDOWN — PRESERVED
═══════════════════════════════════════════ */
const CHART_COLORS = [
  '#00c6b8','#22d3a0','#ff5d7a','#a78bfa','#f59e0b',
  '#0099d8','#ec4899','#10b981','#f97316','#6366f1'
];

function renderCategoryBreakdown() {
  const el = document.getElementById('categoryBreakdown');
  if (!el) return;
  el.innerHTML = '';
  const T = TRANSLATIONS[state.lang];
  const map = {};
  for (const txn of state.transactions) {
    const label = T[txn.categoryKey] || txn.category;
    if (!map[label]) map[label] = { total: 0, type: txn.type };
    map[label].total += txn.amount;
  }
  const entries = Object.entries(map).sort((a, b) => b[1].total - a[1].total);
  if (!entries.length) {
    el.innerHTML = '<p style="color:var(--tx-muted);font-size:0.82rem;text-align:center;padding:18px">No data yet</p>';
    return;
  }
  const max = entries[0][1].total;
  entries.forEach(([name, data], i) => {
    const pct   = (data.total / max) * 100;
    const color = data.type === 'income' ? 'var(--income)' : CHART_COLORS[i % CHART_COLORS.length];
    const row   = document.createElement('div');
    row.className = 'cat-row';
    row.innerHTML = `
      <div class="cat-dot" style="background:${color}"></div>
      <span class="cat-name">${name}</span>
      <div class="cat-bar-wrap"><div class="cat-bar" style="width:0%;background:${color}" data-w="${pct}"></div></div>
      <span class="cat-amount" style="color:${color}">$${fmt(data.total)}</span>
    `;
    el.appendChild(row);
    requestAnimationFrame(() => {
      setTimeout(() => { row.querySelector('.cat-bar').style.width = pct + '%'; }, 60 + i * 50);
    });
  });
}

/* ═══════════════════════════════════════════
   9. SPENDING CHART — PRESERVED (pure canvas)
═══════════════════════════════════════════ */
function drawSpendingChart() {
  const canvas = document.getElementById('spendingCanvas');
  if (!canvas) return;
  const days = parseInt(document.getElementById('chartPeriod')?.value) || 7;
  const ctx  = canvas.getContext('2d');
  const dpr  = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width  = rect.width  * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width  = rect.width  + 'px';
  canvas.style.height = rect.height + 'px';
  ctx.scale(dpr, dpr);

  const W = rect.width, H = rect.height;
  const PAD = { top: 10, right: 10, bottom: 24, left: 44 };
  const now = new Date();

  const buckets = {};
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    buckets[d.toISOString().split('T')[0]] = 0;
  }
  for (const txn of state.transactions) {
    if (txn.type === 'expense' && buckets[txn.date] !== undefined) {
      buckets[txn.date] += txn.amount;
    }
  }

  const labels = Object.keys(buckets);
  const values = Object.values(buckets);
  const maxV   = Math.max(...values, 1);
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top  - PAD.bottom;
  const step   = chartW / (labels.length - 1 || 1);

  const pts = labels.map((_, i) => ({
    x: PAD.left + i * step,
    y: PAD.top  + chartH - (values[i] / maxV) * chartH
  }));

  ctx.clearRect(0, 0, W, H);

  // Gradient fill
  const grad = ctx.createLinearGradient(0, PAD.top, 0, PAD.top + chartH);
  grad.addColorStop(0, 'rgba(0,198,184,0.30)');
  grad.addColorStop(1, 'rgba(0,198,184,0.00)');

  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    const cx = (pts[i-1].x + pts[i].x) / 2;
    ctx.bezierCurveTo(cx, pts[i-1].y, cx, pts[i].y, pts[i].x, pts[i].y);
  }
  ctx.lineTo(pts[pts.length-1].x, PAD.top + chartH);
  ctx.lineTo(pts[0].x,            PAD.top + chartH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    const cx = (pts[i-1].x + pts[i].x) / 2;
    ctx.bezierCurveTo(cx, pts[i-1].y, cx, pts[i].y, pts[i].x, pts[i].y);
  }
  ctx.strokeStyle = '#00c6b8';
  ctx.lineWidth = 2.2;
  ctx.stroke();

  // Labels
  const mutedColor = getComputedStyle(document.documentElement).getPropertyValue('--tx-muted').trim() || '#384560';
  ctx.fillStyle  = mutedColor;
  ctx.font       = '10px Outfit, sans-serif';
  ctx.textAlign  = 'right';
  ctx.fillText('$' + Math.round(maxV), PAD.left - 6, PAD.top + 9);
  const fmtD = d => new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  ctx.textAlign = 'left';
  ctx.fillText(fmtD(labels[0]),            PAD.left,        H - 4);
  ctx.textAlign = 'right';
  ctx.fillText(fmtD(labels[labels.length-1]), W - PAD.right, H - 4);

  // Dots
  pts.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#00c6b8';
    ctx.fill();
  });
}

/* ═══════════════════════════════════════════
   10. NOTIFICATIONS — PRESERVED + improved
═══════════════════════════════════════════ */
/**
 * Generate "Your balance is now $X" notification after each transaction.
 * PRESERVED: identical message format as original.
 */
function addNotification(type, amount, newBalance) {
  if (!state.notifEnabled) return;
  const T   = TRANSLATIONS[state.lang];
  const msg = type === 'income'
    ? `${T.notif_added_income} $${fmt(amount)}. ${T.notif_balance_now} $${fmt(newBalance)}`
    : `${T.notif_added_expense} $${fmt(amount)}. ${T.notif_balance_now} $${fmt(newBalance)}`;
  state.notifications.unshift({
    id:   Date.now().toString(),
    type,
    message: msg,
    time:    new Date().toISOString(),
    read:    false,
  });
  if (state.notifications.length > 50) state.notifications.pop();
  saveNotifs();
  renderNotifPanel();
}

function renderNotifPanel() {
  const list  = document.getElementById('notifList');
  const badge = document.getElementById('notifBadge');
  const btn   = document.getElementById('notifBtn');
  const empty = document.getElementById('notifEmpty');
  if (!list) return;

  const unread = state.notifications.filter(n => !n.read).length;
  if (unread > 0) {
    badge.style.display = 'grid';
    badge.textContent   = unread > 9 ? '9+' : unread;
    btn?.classList.add('has-notif');
  } else {
    badge.style.display = 'none';
    btn?.classList.remove('has-notif');
  }

  // Remove old items (keep empty placeholder)
  list.querySelectorAll('.notif-item').forEach(n => n.remove());

  if (state.notifications.length === 0) {
    if (empty) { empty.style.display = 'block'; }
    return;
  }
  if (empty) empty.style.display = 'none';

  state.notifications.forEach((n, i) => {
    const item = document.createElement('div');
    item.className = 'notif-item' + (n.read ? '' : ' unread');
    item.style.animationDelay = (i * 0.04) + 's';
    item.innerHTML = `
      <div class="notif-dot ${n.type}"></div>
      <div style="flex:1;min-width:0">
        <div class="notif-text">${n.message}</div>
        <div class="notif-time">${getRelTime(new Date(n.time))}</div>
      </div>
      <div class="notif-unread"></div>
    `;
    list.appendChild(item);
  });
}

function getRelTime(date) {
  const s = Math.floor((Date.now() - date) / 1000);
  if (s < 60)    return 'Just now';
  if (s < 3600)  return Math.floor(s / 60)   + 'm ago';
  if (s < 86400) return Math.floor(s / 3600)  + 'h ago';
  return Math.floor(s / 86400) + 'd ago';
}

/* ═══════════════════════════════════════════
   11. TRANSACTION CRUD — PRESERVED
═══════════════════════════════════════════ */
function addTransaction(type, amount, categoryKey, category, description, date) {
  state.transactions.push({
    id: Date.now().toString(),
    type, amount, categoryKey, category, description, date
  });
  saveTxns();
  const { balance } = calcTotals();
  addNotification(type, amount, balance);  // ← "Your balance is now $X"
  renderAll();
}

function deleteTransaction(id) {
  state.transactions = state.transactions.filter(t => t.id !== id);
  saveTxns();
  renderAll();
}

/* ═══════════════════════════════════════════
   12. RENDER ALL
═══════════════════════════════════════════ */
function renderAll() {
  updateTotals();
  renderDashFeed();
  renderFullList();
  renderCategoryBreakdown();
  drawSpendingChart();
}

/* ═══════════════════════════════════════════
   13. MODAL MANAGEMENT — PRESERVED
═══════════════════════════════════════════ */
function openTxnModal(type, prefillCatKey = '') {
  const T   = TRANSLATIONS[state.lang];
  const box = document.getElementById('txnModalBox');
  document.getElementById('txnType').value     = type;
  document.getElementById('modalTitle').textContent = type === 'income' ? T.modal_income_title : T.modal_expense_title;
  box.className = `modal-box modal-${type}`;

  // Populate category select
  const sel = document.getElementById('txnCategory');
  sel.innerHTML = '';
  CATEGORIES[type].forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.key;
    opt.textContent = cat.icon + ' ' + (T[cat.key] || cat.key);
    sel.appendChild(opt);
  });
  if (prefillCatKey) sel.value = prefillCatKey;

  document.getElementById('txnDate').value   = new Date().toISOString().split('T')[0];
  document.getElementById('txnAmount').value = '';
  document.getElementById('txnDesc').value   = '';
  document.getElementById('txnSubmit').textContent = T.add_transaction;

  document.getElementById('txnModal').classList.add('open');
  setTimeout(() => document.getElementById('txnAmount').focus(), 220);
}

function closeTxnModal() {
  document.getElementById('txnModal').classList.remove('open');
}

function showConfirm(title, msg, cb) {
  setTxt('confirmTitle', title);
  setTxt('confirmMsg',   msg);
  state.confirmCallback = cb;
  document.getElementById('confirmModal').classList.add('open');
}

function closeConfirm() {
  document.getElementById('confirmModal').classList.remove('open');
  state.confirmCallback = null;
}

/* ═══════════════════════════════════════════
   14. NAVIGATION (Bottom Nav + Sections)
═══════════════════════════════════════════ */
function navigateTo(section) {
  // Hide all sections
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  // Show target
  const target = document.getElementById('section-' + section);
  if (target) target.classList.add('active');

  // Update bottom nav active state
  document.querySelectorAll('.bn-item').forEach(b => b.classList.remove('active'));
  const activeBtn = document.getElementById('bn-' + section);
  if (activeBtn) activeBtn.classList.add('active');

  // Close any open dropdowns
  closeAllDropdowns();

  // Section-specific actions
  if (section === 'reports') {
    renderCategoryBreakdown();
    setTimeout(drawSpendingChart, 60);
  }
  if (section === 'search') {
    // Don't update bottom nav for search overlay
    document.querySelectorAll('.bn-item').forEach(b => {
      if (b.dataset.section === 'dashboard') b.classList.add('active');
    });
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ═══════════════════════════════════════════
   15. THEME — PRESERVED
═══════════════════════════════════════════ */
function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.dataset.theme = theme;
  const checkbox  = document.getElementById('themeCheckbox');
  const ddChk     = document.getElementById('ddThemeChk');
  if (checkbox) checkbox.checked = theme === 'dark';
  if (ddChk)    ddChk.checked    = theme === 'dark';
  saveLS(LS.theme, theme);
  setTimeout(drawSpendingChart, 50);
}

/* ═══════════════════════════════════════════
   16. LANGUAGE — PRESERVED
═══════════════════════════════════════════ */
function applyLanguage(lang) {
  state.lang = lang;
  const T    = TRANSLATIONS[lang];
  saveLS(LS.lang, lang);

  // Update all data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (T[key] !== undefined) el.textContent = T[key];
  });

  // Language label buttons
  const isEn = lang === 'en';
  setTxt('langBtnLabel',  isEn ? 'English'       : 'မြန်မာ');
  setTxt('ddLangLabel',   isEn ? 'Switch to မြန်မာ' : 'Switch to English');

  updateGreeting();
  renderAll();
  renderNotifPanel();
}

function toggleLanguage() {
  applyLanguage(state.lang === 'en' ? 'my' : 'en');
}

/* ═══════════════════════════════════════════
   17. GREETING & DATE — PRESERVED
═══════════════════════════════════════════ */
function updateGreeting() {
  const h = new Date().getHours();
  const T = TRANSLATIONS[state.lang];
  let key = h < 12 ? 'good_morning' : h < 17 ? 'good_afternoon' : 'good_evening';
  setTxt('greetingText', T[key]);
  setTxt('greetingName', state.userName.split(' ')[0] + ' 👋');
}

function updateDateBadge() {
  const el = document.getElementById('dateBadge');
  if (el) el.textContent = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  });
}

/* ═══════════════════════════════════════════
   18. EXPORT CSV — PRESERVED
═══════════════════════════════════════════ */
function exportCSV() {
  const T      = TRANSLATIONS[state.lang];
  const header = ['Date','Type','Category','Description','Amount'].join(',');
  const rows   = state.transactions.map(txn => [
    txn.date,
    txn.type,
    (T[txn.categoryKey] || txn.category).replace(/,/g, ';'),
    (txn.description || '').replace(/,/g, ';'),
    txn.amount.toFixed(2)
  ].join(','));
  const csv  = [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `novapay-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ═══════════════════════════════════════════
   19. PROFILE — PRESERVED
═══════════════════════════════════════════ */
function updateProfileUI() {
  const name = state.userName;
  const init = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'A';
  setTxt('topAvatar',          init[0]);
  setTxt('profileAvatarLarge', init[0]);
  const ni = document.getElementById('profileNameInput');
  if (ni) ni.value = name;
  updateGreeting();
}

/* ═══════════════════════════════════════════
   20. DROPDOWN HELPERS
═══════════════════════════════════════════ */
function closeAllDropdowns() {
  document.getElementById('dotsDropdown')?.classList.remove('open');
  document.getElementById('notifDropdown')?.classList.remove('open');
  document.getElementById('dotsBtn')?.classList.remove('active');
}

/* ═══════════════════════════════════════════
   21. FAB (Floating Action Button)
═══════════════════════════════════════════ */
function toggleFab(force = null) {
  const fab     = document.getElementById('fabBtn');
  const actions = document.getElementById('fabActions');
  const overlay = document.getElementById('fabOverlay');
  const open    = force !== null ? force : !state.fabOpen;
  state.fabOpen = open;
  fab?.classList.toggle('open', open);
  actions?.classList.toggle('open', open);
  overlay?.classList.toggle('open', open);
}

/* ═══════════════════════════════════════════
   22. SEARCH
═══════════════════════════════════════════ */
function handleSearch(q) {
  state.searchQuery = q;
  const clear = document.getElementById('searchClear');
  if (clear) clear.classList.toggle('visible', q.length > 0);

  if (q.trim()) {
    navigateTo('search');
    renderSearchResults(q);
  } else {
    navigateTo('dashboard');
  }
}

/* ═══════════════════════════════════════════
   23. EVENT WIRING
═══════════════════════════════════════════ */
function wireEvents() {

  /* ── Bottom Navigation ── */
  document.querySelectorAll('.bn-item[data-section]').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.section));
  });

  /* ── FAB ── */
  document.getElementById('fabBtn')?.addEventListener('click', e => {
    e.stopPropagation();
    toggleFab();
  });
  document.getElementById('fabIncome')?.addEventListener('click', () => {
    toggleFab(false);
    openTxnModal('income');
  });
  document.getElementById('fabExpense')?.addEventListener('click', () => {
    toggleFab(false);
    openTxnModal('expense');
  });
  document.getElementById('fabOverlay')?.addEventListener('click', () => toggleFab(false));

  /* ── Quick category grid (dashboard) ── */
  document.querySelectorAll('.qcat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      const cat  = btn.dataset.cat;
      openTxnModal(type, cat);
    });
  });

  /* ── 3-Dots button ── */
  document.getElementById('dotsBtn')?.addEventListener('click', e => {
    e.stopPropagation();
    const dd  = document.getElementById('dotsDropdown');
    const btn = document.getElementById('dotsBtn');
    const open = dd.classList.toggle('open');
    btn.classList.toggle('active', open);
    // Close notif if open
    if (open) document.getElementById('notifDropdown')?.classList.remove('open');
  });

  /* 3-dots: Dark mode toggle */
  document.getElementById('ddThemeChk')?.addEventListener('change', e => {
    applyTheme(e.target.checked ? 'dark' : 'light');
  });

  /* 3-dots: Add Income */
  document.getElementById('ddAddIncome')?.addEventListener('click', () => {
    closeAllDropdowns();
    openTxnModal('income');
  });

  /* 3-dots: Add Expense */
  document.getElementById('ddAddExpense')?.addEventListener('click', () => {
    closeAllDropdowns();
    openTxnModal('expense');
  });

  /* 3-dots: History */
  document.getElementById('ddHistory')?.addEventListener('click', () => {
    closeAllDropdowns();
    navigateTo('transactions');
  });

  /* 3-dots: Language */
  document.getElementById('ddLang')?.addEventListener('click', () => {
    toggleLanguage();
    closeAllDropdowns();
  });

  /* ── Search ── */
  const searchInput = document.getElementById('searchInput');
  searchInput?.addEventListener('input', e => handleSearch(e.target.value));
  searchInput?.addEventListener('keydown', e => { if (e.key === 'Escape') { searchInput.value = ''; handleSearch(''); } });
  document.getElementById('searchClear')?.addEventListener('click', () => {
    if (searchInput) { searchInput.value = ''; handleSearch(''); searchInput.focus(); }
  });

  /* ── Avatar → Settings ── */
  document.getElementById('avatarBtn')?.addEventListener('click', () => navigateTo('settings'));

  /* ── Notification bell ── */
  document.getElementById('notifBtn')?.addEventListener('click', e => {
    e.stopPropagation();
    const dd = document.getElementById('notifDropdown');
    const open = dd.classList.toggle('open');
    if (open) {
      document.getElementById('dotsDropdown')?.classList.remove('open');
      document.getElementById('dotsBtn')?.classList.remove('active');
      // Mark all as read on open
      state.notifications.forEach(n => n.read = true);
      saveNotifs();
      renderNotifPanel();
    }
  });
  document.getElementById('notifClear')?.addEventListener('click', () => {
    state.notifications = [];
    saveNotifs();
    renderNotifPanel();
  });

  /* ── Dashboard filter tabs ── */
  document.getElementById('dashFilterTabs')?.addEventListener('click', e => {
    const btn = e.target.closest('.filter-tab');
    if (!btn) return;
    document.querySelectorAll('#dashFilterTabs .filter-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.dashFilter = btn.dataset.filter;
    renderDashFeed();
  });
  document.getElementById('dashDateFilter')?.addEventListener('change', e => {
    state.dashDateFilter = e.target.value;
    renderDashFeed();
  });

  /* ── Transaction section filter tabs ── */
  document.getElementById('txnFilterTabs')?.addEventListener('click', e => {
    const btn = e.target.closest('.filter-tab');
    if (!btn) return;
    document.querySelectorAll('#txnFilterTabs .filter-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.currentFilter = btn.dataset.filter;
    renderFullList();
  });
  document.getElementById('txnDateFilter')?.addEventListener('change', e => {
    state.dateFilter = e.target.value;
    renderFullList();
  });

  /* ── Export CSV (both buttons) ── */
  document.getElementById('exportCsvBtnDash')?.addEventListener('click', exportCSV);
  document.getElementById('exportCsvBtnTxn')?.addEventListener('click',  exportCSV);

  /* ── Transaction Modal ── */
  document.getElementById('modalClose')?.addEventListener('click', closeTxnModal);
  document.getElementById('txnModal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('txnModal')) closeTxnModal();
  });
  document.getElementById('txnModal')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('txnSubmit')?.click();
  });

  document.getElementById('txnSubmit')?.addEventListener('click', () => {
    const type   = document.getElementById('txnType').value;
    const amount = parseFloat(document.getElementById('txnAmount').value);
    const catKey = document.getElementById('txnCategory').value;
    const desc   = document.getElementById('txnDesc').value.trim();
    const date   = document.getElementById('txnDate').value;
    const T      = TRANSLATIONS[state.lang];

    if (!amount || amount <= 0) {
      const inp = document.getElementById('txnAmount');
      inp.focus();
      inp.style.borderColor = 'var(--expense)';
      setTimeout(() => inp.style.borderColor = '', 1400);
      return;
    }
    const catName = T[catKey] || catKey || (type === 'income' ? T.cat_other_income : T.cat_other_expense);
    addTransaction(type, amount, catKey || `cat_other_${type}`, catName, desc, date);
    closeTxnModal();
  });

  /* ── Confirm modal ── */
  document.getElementById('confirmCancel')?.addEventListener('click', closeConfirm);
  document.getElementById('confirmModal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('confirmModal')) closeConfirm();
  });
  document.getElementById('confirmOk')?.addEventListener('click', () => {
    state.confirmCallback?.();
    closeConfirm();
  });

  /* ── Settings ── */
  // Theme toggle (settings)
  document.getElementById('themeCheckbox')?.addEventListener('change', e => {
    applyTheme(e.target.checked ? 'dark' : 'light');
  });
  // Language toggle (settings)
  document.getElementById('langBtnSettings')?.addEventListener('click', toggleLanguage);
  // Notif enabled
  document.getElementById('notifToggle')?.addEventListener('change', e => {
    state.notifEnabled = e.target.checked;
    saveLS(LS.notifEnabled, state.notifEnabled);
  });
  // Profile name
  document.getElementById('profileNameInput')?.addEventListener('input', e => {
    state.userName = e.target.value || 'User';
    saveLS(LS.userName, state.userName);
    updateProfileUI();
  });
  // Clear data
  document.getElementById('clearDataBtn')?.addEventListener('click', () => {
    const T = TRANSLATIONS[state.lang];
    showConfirm(T.confirm_clear, T.confirm_clear_msg, () => {
      state.transactions = [];
      saveTxns();
      renderAll();
    });
  });
  // Logout
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    showConfirm('Logout?', 'Your data is safely stored locally. You can return anytime.', () => {
      localStorage.clear();
      location.reload();
    });
  });

  /* ── Chart period ── */
  document.getElementById('chartPeriod')?.addEventListener('change', drawSpendingChart);

  /* ── Close dropdowns on outside click ── */
  document.addEventListener('click', e => {
    if (!document.getElementById('dotsWrap')?.contains(e.target)) {
      document.getElementById('dotsDropdown')?.classList.remove('open');
      document.getElementById('dotsBtn')?.classList.remove('active');
    }
    if (!document.getElementById('notifWrap')?.contains(e.target)) {
      document.getElementById('notifDropdown')?.classList.remove('open');
    }
  });

  /* ── Keyboard ── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeTxnModal();
      closeConfirm();
      closeAllDropdowns();
      toggleFab(false);
      const si = document.getElementById('searchInput');
      if (si?.value) { si.value = ''; handleSearch(''); }
    }
  });

  /* ── Resize: redraw chart ── */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawSpendingChart, 200);
  });
}

/* ═══════════════════════════════════════════
   24. INIT
═══════════════════════════════════════════ */
function init() {
  loadState();
  applyTheme(state.theme);
  applyLanguage(state.lang);
  updateDateBadge();
  updateProfileUI();

  const notifToggle = document.getElementById('notifToggle');
  if (notifToggle) notifToggle.checked = state.notifEnabled;

  wireEvents();
  renderAll();
  renderNotifPanel();

  // Seed demo data once if empty
  if (state.transactions.length === 0) {
    const today     = new Date().toISOString().split('T')[0];
    const yday      = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const twoDays   = new Date(Date.now() - 172800000).toISOString().split('T')[0];
    state.transactions = [
      { id:'1', type:'income',  amount:5200, categoryKey:'cat_salary',      category:'Salary',      description:'Monthly salary',    date: twoDays },
      { id:'2', type:'expense', amount:120,  categoryKey:'cat_food',         category:'Food',         description:'Lunch & dinner',    date: twoDays },
      { id:'3', type:'expense', amount:45,   categoryKey:'cat_transport',    category:'Transport',    description:'Grab rides',        date: yday },
      { id:'4', type:'income',  amount:850,  categoryKey:'cat_freelance',    category:'Freelance',    description:'Design project',    date: yday },
      { id:'5', type:'expense', amount:299,  categoryKey:'cat_shopping',     category:'Shopping',     description:'Online order',      date: today },
    ];
    saveTxns();
    renderAll();
  }

  console.log('%c NovaPay 2.0 Ready ✓ ', 'background:#00c6b8;color:#fff;padding:4px 10px;border-radius:4px;font-weight:bold');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
