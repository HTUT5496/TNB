/**
 * TNB Finance Dashboard — dashboard.js (Production Rewrite)
 * ============================================================
 * ✅ ALL finance logic preserved (Supabase, calculations, modals)
 * ✅ EN/Burmese language system preserved and extended
 * ✨ NEW: Full notification system with balance alerts
 * ✨ NEW: 2-row navbar interactions (Row1: logo/lang/notif, Row2: add/search/profile)
 * ✨ NEW: Notifications stored in localStorage, newest first
 * ✨ NEW: Unread badge, mark-all-read, timestamped notifications
 */

/* ============================================================
   SUPABASE CLIENT (✅ PRESERVED)
============================================================ */
const SUPABASE_URL = "https://lqfjeamzbxayfbjntarr.supabase.co";
const SUPABASE_KEY = "sb_publishable_jDExXkASC_jrulY8B7noFw_r9qut-vQ";
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* ============================================================
   APPLICATION STATE
============================================================ */
const App = {
    user:          null,
    transactions:  [],
    currentLang:   'en',   // 'en' | 'my'
    currentFilter: 'all',  // 'all' | 'income' | 'expense'

    // ✅ PRESERVED: Categories for dynamic modal filtering
    categories: {
        income:  ["Salary", "Business", "Investment", "Bonus", "Other"],
        expense: ["Food", "Transport", "Shopping", "Health", "Rent", "Bill", "Other"]
    }
};

