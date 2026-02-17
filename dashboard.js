// Supabase Client Initialization
const { createClient } = supabase;
const _supabase = createClient(
  "https://lqfjeamzbxayfbjntarr.supabase.co",
  "sb_publishable_jDExXkASC_jrulY8B7noFw_r9qut-vQ",
);

let transactions = [];
let currentLang = "en";
let currentUser = null;

// Language Data
const langData = {
  en: {
    totalBal: "Total Balance",
    inc: "Income",
    exp: "Expense",
    addInc: "Add Income",
    addExp: "Add Expense",
    hist: "History",
    rep: "Reports",
    catTitle: "Categories",
    recentTitle: "Recent Transactions",
    dash: "Dashboard",
    set: "Settings",
    langBtn: "Burmese",
    confDel: "Are you sure to delete?",
    editNote: "Edit Note:",
    modalInc: "Add Income",
    modalExp: "Add Expense",
    save: "Save",
    cancel: "Cancel",
    choiceTitle: "Choose Type",
    // Category Names
    catFood: "Food",
    catHealth: "Health",
    catShop: "Shopping",
    catTravel: "Travel",
    catSalary: "Salary",
    catInvest: "Investment",
  },
  my: {
    totalBal: "လက်ကျန်ငွေစုစုပေါင်း",
    inc: "ဝင်ငွေ",
    exp: "ထွက်ငွေ",
    addInc: "ဝင်ငွေထည့်",
    addExp: "ထွက်ငွေထည့်",
    hist: "မှတ်တမ်း",
    rep: "အစီရင်ခံစာ",
    catTitle: "အမျိုးအစားများ",
    recentTitle: "လတ်တလောစာရင်းများ",
    dash: "ပင်မစာမျက်နှာ",
    set: "ပြင်ဆင်ချက်",
    langBtn: "English",
    confDel: "ဖျက်ရန် သေချာပါသလား?",
    editNote: "မှတ်စုပြင်ရန်:",
    modalInc: "ဝင်ငွေစာရင်းသွင်းရန်",
    modalExp: "ထွက်ငွေစာရင်းသွင်းရန်",
    save: "သိမ်းမည်",
    cancel: "ပယ်ဖျက်မည်",
    choiceTitle: "အမျိုးအစားရွေးချယ်ပါ",
    // Category Names
    catFood: "စားစရိတ်",
    catHealth: "ကျန်းမာရေး",
    catShop: "စျေးဝယ်",
    catTravel: "ခရီးသွား",
    catSalary: "လစာ",
    catInvest: "ရင်းနှီးမြှုပ်နှံမှု",
  },
};

// --- Page Initialization ---
document.addEventListener("DOMContentLoaded", async () => {
  await checkUser();
  await fetchTransactions();
  renderTransactions();
  setupDropdown();
});

// Check User Session & Update Profile
async function checkUser() {
  const {
    data: { user },
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

// --- Dropdown Logic ---
function setupDropdown() {
  const profileBtn = document.getElementById("profile-btn");
  const dropdown = document.getElementById("profile-dropdown");

  profileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("show");
  });

  document.addEventListener("click", () => {
    if (dropdown.classList.contains("show")) {
      dropdown.classList.remove("show");
    }
  });

  document.getElementById("logout-confirm-btn").onclick = async () => {
    if (confirm("Do you want to logout?")) {
      await _supabase.auth.signOut();
      window.location.href = "index.html";
    }
  };
}

// --- Navigation & Sidebar Logic ---
function navigateTo(page) {
  document
    .querySelectorAll(".nav-item")
    .forEach((btn) => btn.classList.remove("active"));

  if (page === "dashboard") {
    document.getElementById("nav-dash-btn").classList.add("active");
  } else {
    alert("Navigating to " + page + " page...");
  }
}

function toggleSidebar() {
  alert("Sidebar menu clicked");
}

// --- Choice Modal Logic ---
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

// --- Quick Category Action ---
function catAction(type, categoryName) {
  const lowerType = type.toLowerCase();
  openModal(lowerType);

  const categorySelect = document.getElementById("category");
  if (categorySelect) {
    categorySelect.value = categoryName;
  }
}

