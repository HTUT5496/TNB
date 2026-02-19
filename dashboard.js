/* ══════════════════════════════════════════════════════
   NOVAPAY – PREMIUM BANKING DASHBOARD
   dashboard.js  |  ES6 Vanilla JavaScript
   ─ Finance Logic  ─ Notifications  ─ i18n  ─ Themes
══════════════════════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════════════
   1. TRANSLATIONS (English / Burmese)
═══════════════════════════════════════════ */
const TRANSLATIONS = {
  en: {
    brand: 'NovaPay',
    nav_dashboard: 'Dashboard',
    nav_transactions: 'Transactions',
    nav_reports: 'Reports',
    nav_settings: 'Settings',
    premium_member: 'Premium Member',
    good_morning: 'Good Morning,',
    good_afternoon: 'Good Afternoon,',
    good_evening: 'Good Evening,',
    available_balance: 'Available Balance',
    income: 'Income',
    expense: 'Expense',
    add_income: 'Add Income',
    add_expense: 'Add Expense',
    reports: 'Reports',
    transfer: 'Transfer',
    spending_overview: 'Spending Overview',
    last_7: 'Last 7 Days',
    last_30: 'Last 30 Days',
    recent_transactions: 'Recent Transactions',
    see_all: 'See All',
    all_transactions: 'All Transactions',
    all: 'All',
    export_csv: 'Export CSV',
    total_income: 'Total Income',
    total_expense: 'Total Expense',
    net_balance: 'Net Balance',
    total_transactions: 'Total Transactions',
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
    add_first: 'Add your first transaction',
    cat_salary: 'Salary',
    cat_freelance: 'Freelance',
    cat_investment: 'Investment',
    cat_gift: 'Gift',
    cat_other_income: 'Other Income',
    cat_food: 'Food & Dining',
    cat_transport: 'Transport',
    cat_shopping: 'Shopping',
    cat_bills: 'Bills & Utilities',
    cat_health: 'Healthcare',
    cat_entertainment: 'Entertainment',
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
    available_balance: 'လက်ကျန်ငွေ',
    income: 'ဝင်ငွေ',
    expense: 'ထွက်ငွေ',
    add_income: 'ဝင်ငွေထည့်',
    add_expense: 'ထွက်ငွေထည့်',
    reports: 'အစီရင်ခံ',
    transfer: 'လွှဲပြောင်း',
    spending_overview: 'ငွေသုံးမှု အနှစ်ချုပ်',
    last_7: 'ၿပီးခဲ့သော ၇ ရက်',
    last_30: 'ၿပီးခဲ့သော ၃၀ ရက်',
    recent_transactions: 'မကြာမီ ငွေသွင်း/ထုတ်',
    see_all: 'အားလုံးကြည့်',
    all_transactions: 'ငွေသွင်း/ထုတ် အားလုံး',
    all: 'အားလုံး',
    export_csv: 'CSV ထုတ်ယူ',
    total_income: 'စုစုပေါင်း ဝင်ငွေ',
    total_expense: 'စုစုပေါင်း ထွက်ငွေ',
    net_balance: 'အသားတင် လက်ကျန်',
    total_transactions: 'စုစုပေါင်း ငွေလွှဲ',
    category_breakdown: 'အမျိုးအစားအလိုက် ခွဲခြမ်း',
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
    add_first: 'ပထမဆုံး ထည့်ပါ',
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
   2. CATEGORIES
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
    { key: 'cat_food',         icon: '🍜' },
    { key: 'cat_transport',    icon: '🚗' },
    { key: 'cat_shopping',     icon: '🛍️' },
    { key: 'cat_bills',        icon: '📄' },
    { key: 'cat_health',       icon: '💊' },
    { key: 'cat_entertainment',icon: '🎬' },
    { key: 'cat_education',    icon: '📚' },
    { key: 'cat_rent',         icon: '🏠' },
    { key: 'cat_other_expense',icon: '💸' },
  ]
};

