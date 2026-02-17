// Supabase Client Initialization
const { createClient } = supabase;
const _supabase = createClient(
  "https://lqfjeamzbxayfbjntarr.supabase.co",
  "sb_publishable_jDExXkASC_jrulY8B7noFw_r9qut-vQ",
);

let transactions = [];
let currentLang = "en";

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
  },
};

// --- Page Initialization ---
document.addEventListener("DOMContentLoaded", async () => {
  await fetchTransactions();
  renderTransactions();
});

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

// --- Modal Logic ---
function openModal(type) {
  const modal = document.getElementById("transaction-modal");
  const title = document.getElementById("modal-form-title");
  const typeInput = document.getElementById("trans-type");
  const d = langData[currentLang];

  typeInput.value = type;
  title.innerText = type === "income" ? d.modalInc : d.modalExp;
  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("transaction-modal").style.display = "none";
}

// Form Submission (Saving to Supabase)
document.getElementById("transaction-form").onsubmit = async (e) => {
  e.preventDefault();

  const type = document.getElementById("trans-type").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const note = document.getElementById("note").value;

  const { data, error } = await _supabase.from("transactions").insert([
    {
      type: type,
      amount: parseFloat(amount),
      category: category,
      note: note,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    alert("Error saving: " + error.message);
  } else {
    closeModal();
    e.target.reset();
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
    Food: "fa-utensils",
    Shopping: "fa-shopping-bag",
    Gift: "fa-gift",
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
          ${t.type === "income" ? "+" : "-"}$${Math.abs(t.amount)}
          <i class="fas fa-trash-alt delete-icon" onclick="event.stopPropagation(); deleteTrans(${t.id})"></i>
      </div>
    `;
    list.appendChild(item);
  });
  updateSummary();
}

// --- Event Listeners & Helpers ---
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

document.getElementById("profile-btn").onclick = () => {
  if (confirm("Do you want to logout?")) {
    // Folder မရှိတော့သဖြင့် index.html သို့ တိုက်ရိုက်သွားသည်
    window.location.href = "index.html";
  }
};
