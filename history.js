"use strict";

/* ── CONFIG — replace with environment variables in production ── */
const CONFIG = {
  supabaseUrl: "https://lqfjeamzbxayfbjntarr.supabase.co",
  supabaseKey: "sb_publishable_jDExXkASC_jrulY8B7noFw_r9qut-vQ",
};

const { createClient } = supabase;
const _supabase = createClient(CONFIG.supabaseUrl, CONFIG.supabaseKey);

/* ═══════════════════════════════════════════
   1. TRANSLATIONS  (unchanged)
═══════════════════════════════════════════ */
const TRANSLATIONS = {
  en:{
    brand:"TNB",nav_dashboard:"Home",nav_transactions:"History",nav_reports:"Reports",nav_settings:"Settings",
    available_balance:"Balance",income:"Income",expense:"Expense",add_income:"Add Income",add_expense:"Add Expense",
    all_transactions:"All Transactions",all:"All",export_csv:"Export CSV",notifications:"Notifications",
    clear_all:"Clear All",no_notifs:"No notifications yet",amount:"Amount ($)",category:"Category",
    description:"Description",date:"Date",add_transaction:"Add Transaction",cancel:"Cancel",confirm:"Confirm",
    modal_income_title:"Add Income",modal_expense_title:"Add Expense",
    notif_balance_now:"Your balance is now",notif_added_income:"↑ Income Added",notif_added_expense:"↓ Expense Added",
    confirm_delete:"Delete this transaction?",confirm_delete_msg:"This action cannot be undone.",
    no_transactions:"No transactions yet",add_first:"Tap + to add your first entry",search_results:"Search Results",
    dark_mode:"Dark Mode",language:"Language",filter_type:"Type",start_date:"From",end_date:"To",
    apply_filter:"Apply Filter",reset_filter:"Reset",err_date_range:"Start date must be before end date.",
    err_date_required:"Please select both start and end dates.",filter_active:"Filter active",
    cat_salary:"Salary",cat_freelance:"Freelance",cat_investment:"Invest",cat_gift:"Gift",cat_other_income:"Other Income",
    cat_food:"Food",cat_transport:"Transport",cat_shopping:"Shopping",cat_bills:"Bills",cat_health:"Health",
    cat_entertainment:"Entertain",cat_education:"Education",cat_rent:"Rent",cat_other_expense:"Other",
  },
  my:{
    brand:"TNB",nav_dashboard:"ဒက်ရ်ဘုတ်",nav_transactions:"မှတ်တမ်း",nav_reports:"အစီရင်ခံ",nav_settings:"ဆက်တင်",
    available_balance:"လက်ကျန်",income:"ဝင်ငွေ",expense:"ထွက်ငွေ",add_income:"ဝင်ငွေထည့်",add_expense:"ထွက်ငွေထည့်",
    all_transactions:"ငွေသွင်း/ထုတ် အားလုံး",all:"အားလုံး",export_csv:"CSV ထုတ်ယူ",notifications:"အကြောင်းကြားချက်",
    clear_all:"အားလုံး ရှင်းလင်း",no_notifs:"အကြောင်းကြားချက် မရှိသေးပါ",amount:"ငွေပမာဏ ($)",category:"အမျိုးအစား",
    description:"ဖော်ပြချက်",date:"ရက်စွဲ",add_transaction:"ငွေသွင်း/ထုတ် ထည့်",cancel:"မလုပ်တော့",confirm:"အတည်ပြု",
    modal_income_title:"ဝင်ငွေ ထည့်သည်",modal_expense_title:"ထွက်ငွေ ထည့်သည်",
    notif_balance_now:"သင့်လက်ကျန်ငွေ",notif_added_income:"↑ ဝင်ငွေ ထည့်ပြီး",notif_added_expense:"↓ ထွက်ငွေ ထည့်ပြီး",
    confirm_delete:"ဤငွေလွှဲကို ဖျက်မလား?",confirm_delete_msg:"ဤလုပ်ဆောင်ချက်ကို ပြန်မလုပ်နိုင်ပါ။",
    no_transactions:"ငွေသွင်း/ထုတ် မရှိသေးပါ",add_first:"+ ကိုနှိပ်၍ ထည့်ပါ",search_results:"ရှာဖွေမှု ရလဒ်",
    dark_mode:"အမဲရောင် မုဒ်",language:"ဘာသာစကား",filter_type:"အမျိုးအစား",start_date:"စတင်ရက်",end_date:"ပြီးဆုံးရက်",
    apply_filter:"စစ်ထုတ်မည်",reset_filter:"ပြန်သတ်မှတ်",err_date_range:"စတင်ရက်သည် ပြီးဆုံးရက်မတိုင်မီ ဖြစ်ရမည်။",
    err_date_required:"ရက်စွဲ နှစ်ခု ရွေးပါ။",filter_active:"စစ်ထုတ်မှု ဖွင့်ထားသည်",
    cat_salary:"လစာ",cat_freelance:"ဖရီးလန်စ်",cat_investment:"ရင်းနှီး",cat_gift:"လက်ဆောင်",cat_other_income:"အခြား ဝင်ငွေ",
    cat_food:"အစားအသောက်",cat_transport:"သယ်ယူ",cat_shopping:"ဈေးဝယ်",cat_bills:"ဘီလ်",cat_health:"ကျန်းမာ",
    cat_entertainment:"အပျော်",cat_education:"ပညာ",cat_rent:"အငှားခ",cat_other_expense:"အခြား",
  },
};