/* ═══════════════════════════════════════════
   3. APP STATE
═══════════════════════════════════════════ */
const state = {
  transactions: [],
  notifications: [],
  lang: 'en',
  theme: 'dark',
  notifEnabled: true,
  userName: 'Alex Morgan',
  currentFilter: 'all',
  dateFilter: '',
  confirmCallback: null,
};

/* ═══════════════════════════════════════════
   4. LOCAL STORAGE HELPERS
═══════════════════════════════════════════ */
const LS_KEYS = {
  transactions: 'novapay_transactions',
  notifications: 'novapay_notifications',
  lang: 'novapay_lang',
  theme: 'novapay_theme',
  notifEnabled: 'novapay_notif',
  userName: 'novapay_username',
};

function saveToLS(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch(e) { /* quota */ }
}
function loadFromLS(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}
function loadState() {
  state.transactions  = loadFromLS(LS_KEYS.transactions, []);
  state.notifications = loadFromLS(LS_KEYS.notifications, []);
  state.lang          = loadFromLS(LS_KEYS.lang, 'en');
  state.theme         = loadFromLS(LS_KEYS.theme, 'dark');
  state.notifEnabled  = loadFromLS(LS_KEYS.notifEnabled, true);
  state.userName      = loadFromLS(LS_KEYS.userName, 'Alex Morgan');
}
function saveTransactions()  { saveToLS(LS_KEYS.transactions, state.transactions); }
function saveNotifications() { saveToLS(LS_KEYS.notifications, state.notifications); }

/* ═══════════════════════════════════════════
   5. FINANCE CALCULATIONS
═══════════════════════════════════════════ */
function calcTotals() {
  let income = 0, expense = 0;
  for (const t of state.transactions) {
    if (t.type === 'income') income += t.amount;
    else expense += t.amount;
  }
  return { income, expense, balance: income - expense };
}

function fmt(n) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2, maximumFractionDigits: 2
  }).format(n);
}

/* ═══════════════════════════════════════════
   6. UI UPDATES
═══════════════════════════════════════════ */
function updateBalanceCard() {
  const { income, expense, balance } = calcTotals();
  animateNumber('balanceDisplay', balance);
  document.getElementById('totalIncomeDisplay').textContent  = '$' + fmt(income);
  document.getElementById('totalExpenseDisplay').textContent = '$' + fmt(expense);
  // Reports section
  document.getElementById('reportIncome').textContent  = '$' + fmt(income);
  document.getElementById('reportExpense').textContent = '$' + fmt(expense);
  document.getElementById('reportBalance').textContent = '$' + fmt(balance);
  document.getElementById('reportCount').textContent   = state.transactions.length;
  const balEl = document.getElementById('reportBalance');
  balEl.style.color = balance >= 0 ? 'var(--income)' : 'var(--expense)';
}

