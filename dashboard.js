/* ══════════════════════════════════════════════════════
   FINPAY – SMART FINANCE  |  dashboard.js
   ES6 Vanilla JS — All original finance logic preserved
   New: 2-row command bar · Search · 3-dots · Bottom nav
        FAB · Quick categories · Balance notifications
══════════════════════════════════════════════════════ */
'use strict';

/* ═══════════════════════════════════════════
   1. TRANSLATIONS  (English / Burmese) — PRESERVED
═══════════════════════════════════════════ */
const TRANSLATIONS = {
  en: {
    brand: 'FinPay',
    nav_dashboard: 'Home',
    nav_transactions: 'History',
    nav_reports: 'Reports',
    nav_settings: 'Settings',
    premium_member: 'Premium Member',
    good_morning:   'Good morning,',
    good_afternoon: 'Good afternoon,',
    good_evening:   'Good evening,',
    available_balance: 'Balance',
    income:  'Income',
    expense: 'Expense',
    add_income:  'Add Income',
    add_expense: 'Add Expense',
    reports:  'Reports',
    transfer: 'Transfer',
    spending_overview: 'Spending Overview',
    last_7:  'Last 7 Days',
    last_30: 'Last 30 Days',
    recent_transactions: 'Recent Activity',
    see_all: 'See All',
    all_transactions: 'All Transactions',
    all:        'All',
    export_csv: 'Export CSV',
    total_income:      'Total Income',
    total_expense:     'Total Expense',
    net_balance:       'Net Balance',
    total_transactions:'Transactions',
    category_breakdown:'Category Breakdown',
    settings:          'Settings',
    dark_mode:     'Dark Mode',
    dark_mode_sub: 'Switch between dark and light',
    language:      'Language',
    language_sub:  'English / Burmese',
    notifications_setting: 'Notifications',
    notifications_sub:     'Balance change alerts',
    clear_data:    'Clear All Data',
    clear_data_sub:'Remove all transactions',
    clear:  'Clear',
    logout: 'Logout',
    notifications: 'Notifications',
    clear_all:     'Clear All',
    no_notifs:     'No notifications yet',
    amount:      'Amount ($)',
    category:    'Category',
    description: 'Description',
    date:        'Date',
    add_transaction: 'Add Transaction',
    cancel:  'Cancel',
    confirm: 'Confirm',
    modal_income_title:  'Add Income',
    modal_expense_title: 'Add Expense',
    notif_balance_now:   'Your balance is now',
    notif_added_income:  '↑ Income Added',
    notif_added_expense: '↓ Expense Added',
    confirm_delete:      'Delete this transaction?',
    confirm_delete_msg:  'This action cannot be undone.',
    confirm_clear:       'Clear all data?',
    confirm_clear_msg:   'All transactions will be permanently removed.',
    no_transactions: 'No transactions yet',
    add_first:       'Tap + to add your first entry',
    search_results:  'Search Results',
    quick_actions:   'Quick Actions',
    cat_salary:       'Salary',
    cat_freelance:    'Freelance',
    cat_investment:   'Invest',
    cat_gift:         'Gift',
    cat_other_income: 'Other Income',
    cat_food:          'Food',
    cat_transport:     'Transport',
    cat_shopping:      'Shopping',
    cat_bills:         'Bills',
    cat_health:        'Health',
    cat_entertainment: 'Entertain',
    cat_education:     'Education',
    cat_rent:          'Rent',
    cat_other_expense: 'Other',
  },
  my: {
    brand: 'FinPay',
    nav_dashboard: 'ဒက်ရ်ဘုတ်',
    nav_transactions: 'မှတ်တမ်း',
    nav_reports: 'အစီရင်ခံ',
    nav_settings: 'ဆက်တင်',
    premium_member: 'ပရီမီယံ အဖွဲ့ဝင်',
    good_morning:   'မင်္ဂလာနံနက်ခင်းပါ၊',
    good_afternoon: 'မင်္ဂလာနေ့လည်ပါ၊',
    good_evening:   'မင်္ဂလာညနေပါ၊',
    available_balance: 'လက်ကျန်',
    income:  'ဝင်ငွေ',
    expense: 'ထွက်ငွေ',
    add_income:  'ဝင်ငွေထည့်',
    add_expense: 'ထွက်ငွေထည့်',
    reports:  'အစီရင်ခံ',
    transfer: 'လွှဲပြောင်း',
    spending_overview: 'ငွေသုံးမှု အနှစ်ချုပ်',
    last_7:  'ၿပီးခဲ့သော ၇ ရက်',
    last_30: 'ၿပီးခဲ့သော ၃၀ ရက်',
    recent_transactions: 'မကြာမီ လုပ်ဆောင်ချက်',
    see_all: 'အားလုံးကြည့်',
    all_transactions: 'ငွေသွင်း/ထုတ် အားလုံး',
    all:        'အားလုံး',
    export_csv: 'CSV ထုတ်ယူ',
    total_income:      'စုစုပေါင်း ဝင်ငွေ',
    total_expense:     'စုစုပေါင်း ထွက်ငွေ',
    net_balance:       'အသားတင် လက်ကျန်',
    total_transactions:'ငွေလွှဲ စုစုပေါင်း',
    category_breakdown:'အမျိုးအစားအလိုက်',
    settings:          'ဆက်တင်',
    dark_mode:     'အမဲရောင် မုဒ်',
    dark_mode_sub: 'အမဲ / အဖြူ ပြောင်းလဲ',
    language:      'ဘာသာစကား',
    language_sub:  'အင်္ဂလိပ် / မြန်မာ',
    notifications_setting: 'အကြောင်းကြားချက်',
    notifications_sub:     'လက်ကျန်ငွေ သတိပေး',
    clear_data:     'ဒေတာ အားလုံး ရှင်းလင်း',
    clear_data_sub: 'ငွေသွင်း/ထုတ် အားလုံး ဖျက်မည်',
    clear:  'ရှင်းလင်း',
    logout: 'ထွက်မည်',
    notifications: 'အကြောင်းကြားချက်',
    clear_all:     'အားလုံး ရှင်းလင်း',
    no_notifs:     'အကြောင်းကြားချက် မရှိသေးပါ',
    amount:      'ငွေပမာဏ ($)',
    category:    'အမျိုးအစား',
    description: 'ဖော်ပြချက်',
    date:        'ရက်စွဲ',
    add_transaction: 'ငွေသွင်း/ထုတ် ထည့်',
    cancel:  'မလုပ်တော့',
    confirm: 'အတည်ပြု',
    modal_income_title:  'ဝင်ငွေ ထည့်သည်',
    modal_expense_title: 'ထွက်ငွေ ထည့်သည်',
    notif_balance_now:   'သင့်လက်ကျန်ငွေ',
    notif_added_income:  '↑ ဝင်ငွေ ထည့်ပြီး',
    notif_added_expense: '↓ ထွက်ငွေ ထည့်ပြီး',
    confirm_delete:     'ဤငွေလွှဲကို ဖျက်မလား?',
    confirm_delete_msg: 'ဤလုပ်ဆောင်ချက်ကို ပြန်မလုပ်နိုင်ပါ။',
    confirm_clear:      'ဒေတာ အားလုံး ရှင်းမလား?',
    confirm_clear_msg:  'ငွေသွင်း/ထုတ် အားလုံး ပြည်တမ်း ဖျက်မည်။',
    no_transactions: 'ငွေသွင်း/ထုတ် မရှိသေးပါ',
    add_first:       '+ ကိုနှိပ်၍ ထည့်ပါ',
    search_results:  'ရှာဖွေမှု ရလဒ်',
    quick_actions:   'မြန်ဆန်သော လုပ်ဆောင်ချက်',
    cat_salary:       'လစာ',
    cat_freelance:    'ဖရီးလန်စ်',
    cat_investment:   'ရင်းနှီး',
    cat_gift:         'လက်ဆောင်',
    cat_other_income: 'အခြား ဝင်ငွေ',
    cat_food:          'အစားအသောက်',
    cat_transport:     'သယ်ယူ',
    cat_shopping:      'ဈေးဝယ်',
    cat_bills:         'ဘီလ်',
    cat_health:        'ကျန်းမာ',
    cat_entertainment: 'အပျော်',
    cat_education:     'ပညာ',
    cat_rent:          'အငှားခ',
    cat_other_expense: 'အခြား',
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
   3. STATE
═══════════════════════════════════════════ */
const S = {
  transactions:  [],
  notifications: [],
  lang:          'en',
  theme:         'dark',
  notifEnabled:  true,
  userName:      'Alex Morgan',
  /* filters */
  dashFilter:    'all',
  dashDate:      '',
  txnFilter:     'all',
  txnDate:       '',
  searchQuery:   '',
  /* ui */
  fabOpen:       false,
  confirmCb:     null,
};

/* ═══════════════════════════════════════════
   4. LOCAL STORAGE — PRESERVED keys identical
═══════════════════════════════════════════ */
const LS = {
  transactions:  'novapay_transactions',
  notifications: 'novapay_notifications',
  lang:          'novapay_lang',
  theme:         'novapay_theme',
  notifEnabled:  'novapay_notif',
  userName:      'novapay_username',
};

const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const lsGet = (k, fb) => { try { const v = localStorage.getItem(k); return v !== null ? JSON.parse(v) : fb; } catch { return fb; } };

function loadState() {
  S.transactions  = lsGet(LS.transactions,  []);
  S.notifications = lsGet(LS.notifications, []);
  S.lang          = lsGet(LS.lang,  'en');
  S.theme         = lsGet(LS.theme, 'dark');
  S.notifEnabled  = lsGet(LS.notifEnabled, true);
  S.userName      = lsGet(LS.userName, 'Alex Morgan');
}
const saveTxns   = () => lsSet(LS.transactions,  S.transactions);
const saveNotifs = () => lsSet(LS.notifications, S.notifications);

/* ═══════════════════════════════════════════
   5. FINANCE CALCULATIONS — PRESERVED
═══════════════════════════════════════════ */
function calcTotals() {
  let inc = 0, exp = 0;
  for (const t of S.transactions) {
    t.type === 'income' ? (inc += t.amount) : (exp += t.amount);
  }
  return { inc, exp, bal: inc - exp };
}

/* Format number with 2 decimal places */
const fmt = n => new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

/* ═══════════════════════════════════════════
   6. DOM HELPERS
═══════════════════════════════════════════ */
const $ = id => document.getElementById(id);
const setText = (id, v) => { const e = $(id); if (e) e.textContent = v; };

/* ═══════════════════════════════════════════
   7. ANIMATED COUNTER — PRESERVED
═══════════════════════════════════════════ */
function animCount(elId, target) {
  const el = $(elId);
  if (!el) return;
  const from = parseFloat(el.textContent.replace(/,/g, '')) || 0;
  const diff = target - from;
  const dur  = 640;
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
   8. UPDATE TOTALS + NAVBAR STRIP
═══════════════════════════════════════════ */
function updateTotals() {
  const { inc, exp, bal } = calcTotals();

  /* ── Balance card (animated) ── */
  animCount('balanceDisplay', bal);
  setText('totalIncomeDisplay',  '$' + fmt(inc));
  setText('totalExpenseDisplay', '$' + fmt(exp));

  /* ── Row-2 inline summary strip ── */
  setText('r2Balance', '$' + fmt(bal));
  setText('r2Income',  '$' + fmt(inc));
  setText('r2Expense', '$' + fmt(exp));

  /* ── Reports ── */
  setText('repIncome',  '$' + fmt(inc));
  setText('repExpense', '$' + fmt(exp));
  setText('repBalance', '$' + fmt(bal));
  setText('repCount',   S.transactions.length);
  const rb = $('repBalance');
  if (rb) rb.style.color = bal >= 0 ? 'var(--inc)' : 'var(--exp)';
}

/* ═══════════════════════════════════════════
   9. TRANSACTION ITEM BUILDER — PRESERVED
═══════════════════════════════════════════ */
function getCatMeta(type, key) {
  return (CATEGORIES[type] || []).find(c => c.key === key) || { icon: type === 'income' ? '💰' : '💸' };
}

function makeTxnCard(txn, idx) {
  const T      = TRANSLATIONS[S.lang];
  const meta   = getCatMeta(txn.type, txn.categoryKey);
  const label  = T[txn.categoryKey] || txn.category;
  const sign   = txn.type === 'income' ? '+' : '-';
  const ds     = txn.date ? new Date(txn.date + 'T00:00:00').toLocaleDateString('en-US',
    { month: 'short', day: 'numeric', year: 'numeric' }) : '';

  const div = document.createElement('div');
  div.className = 'txn-card';
  div.style.animationDelay = Math.min(idx * 0.04, 0.5) + 's';
  div.innerHTML = `
    <div class="txn-ico ${txn.type}">${meta.icon}</div>
    <div class="txn-info">
      <div class="txn-cat">${label}</div>
      <div class="txn-desc">${txn.description || ''}</div>
    </div>
    <div class="txn-meta">
      <div class="txn-amt ${txn.type}">${sign}$${fmt(txn.amount)}</div>
      <div class="txn-date">${ds}</div>
    </div>
    <button class="txn-del" data-id="${txn.id}" title="Delete">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
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
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
      <path d="M16 3H8v4h8V3z"/>
    </svg>
    <p>${T.no_transactions}</p>
    <p style="font-size:.7rem">${T.add_first}</p>`;
  return div;
}

/* ═══════════════════════════════════════════
   10. RENDER FEEDS
═══════════════════════════════════════════ */
/* Dashboard feed — recent 20, respects dashFilter + dashDate */
function renderDashFeed() {
  const el = $('dashFeed');
  if (!el) return;
  const list = [...S.transactions].reverse().filter(t => {
    const typeOk = S.dashFilter === 'all' || t.type === S.dashFilter;
    const dateOk = !S.dashDate  || t.date === S.dashDate;
    return typeOk && dateOk;
  }).slice(0, 20);
  el.innerHTML = '';
  if (!list.length) { el.appendChild(emptyEl()); return; }
  list.forEach((t, i) => el.appendChild(makeTxnCard(t, i)));
}

/* Transactions page feed */
function renderTxnFeed() {
  const el = $('txnFeed');
  if (!el) return;
  const list = [...S.transactions].reverse().filter(t => {
    const typeOk = S.txnFilter === 'all' || t.type === S.txnFilter;
    const dateOk = !S.txnDate  || t.date === S.txnDate;
    return typeOk && dateOk;
  });
  el.innerHTML = '';
  if (!list.length) { el.appendChild(emptyEl()); return; }
  list.forEach((t, i) => el.appendChild(makeTxnCard(t, i)));
}

/* Search results */
function renderSearch(q) {
  const el = $('searchFeed');
  if (!el) return;
  const T    = TRANSLATIONS[S.lang];
  const low  = q.toLowerCase().trim();
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
   11. CATEGORY BREAKDOWN — PRESERVED
═══════════════════════════════════════════ */
const CAT_COLORS = [
  '#f0a500','#10d48e','#ff4d6d','#a78bfa','#38bdf8',
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
    el.innerHTML = '<p style="color:var(--tx3);font-size:.8rem;text-align:center;padding:18px">No data yet</p>';
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
      setTimeout(() => { row.querySelector('.cat-bar').style.width = pct + '%'; }, 60 + i * 50)
    );
  });
}

/* ═══════════════════════════════════════════
   12. SPENDING CHART — PRESERVED (pure canvas)
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
  const PAD = { t: 10, r: 10, b: 24, l: 44 };
  const now  = new Date();

  /* Build bucket */
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

  /* Gradient fill */
  const g = ctx.createLinearGradient(0, PAD.t, 0, PAD.t + cH);
  g.addColorStop(0, 'rgba(240,165,0,0.28)');
  g.addColorStop(1, 'rgba(240,165,0,0.00)');
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    const cx = (pts[i-1].x + pts[i].x) / 2;
    ctx.bezierCurveTo(cx, pts[i-1].y, cx, pts[i].y, pts[i].x, pts[i].y);
  }
  ctx.lineTo(pts[pts.length-1].x, PAD.t + cH);
  ctx.lineTo(pts[0].x,            PAD.t + cH);
  ctx.closePath();
  ctx.fillStyle = g;
  ctx.fill();

  /* Line */
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    const cx = (pts[i-1].x + pts[i].x) / 2;
    ctx.bezierCurveTo(cx, pts[i-1].y, cx, pts[i].y, pts[i].x, pts[i].y);
  }
  ctx.strokeStyle = '#f0a500';
  ctx.lineWidth   = 2.2;
  ctx.stroke();

  /* Axis labels */
  const muted = getComputedStyle(document.documentElement).getPropertyValue('--tx3').trim() || '#344258';
  ctx.fillStyle = muted;
  ctx.font      = '10px Plus Jakarta Sans, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('$' + Math.round(maxV), PAD.l - 6, PAD.t + 9);
  const fd = d => new Date(d + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  ctx.textAlign = 'left';  ctx.fillText(fd(labels[0]),            PAD.l,        H - 4);
  ctx.textAlign = 'right'; ctx.fillText(fd(labels[labels.length-1]), W - PAD.r, H - 4);

  /* Dots */
  pts.forEach(p => {
    ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#f0a500'; ctx.fill();
  });
}