/* ═══════════════════════════════════════════
   2. CATEGORIES  (unchanged)
═══════════════════════════════════════════ */
const CATEGORIES = {
  income:[
    {key:"cat_salary",icon:"💼"},{key:"cat_freelance",icon:"💻"},
    {key:"cat_investment",icon:"📈"},{key:"cat_gift",icon:"🎁"},{key:"cat_other_income",icon:"💰"},
  ],
  expense:[
    {key:"cat_food",icon:"🍜"},{key:"cat_transport",icon:"🚗"},{key:"cat_shopping",icon:"🛍️"},
    {key:"cat_bills",icon:"📄"},{key:"cat_health",icon:"💊"},{key:"cat_entertainment",icon:"🎬"},
    {key:"cat_education",icon:"📚"},{key:"cat_rent",icon:"🏠"},{key:"cat_other_expense",icon:"💸"},
  ],
};

/* ═══════════════════════════════════════════
   3. APP STATE  (unchanged)
═══════════════════════════════════════════ */
const S = {
  transactions:[],notifications:[],lang:"en",theme:"dark",notifEnabled:true,
  userName:"User",userAvatar:"",userEmail:"",userProvider:"",isSocialLogin:false,
  txnFilter:"all",txnDateFrom:"",txnDateTo:"",txnFilterActive:false,
  searchQuery:"",fabOpen:false,confirmCb:null,
};

/* ═══════════════════════════════════════════
   4. LOCAL STORAGE  (uses AppCache from cache.js)
═══════════════════════════════════════════ */
const LS = {
  transactions:"novapay_transactions",notifications:"novapay_notifications",
  lang:"novapay_lang",theme:"novapay_theme",notifEnabled:"novapay_notif",
  userName:"novapay_username",userAvatar:"novapay_avatar",userEmail:"novapay_email",
  userProvider:"novapay_provider",isSocialLogin:"novapay_social",
};

const lsSet=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch{}};
const lsGet=(k,fb)=>{try{const v=localStorage.getItem(k);return v!==null?JSON.parse(v):fb;}catch{return fb;}};

function loadState(){
  // ── CACHE GATE: read from AppCache, not a fresh fetch ──
  S.transactions  = AppCache.getTransactions();
  S.notifications = AppCache.getNotifications();
  S.lang          = lsGet(LS.lang,"en");
  S.theme         = lsGet(LS.theme,"dark");
  S.notifEnabled  = lsGet(LS.notifEnabled,true);
  S.userName      = lsGet(LS.userName,"User");
  S.userAvatar    = lsGet(LS.userAvatar,"");
  S.userEmail     = lsGet(LS.userEmail,"");
  S.userProvider  = lsGet(LS.userProvider,"");
  S.isSocialLogin = lsGet(LS.isSocialLogin,false);
}

