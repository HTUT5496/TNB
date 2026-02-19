/**
 * TNB Finance - Dashboard Logic (Preserved + Enhanced)
 * ✅ Supabase auth & data operations unchanged
 * ✅ Category filtering logic preserved
 * ✅ Modal open/close logic preserved
 * ✅ catAction / selectChoice / navigateTo preserved
 * ✨ Added: right sidebar rendering, feed filter, sidebar toggle
 */

const SUPABASE_URL = "https://lqfjeamzbxayfbjntarr.supabase.co";
const SUPABASE_KEY = "sb_publishable_jDExXkASC_jrulY8B7noFw_r9qut-vQ";
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const App = {
    user: null,
    transactions: [],
    currentLang: 'en',
    currentFilter: 'all', // ✨ New: for feed filtering

    // ✅ PRESERVED: Category logic for dynamic filtering
    categories: {
        income: ["Salary", "Business", "Investment", "Bonus", "Other"],
        expense: ["Food", "Transport", "Shopping", "Health", "Rent", "Bill", "Other"]
    }
};

// ✅ PRESERVED: UI object with filterCategories logic
const UI = {
    filterCategories(type) {
        const select = document.getElementById("category");
        if (!select) return;

        select.innerHTML = "";
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
    // ✅ PRESERVED: Theme toggle
    document.getElementById("theme-toggle")?.addEventListener("click", () => {
        const isLight = document.body.classList.toggle("light-mode");
        document.body.classList.toggle("dark-mode", !isLight);
        const icon = document.getElementById("theme-icon");
        if (icon) icon.className = isLight ? "fas fa-sun" : "fas fa-moon";
    });

    // ✅ PRESERVED: Profile dropdown
    document.getElementById("profile-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        document.getElementById("profile-dropdown").classList.toggle("show");
    });

    // ✅ PRESERVED: Transaction form submit
    document.getElementById("transaction-form")?.addEventListener("submit", handleFormSubmit);

    // ✅ PRESERVED: Close dropdown on outside click
    document.addEventListener("click", () => {
        document.getElementById("profile-dropdown")?.classList.remove("show");
    });

    // ✅ PRESERVED: Logout
    document.getElementById("logout-confirm-btn")?.addEventListener("click", async () => {
        await db.auth.signOut();
        window.location.href = "index.html";
    });

    // ✅ PRESERVED: Language toggle (stub)
    document.getElementById("lang-toggle")?.addEventListener("click", () => {
        App.currentLang = App.currentLang === 'en' ? 'my' : 'en';
        console.log("Language toggled:", App.currentLang);
    });

    // ✨ NEW: Search input live filter
    document.getElementById("search-input")?.addEventListener("input", (e) => {
        renderFeed(e.target.value.trim().toLowerCase());
    });
}

/* ==============================
   DATA OPERATIONS (✅ PRESERVED)
============================== */
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
   RENDER UI (✅ PRESERVED + ✨ ENHANCED)
============================== */
function renderUI() {
    let incomeTotal = 0;
    let expenseTotal = 0;

    App.transactions.forEach(t => {
        const amt = Number(t.amount);
        t.type === 'income' ? incomeTotal += amt : expenseTotal += amt;
    });

    const balance = incomeTotal - expenseTotal;

    // ✅ PRESERVED: Main balance update
    document.getElementById("main-balance").textContent  = `$${balance.toFixed(2)}`;
    document.getElementById("total-income").textContent  = `+$${incomeTotal.toFixed(2)}`;
    document.getElementById("total-expense").textContent = `-$${expenseTotal.toFixed(2)}`;

    // ✨ NEW: Render transaction feed cards
    renderFeed();

    // ✨ NEW: Render right sidebar
    renderRightSidebar(incomeTotal, expenseTotal);
}