/* ============================================================
   NOTIFICATION STATE
   Stored in localStorage under key "tnb_notifications"
   Each notification: { id, type, message, subtext, timestamp, read }
============================================================ */
const Notif = {

    STORAGE_KEY: 'tnb_notifications',
    MAX_ITEMS:   50, // cap to avoid unbounded growth

    /** Load all notifications from localStorage */
    load() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
        } catch {
            return [];
        }
    },

    /** Persist notifications to localStorage */
    save(list) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
    },

    /**
     * Add a new balance-change notification.
     * @param {string} type       - 'income' | 'expense' | 'info'
     * @param {string} message    - Primary text (e.g. "Your balance is now $300")
     * @param {string} subtext    - Secondary text (e.g. "Income: +$200 · Salary")
     */
    add(type, message, subtext = '') {
        const list = this.load();
        const item = {
            id:        Date.now() + Math.random().toString(36).slice(2, 7),
            type,      // 'income' | 'expense' | 'info'
            message,
            subtext,
            timestamp: new Date().toISOString(),
            read:      false
        };
        // Newest first; trim to max
        list.unshift(item);
        if (list.length > this.MAX_ITEMS) list.length = this.MAX_ITEMS;
        this.save(list);
        return item;
    },

    /** Mark all notifications as read */
    markAllRead() {
        const list = this.load().map(n => ({ ...n, read: true }));
        this.save(list);
    },

    /** Count unread notifications */
    unreadCount() {
        return this.load().filter(n => !n.read).length;
    },

    /**
     * Format relative time: "Just now", "2m ago", "1h ago", "3d ago"
     */
    formatTime(isoString) {
        const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
        const T = LANG[App.currentLang];
        if (diff < 60)   return T.notif_time_now   || 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}${T.notif_time_m  || 'm'} ago`;
        if (diff < 86400)return `${Math.floor(diff / 3600)}${T.notif_time_h || 'h'} ago`;
        return `${Math.floor(diff / 86400)}${T.notif_time_d || 'd'} ago`;
    }
};

/* ============================================================
   LANGUAGE / TRANSLATION SYSTEM (✅ PRESERVED + ✨ EXTENDED)
============================================================ */
const LANG = {
    en: {
        // Navbar
        search_placeholder:  "Search transactions...",
        add_new:             "Add New",
        settings:            "Settings",
        logout:              "Logout",
        monthly_income:      "Income",
        monthly_expense:     "Expense",
        savings_rate:        "Savings",
        transactions:        "Transactions",

        // Notifications
        notifications:       "Notifications",
        mark_all_read:       "Mark all read",
        no_notifications:    "No notifications yet",
        notif_balance_now:   "Your balance is now",
        notif_income_added:  "Income added",
        notif_expense_added: "Expense added",
        notif_deleted:       "Transaction removed",
        notif_time_now:      "Just now",
        notif_time_m:        "m",
        notif_time_h:        "h",
        notif_time_d:        "d",

        // Sidebar nav
        nav_dashboard:    "Dashboard",
        nav_add_income:   "Add Income",
        nav_add_expense:  "Add Expense",
        nav_transactions: "Transactions",
        nav_reports:      "Reports",
        nav_settings:     "Settings",

        // Quick categories
        quick_categories: "Quick Categories",
        cat_salary:       "Salary",
        cat_investment:   "Invest",
        cat_food:         "Food",
        cat_health:       "Health",
        cat_shopping:     "Shop",

        // Main content
        greeting_sub:    "Here's your financial overview",
        total_balance:   "Total Balance",
        available_funds: "Available funds",
        total_income:    "Total Income",
        total_expense:   "Total Expense",
        this_period:     "This period",
        recent_activity: "Recent Activity",
        filter_all:      "All",
        filter_income:   "Income",
        filter_expense:  "Expense",
        no_transactions: "No transactions found.",
        add_first:       "Add your first entry",

        // Right sidebar
        monthly_summary:    "Monthly Summary",
        income:             "Income",
        expense:            "Expense",
        category_breakdown: "Category Breakdown",
        quick_stats:        "Quick Stats",
        avg_entry:          "Avg. Entry",
        largest_entry:      "Largest",
        categories:         "Categories",
        quick_add:          "Quick Add",
        no_data:            "No data yet",

        // Modals
        new_entry:       "New Entry",
        what_to_record:  "What would you like to record?",
        income_hint:     "Salary, Business, etc.",
        expense_hint:    "Food, Rent, etc.",
        cancel:          "Cancel",
        add_income:      "Add Income",
        add_expense:     "Add Expense",
        amount:          "Amount",
        category:        "Category",
        note:            "Note",
        note_placeholder:"Add a description...",
        confirm:         "Confirm",

        // Toast
        toast_added:   "Transaction added! ✓",
        toast_deleted: "Deleted successfully",
        toast_error:   "Something went wrong",
        delete_confirm:"Delete this entry?",

        // Greeting
        greeting_morning:   "Good morning 👋",
        greeting_afternoon: "Good afternoon 👋",
        greeting_evening:   "Good evening 👋",
        greeting_night:     "Good night 👋",
    },

    my: {
        // Navbar
        search_placeholder:  "ငွေပေးငွေယူ ရှာဖွေမည်...",
        add_new:             "အသစ် ထည့်မည်",
        settings:            "ဆက်တင်များ",
        logout:              "ထွက်မည်",
        monthly_income:      "ဝင်ငွေ",
        monthly_expense:     "ကုန်ကျငွေ",
        savings_rate:        "စုဆောင်းမှု",
        transactions:        "ငွေပေးငွေယူ",

        // Notifications
        notifications:       "အကြောင်းကြားချက်များ",
        mark_all_read:       "အားလုံး ဖတ်ပြီးပြု",
        no_notifications:    "အကြောင်းကြားချက် မရှိသေးပါ",
        notif_balance_now:   "လက်ကျန်ငွေ ယခု",
        notif_income_added:  "ဝင်ငွေ ထည့်ပြီး",
        notif_expense_added: "ကုန်ကျငွေ ထည့်ပြီး",
        notif_deleted:       "ငွေပေးငွေယူ ဖျက်လိုက်ပြီ",
        notif_time_now:      "ယခုလေးတင်",
        notif_time_m:        "မိနစ်",
        notif_time_h:        "နာရီ",
        notif_time_d:        "ရက်",

        // Sidebar nav
        nav_dashboard:    "ပင်မစာမျက်နှာ",
        nav_add_income:   "ဝင်ငွေ ထည့်မည်",
        nav_add_expense:  "ကုန်ကျငွေ ထည့်မည်",
        nav_transactions: "ငွေပေးငွေယူ",
        nav_reports:      "အစီရင်ခံစာ",
        nav_settings:     "ဆက်တင်များ",

        // Quick categories
        quick_categories: "အမျိုးအစားများ",
        cat_salary:       "လစာ",
        cat_investment:   "ရင်းနှီးမြှုပ်နှံမှု",
        cat_food:         "အစားအသောက်",
        cat_health:       "ကျန်းမာရေး",
        cat_shopping:     "ကုန်ဝယ်ခြင်း",

        // Main content
        greeting_sub:    "သင်၏ ငွေကြေးခြုံငုံသုံးသပ်ချက်",
        total_balance:   "စုစုပေါင်းလက်ကျန်ငွေ",
        available_funds: "ရရှိနိုင်သောငွေ",
        total_income:    "စုစုပေါင်းဝင်ငွေ",
        total_expense:   "စုစုပေါင်းကုန်ကျငွေ",
        this_period:     "ယခုကာလ",
        recent_activity: "မကြာသေးမီ လုပ်ဆောင်ချက်",
        filter_all:      "အားလုံး",
        filter_income:   "ဝင်ငွေ",
        filter_expense:  "ကုန်ကျငွေ",
        no_transactions: "ငွေပေးငွေယူ မတွေ့ပါ။",
        add_first:       "ပထမဆုံး ထည့်မည်",

        // Right sidebar
        monthly_summary:    "လစဉ် အကျဉ်းချုပ်",
        income:             "ဝင်ငွေ",
        expense:            "ကုန်ကျငွေ",
        category_breakdown: "အမျိုးအစားအလိုက်",
        quick_stats:        "အမြန်စာရင်းအင်း",
        avg_entry:          "ပျမ်းမျှ",
        largest_entry:      "အများဆုံး",
        categories:         "အမျိုးအစား",
        quick_add:          "အမြန် ထည့်မည်",
        no_data:            "ဒေတာ မရှိသေးပါ",

        // Modals
        new_entry:       "အသစ် ထည့်မည်",
        what_to_record:  "ဘာကို မှတ်တမ်းတင်မည်နည်း?",
        income_hint:     "လစာ၊ စီးပွားရေး၊ စသည်",
        expense_hint:    "အစားအသောက်၊ အငှား၊ စသည်",
        cancel:          "မလုပ်တော့ပါ",
        add_income:      "ဝင်ငွေ ထည့်မည်",
        add_expense:     "ကုန်ကျငွေ ထည့်မည်",
        amount:          "ပမာဏ",
        category:        "အမျိုးအစား",
        note:            "မှတ်ချက်",
        note_placeholder:"ဖော်ပြချက် ထည့်ပါ...",
        confirm:         "အတည်ပြု",

        // Toast
        toast_added:   "ထည့်သွင်းပြီးပါပြီ ✓",
        toast_deleted: "ဖျက်ပြီးပါပြီ",
        toast_error:   "တစ်ခုခု မှားယွင်းနေသည်",
        delete_confirm:"ဤ မှတ်တမ်းကို ဖျက်မည်လား?",

        // Greeting
        greeting_morning:   "မင်္ဂလာနံနက်ခင်း 👋",
        greeting_afternoon: "မင်္ဂလာနေ့လည်ခင်း 👋",
        greeting_evening:   "မင်္ဂလာညနေခင်း 👋",
        greeting_night:     "မင်္ဂလာညမနက် 👋",
    }
};

/* ============================================================
   UI HELPER — dynamic category filtering (✅ PRESERVED)
============================================================ */
const UI = {
    filterCategories(type) {
        const select = document.getElementById("category");
        if (!select) return;
        select.innerHTML = "";
        const list = App.categories[type] || App.categories.expense;
        list.forEach(cat => {
            const opt = document.createElement("option");
            opt.value = cat;
            opt.textContent = UI.translateCategory(cat);
            select.appendChild(opt);
        });
    },

    catTranslations: {
        my: {
            Salary:     "လစာ",
            Business:   "စီးပွားရေး",
            Investment: "ရင်းနှီးမြှုပ်နှံမှု",
            Bonus:      "ဘောနပ်စ်",
            Other:      "အခြား",
            Food:       "အစားအသောက်",
            Transport:  "သယ်ယူပို့ဆောင်ရေး",
            Shopping:   "ကုန်ဝယ်ခြင်း",
            Health:     "ကျန်းမာရေး",
            Rent:       "အငှားဝင်ငွေ",
            Bill:       "ဘေလ်",
        }
    },

    translateCategory(cat) {
        if (App.currentLang === 'my' && UI.catTranslations.my[cat]) {
            return UI.catTranslations.my[cat];
        }
        return cat;
    }
};

/* ============================================================
   TRANSLATION SYSTEM (✅ PRESERVED + EXTENDED)
============================================================ */
function applyTranslations() {
    const T = LANG[App.currentLang];

    // data-i18n → textContent
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (T[key] !== undefined) el.textContent = T[key];
    });

    // data-i18n-ph → placeholder
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        if (T[key] !== undefined) el.placeholder = T[key];
    });

    // Lang label
    const langLabel = document.getElementById('lang-label');
    if (langLabel) langLabel.textContent = App.currentLang === 'en' ? 'EN' : 'မြ';

    document.documentElement.lang = App.currentLang === 'en' ? 'en' : 'my';

    updateGreeting();

    // Refresh notification panel text if open
    renderNotifPanel();

    if (App.transactions.length === 0) renderFeed();
}

function toggleLanguage() {
    App.currentLang = App.currentLang === 'en' ? 'my' : 'en';
    applyTranslations();
    const transType = document.getElementById('trans-type')?.value;
    if (transType && document.getElementById('transaction-modal')?.style.display === 'flex') {
        UI.filterCategories(transType);
    }
    showToast(App.currentLang === 'en' ? 'Switched to English' : 'မြန်မာဘာသာ ပြောင်းလဲပြီ');
}

function updateGreeting() {
    const T = LANG[App.currentLang];
    const h = new Date().getHours();
    let key = 'greeting_morning';
    if (h >= 12 && h < 17)       key = 'greeting_afternoon';
    else if (h >= 17 && h < 21)  key = 'greeting_evening';
    else if (h >= 21 || h < 5)   key = 'greeting_night';
    const greetEl = document.getElementById('greeting-text');
    if (greetEl) greetEl.textContent = T[key];
}

/** Shorthand translation getter */
function t(key) {
    return LANG[App.currentLang][key] || key;
}

/* ============================================================
   NOTIFICATION PANEL RENDERING
============================================================ */

/**
 * Render all notifications into the dropdown panel.
 * Called after every add/delete and on lang switch.
 */
function renderNotifPanel() {
    const list     = Notif.load();
    const listEl   = document.getElementById('notif-list');
    const emptyEl  = document.getElementById('notif-empty');
    const badgeEl  = document.getElementById('notif-badge');
    const markAll  = document.getElementById('notif-mark-all');
    if (!listEl) return;

    // Empty state
    if (list.length === 0) {
        listEl.innerHTML = '';
        if (emptyEl) {
            emptyEl.style.display = 'block';
            const p = emptyEl.querySelector('p');
            if (p) p.textContent = t('no_notifications');
        }
        badgeEl && (badgeEl.style.display = 'none');
        return;
    }

    // Hide built-in empty state if we have items
    if (emptyEl) emptyEl.style.display = 'none';

    // Update badge
    const unread = Notif.unreadCount();
    if (badgeEl) {
        if (unread > 0) {
            badgeEl.style.display = 'flex';
            badgeEl.textContent   = unread > 9 ? '9+' : unread;
        } else {
            badgeEl.style.display = 'none';
        }
    }

    // Update "Mark all read" visibility
    if (markAll) markAll.style.display = unread > 0 ? 'block' : 'none';

    // Build notification items HTML
    listEl.innerHTML = list.map((n, idx) => {
        const iconClass   = n.type === 'income'  ? 'income-notif'
                          : n.type === 'expense' ? 'expense-notif'
                          : 'info-notif';
        const iconSymbol  = n.type === 'income'  ? 'fas fa-arrow-trend-up'
                          : n.type === 'expense' ? 'fas fa-arrow-trend-down'
                          : 'fas fa-bell';
        const unreadClass = n.read ? '' : 'unread';
        const timeStr     = Notif.formatTime(n.timestamp);

        return `
            <div class="notif-item ${unreadClass}" data-id="${n.id}" style="animation-delay:${idx * 0.04}s">
                <div class="notif-icon-wrap ${iconClass}">
                    <i class="${iconSymbol}"></i>
                </div>
                <div class="notif-body">
                    <div class="notif-msg">${escHtml(n.message)}</div>
                    ${n.subtext ? `<div class="notif-sub">${escHtml(n.subtext)}</div>` : ''}
                </div>
                <div class="notif-time">${timeStr}</div>
            </div>
        `;
    }).join('');
}

/**
 * Generate and store a balance-change notification after a transaction.
 * Called from renderUI() every time data re-renders after a DB write.
 * @param {number} newBalance   - Calculated new balance
 * @param {string} txType       - 'income' | 'expense'
 * @param {number} txAmount     - Transaction amount just added
 * @param {string} txCategory   - Category of transaction
 */
function pushBalanceNotification(newBalance, txType, txAmount, txCategory) {
    const isInc = txType === 'income';
    const sign  = isInc ? '+' : '-';

    const message = `${t('notif_balance_now')} $${newBalance.toFixed(2)}`;
    const subtext = `${isInc ? t('notif_income_added') : t('notif_expense_added')}: ${sign}$${txAmount.toFixed(2)} · ${UI.translateCategory(txCategory)}`;

    Notif.add(txType, message, subtext);
    renderNotifPanel(); // refresh panel immediately
}

/**
 * Generate a "deleted" notification after a transaction is removed.
 * @param {number} newBalance - Balance after deletion
 */
function pushDeleteNotification(newBalance) {
    const message = `${t('notif_deleted')} · ${t('notif_balance_now')} $${newBalance.toFixed(2)}`;
    Notif.add('info', message, '');
    renderNotifPanel();
}

/** Toggle the notification dropdown panel */
window.toggleNotifPanel = function() {
    const panel = document.getElementById('notif-dropdown');
    const btn   = document.getElementById('notif-btn');
    if (!panel) return;

    const isOpen = panel.classList.toggle('show');
    btn?.setAttribute('aria-expanded', isOpen);

    if (isOpen) {
        // Close profile dropdown if open
        document.getElementById('profile-dropdown')?.classList.remove('show');
        // Render fresh content
        renderNotifPanel();
    }
};

/** Mark all notifications as read and re-render */
window.markAllNotificationsRead = function() {
    Notif.markAllRead();
    renderNotifPanel();
};

/* ============================================================
   TOAST NOTIFICATIONS
============================================================ */
let toastTimer = null;

function showToast(message, type = 'default') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.className   = `toast ${type} show`;
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ============================================================
   INITIALIZATION
============================================================ */
document.addEventListener("DOMContentLoaded", async () => {
    applyTranslations();
    renderNotifPanel();   // show any persisted notifications immediately
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

/* ============================================================
   EVENT LISTENERS
============================================================ */
function setupEventListeners() {

    // Language toggle
    document.getElementById("lang-toggle")?.addEventListener("click", toggleLanguage);

    // Theme toggle
    document.getElementById("theme-toggle")?.addEventListener("click", () => {
        const isLight = document.body.classList.toggle("light-mode");
        document.body.classList.toggle("dark-mode", !isLight);
        const icon = document.getElementById("theme-icon");
        if (icon) icon.className = isLight ? "fas fa-sun" : "fas fa-moon";
    });

    // Notification bell → toggle panel
    document.getElementById("notif-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleNotifPanel();
    });

    // Profile dropdown
    document.getElementById("profile-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        const dropdown = document.getElementById("profile-dropdown");
        const btn      = document.getElementById("profile-btn");
        const isOpen   = dropdown.classList.toggle("show");
        btn.setAttribute("aria-expanded", isOpen);
        if (isOpen) {
            // Close notif panel if open
            document.getElementById('notif-dropdown')?.classList.remove('show');
            document.getElementById('notif-btn')?.setAttribute('aria-expanded', 'false');
        }
    });

    // Close all dropdowns on outside click
    document.addEventListener("click", (e) => {
        if (!e.target.closest('.profile-wrapper')) {
            document.getElementById("profile-dropdown")?.classList.remove("show");
            document.getElementById("profile-btn")?.setAttribute("aria-expanded", "false");
        }
        if (!e.target.closest('.notif-wrapper')) {
            document.getElementById("notif-dropdown")?.classList.remove("show");
            document.getElementById("notif-btn")?.setAttribute("aria-expanded", "false");
        }
    });

    // Transaction form
    document.getElementById("transaction-form")?.addEventListener("submit", handleFormSubmit);

    // Logout
    document.getElementById("logout-confirm-btn")?.addEventListener("click", async () => {
        await db.auth.signOut();
        window.location.href = "index.html";
    });

    // Desktop search
    document.getElementById("search-input")?.addEventListener("input", (e) => {
        renderFeed(e.target.value.trim().toLowerCase());
    });

    // Mobile search trigger (inside greeting row)
    document.getElementById("mobile-search-trigger")?.addEventListener("click", () => {
        const bar = document.getElementById("mobile-search-bar");
        bar?.classList.toggle("show");
        if (bar?.classList.contains("show")) {
            document.getElementById("mobile-search-input")?.focus();
        }
    });

    // Mobile search input
    document.getElementById("mobile-search-input")?.addEventListener("input", (e) => {
        renderFeed(e.target.value.trim().toLowerCase());
    });

    // Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal();
            closeChoiceModal();
            closeSidebar();
            document.getElementById("notif-dropdown")?.classList.remove("show");
            document.getElementById("profile-dropdown")?.classList.remove("show");
        }
    });
}

/* ============================================================
   DATA OPERATIONS (✅ PRESERVED)
============================================================ */
async function fetchData() {
    const { data, error } = await db
        .from("transactions")
        .select("*")
        .eq("user_id", App.user.id)
        .order("created_at", { ascending: false });

    if (!error) {
        App.transactions = data;
        renderUI();
    } else {
        showToast(t('toast_error'), 'error');
    }
}

/**
 * ✅ PRESERVED: Insert transaction.
 * ✨ ENHANCED: Captures pre-insert balance, calculates post-insert balance,
 *              pushes a "Your balance is now $X" notification.
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    const saveBtn  = document.getElementById("save-btn");
    saveBtn.disabled = true;

    const txType     = document.getElementById("trans-type").value;
    const txAmount   = parseFloat(document.getElementById("amount").value);
    const txCategory = document.getElementById("category").value;
    const txNote     = document.getElementById("note").value.trim();

    const payload = {
        user_id:  App.user.id,
        type:     txType,
        amount:   txAmount,
        category: txCategory,
        note:     txNote
    };

    const { error } = await db.from("transactions").insert([payload]);

    if (!error) {
        closeModal();
        showToast(t('toast_added'), 'success');

        // Calculate new balance from current state + new transaction
        let incomeTotal  = 0, expenseTotal = 0;
        App.transactions.forEach(tr => {
            const a = Number(tr.amount);
            tr.type === 'income' ? incomeTotal += a : expenseTotal += a;
        });
        if (txType === 'income')  incomeTotal  += txAmount;
        else                      expenseTotal += txAmount;
        const newBalance = incomeTotal - expenseTotal;

        // ✨ Push balance notification
        pushBalanceNotification(newBalance, txType, txAmount, txCategory);

        await fetchData();
    } else {
        showToast(t('toast_error'), 'error');
    }
    saveBtn.disabled = false;
}

/**
 * ✅ PRESERVED: Delete transaction.
 * ✨ ENHANCED: Calculates new balance after deletion, pushes notification.
 */
async function deleteTransaction(id) {
    if (!confirm(t('delete_confirm'))) return;

    // Find transaction to get its values before deleting
    const tx = App.transactions.find(tr => String(tr.id) === String(id));

    const { error } = await db.from("transactions").delete().eq("id", id);
    if (!error) {
        showToast(t('toast_deleted'));

        // Compute new balance excluding this transaction
        let incomeTotal = 0, expenseTotal = 0;
        App.transactions.forEach(tr => {
            if (String(tr.id) === String(id)) return; // skip deleted
            const a = Number(tr.amount);
            tr.type === 'income' ? incomeTotal += a : expenseTotal += a;
        });
        const newBalance = incomeTotal - expenseTotal;

        // ✨ Push deletion notification
        pushDeleteNotification(newBalance);

        await fetchData();
    } else {
        showToast(t('toast_error'), 'error');
    }
}

/* ============================================================
   RENDER UI (✅ PRESERVED CALCULATIONS)
============================================================ */
function renderUI() {
    let incomeTotal = 0, expenseTotal = 0;

    App.transactions.forEach(tr => {
        const amt = Number(tr.amount);
        tr.type === 'income' ? incomeTotal += amt : expenseTotal += amt;
    });

    const balance = incomeTotal - expenseTotal;

    // ✅ PRESERVED: Balance display
    setEl("main-balance",  `$${balance.toFixed(2)}`);
    setEl("total-income",  `+$${incomeTotal.toFixed(2)}`);
    setEl("total-expense", `-$${expenseTotal.toFixed(2)}`);

    renderFeed();
    renderRightSidebar(incomeTotal, expenseTotal);
    renderDropdownStats(incomeTotal, expenseTotal);
}

/* ============================================================
   FEED RENDERING (✅ PRESERVED)
============================================================ */
function renderFeed(searchTerm = '') {
    const list = document.getElementById("transaction-list");
    if (!list) return;
    list.innerHTML = '';

    const catIcons = {
        salary: 'fas fa-money-bill-trend-up', business: 'fas fa-briefcase',
        investment: 'fas fa-chart-line', bonus: 'fas fa-gift',
        food: 'fas fa-burger', transport: 'fas fa-car',
        shopping: 'fas fa-bag-shopping', health: 'fas fa-kit-medical',
        rent: 'fas fa-house', bill: 'fas fa-file-invoice',
        other: 'fas fa-circle-dot',
    };

    const filtered = App.transactions.filter(tr => {
        const typeOk   = App.currentFilter === 'all' || tr.type === App.currentFilter;
        const term     = searchTerm.toLowerCase();
        const searchOk = !term
            || (tr.category || '').toLowerCase().includes(term)
            || (tr.note || '').toLowerCase().includes(term);
        return typeOk && searchOk;
    });

    if (filtered.length === 0) {
        list.innerHTML = `
            <div class="feed-empty-state">
                <i class="fas fa-receipt"></i>
                <p>${t('no_transactions')}</p>
                <button onclick="showChoiceModal()">${t('add_first')}</button>
            </div>`;
        return;
    }

    filtered.forEach((tr, i) => {
        const amt       = Number(tr.amount);
        const isInc     = tr.type === 'income';
        const catKey    = (tr.category || '').toLowerCase();
        const icon      = catIcons[catKey] || 'fas fa-circle-dot';
        const dateStr   = tr.created_at
            ? new Date(tr.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : '';
        const displayCat = UI.translateCategory(tr.category || '');

        const item = document.createElement("div");
        item.className = `transaction-item type-${tr.type}`;
        item.style.animationDelay = `${Math.min(i * 0.045, 0.55)}s`;
        item.setAttribute('role', 'article');

        item.innerHTML = `
            <div class="trans-cat-icon ${isInc ? 'income-bg' : 'expense-bg'}">
                <i class="${icon}"></i>
            </div>
            <div class="trans-body">
                <div class="trans-category">${displayCat}</div>
                <div class="trans-note">${tr.note || '—'}</div>
            </div>
            <div class="trans-meta">
                <span class="trans-amount ${isInc ? 'income-color' : 'expense-color'}">
                    ${isInc ? '+' : '-'}$${amt.toFixed(2)}
                </span>
                <span class="trans-date">${dateStr}</span>
                <span class="trans-type-badge ${isInc ? 'income-badge' : 'expense-badge'}">
                    ${isInc ? t('income') : t('expense')}
                </span>
            </div>
            <button class="delete-btn" onclick="deleteTransaction('${tr.id}')" title="Delete">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        list.appendChild(item);
    });
}