// When we write transactions, update the cache timestamp too
const saveTxns   = () => AppCache.setTransactions(S.transactions);
const saveNotifs = () => AppCache.setNotifications(S.notifications);

/* ═══════════════════════════════════════════
   5. FINANCE CALCULATIONS  (unchanged)
═══════════════════════════════════════════ */
function calcTotals(){
  let inc=0,exp=0;
  for(const t of S.transactions){t.type==="income"?(inc+=t.amount):(exp+=t.amount);}
  return{inc,exp,bal:inc-exp};
}
const fmt=(n)=>new Intl.NumberFormat("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}).format(n);

/* ═══════════════════════════════════════════
   6. DOM HELPERS
═══════════════════════════════════════════ */
const $=(id)=>document.getElementById(id);
const setText=(id,v)=>{const e=$(id);if(e)e.textContent=v;};
const show=(el)=>{if(el)el.classList.remove("is-hidden");};
const hide=(el)=>{if(el)el.classList.add("is-hidden");};

/* ═══════════════════════════════════════════
   7. LAST UPDATED CHIP  ← NEW
═══════════════════════════════════════════ */
let _luTimer=null;

function updateLastUpdatedChip(){
  const chip=$("lastUpdatedChip");
  if(!chip)return;
  chip.textContent="Updated "+AppCache.formatLastUpdated();
}

function startLastUpdatedTicker(){
  clearInterval(_luTimer);
  updateLastUpdatedChip();
  _luTimer=setInterval(updateLastUpdatedChip,30_000);
}

/* ═══════════════════════════════════════════
   8. REFRESH LOGIC  ← NEW
═══════════════════════════════════════════ */
let _isRefreshing=false;

async function refreshData(force=true){
  if(_isRefreshing)return;
  if(!force&&AppCache.isFresh()){updateLastUpdatedChip();return;}

  _isRefreshing=true;
  const btn=$("refreshBtn");
  if(btn)btn.classList.add("spinning");

  // FIX #9: wrapped in try/finally so _isRefreshing is always reset even if an error occurs
  try{
    await new Promise(r=>setTimeout(r,420));

    S.transactions  = AppCache.getTransactions();
    S.notifications = AppCache.getNotifications();
    AppCache.setTransactions(S.transactions); // refresh timestamp

    updateTotals();
    renderTxnFeed();
    renderNotifPanel();
    updateLastUpdatedChip();
    startLastUpdatedTicker();
    showToast("info","History refreshed");
  }catch(err){
    console.error("refreshData failed:",err);
    showToast("error","Refresh failed — please try again");
  }finally{
    _isRefreshing=false;
    if(btn)btn.classList.remove("spinning");
  }
}

/* ═══════════════════════════════════════════
   9. UPDATE TOTALS  (unchanged)
═══════════════════════════════════════════ */
function updateTotals(){
  const{inc,exp,bal}=calcTotals();
  setText("r2Balance","$"+fmt(bal));
  setText("r2Income","$"+fmt(inc));
  setText("r2Expense","$"+fmt(exp));
}

/* ═══════════════════════════════════════════
   10. TRANSACTION CARD BUILDER  (unchanged)
═══════════════════════════════════════════ */
function getCatMeta(type,key){
  return(CATEGORIES[type]||[]).find(c=>c.key===key)||{icon:type==="income"?"💰":"💸"};
}

function makeTxnCard(txn,idx){
  const T=TRANSLATIONS[S.lang];
  const meta=getCatMeta(txn.type,txn.categoryKey);
  const lbl=T[txn.categoryKey]||txn.category;
  const sign=txn.type==="income"?"+":"-";
  const locale=S.lang==="my"?"my-MM":"en-US";
  const ds=txn.date?new Date(txn.date+"T00:00:00").toLocaleDateString(locale,{month:"short",day:"numeric",year:"numeric"}):"";
  const div=document.createElement("div");
  div.className="txn-card";div.dataset.type=txn.type;
  div.style.animationDelay=Math.min(idx*0.04,0.5)+"s";
  div.innerHTML=`
    <div class="txn-ico ${txn.type}">${meta.icon}</div>
    <div class="txn-info">
      <div class="txn-cat">${lbl}</div>
      <div class="txn-desc">${txn.description||""}</div>
    </div>
    <div class="txn-meta">
      <div class="txn-amt ${txn.type}">${sign}$${fmt(txn.amount)}</div>
      <div class="txn-date">${ds}</div>
    </div>
    <button class="txn-del" data-id="${txn.id}" title="Delete">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
        <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
      </svg>
    </button>`;
  div.querySelector(".txn-del").addEventListener("click",(e)=>{
    e.stopPropagation();
    const id=e.currentTarget.dataset.id;
    const T2=TRANSLATIONS[S.lang];
    showConfirm(T2.confirm_delete,T2.confirm_delete_msg,()=>deleteTxn(id));
  });
  return div;
}

function emptyEl(){
  const T=TRANSLATIONS[S.lang];
  const div=document.createElement("div");div.className="empty-state";
  div.innerHTML=`
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
      <path d="M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
      <path d="M16 3H8v4h8V3z"/>
    </svg>
    <p>${T.no_transactions}</p>
    <p class="empty-state-hint">${T.add_first}</p>`;
  return div;
}

/* ═══════════════════════════════════════════
   11. RENDER FEED  (unchanged)
═══════════════════════════════════════════ */
function renderTxnFeed(){
  const el=$("txnFeed");if(!el)return;
  let list=[...S.transactions].reverse().filter(t=>{
    const typeOk=S.txnFilter==="all"||t.type===S.txnFilter;
    let dateOk=true;
    if(S.txnFilterActive){
      if(S.txnDateFrom)dateOk=dateOk&&t.date>=S.txnDateFrom;
      if(S.txnDateTo)dateOk=dateOk&&t.date<=S.txnDateTo;
    }
    return typeOk&&dateOk;
  });
  el.innerHTML="";
  if(!list.length){el.appendChild(emptyEl());return;}
  list.forEach((t,i)=>{const card=makeTxnCard(t,i);card.style.animationDelay=`${i*0.03}s`;el.appendChild(card);});
}

/* ═══════════════════════════════════════════
   12. SEARCH  (unchanged)
═══════════════════════════════════════════ */
function renderSearch(q){
  const el=$("searchFeed");if(!el)return;
  const T=TRANSLATIONS[S.lang];const low=q.toLowerCase().trim();
  if(!low){el.innerHTML="";return;}
  const hits=[...S.transactions].reverse().filter(t=>{
    const label=(T[t.categoryKey]||t.category||"").toLowerCase();
    return label.includes(low)||(t.description||"").toLowerCase().includes(low)||t.amount.toString().includes(low);
  });
  el.innerHTML="";
  if(!hits.length){el.appendChild(emptyEl());return;}
  hits.forEach((t,i)=>el.appendChild(makeTxnCard(t,i)));
}

function handleSearch(q){
  S.searchQuery=q;
  const clear=$("searchClear");if(clear)clear.classList.toggle("show",q.length>0);
  if(q.trim()){goSearch();renderSearch(q);setText("searchResultLabel",TRANSLATIONS[S.lang].search_results+':"'+q+'"');}
  else{goToTransactions();}
}

/* ═══════════════════════════════════════════
   13. FILTERS  (replaced inline style with classList)
═══════════════════════════════════════════ */
function applyTxnFilter(){
  const T=TRANSLATIONS[S.lang];
  const from=$("txnDateFrom")?.value||"",to=$("txnDateTo")?.value||"";
  const errEl=$("afpError");
  if(errEl)hide(errEl);
  if((from&&!to)||(!from&&to)){if(errEl){errEl.textContent=T.err_date_required;show(errEl);}return;}
  if(from&&to&&from>to){if(errEl){errEl.textContent=T.err_date_range;show(errEl);}return;}
  S.txnDateFrom=from;S.txnDateTo=to;S.txnFilterActive=!!(from&&to);
  updateFilterBadge();renderTxnFeed();
}

function resetTxnFilter(){
  S.txnFilter="all";S.txnDateFrom="";S.txnDateTo="";S.txnFilterActive=false;
  const fromEl=$("txnDateFrom"),toEl=$("txnDateTo"),errEl=$("afpError");
  if(fromEl)fromEl.value="";if(toEl)toEl.value="";if(errEl)hide(errEl);
  $("txnTabs")?.querySelectorAll(".ftab").forEach(b=>b.classList.toggle("active",b.dataset.filter==="all"));
  updateFilterBadge();renderTxnFeed();
}

function updateFilterBadge(){
  const T=TRANSLATIONS[S.lang],badge=$("afpActiveBadge"),text=$("afpActiveText");
  if(!badge||!text)return;
  if(!S.txnFilterActive&&S.txnFilter==="all"){hide(badge);return;}
  let parts=[];
  if(S.txnFilter!=="all")parts.push(T[S.txnFilter]||S.txnFilter);
  if(S.txnDateFrom)parts.push(S.txnDateFrom);
  if(S.txnDateTo)parts.push("→ "+S.txnDateTo);
  text.textContent=(T.filter_active||"Filter active")+": "+parts.join(" · ");
  // FIX #5: was badge.style.display="flex" — use class system instead
  badge.classList.remove("is-hidden");
  badge.classList.add("is-flex");
}

/* ═══════════════════════════════════════════
   14. CSV  (unchanged)
═══════════════════════════════════════════ */
function exportCSV(){
  const T=TRANSLATIONS[S.lang];
  const hdr=["Date","Type","Category","Description","Amount"].join(",");
  const rows=S.transactions.map(t=>
    [t.date,t.type,(T[t.categoryKey]||t.category).replace(/,/g,";"),(t.description||"").replace(/,/g,";"),t.amount.toFixed(2)].join(","));
  const csv=[hdr,...rows].join("\n");
  const url=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));
  const a=document.createElement("a");a.href=url;
  a.download=`tnb-${new Date().toISOString().split("T")[0]}.csv`;a.click();
  URL.revokeObjectURL(url);
}

