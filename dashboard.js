const { createClient } = supabase;
const _supabase = createClient(
  "https://lqfjeamzbxayfbjntarr.supabase.co",
  "sb_publishable_jDExXkASC_jrulY8B7noFw_r9qut-vQ",
);

("use strict");

/* ═══════════════════════════════════════════
   1. TRANSLATIONS (PRESERVED — unchanged)
═══════════════════════════════════════════ */
const TRANSLATIONS = {
  en: {
    brand: "FinPay",
    nav_dashboard: "Home",
    nav_transactions: "History",
    nav_reports: "Reports",
    nav_settings: "Settings",
    premium_member: "Premium Member",
    good_morning: "Good morning,",
    good_afternoon: "Good afternoon,",
    good_evening: "Good evening,",
    available_balance: "Balance",
    income: "Income",
    expense: "Expense",
    add_income: "Add Income",
    add_expense: "Add Expense",
    reports: "Reports",
    spending_overview: "Spending Overview",
    last_7: "Last 7 Days",
    last_30: "Last 30 Days",
    recent_transactions: "Recent Activity",
    all_transactions: "All Transactions",
    all: "All",
    export_csv: "Export CSV",
    total_income: "Total Income",
    total_expense: "Total Expense",
    net_balance: "Net Balance",
    total_transactions: "Transactions",
    category_breakdown: "Category Breakdown",
    settings: "Settings",
    dark_mode: "Dark Mode",
    dark_mode_sub: "Switch between dark and light",
    language: "Language",
    language_sub: "English / Burmese",
    notifications_setting: "Notifications",
    notifications_sub: "Balance change alerts",
    clear_data: "Clear All Data",
    clear_data_sub: "Remove all transactions",
    clear: "Clear",
    logout: "Logout",
    notifications: "Notifications",
    clear_all: "Clear All",
    no_notifs: "No notifications yet",
    amount: "Amount ($)",
    category: "Category",
    description: "Description",
    date: "Date",
    add_transaction: "Add Transaction",
    cancel: "Cancel",
    confirm: "Confirm",
    modal_income_title: "Add Income",
    modal_expense_title: "Add Expense",
    notif_balance_now: "Your balance is now",
    notif_added_income: "↑ Income Added",
    notif_added_expense: "↓ Expense Added",
    confirm_delete: "Delete this transaction?",
    confirm_delete_msg: "This action cannot be undone.",
    confirm_clear: "Clear all data?",
    confirm_clear_msg: "All transactions will be permanently removed.",
    no_transactions: "No transactions yet",
    add_first: "Tap + to add your first entry",
    search_results: "Search Results",
    quick_actions: "Quick Actions",
    tap_to_add: "Tap to add transaction",
    usage_summary: "Usage Summary",
    qa_total_added: "Total Added",
    qa_total_used: "Total Used",
    filter_type: "Type",
    start_date: "From",
    end_date: "To",
    apply_filter: "Apply Filter",
    reset_filter: "Reset",
    err_date_range: "Start date must be before end date.",
    err_date_required: "Please select both start and end dates.",
    filter_active: "Filter active",
    change_password: "Change Password",
    change_password_sub: "Update your account password",
    change: "Change",
    social_account: "Social Account",
    provider_label: "Provider:",
    cat_salary: "Salary",
    cat_freelance: "Freelance",
    cat_investment: "Invest",
    cat_gift: "Gift",
    cat_other_income: "Other Income",
    cat_food: "Food",
    cat_transport: "Transport",
    cat_shopping: "Shopping",
    cat_bills: "Bills",
    cat_health: "Health",
    cat_entertainment: "Entertain",
    cat_education: "Education",
    cat_rent: "Rent",
    cat_other_expense: "Other",
  },
  my: {
    brand: "FinPay",
    nav_dashboard: "ဒက်ရ်ဘုတ်",
    nav_transactions: "မှတ်တမ်း",
    nav_reports: "အစီရင်ခံ",
    nav_settings: "ဆက်တင်",
    premium_member: "ပရီမီယံ အဖွဲ့ဝင်",
    good_morning: "မင်္ဂလာနံနက်ခင်းပါ၊",
    good_afternoon: "မင်္ဂလာနေ့လည်ပါ၊",
    good_evening: "မင်္ဂလာညနေပါ၊",
    available_balance: "လက်ကျန်",
    income: "ဝင်ငွေ",
    expense: "ထွက်ငွေ",
    add_income: "ဝင်ငွေထည့်",
    add_expense: "ထွက်ငွေထည့်",
    reports: "အစီရင်ခံ",
    spending_overview: "ငွေသုံးမှု အနှစ်ချုပ်",
    last_7: "ၿပီးခဲ့သော ၇ ရက်",
    last_30: "ၿပီးခဲ့သော ၃၀ ရက်",
    recent_transactions: "မကြာမီ လုပ်ဆောင်ချက်",
    all_transactions: "ငွေသွင်း/ထုတ် အားလုံး",
    all: "အားလုံး",
    export_csv: "CSV ထုတ်ယူ",
    total_income: "စုစုပေါင်း ဝင်ငွေ",
    total_expense: "စုစုပေါင်း ထွက်ငွေ",
    net_balance: "အသားတင် လက်ကျန်",
    total_transactions: "ငွေလွှဲ စုစုပေါင်း",
    category_breakdown: "အမျိုးအစားအလိုက်",
    settings: "ဆက်တင်",
    dark_mode: "အမဲရောင် မုဒ်",
    dark_mode_sub: "အမဲ / အဖြူ ပြောင်းလဲ",
    language: "ဘာသာစကား",
    language_sub: "အင်္ဂလိပ် / မြန်မာ",
    notifications_setting: "အကြောင်းကြားချက်",
    notifications_sub: "လက်ကျန်ငွေ သတိပေး",
    clear_data: "ဒေတာ အားလုံး ရှင်းလင်း",
    clear_data_sub: "ငွေသွင်း/ထုတ် အားလုံး ဖျက်မည်",
    clear: "ရှင်းလင်း",
    logout: "ထွက်မည်",
    notifications: "အကြောင်းကြားချက်",
    clear_all: "အားလုံး ရှင်းလင်း",
    no_notifs: "အကြောင်းကြားချက် မရှိသေးပါ",
    amount: "ငွေပမာဏ ($)",
    category: "အမျိုးအစား",
    description: "ဖော်ပြချက်",
    date: "ရက်စွဲ",
    add_transaction: "ငွေသွင်း/ထုတ် ထည့်",
    cancel: "မလုပ်တော့",
    confirm: "အတည်ပြု",
    modal_income_title: "ဝင်ငွေ ထည့်သည်",
    modal_expense_title: "ထွက်ငွေ ထည့်သည်",
    notif_balance_now: "သင့်လက်ကျန်ငွေ",
    notif_added_income: "↑ ဝင်ငွေ ထည့်ပြီး",
    notif_added_expense: "↓ ထွက်ငွေ ထည့်ပြီး",
    confirm_delete: "ဤငွေလွှဲကို ဖျက်မလား?",
    confirm_delete_msg: "ဤလုပ်ဆောင်ချက်ကို ပြန်မလုပ်နိုင်ပါ။",
    confirm_clear: "ဒေတာ အားလုံး ရှင်းမလား?",
    confirm_clear_msg: "ငွေသွင်း/ထုတ် အားလုံး ပြည်တမ်း ဖျက်မည်။",
    no_transactions: "ငွေသွင်း/ထုတ် မရှိသေးပါ",
    add_first: "+ ကိုနှိပ်၍ ထည့်ပါ",
    search_results: "ရှာဖွေမှု ရလဒ်",
    quick_actions: "မြန်ဆန်သော လုပ်ဆောင်ချက်",
    tap_to_add: "ငွေသွင်း/ထုတ် ထည့်ရန် နှိပ်ပါ",
    usage_summary: "အသုံးပြုမှု အနှစ်ချုပ်",
    qa_total_added: "စုစုပေါင်း ထည့်သည်",
    qa_total_used: "စုစုပေါင်း သုံးသည်",
    filter_type: "အမျိုးအစား",
    start_date: "စတင်ရက်",
    end_date: "ပြီးဆုံးရက်",
    apply_filter: "စစ်ထုတ်မည်",
    reset_filter: "ပြန်သတ်မှတ်",
    err_date_range: "စတင်ရက်သည် ပြီးဆုံးရက်မတိုင်မီ ဖြစ်ရမည်။",
    err_date_required: "ရက်စွဲ နှစ်ခု ရွေးပါ။",
    filter_active: "စစ်ထုတ်မှု ဖွင့်ထားသည်",
    change_password: "စကားဝှက် ပြောင်းရန်",
    change_password_sub: "အကောင့် စကားဝှက် ပြောင်းမည်",
    change: "ပြောင်းမည်",
    social_account: "ဆိုရှယ် အကောင့်",
    provider_label: "ဝန်ဆောင်မှု:",
    cat_salary: "လစာ",
    cat_freelance: "ဖရီးလန်စ်",
    cat_investment: "ရင်းနှီး",
    cat_gift: "လက်ဆောင်",
    cat_other_income: "အခြား ဝင်ငွေ",
    cat_food: "အစားအသောက်",
    cat_transport: "သယ်ယူ",
    cat_shopping: "ဈေးဝယ်",
    cat_bills: "ဘီလ်",
    cat_health: "ကျန်းမာ",
    cat_entertainment: "အပျော်",
    cat_education: "ပညာ",
    cat_rent: "အငှားခ",
    cat_other_expense: "အခြား",
  },
};