// Animated number counter
function animateNumber(elId, target) {
  const el = document.getElementById(elId);
  if (!el) return;
  const start = parseFloat(el.textContent.replace(/,/g, '')) || 0;
  const diff = target - start;
  const duration = 700;
  let startTime = null;
  function step(ts) {
    if (!startTime) startTime = ts;
    const progress = Math.min((ts - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = fmt(start + diff * ease);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ─── TRANSACTION LIST RENDERER ─── */
function getCategoryMeta(type, categoryKey) {
  const list = CATEGORIES[type] || [];
  return list.find(c => c.key === categoryKey) || { icon: type === 'income' ? '💰' : '💸' };
}

function renderTransactionItem(txn, idx) {
  const meta = getCategoryMeta(txn.type, txn.categoryKey);
  const t = TRANSLATIONS[state.lang];
  const label = t[txn.categoryKey] || txn.category;
  const sign  = txn.type === 'income' ? '+' : '-';
  const dateStr = txn.date ? new Date(txn.date + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  }) : '';

  const div = document.createElement('div');
  div.className = 'txn-item';
  div.style.animationDelay = (idx * 0.04) + 's';
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
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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

function getFilteredTransactions() {
  return state.transactions.filter(t => {
    const matchType = state.currentFilter === 'all' || t.type === state.currentFilter;
    const matchDate = !state.dateFilter || t.date === state.dateFilter;
    return matchType && matchDate;
  });
}

function renderDashTransList() {
  const el = document.getElementById('dashTransList');
  const recent = [...state.transactions].reverse().slice(0, 5);
  el.innerHTML = '';
  if (recent.length === 0) {
    el.appendChild(emptyState());
    return;
  }
  recent.forEach((t, i) => el.appendChild(renderTransactionItem(t, i)));
}

function renderFullTransList() {
  const el = document.getElementById('fullTransList');
  const filtered = getFilteredTransactions().slice().reverse();
  el.innerHTML = '';
  if (filtered.length === 0) {
    el.appendChild(emptyState());
    return;
  }
  filtered.forEach((t, i) => el.appendChild(renderTransactionItem(t, i)));
}

function emptyState() {
  const div = document.createElement('div');
  div.className = 'empty-state';
  div.innerHTML = `
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
      <path d="M16 3H8v4h8V3z"/>
    </svg>
    <p>${TRANSLATIONS[state.lang].no_transactions}</p>
    <p style="font-size:0.75rem">${TRANSLATIONS[state.lang].add_first}</p>
  `;
  return div;
}

function renderAll() {
  updateBalanceCard();
  renderDashTransList();
  renderFullTransList();
  renderCategoryBreakdown();
  drawSpendingChart();
}

/* ─── CATEGORY BREAKDOWN ─── */
const CHART_COLORS = [
  '#4f8ef7','#22c55e','#f43f5e','#8b5cf6','#f59e0b',
  '#06b6d4','#ec4899','#10b981','#f97316','#6366f1'
];
function renderCategoryBreakdown() {
  const el = document.getElementById('categoryBreakdown');
  el.innerHTML = '';
  const t = TRANSLATIONS[state.lang];
  const map = {};
  for (const txn of state.transactions) {
    const label = t[txn.categoryKey] || txn.category;
    if (!map[label]) map[label] = { total: 0, type: txn.type };
    map[label].total += txn.amount;
  }
  const entries = Object.entries(map).sort((a, b) => b[1].total - a[1].total);
  if (entries.length === 0) {
    el.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;text-align:center;padding:20px">No data</p>';
    return;
  }
  const max = entries[0][1].total;
  entries.forEach(([name, data], i) => {
    const pct = (data.total / max) * 100;
    const color = data.type === 'income' ? 'var(--income)' : CHART_COLORS[i % CHART_COLORS.length];
    const row = document.createElement('div');
    row.className = 'cat-row';
    row.innerHTML = `
      <span class="cat-name">${name}</span>
      <div class="cat-bar-wrap"><div class="cat-bar" style="width:0%;background:${color}" data-w="${pct}"></div></div>
      <span class="cat-amount" style="color:${color}">$${fmt(data.total)}</span>
    `;
    el.appendChild(row);
    setTimeout(() => {
      row.querySelector('.cat-bar').style.width = pct + '%';
    }, 80 + i * 60);
  });
}

/* ─── MINI SPENDING CHART (pure canvas, no library) ─── */
function drawSpendingChart() {
  const canvas = document.getElementById('spendingCanvas');
  if (!canvas) return;
  const days = parseInt(document.getElementById('chartPeriod').value) || 7;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width  = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width  = rect.width + 'px';
  canvas.style.height = rect.height + 'px';
  ctx.scale(dpr, dpr);

  const W = rect.width, H = rect.height;
  const PAD = { top: 10, right: 10, bottom: 24, left: 42 };
  const now = new Date();

  // Build daily expense totals
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
  const maxV = Math.max(...values, 1);

  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top  - PAD.bottom;
  const step   = chartW / (labels.length - 1 || 1);

  const pts = labels.map((_, i) => ({
    x: PAD.left + i * step,
    y: PAD.top + chartH - (values[i] / maxV) * chartH
  }));

  // Gradient fill
  const grad = ctx.createLinearGradient(0, PAD.top, 0, PAD.top + chartH);
  grad.addColorStop(0, 'rgba(79,142,247,0.35)');
  grad.addColorStop(1, 'rgba(79,142,247,0.00)');

  ctx.clearRect(0, 0, W, H);

  // Draw filled area
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    const cp1x = (pts[i-1].x + pts[i].x) / 2;
    ctx.bezierCurveTo(cp1x, pts[i-1].y, cp1x, pts[i].y, pts[i].x, pts[i].y);
  }
  ctx.lineTo(pts[pts.length-1].x, PAD.top + chartH);
  ctx.lineTo(pts[0].x, PAD.top + chartH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Draw line
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) {
    const cp1x = (pts[i-1].x + pts[i].x) / 2;
    ctx.bezierCurveTo(cp1x, pts[i-1].y, cp1x, pts[i].y, pts[i].x, pts[i].y);
  }
  ctx.strokeStyle = '#4f8ef7';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Y-axis label
  ctx.fillStyle = getComputedStyle(document.documentElement)
    .getPropertyValue('--text-muted').trim() || '#4a5980';
  ctx.font = '10px Sora, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('$' + Math.round(maxV), PAD.left - 6, PAD.top + 8);

  // X-axis labels (first and last)
  ctx.textAlign = 'left';
  ctx.fillStyle = ctx.fillStyle;
  const fmtDate = d => {
    const obj = new Date(d + 'T00:00:00');
    return obj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  ctx.fillText(fmtDate(labels[0]), PAD.left, H - 4);
  ctx.textAlign = 'right';
  ctx.fillText(fmtDate(labels[labels.length-1]), W - PAD.right, H - 4);

  // Dots on points
  pts.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#4f8ef7';
    ctx.fill();
  });
}

/* ═══════════════════════════════════════════
   7. NOTIFICATIONS
═══════════════════════════════════════════ */
function addNotification(type, amount, newBalance) {
  if (!state.notifEnabled) return;
  const t = TRANSLATIONS[state.lang];
  const msg = type === 'income'
    ? `${t.notif_added_income} $${fmt(amount)}. ${t.notif_balance_now} $${fmt(newBalance)}`
    : `${t.notif_added_expense} $${fmt(amount)}. ${t.notif_balance_now} $${fmt(newBalance)}`;
  const notif = {
    id: Date.now().toString(),
    type,
    message: msg,
    time: new Date().toISOString(),
    read: false,
  };
  state.notifications.unshift(notif);
  if (state.notifications.length > 50) state.notifications.pop();
  saveNotifications();
  renderNotifications();
}

function renderNotifications() {
  const list  = document.getElementById('notifList');
  const badge = document.getElementById('notifBadge');
  list.innerHTML = '';

  const unread = state.notifications.filter(n => !n.read).length;
  if (unread > 0) {
    badge.style.display = 'grid';
    badge.textContent = unread > 9 ? '9+' : unread;
  } else {
    badge.style.display = 'none';
  }

  if (state.notifications.length === 0) {
    list.innerHTML = `<div class="notif-empty" data-i18n="no_notifs">${TRANSLATIONS[state.lang].no_notifs}</div>`;
    return;
  }

  state.notifications.forEach(n => {
    const item = document.createElement('div');
    item.className = 'notif-item';
    const relTime = getRelativeTime(new Date(n.time));
    item.innerHTML = `
      <div class="notif-item-dot ${n.type}"></div>
      <div>
        <div class="notif-item-text">${n.message}</div>
        <div class="notif-item-time">${relTime}</div>
      </div>
    `;
    list.appendChild(item);
  });
}

function getRelativeTime(date) {
  const secs = Math.floor((Date.now() - date) / 1000);
  if (secs < 60)   return 'Just now';
  if (secs < 3600) return Math.floor(secs / 60) + 'm ago';
  if (secs < 86400)return Math.floor(secs / 3600) + 'h ago';
  return Math.floor(secs / 86400) + 'd ago';
}

/* ═══════════════════════════════════════════
   8. TRANSACTION CRUD
═══════════════════════════════════════════ */
function addTransaction(type, amount, categoryKey, category, description, date) {
  const txn = {
    id: Date.now().toString(),
    type, amount, categoryKey, category, description, date
  };
  state.transactions.push(txn);
  saveTransactions();
  const { balance } = calcTotals();
  addNotification(type, amount, balance);
  renderAll();
}

function deleteTransaction(id) {
  state.transactions = state.transactions.filter(t => t.id !== id);
  saveTransactions();
  renderAll();
}

/* ═══════════════════════════════════════════
   9. MODAL MANAGEMENT
═══════════════════════════════════════════ */
function openTxnModal(type) {
  const modal = document.getElementById('txnModal');
  const box   = document.getElementById('txnModalBox');
  const t     = TRANSLATIONS[state.lang];
  document.getElementById('txnType').value = type;
  document.getElementById('modalTitle').textContent =
    type === 'income' ? t.modal_income_title : t.modal_expense_title;
  box.className = `modal-box modal-${type}`;

  // Populate categories
  const sel = document.getElementById('txnCategory');
  sel.innerHTML = `<option value="">${t.category}</option>`;
  CATEGORIES[type].forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.key;
    opt.textContent = cat.icon + ' ' + (t[cat.key] || cat.key);
    sel.appendChild(opt);
  });

  // Set today's date
  document.getElementById('txnDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('txnAmount').value = '';
  document.getElementById('txnDesc').value = '';
  document.getElementById('txnSubmit').textContent = t.add_transaction;

  modal.classList.add('open');
  setTimeout(() => document.getElementById('txnAmount').focus(), 200);
}

function closeTxnModal() {
  document.getElementById('txnModal').classList.remove('open');
}

function showConfirm(title, msg, callback) {
  document.getElementById('confirmTitle').textContent = title;
  document.getElementById('confirmMsg').textContent   = msg;
  state.confirmCallback = callback;
  document.getElementById('confirmModal').classList.add('open');
}

function closeConfirm() {
  document.getElementById('confirmModal').classList.remove('open');
  state.confirmCallback = null;
}

/* ═══════════════════════════════════════════
   10. NAVIGATION
═══════════════════════════════════════════ */
function navigateTo(section) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('section-' + section)?.classList.add('active');
  document.querySelector(`.nav-item[data-section="${section}"]`)?.classList.add('active');
  if (section === 'reports') { renderCategoryBreakdown(); }
  closeSidebar();
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}