/* ═══════════════════════════════════════════
   15. CRUD
═══════════════════════════════════════════ */
function addTxn(type,amount,categoryKey,category,description,date){
  S.transactions.push({id:Date.now().toString(),type,amount,categoryKey,category,description,date});
  saveTxns();
  const{inc,exp,bal}=calcTotals();
  addNotif(type,amount,bal);
  updateTotals();renderTxnFeed();
  updateLastUpdatedChip();
}

function deleteTxn(id){
  S.transactions=S.transactions.filter(t=>t.id!==id);
  saveTxns();updateTotals();renderTxnFeed();
  updateLastUpdatedChip();
}

/* ═══════════════════════════════════════════
   16. NOTIFICATIONS  (unchanged)
═══════════════════════════════════════════ */
function addNotif(type,amount,newBalance){
  if(!S.notifEnabled)return;
  const T=TRANSLATIONS[S.lang];
  const msg=type==="income"
    ?`${T.notif_added_income} $${fmt(amount)}. ${T.notif_balance_now} $${fmt(newBalance)}`
    :`${T.notif_added_expense} $${fmt(amount)}. ${T.notif_balance_now} $${fmt(newBalance)}`;
  S.notifications.unshift({id:Date.now().toString(),type,msg,time:new Date().toISOString(),read:false});
  if(S.notifications.length>20)S.notifications.length=20;
  saveNotifs();renderNotifPanel();showToast(type,msg);
}

