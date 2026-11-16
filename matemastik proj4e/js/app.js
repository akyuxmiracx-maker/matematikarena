/* =========================================================
   MatematikArena — uygulama mantığı
   Dersler · Testler · Yarışmalar · Sıralama · Rozetler
========================================================= */
(function () {
  "use strict";

  /* ---------- Yardımcılar ---------- */
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const rnd = (n) => Math.floor(Math.random() * n);
  const pick = (a) => a[rnd(a.length)];
  const shuffle = (a) => a.map((v) => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map((x) => x[1]);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const GRADES = (window.CURRICULUM || []).slice().sort((a, b) => a.grade - b.grade);
  const ALL_TOPICS = GRADES.reduce((acc, g) => acc.concat(g.topics.map((t) => ({ g, t }))), []);
  const topicById = (id) => ALL_TOPICS.find((x) => x.t.id === id);
  const gradeByNum = (n) => GRADES.find((g) => g.grade === +n);
  const gradeOf = (id) => (topicById(id) || {}).g;
  const allQuestions = () => ALL_TOPICS.reduce((a, x) => a.concat(x.t.questions.map((q) => ({ q, t: x.t, g: x.g }))), []);
  const questionsOfGrade = (n) => allQuestions().filter((x) => x.g.grade === +n);
  const diffLabel = (d) => (d === 1 ? "Kolay" : d === 3 ? "Zor" : "Orta");

  /* ---------- Depolama ---------- */
  const KEY = "matematikarena_v1";
  const DEF = {
    name: "Sen",
    user: null,
    stats: { correct: 0, wrong: 0, streak: 0, maxStreak: 0, tests: 0, arenaWins: 0, arenaPlayed: 0 },
    topics: {},               // topicId -> {best,total,stars,tries}
    scores: { hizli: [], turnuva: [], sampiyon: [], konu: [], duel: [], merdiven: [], eleme: [], online: [] },
    friends: [],              // bu cihazda eklenen arkadaşlar
    badges: {}
  };
  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY));
      if (!raw) return JSON.parse(JSON.stringify(DEF));
      return Object.assign(JSON.parse(JSON.stringify(DEF)), raw, {
        stats: Object.assign({}, DEF.stats, raw.stats || {}),
        scores: Object.assign({}, DEF.scores, raw.scores || {}),
        badges: raw.badges || {},
        topics: raw.topics || {},
        friends: raw.friends || []
      });
    } catch (e) { return JSON.parse(JSON.stringify(DEF)); }
  }
  const S = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

  /* ---------- Ses ---------- */
  let AC = null;
  function beep(freq, dur, type, vol) {
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      if (AC.state === "suspended") AC.resume();
      const o = AC.createOscillator(), g = AC.createGain();
      o.type = type || "sine"; o.frequency.value = freq;
      g.gain.value = vol || 0.05;
      o.connect(g); g.connect(AC.destination);
      const t = AC.currentTime;
      g.gain.setValueAtTime(g.gain.value, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + (dur || 0.15));
      o.start(t); o.stop(t + (dur || 0.15) + 0.02);
    } catch (e) {}
  }
  const sOk = () => { beep(660, 0.12, "triangle"); setTimeout(() => beep(880, 0.16, "triangle"), 90); };
  const sNo = () => beep(220, 0.25, "sawtooth", 0.04);
  const sWin = () => [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => beep(f, 0.18, "triangle"), i * 120));

  /* ---------- Bildirim ---------- */
  let toastT = null;
  function toast(msg, gold) {
    const el = $("#toast");
    el.textContent = msg;
    el.className = "toast show" + (gold ? " gold" : "");
    clearTimeout(toastT);
    toastT = setTimeout(() => (el.className = "toast"), 2800);
  }

  /* ---------- Rozetler ---------- */
  const gradeMaster = (n) => {
    const g = gradeByNum(n);
    return g && g.topics.every((t) => (S.topics[t.id] || {}).best >= 70);
  };
  const BADGES = [
    { id: "first", ico: "🎧", name: "İlk Adım", desc: "İlk testini tamamla", check: () => S.stats.tests > 0 },
    { id: "perfect", ico: "💯", name: "Kusursuz", desc: "Bir konu testinde 3 yıldız kazan", check: () => Object.values(S.topics).some((t) => t.stars >= 3) },
    { id: "streak10", ico: "🔥", name: "10'luk Seri", desc: "10 doğru cevabı üst üste ver", check: () => S.stats.maxStreak >= 10 },
    { id: "q50", ico: "🧠", name: "50 Doğru", desc: "Toplam 50 doğru cevap ver", check: () => S.stats.correct >= 50 },
    { id: "g5", ico: "🌱", name: "5. Sınıf Ustası", desc: "5. sınıfın tüm konularında %70+", check: () => gradeMaster(5) },
    { id: "g6", ico: "🌿", name: "6. Sınıf Ustası", desc: "6. sınıfın tüm konularında %70+", check: () => gradeMaster(6) },
    { id: "g7", ico: "🌳", name: "7. Sınıf Ustası", desc: "7. sınıfın tüm konularında %70+", check: () => gradeMaster(7) },
    { id: "g8", ico: "🏆", name: "8. Sınıf Ustası", desc: "8. sınıfın tüm konularında %70+", check: () => gradeMaster(8) },
    { id: "arena", ico: "🥇", name: "Yarışma Şampiyonu", desc: "Bir yarışmada %70+ isabet yap", check: () => S.stats.arenaWins >= 1 },
    { id: "speed", ico: "⚡", name: "Hız Ustası", desc: "Hızlı Yarış'ta 150+ puan yap", check: () => (S.scores.hizli || []).some((r) => r.score >= 150) },
    { id: "champ", ico: "👑", name: "Şampiyonlar Ligi", desc: "Şampiyonlar Ligi'ni tamamla", check: () => (S.scores.sampiyon || []).length > 0 },
    { id: "duel", ico: "🥊", name: "Düello Ustası", desc: "Bir 2 Kişilik Kapışmayı tamamla", check: () => (S.scores.duel || []).length > 0 },
    { id: "kule", ico: "🗼", name: "Kule Fatihi", desc: "Kule Tırmanışı'nda 10 basamağa ulaş", check: () => (S.scores.merdiven || []).some((r) => r.score >= 100) },
    { id: "survivor", ico: "💀", name: "Hayatta Kalan", desc: "Eleme Turu'nda 10 doğru cevap ver", check: () => (S.scores.eleme || []).some((r) => r.correct >= 10) },
    { id: "all", ico: "🎓", name: "Müfredat Kaşifi", desc: "4 sınıfın tamamında en az bir test çöz", check: () => [5, 6, 7, 8].every((n) => ALL_TOPICS.some((x) => x.g.grade === n && (S.topics[x.t.id] || {}).tries > 0)) }
  ];
  function checkBadges(silent) {
    let newOnes = [];
    BADGES.forEach((b) => {
      if (!S.badges[b.id] && b.check()) {
        S.badges[b.id] = Date.now();
        newOnes.push(b);
      }
    });
    if (newOnes.length) {
      save();
      if (!silent) {
        newOnes.forEach((b, i) => setTimeout(() => toast("🎖️ Yeni rozet: " + b.name + "!", true), i * 1400));
        sWin();
      }
    }
    return newOnes;
  }
  const badgeCount = () => Object.keys(S.badges).length;

  /* ---------- İlerleme ---------- */
  function topicInfo(t) {
    const p = S.topics[t.id];
    const best = p ? p.best : null;
    const stars = p ? p.stars : 0;
    return { tries: p ? p.tries : 0, best, stars, has: !!p };
  }
  function gradeProgress(g) {
    const vals = g.topics.map((t) => (S.topics[t.id] ? S.topics[t.id].best : 0));
    return Math.round(vals.reduce((a, b) => a + b, 0) / g.topics.length);
  }
  function starsOf(pct) { return pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 50 ? 1 : 0; }
  function starHtml(k) {
    let s = "";
    for (let i = 1; i <= 3; i++) s += '<span class="' + (i <= k ? "" : "off") + '">★</span>';
    return '<span class="stars">' + s + "</span>";
  }

  /* ---------- Ses + üst bar ---------- */
  function renderTopStats() {
    $("#topStats").innerHTML =
      '<span class="pill">✅ <b>' + S.stats.correct + "</b> doğru</span>" +
      '<span class="pill">🔥 <b>' + S.stats.maxStreak + "</b> seri</span>" +
      '<span class="pill">🎖️ <b>' + badgeCount() + "</b></span>";
  }

  /* =========================================================
     ANA SAYFA
  ========================================================= */
  function viewHome() {
    const totalQ = allQuestions().length;
    const tested = Object.keys(S.topics).length;
    const html = `
      <div class="grade-strip">
        <span class="gs-label">📚 Sınıfını Seç</span>
        <div class="gs-items">
          ${GRADES.map((g) => {
            const p = gradeProgress(g);
            return `
            <a class="gs-item" href="#/grade/${g.grade}" style="--gc:${g.theme}" title="${g.label} · İlerleme %${p}">
              <b>${g.grade}</b>
              <span class="gs-bar"><i style="width:${p}%"></i></span>
            </a>`;
          }).join("")}
        </div>
        <span class="gs-hint">${ALL_TOPICS.length} konu · ${totalQ} soru</span>
      </div>

      <section class="hero">
        <div class="tag-line"><span class="tag">MEB Müfredatı · 5-8. Sınıf</span></div>
        <h1>Matematik öğren, yarışmada <span style="color:var(--cyan)">şampiyon</span> ol!</h1>
        <p class="sub">${totalQ} soruluk devasa soru bankası, konu anlatımları, testler ve
        gerçek zamanlı yarışmalar. İlerlemen otomatik kaydedilir.</p>
        <div class="row" style="margin-top:18px">
          <a class="btn btn-primary btn-lg" href="#/arena">🏆 Yarışmaya Katıl</a>
          <a class="btn btn-ghost btn-lg" href="#/grade/5">📚 Derslere Başla</a>
        </div>
        <div class="badge-line">
          <span class="tag">🧮 ${totalQ} soru</span>
          <span class="tag">📖 ${ALL_TOPICS.length} konu anlatımı</span>
          <span class="tag">🥇 4 yarışma modu</span>
          <span class="tag">🎖️ ${BADGES.length} rozet</span>
        </div>
      </section>

      <div class="level-row" style="margin-top:22px">
        <div class="stat"><div class="v">${S.stats.correct}</div><div class="k">Doğru cevap</div></div>
        <div class="stat"><div class="v">%${Math.round((S.stats.correct / Math.max(1, S.stats.correct + S.stats.wrong)) * 100)}</div><div class="k">İsabet oranı</div></div>
        <div class="stat"><div class="v">${S.stats.maxStreak}</div><div class="k">En uzun seri</div></div>
        <div class="stat"><div class="v">${badgeCount()}/${BADGES.length}</div><div class="k">Rozet</div></div>
        <div class="stat"><div class="v">${S.stats.arenaWins}</div><div class="k">Başarılı yarışma (%70+)</div></div>
      </div>

      <div class="section-title">Hızlı Başlangıç</div>
      <div class="grid grid-4">
        <div class="mode-card" onclick="location.hash='#/arena'">
          <div class="micon">⚡</div><h3>Hızlı Yarış</h3>
          <p>60 saniyelik nefes kesen yarış. Doğru cevaplar puan, üst üste seriler bonus getirir.</p>
          <div class="mtags"><span class="tag">60 sn</span><span class="tag">15 soru</span></div>
        </div>
        <div class="mode-card" onclick="location.hash='#/arena'">
          <div class="micon">🎤</div><h3>Bilgi Yarışması</h3>
          <p>Soru başına 20 saniye ve geri sayım. Klasik yarışma formatı, tek başına!</p>
          <div class="mtags"><span class="tag">10 soru</span><span class="tag">20 sn/soru</span></div>
        </div>
        <div class="mode-card" onclick="location.hash='#/arena'">
          <div class="micon">🥊</div><h3>2 Kişilik Kapışma</h3>
          <p>Arkadaşınla aynı cihazda aynı anda cevaplayın: en hızlı doğru <b>2× puan</b> alır, bilemeyen 0 puan.</p>
          <div class="mtags"><span class="tag">2 oyuncu</span><span class="tag">10 soru</span></div>
        </div>
        <div class="mode-card" onclick="location.hash='#/arena'">
          <div class="micon">👑</div><h3>Şampiyonlar Ligi</h3>
          <p>Tüm sınıflardan karışık 20 soru. Müfredatın ustası olduğunuzu kanıtlayın.</p>
          <div class="mtags"><span class="tag">20 soru</span><span class="tag">Tüm sınıflar</span></div>
        </div>
      </div>
    `;
    $("#app").innerHTML = html;
  }

  function svgRing(pct, color) {
    const r = 20, c = 2 * Math.PI * r;
    return `<svg width="56" height="56" viewBox="0 0 56 56">
      <circle cx="28" cy="28" r="${r}" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="6"/>
      <circle cx="28" cy="28" r="${r}" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"
        stroke-dasharray="${c}" stroke-dashoffset="${c - (c * pct) / 100}" transform="rotate(-90 28 28)"/>
      <text x="28" y="32" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">${pct}%</text>
    </svg>`;
  }

  /* =========================================================
     SINIF SAYFASI
  ========================================================= */
  function viewGrade(num) {
    const g = gradeByNum(num);
    if (!g) return viewHome();
    const p = gradeProgress(g);
    $("#app").innerHTML = `
      <div class="spread">
        <div>
          <a class="btn btn-ghost btn-sm" href="#/">← Ana Sayfa</a>
          <h1 style="color:${g.theme}">${g.label} Matematik</h1>
          <p class="sub">${g.topics.length} konu · İlerlemen: %${p} · Her konuda ders anlatımı, test ve konu yarışması var.</p>
        </div>
        <div style="text-align:center">${svgRing(p, g.theme)}<div class="gmeta">genel ilerleme</div></div>
      </div>
      <div class="section-title">Konular</div>
      <div class="grid" style="gap:12px">
        ${g.topics.map((t) => {
          const info = topicInfo(t);
          return `
          <div class="topic">
            <div class="ticon">${t.icon}</div>
            <div class="tmain">
              <div class="ttitle">${t.title}</div>
              <div class="tdesc">${t.desc} · ${t.questions.length} soru ${info.has ? "· en iyi: %" + info.best : ""}</div>
              <div style="margin-top:6px">${starHtml(info.stars)}${info.tries ? `<span class="tdesc" style="margin-left:8px">${info.tries} deneme</span>` : ""}</div>
            </div>
            <div class="tactions">
              <a class="btn btn-ghost btn-sm" href="#/topic/${t.id}">📖 Ders</a>
              <button class="btn btn-primary btn-sm" data-test="${t.id}">✍️ Test Çöz</button>
              <button class="btn btn-green btn-sm" data-race="${t.id}">🏁 Yarış</button>
            </div>
          </div>`;
        }).join("")}
      </div>`;

    $$("[data-test]").forEach((b) => (b.onclick = () => startTest(b.getAttribute("data-test"))));
    $$("[data-race]").forEach((b) => (b.onclick = () => startKonuRace(b.getAttribute("data-race"))));
  }

  /* =========================================================
     KONU (DERS) SAYFASI
  ========================================================= */
  function viewTopic(id) {
    const found = topicById(id);
    if (!found) return viewHome();
    const { g, t } = found;
    const info = topicInfo(t);
    $("#app").innerHTML = `
      <div class="spread">
        <div>
          <a class="btn btn-ghost btn-sm" href="#/grade/${g.grade}">← ${g.label}</a>
          <h1>${t.icon} ${t.title}</h1>
          <p class="sub">${t.desc}</p>
        </div>
        <div style="text-align:center">${starHtml(info.stars)}<div class="gmeta">${info.has ? "en iyi skorun: %" + info.best : "henüz test çözmedin"}</div></div>
      </div>

      <div class="row" style="margin:18px 0">
        <button class="btn btn-primary" id="goTest">✍️ Bu Konunun Testini Çöz</button>
        <button class="btn btn-green" id="goRace">🏁 Bu Konuda Yarış</button>
        <span class="pill">${t.questions.length} soru</span>
        <span class="pill">${diffLabel(Math.round(t.questions.reduce((a, q) => a + q.d, 0) / t.questions.length))} seviye</span>
      </div>

      <div class="card">
        <div class="section-title" style="margin-top:0">📖 Konu Anlatımı</div>
        ${t.lesson.map((s) => `
          <div class="lesson-sec">
            <h3>${s.t}</h3>
            <p>${s.d}</p>
          </div>`).join("")}
        <div class="example"><b>💡 İpucu:</b> Dersi okuduktan sonra hemen testi çöz; yanlışların açıklamalarını mutlaka oku. Sonuçlar otomatik kaydedilir.</div>
      </div>

      <div class="section-title">Konu Yarışması</div>
      <div class="mode-card" id="raceCard">
        <div class="micon">🎯</div>
        <h3>${t.title} Yarışması</h3>
        <p>Bu konudan 10 soru ve 60 saniye. Konuyu ne kadar iyi bildiğini göster!</p>
        <div class="mtags"><span class="tag">60 sn</span><span class="tag">10 soru</span><span class="tag">tek başına</span></div>
      </div>`;

    $("#goTest").onclick = () => startTest(id);
    $("#goRace").onclick = () => startKonuRace(id);
    $("#raceCard").onclick = () => startKonuRace(id);
  }

  /* =========================================================
     TEST MOTORU (pratik)
  ========================================================= */
  let cleanup = null;
  let arenaKey = null;
  function clearHooks() { if (cleanup) { cleanup(); cleanup = null; } }

  function startTest(topicId) {
    const found = topicById(topicId);
    if (!found) return;
    const { g, t } = found;
    const n = Math.min(8, t.questions.length);
    runQuiz({
      title: t.title,
      subtitle: g.label + " · Konu Testi",
      questions: shuffle(t.questions).slice(0, n),
      topicId: t.id,
      grade: g.grade,
      theme: g.theme
    });
  }

  function runQuiz(cfg) {
    const qs = cfg.questions;
    let i = 0, correct = 0, answered = false;
    let start = Date.now();
    const dots = () => qs.map((_, k) => `<i class="${k < i ? (qs[k]._ok ? "ok" : "no") : k === i ? "on" : ""}"></i>`).join("");

    function paint() {
      const q = qs[i];
      const ord = shuffle([0, 1, 2, 3]);   // şıklar her soruda farklı sırayla gelir
      $("#app").innerHTML = `
        <div class="quiz-head">
          <div>
            <div class="qmeta">${esc(cfg.subtitle || "Test")}</div>
            <h2 style="margin-top:4px">${esc(cfg.title)}</h2>
          </div>
          <div class="row">
            <div class="timer" id="qTimer">⏱ 0:00</div>
            <div class="dots" id="qDots">${dots()}</div>
          </div>
        </div>
        <div class="qcard">
          <div class="qmeta">Soru ${i + 1}/${qs.length} · ${diffLabel(q.d)} · Doğru: ${correct}</div>
          <div class="qtext">${q.q}</div>
          <div class="opts" id="qOpts">
            ${ord.map((oi, k) => `<button class="opt" data-k="${oi}"><span class="key">${"ABCD"[k]}</span><span>${q.o[oi]}</span></button>`).join("")}
          </div>
          <div class="feedback" id="qFb"></div>
          <div class="quiz-actions">
            <button class="btn btn-ghost" id="qQuit">Çık</button>
            <button class="btn btn-primary" id="qNext" style="display:none">${i === qs.length - 1 ? "Sonucu Gör" : "Sonraki Soru →"}</button>
          </div>
        </div>`;

      answered = false;
      const t0 = Date.now();
      const timer = setInterval(() => {
        const s = Math.floor((Date.now() - t0) / 1000);
        const el = $("#qTimer");
        if (el) el.textContent = "⏱ " + Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
      }, 1000);

      $$("#qOpts .opt").forEach((b) => (b.onclick = () => answer(+b.getAttribute("data-k"))));
      $("#qQuit").onclick = () => { if (confirm("Testten çıkmak istiyor musun?")) { clearHooks(); location.hash = "#/"; } };
      $("#qNext").onclick = () => { clearHooks(); next(); };

      const onKey = (e) => {
        if (answered) {
          if (e.key === "Enter") { const n = $("#qNext"); if (n) n.click(); }
          return;
        }
        const k = ["1", "2", "3", "4"].indexOf(e.key);
        if (k >= 0) { const b = $('#qOpts .opt[data-k="' + k + '"]'); if (b) b.click(); }
      };
      document.addEventListener("keydown", onKey);
      cleanup = () => { clearInterval(timer); document.removeEventListener("keydown", onKey); };

      function answer(k) {
        if (answered) return;
        answered = true;
        const ok = k === q.a;
        q._ok = ok;
        $$("#qOpts .opt").forEach((b) => {
          const bk = +b.getAttribute("data-k");
          b.disabled = true;
          if (bk === q.a) b.classList.add("correct");
          else if (bk === k) b.classList.add("wrong");
          else b.classList.add("dim");
        });
        const fb = $("#qFb");
        fb.className = "feedback show " + (ok ? "ok" : "no");
        fb.innerHTML = (ok ? "<b>✅ Doğru!</b>" : "<b>❌ Yanlış! Doğru cevap: " + "ABCD"[q.a] + "</b>") + esc(q.e);
        ok ? sOk() : sNo();
        if (ok) correct++;
        S.stats[ok ? "correct" : "wrong"]++;
        S.stats.streak = ok ? S.stats.streak + 1 : 0;
        S.stats.maxStreak = Math.max(S.stats.maxStreak, S.stats.streak);
        save(); renderTopStats();
        $("#qDots").innerHTML = dots();
        $("#qNext").style.display = "";
        $("#qNext").focus();
      }

      function next() {
        i++;
        if (i >= qs.length) return finish();
        paint();
      }
    }

    function finish() {
      const pct = Math.round((correct / qs.length) * 100);
      const stars = starsOf(pct);
      S.stats.tests++;
      if (cfg.topicId) {
        const p = S.topics[cfg.topicId] || { best: 0, total: 0, stars: 0, tries: 0 };
        p.tries++;
        p.total = qs.length;
        p.best = Math.max(p.best, pct);
        p.stars = Math.max(p.stars, stars);
        S.topics[cfg.topicId] = p;
      }
      save();
      const got = checkBadges(false);
      const elapsed = Math.floor((Date.now() - start) / 1000);

      $("#app").innerHTML = `
        <div class="qcard result">
          <div class="rtitle">${pct >= 90 ? "Harikasın! 🎉" : pct >= 70 ? "Çok iyi! 👏" : pct >= 50 ? "Fena değil, tekrar edelim 💪" : "Dersi bir daha okuyalım 📖"}</div>
          <div class="big">%${pct}</div>
          <div class="medals">${stars === 3 ? "⭐⭐⭐" : stars === 2 ? "⭐⭐" : stars === 1 ? "⭐" : "—"}</div>
          <div class="rsub">${esc(cfg.title)} · ${correct}/${qs.length} doğru · ${elapsed} saniye</div>
          <div class="chips">
            <div class="chip"><div class="cv">${correct}</div><div class="ck">Doğru</div></div>
            <div class="chip"><div class="cv">${qs.length - correct}</div><div class="ck">Yanlış</div></div>
            <div class="chip"><div class="cv">${S.stats.streak}</div><div class="ck">Güncel seri</div></div>
            <div class="chip"><div class="cv">${cfg.topicId ? "%" + (S.topics[cfg.topicId] || {}).best : "%" + pct}</div><div class="ck">En iyi</div></div>
          </div>
          <div class="row" style="justify-content:center">
            <button class="btn btn-primary" id="rAgain">🔁 Tekrar Dene</button>
            ${cfg.topicId ? `<a class="btn btn-green" href="#/topic/${cfg.topicId}">📖 Konuya Dön</a>` : ""}
            <a class="btn btn-ghost" href="#/arena">🏁 Yarışmaya Geç</a>
            <a class="btn btn-ghost" href="#/">Ana Sayfa</a>
          </div>
          ${got.length ? `<div class="example" style="margin-top:18px">🎖️ Yeni rozet(ler): <b>${got.map((b) => b.name).join(", ")}</b></div>` : ""}
        </div>`;
      $("#rAgain").onclick = () => { if (cfg.topicId) startTest(cfg.topicId); else router(); };
    }

    paint();
  }

  /* =========================================================
     YARIŞMA SİSTEMİ
  ========================================================= */
  const MODE_NAME = {
    hizli: "⚡ Hızlı Yarış",
    turnuva: "🎤 Bilgi Yarışması",
    sampiyon: "👑 Şampiyonlar Ligi",
    duel: "🥊 2 Kişilik Kapışma",
    merdiven: "🪜 Kule Tırmanışı",
    eleme: "💀 Eleme Turu",
    konu: "🎯 Konu Yarışması",
    online: "🌐 Online Yarışma"
  };
  let scope = 0; // 0 = tüm sınıflar

  function viewArena() {
    $("#app").innerHTML = `
      <h1>🏁 Yarışmalar</h1>
      <p class="sub">Konularla alakalı yarışmalara katıl. Sorular müfredattan rastgele seçilir,
      en yüksek puanı yap ve rekorunu kır. Gerçek rakiplerle yarışmak istersen
      <b style="color:var(--cyan)">Online Yarışma Odaları</b>'na katıl!</p>

      <div class="row" style="margin:20px 0 8px">
        <span class="pill">Yarışmacı:</span>
        <input id="playerName" value="${esc(S.name || "Sen")}" maxlength="14" placeholder="Adın"
          style="background:var(--card);border:1px solid var(--border);color:var(--txt);border-radius:12px;padding:9px 14px;font-weight:700;width:170px">
        <span class="pill">Soru havuzu:</span>
        <button class="btn ${scope === 0 ? "btn-primary" : "btn-ghost"} btn-sm" data-scope="0">Tüm Sınıflar</button>
        ${GRADES.map((g) => `<button class="btn ${scope === g.grade ? "btn-primary" : "btn-ghost"} btn-sm" data-scope="${g.grade}">${g.label}</button>`).join("")}
      </div>

      <div class="grid grid-3" style="margin-top:16px">
        <div class="mode-card on-card" onclick="location.hash='#/online'">
          <div class="micon">🌐</div><h3>Online Yarışma Odaları</h3>
          <p><b>Gerçek oyuncularla</b> aynı odada yarış: oda kur, <b>IP kodunu</b> paylaş, arkadaşın girsin.
          Bot yok, rastgele eşleşme yok.</p>
          <div class="mtags"><span class="tag">2-10 kişi</span><span class="tag">özel oda</span><span class="tag">gerçek rakip</span></div>
        </div>
        <div class="mode-card" data-mode="hizli">
          <div class="micon">⚡</div><h3>Hızlı Yarış</h3>
          <p>60 saniye, 15 soru. Her doğru 10 puan, 5'li seride bonus!</p>
          <div class="mtags"><span class="tag">60 sn</span><span class="tag">15 soru</span><span class="tag">tek başına</span></div>
        </div>
        <div class="mode-card" data-mode="turnuva">
          <div class="micon">🎤</div><h3>Bilgi Yarışması</h3>
          <p>Soru başına 20 saniye, 10 soru. Süre biterse puan kaçar.</p>
          <div class="mtags"><span class="tag">10 soru</span><span class="tag">20 sn/soru</span><span class="tag">tek başına</span></div>
        </div>
        <div class="mode-card" data-mode="sampiyon">
          <div class="micon">👑</div><h3>Şampiyonlar Ligi</h3>
          <p>20 soru, 4 dakika. Tüm müfredattan karışık, en zorlu mücadele.</p>
          <div class="mtags"><span class="tag">20 soru</span><span class="tag">240 sn</span><span class="tag">zorlu</span></div>
        </div>
        <div class="mode-card" data-mode="duel">
          <div class="micon">🥊</div><h3>2 Kişilik Kapışma</h3>
          <p>Aynı soru iki oyuncuya da gider ve <b>aynı anda</b> cevaplanır: en hızlı doğru <b>2× puan (20)</b> alır, doğru ama yavaş 10 puan, bilemeyen 0 puan.</p>
          <div class="mtags"><span class="tag">2 oyuncu</span><span class="tag">aynı anda</span><span class="tag">en hızlı 2×</span></div>
        </div>
        <div class="mode-card" data-mode="merdiven">
          <div class="micon">🪜</div><h3>Kule Tırmanışı</h3>
          <p>Doğru bir basamak yukarı, yanlış bir basamak aşağı! Hedef: 10. basamağa ulaşmak.</p>
          <div class="mtags"><span class="tag">12 soru</span><span class="tag">15 sn/soru</span><span class="tag">hedef 10</span></div>
        </div>
        <div class="mode-card" data-mode="eleme">
          <div class="micon">💀</div><h3>Eleme Turu</h3>
          <p>Tek yanlış elenmek demek. Ne kadar dayanabilirsin? Serini koru, 10 doğru hedefle.</p>
          <div class="mtags"><span class="tag">15 hak</span><span class="tag">20 sn/soru</span><span class="tag">solo</span></div>
        </div>
      </div>
    `;

    $$("[data-scope]").forEach((b) => (b.onclick = () => { scope = +b.getAttribute("data-scope"); viewArena(); }));
    $$("[data-mode]").forEach((b) => (b.onclick = () => {
      const m = b.getAttribute("data-mode");
      if (m === "duel") viewDuelWelcome();
      else startArena(m, scope);
    }));
    const pn = $("#playerName");
    if (pn) pn.oninput = () => { S.name = pn.value.trim() || "Sen"; save(); };
  }

  /* ---------- 2 Kişilik Kapışma ---------- */

  // Karşılama (hoş geldin) ekranı: sınıf seçilir, sonra oyun başlar
  function viewDuelWelcome() {
    let sel = scope || 0;
    let selTopic = "";
    const grades = [5, 6, 7, 8];

    // seçili sınıfa göre konu listesi (isteğe bağlı seçim)
    function topicOptions(g) {
      const gs = g ? GRADES.filter((x) => x.grade === g) : GRADES;
      let html = `<option value="">★ Tüm konular</option>`;
      gs.forEach((gr) => {
        html += `<optgroup label="${esc(gr.label)}">`;
        gr.topics.forEach((t) => {
          html += `<option value="${t.id}" ${selTopic === t.id ? "selected" : ""}>${esc(t.title)}</option>`;
        });
        html += `</optgroup>`;
      });
      return html;
    }
    const topicInScope = (id, g) => {
      if (!id) return true;
      const f = topicById(id);
      return !!f && (!g || f.g.grade === g);
    };
    const updMeta = () => {
      const f = selTopic ? topicById(selTopic) : null;
      const pool = f ? f.t.questions.length
                     : (sel ? questionsOfGrade(sel).length : allQuestions().length);
      const el = $("#wMeta");
      if (el) el.textContent = Math.min(10, pool) + " soru · 15 saniye · en hızlı doğru 2× puan";
    };

    document.body.classList.add("welcome-mode");
    $("#app").innerHTML = `
      <div class="welcome">
        <div class="w-box">
          <h1 class="w-page-title">İkili Kapışma</h1>
          <div class="w-card">
            <div class="w-card-head">
              <span class="w-emoji">🥊</span>
              <div class="w-head-t">
                <div class="w-title">Aynı cihazda kapışma</div>
                <div class="w-meta" id="wMeta">10 soru · 15 saniye · en hızlı doğru 2× puan</div>
              </div>
              <span class="w-badge">2 oyuncu</span>
            </div>
            <div class="w-body">
              <p class="w-sub"><b>Aynı soru ikisine de gider, birlikte cevaplarsınız!</b> En hızlı <b>doğru</b> cevabı veren <b>2× puan (20)</b> kazanır, doğru ama yavaş olan 10 puan, bilemeyen <b>0 puan</b> alır.<br>
              Önce sınıfı, ardından istersen <b>konuyu</b> seç.</p>
              <div class="w-grades" id="wGrades">
            ${grades.map((g) => `
              <button class="w-grade ${sel === g ? "on" : ""}" data-g="${g}" style="--gc:var(--g${g})">
                <b>${g}</b><span>Sınıf</span>
              </button>`).join("")}
            <button class="w-grade ${sel === 0 ? "on" : ""}" data-g="0" style="--gc:var(--cyan)">
              <b>★</b><span>Tümü</span>
            </button>
              </div>
              <div class="w-topic-row">
                <label class="w-topic-label" for="wTopic">📚 Konu</label>
                <select class="w-topic" id="wTopic">${topicOptions(sel)}</select>
              </div>
              <button class="w-start" id="wStart">⚔️ Oyunu Başlat</button>
              <a class="w-skip" href="#/arena">Geç</a>
            </div>
          </div>
        </div>
      </div>`;

    $$("#wGrades .w-grade").forEach((b) => (b.onclick = () => {
      sel = +b.getAttribute("data-g");
      $$("#wGrades .w-grade").forEach((x) => x.classList.toggle("on", x === b));
      if (!topicInScope(selTopic, sel)) selTopic = "";   // konu yeni kapsamda yoksa sıfırla
      const tp = $("#wTopic");
      if (tp) { tp.innerHTML = topicOptions(sel); tp.value = selTopic; }
      updMeta();
    }));

    const tpSel = $("#wTopic");
    if (tpSel) tpSel.onchange = () => { selTopic = tpSel.value; updMeta(); };

    const go = () => { clearHooks(); scope = sel; startDuel("Oyuncu 1", "Oyuncu 2", sel, selTopic || null); };
    $("#wStart").onclick = go;
    const onKey = (e) => {
      if (e.key === "Enter") { e.preventDefault(); go(); }
      else if (e.key === "Escape") location.hash = "#/arena";
    };
    document.addEventListener("keydown", onKey);
    cleanup = () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("welcome-mode");
    };
  }

  function startKonuRace(topicId) {
    const found = topicById(topicId);
    if (!found) return;
    startArena("konu", 0, found);
  }

  function startArena(mode, sc, topicFound) {
    let pool, count, timeMode, limit, title, subtitle;
    let variant = "normal";   // normal | merdiven | eleme

    if (mode === "konu") {
      const { g, t } = topicFound;
      pool = t.questions.map((q) => ({ q, t, g }));
      count = Math.min(10, pool.length);
      timeMode = "total"; limit = 60;
      title = t.title + " Yarışması"; subtitle = g.label + " · Konu Yarışması";
    } else if (mode === "hizli") {
      pool = sc ? questionsOfGrade(sc) : allQuestions();
      count = Math.min(15, pool.length); timeMode = "total"; limit = 60;
      title = "Hızlı Yarış"; subtitle = (sc ? gradeByNum(sc).label : "Tüm sınıflar") + " · 60 saniye";
    } else if (mode === "turnuva") {
      pool = sc ? questionsOfGrade(sc) : allQuestions();
      count = Math.min(10, pool.length); timeMode = "per"; limit = 20;
      title = "Bilgi Yarışması"; subtitle = (sc ? gradeByNum(sc).label : "Tüm sınıflar") + " · 10 soru";
    } else if (mode === "merdiven") {
      pool = sc ? questionsOfGrade(sc) : allQuestions();
      count = Math.min(12, pool.length); timeMode = "per"; limit = 15;
      variant = "merdiven";
      title = "Kule Tırmanışı"; subtitle = (sc ? gradeByNum(sc).label : "Tüm sınıflar") + " · Hedef: 10. basamak";
    } else if (mode === "eleme") {
      pool = sc ? questionsOfGrade(sc) : allQuestions();
      count = Math.min(15, pool.length); timeMode = "per"; limit = 20;
      variant = "eleme";
      title = "Eleme Turu"; subtitle = (sc ? gradeByNum(sc).label : "Tüm sınıflar") + " · Tek yanlış elenmek";
    } else {
      pool = allQuestions();
      count = Math.min(20, pool.length); timeMode = "total"; limit = 240;
      title = "Şampiyonlar Ligi"; subtitle = "Tüm sınıflar · 4 dakika";
    }

    // kolaydan zora karıştır, havuz yetersizse tekrarla
    const qs = [];
    const shuffled = shuffle(pool);
    while (qs.length < count) qs.push(shuffled[qs.length % shuffled.length]);

    const me = { name: S.name || "Sen", score: 0, me: true, streak: 0, ladder: 0 };

    runArena({ mode, variant, qs, timeMode, limit, title, subtitle, me, scope: sc, topicId: topicFound ? topicFound.t.id : null });
  }

  function runArena(cfg) {
    const { qs, me } = cfg;
    const variant = cfg.variant || "normal";   // normal | merdiven | eleme
    let i = 0, correct = 0, timeLeft = cfg.limit, perLeft = cfg.limit, answered = false, finished = false;
    let eliminated = false, forcedEnd = false;
    const start = Date.now();

    function paintStandings() {
      const el = $("#standList");
      if (!el) return;
      if (variant === "merdiven") {   // kule paneli
        el.innerHTML = `
          <div class="rank first"><div class="nm" style="font-size:13px">Basamak</div><div class="sc">${me.ladder}/10 🗼</div></div>
          <div class="rank"><div class="nm" style="font-size:13px">Doğru</div><div class="sc">${correct}</div></div>
          <div class="rank"><div class="nm" style="font-size:13px">Seri</div><div class="sc">${me.streak}</div></div>`;
        return;
      }
      el.innerHTML = `
        <div class="rank first"><div class="nm" style="font-size:13px">${variant === "eleme" ? "Kalan hak" : "Soru"}</div><div class="sc">${i + (answered ? 1 : 0)}/${qs.length}</div></div>
        <div class="rank"><div class="nm" style="font-size:13px">Doğru</div><div class="sc">${correct}</div></div>
        <div class="rank"><div class="nm" style="font-size:13px">Seri</div><div class="sc">${me.streak}</div></div>
        <div class="rank"><div class="nm" style="font-size:13px">Puan</div><div class="sc">${me.score}</div></div>`;
    }

    function layout() {
      const panelTitle = variant === "merdiven" ? "🗼 Kule Durumu" : variant === "eleme" ? "💀 Hayatta Kalma" : "📊 Canlı Sıralama";
      $("#app").innerHTML = `
        <div class="quiz-head">
          <div>
            <div class="qmeta"><span class="live">CANLI</span> ${esc(cfg.subtitle)}</div>
            <h2 style="margin-top:4px">${esc(cfg.title)}</h2>
          </div>
          <div class="row">
            <div class="timer" id="aTimer">⏱ ${cfg.timeMode === "total" ? fmt(timeLeft) : fmt(perLeft)}</div>
            <div class="dots" id="aDots">${qs.map((_, k) => `<i class="${k < i ? (qs[k]._ok ? "ok" : "no") : k === i ? "on" : ""}"></i>`).join("")}</div>
          </div>
        </div>
        <div class="arena-layout">
          <div id="aMain"></div>
          <div class="standings">
            <h4>${panelTitle}</h4>
            <div id="standList"></div>
            <div class="rank" style="background:rgba(34,197,94,.12);margin-top:10px">
              <div class="nm" style="font-size:13px">${variant === "merdiven" ? "Basamak" : "Puanın"}</div>
              <div class="sc" id="myScore">${variant === "merdiven" ? me.ladder + "/10" : me.score}</div>
            </div>
            <div class="rank" style="background:rgba(108,140,255,.12)">
              <div class="nm" style="font-size:13px">Seri</div><div class="sc" id="myStreak">0</div>
            </div>
          </div>
        </div>`;
      paintQuestion();
      paintStandings();
    }

    function paintQuestion() {
      const q = qs[i].q;
      const ord = shuffle([0, 1, 2, 3]);   // şıklar her soruda farklı sırayla gelir
      $("#aMain").innerHTML = `
        <div class="qcard">
          <div class="qmeta">Soru ${i + 1}/${qs.length} · ${esc(qs[i].t.title)} · ${diffLabel(q.d)}</div>
          <div class="qtext">${q.q}</div>
          <div class="opts" id="aOpts">
            ${ord.map((oi, k) => `<button class="opt" data-k="${oi}"><span class="key">${"ABCD"[k]}</span><span>${q.o[oi]}</span></button>`).join("")}
          </div>
          <div class="feedback" id="aFb"></div>
        </div>`;
      answered = false;
      $$("#aOpts .opt").forEach((b) => (b.onclick = () => answer(+b.getAttribute("data-k"))));
      perLeft = cfg.limit;

      const onKey = (e) => {
        if (finished) return;
        if (answered) { if (e.key === "Enter") { const n = $("#aNext"); if (n) n.click(); } return; }
        const k = ["1", "2", "3", "4"].indexOf(e.key);
        if (k >= 0) { const b = $('#aOpts .opt[data-k="' + k + '"]'); if (b) b.click(); }
      };
      document.removeEventListener("keydown", arenaKey);
      arenaKey = onKey;
      document.addEventListener("keydown", onKey);
    }

    function answer(k) {
      if (answered || finished) return;
      answered = true;
      const q = qs[i].q;
      const ok = k === q.a;
      qs[i]._ok = ok;
      $$("#aOpts .opt").forEach((b) => {
        const bk = +b.getAttribute("data-k");
        b.disabled = true;
        if (bk === q.a) b.classList.add("correct");
        else if (bk === k) b.classList.add("wrong");
        else b.classList.add("dim");
      });
      const fb = $("#aFb");
      fb.className = "feedback show " + (ok ? "ok" : "no");
      fb.innerHTML = (ok ? "<b>✅ Doğru!</b>" : "<b>❌ Yanlış! Doğru cevap: " + "ABCD"[q.a] + "</b>") + esc(q.e);
      ok ? sOk() : sNo();

      if (ok) {
        correct++;
        me.streak++;
        if (variant === "merdiven") {
          me.ladder = clamp(me.ladder + 1, 0, 10);
          if (me.ladder === 10) { toast("🗼 Zirvedesin! Kule tamamlandı!", true); forcedEnd = true; }
        } else if (variant === "eleme") {
          me.score += 10;
        } else {
          let gain = 10;
          if (me.streak % 5 === 0) { gain += 10; toast("🔥 " + me.streak + " seri! +10 bonus", true); }
          me.score += gain;
        }
        S.stats.correct++;
      } else {
        me.streak = 0;
        S.stats.wrong++;
        if (variant === "merdiven") {
          me.ladder = clamp(me.ladder - 1, 0, 10);
          toast("⬇️ Bir basamak aşağı düştün!");
        } else if (variant === "eleme") {
          eliminated = true;
        }
      }
      if (variant === "merdiven") me.score = me.ladder * 10;
      S.stats.maxStreak = Math.max(S.stats.maxStreak, S.stats.streak = me.streak);
      save(); renderTopStats();

      // rakip botlar yok — kendi performansın güncellenir
      $("#myScore").textContent = variant === "merdiven" ? me.ladder + "/10" : me.score;
      $("#myStreak").textContent = me.streak;
      paintStandings();
      $("#aDots").innerHTML = qs.map((_, k) => `<i class="${k < i ? (qs[k]._ok ? "ok" : "no") : k === i ? "on" : ""}"></i>`).join("");

      $("#aFb").insertAdjacentHTML("beforeend",
        `<div class="quiz-actions"><button class="btn ${eliminated ? "btn-red" : "btn-primary"}" id="aNext">${nextLabel()}</button></div>`);
      $("#aNext").onclick = advance;
      $("#aNext").focus();
    }

    function nextLabel() {
      if (eliminated) return "💀 Elendin — Sonucu Gör →";
      if (forcedEnd) return "🏆 Kuleyi Fethettin →";
      return i === qs.length - 1 ? "Yarışı Bitir →" : "Sonraki Soru →";
    }

    function advance() {
      if (eliminated || forcedEnd) return finish();
      i++;
      if (i >= qs.length) return finish();
      paintQuestion();
      $("#aDots").innerHTML = qs.map((_, k) => `<i class="${k < i ? (qs[k]._ok ? "ok" : "no") : k === i ? "on" : ""}"></i>`).join("");
    }

    function timeout() {
      if (answered || finished) return;
      answered = true;
      const q = qs[i].q;
      qs[i]._ok = false;
      $$("#aOpts .opt").forEach((b) => {
        const bk = +b.getAttribute("data-k");
        b.disabled = true;
        if (bk === q.a) b.classList.add("correct"); else b.classList.add("dim");
      });
      const fb = $("#aFb");
      fb.className = "feedback show no";
      fb.innerHTML = "<b>⏰ Süre doldu!</b>Doğru cevap: " + "ABCD"[q.a] + " — " + esc(q.e);
      sNo();
      me.streak = 0; S.stats.wrong++;
      if (variant === "merdiven") {
        me.ladder = clamp(me.ladder - 1, 0, 10);
        me.score = me.ladder * 10;
        toast("⬇️ Süre doldu, bir basamak aşağı!");
      } else if (variant === "eleme") {
        eliminated = true;
      }
      save();
      $("#myStreak").textContent = 0;
      $("#myScore").textContent = variant === "merdiven" ? me.ladder + "/10" : me.score;
      paintStandings();
      $("#aFb").insertAdjacentHTML("beforeend",
        `<div class="quiz-actions"><button class="btn ${eliminated ? "btn-red" : "btn-primary"}" id="aNext">${nextLabel()}</button></div>`);
      $("#aNext").onclick = advance;
    }

    function finish() {
      if (finished) return;
      finished = true;
      clearInterval(tick);
      clearHooks();
      const pct = Math.round((correct / qs.length) * 100);
      const best = (S.scores[cfg.mode] || []).reduce((m, r) => Math.max(m, r.score), 0);   // önceki rekorun
      const won = variant === "eleme" ? correct >= 10
                : variant === "merdiven" ? me.ladder >= 10
                : pct >= 70;   // rakip bot yok: hedef %70+ isabet

      let rtitle;
      if (variant === "eleme") rtitle = eliminated ? "💀 Elendin!" : "🎖️ Hayatta Kaldın!";
      else if (variant === "merdiven") rtitle = me.ladder >= 10 ? "🗼 Kuleyi Fethettin! 🏆" : "🪜 Kule Tırmanışı Bitti";
      else rtitle = pct >= 90 ? "Kusursuz Yarış! 🌟" : pct >= 70 ? "Zafere ulaştın! 🏆" : pct >= 50 ? "Fena değildi 💪" : "Pratik yapmaya devam 🔁";

      S.scores[cfg.mode] = S.scores[cfg.mode] || [];
      S.scores[cfg.mode].push({
        name: S.name || "Sen", score: me.score, correct, total: qs.length, date: Date.now(),
        pct, ladder: me.ladder, eliminated: eliminated
      });
      S.scores[cfg.mode].sort((a, b) => b.score - a.score);
      S.scores[cfg.mode] = S.scores[cfg.mode].slice(0, 10);
      S.stats.arenaPlayed++;
      if (won) S.stats.arenaWins++;
      save();
      checkBadges(false);
      if (won) sWin();

      const record = Math.max(best, me.score);
      const isRecord = me.score > best && me.score > 0;
      $("#app").innerHTML = `
        <div class="qcard result">
          <div class="rtitle">${rtitle}</div>
          <div class="big">${variant === "merdiven" ? me.ladder + "/10" : me.score}</div>
          <div class="rsub">${esc(cfg.title)} · ${correct}/${qs.length} doğru (٪${pct})${variant === "eleme" && eliminated ? " · Elemenin eşiğindeydin!" : ""}</div>
          <div class="chips">
            <div class="chip"><div class="cv">٪${pct}</div><div class="ck">Başarı</div></div>
            <div class="chip"><div class="cv">${variant === "merdiven" ? me.ladder + " kat" : correct}</div><div class="ck">${variant === "merdiven" ? "Ulaşılan" : "Doğru"}</div></div>
            <div class="chip"><div class="cv">${fmt(Math.floor((Date.now() - start) / 1000))}</div><div class="ck">Süre</div></div>
            <div class="chip"><div class="cv">${isRecord ? "Yeni!" : record}</div><div class="ck">${isRecord ? "Rekor 🏆" : "Rekorun"}</div></div>
          </div>
          <div class="card" style="text-align:left;margin-bottom:18px">
            <div class="rank first"><div class="pos">🎯</div><div class="nm">Bu yarıştaki puanın</div><div class="sc">${me.score}</div></div>
            <div class="rank"><div class="pos">🏅</div><div class="nm">En iyi rekorun</div><div class="sc">${record}</div></div>
            <div class="rank"><div class="pos">🔥</div><div class="nm">Bu yarıştaki en uzun serin</div><div class="sc">${me.streak}</div></div>
          </div>
          <div class="row" style="justify-content:center">
            <button class="btn btn-primary" id="aAgain">🔁 Tekrar Yarış</button>
            <a class="btn btn-green" href="#/scores">📊 Sıralamayı Gör</a>
            <a class="btn btn-ghost" href="#/arena">Diğer Modlar</a>
            <a class="btn btn-ghost" href="#/">Ana Sayfa</a>
          </div>
        </div>`;
      $("#aAgain").onclick = () => startArena(cfg.mode, cfg.scope || 0, cfg.topicId ? topicById(cfg.topicId) : null);
      renderTopStats();
    }

    const tick = setInterval(() => {
      if (finished) return;
      if (cfg.timeMode === "total") {
        timeLeft--;
        const el = $("#aTimer");
        if (el) { el.textContent = "⏱ " + fmt(timeLeft); el.className = "timer" + (timeLeft <= 10 ? " low" : ""); }
        if (timeLeft <= 0) { finish(); return; }
        if (!answered && timeLeft === Math.min(10, cfg.limit)) toast("⏰ Son 10 saniye!");
      } else {
        if (answered) return;
        perLeft--;
        const el = $("#aTimer");
        if (el) { el.textContent = "⏱ " + fmt(perLeft); el.className = "timer" + (perLeft <= 5 ? " low" : ""); }
        if (perLeft <= 0) timeout();
      }
    }, 1000);
    cleanup = () => {
      clearInterval(tick);
      if (arenaKey) { document.removeEventListener("keydown", arenaKey); arenaKey = null; }
    };

    layout();
  }

  /* =========================================================
     2 KİŞİLİK KAPIŞMA (aynı cihazda, sırayla)
  ========================================================= */
  function startDuel(n1, n2, sc, topicId) {
    const found = topicId ? topicById(topicId) : null;
    const pool = found
      ? found.t.questions.map((q) => ({ q, t: found.t, g: found.g }))
      : (sc ? questionsOfGrade(sc) : allQuestions());
    const count = Math.min(10, pool.length);   // 10 soru — ikisi de aynı anda cevaplar
    const perTxt = count + " soru";
    const qs = [];
    const shuffled = shuffle(pool);
    while (qs.length < count) qs.push(shuffled[qs.length % shuffled.length]);
    runDuel({
      qs,
      p1: { name: n1, score: 0, correct: 0 },
      p2: { name: n2, score: 0, correct: 0 },
      scope: sc || 0,
      topicId: found ? found.t.id : null,
      title: found ? found.t.title + " Kapışması" : "2 Kişilik Kapışma",
      subtitle: (found ? found.g.label + " · " + found.t.title
                       : (sc ? gradeByNum(sc).label : "Tüm sınıflar")) + " · " + perTxt
    });
  }

  /* ===== İKİ YARIŞMACI AYNI ANDA KAPIŞIR =====
     Aynı soru iki bölgeye de gider; herkes kendi alanında cevaplar.
     • En hızlı DOĞRU cevap → 2× puan (20)
     • Doğru ama yavaş      → 10 puan
     • Yanlış / süre dolarsa → 0 puan
     Klavye: Oyuncu 1 → 1 2 3 4 · Oyuncu 2 → 7 8 9 0 */
  function runDuel(cfg) {
    const qs = cfg.qs;
    const P = [cfg.p1, cfg.p2];
    const N = qs.length;
    const PER = 15, BASE = 10, DOUBLE = 20;
    let i = 0, revealed = false, finished = false, perLeft = PER;
    let pick = [null, null];        // bu sorudaki cevaplar {c: şık, t: zaman}
    let gain = [0, 0];              // bu soruda kazanılan puan
    let res = [];                   // soru bazlı puanlar (nokta çizelgesi için)
    let curOrd = [[0, 1, 2, 3], [0, 1, 2, 3]];
    let tick = null;
    const start = Date.now();

    const stopTick = () => { if (tick) { clearInterval(tick); tick = null; } };
    const updateTimer = () => {
      const el = $("#dTimer");
      if (el) { el.textContent = "⏱ " + fmt(perLeft); el.className = "timer" + (perLeft <= 5 ? " low" : ""); }
    };
    const pdots = (k) => {
      let s = "";
      for (let q = 0; q < N; q++) {
        const done = q < i || (q === i && revealed);
        s += `<i class="${done ? (res[q] && res[q][k] > 0 ? "ok" : "no") : q === i ? "on" : ""}"></i>`;
      }
      return s;
    };
    const refreshSides = () => {
      P.forEach((p, k) => {
        const sc = $("#dScore" + k); if (sc) sc.innerHTML = p.score + "<small> puan</small>";
        const dt = $("#dPdots" + k); if (dt) dt.innerHTML = pdots(k);
      });
    };

    cleanup = () => {
      stopTick();
      if (arenaKey) { document.removeEventListener("keydown", arenaKey); arenaKey = null; }
    };

    // klavye: Oyuncu 1 → 1 2 3 4 · Oyuncu 2 → 7 8 9 0
    arenaKey = (e) => {
      if (finished) return;
      if (revealed) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); const b = $("#dNext"); if (b) b.click(); }
        return;
      }
      const MAP = { "1": [0, 0], "2": [0, 1], "3": [0, 2], "4": [0, 3],
                    "7": [1, 0], "8": [1, 1], "9": [1, 2], "0": [1, 3] };
      const hit = MAP[e.key];
      if (!hit) return;
      e.preventDefault();
      const btn = document.querySelector('#dOpts' + hit[0] + ' .opt[data-pos="' + hit[1] + '"]');
      if (btn && !btn.disabled) btn.click();
    };
    document.addEventListener("keydown", arenaKey);

    function head() {
      return `
        <div class="quiz-head">
          <div>
            <div class="qmeta">🥊 ${esc(cfg.title)} · <b style="color:var(--cyan)">aynı anda</b> cevaplayın</div>
            <h2 style="margin-top:4px">${esc(cfg.subtitle || "İkili Kapışma")}</h2>
          </div>
          <div class="row">
            <span class="pill">⚡ En hızlı doğru: 2× puan</span>
            <span class="pill">Soru ${i + 1}/${N}</span>
          </div>
        </div>`;
    }

    function sideHtml(k, ord) {
      const q = qs[i];
      const locked = !!pick[k];
      return `
        <div class="d-side ${k === 0 ? "p1" : "p2"} on" id="dSide${k}">
          <div class="d-side-head">
            <span class="d-avatar">${k === 0 ? "1️⃣" : "2️⃣"}</span>
            <div class="d-side-name">
              <b>${esc(P[k].name)}</b>
              <span id="dStat${k}">${locked ? "🔒 Cevabın kilitlendi" : "🎯 Cevabını ver!"}</span>
            </div>
            <div class="d-side-score" id="dScore${k}">${P[k].score}<small> puan</small></div>
          </div>
          <div class="d-pdots" id="dPdots${k}">${pdots(k)}</div>
          <div class="qcard d-qcard">
            <div class="qmeta">Soru ${i + 1}/${N} · ${esc(q.t.title)} · ${diffLabel(q.q.d)} · <b style="color:var(--cyan)">${k === 0 ? "tuş: 1-4" : "tuş: 7-8-9-0"}</b></div>
            <div class="qtext">${q.q.q}</div>
            <div class="opts" id="dOpts${k}">
              ${ord.map((c, n) => `<button class="opt" data-pos="${n}" data-k="${c}"><span class="key">${"ABCD"[n]}</span><span>${q.q.o[c]}</span></button>`).join("")}
            </div>
            <div class="feedback" id="dFb${k}"></div>
          </div>
        </div>`;
    }

    function renderPlay() {
      curOrd = [shuffle([0, 1, 2, 3]), shuffle([0, 1, 2, 3])];   // her oyuncunun şıkları ayrı karışır
      pick = [null, null];
      gain = [0, 0];
      revealed = false;
      perLeft = PER;
      $("#app").innerHTML = head() + `
        <div class="duel-split">
          ${sideHtml(0, curOrd[0])}
          <div class="d-vs">
            <div class="d-vs-badge">VS</div>
            <div class="timer" id="dTimer">⏱ ${fmt(perLeft)}</div>
            <div class="d-vs-round">Soru ${i + 1}<span>/${N}</span></div>
            <div class="d-vs-goal">⚡ En hızlı: 2×</div>
          </div>
          ${sideHtml(1, curOrd[1])}
        </div>
        <div class="d-foot" id="dFoot"></div>`;
      updateTimer();
      [0, 1].forEach((k) => {
        $$("#dOpts" + k + " .opt").forEach((b) => (b.onclick = () => pickAns(k, +b.getAttribute("data-pos"))));
      });
      startTick();
    }

    function pickAns(k, pos) {
      if (finished || revealed || pick[k]) return;
      pick[k] = { c: curOrd[k][pos], t: Date.now() };
      $$("#dOpts" + k + " .opt").forEach((b) => {
        b.disabled = true;
        if (+b.getAttribute("data-pos") === pos) b.classList.add("picked");
      });
      const st = $("#dStat" + k);
      if (st) st.textContent = "🔒 Cevabın kilitlendi — bekleniyor";
      if (pick[0] && pick[1]) reveal();
    }

    function reveal() {
      if (revealed || finished) return;
      revealed = true;
      stopTick();
      const q = qs[i].q;
      const ok = [0, 1].filter((k) => pick[k] && pick[k].c === q.a);
      let first = -1;
      if (ok.length === 2) first = pick[0].t <= pick[1].t ? 0 : 1;   // aynı anda ise ikisi de 2×
      else if (ok.length === 1) first = ok[0];

      gain = [0, 0];
      ok.forEach((k) => {
        gain[k] = k === first ? DOUBLE : BASE;
        P[k].score += gain[k];
        P[k].correct++;
      });
      res[i] = gain.slice();

      [0, 1].forEach((k) => {
        const letter = "ABCD"[curOrd[k].indexOf(q.a)];
        $$("#dOpts" + k + " .opt").forEach((b) => {
          const c = +b.getAttribute("data-k");
          b.disabled = true;
          if (c === q.a) b.classList.add("correct");
          else if (pick[k] && pick[k].c === c) b.classList.add("wrong");
          else b.classList.add("dim");
        });
        const fb = $("#dFb" + k);
        let cls, txt;
        if (gain[k] === DOUBLE) { cls = "ok"; txt = "<b>⚡ En hızlı! DOĞRU → 2× +" + DOUBLE + " puan</b>"; }
        else if (gain[k] === BASE) { cls = "ok"; txt = "<b>✅ Doğru! +" + BASE + " puan</b>" + (ok.length === 2 ? " (rakibinden yavaş)" : ""); }
        else if (pick[k]) { cls = "no"; txt = "<b>❌ Yanlış! Doğru cevap: " + letter + "</b> · 0 puan — " + esc(q.e); }
        else { cls = "no"; txt = "<b>⏰ Süre doldu! Doğru cevap: " + letter + "</b> · 0 puan — " + esc(q.e); }
        fb.className = "feedback show " + cls;
        fb.innerHTML = txt;
        const st = $("#dStat" + k);
        if (st) st.textContent = gain[k] > 0 ? "+" + gain[k] + " puan 🎉" : "Bu soruda 0 puan 😔";
      });
      refreshSides();

      $("#dFoot").innerHTML = `
        <div class="d-explain"><b>📖 Açıklama:</b> ${esc(q.e)}</div>
        <button class="btn btn-primary" id="dNext">${i + 1 >= N ? "🏁 Sonuçları Gör" : "Sonraki Soru ➜"}</button>`;
      $("#dNext").onclick = advance;
      $("#dNext").focus();
      if (gain[0] > 0 || gain[1] > 0) sOk(); else sNo();
    }

    function advance() {
      i++;
      if (i >= N) return end();
      renderPlay();
    }

    function startTick() {
      stopTick();
      tick = setInterval(() => {
        if (finished || revealed) return;
        perLeft--;
        updateTimer();
        if (perLeft <= 0) reveal();
      }, 1000);
    }

    function end() {
      if (finished) return;
      finished = true;
      stopTick();
      const winner = P[0].score === P[1].score ? -1 : (P[0].score > P[1].score ? 0 : 1);

      S.scores.duel = S.scores.duel || [];
      P.forEach((p, k) => S.scores.duel.push({
        name: p.name, score: p.score, correct: p.correct, total: N,
        date: Date.now(), rank: winner === -1 ? 0 : (k === winner ? 1 : 2), win: k === winner
      }));
      S.scores.duel.sort((a, b) => b.score - a.score);
      S.scores.duel = S.scores.duel.slice(0, 10);
      S.stats.arenaPlayed++;
      save();
      checkBadges(false);
      if (winner !== -1) sWin();

      const secs = Math.floor((Date.now() - start) / 1000);
      const fastest = (k) => res.filter((r) => r && r[k] === DOUBLE).length;
      const order = P.map((p, k) => ({ p, k })).sort((a, b) => b.p.score - a.p.score || b.p.correct - a.p.correct);
      $("#app").innerHTML = `
        <div class="qcard result">
          <div class="rtitle">${winner === -1 ? "🤝 Berabere!" : "🏆 " + esc(P[winner].name) + " Kazandı!"}</div>
          <div class="big">${order[0].p.score}<span style="font-size:.4em"> puan</span></div>
          <div class="rsub">${esc(cfg.title)} · ${N} soru · en hızlı doğru 2× puan · ${secs} saniye</div>
          <div class="chips">
            <div class="chip"><div class="cv">${P[0].score}</div><div class="ck">${esc(P[0].name)} puan</div></div>
            <div class="chip"><div class="cv">${P[1].score}</div><div class="ck">${esc(P[1].name)} puan</div></div>
            <div class="chip"><div class="cv">${P[0].correct}/${N} · ${P[1].correct}/${N}</div><div class="ck">Doğru (1-2)</div></div>
            <div class="chip"><div class="cv">${fastest(0)} · ${fastest(1)}</div><div class="ck">⚡ En hızlı (1-2)</div></div>
            <div class="chip"><div class="cv">${fmt(secs)}</div><div class="ck">Süre</div></div>
          </div>
          <div class="card" style="text-align:left;margin-bottom:18px">
            ${order.map(({ p, k }) => `
              <div class="rank">
                <div class="pos">${k === 0 ? "1️⃣" : "2️⃣"}</div>
                <div class="nm">${esc(p.name)} <small style="color:var(--muted)">· ${p.correct}/${N} doğru · ⚡${fastest(k)} en hızlı</small></div>
                <div class="sc">${p.score} p</div>
              </div>`).join("")}
          </div>
          <div class="row" style="justify-content:center">
            <button class="btn btn-primary" id="dAgain">🔁 Tekrar Kapış</button>
            <a class="btn btn-green" href="#/scores">📊 Sıralamayı Gör</a>
            <a class="btn btn-ghost" href="#/arena">Diğer Modlar</a>
            <a class="btn btn-ghost" href="#/">Ana Sayfa</a>
          </div>
        </div>`;
      $("#dAgain").onclick = () => startDuel(P[0].name, P[1].name, cfg.scope, cfg.topicId);
      renderTopStats();
    }

    renderPlay();
  }

  function fmt(s) { s = Math.max(0, s); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }

  /* =========================================================
     ONLINE ODALAR — sitedeki GERÇEK oyuncularla (bot yok)
  ========================================================= */
  const LOBBY_TOPIC = "matematikarena/lobby";
  const ROOM_PREFIX = "matematikarena/room/";
  const roomTopic = (c) => ROOM_PREFIX + c;
  const CODE_LETTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ";  // I ve O yok (1/0 ile karışmasın)
  const CODE_DIGITS = "23456789";                    // 0 ve 1 yok
  const CODE_CHARS = CODE_LETTERS + CODE_DIGITS;
  const ON_MODES = {
    race: { ico: "🏁", name: "Çok Kişili Yarışma", qCount: 15, per: 20, cap: [2, 10] },
    duel: { ico: "🥊", name: "İkili Kapışma (online)", qCount: 10, per: 15, cap: [2, 2] }
  };

  let netC = null, netState = "idle";
  const myId = "p" + Math.random().toString(36).slice(2, 9);
  let lobbySeen = {}, announceT = null, joinT = null, hbT = null;
  let room = null;      // {code, host, cap, priv, mode, grade, players:[{id,nick,host,seen}], started, seed}
  let game = null;
  let onNetStatus = null;
  let onForm = { mode: "race", grade: 0, cap: 6, priv: false };
  let joinCode = "";
  let onlineKey = null;

  const nick = () => (S.name || "Sen").trim().slice(0, 14) || "Sen";
  const publishRoom = (d) => { if (netC && room) netC.publish(roomTopic(room.code), d); };

  function ensureNet() {
    if (!window.MQTT) return null;
    if (!netC) {
      netC = window.MQTT.start();
      netC.onStatus((s) => {
        netState = s;
        if (onNetStatus) onNetStatus(s);
        if (s === "online") refreshRooms();
      });
      netC.subscribe(LOBBY_TOPIC, onLobbyMsg);
    }
    return netC;
  }

  function netPillHtml() {
    const map = {
      connecting: ["🟡", "Bağlanıyor…"],
      online: ["🟢", "Çevrimiçi"],
      offline: ["🔴", "Sunucuya ulaşılamıyor"],
      idle: ["⚪", "Kapalı"]
    };
    const m = map[netState] || map.idle;
    return `<span class="net-pill ${netState}">${m[0]} ${m[1]}</span>`;
  }

  /* ---------- açık oda listesi ---------- */
  function onLobbyMsg(m) {
    if (!m || m.t !== "hb") return;
    lobbySeen[m.code] = { code: m.code, nick: m.nick, cap: m.cap, n: m.n, mode: m.mode, grade: m.grade, started: m.started, ts: Date.now() };
    refreshRooms();
  }
  function liveRooms() {
    const now = Date.now();
    return Object.keys(lobbySeen)
      .map((k) => lobbySeen[k])
      .filter((r) => now - r.ts < 9000 && !r.started && r.code !== (room ? room.code : null))
      .sort((a, b) => b.ts - a.ts);
  }
  function refreshRooms() {
    const box = $("#onRooms");
    if (!box) return;
    box.innerHTML = roomsHtml();
    bindRoomRows();
  }
  function roomsHtml() {
    const rows = liveRooms();
    if (!rows.length) return '<div class="empty">Şu an açık oda yok. İlk sen kur! 🚀</div>';
    return `<table class="lb-table"><tr><th>Oda</th><th>Kurucu</th><th>Mod</th><th>Sınıf</th><th>Oyuncu</th><th></th></tr>` +
      rows.map((r) => {
        const M = ON_MODES[r.mode] || ON_MODES.race;
        return `<tr>
          <td><b style="letter-spacing:.14em">${r.code}</b></td>
          <td>${esc(r.nick || "?")}</td>
          <td>${M.ico} ${M.name}</td>
          <td>${r.grade ? r.grade + ". sınıf" : "Tümü"}</td>
          <td>${r.n}/${r.cap} ${r.n >= r.cap ? "🔴 DOLU" : "🟢"}</td>
          <td style="text-align:right">${r.n >= r.cap
            ? `<button class="btn btn-ghost btn-sm" disabled>Dolu</button>`
            : `<button class="btn btn-primary btn-sm" data-join="${r.code}">Katıl</button>`}</td>
        </tr>`;
      }).join("") + `</table>`;
  }
  function bindRoomRows() {
    $$("#onRooms [data-join]").forEach((b) => (b.onclick = () => joinRoom(b.getAttribute("data-join"))));
  }

  /* ---------- oda kurma / katılma ---------- */
  /* 6 haneli kod: her zaman 3 harf + 3 rakam, sırası rastgele karışık */
  function makeCode() {
    const chars = [];
    for (let i = 0; i < 3; i++) chars.push(CODE_LETTERS[Math.floor(Math.random() * CODE_LETTERS.length)]);
    for (let i = 0; i < 3; i++) chars.push(CODE_DIGITS[Math.floor(Math.random() * CODE_DIGITS.length)]);
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = chars[i]; chars[i] = chars[j]; chars[j] = t;
    }
    return chars.join("");
  }
  function cleanCode(v) {
    return String(v || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
  }

  function createRoom() {
    const c = ensureNet();
    if (!c || netState !== "online") return toast("Önce bağlantının kurulması bekleniyor…");
    const code = makeCode();
    onForm.cap = onForm.mode === "duel" ? 2 : clamp(onForm.cap, 2, 10);
    room = {
      code, host: true, cap: onForm.cap, priv: !!onForm.priv, mode: onForm.mode, grade: onForm.grade,
      players: [{ id: myId, nick: nick(), host: true, seen: Date.now() }], started: false, seed: 0
    };
    c.subscribe(roomTopic(code), onRoomMsg);
    startAnnounce();
    startHeartbeat();
    setOnlineCleanup();
    renderLobby();
    toast("Oda kuruldu! IP kodunu arkadaşına ver: " + code, true);
  }

  function joinRoom(codeStr) {
    const code = cleanCode(codeStr);
    if (code.length < 4) return toast("Geçerli bir oda IP'si gir (4-6 karakter)");
    const c = ensureNet();
    if (!c || netState !== "online") return toast("Bağlantı yok — birazdan tekrar dene");
    room = { code, host: false, pending: true, cap: 2, priv: false, mode: "race", grade: 0, players: [], started: false };
    c.subscribe(roomTopic(code), onRoomMsg);
    publishRoom({ t: "join", from: myId, nick: nick(), ver: 1 });
    startHeartbeat();
    setOnlineCleanup();
    renderPending();
    clearTimeout(joinT);
    joinT = setTimeout(() => {
      if (room && room.pending) { toast("Odaya ulaşılamadı — oda kapandı mı?"); leaveRoom(); }
    }, 8000);
  }

  function leaveRoom(silent) {
    if (room) {
      if (room.host) publishRoom({ t: "closed", from: myId });
      publishRoom({ t: "bye", from: myId });
      if (netC && room.code) netC.unsubscribe(roomTopic(room.code));
    }
    stopAnnounce();
    clearInterval(hbT); hbT = null;
    clearTimeout(joinT);
    stopGameTimers();
    room = null; game = null;
    if (!silent) { setOnlineCleanup(); renderOnlineHome(); }
  }

  /* ---------- host duyurusu + kalplenmesi ---------- */
  function startAnnounce() {
    stopAnnounce();
    announceT = setInterval(() => {
      if (!room || !room.host || room.started) return;
      broadcastState();
      if (!room.priv) {
        netC && netC.publish(LOBBY_TOPIC, {
          t: "hb", code: room.code, nick: nick(), cap: room.cap, n: room.players.length,
          mode: room.mode, grade: room.grade, started: room.started
        });
      }
    }, 2500);
  }
  function stopAnnounce() { clearInterval(announceT); announceT = null; }
  function startHeartbeat() {
    clearInterval(hbT);
    hbT = setInterval(() => { if (room && !room.host) publishRoom({ t: "alive", from: myId }); }, 4000);
  }
  function broadcastState() {
    publishRoom({ t: "state", from: myId, started: !!room.started, players: room.players.map((p) => ({ id: p.id, nick: p.nick, host: !!p.host })) });
  }

  /* ---------- oda mesajları ---------- */
  function onRoomMsg(m) {
    if (!m || !m.t || !room) return;
    const fromMe = m.from === myId;
    if (game) game.lastMsg = Date.now();

    if (room.host) {
      if (fromMe) {
        if (m.t === "ans" && game) hostRecord(m);   // kendi cevabı (broker'dan geri döner)
        return;
      }
      if (m.t === "join") {
        if (room.started) return publishRoom({ t: "reject", to: m.from, why: "started" });
        if (room.players.length >= room.cap) return publishRoom({ t: "reject", to: m.from, why: "full" });
        const exist = room.players.find((p) => p.id === m.from);
        if (exist) exist.seen = Date.now();
        else room.players.push({ id: m.from, nick: String(m.nick || "Oyuncu").slice(0, 14), host: false, seen: Date.now() });
        publishRoom({
          t: "seat", to: m.from, from: myId,
          room: { code: room.code, cap: room.cap, priv: room.priv, mode: room.mode, grade: room.grade, started: room.started },
          players: room.players.map((p) => ({ id: p.id, nick: p.nick, host: !!p.host }))
        });
        broadcastState();
        toast("👋 " + String(m.nick || "Oyuncu") + " odaya katıldı!", true);
        if (location.hash === "#/online" && !game) renderLobby();
      } else if (m.t === "alive") {
        const p = room.players.find((x) => x.id === m.from);
        if (p) p.seen = Date.now();
      } else if (m.t === "bye") {
        removePlayer(m.from);
      } else if (m.t === "ans" && game) {
        hostRecord(m);
      }
    } else {
      if (fromMe) return;
      if (m.t === "seat" && m.to === myId) {
        clearTimeout(joinT);
        room = {
          code: m.room.code, host: false, cap: m.room.cap, priv: m.room.priv, mode: m.room.mode,
          grade: m.room.grade, started: !!m.room.started, seed: 0,
          players: (m.players || []).map((p) => ({ id: p.id, nick: p.nick, host: !!p.host, seen: Date.now() }))
        };
        setOnlineCleanup();
        renderLobby();
        toast("Odaya katıldın: " + room.code, true);
      } else if (m.t === "reject" && m.to === myId) {
        const texts = { full: "Oda dolu! (" + (room ? room.cap : 2) + " kişi sınırı)", started: "Oyun çoktan başladı", gone: "Oda kapandı" };
        toast("❌ " + (texts[m.why] || "Giriş reddedildi"));
        leaveRoom();
      } else if (m.t === "state") {
        room.players = (m.players || []).map((p) => ({ id: p.id, nick: p.nick, host: !!p.host, seen: Date.now() }));
        if (m.started != null) room.started = !!m.started;
        if (!game && location.hash === "#/online") renderLobby();
      } else if (m.t === "start") {
        startGame(m, false);
      } else if (m.t === "q") {
        onRemoteQ(m);
      } else if (m.t === "endq") {
        onRemoteEndQ(m);
      } else if (m.t === "end") {
        onRemoteEnd(m);
      } else if (m.t === "closed") {
        toast("Oda kapandı (kurucu çıktı)");
        leaveRoom();
      }
    }
  }

  function removePlayer(id) {
    if (!room || !room.host) return;
    const before = room.players.length;
    room.players = room.players.filter((p) => p.id !== id);
    if (room.players.length !== before) { broadcastState(); if (!game && location.hash === "#/online") renderLobby(); }
  }

  /* ---------- ekranlar ---------- */
  function setOnlineCleanup() {
    cleanup = () => {
      stopAnnounce();
      stopGameTimers();
      clearTimeout(joinT);
      clearInterval(hbT); hbT = null;
      if (onlineKey) { document.removeEventListener("keydown", onlineKey); onlineKey = null; }
      onNetStatus = null;
      document.body.classList.remove("welcome-mode");
    };
  }

  function viewOnline() {
    ensureNet();
    setOnlineCleanup();
    if (room) {
      if (!game) return renderLobby();
      if (game.finished) return showEnd(game.lastRows || []);
      if (game.phase === "q") { renderQ(); startQTick(); return; }
      if (game.phase === "reveal") { renderQ(); showReveal(game.lastA, game.rows); return; }
      return renderWaitStart();
    }
    renderOnlineHome();
  }

  function renderOnlineHome() {
    const M = ON_MODES[onForm.mode];
    const grades = [5, 6, 7, 8];
    $("#app").innerHTML = `
      <div class="on-head">
        <div>
          <h1>🌐 Online Yarışma Odaları</h1>
          <p class="sub">Sitedeki <b>gerçek oyuncularla</b> aynı odada yarış — bot yok, rastgele eşleşme yok.
          Odayı sen kur, <b>IP kodunu</b> arkadaşına ver; odaya sadece bu kodla girilir.</p>
        </div>
        <div id="onNetPill">${netPillHtml()}</div>
      </div>

      <div class="grid grid-2" style="margin-top:18px">
        <div class="card">
          <div class="section-title" style="margin-top:0">➕ Oda Kur</div>
          <div class="row" style="margin-bottom:10px">
            ${Object.keys(ON_MODES).map((k) => `<button class="btn ${onForm.mode === k ? "btn-primary" : "btn-ghost"} btn-sm" data-onm="${k}">${ON_MODES[k].ico} ${ON_MODES[k].name}</button>`).join("")}
          </div>
          ${onForm.mode === "duel"
            ? `<p class="sub" style="margin:-2px 0 10px">🥊 Aynı soru ikisine birden gider ve <b>aynı anda</b> cevaplanır: en hızlı <b>doğru</b> cevap <b>2× puan (20)</b>, doğru ama yavaş 10 puan, bilemeyen 0 puan.</p>`
            : ""}
          <div class="row" style="margin-bottom:10px">
            <button class="btn ${onForm.grade === 0 ? "btn-primary" : "btn-ghost"} btn-sm" data-ong="0">★ Tüm sınıflar</button>
            ${grades.map((g) => `<button class="btn ${onForm.grade === g ? "btn-primary" : "btn-ghost"} btn-sm" data-ong="${g}">${g}. sınıf</button>`).join("")}
          </div>
          <div class="row" style="margin-bottom:10px">
            <span class="pill">Kapasite:</span>
            ${onForm.mode === "duel"
              ? `<span class="pill">2 kişi (sabit)</span>`
              : [2, 4, 6, 8, 10].map((n) => `<button class="btn ${onForm.cap === n ? "btn-primary" : "btn-ghost"} btn-sm" data-onc="${n}">${n}</button>`).join("")}
          </div>
          <label class="row" style="margin-bottom:12px;cursor:pointer">
            <input type="checkbox" id="onPriv" ${onForm.priv ? "checked" : ""} style="width:18px;height:18px;accent-color:var(--acc)">
            <span class="pill" style="border:none;background:none;padding:0">🔒 Özel oda — listede görünmez, sadece IP koduyla girilir</span>
          </label>
          <label class="pill" style="display:block;margin-bottom:8px">Adın:
            <input id="onNick" value="${esc(nick())}" maxlength="14"
              style="margin-left:8px;background:var(--card);border:1px solid var(--border);color:var(--txt);border-radius:10px;padding:7px 11px;font-weight:700;width:140px"></label>
          <button class="btn btn-primary btn-lg btn-block" id="onCreate">🚀 Odayı Kur</button>
        </div>

        <div class="card">
          <div class="section-title" style="margin-top:0">🎟 Oda Kodu (IP) ile Katıl</div>
          <p class="sub" style="margin-top:0">Arkadaşının paylaştığı 6 haneli kodu yaz. Başkasının odasına rastgele girmezsin, sadece çağıran odaya.</p>
          <input id="onCodeIn" value="${esc(joinCode)}" maxlength="6" placeholder="ÖRN: K7M2PQ"
            style="width:100%;background:var(--card);border:1px solid var(--border);color:var(--cyan);border-radius:14px;padding:14px;font-size:22px;font-weight:800;letter-spacing:.3em;text-transform:uppercase;text-align:center">
          <button class="btn btn-primary btn-lg btn-block" id="onJoin" style="margin-top:12px">🚪 Odaya Katıl</button>
          <p class="sub" style="margin-top:10px;font-size:12.5px;text-align:center">Kod <b>3 harf + 3 rakam</b> karışık olur (örn. <b>K7M2PQ</b>) — kurucudan aynen iste.</p>
          <div class="section-title">👥 Arkadaşların (bu cihazda)</div>
          <div id="onFriends">${friendsHtml()}</div>
        </div>
      </div>

      <div class="section-title">Açık Odalar</div>
      <div class="card" id="onRooms">${roomsHtml()}</div>`;

    onNetStatus = () => { const p = $("#onNetPill"); if (p) p.innerHTML = netPillHtml(); };
    $$("[data-onm]").forEach((b) => (b.onclick = () => { onForm.mode = b.getAttribute("data-onm"); if (onForm.mode === "duel") onForm.cap = 2; renderOnlineHome(); }));
    $$("[data-ong]").forEach((b) => (b.onclick = () => { onForm.grade = +b.getAttribute("data-ong"); renderOnlineHome(); }));
    $$("[data-onc]").forEach((b) => (b.onclick = () => { onForm.cap = +b.getAttribute("data-onc"); renderOnlineHome(); }));
    const pv = $("#onPriv");
    if (pv) pv.onchange = () => { onForm.priv = pv.checked; };
    const nk = $("#onNick");
    if (nk) nk.oninput = () => { S.name = nk.value.trim() || "Sen"; save(); };
    $("#onCreate").onclick = createRoom;
    $("#onJoin").onclick = () => joinRoom($("#onCodeIn").value);
    const ci = $("#onCodeIn");
    ci.oninput = () => { joinCode = cleanCode(ci.value); ci.value = joinCode; };
    bindRoomRows();
    bindFriendButtons();
  }

  function friendsHtml() {
    const f = S.friends || [];
    if (!f.length) return '<div class="empty" style="font-size:13.5px">Oda lobisindeki oyuncuları “+” ile ekleyebilirsin.</div>';
    return `<div class="row">${f.map((n) => `<span class="pill">${esc(n)} <a href="#" data-delfriend="${esc(n)}" style="color:var(--red);margin-left:6px;font-weight:800">×</a></span>`).join("")}</div>`;
  }
  function bindFriendButtons() {
    $$("[data-delfriend]").forEach((a) => (a.onclick = (e) => {
      e.preventDefault();
      S.friends = (S.friends || []).filter((x) => x !== a.getAttribute("data-delfriend"));
      save();
      const b = $("#onFriends"); if (b) b.innerHTML = friendsHtml();
      bindFriendButtons();
    }));
  }
  function addFriend(name) {
    S.friends = S.friends || [];
    name = String(name || "").slice(0, 14);
    if (!name || S.friends.indexOf(name) >= 0) return toast("Zaten listende: " + name);
    S.friends.push(name);
    S.friends = S.friends.slice(-20);
    save();
    toast("👥 Arkadaş eklendi: " + name, true);
  }

  function renderPending() {
    $("#app").innerHTML = `
      <div class="qcard result">
        <div class="rtitle">🌐 Odaya bağlanılıyor…</div>
        <div class="on-code" style="margin:10px 0">${joinCode || (room ? room.code : "")}</div>
        <div class="rsub">Kurucunun seni kabul etmesi bekleniyor. Oda doluysa veya oyun başlamışsa reddedilirsin.</div>
        <div class="row" style="justify-content:center"><button class="btn btn-ghost" id="onCancel">Vazgeç</button></div>
      </div>`;
    $("#onCancel").onclick = () => leaveRoom();
  }

  function playersHtml() {
    return room.players.map((p) => `
      <div class="rank ${p.id === myId ? "me" : ""} ${p.host ? "first" : ""}">
        <div class="pos">${p.host ? "👑" : p.id === myId ? "🟢" : "⚪"}</div>
        <div class="nm">${esc(p.nick)}${p.id === myId ? " <span class='pill' style='padding:2px 8px;font-size:11px'>Sen</span>" : ""}</div>
        <div class="sc">${p.host ? "kurucu" : "hazır"}</div>
        ${p.id === myId ? "" : `<button class="btn btn-ghost btn-sm" data-addf="${esc(p.nick)}" title="Arkadaş ekle">＋</button>`}
      </div>`).join("");
  }

  function renderLobby() {
    if (!room) return viewOnline();
    const M = ON_MODES[room.mode] || ON_MODES.race;
    const full = room.players.length >= room.cap;
    const need = 2;
    const canStart = room.host && room.players.length >= need;
    if (room.host && !room.started) startAnnounce(); else stopAnnounce();

    $("#app").innerHTML = `
      <div class="on-head">
        <div>
          <h1>${M.ico} ${esc(M.name)}</h1>
          <p class="sub">Aşağıdaki <b>IP kodunu</b> arkadaşına gönder — kodu girip odaya katılsın. Bot yok, sadece çağırdığın kişiler.</p>
        </div>
        <div id="onNetPill">${netPillHtml()}</div>
      </div>

      <div class="card" style="max-width:820px;margin-top:16px">
        <div class="on-code" id="onCode">${room.code}</div>
        <div class="row" style="justify-content:center;margin-top:10px;flex-wrap:wrap">
          <button class="btn btn-ghost btn-sm" id="onCopy">📋 IP'yi kopyala</button>
          <span class="pill">${full ? "🔴 ODA DOLU" : "🟢 " + room.players.length + "/" + room.cap + " oyuncu"}</span>
          <span class="pill">${room.priv ? "🔒 Özel oda" : "🌐 Açık oda"}</span>
          <span class="pill">📚 ${room.grade ? room.grade + ". sınıf" : "Tüm sınıflar"}</span>
          <span class="pill">⏱ ${M.per} sn/soru · ${M.qCount} soru</span>
          ${room.mode === "duel" ? `<span class="pill">⚡ En hızlı doğru 2× puan</span>` : ""}
        </div>
        ${full ? `<div class="room-full">⛔ Bu oda doldu (${room.cap}/${room.cap}) — yeni oyuncu alınamıyor.</div>` : ""}

        <div class="section-title">Oyuncular</div>
        <div id="onPlayers">${playersHtml()}</div>

        <div class="row" style="margin-top:18px;justify-content:center">
          ${room.host
            ? `<button class="btn ${canStart ? "btn-primary" : "btn-ghost"} btn-lg" id="onStart" ${canStart ? "" : "disabled"}>▶ Oyunu Başlat</button>
               <button class="btn btn-ghost" id="onLeave">Odadan Çık</button>`
            : `<span class="pill">⏳ Kurucu başlattığında oyuna gireceksin…</span>
               <button class="btn btn-ghost" id="onLeave">Odadan Çık</button>`}
        </div>
        ${room.host && !canStart ? `<p class="sub" style="text-align:center;margin-top:10px">Başlamak için en az ${need} oyuncu gerekiyor — IP kodunu paylaş!</p>` : ""}
      </div>`;

    onNetStatus = () => { const p = $("#onNetPill"); if (p) p.innerHTML = netPillHtml(); };
    $("#onCopy").onclick = () => copyText(room.code);
    const st = $("#onStart"); if (st) st.onclick = hostStart;
    const lv = $("#onLeave"); if (lv) lv.onclick = () => leaveRoom();
    $$("[data-addf]").forEach((b) => (b.onclick = () => addFriend(b.getAttribute("data-addf"))));
  }

  function copyText(txt) {
    const done = () => toast("📋 Kopyalandı: " + txt, true);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(done, () => fallbackCopy(txt, done));
    } else fallbackCopy(txt, done);
  }
  function fallbackCopy(txt, done) {
    const ta = document.createElement("textarea");
    ta.value = txt; document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); done(); } catch (e) { toast("Kopyalayamadı, kod: " + txt); }
    document.body.removeChild(ta);
  }

  /* ---------- oyun akışı ---------- */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function onlineQuestions(seed, mode, grade, count) {
    const pool = grade ? questionsOfGrade(grade) : allQuestions();
    const rng = mulberry32(seed >>> 0);
    const sh = pool.slice();
    for (let i = sh.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const tmp = sh[i]; sh[i] = sh[j]; sh[j] = tmp;
    }
    const n = Math.min(count, sh.length);
    const qs = [];
    while (qs.length < n) qs.push(sh[qs.length % sh.length]);
    return qs;
  }

  function hostStart() {
    if (!room || !room.host) return;
    const M = ON_MODES[room.mode] || ON_MODES.race;
    if (room.players.length < 2) return toast("En az 2 oyuncu gerekiyor");
    room.started = true;
    stopAnnounce();
    room.seed = Math.floor(Math.random() * 1e9);
    const qs = onlineQuestions(room.seed, room.mode, room.grade, M.qCount);
    publishRoom({
      t: "start", from: myId, seed: room.seed, mode: room.mode, grade: room.grade,
      per: M.per, qCount: qs.length, cap: room.cap,
      players: room.players.map((p) => ({ id: p.id, nick: p.nick, host: !!p.host }))
    });
    startGame({
      seed: room.seed, mode: room.mode, grade: room.grade, per: M.per, qCount: qs.length,
      players: room.players.map((p) => ({ id: p.id, nick: p.nick, host: !!p.host }))
    }, true);
  }

  function startGame(msg, isHost) {
    stopGameTimers();
    const M = ON_MODES[msg.mode] || ON_MODES.race;
    const qs = onlineQuestions(msg.seed, msg.mode, room ? room.grade : 0, msg.qCount || M.qCount);
    game = {
      qs, mode: msg.mode, per: msg.per || M.per, idx: -1, phase: "wait",
      host: !!isHost, answered: false, myPick: null, myLeft: 0,
      rows: (msg.players || (room ? room.players : [])).map((p) => ({ id: p.id, nick: p.nick, correct: 0, score: 0, speed: 0 })),
      start: Date.now(), lastMsg: Date.now(), tick: null, revealT: null, watchdog: null,
      hostAnswers: {}, finished: false
    };
    if (room) room.started = true;
    setOnlineCleanup();
    renderWaitStart();
    // kopma gözcüsü: kurucudan mesaj gelmezse uyar
    clearInterval(game.wd);
    game.wd = setInterval(() => {
      if (!game || game.finished) { clearInterval(game.wd); return; }
      if (Date.now() - game.lastMsg > (game.per + 16) * 1000) hostLost();
    }, 1000);
    if (isHost) setTimeout(() => { if (game && game.host) hostSendQ(0); }, 900);
  }

  function renderWaitStart() {
    const M = ON_MODES[game.mode] || ON_MODES.race;
    $("#app").innerHTML = `
      <div class="qcard result">
        <div class="rtitle">${M.ico} ${esc(M.name)} başlıyor…</div>
        <div class="rsub">${game.qs.length} soru · soru başına ${game.per} saniye · ${game.rows.length} oyuncu</div>
        <div class="chips">${game.rows.map((r) => `<div class="chip"><div class="cv">${r.id === myId ? "🟢" : "⚪"}</div><div class="ck">${esc(r.nick)}</div></div>`).join("")}</div>
        <div class="row" style="justify-content:center"><button class="btn btn-ghost" id="onQuit">Odadan Çık</button></div>
      </div>`;
    $("#onQuit").onclick = () => leaveRoom();
  }

  /* --- host: soru gönderimi --- */
  function hostSendQ(idx) {
    if (!game || !game.host) return;
    game.idx = idx;
    game.phase = "q";
    game.answered = false;
    game.myPick = null;
    game.hostAnswers = {};
    game.left = game.per;
    game.lastMsg = Date.now();
    publishRoom({ t: "q", from: myId, idx: idx, per: game.per });
    renderQ();
    startQTick();
  }

  function hostRecord(m) {
    if (!game || m.idx !== game.idx || game.phase !== "q") return;
    if (game.hostAnswers[m.from]) return;
    if (!game.rows.some((r) => r.id === m.from)) return;
    game.hostAnswers[m.from] = { pick: +m.pick, left: Math.max(0, +m.left || 0), at: Date.now() };
    if (game.host && Object.keys(game.hostAnswers).length >= game.rows.length) hostEndQ();
  }

  function hostEndQ() {
    if (!game || !game.host || game.phase !== "q") return;
    clearInterval(game.tick); game.tick = null;
    game.phase = "reveal";
    const q = game.qs[game.idx].q;
    // İkili kapışmada: en hızlı DOĞRU cevap 2× puan, diğer doğru 10 puan
    // hız = kurucuya ulaşma anı (aynı andaysa kalan süreye bakılır)
    const fastIds = new Set();
    if (game.mode === "duel") {
      let best = null;
      game.rows.forEach((r) => {
        const a = game.hostAnswers[r.id];
        if (a && a.pick === q.a && (!best || a.at < best.at || (a.at === best.at && a.left > best.left))) best = a;
      });
      if (best) {
        game.rows.forEach((r) => {
          const a = game.hostAnswers[r.id];
          if (a && a.pick === q.a && a.at === best.at && a.left === best.left) fastIds.add(r.id);
        });
      }
    }
    game.rows.forEach((r) => {
      const a = game.hostAnswers[r.id];
      const ok = a ? a.pick === q.a : false;
      r.ok = ok;
      if (ok) {
        r.correct++;
        r.score += game.mode === "duel"
          ? (fastIds.has(r.id) ? 20 : 10)
          : 10 + Math.max(0, Math.round((a.left || 0) * 0.5));
        r.speed += a.left || 0;
      } else if (a) r.speed += a.left || 0;
    });
    const rows = game.rows.map((r) => ({ id: r.id, nick: r.nick, ok: r.ok, correct: r.correct, score: r.score, speed: r.speed }));
    publishRoom({ t: "endq", from: myId, idx: game.idx, a: q.a, rows: rows });
    showReveal(q.a, rows);
    clearInterval(game.revealT);
    game.revealT = setTimeout(() => {
      if (!game || !game.host) return;
      if (game.idx + 1 >= game.qs.length) hostEnd();
      else hostSendQ(game.idx + 1);
    }, 2800);
  }

  function hostEnd() {
    if (!game || !game.host) return;
    const rows = game.rows.map((r) => ({ id: r.id, nick: r.nick, ok: r.ok, correct: r.correct, score: r.score, speed: r.speed }));
    publishRoom({ t: "end", from: myId, rows: rows });
    showEnd(rows);
    setTimeout(() => { if (room && room.host) { room.started = false; broadcastState(); } }, 400);
  }

  /* --- joiner: mesajlar --- */
  function onRemoteQ(m) {
    if (!game || m.idx == null) return;
    game.idx = m.idx;
    game.phase = "q";
    game.answered = false;
    game.myPick = null;
    game.left = +m.per || game.per;
    game.lastMsg = Date.now();
    renderQ();
    startQTick();
  }
  function onRemoteEndQ(m) {
    if (!game) return;
    game.lastMsg = Date.now();
    if (game.idx !== m.idx) game.idx = m.idx;
    showReveal(m.a, m.rows || []);
  }
  function onRemoteEnd(m) {
    if (!game) return;
    game.lastMsg = Date.now();
    game.finished = true;
    stopGameTimers();
    showEnd(m.rows || []);
  }

  /* --- ortak: soru ekranı --- */
  function renderQ() {
    const q = game.qs[game.idx].q;
    const ord = shuffle([0, 1, 2, 3]);
    $("#app").innerHTML = `
      <div class="quiz-head">
        <div>
          <div class="qmeta"><span class="live">CANLI</span> 🌐 ${esc((ON_MODES[game.mode] || ON_MODES.race).name)} · oda ${room ? room.code : ""} · <b style="color:var(--cyan)">${esc(nick())}</b></div>
          <h2 style="margin-top:4px">Soru ${game.idx + 1}/${game.qs.length}</h2>
        </div>
        <div class="row">
          <div class="timer" id="onTimer">⏱ ${game.left || game.per}</div>
          <div class="dots" id="onDots">${dotsHtml()}</div>
        </div>
      </div>
      <div class="arena-layout">
        <div id="onMain">
          <div class="qcard">
            <div class="qmeta">${esc(game.qs[game.idx].t.title)} · ${diffLabel(q.d)}${game.mode === "duel" ? ' · <b style="color:var(--cyan)">⚡ En hızlı doğru 2× puan</b>' : ""}</div>
            <div class="qtext">${q.q}</div>
            <div class="opts" id="onOpts">
              ${ord.map((oi, k) => `<button class="opt" data-k="${oi}"><span class="key">${"ABCD"[k]}</span><span>${q.o[oi]}</span></button>`).join("")}
            </div>
            <div class="feedback" id="onFb"></div>
          </div>
        </div>
        <div class="standings">
          <h4>🌐 Canlı Sıralama</h4>
          <div id="onStand"></div>
          <div class="rank" style="background:rgba(108,140,255,.12);margin-top:10px">
            <div class="nm" style="font-size:13px">Oda IP</div><div class="sc">${room ? room.code : "-"}</div>
          </div>
        </div>
      </div>`;
    game.answered = false;
    if (game.myPick != null || game.answered) game.answered = true;
    if (!game.answered) $$("#onOpts .opt").forEach((b) => (b.onclick = () => submitAnswer(+b.getAttribute("data-k"))));
    else {
      $$("#onOpts .opt").forEach((b) => (b.disabled = true));
      const fb = $("#onFb");
      if (fb) { fb.className = "feedback show ok"; fb.innerHTML = "<b>📤 Cevabın iletildi</b>Herkes bitince doğru cevap ve sıralama açıklanacak."; }
    }
    paintRows(game.rows);
    bindOnlineKey();
  }

  function dotsHtml() {
    const oks = game.myOks || [];
    return game.qs.map((_, k) => `<i class="${k < game.idx ? (oks[k] ? "ok" : "no") : k === game.idx ? "on" : ""}"></i>`).join("");
  }

  function paintRows(rows) {
    const el = $("#onStand");
    if (!el || !rows) return;
    const sorted = rows.slice().sort((a, b) => (game.mode === "duel" ? (b.score - a.score || b.correct - a.correct || a.speed - b.speed) : (b.score - a.score || b.correct - a.correct)));
    el.innerHTML = sorted.map((r, k) => `
      <div class="rank ${r.id === myId ? "me" : ""} ${k === 0 ? "first" : ""}">
        <div class="pos">${k === 0 ? "🥇" : k === 1 ? "🥈" : k === 2 ? "🥉" : k + 1}</div>
        <div class="nm">${esc(r.nick)}${r.ok === false ? " ❌" : r.ok === true ? " ✅" : ""}</div>
        <div class="sc">${game.mode === "duel" ? r.score + " p" : r.score}</div>
      </div>`).join("");
  }

  function bindOnlineKey() {
    if (onlineKey) document.removeEventListener("keydown", onlineKey);
    onlineKey = (e) => {
      if (!game || game.phase !== "q") return;
      const k = ["1", "2", "3", "4"].indexOf(e.key);
      if (k >= 0) { const b = $('#onOpts .opt[data-k="' + k + '"]'); if (b) b.click(); }
    };
    document.addEventListener("keydown", onlineKey);
  }

  function submitAnswer(k) {
    if (!game || game.phase !== "q" || game.answered) return;
    game.answered = true;
    game.myPick = k;
    game.myLeft = game.left;
    const q = game.qs[game.idx].q;
    $$("#onOpts .opt").forEach((b) => { b.disabled = true; });
    publishRoom({ t: "ans", from: myId, idx: game.idx, pick: k, left: game.left });
    const fb = $("#onFb");
    if (fb) {
      fb.className = "feedback show ok";
      fb.innerHTML = "<b>📤 Cevabın iletildi</b>Herkes bitince doğru cevap ve sıralama açıklanacak.";
    }
    beep(560, 0.08, "triangle", 0.05);
    if (game.host) hostRecord({ from: myId, idx: game.idx, pick: k, left: game.left });
  }

  function startQTick() {
    clearInterval(game.tick);
    game.tick = setInterval(() => {
      if (!game || game.finished) return clearInterval(game.tick);
      game.left--;
      const el = $("#onTimer");
      if (el) { el.textContent = "⏱ " + Math.max(0, game.left); el.className = "timer" + (game.left <= 5 ? " low" : ""); }
      if (game.left <= 0 && !game.host && !game.answered) {
        game.answered = true; game.myPick = null;
        $$("#onOpts .opt").forEach((b) => { b.disabled = true; });
        const fb = $("#onFb");
        if (fb) { fb.className = "feedback show no"; fb.innerHTML = "<b>⏰ Süre doldu!</b>Kurucudan sonuç bekleniyor…"; }
      }
      if (game.host && game.phase === "q" && game.left <= 0) hostEndQ();
    }, 1000);
  }

  function hostLost() {
    if (!game || game.finished || game.lostShown) return;
    game.lostShown = true;
    stopGameTimers();
    $("#app").innerHTML = `
      <div class="qcard result">
        <div class="rtitle">📡 Bağlantı koptu</div>
        <div class="rsub">Oda kurucusuna ulaşılamıyor. Oda kapandı ya da internet gitti.</div>
        <div class="row" style="justify-content:center">
          <button class="btn btn-primary" id="onBack">🌐 Odalar Listesine Dön</button>
        </div>
      </div>`;
    $("#onBack").onclick = () => leaveRoom();
  }

  function showReveal(a, rows) {
    if (!game) return;
    const idx = game.idx;
    const q = game.qs[idx] ? game.qs[idx].q : null;
    const ans = a;
    clearInterval(game.tick); game.tick = null;
    game.phase = "reveal";
    game.lastA = ans;
    game.lastRows = rows;
    (game.myOks = game.myOks || [])[idx] = game.myPick === ans;
    const dots = $("#onDots");
    if (dots) dots.innerHTML = dotsHtml();
    if ($("#onOpts")) {
      $$("#onOpts .opt").forEach((b) => {
        const bk = +b.getAttribute("data-k");
        b.disabled = true;
        if (bk === ans) b.classList.add("correct");
        else if (game.myPick === bk) b.classList.add("wrong");
        else b.classList.add("dim");
      });
      const ok = game.myPick === ans;
      const fb = $("#onFb");
      if (fb) {
        fb.className = "feedback show " + (ok ? "ok" : "no");
        const head = ok ? "<b>✅ Doğru!</b>"
          : game.myPick == null ? "<b>⏰ Süre doldu!</b>"
          : "<b>❌ Yanlış! Doğru cevap: " + "ABCD"[ans] + "</b>";
        fb.innerHTML = head + (q ? esc(q.e) : "");
      }
      if (ok) sOk(); else sNo();
    }
    game.rows = rows;
    paintRows(rows);
  }

  function showEnd(rows) {
    if (!game) return;
    game.finished = true;
    game.lastRows = rows;
    stopGameTimers();
    const M = ON_MODES[game.mode] || ON_MODES.race;
    const sorted = rows.slice().sort((a, b) => (game.mode === "duel" ? (b.score - a.score || b.correct - a.correct || a.speed - b.speed) : (b.score - a.score || b.correct - a.correct)));
    const meRow = rows.find((r) => r.id === myId) || { score: 0, correct: 0 };
    const pct = Math.round((meRow.correct / Math.max(1, game.qs.length)) * 100);
    const first = sorted[0];
    let rtitle;
    if (game.mode === "duel") {
      const tie = sorted.length > 1 && sorted[0].score === sorted[1].score;
      rtitle = tie ? "🤝 Berabere!"
        : first && first.id === myId ? (meRow.correct >= game.qs.length ? "🎯 " + game.qs.length + "/" + game.qs.length + " Bildin, Kazandın!" : "🏆 Kazandın!")
        : first ? "🏆 " + esc(first.nick) + " Kazandı!" : "Yarış bitti";
    } else {
      rtitle = first && first.id === myId ? "🏆 Birinci Oldun!" : first ? esc(first.nick) + " birinci oldu 🥇" : "Yarış bitti";
    }

    S.scores.online = S.scores.online || [];
    const rec = { name: nick(), score: meRow.score, correct: meRow.correct, total: game.qs.length, date: Date.now(), pct: pct, players: rows.length, mode: game.mode };
    S.scores.online.push(rec);
    S.scores.online.sort((a, b) => b.score - a.score);
    S.scores.online = S.scores.online.slice(0, 10);
    if (game.mode === "duel") {
      S.scores.duel = S.scores.duel || [];
      S.scores.duel.push(Object.assign({}, rec));
      S.scores.duel.sort((a, b) => b.score - a.score);
      S.scores.duel = S.scores.duel.slice(0, 10);
    }
    S.stats.arenaPlayed++;
    const won = game.mode === "duel" ? (first && first.id === myId) : pct >= 70;
    if (won) S.stats.arenaWins++;
    save();
    checkBadges(false);
    if (won) sWin();

    $("#app").innerHTML = `
      <div class="qcard result">
        <div class="rtitle">${rtitle}</div>
        <div class="big">${game.mode === "duel" ? meRow.score + '<span style="font-size:.4em"> puan</span>' : meRow.score}</div>
        <div class="rsub">🌐 ${esc(M.name)} · ${meRow.correct}/${game.qs.length} doğru (٪${pct})${game.mode === "duel" ? " · " + meRow.score + " puan" : ""} · ${rows.length} oyuncu</div>
        <div class="chips">
          <div class="chip"><div class="cv">٪${pct}</div><div class="ck">Başarı</div></div>
          <div class="chip"><div class="cv">${meRow.correct}</div><div class="ck">Doğru</div></div>
          <div class="chip"><div class="cv">${rows.length}</div><div class="ck">Oyuncu</div></div>
          <div class="chip"><div class="cv">${fmt(Math.floor((Date.now() - game.start) / 1000))}</div><div class="ck">Süre</div></div>
        </div>
        <div class="card" style="text-align:left;margin-bottom:18px">
          ${sorted.map((r, k) => `
            <div class="rank ${r.id === myId ? "me" : ""} ${k === 0 ? "first" : ""}">
              <div class="pos">${k === 0 ? "🥇" : k === 1 ? "🥈" : k === 2 ? "🥉" : k + 1}</div>
              <div class="nm">${esc(r.nick)}${r.id === myId ? " (Sen)" : ""}</div>
              <div class="sc">${game.mode === "duel" ? r.score + " p" : r.score}</div>
            </div>`).join("")}
        </div>
        <div class="row" style="justify-content:center">
          ${room && room.host ? `<button class="btn btn-primary" id="onAgain">🔁 Tekrar (aynı oda)</button>` : `<span class="pill">⏳ Kurucu tekrar başlatabilir</span>`}
          <button class="btn btn-ghost" id="onToLobby">🏠 Odaya Dön</button>
          <button class="btn btn-ghost" id="onQuit2">Odadan Çık</button>
        </div>
      </div>`;

    const ag = $("#onAgain"); if (ag) ag.onclick = () => hostStart();
    $("#onToLobby").onclick = () => { game = null; if (room) { room.started = false; } renderLobby(); };
    $("#onQuit2").onclick = () => leaveRoom();
    renderTopStats();
  }

  function stopGameTimers() {
    if (game) {
      clearInterval(game.tick);
      clearInterval(game.wd);
      clearTimeout(game.revealT);
      game.tick = null; game.revealT = null; game.wd = null;
    }
  }

  /* =========================================================
     SIRALAMA
  ========================================================= */
  let lbMode = "hizli";
  function viewScores() {
    $("#app").innerHTML = `
      <h1>📊 Sıralama</h1>
      <p class="sub">Kendi en iyi puanların. Cihazında saklandığı için herkesle yarışmak istersen en yüksek puanı yapmaya bak!</p>
      <div class="row" style="margin:18px 0">
        ${Object.keys(MODE_NAME).map((m) => `<button class="btn ${lbMode === m ? "btn-primary" : "btn-ghost"} btn-sm" data-lb="${m}">${MODE_NAME[m]}</button>`).join("")}
      </div>
      <div class="card" id="lbBox">${leaderboardHtml(lbMode)}</div>
      <div class="section-title">Genel İstatistiklerin</div>
      <div class="level-row">
        <div class="stat"><div class="v">${S.stats.correct}</div><div class="k">Toplam doğru</div></div>
        <div class="stat"><div class="v">${S.stats.wrong}</div><div class="k">Toplam yanlış</div></div>
        <div class="stat"><div class="v">${S.stats.tests}</div><div class="k">Tamamlanan test</div></div>
        <div class="stat"><div class="v">${S.stats.arenaPlayed}</div><div class="k">Yarışma</div></div>
        <div class="stat"><div class="v">${badgeCount()}/${BADGES.length}</div><div class="k">Rozet</div></div>
      </div>`;
    $$("[data-lb]").forEach((b) => (b.onclick = () => { lbMode = b.getAttribute("data-lb"); viewScores(); }));
  }

  function leaderboardHtml(mode) {
    const rows = mode ? (S.scores[mode] || []) : Object.keys(S.scores).reduce((a, m) => a.concat((S.scores[m] || []).map((r) => Object.assign({ mode: m }, r))), []);
    if (!rows.length) return '<div class="empty">Henüz kayıt yok. 🏁 Bir yarışmaya katıl, adın listeye yazılsın!</div>';
    const sorted = rows.slice().sort((a, b) => b.score - a.score).slice(0, 10);
    return `<table class="lb-table">
      <tr><th>#</th><th>Yarışmacı</th>${mode ? "" : "<th>Mod</th>"}<th>Puan</th><th>Doğru</th><th>Tarih</th></tr>
      ${sorted.map((r, k) => `
        <tr class="${(r.name === (S.name || "Sen")) ? "me" : ""}">
          <td><div class="lb-pos ${k === 0 ? "p1" : k === 1 ? "p2" : k === 2 ? "p3" : ""}">${k + 1}</div></td>
          <td><b>${esc(r.name)}</b></td>
          ${mode ? "" : `<td>${MODE_NAME[r.mode] || r.mode}</td>`}
          <td><b>${r.score}</b></td>
          <td>${r.correct}/${r.total}</td>
          <td>${new Date(r.date).toLocaleDateString("tr-TR")}</td>
        </tr>`).join("")}
    </table>`;
  }

  /* =========================================================
     ROZETLER
  ========================================================= */
  function viewBadges() {
    $("#app").innerHTML = `
      <h1>🎖️ Rozetler</h1>
      <p class="sub">${badgeCount()} / ${BADGES.length} rozet kazandın. Test çöz, yarışmalarda %70+ yap, sınıfları ustalaş!</p>
      <div class="grid grid-4" style="margin-top:22px">
        ${BADGES.map((b) => {
          const got = S.badges[b.id];
          return `<div class="badge-card ${got ? "unlocked" : "locked"}">
            <div class="bico">${b.ico}</div>
            <h4>${b.name}</h4>
            <p>${b.desc}</p>
            ${got ? `<div class="got">✓ ${new Date(got).toLocaleDateString("tr-TR")}</div>` : `<div class="got" style="color:var(--muted)">Kilitli</div>`}
          </div>`;
        }).join("")}
      </div>
      <div class="row" style="margin-top:26px">
        <button class="btn btn-red btn-sm" id="reset">🗑 İlerlemeyi Sıfırla</button>
      </div>`;
    $("#reset").onclick = () => {
      if (confirm("Tüm ilerlemen, puanların ve rozetlerin silinecek. Emin misin?")) {
        localStorage.removeItem(KEY);
        location.reload();
      }
    };
  }

  /* =========================================================
     YÖNLENDİRİCİ
  ========================================================= */
  function setActive(key) {
    $$("#nav a").forEach((a) => a.classList.toggle("active", a.getAttribute("data-nav") === key));
  }

  function router() {
    clearHooks();
    const parts = (location.hash || "#/").replace(/^#\//, "").split("/").filter(Boolean);
    const head = parts[0] || "";
    if (head !== "online" && room) leaveRoom(true);   // online bölümünden çıkıldıysa odadan ayrıl
    window.scrollTo({ top: 0 });
    if (head === "") { setActive("home"); viewHome(); }
    else if (head === "grade") { setActive(""); viewGrade(parts[1]); }
    else if (head === "topic") { setActive(""); viewTopic(parts[1]); }
    else if (head === "arena") { setActive("arena"); viewArena(); }
    else if (head === "online") { setActive("online"); viewOnline(); }
    else if (head === "scores") { setActive("scores"); viewScores(); }
    else if (head === "badges") { setActive("badges"); viewBadges(); }
    else { setActive("home"); viewHome(); }
    renderTopStats();
  }

  window.addEventListener("hashchange", router);

  // Aynı hash'e tekrar tıklanınca da sayfa yenilensin (ör. yarışma sonucundan "Yarışmalar")
  document.addEventListener("click", (e) => {
    const a = e.target && e.target.closest ? e.target.closest('a[href^="#/"]') : null;
    if (!a) return;
    const href = a.getAttribute("href");
    if (href === location.hash) { e.preventDefault(); router(); }
  });

  document.addEventListener("DOMContentLoaded", () => {
    $("#burger").onclick = () => $("#nav").classList.toggle("open");
    $$("#nav a").forEach((a) => (a.onclick = () => $("#nav").classList.remove("open")));
    checkBadges(true);
    router();
  });
})();
