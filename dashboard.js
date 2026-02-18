/**
 * TNB Finance - Optimized Logic
 */

const SUPABASE_URL = "https://lqfjeamzbxayfbjntarr.supabase.co";
const SUPABASE_KEY = "sb_publishable_jDExXkASC_jrulY8B7noFw_r9qut-vQ";
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const App = {
    user: null,
    transactions: [],
    currentLang: 'en',
    // Logic Mapping for dynamic category filtering
    categories: {
        income: ["Salary", "Business", "Investment", "Bonus", "Other"],
        expense: ["Food", "Transport", "Shopping", "Health", "Rent", "Bill", "Other"]
    }
};

const UI = {
    // Dynamic Dropdown Filtering
    filterCategories(type) {
        const select = document.getElementById("category");
        if (!select) return;
        
        select.innerHTML = ""; // Clear existing
        const list = App.categories[type] || App.categories.expense;
        
        list.forEach(cat => {
            const opt = document.createElement("option");
            opt.value = cat;
            opt.textContent = cat;
            select.appendChild(opt);
        });
    }
};

/* ==============================
   INITIALIZATION
============================== */
document.addEventListener("DOMContentLoaded", async () => {
    await initUser();
    setupEventListeners();
});

async function initUser() {
    const { data, error } = await db.auth.getUser();
    if (error || !data.user) {
        window.location.href = "index.html";
        return;
    }
    App.user = data.user;
    updateUserProfileUI();
    fetchData();
}

function setupEventListeners() {
    // Theme
    document.getElementById("theme-toggle")?.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });

    // Profile Dropdown
    document.getElementById("profile-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        document.getElementById("profile-dropdown").classList.toggle("show");
    });

    // Form
    document.getElementById("transaction-form")?.addEventListener("submit", handleFormSubmit);

    // Close dropdowns on body click
    document.addEventListener("click", () => {
        document.getElementById("profile-dropdown")?.classList.remove("show");
    });

    // Logout
    document.getElementById("logout-confirm-btn")?.addEventListener("click", async () => {
        await db.auth.signOut();
        window.location.href = "index.html";
    });
}

/* ==============================
   DATA OPERATIONS
============================= */
async function fetchData() {
    const { data, error } = await db
        .from("transactions")
        .select("*")
        .eq("user_id", App.user.id)
        .order("created_at", { ascending: false });

    if (!error) {
        App.transactions = data;
        renderUI();
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const saveBtn = document.getElementById("save-btn");
    saveBtn.disabled = true;

    const payload = {
        user_id: App.user.id,
        type: document.getElementById("trans-type").value,
        amount: parseFloat(document.getElementById("amount").value),
        category: document.getElementById("category").value,
        note: document.getElementById("note").value
    };

    const { error } = await db.from("transactions").insert([payload]);
    
    if (!error) {
        closeModal();
        fetchData();
    } else {
        alert("Error: " + error.message);
    }
    saveBtn.disabled = false;
}

async function deleteTransaction(id) {
    if (!confirm("Delete this entry?")) return;
    const { error } = await db.from("transactions").delete().eq("id", id);
    if (!error) fetchData();
}

/* ==============================
   UI CONTROLS
============================= */
function renderUI() {
    const list = document.getElementById("transaction-list");
    let incomeTotal = 0;
    let expenseTotal = 0;

    list.innerHTML = "";

    App.transactions.forEach(t => {
        const amt = Number(t.amount);
        t.type === 'income' ? incomeTotal += amt : expenseTotal += amt;

        const item = document.createElement("div");
        item.className = "transaction-item";
        item.innerHTML = `
            <div class="trans-info" style="flex:1">
                <h4 style="font-weight:700">${t.category}</h4>
                <p style="font-size:0.7rem; color:var(--text-sub)">${t.note || 'No note'}</p>
            </div>
            <div class="trans-val ${t.type === 'income' ? 'amt-in' : 'amt-ex'}" style="color: var(--${t.type})">
                ${t.type === 'income' ? '+' : '-'}$${amt.toFixed(2)}
            </div>
            <button class="delete-btn" onclick="deleteTransaction('${t.id}')">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        list.appendChild(item);
    });

    document.getElementById("main-balance").textContent = `$${(incomeTotal - expenseTotal).toFixed(2)}`;
    document.getElementById("total-income").textContent = `+$${incomeTotal.toFixed(2)}`;
    document.getElementById("total-expense").textContent = `-$${expenseTotal.toFixed(2)}`;
}

function updateUserProfileUI() {
    const name = App.user.user_metadata?.full_name || "User";
    document.getElementById("user-display-name").textContent = name;
    document.getElementById("user-display-email").textContent = App.user.email;
}

// Global Modal Controls
window.openModal = function(type) {
    document.getElementById("trans-type").value = type;
    document.getElementById("modal-form-title").textContent = type === 'income' ? "Add Income" : "Add Expense";
    
    // Logic Update: Filter Categories dynamically
    UI.filterCategories(type);
    
    document.getElementById("transaction-modal").style.display = "flex";
};

window.closeModal = function() {
    document.getElementById("transaction-modal").style.display = "none";
    document.getElementById("transaction-form").reset();
};

window.showChoiceModal = function() {
    document.getElementById("choice-modal").style.display = "flex";
};

window.closeChoiceModal = function() {
    document.getElementById("choice-modal").style.display = "none";
};

window.selectChoice = function(type) {
    closeChoiceModal();
    openModal(type);
};

window.catAction = function(type, categoryName) {
    openModal(type);
    document.getElementById("category").value = categoryName;
};

window.navigateTo = (page) => console.log("Navigate to:", page);
window.toggleSidebar = () => alert("Sidebar Toggled");