/* ═══════════════════════════════════════════
   11. THEME
═══════════════════════════════════════════ */
function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.dataset.theme = theme;
  document.getElementById('themeCheckbox').checked = theme === 'dark';
  saveToLS(LS_KEYS.theme, theme);
  setTimeout(drawSpendingChart, 50);
}

/* ═══════════════════════════════════════════
   12. LANGUAGE / i18n
═══════════════════════════════════════════ */
function applyLanguage(lang) {
  state.lang = lang;
  const t = TRANSLATIONS[lang];
  saveToLS(LS_KEYS.lang, lang);
  document.getElementById('langLabel').textContent = lang === 'en' ? 'EN' : 'MM';
  document.getElementById('langBtnLabel').textContent = lang === 'en' ? 'English' : 'မြန်မာ';

  // Translate all [data-i18n] elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) el.textContent = t[key];
  });

  // Update greeting
  updateGreeting();
  // Re-render lists (category names change)
  renderAll();
  renderNotifications();
}

function toggleLanguage() {
  applyLanguage(state.lang === 'en' ? 'my' : 'en');
}

/* ═══════════════════════════════════════════
   13. GREETING & DATE
═══════════════════════════════════════════ */
function updateGreeting() {
  const hour = new Date().getHours();
  const t = TRANSLATIONS[state.lang];
  let greeting;
  if (hour < 12) greeting = t.good_morning;
  else if (hour < 17) greeting = t.good_afternoon;
  else greeting = t.good_evening;
  document.getElementById('greetingText').textContent = greeting;
  const name = state.userName.split(' ')[0];
  document.getElementById('greetingName').textContent = name + ' 👋';
}

