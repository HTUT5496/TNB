/**
 * TNB Finance - Dashboard Logic
 * Version: 2.1 (Optimized for 2026)
 */

// Supabase Client Initialization
const { createClient } = supabase;
const _supabase = createClient(
  "https://lqfjeamzbxayfbjntarr.supabase.co",
  "sb_publishable_jDExXkASC_jrulY8B7noFw_r9qut-vQ",
);

let transactions = [];
let currentLang = "en";
let currentUser = null;

// Language Dictionary
const langData = {
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
    catFood: "Food",
    catHealth: "Health",
    catShop: "Shopping",
    catTravel: "Travel",
    catSalary: "Salary",
    catInvest: "Investment",
    catOther: "Other",
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
    catFood: "စားစရိတ်",
    catHealth: "ကျန်းမာရေး",
    catShop: "စျေးဝယ်",
    catTravel: "ခရီးသွား",
    catSalary: "လစာ",
    catInvest: "ရင်းနှီးမြှုပ်နှံမှု",
    catOther: "အခြား",
  },
};

// --- Page Initialization ---
document.addEventListener("DOMContentLoaded", async () => {
  await checkUser();
  await fetchTransactions();
  setupDropdown();

  // Initialize UI Theme state
  if (document.body.classList.contains("light-mode")) {
    document.getElementById("theme-toggle").innerText =
      langData[currentLang].themeLight;
  }
});

// User Session & Profile Data
async function checkUser() {
  const {
    data: { user },
    error,
  } = await _supabase.auth.getUser();
  if (user) {
    currentUser = user;
    const name = user.user_metadata.full_name || "User";
    const email = user.email;
    const avatarUrl =
      user.user_metadata.avatar_url ||
      `https://ui-avatars.com/api/?name=${name}&background=3b82f6&color=fff`;

    document.getElementById("user-avatar").src = avatarUrl;
    document.getElementById("user-display-name").innerText = name;
    document.getElementById("user-display-email").innerText = email;
  } else {
    window.location.href = "index.html";
  }
}

// --- Dropdown Management ---
function setupDropdown() {
  const profileBtn = document.getElementById("profile-btn");
  const dropdown = document.getElementById("profile-dropdown");

  profileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("show");
  });

  document.addEventListener("click", () => dropdown.classList.remove("show"));

  document.getElementById("logout-confirm-btn").onclick = async () => {
    if (confirm("Logout from TNB Finance?")) {
      await _supabase.auth.signOut();
      window.location.href = "index.html";
    }
  };
}

// --- Navigation Handling ---
function navigateTo(page) {
  document
    .querySelectorAll(".nav-item")
    .forEach((btn) => btn.classList.remove("active"));
  const btnId = `nav-${page.substring(0, 4)}-btn`;
  const activeBtn = document.getElementById(btnId);
  if (activeBtn) activeBtn.classList.add("active");
}

// --- Transaction Modal Logic ---
function showChoiceModal() {
  document.getElementById("choice-modal").style.display = "block";
}

function closeChoiceModal() {
  document.getElementById("choice-modal").style.display = "none";
}

function selectChoice(type) {
  closeChoiceModal();
  openModal(type);
}

function openModal(type) {
  const modal = document.getElementById("transaction-modal");
  const title = document.getElementById("modal-form-title");
  const typeInput = document.getElementById("trans-type");
  const categorySelect = document.getElementById("category");
  const d = langData[currentLang];

  typeInput.value = type;
  title.innerText = type === "income" ? d.modalInc : d.modalExp;

  // Toggle category visibility based on type
  document.getElementById("opt-income").style.display =
    type === "income" ? "block" : "none";
  document.getElementById("opt-expense").style.display =
    type === "expense" ? "block" : "none";

  categorySelect.value = type === "income" ? "Salary" : "Food";
  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("transaction-modal").style.display = "none";
  document.getElementById("transaction-form").reset();
}

function catAction(type, categoryName) {
  openModal(type.toLowerCase());
  document.getElementById("category").value = categoryName;
}