function renderNotifPanel(){
  const body=$("npBody"),empty=$("npEmpty"),dot=$("bellDot"),bell=$("bellBtn");
  if(!body)return;
  const unread=S.notifications.filter(n=>!n.read).length;
  // FIX #6: was dot.style.display — use class-based show/hide to match HTML is-hidden system
  if(dot){ unread>0 ? show(dot) : hide(dot); }
  if(bell)bell.classList.toggle("ringing",unread>0);
  body.querySelectorAll(".np-item").forEach(el=>el.remove());
  if(!S.notifications.length){ if(empty)show(empty); return; }
  if(empty)hide(empty);
  S.notifications.forEach((n,i)=>{
    const div=document.createElement("div");div.className="np-item";div.style.animationDelay=i*0.035+"s";
    div.innerHTML=`
      <div class="np-dot ${n.type||"info"}"></div>
      <div class="np-content"><div class="np-msg">${n.msg}</div><div class="np-time">${relTime(new Date(n.time))}</div></div>
      ${!n.read?'<div class="np-unread-dot"></div>':""}`;
    body.appendChild(div);
  });
}

function markAllRead(){S.notifications.forEach(n=>(n.read=true));saveNotifs();renderNotifPanel();}
function relTime(date){
  const s=Math.floor((Date.now()-date)/1000);
  if(s<60)return"Just now";if(s<3600)return Math.floor(s/60)+"m ago";
  if(s<86400)return Math.floor(s/3600)+"h ago";return Math.floor(s/86400)+"d ago";
}

