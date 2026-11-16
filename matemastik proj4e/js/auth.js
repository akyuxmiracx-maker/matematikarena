/* =========================================================
   MatematikArena — Gerçek Google Girişi
   Google Identity Services (accounts.google.com/gsi/client)
   • İlk girişte Google'ın resmi giriş ekranı açılır
   • Giriş bilgisi cihazda saklanır → bir daha sorulmaz
   • Client ID: js/config.js içinden ya da 🔐 panelinden gelir
========================================================= */
(function () {
  "use strict";

  const LS_ID = "ma_google_client_id";
  let gisReady = false, gisFailed = false;

  const $ = (s, r) => (r || document).querySelector(s);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* kısa bildirim (uygulamanın toast'uyla aynı görünüm) */
  let sayT = null;
  function say(msg, gold) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.className = "toast show" + (gold ? " gold" : "");
    clearTimeout(sayT);
    sayT = setTimeout(() => (el.className = "toast"), 3400);
  }

  const cfg = () => (window.APP_CONFIG && window.APP_CONFIG.GOOGLE_CLIENT_ID)
    || localStorage.getItem(LS_ID) || "";
  const isHttp = () => location.protocol === "http:" || location.protocol === "https:";
  const user = () => (window.MA_AUTH ? window.MA_AUTH.getUser() : null);

  /* ---- Google'ın verdiği JWT'yi çöz (ad, e-posta, fotoğraf) ---- */
  function decodeJwt(tok) {
    try {
      const part = tok.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      const bin = atob(part);
      const json = decodeURIComponent(bin.split("").map((c) =>
        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
      return JSON.parse(json);
    } catch (e) { return null; }
  }

  function onCredential(resp) {
    const p = decodeJwt(resp && resp.credential);
    if (!p) return;
    const u = {
      sub: p.sub || "",
      name: p.name || p.given_name || "Öğrenci",
      given: p.given_name || p.name || "Öğrenci",
      email: p.email || "",
      picture: p.picture || "",
      ts: Date.now()
    };
    if (window.MA_AUTH) window.MA_AUTH.login(u);
    render();
  }

  function loadGis(cb) {
    if (window.google && window.google.accounts && window.google.accounts.id) { cb(true); return; }
    if (document.getElementById("gisScript")) return;
    const s = document.createElement("script");
    s.id = "gisScript";
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true; s.defer = true;
    s.onload = () => cb(true);
    s.onerror = () => { gisFailed = true; cb(false); };
    document.head.appendChild(s);
  }

  function initGis() {
    const id = cfg();
    if (!id || !isHttp()) { render(); return; }
    loadGis((ok) => {
      if (!ok) { render(); return; }
      try {
        google.accounts.id.initialize({
          client_id: id,
          callback: onCredential,
          auto_select: false,
          cancel_on_tap_outside: true,
          context: "signin",
          /* hata asla Google'ın sayfasına taşınmaz — sitede karşıla */
          error_callback: (err) => {
            const t = err && err.type;
            if (t === "popup_closed" || t === "popup_closed_by_user") { say("ℹ️ Giriş penceresi kapatıldı"); return; }
            say("⚠️ Google girişi açılamadı — Client ID ile site adresi uyuşmuyor");
            openHelp();
          }
        });
        gisReady = true;
      } catch (e) { gisFailed = true; }
      render();
    });
  }

  /* ---- Üst bardaki kutu ---- */
  function render() {
    const el = $("#authBox");
    if (!el) return;
    const u = user();

    if (u) {
      el.innerHTML = `
        <button class="g-user" id="gUserBtn" title="Hesabım">
          ${u.picture ? `<img class="g-av" src="${esc(u.picture)}" alt="">`
                      : `<span class="g-av">G</span>`}
          <span class="g-name">${esc(u.given || u.name)}</span>
          <span class="g-ok">✓</span>
        </button>
        <div class="g-menu" id="gMenu" hidden>
          <div class="g-menu-h">
            ${u.picture ? `<img class="g-av" src="${esc(u.picture)}" alt="">` : `<span class="g-av">G</span>`}
            <div><b>${esc(u.name)}</b><span>${esc(u.email || "Google hesabı")}</span></div>
          </div>
          <div class="g-note">✅ Giriş yapıldı — bu cihazda hatırlanır, bir daha sorulmaz.</div>
          <button class="g-out" id="gOut">🚪 Çıkış yap</button>
        </div>`;

      $("#gUserBtn").onclick = (e) => {
        e.stopPropagation();
        const m = $("#gMenu");
        m.hidden = !m.hidden;
      };
      $("#gOut").onclick = (e) => {
        e.stopPropagation();
        if (window.MA_AUTH) window.MA_AUTH.logout();
        render();
      };
      return;
    }

    if (gisReady && cfg() && isHttp()) {
      el.innerHTML = `<div class="g-btn-wrap" id="gBtn"></div>
                      <button class="g-help" id="gHelp" title="Google girişi ayarları">?</button>`;
      try {
        google.accounts.id.renderButton($("#gBtn"), {
          theme: "outline", size: "large", text: "continue_with",
          locale: "tr", width: 160, shape: "rectangular"
        });
      } catch (e) { gisFailed = true; render(); return; }
    } else {
      const why = gisFailed ? "⚠️" : "🔐";
      el.innerHTML = `<button class="g-pill" id="gHelp">${why} Google ile giriş</button>`;
    }
    const h = $("#gHelp");
    if (h) h.onclick = openHelp;
  }

  /* ---- Ayar / yardım kartı ---- */
  function openHelp() {
    let m = $("#authModal");
    if (!m) {
      m = document.createElement("div");
      m.id = "authModal";
      m.className = "auth-modal";
      m.hidden = true;
      document.body.appendChild(m);
    }
    const id = cfg(), http = isHttp();
    const origin = location.origin;
    const isDummy = !!id && /1234567890-/.test(id);
    m.innerHTML = `
      <div class="auth-card">
        <button class="auth-x" id="authX">✕</button>
        <h3>🔐 Google ile Gerçek Giriş</h3>

        ${http ? "" : `
        <div class="auth-warn">
          ⛔ Sayfa şu an <b>dosya olarak</b> (<code>file://</code>) açılmış. Google, girişin yapıldığı
          adresi tanıdığı için gerçek giriş <b>yalnızca localhost üzerinde</b> çalışır.<br><br>
          <b>Çözüm:</b> klasördeki <b>baslat.bat</b> dosyasına çift tıkla — site
          <code>http://localhost:8765</code> üzerinde açılır ve Google girişi aktif olur.
        </div>`}

        <div class="auth-origin">
          <span>Bu sayfanın adresi:</span>
          <code id="authOrigin">${esc(origin)}</code>
          <button class="btn btn-ghost btn-sm" id="authCopyOrigin">📋 Kopyala</button>
        </div>

        ${location.hostname === "127.0.0.1" ? `
        <div class="auth-warn">
          🌐 Sayfa <b>127.0.0.1</b> ile açıldı; Google bunu <b>localhost</b> ile farklı sayar.
          Kayıtta <code>http://localhost:8765</code> yazdıysan giriş <b>hata verir</b>.<br>
          <button class="btn btn-primary btn-sm" id="authGoLocal" style="margin-top:9px">🔁 localhost ile aç</button>
        </div>` : ""}

        ${isDummy ? `<div class="auth-warn">⛔ Bu bir <b>örnek (geçersiz)</b> Client ID — gerçek ID'nle değiştir, yoksa Google hata sayfası açar.</div>` : ""}

        ${id && !isDummy ? `<div class="auth-ok">✅ Client ID hazır:<br><code>${esc(id)}</code></div>` : ""}

        <ol class="auth-steps">
          <li><a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener">Google Cloud Console → Credentials</a> sayfasını aç (yoksa yeni proje oluştur).</li>
          <li><b>Create Credentials → OAuth client ID</b> seç — tür kesinlikle <b>Web application</b> olmalı (Android/iOS olursa hata verir).</li>
          <li><b>Authorized JavaScript origins → Add URI</b> ile <b>ikisini</b> de ekle:<br><code>http://localhost:8765</code><br><code>http://127.0.0.1:8765</code></li>
          <li>Oluşturulan <b>Client ID</b>yi kopyala (<code>…apps.googleusercontent.com</code>).</li>
          <li>Aşağıdaki kutuya yapıştır ve <b>Kaydet</b> de — bundan sonra giriş hep açık kalır.</li>
        </ol>

        <div class="auth-row">
          <input id="authIdIn" spellcheck="false" placeholder="1234567890-xxxx.apps.googleusercontent.com" value="${esc(id)}">
          <button class="btn btn-primary" id="authSave">Kaydet</button>
        </div>
        <p class="auth-note">Client ID yalnızca bu cihazda saklanır. İstersen doğrudan <code>js/config.js</code> dosyasına da yazabilirsin.</p>
      </div>`;
    m.hidden = false;

    $("#authX").onclick = closeHelp;
    m.onclick = (e) => { if (e.target === m) closeHelp(); };
    const co = $("#authCopyOrigin");
    if (co) co.onclick = () => {
      const t = origin;
      if (navigator.clipboard) navigator.clipboard.writeText(t).then(() => say("📋 Kopyalandı: " + t, true), () => say(t));
      else say(t);
    };
    const gl = $("#authGoLocal");
    if (gl) gl.onclick = () => { location.href = location.href.replace("//127.0.0.1", "//localhost"); };
    $("#authSave").onclick = () => {
      const v = ($("#authIdIn").value || "").trim();
      if (/1234567890-/.test(v)) { say("⛔ Bu örnek ID — geçerli Client ID'ni yapıştır"); return; }
      if (v && !/\.apps\.googleusercontent\.com$/.test(v)) {
        say("⚠️ ID sonu …apps.googleusercontent.com ile bitmeli — yine de kaydedildi");
      }
      if (v) localStorage.setItem(LS_ID, v);
      else localStorage.removeItem(LS_ID);
      location.reload();
    };
  }
  function closeHelp() { const m = $("#authModal"); if (m) m.hidden = true; }

  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeHelp(); });

  // menü dışına tıklanınca kapat
  document.addEventListener("click", (e) => {
    const m = document.getElementById("gMenu");
    if (m && !m.hidden && !m.contains(e.target) && !e.target.closest("#gUserBtn")) m.hidden = true;
  });

  // uygulama tarafında giriş/çıkış yapılınca kutuyu tazele
  document.addEventListener("ma:user", () => render());

  function start() {
    render();
    initGis();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