/* ═══════════════════════════════════════════
   13. NOTIFICATIONS — PRESERVED + improved
       Every addTransaction fires "Your balance is now $X"
═══════════════════════════════════════════ */
function addNotif(type, amount, newBalance) {
  if (!S.notifEnabled) return;
  const T   = TRANSLATIONS[S.lang];
  const msg = type === 'income'
    ? `${T.notif_added_income} $${fmt(amount)}. ${T.notif_balance_now} $${fmt(newBalance)}`
    : `${T.notif_added_expense} $${fmt(amount)}. ${T.notif_balance_now} $${fmt(newBalance)}`;
  S.notifications.unshift({ id: Date.now().toString(), type, msg, time: new Date().toISOString(), read: false });
  if (S.notifications.length > 50) S.notifications.pop();
  saveNotifs();
  renderNotifPanel();
}

function renderNotifPanel() {
  const body  = $('npBody');
  const empty = $('npEmpty');
  const dot   = $('bellDot');
  const bell  = $('bellBtn');
  if (!body) return;

  const unread = S.notifications.filter(n => !n.read).length;
  if (dot) dot.style.display = unread > 0 ? 'block' : 'none';
  if (bell) bell.classList.toggle('ringing', unread > 0);

  /* Clear existing items (keep empty placeholder) */
  body.querySelectorAll('.np-item').forEach(el => el.remove());

  if (!S.notifications.length) {
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

  S.notifications.forEach((n, i) => {
    const div = document.createElement('div');
    div.className = 'np-item';
    div.style.animationDelay = (i * 0.04) + 's';
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

function relTime(date) {
  const s = Math.floor((Date.now() - date) / 1000);
  if (s < 60)    return 'Just now';
  if (s < 3600)  return Math.floor(s / 60)   + 'm ago';
  if (s < 86400) return Math.floor(s / 3600)  + 'h ago';
  return Math.floor(s / 86400) + 'd ago';
}

/* ═══════════════════════════════════════════
   14. TRANSACTION CRUD — PRESERVED
═══════════════════════════════════════════ */
function addTxn(type, amount, categoryKey, category, description, date) {
  S.transactions.push({ id: Date.now().toString(), type, amount, categoryKey, category, description, date });
  saveTxns();
  const { bal } = calcTotals();
  addNotif(type, amount, bal);   /* ← "Your balance is now $X" */
  renderAll();
}

function deleteTxn(id) {
  S.transactions = S.transactions.filter(t => t.id !== id);
  saveTxns();
  renderAll();
}

/* ═══════════════════════════════════════════
   15. RENDER ALL
═══════════════════════════════════════════ */
function renderAll() {
  updateTotals();
  renderDashFeed();
  renderTxnFeed();
  renderCatBreakdown();
  drawChart();
}

/* ═══════════════════════════════════════════
   16. NAVIGATION
═══════════════════════════════════════════ */
function goTo(page) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.classList.add('hidden');
  });
  const target = $('page-' + page);
  if (target) { target.classList.remove('hidden'); target.classList.add('active'); }

  document.querySelectorAll('.bn-btn').forEach(b => b.classList.remove('active'));
  const bnBtn = $('bn-' + page);
  if (bnBtn) bnBtn.classList.add('active');

  closeAll();
  if (page === 'reports') { renderCatBreakdown(); setTimeout(drawChart, 60); }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goSearch() {
  document.querySelectorAll('.page').forEach(p => { p.classList.remove('active'); p.classList.add('hidden'); });
  const p = $('page-search');
  if (p) { p.classList.remove('hidden'); p.classList.add('active'); }
  /* keep dashboard tab highlighted */
  document.querySelectorAll('.bn-btn').forEach(b => b.classList.remove('active'));
  const d = $('bn-dashboard');
  if (d) d.classList.add('active');
}

/* ═══════════════════════════════════════════
   17. MODAL
═══════════════════════════════════════════ */
function openModal(type, prefillCat = '') {
  const T   = TRANSLATIONS[S.lang];
  const box = $('txnCard');
  $('txnType').value    = type;
  setText('mcTitle', type === 'income' ? T.modal_income_title : T.modal_expense_title);
  box.className = `modal-card modal-${type}`;

  /* Populate category select */
  const sel = $('txnCategory');
  sel.innerHTML = '';
  CATEGORIES[type].forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.key;
    opt.textContent = cat.icon + ' ' + (T[cat.key] || cat.key);
    sel.appendChild(opt);
  });
  if (prefillCat) sel.value = prefillCat;

  $('txnDate').value   = new Date().toISOString().split('T')[0];
  $('txnAmount').value = '';
  $('txnDesc').value   = '';
  setText('txnSubmit', T.add_transaction);

  $('txnVeil').classList.add('open');
  setTimeout(() => $('txnAmount')?.focus(), 220);
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
   18. THEME — PRESERVED
═══════════════════════════════════════════ */
function applyTheme(t) {
  S.theme = t;
  document.documentElement.dataset.theme = t;
  const tc = $('themeCheck');   if (tc) tc.checked = t === 'dark';
  const tt = $('themeToggle');  if (tt) tt.checked = t === 'dark';
  lsSet(LS.theme, t);
  setTimeout(drawChart, 50);
}

/* ═══════════════════════════════════════════
   19. LANGUAGE — PRESERVED
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
  updateGreeting();
  renderAll();
  renderNotifPanel();
}
const toggleLang = () => applyLang(S.lang === 'en' ? 'my' : 'en');

/* ═══════════════════════════════════════════
   20. GREETING & DATE — PRESERVED
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
   21. EXPORT CSV — PRESERVED
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
  const csv  = [hdr, ...rows].join('\n');
  const url  = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  const a    = document.createElement('a');
  a.href = url; a.download = `finpay-${new Date().toISOString().split('T')[0]}.csv`;
  a.click(); URL.revokeObjectURL(url);
}

/* ═══════════════════════════════════════════
   22. PROFILE — PRESERVED
═══════════════════════════════════════════ */
function updateProfile() {
  const name = S.userName;
  const init = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'A';
  setText('avatarLetter', init[0]);
  setText('avatarName',   name.split(' ')[0]);
  setText('pcAvatar',     init[0]);
  const ni = $('profileNameInput');
  if (ni) ni.value = name;
  updateGreeting();
}

/* ═══════════════════════════════════════════
   23. FAB
═══════════════════════════════════════════ */
function toggleFab(force) {
  const open     = force !== undefined ? force : !S.fabOpen;
  S.fabOpen      = open;
  $('fabMain')?.classList.toggle('open', open);
  $('fabSub')?.classList.toggle('open', open);
  $('fabBackdrop')?.classList.toggle('show', open);
}

/* ═══════════════════════════════════════════
   24. CLOSE ALL PANELS
═══════════════════════════════════════════ */
function closeAll() {
  $('dotsMenu')?.classList.remove('open');
  $('dotsBtn')?.classList.remove('open');
  $('notifPanel')?.classList.remove('open');
  toggleFab(false);
}

/* ═══════════════════════════════════════════
   25. SEARCH
═══════════════════════════════════════════ */
function handleSearch(q) {
  S.searchQuery = q;
  const clear = $('searchClear');
  if (clear) clear.classList.toggle('show', q.length > 0);
  if (q.trim()) {
    goSearch();
    renderSearch(q);
    setText('searchResultLabel', TRANSLATIONS[S.lang].search_results + ': "' + q + '"');
  } else {
    goTo('dashboard');
  }
}

/* ═══════════════════════════════════════════
   26. WIRE ALL EVENTS
═══════════════════════════════════════════ */
function wire() {

  /* ── Bottom nav ── */
  document.querySelectorAll('.bn-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', () => goTo(btn.dataset.page));
  });

  /* ── FAB ── */
  $('fabMain')?.addEventListener('click', e => { e.stopPropagation(); toggleFab(); });
  $('fabIncome')?.addEventListener('click',  () => { toggleFab(false); openModal('income'); });
  $('fabExpense')?.addEventListener('click', () => { toggleFab(false); openModal('expense'); });
  $('fabBackdrop')?.addEventListener('click', () => toggleFab(false));

  /* ── Quick category grid ── */
  document.querySelectorAll('.qcat-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.type, btn.dataset.cat));
  });

  /* ── Avatar → Settings ── */
  $('avatarBtn')?.addEventListener('click', () => goTo('settings'));

  /* ── 3-dots button ── */
  $('dotsBtn')?.addEventListener('click', e => {
    e.stopPropagation();
    const open = $('dotsMenu').classList.toggle('open');
    $('dotsBtn').classList.toggle('open', open);
    if (open) $('notifPanel')?.classList.remove('open');
  });

  /* 3-dots items */
  $('themeCheck')?.addEventListener('change', e => applyTheme(e.target.checked ? 'dark' : 'light'));
  $('menuAddIncome')?.addEventListener('click',  () => { closeAll(); openModal('income'); });
  $('menuAddExpense')?.addEventListener('click', () => { closeAll(); openModal('expense'); });
  $('menuHistory')?.addEventListener('click',   () => { closeAll(); goTo('transactions'); });
  $('menuLang')?.addEventListener('click',      () => { toggleLang(); closeAll(); });

  /* ── Search ── */
  $('searchInput')?.addEventListener('input',   e => handleSearch(e.target.value));
  $('searchInput')?.addEventListener('keydown', e => { if (e.key === 'Escape') { $('searchInput').value = ''; handleSearch(''); } });
  $('searchClear')?.addEventListener('click',   () => { $('searchInput').value = ''; handleSearch(''); $('searchInput')?.focus(); });

  /* ── Bell ── */
  $('bellBtn')?.addEventListener('click', e => {
    e.stopPropagation();
    const open = $('notifPanel').classList.toggle('open');
    if (open) {
      $('dotsMenu')?.classList.remove('open');
      $('dotsBtn')?.classList.remove('open');
      /* Mark all read */
      S.notifications.forEach(n => n.read = true);
      saveNotifs();
      renderNotifPanel();
    }
  });
  $('npClear')?.addEventListener('click', () => { S.notifications = []; saveNotifs(); renderNotifPanel(); });

  /* ── Close on outside click ── */
  document.addEventListener('click', e => {
    if (!$('dotsShell')?.contains(e.target))  { $('dotsMenu')?.classList.remove('open'); $('dotsBtn')?.classList.remove('open'); }
    if (!$('bellShell')?.contains(e.target))   $('notifPanel')?.classList.remove('open');
  });

  /* ── Dashboard filter tabs ── */
  $('dashTabs')?.addEventListener('click', e => {
    const btn = e.target.closest('.ftab');
    if (!btn) return;
    document.querySelectorAll('#dashTabs .ftab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    S.dashFilter = btn.dataset.filter;
    renderDashFeed();
  });
  $('dashDate')?.addEventListener('change', e => { S.dashDate = e.target.value; renderDashFeed(); });

  /* ── Transactions filter tabs ── */
  $('txnTabs')?.addEventListener('click', e => {
    const btn = e.target.closest('.ftab');
    if (!btn) return;
    document.querySelectorAll('#txnTabs .ftab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    S.txnFilter = btn.dataset.filter;
    renderTxnFeed();
  });
  $('txnDate')?.addEventListener('change', e => { S.txnDate = e.target.value; renderTxnFeed(); });

  /* ── CSV buttons ── */
  $('csvBtnDash')?.addEventListener('click', exportCSV);
  $('csvBtnTxn')?.addEventListener('click',  exportCSV);

  /* ── Transaction modal ── */
  $('mcClose')?.addEventListener('click', closeModal);
  $('txnVeil')?.addEventListener('click', e => { if (e.target === $('txnVeil')) closeModal(); });
  $('txnVeil')?.addEventListener('keydown', e => { if (e.key === 'Enter') $('txnSubmit')?.click(); });
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
      inp.focus();
      setTimeout(() => inp.style.borderColor = '', 1400);
      return;
    }
    const catName = T[catKey] || catKey || (type === 'income' ? T.cat_other_income : T.cat_other_expense);
    addTxn(type, amount, catKey || 'cat_other_' + type, catName, desc, date);
    closeModal();
  });

  /* ── Confirm modal ── */
  $('cfmCancel')?.addEventListener('click', closeConfirm);
  $('cfmVeil')?.addEventListener('click', e => { if (e.target === $('cfmVeil')) closeConfirm(); });
  $('cfmOk')?.addEventListener('click', () => { S.confirmCb?.(); closeConfirm(); });

  /* ── Settings ── */
  $('themeToggle')?.addEventListener('change', e => applyTheme(e.target.checked ? 'dark' : 'light'));
  $('langBtn')?.addEventListener('click', toggleLang);
  $('notifToggle')?.addEventListener('change', e => { S.notifEnabled = e.target.checked; lsSet(LS.notifEnabled, S.notifEnabled); });
  $('profileNameInput')?.addEventListener('input', e => {
    S.userName = e.target.value || 'User';
    lsSet(LS.userName, S.userName);
    updateProfile();
  });
  $('clearBtn')?.addEventListener('click', () => {
    const T = TRANSLATIONS[S.lang];
    showConfirm(T.confirm_clear, T.confirm_clear_msg, () => { S.transactions = []; saveTxns(); renderAll(); });
  });
  $('logoutBtn')?.addEventListener('click', () => {
    showConfirm('Logout?', 'Your data is safely stored locally.', () => { localStorage.clear(); location.reload(); });
  });

  /* ── Chart period ── */
  $('chartPeriod')?.addEventListener('change', drawChart);

  /* ── Global keyboard shortcuts ── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); closeConfirm(); closeAll(); $('searchInput') && ($('searchInput').value = '') && handleSearch(''); }
  });

  /* ── Resize: redraw chart ── */
  let rt;
  window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(drawChart, 200); });
}

/* ═══════════════════════════════════════════
   27. INIT
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

  /* Seed demo data if empty */
  if (!S.transactions.length) {
    const td  = new Date().toISOString().split('T')[0];
    const yd  = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const d2  = new Date(Date.now() - 172800000).toISOString().split('T')[0];
    S.transactions = [
      { id:'1', type:'income',  amount:5200, categoryKey:'cat_salary',      category:'Salary',      description:'Monthly salary',  date:d2 },
      { id:'2', type:'expense', amount:120,  categoryKey:'cat_food',         category:'Food',         description:'Lunch & dinner',  date:d2 },
      { id:'3', type:'expense', amount:45,   categoryKey:'cat_transport',    category:'Transport',    description:'Grab rides',       date:yd },
      { id:'4', type:'income',  amount:850,  categoryKey:'cat_freelance',    category:'Freelance',    description:'Design project',   date:yd },
      { id:'5', type:'expense', amount:299,  categoryKey:'cat_shopping',     category:'Shopping',     description:'Online order',     date:td },
    ];
    saveTxns();
    renderAll();
  }

  console.log('%c FinPay Dashboard Ready ✓ ', 'background:#f0a500;color:#1a0f00;padding:4px 10px;border-radius:4px;font-weight:bold');
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