/* ═══════════════════════════════════════════
   17. TOAST  (extended for "info")
═══════════════════════════════════════════ */
function showToast(type,msg){
  const container=$("toastContainer");if(!container)return;
  const toast=document.createElement("div");toast.className="toast";
  toast.innerHTML=`<div class="toast-dot ${type}"></div><div class="toast-msg">${msg}</div>`;
  container.appendChild(toast);
  setTimeout(()=>{toast.classList.add("out");setTimeout(()=>toast.remove(),280);},3500);
}

/* ═══════════════════════════════════════════
   18. MODAL  (unchanged)
═══════════════════════════════════════════ */
function openModal(type,prefillCat=""){
  const T=TRANSLATIONS[S.lang];const box=$("txnCard");
  $("txnType").value=type;
  setText("mcTitle",type==="income"?T.modal_income_title:T.modal_expense_title);
  box.className=`modal-card modal-${type}`;
  const sel=$("txnCategory");sel.innerHTML="";
  CATEGORIES[type].forEach(cat=>{
    const opt=document.createElement("option");opt.value=cat.key;
    opt.textContent=cat.icon+" "+(T[cat.key]||cat.key);sel.appendChild(opt);
  });
  if(prefillCat)sel.value=prefillCat;
  $("txnDate").value=new Date().toISOString().split("T")[0];
  $("txnAmount").value="";$("txnDesc").value="";
  setText("txnSubmit",T.add_transaction);
  $("txnVeil").classList.add("open");
  setTimeout(()=>$("txnAmount")?.focus(),230);
}

function closeModal(){$("txnVeil").classList.remove("open");}
function showConfirm(title,msg,cb){setText("cfmTitle",title);setText("cfmMsg",msg);S.confirmCb=cb;$("cfmVeil").classList.add("open");}
function closeConfirm(){$("cfmVeil").classList.remove("open");S.confirmCb=null;}

/* ═══════════════════════════════════════════
   19. THEME / LANG  (unchanged)
═══════════════════════════════════════════ */
function applyTheme(t){
  S.theme=t;document.documentElement.dataset.theme=t;
  const tc=$("themeCheck");if(tc)tc.checked=t==="dark";lsSet(LS.theme,t);
}
function applyLang(lang){
  S.lang=lang;const T=TRANSLATIONS[lang];lsSet(LS.lang,lang);
  document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(T[k]!==undefined)el.textContent=T[k];});
  setText("menuLangLabel",lang==="en"?"Switch to မြန်မာ":"Switch to English");
  updateFilterBadge();renderTxnFeed();renderNotifPanel();
}
const toggleLang=()=>applyLang(S.lang==="en"?"my":"en");

