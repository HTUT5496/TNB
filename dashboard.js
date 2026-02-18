/**
 * TNB Finance - Dashboard Logic
 * Version: 4.0 (Performance Optimized - 2026)
 */

/* ==============================
   1. CONFIGURATION & STATE
============================== */
const SUPABASE_URL = "https://lqfjeamzbxayfbjntarr.supabase.co";
const SUPABASE_KEY = "sb_publishable_jDExXkASC_jrulY8B7noFw_r9qut-vQ";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const State = {
    user: null,
    transactions: [],
    settings: {
        lang: "en",
        currency: "USD",
        theme: "dark"
    }
};

const LANG_PACK = {
    en: {
        totalBal: "Available Balance",
        inc: "Income", exp: "Expense",
        addInc: "Income", addExp: "Expense",
        hist: "History", rep: "Stats",
        catTitle: "Categories", recentTitle: "Recent Activity",
        dash: "Home", set: "Settings",
        langBtnLabel: "Burmese",
        themeDark: "🌙 Dark", themeLight: "☀️ Light",
        confDel: "Are you sure you want to delete this?",
        modalInc: "New Income", modalExp: "New Expense",
        save: "Confirm", cancel: "Back"
    },
    my: {
        totalBal: "လက်ကျန်ငွေ",
        inc: "ဝင်ငွေ", exp: "ထွက်ငွေ",
        addInc: "ဝင်ငွေ", addExp: "ထွက်ငွေ",
        hist: "မှတ်တမ်း", rep: "သုံးသပ်ချက်",
        catTitle: "အမျိုးအစားများ", recentTitle: "လတ်တလော",
        dash: "ပင်မ", set: "ပြင်ဆင်ချက်",
        langBtnLabel: "English",
        themeDark: "🌙 အမှောင်", themeLight: "☀️ အလင်း",
        confDel: "ဖျက်ရန် သေချာပါသလား?",
        modalInc: "ဝင်ငွေထည့်သွင်းရန်", modalExp: "ထွက်ငွေထည့်သွင်းရန်",
        save: "အတည်ပြုမည်", cancel: "နောက်သို့"
    }
};

/* ==============================
   2. CORE MODULES
============================== */

const API = {
    async getUser() {
        const { data, error } = await db.auth.getUser();
        if (error || !data.user) return null;
        return data.user;
    },

    async fetchTransactions(userId) {
        const { data, error } = await db
            .from("transactions")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });
        
        if (error) throw error;
        return data || [];
    },

    async saveTransaction(payload) {
        const { error } = await db.from("transactions").insert([payload]);
        if (error) throw error;
    },

    async deleteTransaction(id) {
        const { error } = await db.from("transactions").delete().eq("id", id);
        if (error) throw error;
    }
};

const UI = {
    // Utility for Batch Text Updates
    updateText(map) {
        Object.entries(map).forEach(([id, text]) => {
            const el = document.getElementById(id);
            if (el) el.innerText = text;
        });
    },

    // Transaction Icon Mapping
    icons: {
        Salary: "fa-money-bill-trend-up",
        Investment: "fa-chart-line",
        Bonus: "fa-gift",
        Shopping: "fa-bag-shopping",
        Food: "fa-burger",
        Health: "fa-kit-medical",
        Travel: "fa-route",
        Bill: "fa-file-invoice-dollar",
        Other: "fa-ellipsis"
    },

    renderTransactions(transactions) {
        const listContainer = document.getElementById("transaction-list");
        if (!listContainer) return;

        const fragment = document.createDocumentFragment();
        
        transactions.forEach(t => {
            const date = new Date(t.created_at).toLocaleDateString(undefined, { 
                month: 'short', day: 'numeric' 
            });
            
            const item = document.createElement("div");
            item.className = "transaction-item";
            item.innerHTML = `
                <div class="cat-icon variant-${t.category.toLowerCase()}">
                    <i class="fas ${UI.icons[t.category] || "fa-coins"}"></i>
                </div>
                <div class="trans-info">
                    <h4>${t.category}</h4>
                    <p>${t.note || "No details"} • ${date}</p>
                </div>
                <div class="trans-amt ${t.type === "income" ? "amt-in" : "amt-ex"}">
                    ${t.type === "income" ? "+" : "-"} ${UI.formatCurrency(Math.abs(t.amount))}
                </div>
                <button class="delete-btn" aria-label="Delete">
                    <i class="fa-solid fa-trash-can delete-icon"></i>
                </button>
            `;

            item.querySelector(".delete-btn").addEventListener("click", () => Actions.handleDelete(t.id));
            fragment.appendChild(item);
        });

        listContainer.innerHTML = "";
        listContainer.appendChild(fragment);
    },

    updateDashboardSummary(transactions) {
        let income = 0;
        let expense = 0;

        transactions.forEach(t => {
            const amt = Number(t.amount);
            t.type === "income" ? (income += amt) : (expense += amt);
        });

        UI.updateText({
            "main-balance": UI.formatCurrency(income - expense),
            "total-income": `+${UI.formatCurrency(income)}`,
            "total-expense": `-${UI.formatCurrency(expense)}`
        });
    },

    formatCurrency(amount) {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: State.settings.currency,
        }).format(amount);
    }
};