function updateDateBadge() {
  const now = new Date();
  document.getElementById('dateBadge').textContent = now.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

/* ═══════════════════════════════════════════
   14. EXPORT CSV
═══════════════════════════════════════════ */
function exportCSV() {
  const t = TRANSLATIONS[state.lang];
  const header = ['Date', 'Type', 'Category', 'Description', 'Amount'].join(',');
  const rows = getFilteredTransactions().map(txn => [
    txn.date,
    txn.type,
    (t[txn.categoryKey] || txn.category).replace(/,/g, ';'),
    (txn.description || '').replace(/,/g, ';'),
    txn.amount.toFixed(2)
  ].join(','));
  const csv = [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = `novapay-transactions-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ═══════════════════════════════════════════
   15. PROFILE
═══════════════════════════════════════════ */
function updateProfileUI() {
  const name = state.userName;
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  document.getElementById('sidebarAvatar').textContent  = initials[0] || 'A';
  document.getElementById('sidebarName').textContent    = name;
  document.getElementById('profileAvatarLarge').textContent = initials[0] || 'A';
  document.getElementById('profileNameInput').value     = name;
  updateGreeting();
}

/* ═══════════════════════════════════════════
   16. EVENT WIRING
═══════════════════════════════════════════ */
function wireEvents() {
  // Sidebar navigation
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      navigateTo(item.dataset.section);
    });
  });

  // Hamburger
  document.getElementById('hamburgerBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebarOverlay').classList.toggle('open');
  });
  document.getElementById('sidebarOverlay').addEventListener('click', closeSidebar);

  // Quick actions
  document.getElementById('addIncomeBtn').addEventListener('click',  () => openTxnModal('income'));
  document.getElementById('addExpenseBtn').addEventListener('click', () => openTxnModal('expense'));
  document.getElementById('reportsNavBtn').addEventListener('click', () => navigateTo('reports'));
  document.getElementById('seeAllBtn').addEventListener('click',     () => navigateTo('transactions'));

  // Modal
  document.getElementById('modalClose').addEventListener('click', closeTxnModal);
  document.getElementById('txnModal').addEventListener('click', e => {
    if (e.target === document.getElementById('txnModal')) closeTxnModal();
  });

  document.getElementById('txnSubmit').addEventListener('click', () => {
    const type   = document.getElementById('txnType').value;
    const amount = parseFloat(document.getElementById('txnAmount').value);
    const catKey = document.getElementById('txnCategory').value;
    const desc   = document.getElementById('txnDesc').value.trim();
    const date   = document.getElementById('txnDate').value;
    const t      = TRANSLATIONS[state.lang];

    if (!amount || amount <= 0) {
      document.getElementById('txnAmount').focus();
      document.getElementById('txnAmount').style.borderColor = 'var(--expense)';
      setTimeout(() => document.getElementById('txnAmount').style.borderColor = '', 1400);
      return;
    }
    const catObj = CATEGORIES[type]?.find(c => c.key === catKey) || {};
    const catName = t[catKey] || catKey || (type === 'income' ? t.cat_other_income : t.cat_other_expense);

    addTransaction(type, amount, catKey || `cat_other_${type}`, catName, desc, date);
    closeTxnModal();
  });

  // Allow Enter key to submit modal
  document.getElementById('txnModal').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('txnSubmit').click();
  });

  // Confirm modal
  document.getElementById('confirmCancel').addEventListener('click', closeConfirm);
  document.getElementById('confirmModal').addEventListener('click', e => {
    if (e.target === document.getElementById('confirmModal')) closeConfirm();
  });
  document.getElementById('confirmOk').addEventListener('click', () => {
    if (state.confirmCallback) state.confirmCallback();
    closeConfirm();
  });

  // Filter tabs
  document.getElementById('filterTabs').addEventListener('click', e => {
    const btn = e.target.closest('.filter-tab');
    if (!btn) return;
    document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.currentFilter = btn.dataset.filter;
    renderFullTransList();
  });

  // Date filter
  document.getElementById('dateFilter').addEventListener('change', e => {
    state.dateFilter = e.target.value;
    renderFullTransList();
  });

  // Export CSV
  document.getElementById('exportCsvBtn').addEventListener('click', exportCSV);

  // Theme toggle (topbar)
  document.getElementById('themeToggle').addEventListener('click', () => {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  });

  // Theme toggle (settings checkbox)
  document.getElementById('themeCheckbox').addEventListener('change', e => {
    applyTheme(e.target.checked ? 'dark' : 'light');
  });

  // Language toggle
  document.getElementById('langToggle').addEventListener('click', toggleLanguage);
  document.getElementById('langBtnSettings').addEventListener('click', toggleLanguage);

  // Notifications toggle
  document.getElementById('notifBtn').addEventListener('click', e => {
    e.stopPropagation();
    const dd = document.getElementById('notifDropdown');
    dd.classList.toggle('open');
    // Mark all as read
    state.notifications.forEach(n => n.read = true);
    saveNotifications();
    renderNotifications();
  });
  document.addEventListener('click', e => {
    if (!document.getElementById('notifWrap').contains(e.target)) {
      document.getElementById('notifDropdown').classList.remove('open');
    }
  });
  document.getElementById('notifClear').addEventListener('click', () => {
    state.notifications = [];
    saveNotifications();
    renderNotifications();
  });

  // Notification enabled toggle
  document.getElementById('notifToggle').addEventListener('change', e => {
    state.notifEnabled = e.target.checked;
    saveToLS(LS_KEYS.notifEnabled, state.notifEnabled);
  });

  // Profile name input
  document.getElementById('profileNameInput').addEventListener('input', e => {
    state.userName = e.target.value || 'User';
    saveToLS(LS_KEYS.userName, state.userName);
    updateProfileUI();
  });

  // Clear data
  document.getElementById('clearDataBtn').addEventListener('click', () => {
    showConfirm(
      TRANSLATIONS[state.lang].confirm_clear,
      TRANSLATIONS[state.lang].confirm_clear_msg,
      () => {
        state.transactions = [];
        saveTransactions();
        renderAll();
      }
    );
  });

  // Logout
  document.getElementById('logoutBtn').addEventListener('click', () => {
    showConfirm('Logout?', 'Your data is safely stored. You can return anytime.', () => {
      localStorage.clear();
      location.reload();
    });
  });

  // Chart period
  document.getElementById('chartPeriod').addEventListener('change', drawSpendingChart);

  // Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeTxnModal();
      closeConfirm();
      document.getElementById('notifDropdown').classList.remove('open');
    }
  });

  // Resize: redraw chart
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawSpendingChart, 200);
  });
}

/* ═══════════════════════════════════════════
   17. INIT
═══════════════════════════════════════════ */
function init() {
  loadState();
  applyTheme(state.theme);
  applyLanguage(state.lang);
  updateDateBadge();
  updateProfileUI();
  document.getElementById('notifToggle').checked = state.notifEnabled;
  wireEvents();
  renderAll();
  renderNotifications();

  // Seed demo data if empty
  if (state.transactions.length === 0) {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const twoDaysAgo = new Date(Date.now() - 172800000).toISOString().split('T')[0];
    // Add silently without notifications
    state.transactions = [
      { id: '1', type:'income',  amount:5200,  categoryKey:'cat_salary',       category:'Salary',       description:'Monthly salary',     date: twoDaysAgo },
      { id: '2', type:'expense', amount:120,   categoryKey:'cat_food',          category:'Food',         description:'Lunch & dinner',      date: twoDaysAgo },
      { id: '3', type:'expense', amount:45,    categoryKey:'cat_transport',     category:'Transport',    description:'Grab rides',          date: yesterday },
      { id: '4', type:'income',  amount:850,   categoryKey:'cat_freelance',     category:'Freelance',    description:'Design project',      date: yesterday },
      { id: '5', type:'expense', amount:299,   categoryKey:'cat_shopping',      category:'Shopping',     description:'Online order',        date: today },
    ];
    saveTransactions();
    renderAll();
  }

  console.log('%c NovaPay Dashboard Ready ✓ ', 'background:#4f8ef7;color:#fff;padding:4px 10px;border-radius:4px;font-weight:bold;');
}

// Bootstrap
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