/* ═══════════════════════════════════════════
   2. CATEGORIES (PRESERVED — unchanged)
═══════════════════════════════════════════ */
const CATEGORIES = {
  income: [
    { key: "cat_salary",       icon: "💼" },
    { key: "cat_freelance",    icon: "💻" },
    { key: "cat_investment",   icon: "📈" },
    { key: "cat_gift",         icon: "🎁" },
    { key: "cat_other_income", icon: "💰" },
  ],
  expense: [
    { key: "cat_food",          icon: "🍜" },
    { key: "cat_transport",     icon: "🚗" },
    { key: "cat_shopping",      icon: "🛍️" },
    { key: "cat_bills",         icon: "📄" },
    { key: "cat_health",        icon: "💊" },
    { key: "cat_entertainment", icon: "🎬" },
    { key: "cat_education",     icon: "📚" },
    { key: "cat_rent",          icon: "🏠" },
    { key: "cat_other_expense", icon: "💸" },
  ],
};

const QUICK_ACTIONS = [
  { key: "cat_salary",    type: "income",  icon: "💼" },
  { key: "cat_freelance", type: "income",  icon: "💻" },
  { key: "cat_investment",type: "income",  icon: "📈" },
  { key: "cat_food",      type: "expense", icon: "🍜" },
  { key: "cat_transport", type: "expense", icon: "🚗" },
  { key: "cat_shopping",  type: "expense", icon: "🛍️" },
  { key: "cat_bills",     type: "expense", icon: "📄" },
  { key: "cat_health",    type: "expense", icon: "💊" },
];

/* ═══════════════════════════════════════════
   3. APP STATE (PRESERVED — unchanged)
═══════════════════════════════════════════ */
const S = {
  transactions: [],
  notifications: [],
  lang: "en",
  theme: "dark",
  notifEnabled: true,
  userName: "Alex Morgan",
  userAvatar: "",
  userEmail: "",
  userProvider: "",
  isSocialLogin: false,
  dashFilter: "all",
  txnFilter: "all",
  txnDateFrom: "",
  txnDateTo: "",
  txnFilterActive: false,
  searchQuery: "",
  fabOpen: false,
  confirmCb: null,
};

/* ═══════════════════════════════════════════
   4. LOCAL STORAGE (PRESERVED — unchanged)
═══════════════════════════════════════════ */
const LS = {
  transactions: "novapay_transactions",
  notifications: "novapay_notifications",
  lang:          "novapay_lang",
  theme:         "novapay_theme",
  notifEnabled:  "novapay_notif",
  userName:      "novapay_username",
  userAvatar:    "novapay_avatar",
  userEmail:     "novapay_email",
  userProvider:  "novapay_provider",
  isSocialLogin: "novapay_social",
};

const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const lsGet = (k, fb) => {
  try { const v = localStorage.getItem(k); return v !== null ? JSON.parse(v) : fb; }
  catch { return fb; }
};

function loadState() {
  S.transactions  = lsGet(LS.transactions, []);
  S.notifications = lsGet(LS.notifications, []);
  S.lang          = lsGet(LS.lang, "en");
  S.theme         = lsGet(LS.theme, "dark");
  S.notifEnabled  = lsGet(LS.notifEnabled, true);
  S.userName      = lsGet(LS.userName, "Alex Morgan");
  S.userAvatar    = lsGet(LS.userAvatar, "");
  S.userEmail     = lsGet(LS.userEmail, "");
  S.userProvider  = lsGet(LS.userProvider, "");
  S.isSocialLogin = lsGet(LS.isSocialLogin, false);
}

const saveTxns   = () => lsSet(LS.transactions, S.transactions);
const saveNotifs = () => lsSet(LS.notifications, S.notifications);

/* ═══════════════════════════════════════════
   5. FINANCE CALCULATIONS (PRESERVED)
═══════════════════════════════════════════ */
function calcTotals() {
  let inc = 0, exp = 0;
  for (const t of S.transactions) {
    t.type === "income" ? (inc += t.amount) : (exp += t.amount);
  }
  return { inc, exp, bal: inc - exp };
}

function groupByCategory() {
  const map = new Map();
  for (const t of S.transactions) {
    const existing = map.get(t.categoryKey);
    if (existing) { existing.total += t.amount; }
    else {
      const meta = getCatMeta(t.type, t.categoryKey);
      map.set(t.categoryKey, { total: t.amount, type: t.type, icon: meta.icon });
    }
  }
  return map;
}