/* ═══════════════════════════════════════════
   20. NAVIGATION  (unchanged)
═══════════════════════════════════════════ */
function goToTransactions(){
  document.querySelectorAll(".page").forEach(p=>{p.classList.remove("active");p.classList.add("hidden");});
  const target=$("page-transactions");if(target){target.classList.remove("hidden");target.classList.add("active");}
}
function goSearch(){
  document.querySelectorAll(".page").forEach(p=>{p.classList.remove("active");p.classList.add("hidden");});
  const p=$("page-search");if(p){p.classList.remove("hidden");p.classList.add("active");}
}

/* ═══════════════════════════════════════════
   21. FAB / CLOSE ALL  (unchanged)
═══════════════════════════════════════════ */
function closeAll(){
  $("dotsMenu")?.classList.remove("open");$("dotsBtn")?.classList.remove("open");
  $("notifPanel")?.classList.remove("open");toggleFab(false);
}
function toggleFab(force){
  const open=force!==undefined?force:!S.fabOpen;S.fabOpen=open;
  $("fabMain")?.classList.toggle("open",open);
  $("fabSub")?.classList.toggle("open",open);
  $("fabBackdrop")?.classList.toggle("show",open);
}

/* ═══════════════════════════════════════════
   22. EVENT WIRING  (extended with refresh btn)
═══════════════════════════════════════════ */
function wire(){
  $("backBtn")?.addEventListener("click",()=>history.back());

  $("fabMain")?.addEventListener("click",(e)=>{e.stopPropagation();toggleFab();});
  $("fabIncome")?.addEventListener("click",()=>{toggleFab(false);openModal("income");});
  $("fabExpense")?.addEventListener("click",()=>{toggleFab(false);openModal("expense");});
  $("fabBackdrop")?.addEventListener("click",()=>toggleFab(false));

  $("dotsBtn")?.addEventListener("click",(e)=>{
    e.stopPropagation();
    const open=$("dotsMenu").classList.toggle("open");
    $("dotsBtn").classList.toggle("open",open);
    if(open)$("notifPanel")?.classList.remove("open");
  });
  $("themeCheck")?.addEventListener("change",(e)=>applyTheme(e.target.checked?"dark":"light"));
  $("menuAddIncome")?.addEventListener("click",()=>{closeAll();openModal("income");});
  $("menuAddExpense")?.addEventListener("click",()=>{closeAll();openModal("expense");});
  $("menuLang")?.addEventListener("click",()=>{toggleLang();closeAll();});

  $("searchInput")?.addEventListener("input",(e)=>handleSearch(e.target.value));
  $("searchInput")?.addEventListener("keydown",(e)=>{if(e.key==="Escape"){$("searchInput").value="";handleSearch("");}});
  $("searchClear")?.addEventListener("click",()=>{$("searchInput").value="";handleSearch("");$("searchInput")?.focus();});

  $("bellBtn")?.addEventListener("click",(e)=>{
    e.stopPropagation();
    const open=$("notifPanel").classList.toggle("open");
    if(open){$("dotsMenu")?.classList.remove("open");$("dotsBtn")?.classList.remove("open");markAllRead();}
  });
  $("npMarkRead")?.addEventListener("click",markAllRead);
  $("npClear")?.addEventListener("click",()=>{S.notifications=[];saveNotifs();renderNotifPanel();});

  document.addEventListener("click",(e)=>{
    if(!$("dotsShell")?.contains(e.target)){$("dotsMenu")?.classList.remove("open");$("dotsBtn")?.classList.remove("open");}
    if(!$("bellShell")?.contains(e.target))$("notifPanel")?.classList.remove("open");
  });

  $("txnTabs")?.addEventListener("click",(e)=>{
    const btn=e.target.closest(".ftab");if(!btn)return;
    $("txnTabs").querySelectorAll(".ftab").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");S.txnFilter=btn.dataset.filter;updateFilterBadge();renderTxnFeed();
  });
  $("afpApply")?.addEventListener("click",applyTxnFilter);
  $("afpReset")?.addEventListener("click",resetTxnFilter);
  $("afpBadgeClear")?.addEventListener("click",resetTxnFilter);
  $("csvBtnTxn")?.addEventListener("click",exportCSV);

  $("mcClose")?.addEventListener("click",closeModal);
  $("txnVeil")?.addEventListener("click",(e)=>{if(e.target===$("txnVeil"))closeModal();});
  $("txnSubmit")?.addEventListener("click",()=>{
    const type=$("txnType").value,amount=parseFloat($("txnAmount").value);
    const catKey=$("txnCategory").value,desc=$("txnDesc").value.trim(),date=$("txnDate").value;
    const T=TRANSLATIONS[S.lang];
    if(!amount||amount<=0){const inp=$("txnAmount");inp.classList.add("shake");setTimeout(()=>inp.classList.remove("shake"),1600);return;}
    const catName=T[catKey]||catKey||(type==="income"?T.cat_other_income:T.cat_other_expense);
    addTxn(type,amount,catKey||"cat_other_"+type,catName,desc,date);closeModal();
  });

  $("cfmCancel")?.addEventListener("click",closeConfirm);
  $("cfmOk")?.addEventListener("click",()=>{S.confirmCb?.();closeConfirm();});
  /* FIX: cfmVeil click-outside-to-close (matches txnVeil behaviour) */
  $("cfmVeil")?.addEventListener("click",(e)=>{if(e.target===$("cfmVeil"))closeConfirm();});

  /* ── Refresh button  ← NEW ── */
  $("refreshBtn")?.addEventListener("click",()=>refreshData(true));

  /* Cross-tab sync: if dashboard.js mutates transactions, history refreshes too */
  // FIX: _onCacheUpdate was stored on window but never attached to a real event.
  // AppCache dispatches a "cacheupdate" CustomEvent on window when data changes.
  if(!window._histCacheUpdateBound){
    window._histCacheUpdateBound=true;
    window.addEventListener("cacheupdate",()=>{
      S.transactions=AppCache.getTransactions();
      S.notifications=AppCache.getNotifications();
      updateTotals();renderTxnFeed();renderNotifPanel();updateLastUpdatedChip();
    });
  }
}