// --- Supabase Data Logic ---
async function fetchTransactions() {
  const { data, error } = await _supabase
    .from("transactions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Fetch error:", error.message);
  } else {
    transactions = data || [];
    renderTransactions();
  }
}

document.getElementById("transaction-form").onsubmit = async (e) => {
  e.preventDefault();
  const btn = document.getElementById("save-btn");
  btn.disabled = true;

  const payload = {
    type: document.getElementById("trans-type").value,
    amount: parseFloat(document.getElementById("amount").value),
    category: document.getElementById("category").value,
    note: document.getElementById("note").value,
    user_id: currentUser.id,
  };

  const { error } = await _supabase.from("transactions").insert([payload]);

  if (error) {
    alert("Error: " + error.message);
  } else {
    closeModal();
    await fetchTransactions();
  }
  btn.disabled = false;
};

async function deleteTrans(id) {
  if (confirm(langData[currentLang].confDel)) {
    const { error } = await _supabase
      .from("transactions")
      .delete()
      .eq("id", id);
    if (!error) await fetchTransactions();
  }
}

// --- UI Rendering ---
function updateSummary() {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((t) => {
    const amt = parseFloat(t.amount);
    if (t.type === "income") totalIncome += amt;
    else totalExpense += Math.abs(amt);
  });

  const balance = totalIncome - totalExpense;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  document.getElementById("main-balance").innerText = formatter.format(balance);
  document.getElementById("total-income").innerText =
    "+" + formatter.format(totalIncome);
  document.getElementById("total-expense").innerText =
    "-" + formatter.format(totalExpense);
}

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

  transactions.forEach((t) => {
    const item = document.createElement("div");
    item.className = "transaction-item";
    const dateStr = new Date(t.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    item.innerHTML = `
      <div class="cat-icon"><i class="fas ${icons[t.category] || "fa-coins"}"></i></div>
      <div class="trans-info">
          <h4>${t.category}</h4>
          <p>${t.note || "No details"} • ${dateStr}</p>
      </div>
      <div class="trans-amt ${t.type === "income" ? "amt-in" : "amt-ex"}">
          ${t.type === "income" ? "+" : "-"}$${Math.abs(t.amount).toLocaleString()}
          <i class="fa-solid fa-trash-can delete-icon" onclick="event.stopPropagation(); deleteTrans('${t.id}')"></i>
      </div>
    `;
    list.appendChild(item);
  });
  updateSummary();
}

// --- Theme & Language Toggles ---
document.getElementById("theme-toggle").onclick = () => {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  document.getElementById("theme-toggle").innerText = isLight
    ? langData[currentLang].themeLight
    : langData[currentLang].themeDark;
};

document.getElementById("lang-toggle").onclick = () => {
  currentLang = currentLang === "en" ? "my" : "en";
  const d = langData[currentLang];
  const isLight = document.body.classList.contains("light-mode");

  // Sync Buttons
  document.getElementById("lang-toggle").innerText = d.langBtnLabel;
  document.getElementById("theme-toggle").innerText = isLight
    ? d.themeLight
    : d.themeDark;

  // Sync Dashboard Labels
  const mappings = {
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
    "nav-hist": d.hist,
    "nav-rep": d.rep,
    "nav-set": d.set,
    "cat-food": d.catFood,
    "cat-health": d.catHealth,
    "cat-shop": d.catShop,
    "cat-travel": d.catTravel,
    "cat-salary": d.catSalary,
    "cat-invest": d.catInvest,
    "cat-other": d.catOther,
    "choice-title": d.choiceTitle,
  };

  Object.entries(mappings).forEach(([id, text]) => {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
  });

  // Modal Buttons Sync
  const choiceBtnSpans = document.querySelectorAll(".choice-btn span");
  if (choiceBtnSpans.length >= 2) {
    choiceBtnSpans[0].innerText = d.addInc;
    choiceBtnSpans[1].innerText = d.addExp;
  }

  const choiceModalSub = document.querySelector("#choice-modal .sub-btn");
  if (choiceModalSub) choiceModalSub.innerText = d.cancel;

  renderTransactions();
};