// ✨ NEW: Feed rendering with type filter + search support
function renderFeed(searchTerm = '') {
    const list = document.getElementById("transaction-list");
    const emptyState = document.getElementById("empty-state");
    if (!list) return;

    list.innerHTML = '';

    // Category icon mapping
    const catIcons = {
        salary:     'fas fa-money-bill-trend-up',
        business:   'fas fa-briefcase',
        investment: 'fas fa-chart-line',
        bonus:      'fas fa-gift',
        food:       'fas fa-burger',
        transport:  'fas fa-car',
        shopping:   'fas fa-bag-shopping',
        health:     'fas fa-kit-medical',
        rent:       'fas fa-house',
        bill:       'fas fa-file-invoice',
        other:      'fas fa-circle-dot',
    };

    const filtered = App.transactions.filter(t => {
        const typeMatch  = App.currentFilter === 'all' || t.type === App.currentFilter;
        const searchMatch = !searchTerm ||
            t.category.toLowerCase().includes(searchTerm) ||
            (t.note || '').toLowerCase().includes(searchTerm);
        return typeMatch && searchMatch;
    });

    if (filtered.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'feed-empty-state';
        empty.innerHTML = `
            <i class="fas fa-receipt"></i>
            <p>No transactions found.</p>
            <button onclick="showChoiceModal()">Add your first entry</button>
        `;
        list.appendChild(empty);
        return;
    }

    filtered.forEach((t, i) => {
        const amt    = Number(t.amount);
        const isInc  = t.type === 'income';
        const icon   = catIcons[(t.category || '').toLowerCase()] || 'fas fa-circle-dot';
        const dateStr = t.created_at
            ? new Date(t.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : '';

        const item = document.createElement("div");
        item.className = `transaction-item type-${t.type}`;
        item.style.animationDelay = `${i * 0.05}s`;

        item.innerHTML = `
            <div class="trans-cat-icon ${isInc ? 'income-bg' : 'expense-bg'}">
                <i class="${icon}"></i>
            </div>
            <div class="trans-body">
                <div class="trans-category">${t.category}</div>
                <div class="trans-note">${t.note || 'No description'}</div>
            </div>
            <div class="trans-meta">
                <span class="trans-amount ${isInc ? 'income-color' : 'expense-color'}">
                    ${isInc ? '+' : '-'}$${amt.toFixed(2)}
                </span>
                <span class="trans-date">${dateStr}</span>
                <span class="trans-type-badge ${isInc ? 'income-badge' : 'expense-badge'}">
                    ${t.type}
                </span>
            </div>
            <button class="delete-btn" onclick="deleteTransaction('${t.id}')" title="Delete">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        list.appendChild(item);
    });
}

// ✨ NEW: Right sidebar rendering
function renderRightSidebar(incomeTotal, expenseTotal) {
    const max = Math.max(incomeTotal, expenseTotal, 1);

    // Animated bars
    const incBar  = document.getElementById("income-bar");
    const expBar  = document.getElementById("expense-bar");
    if (incBar)  incBar.style.width  = `${((incomeTotal / max) * 100).toFixed(1)}%`;
    if (expBar)  expBar.style.width  = `${((expenseTotal / max) * 100).toFixed(1)}%`;

    const rsIncome  = document.getElementById("rs-income");
    const rsExpense = document.getElementById("rs-expense");
    if (rsIncome)  rsIncome.textContent  = `$${incomeTotal.toFixed(0)}`;
    if (rsExpense) rsExpense.textContent = `$${expenseTotal.toFixed(0)}`;

    // Savings Rate
    const savingsRate = incomeTotal > 0
        ? Math.max(0, ((incomeTotal - expenseTotal) / incomeTotal) * 100)
        : 0;
    const srEl = document.getElementById("savings-rate");
    if (srEl) {
        srEl.textContent = `${savingsRate.toFixed(1)}%`;
        srEl.style.color = savingsRate >= 0 ? 'var(--income)' : 'var(--expense)';
    }

    // Category Breakdown
    const catMap = {};
    const catColors = ['#06b6d4','#10b981','#f59e0b','#8b5cf6','#f43f5e','#3b82f6','#ec4899','#f97316'];
    App.transactions.forEach(t => {
        const cat = t.category || 'Other';
        catMap[cat] = (catMap[cat] || 0) + Number(t.amount);
    });

    const breakdown = document.getElementById("category-breakdown");
    if (breakdown) {
        const sorted = Object.entries(catMap).sort((a, b) => b[1] - a[1]).slice(0, 6);
        if (sorted.length === 0) {
            breakdown.innerHTML = '<p class="rs-empty">No data yet</p>';
        } else {
            breakdown.innerHTML = sorted.map(([cat, amt], idx) => `
                <div class="cat-breakdown-row">
                    <span class="cat-breakdown-dot" style="background:${catColors[idx % catColors.length]}"></span>
                    <span class="cat-breakdown-name">${cat}</span>
                    <span class="cat-breakdown-amt">$${amt.toFixed(0)}</span>
                </div>
            `).join('');
        }
    }

    // Quick Stats
    const count = App.transactions.length;
    const allAmounts = App.transactions.map(t => Number(t.amount));
    const avg = count > 0 ? allAmounts.reduce((a, b) => a + b, 0) / count : 0;
    const largest = count > 0 ? Math.max(...allAmounts) : 0;
    const cats = new Set(App.transactions.map(t => t.category)).size;

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('stat-count',   count);
    set('stat-avg',     `$${avg.toFixed(0)}`);
    set('stat-largest', `$${largest.toFixed(0)}`);
    set('stat-cats',    cats);
}

/* ==============================
   USER PROFILE (✅ PRESERVED)
============================== */
function updateUserProfileUI() {
    const name  = App.user.user_metadata?.full_name || "User";
    const email = App.user.email;
    const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=06b6d4&color=fff&bold=true`;

    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const setSrc = (id, val) => { const el = document.getElementById(id); if (el) el.src = val; };

    setEl('user-display-name', name);
    setEl('user-display-email', email);
    setSrc('user-avatar', avatarUrl);
    setSrc('dropdown-avatar', avatarUrl);
}

/* ==============================
   MODAL CONTROLS (✅ PRESERVED)
============================== */
window.openModal = function(type) {
    document.getElementById("trans-type").value = type;

    const title = type === 'income' ? "Add Income" : "Add Expense";
    document.getElementById("modal-form-title").textContent = title;

    // ✅ PRESERVED: Dynamic category filtering
    UI.filterCategories(type);

    // ✨ NEW: Header theming
    const header = document.getElementById("modal-header-bar");
    const badge  = document.getElementById("modal-type-badge");
    if (header) {
        header.className = `modal-card-header ${type}-header`;
    }
    if (badge) {
        badge.textContent = type === 'income' ? '💰 Income' : '💸 Expense';
    }

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

// ✅ PRESERVED: selectChoice logic
window.selectChoice = function(type) {
    closeChoiceModal();
    openModal(type);
};

// ✅ PRESERVED: catAction — opens modal with category pre-selected
window.catAction = function(type, categoryName) {
    openModal(type);
    // Wait for filterCategories to populate, then set value
    setTimeout(() => {
        const select = document.getElementById("category");
        if (select) select.value = categoryName;
    }, 50);
};

/* ==============================
   NAVIGATION
============================== */
// ✅ PRESERVED: navigateTo (stub — extend with actual routing)
window.navigateTo = function(page) {
    console.log("Navigate to:", page);
    // Add routing logic here when ready
};

// ✨ NEW: Sidebar active state management
window.setActiveNav = function(el) {
    document.querySelectorAll(".sidebar-link").forEach(l => l.classList.remove("active"));
    el.classList.add("active");
};

window.setBottomNav = function(el) {
    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
    el.classList.add("active");
};

// ✨ NEW: Feed filter (All / Income / Expense)
window.filterFeed = function(type, btn) {
    App.currentFilter = type;
    document.querySelectorAll(".feed-filter-btn").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    renderFeed(document.getElementById("search-input")?.value?.toLowerCase() || '');
};

// ✨ NEW: Sidebar toggle (mobile)
window.toggleSidebar = function() {
    const sidebar  = document.getElementById("left-sidebar");
    const overlay  = document.getElementById("sidebar-overlay");
    sidebar?.classList.toggle("open");
    overlay?.classList.toggle("show");
};

window.closeSidebar = function() {
    document.getElementById("left-sidebar")?.classList.remove("open");
    document.getElementById("sidebar-overlay")?.classList.remove("show");
};