/* ═══════════════════════════════════════════
   23. INIT  — smart cache gate  ← CHANGED
═══════════════════════════════════════════ */
async function init(){
  const{data:{session}}=await _supabase.auth.getSession();
  if(!session){window.location.href="index.html";return;}

  const meta=session.user.user_metadata;
  // FIX #3: guard against null email — OAuth providers may omit it
  S.userEmail    = session.user.email || "";
  S.userName     = meta.full_name || meta.name || (S.userEmail ? S.userEmail.split("@")[0] : "User");
  S.userAvatar   = meta.avatar_url || meta.picture || "";
  // FIX #4: capitalise provider to match dashboard.js (e.g. "google" → "Google")
  const rawProvider = session.user.app_metadata?.provider || "email";
  S.userProvider = rawProvider.charAt(0).toUpperCase() + rawProvider.slice(1);
  S.isSocialLogin = S.userProvider.toLowerCase() !== "email";

  // ── CACHE GATE: only read from cache, not a new fetch ──
  loadState();

  applyTheme(S.theme);
  applyLang(S.lang);
  wire();

  updateTotals();
  renderTxnFeed();
  renderNotifPanel();

  // ── Start Last Updated ticker ── ← NEW
  startLastUpdatedTicker();

  // ── Background auto-refresh when TTL expires ──
  const msLeft=AppCache.msUntilExpiry();
  if(msLeft>0){setTimeout(()=>refreshData(false),msLeft);}

  console.log(
    "%c History (cached) ✓ ",
    "background:#f5a623;color:#1a0f00;padding:2px 5px;border-radius:3px;"
  );
}

if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",init);
}else{
  init();
}