/* ==============================
   3. APP ACTIONS
============================== */

const Actions = {
    async init() {
        try {
            const user = await API.getUser();
            if (!user) {
                window.location.href = "index.html";
                return;
            }
            State.user = user;
            
            // Set Profile UI
            const name = user.user_metadata?.full_name || "User";
            UI.updateText({ 
                "user-display-name": name, 
                "user-display-email": user.email 
            });
            document.getElementById("user-avatar").src = user.user_metadata?.avatar_url || 
                `https://ui-avatars.com/api/?name=${name}&background=06b6d4&color=fff`;

            await this.refreshData();
            this.setupEventListeners();
            this.applyLanguage();
        } catch (err) {
            console.error("Initialization Failed:", err);
        }
    },

    async refreshData() {
        State.transactions = await API.fetchTransactions(State.user.id);
        UI.renderTransactions(State.transactions);
        UI.updateDashboardSummary(State.transactions);
    },

    async handleDelete(id) {
        if (!confirm(LANG_PACK[State.settings.lang].confDel)) return;
        try {
            await API.deleteTransaction(id);
            await this.refreshData();
        } catch (err) {
            alert("Delete failed: " + err.message);
        }
    },

    applyLanguage() {
        const d = LANG_PACK[State.settings.lang];
        UI.updateText({
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
            "lang-toggle": d.langBtnLabel
        });
        this.updateThemeUI();
    },

    updateThemeUI() {
        const isLight = document.body.classList.contains("light-mode");
        const btn = document.getElementById("theme-toggle");
        if (btn) {
            btn.innerHTML = isLight ? 
                `<i class="fas fa-sun"></i> <span>${LANG_PACK[State.settings.lang].themeLight}</span>` : 
                `<i class="fas fa-moon"></i> <span>${LANG_PACK[State.settings.lang].themeDark}</span>`;
        }
    },

    setupEventListeners() {
        // Form Submission
        document.getElementById("transaction-form")?.addEventListener("submit", async (e) => {
            e.preventDefault();
            const btn = document.getElementById("save-btn");
            btn.disabled = true;

            const payload = {
                type: document.getElementById("trans-type").value,
                amount: parseFloat(document.getElementById("amount").value),
                category: document.getElementById("category").value,
                note: document.getElementById("note").value,
                user_id: State.user.id
            };

            try {
                await API.saveTransaction(payload);
                closeModal();
                await this.refreshData();
            } catch (err) {
                alert(err.message);
            } finally {
                btn.disabled = false;
            }
        });

        // Theme Toggle
        document.getElementById("theme-toggle")?.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            this.updateThemeUI();
        });

        // Lang Toggle
        document.getElementById("lang-toggle")?.addEventListener("click", () => {
            State.settings.lang = State.settings.lang === "en" ? "my" : "en";
            this.applyLanguage();
        });

        // Profile Dropdown
        document.getElementById("profile-btn")?.addEventListener("click", () => {
            document.getElementById("profile-dropdown").classList.toggle("show");
        });

        // Logout
        document.getElementById("logout-confirm-btn")?.addEventListener("click", async () => {
            await db.auth.signOut();
            window.location.href = "index.html";
        });
    }
};

/* ==============================
   4. GLOBAL INTERFACE FUNCTIONS
============================== */

window.openModal = function(type) {
    document.getElementById("trans-type").value = type;
    document.getElementById("modal-form-title").innerText = 
        type === "income" ? LANG_PACK[State.settings.lang].modalInc : LANG_PACK[State.settings.lang].modalExp;
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

window.toggleSidebar = function() {
    console.log("Sidebar functionality to be implemented.");
};

window.navigateTo = function(page) {
    console.log(`Navigating to ${page}...`);
    // Router logic can be expanded here
};

// Launch Application
document.addEventListener("DOMContentLoaded", () => Actions.init());
