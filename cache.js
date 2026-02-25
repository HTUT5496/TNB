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
  VERSION:  "v2",            // bump to invalidate all existing caches

  KEYS: {
    TRANSACTIONS:  "novapay_transactions",
    NOTIFICATIONS: "novapay_notifications",
    LAST_UPDATED:  "novapay_last_updated",
    CACHE_VER:     "novapay_cache_ver",
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
   * Pass force=true to always return false (manual refresh).
   */
  isFresh(force = false) {
    if (force) return false;
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
   * Notify other open tabs/pages that data changed.
   * Uses the storage event so history.js refreshes when dashboard adds a txn.
   */
  _broadcastUpdate() {
    // Toggling a sentinel key triggers the storage event on other tabs
    _lsSet("novapay_sync_signal", Date.now());
  },
};

/* ── Cross-tab sync listener ──────────────────────────────────────── */
window.addEventListener("storage", (e) => {
  if (e.key === "novapay_sync_signal" && typeof window._onCacheUpdate === "function") {
    window._onCacheUpdate();
  }
});
