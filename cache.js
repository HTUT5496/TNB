/**
 * cache.js — Shared smart-cache layer for TNB Dashboard
 *
 * Strategy
 * ────────
 * All transaction + notification data is stored in localStorage under
 * versioned keys.  A TTL (default 5 min) gates automatic re-fetches.
 * A "Last Updated" timestamp is surfaced in the UI.
 * A manual Refresh button bypasses the TTL and forces a reload.
 *
 * Both dashboard.js and history.js import this module by simply including
 * <script src="cache.js"></script> BEFORE their own script tag.
 */

"use strict";

/* ── Cache configuration ──────────────────────────────────────────── */
const CACHE = {
  TTL_MS:   5 * 60 * 1000,   // 5 minutes before data is considered stale
  VERSION:  "v2",            // Bump this string whenever the stored data schema changes.
                             // v1 → v2: added LAST_UPDATED + SYNC_SIGNAL keys

  KEYS: {
    TRANSACTIONS:  "novapay_transactions",
    NOTIFICATIONS: "novapay_notifications",
    LAST_UPDATED:  "novapay_last_updated",
    CACHE_VER:     "novapay_cache_ver",
    SYNC_SIGNAL:   "novapay_sync_signal",  // FIX: must be in KEYS so _guardVersion wipes it on version bumps
  },
};

/* ── Low-level storage helpers ────────────────────────────────────── */
const _lsSet = (k, v) => {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
};

const _lsGet = (k, fallback = null) => {
  try {
    const raw = localStorage.getItem(k);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
};

/* ── Version guard: wipe stale cache on schema changes ────────────── */
(function _guardVersion() {
  const stored = _lsGet(CACHE.KEYS.CACHE_VER, null);
  if (stored !== CACHE.VERSION) {
    // Only clear our own keys, not theme/lang/user prefs
    Object.values(CACHE.KEYS).forEach((k) => localStorage.removeItem(k));
    _lsSet(CACHE.KEYS.CACHE_VER, CACHE.VERSION);
  }
})();

/* ── Public cache API (attached to window so both pages share it) ── */
window.AppCache = {

  /**
   * isFresh()
   * Returns true if data was loaded within the TTL window.
   * Note: callers should bypass this entirely for manual refreshes —
   * both dashboard.js and history.js check their own force flag before
   * calling isFresh(), so no force parameter is needed here.
   */
  isFresh() {
    const ts = _lsGet(CACHE.KEYS.LAST_UPDATED, 0);
    return (Date.now() - ts) < CACHE.TTL_MS;
  },

  /** Read transactions from cache (never triggers a fetch) */
  getTransactions() {
    return _lsGet(CACHE.KEYS.TRANSACTIONS, []);
  },

  /** Write transactions to cache and stamp timestamp */
  setTransactions(txns) {
    _lsSet(CACHE.KEYS.TRANSACTIONS, txns);
    _lsSet(CACHE.KEYS.LAST_UPDATED, Date.now());
    this._broadcastUpdate();
  },

  /** Read notifications from cache */
  getNotifications() {
    return _lsGet(CACHE.KEYS.NOTIFICATIONS, []);
  },

  /** Write notifications to cache */
  setNotifications(notifs) {
    _lsSet(CACHE.KEYS.NOTIFICATIONS, notifs);
    this._broadcastUpdate();  // FIX: was missing — notification changes (clear, mark-read) now cross-tab sync
  },

  /** Return the ISO timestamp string of the last successful load */
  getLastUpdated() {
    const ts = _lsGet(CACHE.KEYS.LAST_UPDATED, null);
    return ts ? new Date(ts) : null;
  },

  /**
   * Format a human-readable "Last updated X ago / at HH:MM" string.
   * Used by both pages to populate the UI chip.
   */
  formatLastUpdated() {
    const date = this.getLastUpdated();
    if (!date) return "Never synced";
    const secs = Math.floor((Date.now() - date) / 1000);
    if (secs < 5)   return "Just now";
    if (secs < 60)  return `${secs}s ago`;
    if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  },

  /** Milliseconds until cache expires (negative = already expired) */
  msUntilExpiry() {
    const ts = _lsGet(CACHE.KEYS.LAST_UPDATED, 0);
    return CACHE.TTL_MS - (Date.now() - ts);
  },

  /**
   * clearAll()
   * Wipes all cache data and resets the timestamp.
   * Called on logout so stale user data does not persist.
   * dashboard.js also has its own clearAppData() which calls this.
   */
  clearAll() {
    [
      CACHE.KEYS.TRANSACTIONS,
      CACHE.KEYS.NOTIFICATIONS,
      CACHE.KEYS.LAST_UPDATED,
      CACHE.KEYS.SYNC_SIGNAL,
    ].forEach((k) => localStorage.removeItem(k));
  },

  /**
   * Notify other open tabs/pages that data changed.
   *
   * Two-channel broadcast:
   * 1. localStorage sentinel — fires the "storage" event on OTHER tabs/windows.
   *    dashboard.js listens via window._onCacheUpdate (set in wire()).
   * 2. CustomEvent "cacheupdate" on window — fires on THIS tab immediately.
   *    history.js listens via addEventListener("cacheupdate", ...) in wire().
   *
   * FIX: previously only used the storage sentinel, so history.js's
   * addEventListener("cacheupdate") listener never fired on the same tab.
   */
  _broadcastUpdate() {
    _lsSet(CACHE.KEYS.SYNC_SIGNAL, Date.now());
    window.dispatchEvent(new CustomEvent("cacheupdate"));
  },
};

/* ── Cross-tab sync listener ──────────────────────────────────────── */
/*
 * When dashboard.js (or any tab) calls setTransactions / setNotifications,
 * _broadcastUpdate writes novapay_sync_signal.  The browser fires the
 * "storage" event on every OTHER open tab/window.
 *
 * We dispatch "cacheupdate" so history.js's addEventListener("cacheupdate")
 * handler fires on the receiving tab too, keeping both listener styles working.
 *
 * FIX: previously only called window._onCacheUpdate() — this only worked for
 * dashboard.js (which sets that property).  history.js uses addEventListener
 * so it never received cross-tab updates.
 */
window.addEventListener("storage", (e) => {
  if (e.key === CACHE.KEYS.SYNC_SIGNAL) {
    // Support both listener styles used by dashboard.js and history.js
    window.dispatchEvent(new CustomEvent("cacheupdate"));
    if (typeof window._onCacheUpdate === "function") {
      window._onCacheUpdate();
    }
  }
});
