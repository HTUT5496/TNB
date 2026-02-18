/**
 * TNB Finance - Dashboard Logic
 * Version: 3.0 (Clean Architecture - 2026)
 */

/* ==============================
   CONFIGURATION
============================== */

const { createClient } = supabase;

const SUPABASE_URL = "https://lqfjeamzbxayfbjntarr.supabase.co";
const SUPABASE_KEY = "sb_publishable_jDExXkASC_jrulY8B7noFw_r9qut-vQ";

const db = createClient(SUPABASE_URL, SUPABASE_KEY);

/* ==============================
   APPLICATION STATE
============================== */

const App = {
  user: null,
  transactions: [],
  lang: "en",
  currency: "USD",
};

/* ==============================
   LANGUAGE DICTIONARY
============================== */

const LANG = {
  en: {
    totalBal: "Available Balance",
    inc: "Income",
    exp: "Expense",
    addInc: "Income",
    addExp: "Expense",
    hist: "History",
    rep: "Analysis",
    catTitle: "Categories",
    recentTitle: "Activity",
    dash: "Home",
    set: "Settings",
    langBtnLabel: "Burmese",
    themeDark: "🌙 Dark",
    themeLight: "☀️ Light",
    confDel: "Are you sure you want to delete this?",
    modalInc: "New Income",
    modalExp: "New Expense",
    save: "Confirm",
    cancel: "Back",
    choiceTitle: "New Transaction",
  },
  my: {
    totalBal: "လက်ကျန်ငွေ",
    inc: "ဝင်ငွေ",
    exp: "ထွက်ငွေ",
    addInc: "ဝင်ငွေ",
    addExp: "ထွက်ငွေ",
    hist: "မှတ်တမ်း",
    rep: "သုံးသပ်ချက်",
    catTitle: "အမျိုးအစားများ",
    recentTitle: "လတ်တလော",
    dash: "ပင်မ",
    set: "ပြင်ဆင်ချက်",
    langBtnLabel: "English",
    themeDark: "🌙 အမှောင်",
    themeLight: "☀️ အလင်း",
    confDel: "ဖျက်ရန် သေချာပါသလား?",
    modalInc: "ဝင်ငွေထည့်သွင်းရန်",
    modalExp: "ထွက်ငွေထည့်သွင်းရန်",
    save: "အတည်ပြုမည်",
    cancel: "နောက်သို့",
    choiceTitle: "အမျိုးအစားရွေးချယ်ပါ",
  },
};

/* ==============================
   INITIALIZATION
============================== */

document.addEventListener("DOMContentLoaded", async () => {
  await initUser();
  await loadTransactions();
  initEventListeners();
  applyLanguage();
  updateThemeButton();
});

/* ==============================
   USER AUTH
============================== */

async function initUser() {
  const { data, error } = await db.auth.getUser();

  if (error || !data.user) {
    window.location.href = "index.html";
    return;
  }

  App.user = data.user;

  const name = App.user.user_metadata?.full_name || "User";
  const email = App.user.email;
  const avatar =
    App.user.user_metadata?.avatar_url ||
    `https://ui-avatars.com/api/?name=${name}&background=3b82f6&color=fff`;

  setText("user-display-name", name);
  setText("user-display-email", email);
  setSrc("user-avatar", avatar);
}

/* ==============================
   DATABASE OPERATIONS
============================== */

async function loadTransactions() {
  const { data, error } = await db
    .from("transactions")
    .select("*")
    .eq("user_id", App.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Load error:", error.message);
    return;
  }

  App.transactions = data || [];
  renderTransactions();
  updateSummary();
}

async function addTransaction(payload) {
  const { error } = await db.from("transactions").insert([payload]);
  if (!error) await loadTransactions();
  else alert(error.message);
}

async function removeTransaction(id) {
  if (!confirm(LANG[App.lang].confDel)) return;

  const { error } = await db.from("transactions").delete().eq("id", id);

  if (!error) await loadTransactions();
}

/* ==============================
   RENDERING
============================== */