// --- Supabase Database Logic ---
async function fetchTransactions() {
  const { data, error } = await _supabase
    .from("transactions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) console.log("Error fetching data:", error.message);
  else transactions = data || [];
}

function updateSummary() {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((t) => {
    const amt = parseFloat(t.amount);
    if (t.type === "income") totalIncome += amt;
    else totalExpense += Math.abs(amt);
  });

  const balance = totalIncome - totalExpense;

  document.getElementById("main-balance").innerText =
    `$${balance.toLocaleString()}`;
  document.getElementById("total-income").innerText =
    `+$${totalIncome.toLocaleString()}`;
  document.getElementById("total-expense").innerText =
    `-$${totalExpense.toLocaleString()}`;
}

// --- Modal Logic with Category Filtering ---
function openModal(type) {
  const modal = document.getElementById("transaction-modal");
  const title = document.getElementById("modal-form-title");
  const typeInput = document.getElementById("trans-type");
  const categorySelect = document.getElementById("category");
  const d = langData[currentLang];

  typeInput.value = type;
  title.innerText = type === "income" ? d.modalInc : d.modalExp;

  const options = categorySelect.querySelectorAll("option");
  const optGroups = categorySelect.querySelectorAll("optgroup");
  let firstValidOption = null;

  options.forEach((opt) => {
    const optType = opt.getAttribute("data-type");
    if (optType === type || optType === "both") {
      opt.style.display = "block";
      opt.disabled = false;
      if (!firstValidOption) firstValidOption = opt.value;
    } else {
      opt.style.display = "none";
      opt.disabled = true;
    }
  });

  optGroups.forEach((group) => {
    const label = group.getAttribute("label").toUpperCase();
    if (label.includes(type.toUpperCase())) {
      group.style.display = "";
    } else {
      group.style.display = "none";
    }
  });

  if (firstValidOption) {
    categorySelect.value = firstValidOption;
  }

  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("transaction-modal").style.display = "none";
  document.getElementById("transaction-form").reset();
}

document.getElementById("transaction-form").onsubmit = async (e) => {
  e.preventDefault();

  const type = document.getElementById("trans-type").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const note = document.getElementById("note").value;

  const { error } = await _supabase.from("transactions").insert([
    {
      type: type,
      amount: parseFloat(amount),
      category: category,
      note: note,
      user_id: currentUser.id,
    },
  ]);

  if (error) {
    alert("Error saving: " + error.message);
  } else {
    closeModal();
    await fetchTransactions();
    renderTransactions();
  }
};

// --- Rendering Logic ---
function renderTransactions() {
  const list = document.getElementById("transaction-list");
  if (!list) return;
  list.innerHTML = "";

  const icons = {
    Salary: "fa-wallet",
    Investment: "fa-chart-line",
    Bonus: "fa-gift",
    Shopping: "fa-shopping-bag",
    Food: "fa-utensils",
    Health: "fa-heartbeat",
    Travel: "fa-plane",
    Bill: "fa-file-invoice-dollar",
    Other: "fa-tags",
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
          <p>${t.note || ""} • ${dateStr}</p>
      </div>
      <div class="trans-amt ${t.type === "income" ? "amt-in" : "amt-ex"}">
          ${t.type === "income" ? "+" : "-"}$${Math.abs(t.amount).toLocaleString()}
          <i class="fas fa-trash-alt delete-icon" onclick="event.stopPropagation(); deleteTrans('${t.id}')"></i>
      </div>
    `;
    list.appendChild(item);
  });
  updateSummary();
}

// --- Theme & Language ---
document.getElementById("theme-toggle").onclick = () => {
  document.body.classList.toggle("light-mode");
  const icon = document.querySelector("#theme-toggle i");
  icon.className = document.body.classList.contains("light-mode")
    ? "fas fa-sun"
    : "fas fa-moon";
};

document.getElementById("lang-toggle").onclick = () => {
  currentLang = currentLang === "en" ? "my" : "en";
  const d = langData[currentLang];

  document.getElementById("lang-toggle").innerText = d.langBtn;
  document.getElementById("label-total-balance").innerText = d.totalBal;
  document.getElementById("label-income").innerText = d.inc;
  document.getElementById("label-expense").innerText = d.exp;
  document.getElementById("qa-add-income").innerText = d.addInc;
  document.getElementById("qa-add-expense").innerText = d.addExp;
  document.getElementById("qa-history").innerText = d.hist;
  document.getElementById("qa-reports").innerText = d.rep;
  document.getElementById("title-categories").innerText = d.catTitle;
  document.getElementById("title-recent").innerText = d.recentTitle;

  // Category Carousel Labels
  document.getElementById("cat-food").innerText = d.catFood;
  document.getElementById("cat-health").innerText = d.catHealth;
  document.getElementById("cat-shop").innerText = d.catShop;
  document.getElementById("cat-travel").innerText = d.catTravel;
  document.getElementById("cat-salary").innerText = d.catSalary;
  document.getElementById("cat-invest").innerText = d.catInvest;

  document.getElementById("nav-dash").innerText = d.dash;
  document.getElementById("nav-hist").innerText = d.hist;
  document.getElementById("nav-rep").innerText = d.rep;
  document.getElementById("nav-set").innerText = d.set;

  document.getElementById("choice-title").innerText = d.choiceTitle;
  document.querySelectorAll(".choice-btn span")[0].innerText = d.addInc;
  document.querySelectorAll(".choice-btn span")[1].innerText = d.addExp;
  document.querySelector("#choice-modal .sub-btn").innerText = d.cancel;

  const modalTitle = document.getElementById("modal-form-title");
  if (modalTitle) {
    modalTitle.innerText =
      document.getElementById("trans-type").value === "income"
        ? d.modalInc
        : d.modalExp;
  }

  renderTransactions();
};

async function deleteTrans(id) {
  if (confirm(langData[currentLang].confDel)) {
    const { error } = await _supabase
      .from("transactions")
      .delete()
      .eq("id", id);
    if (!error) {
      await fetchTransactions();
      renderTransactions();
    }
  }
}