/* ============================================================
   RIGHT SIDEBAR (✅ PRESERVED)
============================================================ */
function renderRightSidebar(incomeTotal, expenseTotal) {
    const max = Math.max(incomeTotal, expenseTotal, 1);

    const incBar = document.getElementById('income-bar');
    const expBar = document.getElementById('expense-bar');
    if (incBar) incBar.style.width = `${((incomeTotal  / max) * 100).toFixed(1)}%`;
    if (expBar) expBar.style.width = `${((expenseTotal / max) * 100).toFixed(1)}%`;

    setEl('rs-income',  `$${incomeTotal.toFixed(0)}`);
    setEl('rs-expense', `$${expenseTotal.toFixed(0)}`);

    const savingsRate = incomeTotal > 0
        ? Math.max(0, ((incomeTotal - expenseTotal) / incomeTotal) * 100)
        : 0;
    const srEl = document.getElementById('savings-rate');
    if (srEl) {
        srEl.textContent = `${savingsRate.toFixed(1)}%`;
        srEl.style.color = savingsRate >= 30 ? 'var(--income)'
                         : savingsRate  > 0  ? 'var(--primary)'
                         : 'var(--expense)';
    }

    // Category breakdown
    const catMap    = {};
    const catColors = ['#06b6d4','#10b981','#f59e0b','#8b5cf6','#f43f5e','#3b82f6','#ec4899','#f97316'];
    App.transactions.forEach(tr => {
        const cat = tr.category || 'Other';
        catMap[cat] = (catMap[cat] || 0) + Number(tr.amount);
    });

    const breakdown = document.getElementById('category-breakdown');
    if (breakdown) {
        const sorted = Object.entries(catMap).sort((a, b) => b[1] - a[1]).slice(0, 6);
        breakdown.innerHTML = sorted.length === 0
            ? `<p class="rs-empty">${t('no_data')}</p>`
            : sorted.map(([cat, amt], idx) => `
                <div class="cat-breakdown-row">
                    <span class="cat-breakdown-dot" style="background:${catColors[idx % catColors.length]}"></span>
                    <span class="cat-breakdown-name">${UI.translateCategory(cat)}</span>
                    <span class="cat-breakdown-amt">$${amt.toFixed(0)}</span>
                </div>`).join('');
    }

    // Quick stats
    const count   = App.transactions.length;
    const amounts = App.transactions.map(tr => Number(tr.amount));
    const avg     = count > 0 ? amounts.reduce((a, b) => a + b, 0) / count : 0;
    const largest = count > 0 ? Math.max(...amounts) : 0;
    const cats    = new Set(App.transactions.map(tr => tr.category)).size;

    setEl('stat-count',   count);
    setEl('stat-avg',     `$${avg.toFixed(0)}`);
    setEl('stat-largest', `$${largest.toFixed(0)}`);
    setEl('stat-cats',    cats);
}