const fmt = (n) =>
  new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

/* ═══════════════════════════════════════════
   6. DOM HELPERS
═══════════════════════════════════════════ */
const $       = (id) => document.getElementById(id);
const setText = (id, v) => { const e = $(id); if (e) e.textContent = v; };

/* ── Visibility helpers replacing element.style.display ── */
const show = (el) => { if (el) el.classList.remove("is-hidden"); };
const hide = (el) => { if (el) el.classList.add("is-hidden"); };
const showFlex = (el) => { if (el) { el.classList.remove("is-hidden"); el.classList.add("is-flex"); } };
const hideFlex = (el) => { if (el) { el.classList.add("is-hidden"); el.classList.remove("is-flex"); } };

/* ═══════════════════════════════════════════
   7. ANIMATED COUNTER (PRESERVED)
═══════════════════════════════════════════ */
function animCount(elId, target) {
  const el = $(elId); if (!el) return;
  const from = parseFloat(el.textContent.replace(/,/g, "")) || 0;
  const diff = target - from, dur = 660; let t0 = null;
  const step = (ts) => {
    if (!t0) t0 = ts;
    const p = Math.min((ts - t0) / dur, 1);
    el.textContent = fmt(from + diff * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ═══════════════════════════════════════════
   8. UPDATE TOTALS
═══════════════════════════════════════════ */
function updateTotals() {
  const { inc, exp, bal } = calcTotals();
  animCount("balanceDisplay", bal);
  setText("totalIncomeDisplay",  "$" + fmt(inc));
  setText("totalExpenseDisplay", "$" + fmt(exp));
  setText("r2Balance", "$" + fmt(bal));
  setText("r2Income",  "$" + fmt(inc));
  setText("r2Expense", "$" + fmt(exp));
  setText("repIncome",  "$" + fmt(inc));
  setText("repExpense", "$" + fmt(exp));
  setText("repBalance", "$" + fmt(bal));
  setText("repCount", S.transactions.length);
  // Net balance color — use CSS class instead of inline style
  const rb = $("repBalance");
  if (rb) {
    rb.classList.remove("income-col", "expense-col");
    rb.classList.add(bal >= 0 ? "income-col" : "expense-col");
  }
}

/* ═══════════════════════════════════════════
   9. TRANSACTION CARD BUILDER (PRESERVED)
═══════════════════════════════════════════ */
function getCatMeta(type, key) {
  return (CATEGORIES[type] || []).find((c) => c.key === key) || { icon: type === "income" ? "💰" : "💸" };
}

function makeTxnCard(txn, idx) {
  const T    = TRANSLATIONS[S.lang];
  const meta = getCatMeta(txn.type, txn.categoryKey);
  const lbl  = T[txn.categoryKey] || txn.category;
  const sign = txn.type === "income" ? "+" : "-";
  const ds   = txn.date
    ? new Date(txn.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "";
  const div = document.createElement("div");
  div.className = "txn-card";
  div.dataset.type = txn.type;
  div.style.animationDelay = Math.min(idx * 0.04, 0.5) + "s";
  div.innerHTML = `
    <div class="txn-ico ${txn.type}">${meta.icon}</div>
    <div class="txn-info">
      <div class="txn-cat">${lbl}</div>
      <div class="txn-desc">${txn.description || ""}</div>
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
  div.querySelector(".txn-del").addEventListener("click", (e) => {
    e.stopPropagation();
    const T2 = TRANSLATIONS[S.lang];
    showConfirm(T2.confirm_delete, T2.confirm_delete_msg, () => deleteTxn(e.currentTarget.dataset.id));
  });
  return div;
}

function emptyEl() {
  const T   = TRANSLATIONS[S.lang];
  const div = document.createElement("div");
  div.className = "empty-state";
  div.innerHTML = `
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
      <path d="M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
      <path d="M16 3H8v4h8V3z"/>
    </svg>
    <p>${T.no_transactions}</p>
    <p class="empty-state-hint">${T.add_first}</p>`;
  return div;
}

/* ═══════════════════════════════════════════
   10. FEEDS & SEARCH (PRESERVED)
═══════════════════════════════════════════ */
function renderTxnFeed() {
  const el = $("txnFeed"); if (!el) return;
  let list = [...S.transactions].reverse().filter((t) => {
    const typeOk = S.txnFilter === "all" || t.type === S.txnFilter;
    let dateOk = true;
    if (S.txnFilterActive) {
      if (S.txnDateFrom) dateOk = dateOk && t.date >= S.txnDateFrom;
      if (S.txnDateTo)   dateOk = dateOk && t.date <= S.txnDateTo;
    }
    return typeOk && dateOk;
  });
  el.innerHTML = "";
  if (!list.length) { el.appendChild(emptyEl()); return; }
  list.forEach((t, i) => { const c = makeTxnCard(t, i); c.style.animationDelay = `${i * 0.03}s`; el.appendChild(c); });
}

function renderSearch(q) {
  const el = $("searchFeed"); if (!el) return;
  const T = TRANSLATIONS[S.lang], low = q.toLowerCase().trim();
  if (!low) { el.innerHTML = ""; return; }
  const hits = [...S.transactions].reverse().filter((t) => {
    const label = (T[t.categoryKey] || t.category || "").toLowerCase();
    return label.includes(low) || (t.description || "").toLowerCase().includes(low) || t.amount.toString().includes(low);
  });
  el.innerHTML = "";
  if (!hits.length) { el.appendChild(emptyEl()); return; }
  hits.forEach((t, i) => el.appendChild(makeTxnCard(t, i)));
}

function renderUsageSummary(catTotals) {
  const el = $("usageSummary"); if (!el) return;
  const T = TRANSLATIONS[S.lang];
  el.innerHTML = "";
  if (!catTotals || catTotals.size === 0) {
    const empty = document.createElement("div");
    // Use CSS class instead of cssText
    empty.className = "empty-state empty-state--bare";
    empty.innerHTML = `<p>${T.no_transactions}</p>`;
    el.appendChild(empty); return;
  }
  const entries = [...catTotals.entries()].sort((a, b) => b[1].total - a[1].total).slice(0, 8);
  const maxTotal = entries[0][1].total;
  entries.forEach(([key, data], i) => {
    const label = T[key] || key;
    const pct   = (data.total / maxTotal) * 100;
    const color = data.type === "income" ? "var(--inc)" : "var(--exp)";
    const row   = document.createElement("div");
    row.className = "usage-row";
    row.style.animation = `slideIn 0.4s ease forwards ${i * 0.05}s`;
    row.style.opacity = "0";
    row.innerHTML = `
      <div class="usage-ico ${data.type}">${data.icon || "💰"}</div>
      <div class="usage-info">
        <div class="usage-cat">${label}</div>
        <span class="usage-type-badge ${data.type}">${data.type === "income" ? (T.qa_total_added || "Income") : (T.qa_total_used || "Expense")}</span>
      </div>
      <div class="usage-bar-wrap">
        <div class="usage-bar" style="width:0%;background:${color};transition:width 0.8s cubic-bezier(0.17,0.55,0.55,1);"></div>
      </div>
      <div class="usage-amount ${data.type}">${fmt(data.total)}</div>`;
    el.appendChild(row);
    requestAnimationFrame(() => setTimeout(() => {
      const bar = row.querySelector(".usage-bar");
      if (bar) { bar.style.width = `${pct}%`; row.style.opacity = "1"; }
    }, 100 + i * 50));
  });
}

/* ═══════════════════════════════════════════
   12. CATEGORY BREAKDOWN (PRESERVED)
═══════════════════════════════════════════ */
const CAT_COLORS = ["#f5a623","#00e896","#ff3d71","#a78bfa","#38bdf8","#34d399","#f97316","#e879f9","#60a5fa","#fb923c"];

function renderCatBreakdown() {
  const el = $("catBreakdown"); if (!el) return;
  el.innerHTML = "";
  const T = TRANSLATIONS[S.lang], map = {};
  for (const txn of S.transactions) {
    const lbl = T[txn.categoryKey] || txn.category;
    if (!map[lbl]) map[lbl] = { total: 0, type: txn.type };
    map[lbl].total += txn.amount;
  }
  const entries = Object.entries(map).sort((a, b) => b[1].total - a[1].total);
  if (!entries.length) { el.innerHTML = '<p class="cat-empty-msg">No data yet</p>'; return; }
  const maxV = entries[0][1].total;
  entries.forEach(([name, data], i) => {
    const pct   = (data.total / maxV) * 100;
    const color = data.type === "income" ? "var(--inc)" : CAT_COLORS[i % CAT_COLORS.length];
    const row   = document.createElement("div");
    row.className = "cat-row";
    row.innerHTML = `
      <div class="cat-dot" style="background:${color}"></div>
      <span class="cat-name">${name}</span>
      <div class="cat-bar-wrap"><div class="cat-bar" style="width:0%;background:${color}"></div></div>
      <span class="cat-amt" style="color:${color}">$${fmt(data.total)}</span>`;
    el.appendChild(row);
    requestAnimationFrame(() => setTimeout(() => { row.querySelector(".cat-bar").style.width = pct + "%"; }, 60 + i * 55));
  });
}

/* ═══════════════════════════════════════════
   13. SPENDING CHART (PRESERVED)
═══════════════════════════════════════════ */
function drawChart() {
  const canvas = $("spendingCanvas"); if (!canvas) return;
  const days = parseInt($("chartPeriod")?.value) || 7;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width  = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width  = rect.width + "px";
  canvas.style.height = rect.height + "px";
  ctx.scale(dpr, dpr);
  const W = rect.width, H = rect.height;
  const PAD = { t: 12, r: 12, b: 26, l: 46 };
  const now = new Date();
  const buckets = {};
  for (let i = days - 1; i >= 0; i--) { const d = new Date(now); d.setDate(d.getDate() - i); buckets[d.toISOString().split("T")[0]] = 0; }
  for (const txn of S.transactions) { if (txn.type === "expense" && buckets[txn.date] !== undefined) buckets[txn.date] += txn.amount; }
  const labels = Object.keys(buckets), vals = Object.values(buckets);
  const maxV = Math.max(...vals, 1), cW = W - PAD.l - PAD.r, cH = H - PAD.t - PAD.b;
  const step = cW / (labels.length - 1 || 1);
  const pts = labels.map((_, i) => ({ x: PAD.l + i * step, y: PAD.t + cH - (vals[i] / maxV) * cH }));
  ctx.clearRect(0, 0, W, H);
  const g = ctx.createLinearGradient(0, PAD.t, 0, PAD.t + cH);
  g.addColorStop(0, "rgba(245,166,35,0.30)");
  g.addColorStop(1, "rgba(245,166,35,0.00)");
  ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) { const cx = (pts[i-1].x + pts[i].x) / 2; ctx.bezierCurveTo(cx, pts[i-1].y, cx, pts[i].y, pts[i].x, pts[i].y); }
  ctx.lineTo(pts[pts.length-1].x, PAD.t + cH); ctx.lineTo(pts[0].x, PAD.t + cH); ctx.closePath();
  ctx.fillStyle = g; ctx.fill();
  ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length; i++) { const cx = (pts[i-1].x + pts[i].x) / 2; ctx.bezierCurveTo(cx, pts[i-1].y, cx, pts[i].y, pts[i].x, pts[i].y); }
  ctx.strokeStyle = "#f5a623"; ctx.lineWidth = 2.4; ctx.stroke();
  const fd = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
  ctx.fillStyle = "#2e3d55"; ctx.font = "10px DM Mono, monospace";
  ctx.textAlign = "right"; ctx.fillText("$" + Math.round(maxV), PAD.l - 6, PAD.t + 10);
  ctx.textAlign = "left";  ctx.fillText(fd(labels[0]), PAD.l, H - 5);
  ctx.textAlign = "right"; ctx.fillText(fd(labels[labels.length - 1]), W - PAD.r, H - 5);
  pts.forEach((p) => { ctx.beginPath(); ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2); ctx.fillStyle = "#f5a623"; ctx.fill(); ctx.strokeStyle = "rgba(245,166,35,0.3)"; ctx.lineWidth = 3; ctx.stroke(); });
}

/* ═══════════════════════════════════════════
   14. QUICK ACTIONS (PRESERVED)
═══════════════════════════════════════════ */
function renderQuickActions(catTotals) {
  const grid = $("qcatGrid"); if (!grid) return;
  const T = TRANSLATIONS[S.lang];
  grid.innerHTML = "";
  QUICK_ACTIONS.forEach((qa, idx) => {
    const entry   = catTotals.get(qa.key);
    const total   = entry ? entry.total : 0;
    const hasData = total > 0;
    const card    = document.createElement("button");
    card.className = `qcat-card qcat-${qa.type}`;
    card.dataset.type = qa.type; card.dataset.cat = qa.key;
    card.style.cssText = `animation:cardSlide 0.28s cubic-bezier(0.4,0,0.2,1) ${idx * 0.05}s both`;
    card.innerHTML = `
      <div class="qcat-icon-wrap"><span class="qcat-emoji">${qa.icon}</span></div>
      <span class="qcat-name">${T[qa.key] || qa.key}</span>
      <span class="qcat-subtitle">${qa.type === "income" ? (T.qa_total_added || "Total Added") : (T.qa_total_used || "Total Used")}</span>
      <span class="qcat-amount${hasData ? "" : " zero"}">${hasData ? "$" + fmt(total) : "$0.00"}</span>
      <span class="qcat-add-chip" aria-hidden="true">+</span>`;
    card.addEventListener("click", () => openModal(qa.type, qa.key));
    grid.appendChild(card);
  });
}

/* ═══════════════════════════════════════════
   15. NOTIFICATION SYSTEM (PRESERVED)
═══════════════════════════════════════════ */
function addNotif(type, amount, newBalance) {
  if (!S.notifEnabled) return;
  const T = TRANSLATIONS[S.lang];
  const msg = type === "income"
    ? `${T.notif_added_income} $${fmt(amount)}. ${T.notif_balance_now} $${fmt(newBalance)}`
    : `${T.notif_added_expense} $${fmt(amount)}. ${T.notif_balance_now} $${fmt(newBalance)}`;
  S.notifications.unshift({ id: Date.now().toString(), type, msg, time: new Date().toISOString(), read: false });
  if (S.notifications.length > 20) S.notifications.length = 20;
  saveNotifs(); renderNotifPanel(); showToast(type, msg);
}

function renderNotifPanel() {
  const body  = $("npBody");
  const empty = $("npEmpty");
  const dot   = $("bellDot");
  const bell  = $("bellBtn");
  if (!body) return;
  const unread = S.notifications.filter((n) => !n.read).length;
  // Replace style.display with class toggling
  if (dot) dot.classList.toggle("is-hidden", unread === 0);
  if (bell) bell.classList.toggle("ringing", unread > 0);
  body.querySelectorAll(".np-item").forEach((el) => el.remove());
  if (!S.notifications.length) {
    if (empty) show(empty);
    return;
  }
  if (empty) hide(empty);
  S.notifications.forEach((n, i) => {
    const div = document.createElement("div");
    div.className = "np-item"; div.style.animationDelay = i * 0.035 + "s";
    div.innerHTML = `
      <div class="np-dot ${n.type || "info"}"></div>
      <div class="np-content"><div class="np-msg">${n.msg}</div><div class="np-time">${relTime(new Date(n.time))}</div></div>
      ${!n.read ? '<div class="np-unread-dot"></div>' : ""}`;
    body.appendChild(div);
  });
}

function markAllRead() { S.notifications.forEach((n) => (n.read = true)); saveNotifs(); renderNotifPanel(); }
const relTime = (date) => {
  const s = Math.floor((Date.now() - date) / 1000);
  if (s < 60) return "Just now"; if (s < 3600) return Math.floor(s / 60) + "m ago";
  if (s < 86400) return Math.floor(s / 3600) + "h ago"; return Math.floor(s / 86400) + "d ago";
};

/* ═══════════════════════════════════════════
   16. TOAST (PRESERVED)
═══════════════════════════════════════════ */
function showToast(type, msg) {
  const container = $("toastContainer"); if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<div class="toast-dot ${type}"></div><div class="toast-msg">${msg}</div>`;
  container.appendChild(toast);
  setTimeout(() => { toast.classList.add("out"); setTimeout(() => toast.remove(), 280); }, 3500);
}

/* ═══════════════════════════════════════════
   17. TRANSACTION CRUD (PRESERVED)
═══════════════════════════════════════════ */
function addTxn(type, amount, categoryKey, category, description, date) {
  S.transactions.push({ id: Date.now().toString(), type, amount, categoryKey, category, description, date });
  saveTxns();
  const { bal } = calcTotals();
  addNotif(type, amount, bal);
  renderAll();
}

function deleteTxn(id) { S.transactions = S.transactions.filter((t) => t.id !== id); saveTxns(); renderAll(); }

function applyTxnFilter() {
  const T = TRANSLATIONS[S.lang];
  const from = $("txnDateFrom")?.value || "", to = $("txnDateTo")?.value || "";
  const errEl = $("afpError");
  // Replace errEl.style.display with class toggle
  if (errEl) hide(errEl);
  if ((from && !to) || (!from && to)) {
    if (errEl) { errEl.textContent = T.err_date_required; show(errEl); } return;
  }
  if (from && to && from > to) {
    if (errEl) { errEl.textContent = T.err_date_range; show(errEl); } return;
  }
  S.txnDateFrom = from; S.txnDateTo = to; S.txnFilterActive = !!(from && to);
  updateFilterBadge(); renderTxnFeed();
  if (typeof closeAll === "function") closeAll();
}

function resetTxnFilter() {
  S.txnFilter = "all"; S.txnDateFrom = ""; S.txnDateTo = ""; S.txnFilterActive = false;
  const fromEl = $("txnDateFrom"), toEl = $("txnDateTo"), errEl = $("afpError");
  if (fromEl) fromEl.value = ""; if (toEl) toEl.value = "";
  if (errEl) hide(errEl);
  $("txnTabs")?.querySelectorAll(".ftab").forEach((b) => b.classList.toggle("active", b.dataset.filter === "all"));
  updateFilterBadge(); renderTxnFeed();
}

function updateFilterBadge() {
  const T = TRANSLATIONS[S.lang], badge = $("afpActiveBadge"), text = $("afpActiveText");
  if (!badge || !text) return;
  if (!S.txnFilterActive && S.txnFilter === "all") {
    // Replace badge.style.display with class toggle
    hide(badge); return;
  }
  let parts = [];
  if (S.txnFilter !== "all") parts.push(T[S.txnFilter] || S.txnFilter);
  if (S.txnDateFrom) parts.push(S.txnDateFrom);
  if (S.txnDateTo)   parts.push("→ " + S.txnDateTo);
  text.textContent = (T.filter_active || "Filter active") + ": " + parts.join(" · ");
  showFlex(badge);
}

function renderAll() {
  const catTotals = groupByCategory();
  updateTotals(); renderQuickActions(catTotals); renderUsageSummary(catTotals);
  renderTxnFeed(); renderCatBreakdown(); drawChart();
}

/* ═══════════════════════════════════════════
   20. NAVIGATION (PRESERVED)
═══════════════════════════════════════════ */
function goTo(page) {
  document.querySelectorAll(".page").forEach((p) => { p.classList.remove("active"); p.classList.add("hidden"); });
  const target = $("page-" + page);
  if (target) { target.classList.remove("hidden"); target.classList.add("active"); }
  document.querySelectorAll(".bn-btn").forEach((b) => b.classList.remove("active"));
  const btn = $("bn-" + page); if (btn) btn.classList.add("active");
  closeAll();
  if (page === "reports") { renderCatBreakdown(); setTimeout(drawChart, 80); }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goSearch() {
  document.querySelectorAll(".page").forEach((p) => { p.classList.remove("active"); p.classList.add("hidden"); });
  const p = $("page-search"); if (p) { p.classList.remove("hidden"); p.classList.add("active"); }
  document.querySelectorAll(".bn-btn").forEach((b) => b.classList.remove("active"));
  $("bn-dashboard")?.classList.add("active");
}

/* ═══════════════════════════════════════════
   21. MODAL (PRESERVED)
═══════════════════════════════════════════ */
function openModal(type, prefillCat = "") {
  const T = TRANSLATIONS[S.lang];
  const box = $("txnCard");
  $("txnType").value = type;
  setText("mcTitle", type === "income" ? T.modal_income_title : T.modal_expense_title);
  box.className = `modal-card modal-${type}`;
  const sel = $("txnCategory"); sel.innerHTML = "";
  CATEGORIES[type].forEach((cat) => {
    const opt = document.createElement("option"); opt.value = cat.key;
    opt.textContent = cat.icon + " " + (T[cat.key] || cat.key); sel.appendChild(opt);
  });
  if (prefillCat) sel.value = prefillCat;
  $("txnDate").value = new Date().toISOString().split("T")[0];
  $("txnAmount").value = ""; $("txnDesc").value = "";
  setText("txnSubmit", T.add_transaction);
  $("txnVeil").classList.add("open");
  setTimeout(() => $("txnAmount")?.focus(), 230);
}

function closeModal()  { $("txnVeil").classList.remove("open"); }
function showConfirm(title, msg, cb) { setText("cfmTitle", title); setText("cfmMsg", msg); S.confirmCb = cb; $("cfmVeil").classList.add("open"); }
function closeConfirm(){ $("cfmVeil").classList.remove("open"); S.confirmCb = null; }

/* ═══════════════════════════════════════════
   22. THEME (PRESERVED)
═══════════════════════════════════════════ */
function applyTheme(t) {
  S.theme = t; document.documentElement.dataset.theme = t;
  const tc = $("themeCheck"); if (tc) tc.checked = t === "dark";
  const tt = $("themeToggle"); if (tt) tt.checked = t === "dark";
  lsSet(LS.theme, t); setTimeout(drawChart, 60);
}

/* ═══════════════════════════════════════════
   23. LANGUAGE (PRESERVED)
═══════════════════════════════════════════ */
function applyLang(lang) {
  S.lang = lang; const T = TRANSLATIONS[lang]; lsSet(LS.lang, lang);
  document.querySelectorAll("[data-i18n]").forEach((el) => { const k = el.dataset.i18n; if (T[k] !== undefined) el.textContent = T[k]; });
  const isEn = lang === "en";
  setText("langBtnLbl", isEn ? "English" : "မြန်မာ");
  setText("menuLangLabel", isEn ? "Switch to မြန်မာ" : "Switch to English");
  updateFilterBadge(); updateGreeting(); renderAll(); renderNotifPanel();
}
const toggleLang = () => applyLang(S.lang === "en" ? "my" : "en");

/* ═══════════════════════════════════════════
   24. GREETING & DATE (PRESERVED)
═══════════════════════════════════════════ */
function updateGreeting() {
  const h = new Date().getHours(), T = TRANSLATIONS[S.lang];
  setText("greetText", h < 12 ? T.good_morning : h < 17 ? T.good_afternoon : T.good_evening);
  setText("greetName", S.userName.split(" ")[0] + " 👋");
}
function updateDate() {
  const el = $("dateChip");
  if (el) el.textContent = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/* ═══════════════════════════════════════════
   25. EXPORT CSV (PRESERVED)
═══════════════════════════════════════════ */
function exportCSV() {
  const T   = TRANSLATIONS[S.lang];
  const hdr = ["Date","Type","Category","Description","Amount"].join(",");
  const rows = S.transactions.map((t) =>
    [t.date, t.type, (T[t.categoryKey] || t.category).replace(/,/g,";"), (t.description||"").replace(/,/g,";"), t.amount.toFixed(2)].join(","));
  const csv = [hdr, ...rows].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const a   = document.createElement("a"); a.href = url;
  a.download = `finpay-${new Date().toISOString().split("T")[0]}.csv`; a.click();
  URL.revokeObjectURL(url);
}

/* ═══════════════════════════════════════════════════════════════
   26. UPDATE PROFILE
   All element.style.display / element.style.cssText calls
   replaced with show() / hide() / showFlex() / class helpers.
═══════════════════════════════════════════════════════════════ */
function updateProfile() {
  const name = S.userName;
  const init = (name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)) || "A";

  /* ── Helper: build verified badge SVG ── */
  const makeVerifiedBadge = (id) => {
    const b = document.createElement("span");
    b.id = id;
    b.className = "verified-badge";
    b.title = "Verified Google Account";
    b.setAttribute("aria-label", "Verified");
    b.innerHTML = `<svg width="8" height="8" viewBox="0 0 12 12" fill="none">
      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    return b;
  };

  /* ══════════════════════════════════════
     NAVBAR AVATAR RING
  ══════════════════════════════════════ */
  const avatarRing   = $("avatarRing");
  const avatarImg    = $("avatarImg");
  const avatarLetter = $("avatarLetter");

  if (avatarImg && avatarLetter) {
    if (S.userAvatar) {
      if (avatarRing) avatarRing.classList.add("is-loading");

      avatarImg.alt = name;
      show(avatarImg);
      hide(avatarLetter);

      const tempImg = new Image();
      tempImg.onload = () => {
        avatarImg.src = S.userAvatar;
        if (avatarRing) avatarRing.classList.remove("is-loading");
      };
      tempImg.onerror = () => {
        hide(avatarImg);
        show(avatarLetter);
        avatarLetter.textContent = init[0];
        if (avatarRing) avatarRing.classList.remove("is-loading");
      };
      tempImg.src = S.userAvatar;
    } else {
      hide(avatarImg);
      show(avatarLetter);
      avatarLetter.textContent = init[0];
      if (avatarRing) avatarRing.classList.remove("is-loading");
    }
  }

  setText("avatarName", name.split(" ")[0]);

  /* Verified badge in navbar avatar-name-row */
  const nameRow = document.querySelector(".avatar-name-row");
  if (nameRow) {
    const existing = nameRow.querySelector(".verified-badge");
    if (existing) existing.remove();
    if (S.isSocialLogin) nameRow.appendChild(makeVerifiedBadge("avatarVerified"));
  }

  /* Provider label */
  const providerEl = $("avatarProvider");
  if (providerEl) {
    if (S.isSocialLogin && S.userProvider) {
      providerEl.textContent = S.userProvider;
      show(providerEl);
    } else {
      hide(providerEl);
    }
  }

  /* ══════════════════════════════════════
     HOVER TOOLTIP — populate content
  ══════════════════════════════════════ */
  const tipPlaceholder = $("tipAvatarPlaceholder");
  if (tipPlaceholder) {
    if (S.userAvatar) {
      /* Replace letter span with img — same pattern, no inline style */
      const img = document.createElement("img");
      img.id        = "tipAvatarPlaceholder";
      img.className = "avatar-tip-img";
      img.src       = S.userAvatar;
      img.alt       = name;
      tipPlaceholder.replaceWith(img);
    } else {
      show(tipPlaceholder);
      tipPlaceholder.textContent = init[0];
    }
  }
  setText("tipName", name.split(" ")[0]);
  const tipEmail = $("tipEmail");
  if (tipEmail) {
    if (S.userEmail) { tipEmail.textContent = S.userEmail; show(tipEmail); }
    else { hide(tipEmail); }
  }

  /* ══════════════════════════════════════
     GREET SECTION: name badge + email
  ══════════════════════════════════════ */
  updateGreeting();

  /* Verified badge next to greeting h1 */
  const greetNameEl = $("greetName");
  if (greetNameEl && greetNameEl.parentElement) {
    const existingGBadge = greetNameEl.parentElement.querySelector("#greetVerified");
    if (existingGBadge) existingGBadge.remove();
    if (S.isSocialLogin) {
      const gb = makeVerifiedBadge("greetVerified");
      /* Use CSS modifier class for the larger variant */
      gb.classList.add("verified-badge--lg");
      greetNameEl.parentElement.appendChild(gb);
    }
  }

  /* Gmail address below greeting */
  const greetEmail = $("greetEmail");
  if (greetEmail) {
    if (S.isSocialLogin && S.userEmail) {
      greetEmail.textContent = S.userEmail;
      show(greetEmail);
    } else {
      hide(greetEmail);
    }
  }

  /* ══════════════════════════════════════
     SETTINGS PROFILE CARD (PRESERVED)
  ══════════════════════════════════════ */
  const pcAvatar = $("pcAvatar");
  if (pcAvatar) {
    if (S.userAvatar) {
      let img = pcAvatar.querySelector("img");
      if (!img) {
        img = document.createElement("img");
        /* Use CSS class instead of cssText */
        img.className = "pc-avatar-img";
        pcAvatar.appendChild(img);
      }
      img.src = S.userAvatar;
      const txt = pcAvatar.childNodes[0];
      if (txt && txt.nodeType === 3) pcAvatar.removeChild(txt);
    } else {
      pcAvatar.innerHTML = init[0];
    }
  }

  const ni = $("profileNameInput");
  if (ni) ni.value = name;

  const socialInfo     = $("pcSocialInfo");
  const socialBadge    = $("pcSocialBadge");
  const socialProvider = $("pcSocialProvider");
  const emailEl        = $("pcEmail");
  const passwordRow    = $("passwordRow");

  if (S.isSocialLogin) {
    showFlex(socialInfo);
    if (socialBadge)    socialBadge.textContent  = TRANSLATIONS[S.lang].social_account || "Social Account";
    if (socialProvider && S.userProvider)
      socialProvider.textContent = (TRANSLATIONS[S.lang].provider_label || "Provider:") + " " + S.userProvider;
    if (emailEl && S.userEmail) emailEl.textContent = S.userEmail;
    hide(passwordRow);
    if (ni) ni.readOnly = true;
  } else {
    hide(socialInfo);
    showFlex(passwordRow);
    if (ni) ni.readOnly = false;
  }
}

/* ─── setGoogleUser (kept for any legacy calls) ─── */
function setGoogleUser(name, avatarUrl, email = "", provider = "Google") {
  S.userName      = name || S.userName;
  S.userAvatar    = avatarUrl || "";
  S.userEmail     = email || "";
  S.userProvider  = provider || "Google";
  S.isSocialLogin = true;
  lsSet(LS.userName,      S.userName);
  lsSet(LS.userAvatar,    S.userAvatar);
  lsSet(LS.userEmail,     S.userEmail);
  lsSet(LS.userProvider,  S.userProvider);
  lsSet(LS.isSocialLogin, true);
  updateProfile();
}

/* ═══════════════════════════════════════════
   27. FAB (PRESERVED)
═══════════════════════════════════════════ */
function toggleFab(force) {
  const open = force !== undefined ? force : !S.fabOpen;
  S.fabOpen = open;
  $("fabMain")?.classList.toggle("open", open);
  $("fabSub")?.classList.toggle("open", open);
  $("fabBackdrop")?.classList.toggle("show", open);
}

/* ═══════════════════════════════════════════
   28. CLOSE ALL PANELS (PRESERVED)
═══════════════════════════════════════════ */
function closeAll() {
  $("dotsMenu")?.classList.remove("open");
  $("dotsBtn")?.classList.remove("open");
  $("notifPanel")?.classList.remove("open");
  toggleFab(false);
}

/* ═══════════════════════════════════════════
   29. SEARCH (PRESERVED)
═══════════════════════════════════════════ */
function handleSearch(q) {
  S.searchQuery = q;
  const clear = $("searchClear");
  if (clear) clear.classList.toggle("show", q.length > 0);
  if (q.trim()) {
    goSearch(); renderSearch(q);
    setText("searchResultLabel", TRANSLATIONS[S.lang].search_results + ': "' + q + '"');
  } else { goTo("dashboard"); }
}

/* ═══════════════════════════════════════════
   30. EVENT WIRING (PRESERVED)
═══════════════════════════════════════════ */
let resizeTimer;

function wire() {
  /* Bottom nav */
  document.querySelectorAll(".bn-btn[data-page]").forEach((btn) => {
    btn.addEventListener("click", () => goTo(btn.dataset.page));
  });

  /* FAB */
  $("fabMain")?.addEventListener("click", (e) => { e.stopPropagation(); toggleFab(); });
  $("fabIncome")?.addEventListener("click",  () => { toggleFab(false); openModal("income"); });
  $("fabExpense")?.addEventListener("click", () => { toggleFab(false); openModal("expense"); });
  $("fabBackdrop")?.addEventListener("click", () => toggleFab(false));

  /* Avatar → Settings */
  $("avatarBtn")?.addEventListener("click", () => goTo("settings"));

  /* Tooltip: Settings shortcut */
  $("tipSettingsBtn")?.addEventListener("click", (e) => { e.stopPropagation(); goTo("settings"); });

  /* Tooltip: Log Out */
  $("tipLogoutBtn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    showConfirm(
      S.lang === "en" ? "Logout?" : "ထွက်မည်?",
      S.lang === "en" ? "Are you sure you want to sign out?" : "အကောင့်မှ ထွက်ရန် သေချာပါသလား?",
      async () => {
        await _supabase.auth.signOut();
        localStorage.clear();
        location.href = "index.html";
      }
    );
  });

  /* 3-dots */
  $("dotsBtn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = $("dotsMenu").classList.toggle("open");
    $("dotsBtn").classList.toggle("open", open);
    if (open) $("notifPanel")?.classList.remove("open");
  });
  $("themeCheck")?.addEventListener("change",     (e) => applyTheme(e.target.checked ? "dark" : "light"));
  $("menuAddIncome")?.addEventListener("click",   () => { closeAll(); openModal("income"); });
  $("menuAddExpense")?.addEventListener("click",  () => { closeAll(); openModal("expense"); });
  $("menuHistory")?.addEventListener("click",    () => { closeAll(); goTo("transactions"); });
  $("menuLang")?.addEventListener("click",       () => { toggleLang(); closeAll(); });

  /* Search */
  $("searchInput")?.addEventListener("input",  (e) => handleSearch(e.target.value));
  $("searchInput")?.addEventListener("keydown",(e) => { if (e.key === "Escape") { $("searchInput").value = ""; handleSearch(""); } });
  $("searchClear")?.addEventListener("click",  () => { $("searchInput").value = ""; handleSearch(""); $("searchInput")?.focus(); });

  /* Notifications */
  $("bellBtn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = $("notifPanel").classList.toggle("open");
    if (open) { $("dotsMenu")?.classList.remove("open"); $("dotsBtn")?.classList.remove("open"); markAllRead(); }
  });
  $("npMarkRead")?.addEventListener("click", markAllRead);
  $("npClear")?.addEventListener("click",   () => { S.notifications = []; saveNotifs(); renderNotifPanel(); });

  /* Global click — close panels */
  document.addEventListener("click", (e) => {
    if (!$("dotsShell")?.contains(e.target)) { $("dotsMenu")?.classList.remove("open"); $("dotsBtn")?.classList.remove("open"); }
    if (!$("bellShell")?.contains(e.target)) $("notifPanel")?.classList.remove("open");
  });

  /* Transaction filters */
  $("txnTabs")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".ftab"); if (!btn) return;
    $("txnTabs").querySelectorAll(".ftab").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active"); S.txnFilter = btn.dataset.filter; updateFilterBadge(); renderTxnFeed();
  });
  $("afpApply")?.addEventListener("click",     applyTxnFilter);
  $("afpReset")?.addEventListener("click",     resetTxnFilter);
  $("afpBadgeClear")?.addEventListener("click",resetTxnFilter);

  /* Modal */
  $("csvBtnTxn")?.addEventListener("click", exportCSV);
  $("mcClose")?.addEventListener("click",   closeModal);
  $("txnVeil")?.addEventListener("click",   (e) => { if (e.target === $("txnVeil")) closeModal(); });

  $("txnSubmit")?.addEventListener("click", () => {
    const type = $("txnType").value, amount = parseFloat($("txnAmount").value);
    const catKey = $("txnCategory").value, desc = $("txnDesc").value.trim(), date = $("txnDate").value;
    const T = TRANSLATIONS[S.lang];
    if (!amount || amount <= 0) { const inp = $("txnAmount"); inp.classList.add("shake"); setTimeout(() => inp.classList.remove("shake"), 1600); return; }
    const catName = T[catKey] || catKey || (type === "income" ? T.cat_other_income : T.cat_other_expense);
    addTxn(type, amount, catKey || "cat_other_" + type, catName, desc, date);
    closeModal();
  });

  /* Confirm modal */
  $("cfmCancel")?.addEventListener("click", closeConfirm);
  $("cfmOk")?.addEventListener("click",    () => { S.confirmCb?.(); closeConfirm(); });

  /* Settings */
  $("themeToggle")?.addEventListener("change",  (e) => applyTheme(e.target.checked ? "dark" : "light"));
  $("langBtn")?.addEventListener("click",       toggleLang);
  $("notifToggle")?.addEventListener("change",  (e) => { S.notifEnabled = e.target.checked; lsSet(LS.notifEnabled, S.notifEnabled); });

  /* Clear data */
  $("clearBtn")?.addEventListener("click", () => {
    const T = TRANSLATIONS[S.lang];
    showConfirm(T.confirm_clear, T.confirm_clear_msg, () => {
      S.transactions = []; saveTxns();
      localStorage.setItem("app_initialized", "true");
      renderAll(); showToast("success", "History cleared!");
    });
  });

  /* Supabase logout */
  $("logoutBtn")?.addEventListener("click", () => {
    showConfirm(
      S.lang === "en" ? "Logout?" : "ထွက်မည်?",
      S.lang === "en" ? "Are you sure you want to sign out?" : "အကောင့်မှ ထွက်ရန် သေချာပါသလား?",
      async () => { await _supabase.auth.signOut(); localStorage.clear(); location.href = "index.html"; }
    );
  });

  /* Charts */
  $("chartPeriod")?.addEventListener("change", drawChart);
  window.addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(drawChart, 220); });
}

/* ═══════════════════════════════════════════
   31. DEMO DATA & INIT (PRESERVED)
═══════════════════════════════════════════ */
function seedDemoData() {
  const td = new Date().toISOString().split("T")[0];
  const yd = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  const d2 = new Date(Date.now() - 172800000).toISOString().split("T")[0];
  S.transactions = [
    { id:"1", type:"income",  amount:3000, categoryKey:"cat_salary",    category:"Salary",    description:"Monthly salary",  date:d2 },
    { id:"2", type:"income",  amount:2000, categoryKey:"cat_freelance",  category:"Freelance", description:"Design project",   date:yd },
    { id:"3", type:"expense", amount:450,  categoryKey:"cat_food",       category:"Food",      description:"Groceries",        date:d2 },
    { id:"4", type:"expense", amount:120,  categoryKey:"cat_transport",  category:"Transport", description:"Grab",             date:yd },
    { id:"5", type:"expense", amount:299,  categoryKey:"cat_shopping",   category:"Shopping",  description:"Online",           date:td },
  ];
  saveTxns();
}

async function init() {
  const { data: { session } } = await _supabase.auth.getSession();

  if (!session) { window.location.href = "index.html"; return; }

  const meta        = session.user.user_metadata;
  S.userEmail       = session.user.email || "";
  S.userName        = meta.full_name || meta.name || S.userEmail.split("@")[0] || "User";
  S.userAvatar      = meta.avatar_url || meta.picture || "";
  S.userProvider    = session.user.app_metadata?.provider
                        ? session.user.app_metadata.provider.charAt(0).toUpperCase()
                          + session.user.app_metadata.provider.slice(1)
                        : "Email";
  S.isSocialLogin   = S.userProvider.toLowerCase() !== "email";

  lsSet(LS.userName,      S.userName);
  lsSet(LS.userAvatar,    S.userAvatar);
  lsSet(LS.userEmail,     S.userEmail);
  lsSet(LS.userProvider,  S.userProvider);
  lsSet(LS.isSocialLogin, S.isSocialLogin);

  loadState();

  S.userEmail     = session.user.email || lsGet(LS.userEmail, "");
  S.userName      = meta.full_name || meta.name || S.userEmail.split("@")[0] || lsGet(LS.userName, "User");
  S.userAvatar    = meta.avatar_url || meta.picture || lsGet(LS.userAvatar, "");
  S.isSocialLogin = S.userProvider.toLowerCase() !== "email";

  applyTheme(S.theme);
  applyLang(S.lang);
  updateDate();
  updateProfile();

  if ($("notifToggle")) $("notifToggle").checked = S.notifEnabled;

  wire();

  if (!localStorage.getItem("app_initialized") && (!S.transactions || S.transactions.length === 0)) {
    seedDemoData();
    localStorage.setItem("app_initialized", "true");
  }

  renderAll();
  renderNotifPanel();

  console.log(
    `%c ✓ Dashboard | ${S.userName} | ${S.userProvider} `,
    "background:#22c55e;color:#fff;padding:2px 6px;border-radius:3px;"
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