function renderTransactions() {
  const list = document.getElementById("transaction-list");
  if (!list) return;

  list.innerHTML = "";

  const icons = {
    Salary: "fa-money-bill-trend-up",
    Investment: "fa-chart-line",
    Bonus: "fa-gift",
    Shopping: "fa-bag-shopping",
    Food: "fa-burger",
    Health: "fa-kit-medical",
    Travel: "fa-route",
    Bill: "fa-file-invoice-dollar",
    Other: "fa-ellipsis",
  };

  App.transactions.forEach((t) => {
    const item = document.createElement("div");
    item.className = "transaction-item";

    const date = new Date(t.created_at).toLocaleDateString();

    item.innerHTML = `
      <div class="cat-icon">
        <i class="fas ${icons[t.category] || "fa-coins"}"></i>
      </div>
      <div class="trans-info">
        <h4>${t.category}</h4>
        <p>${t.note || "No details"} • ${date}</p>
      </div>
      <div class="trans-amt ${t.type === "income" ? "amt-in" : "amt-ex"}">
        ${t.type === "income" ? "+" : "-"}
        ${formatCurrency(Math.abs(t.amount))}
        <i class="fa-solid fa-trash-can delete-icon"></i>
      </div>
    `;

    item.querySelector(".delete-icon").addEventListener("click", (e) => {
      e.stopPropagation();
      removeTransaction(t.id);
    });

    list.appendChild(item);
  });
}

function updateSummary() {
  let income = 0;
  let expense = 0;

  App.transactions.forEach((t) => {
    if (t.type === "income") income += Number(t.amount);
    else expense += Number(t.amount);
  });

  const balance = income - expense;

  setText("main-balance", formatCurrency(balance));
  setText("total-income", "+" + formatCurrency(income));
  setText("total-expense", "-" + formatCurrency(expense));
}

/* ==============================
   FORM HANDLING
============================== */

document
  .getElementById("transaction-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = document.getElementById("save-btn");
    btn.disabled = true;

    const payload = {
      type: getValue("trans-type"),
      amount: parseFloat(getValue("amount")),
      category: getValue("category"),
      note: getValue("note"),
      user_id: App.user.id,
    };

    await addTransaction(payload);

    closeModal();
    btn.disabled = false;
  });

/* ==============================
   MODAL
============================== */

function openModal(type) {
  setValue("trans-type", type);
  setText(
    "modal-form-title",
    type === "income" ? LANG[App.lang].modalInc : LANG[App.lang].modalExp,
  );

  document.getElementById("transaction-modal").style.display = "block";
}

function closeModal() {
  document.getElementById("transaction-modal").style.display = "none";
  document.getElementById("transaction-form").reset();
}

/* ==============================
   THEME & LANGUAGE
============================== */

function toggleTheme() {
  document.body.classList.toggle("light-mode");
  updateThemeButton();
}

function updateThemeButton() {
  const isLight = document.body.classList.contains("light-mode");
  setText(
    "theme-toggle",
    isLight ? LANG[App.lang].themeLight : LANG[App.lang].themeDark,
  );
}

function toggleLanguage() {
  App.lang = App.lang === "en" ? "my" : "en";
  applyLanguage();
}

function applyLanguage() {
  const d = LANG[App.lang];

  const map = {
    "label-total-balance": d.totalBal,
    "label-income": d.inc,
    "label-expense": d.exp,
    "qa-add-income": d.addInc,
    "qa-add-expense": d.addExp,
    "qa-history": d.hist,
    "qa-reports": d.rep,
    "title-categories": d.catTitle,
    "title-recent": d.recentTitle,
    "nav-dash": d.dash,
    "nav-set": d.set,
  };

  Object.entries(map).forEach(([id, text]) => setText(id, text));

  setText("lang-toggle", d.langBtnLabel);
  updateThemeButton();
}

/* ==============================
   HELPERS
============================== */

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: App.currency,
  }).format(amount);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerText = text;
}

function setSrc(id, src) {
  const el = document.getElementById(id);
  if (el) el.src = src;
}

function getValue(id) {
  return document.getElementById(id)?.value;
}

function setValue(id, value) {
  const el = document.getElementById(id);
  if (el) el.value = value;
}

function initEventListeners() {
  document
    .getElementById("theme-toggle")
    ?.addEventListener("click", toggleTheme);

  document
    .getElementById("lang-toggle")
    ?.addEventListener("click", toggleLanguage);

  document
    .getElementById("logout-confirm-btn")
    ?.addEventListener("click", async () => {
      await db.auth.signOut();
      window.location.href = "index.html";
    });
}