/* ============================================================
   DROPDOWN MINI STATS (✅ PRESERVED)
============================================================ */
function renderDropdownStats(incomeTotal, expenseTotal) {
    const savingsRate = incomeTotal > 0
        ? Math.max(0, ((incomeTotal - expenseTotal) / incomeTotal) * 100)
        : 0;
    setEl('dm-income',  `$${incomeTotal.toFixed(0)}`);
    setEl('dm-expense', `$${expenseTotal.toFixed(0)}`);
    setEl('dm-savings', `${savingsRate.toFixed(0)}%`);
    setEl('dm-count',   App.transactions.length);
}

/* ============================================================
   USER PROFILE (✅ PRESERVED)
============================================================ */
function updateUserProfileUI() {
    const name     = App.user.user_metadata?.full_name || "User";
    const email    = App.user.email || "";
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=06b6d4&color=fff&bold=true`;

    setEl('user-display-name',  name);
    setEl('user-display-email', email);
    setSrcAttr('user-avatar',       avatarUrl);
    setSrcAttr('dropdown-avatar',   avatarUrl);
    setSrcAttr('sidebar-avatar',    avatarUrl);
    setEl('sidebar-username',   name);
    setEl('sidebar-useremail',  email);
}

/* ============================================================
   MODAL CONTROLS (✅ PRESERVED)
============================================================ */
window.openModal = function(type) {
    document.getElementById("trans-type").value = type;

    // ✅ PRESERVED: dynamic category filtering
    UI.filterCategories(type);

    const isInc = type === 'income';
    setEl("modal-form-title", t(isInc ? 'add_income' : 'add_expense'));

    const header = document.getElementById("modal-header-bar");
    const badge  = document.getElementById("modal-type-badge");
    if (header) header.className = `modal-card-header ${type}-header`;
    if (badge)  badge.textContent = isInc ? `💰 ${t('income')}` : `💸 ${t('expense')}`;

    document.getElementById("transaction-modal").style.display = "flex";
    setTimeout(() => document.getElementById("amount")?.focus(), 80);
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

// ✅ PRESERVED: selectChoice
window.selectChoice = function(type) {
    closeChoiceModal();
    openModal(type);
};

// ✅ PRESERVED: catAction — pre-selects category
window.catAction = function(type, categoryName) {
    openModal(type);
    setTimeout(() => {
        const select = document.getElementById("category");
        if (select) {
            Array.from(select.options).forEach(opt => {
                if (opt.value === categoryName) select.value = categoryName;
            });
        }
    }, 60);
};

/* ============================================================
   NAVIGATION (✅ PRESERVED)
============================================================ */
window.navigateTo = function(page) {
    console.log("Navigate to:", page);
    // Extend with actual routing as needed
};

window.setActiveNav = function(el) {
    document.querySelectorAll(".sidebar-link").forEach(l => l.classList.remove("active"));
    el?.classList.add("active");
};

window.setBottomNav = function(el) {
    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
    el?.classList.add("active");
};

/* ============================================================
   FEED FILTER (✅ PRESERVED)
============================================================ */
window.filterFeed = function(type, btn) {
    App.currentFilter = type;
    document.querySelectorAll(".feed-filter-btn").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    const search = document.getElementById("search-input")?.value?.toLowerCase()
                || document.getElementById("mobile-search-input")?.value?.toLowerCase()
                || '';
    renderFeed(search);
};

/* ============================================================
   SIDEBAR TOGGLE (✅ PRESERVED)
============================================================ */
window.toggleSidebar = function() {
    const sidebar = document.getElementById("left-sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    const btn     = document.getElementById("hamburger-btn");
    const isOpen  = sidebar?.classList.toggle("open");
    overlay?.classList.toggle("show", isOpen);
    btn?.classList.toggle("is-open", isOpen);
    btn?.setAttribute("aria-expanded", isOpen);
};

window.closeSidebar = function() {
    document.getElementById("left-sidebar")?.classList.remove("open");
    document.getElementById("sidebar-overlay")?.classList.remove("show");
    const btn = document.getElementById("hamburger-btn");
    btn?.classList.remove("is-open");
    btn?.setAttribute("aria-expanded", "false");
};

window.closeSidebarOnMobile = function() {
    if (window.innerWidth <= 699) closeSidebar();
};

/* ============================================================
   MOBILE SEARCH
============================================================ */
window.closeMobileSearch = function() {
    const bar = document.getElementById("mobile-search-bar");
    bar?.classList.remove("show");
    const input = document.getElementById("mobile-search-input");
    if (input) { input.value = ''; renderFeed(''); }
};

/* ============================================================
   UTILITY HELPERS
============================================================ */
function setEl(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
}

function setSrcAttr(id, src) {
    const el = document.getElementById(id);
    if (el) el.src = src;
}

/** HTML-escape user text to prevent XSS in notification messages */
function escHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
