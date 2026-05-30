/* TCF Canada Prep — interactive enhancements
 *
 * No external dependencies. Vanilla JS, idempotent, safe to re-run on
 * Material's instant-navigation page swaps.
 *
 * Modules:
 *   1.  Mount manager (idempotent, instant-nav aware)
 *   2.  Reading progress bar
 *   3.  Skill-bar reveal-on-scroll animation
 *   4.  Stat-row count-up animation
 *   5.  Keyboard shortcuts (overlay + bindings)
 *   6.  Floating action buttons (top, print, copy-link)
 *   7.  Toast notifications
 *   8.  NCLC score calculator widget        (.tcf-calc[data-widget=nclc])
 *   9.  Pomodoro / exam timer               (.tcf-timer)
 *   10. Self-quiz                           (.tcf-quiz[data-quiz])
 *   11. Persistent checklist                (.tcf-checklist[data-key])
 *   12. Audio playback rate selector for <audio> elements
 *   13. External-link "↗" annotation
 *   14. Skip-to-content link
 *
 * All localStorage keys use the prefix "tcf:".
 */

(function () {
  "use strict";

  // -----------------------------------------------------------------
  // Constants
  // -----------------------------------------------------------------
  const LS_PREFIX = "tcf:";
  const ls = {
    get(k, fallback) {
      try {
        const v = localStorage.getItem(LS_PREFIX + k);
        return v == null ? fallback : JSON.parse(v);
      } catch (e) { return fallback; }
    },
    set(k, v) {
      try { localStorage.setItem(LS_PREFIX + k, JSON.stringify(v)); } catch (e) { /* noop */ }
    },
    del(k) { try { localStorage.removeItem(LS_PREFIX + k); } catch (e) {} },
  };

  // -----------------------------------------------------------------
  // 1. Mount manager
  // -----------------------------------------------------------------
  // Material's "instant" feature swaps content without a full reload.
  // We hook into both DOMContentLoaded and Material's `document$` rxjs
  // observable (when present) so widgets re-initialise on every page.

  const PAGE_INITS = [];
  function onPage(fn) { PAGE_INITS.push(fn); }

  function runAll() {
    PAGE_INITS.forEach((fn) => {
      try { fn(); } catch (e) { console.error("[tcf]", e); }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runAll);
  } else {
    runAll();
  }

  // Material 9 emits document$ when a new page is mounted
  if (typeof document$ !== "undefined" && document$.subscribe) {
    document$.subscribe(runAll);
  } else {
    // Fallback: listen to mkdocs-material's instant-nav custom event
    document.addEventListener("DOMContentSwapped", runAll);
  }

  // -----------------------------------------------------------------
  // 2. Reading progress bar
  // -----------------------------------------------------------------
  let progressEl = null;
  function ensureProgressBar() {
    if (progressEl && document.body.contains(progressEl)) return;
    progressEl = document.querySelector(".tcf-progress");
    if (!progressEl) {
      progressEl = document.createElement("div");
      progressEl.className = "tcf-progress";
      progressEl.setAttribute("aria-hidden", "true");
      document.body.appendChild(progressEl);
    }
  }

  function updateProgress() {
    if (!progressEl) return;
    const article = document.querySelector(".md-content article") || document.querySelector(".md-content");
    if (!article) { progressEl.style.width = "0%"; return; }
    const rect = article.getBoundingClientRect();
    const total = Math.max(1, rect.height - window.innerHeight);
    const seen = Math.min(total, Math.max(0, -rect.top));
    const pct = Math.round((seen / total) * 100);
    progressEl.style.width = pct + "%";
  }

  let progressTicking = false;
  function onProgressScroll() {
    if (!progressTicking) {
      requestAnimationFrame(() => { updateProgress(); progressTicking = false; });
      progressTicking = true;
    }
  }

  onPage(() => {
    ensureProgressBar();
    updateProgress();
  });
  window.addEventListener("scroll", onProgressScroll, { passive: true });
  window.addEventListener("resize", onProgressScroll, { passive: true });

  // -----------------------------------------------------------------
  // 3. Skill-bar reveal-on-scroll
  // -----------------------------------------------------------------
  onPage(() => {
    const bars = document.querySelectorAll(".skill-bar");
    bars.forEach((bar) => {
      const fill = bar.querySelector(".skill-fill");
      if (!fill) return;
      // Read the inline width set by markdown ("width: 75%") and pin it as a CSS var
      const target = fill.style.width || "0%";
      fill.style.width = "0%";
      bar.style.setProperty("--skill-target", target);
    });
    if (!("IntersectionObserver" in window)) {
      bars.forEach((b) => b.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach((b) => io.observe(b));
  });

  // -----------------------------------------------------------------
  // 4. Stat-row count-up
  // -----------------------------------------------------------------
  function parseStatNum(s) {
    if (!s) return null;
    const cleaned = s.replace(/[\s ]/g, "");
    const m = cleaned.match(/^(~?)(\d+)/);
    if (!m) return null;
    return { prefix: m[1] || "", n: parseInt(m[2], 10), tail: cleaned.slice(m[0].length) };
  }
  function animateNum(el, parsed) {
    const dur = 900;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    function step(now) {
      const t = Math.min(1, (now - start) / dur);
      const v = Math.floor(parsed.n * ease(t));
      el.textContent = parsed.prefix + v.toLocaleString("fr-FR") + parsed.tail;
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = parsed.prefix + parsed.n.toLocaleString("fr-FR") + parsed.tail;
    }
    requestAnimationFrame(step);
  }
  onPage(() => {
    const nums = document.querySelectorAll(".stat-row .stat .num");
    if (!nums.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        if (el.dataset.animated) { io.unobserve(el); return; }
        const parsed = parseStatNum(el.textContent);
        if (parsed) { el.dataset.animated = "1"; animateNum(el, parsed); }
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    nums.forEach((n) => io.observe(n));
  });

  // -----------------------------------------------------------------
  // 5. Keyboard shortcuts
  // -----------------------------------------------------------------
  const SHORTCUTS = [
    { keys: ["Ctrl/⌘", "K"], label: "Palette de commandes (v1.1)" },
    { keys: ["?"],        label: "Afficher cette aide" },
    { keys: ["s", "/"],   label: "Focus sur la recherche" },
    { keys: ["g", "h"],   label: "Aller à l'accueil" },
    { keys: ["g", "d"],   label: "Aller au diagnostic" },
    { keys: ["g", "r"],   label: "Aller à la feuille de route" },
    { keys: ["g", "t"],   label: "Aller aux outils interactifs" },
    { keys: ["t"],        label: "Basculer thème clair / sombre" },
    { keys: ["p"],        label: "Imprimer la page" },
    { keys: ["c"],        label: "Copier le lien permanent" },
    { keys: ["f"],        label: "Basculer le favori (v1.1)" },
    { keys: ["z"],        label: "Mode focus / zen — masque la nav (v1.5)" },
    { keys: ["Esc"],      label: "Fermer cette aide" },
  ];

  let kbdOverlay = null;
  function ensureKbdOverlay() {
    if (kbdOverlay && document.body.contains(kbdOverlay)) return;
    kbdOverlay = document.createElement("div");
    kbdOverlay.className = "tcf-kbd-overlay";
    kbdOverlay.setAttribute("role", "dialog");
    kbdOverlay.setAttribute("aria-label", "Raccourcis clavier");
    kbdOverlay.setAttribute("aria-modal", "true");
    kbdOverlay.innerHTML =
      '<div class="tcf-kbd-panel" role="document">' +
      '<button class="tcf-kbd-close" aria-label="Fermer">×</button>' +
      '<h3>Raccourcis clavier</h3>' +
      '<div class="tcf-kbd-list">' +
      SHORTCUTS.map((s) =>
        '<div class="tcf-kbd-row"><span>' + escapeHtml(s.label) + '</span><span>' +
        s.keys.map((k) => '<kbd>' + escapeHtml(k) + '</kbd>').join(" + ") +
        '</span></div>'
      ).join("") +
      '</div></div>';
    document.body.appendChild(kbdOverlay);
    kbdOverlay.addEventListener("click", (e) => {
      if (e.target === kbdOverlay || e.target.classList.contains("tcf-kbd-close")) {
        closeKbdOverlay();
      }
    });
  }
  function openKbdOverlay() { ensureKbdOverlay(); kbdOverlay.classList.add("is-open"); }
  function closeKbdOverlay() { if (kbdOverlay) kbdOverlay.classList.remove("is-open"); }

  let kbdBuffer = "";
  let kbdBufferTimer = null;
  function resetKbdBuffer() { kbdBuffer = ""; clearTimeout(kbdBufferTimer); }

  document.addEventListener("keydown", (e) => {
    // Ignore when typing
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select" || e.target.isContentEditable) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    if (e.key === "Escape") {
      closeKbdOverlay();
      resetKbdBuffer();
      return;
    }
    if (e.key === "?") {
      e.preventDefault();
      openKbdOverlay();
      return;
    }
    if (e.key === "/" || e.key === "s") {
      const search = document.querySelector(".md-search__input");
      if (search) { e.preventDefault(); search.focus(); }
      return;
    }
    if (e.key === "t") {
      const themeToggle = document.querySelector('[data-md-component="palette"] form input[name="__palette"]:not(:checked)');
      if (themeToggle) themeToggle.click();
      else {
        // Material renders the toggle as the next radio in the .md-header
        const labels = document.querySelectorAll('label[for^="__palette"]');
        if (labels.length) labels[0].click();
      }
      return;
    }
    if (e.key === "p") {
      e.preventDefault();
      window.print();
      return;
    }
    if (e.key === "c") {
      e.preventDefault();
      copyLink();
      return;
    }
    if (e.key === "z" && !e.shiftKey) {
      e.preventDefault();
      const cur = document.body.classList.toggle("tcf-focus-on");
      ls.set("focus:on", cur);
      const fab = document.querySelector(".tcf-fab-host .tcf-fab[aria-label*=\"focus\"]");
      if (fab) { fab.textContent = cur ? "🌐" : "🎯"; fab.setAttribute("aria-pressed", String(cur)); }
      toast(cur ? "Mode focus / zen activé (z)" : "Mode focus / zen désactivé (z)", "ok");
      return;
    }
    if (e.key === "g") {
      kbdBuffer = "g";
      clearTimeout(kbdBufferTimer);
      kbdBufferTimer = setTimeout(resetKbdBuffer, 800);
      return;
    }
    if (kbdBuffer === "g") {
      kbdBuffer = "";
      clearTimeout(kbdBufferTimer);
      const base = document.querySelector('link[rel="canonical"]') ? null : null;
      const baseHref = (document.querySelector('meta[name="site_url"]') || {}).content
        || (window.__siteBase || "");
      // Use site-relative paths so we work in dev & on /tcf_materials/
      const map = {
        "h": "/",
        "d": "00_diagnostic/00_index/",
        "r": "https://github.com/bettyguo/tcf_materials/blob/main/ROADMAP.md",
        "t": "11_tools/",
      };
      if (map[e.key]) {
        e.preventDefault();
        const dest = map[e.key];
        if (dest.startsWith("http")) {
          window.open(dest, "_blank", "noopener");
        } else if (dest.startsWith("/")) {
          // absolute on origin — find site root via <base> if any
          const baseEl = document.querySelector("base");
          if (baseEl) location.href = baseEl.href + dest.slice(1);
          else location.href = computeSiteRoot() + dest.slice(1);
        } else {
          location.href = computeSiteRoot() + dest;
        }
      }
      return;
    }
  });

  function computeSiteRoot() {
    // mkdocs renders absolute hrefs starting at site root; use the canonical link
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const u = new URL(canonical.href);
      // strip everything after the deployed site root we know
      // Heuristic: if pathname matches a known mkdocs page, trim it
      return u.origin + u.pathname.replace(/[^\/]*\/?$/, "");
    }
    // Fallback to "/"
    return location.origin + "/";
  }

  // -----------------------------------------------------------------
  // 6. Floating action buttons
  // -----------------------------------------------------------------
  let fabHost = null;
  function ensureFabs() {
    if (fabHost && document.body.contains(fabHost)) return;
    fabHost = document.createElement("div");
    fabHost.className = "tcf-fab-host";

    const fabHelp = document.createElement("button");
    fabHelp.className = "tcf-fab";
    fabHelp.title = "Raccourcis clavier (?)";
    fabHelp.setAttribute("aria-label", "Afficher les raccourcis clavier");
    fabHelp.textContent = "?";
    fabHelp.addEventListener("click", openKbdOverlay);
    fabHost.appendChild(fabHelp);

    const fabCopy = document.createElement("button");
    fabCopy.className = "tcf-fab";
    fabCopy.title = "Copier le lien permanent (c)";
    fabCopy.setAttribute("aria-label", "Copier le lien permanent");
    fabCopy.innerHTML = "🔗";
    fabCopy.addEventListener("click", copyLink);
    fabHost.appendChild(fabCopy);

    const fabPrint = document.createElement("button");
    fabPrint.className = "tcf-fab";
    fabPrint.title = "Imprimer la page (p)";
    fabPrint.setAttribute("aria-label", "Imprimer la page");
    fabPrint.innerHTML = "⎙";
    fabPrint.addEventListener("click", () => window.print());
    fabHost.appendChild(fabPrint);

    const fabFocus = document.createElement("button");
    fabFocus.className = "tcf-fab";
    fabFocus.title = "Mode focus (f) — masque la navigation pour la lecture";
    fabFocus.setAttribute("aria-label", "Activer ou désactiver le mode focus");
    fabFocus.setAttribute("aria-pressed", String(!!ls.get("focus:on", false)));
    fabFocus.textContent = ls.get("focus:on", false) ? "🌐" : "🎯";
    fabFocus.addEventListener("click", () => {
      const cur = document.body.classList.toggle("tcf-focus-on");
      ls.set("focus:on", cur);
      fabFocus.textContent = cur ? "🌐" : "🎯";
      fabFocus.setAttribute("aria-pressed", String(cur));
      fabFocus.title = cur ? "Mode normal — revenir à la navigation" : "Mode focus (f) — masque la navigation pour la lecture";
      if (window.TCF && window.TCF.toast) window.TCF.toast(cur ? "Mode focus activé" : "Mode focus désactivé", "ok");
    });
    fabHost.appendChild(fabFocus);

    const fabTop = document.createElement("button");
    fabTop.className = "tcf-fab is-hidden";
    fabTop.title = "Revenir en haut";
    fabTop.setAttribute("aria-label", "Revenir en haut de page");
    fabTop.innerHTML = "↑";
    fabTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    fabHost.appendChild(fabTop);

    // Apply persisted focus mode early
    if (ls.get("focus:on", false)) document.body.classList.add("tcf-focus-on");

    document.body.appendChild(fabHost);

    window.addEventListener("scroll", () => {
      if (window.scrollY > 600) fabTop.classList.remove("is-hidden");
      else fabTop.classList.add("is-hidden");
    }, { passive: true });
  }

  onPage(ensureFabs);

  function copyLink() {
    const url = location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(
        () => toast("Lien copié dans le presse-papiers", "ok"),
        () => toast("Impossible de copier — sélection manuelle nécessaire", "warn")
      );
    } else {
      try {
        const ta = document.createElement("textarea");
        ta.value = url;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
        toast("Lien copié dans le presse-papiers", "ok");
      } catch (e) { toast("Copie indisponible", "error"); }
    }
  }

  // -----------------------------------------------------------------
  // 7. Toast notifications
  // -----------------------------------------------------------------
  let toastHost = null;
  function ensureToastHost() {
    if (toastHost && document.body.contains(toastHost)) return;
    toastHost = document.createElement("div");
    toastHost.className = "tcf-toast-host";
    toastHost.setAttribute("role", "status");
    toastHost.setAttribute("aria-live", "polite");
    document.body.appendChild(toastHost);
  }
  function toast(msg, kind, ms) {
    ensureToastHost();
    const el = document.createElement("div");
    el.className = "tcf-toast" + (kind ? " " + kind : "");
    el.textContent = msg;
    toastHost.appendChild(el);
    requestAnimationFrame(() => el.classList.add("is-visible"));
    setTimeout(() => {
      el.classList.remove("is-visible");
      setTimeout(() => el.remove(), 300);
    }, ms || 2400);
  }
  // Expose for use from inline page snippets
  window.TCF = window.TCF || {};
  window.TCF.toast = toast;

  // -----------------------------------------------------------------
  // 8. NCLC score calculator widget
  // -----------------------------------------------------------------
  // Conversion thresholds — TCF Canada / IRCC, 2024-FEI table.
  // For CO and CE (out of 699), the lowest raw value reaching the band:
  const NCLC_CO_CE = [
    { n: 10, min: 549 },
    { n: 9,  min: 523 },
    { n: 8,  min: 503 },
    { n: 7,  min: 458 },
    { n: 6,  min: 398 },
    { n: 5,  min: 369 },
    { n: 4,  min: 331 },
    { n: 3,  min: 263 },
  ];
  // For EE / EO (out of 20), per IRCC NCLC mapping:
  const NCLC_EE_EO = [
    { n: 10, min: 18 },
    { n: 9,  min: 16 },
    { n: 8,  min: 14 },
    { n: 7,  min: 12 },
    { n: 6,  min: 10 },
    { n: 5,  min: 7 },
    { n: 4,  min: 4 },
  ];
  function nclcFromRaw(table, raw) {
    if (raw == null || isNaN(raw)) return null;
    for (const row of table) {
      if (raw >= row.min) return row.n;
    }
    return 0;
  }
  function bindMin(co, ce, ee, eo) {
    const arr = [co, ce, ee, eo].filter((x) => x != null);
    if (!arr.length) return null;
    return Math.min(...arr);
  }
  function crsBonus(min) {
    // CRS additive points if English NCLC ≥ 5 OR ≥ 7 — simplified educational view
    // We report the bonus reachable IF English ≥ 9 (the common Express-Entry case)
    if (min >= 7) return 50;
    if (min >= 5) return 25;
    return 0;
  }

  onPage(() => {
    document.querySelectorAll(".tcf-calc[data-widget=nclc]").forEach(mountNclc);
  });

  function mountNclc(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";

    const saved = ls.get("calc:nclc", {});
    host.innerHTML =
      '<h3>Calculateur NCLC interactif</h3>' +
      '<p style="margin:0 0 0.6rem;font-size:0.92rem;opacity:0.82">Entrez vos quatre scores bruts pour voir vos NCLC et le bonus Express Entry estimé. Les valeurs sont sauvegardées dans votre navigateur uniquement.</p>' +
      '<div class="calc-grid">' +
        calcInput("co", "Compréhension orale", "/ 699", saved.co) +
        calcInput("ce", "Compréhension écrite", "/ 699", saved.ce) +
        calcInput("ee", "Expression écrite", "/ 20", saved.ee) +
        calcInput("eo", "Expression orale", "/ 20", saved.eo) +
      '</div>' +
      '<div class="calc-output">' +
        outCell("nco", "NCLC CO") +
        outCell("nce", "NCLC CE") +
        outCell("nee", "NCLC EE") +
        outCell("neo", "NCLC EO") +
        outCell("nmin", "NCLC binding (min)") +
        outCell("bonus", "Bonus CRS estimé") +
      '</div>' +
      '<div class="verdict" id="tcf-calc-verdict"></div>' +
      '<div style="display:flex;gap:0.5rem;margin-top:0.8rem;flex-wrap:wrap">' +
        '<button class="tcf-btn" data-act="reset">Réinitialiser</button>' +
        '<button class="tcf-btn primary" data-act="permalink">Copier un lien partageable</button>' +
      '</div>';

    function update() {
      const co = num(host.querySelector('input[name=co]').value);
      const ce = num(host.querySelector('input[name=ce]').value);
      const ee = num(host.querySelector('input[name=ee]').value);
      const eo = num(host.querySelector('input[name=eo]').value);
      const nco = nclcFromRaw(NCLC_CO_CE, co);
      const nce = nclcFromRaw(NCLC_CO_CE, ce);
      const nee = nclcFromRaw(NCLC_EE_EO, ee);
      const neo = nclcFromRaw(NCLC_EE_EO, eo);
      setOut(host, "nco", nco);
      setOut(host, "nce", nce);
      setOut(host, "nee", nee);
      setOut(host, "neo", neo);
      const min = bindMin(nco, nce, nee, neo);
      setOut(host, "nmin", min);
      setOut(host, "bonus", min != null ? crsBonus(min) + " pts" : "—");

      const verdict = host.querySelector("#tcf-calc-verdict");
      if (min == null) {
        verdict.className = "verdict";
        verdict.textContent = "Entrez au moins un score pour voir le verdict.";
      } else if (min >= 9) {
        verdict.className = "verdict ok";
        verdict.textContent = "Excellent — NCLC 9+ verrouille les 50 pts si l'anglais suit. Maintenez le rythme jusqu'au taper J-7.";
      } else if (min >= 7) {
        verdict.className = "verdict ok";
        verdict.textContent = "Cible atteinte — NCLC 7 = 25 pts CRS additifs (50 pts si anglais NCLC ≥ 9). Visez NCLC 8 sur la compétence la plus faible.";
      } else if (min >= 5) {
        verdict.className = "verdict warn";
        verdict.textContent = "En zone — encore une compétence à pousser. Identifiez le minimum et concentrez vos prochaines semaines dessus.";
      } else {
        verdict.className = "verdict bad";
        verdict.textContent = "Sous le seuil — la cible NCLC 7 reste atteignable, mais il faut prioriser la compétence binding (la plus basse).";
      }

      ls.set("calc:nclc", { co, ce, ee, eo });
    }

    host.querySelectorAll("input").forEach((i) => i.addEventListener("input", update));
    host.querySelector('[data-act=reset]').addEventListener("click", () => {
      host.querySelectorAll("input").forEach((i) => { i.value = ""; });
      ls.del("calc:nclc");
      update();
      toast("Calculateur réinitialisé", "ok");
    });
    host.querySelector('[data-act=permalink]').addEventListener("click", () => {
      const params = new URLSearchParams();
      ["co","ce","ee","eo"].forEach((k) => {
        const v = host.querySelector('input[name='+k+']').value;
        if (v !== "") params.set(k, v);
      });
      const url = location.origin + location.pathname + "#calc?" + params.toString();
      navigator.clipboard?.writeText(url).then(
        () => toast("Lien partageable copié", "ok"),
        () => toast("Copie indisponible", "warn")
      );
    });

    // Restore from URL hash if present
    if (location.hash.startsWith("#calc?")) {
      const params = new URLSearchParams(location.hash.slice(6));
      ["co","ce","ee","eo"].forEach((k) => {
        if (params.has(k)) host.querySelector('input[name='+k+']').value = params.get(k);
      });
    }
    update();
  }

  function calcInput(name, label, hint, val) {
    const v = (val == null || val === "") ? "" : String(val);
    return '<div class="calc-input">' +
      '<label for="tcf-calc-' + name + '">' + escapeHtml(label) + ' <span class="hint">' + escapeHtml(hint) + '</span></label>' +
      '<input id="tcf-calc-' + name + '" name="' + name + '" type="number" min="0" step="1" value="' + escapeHtml(v) + '" inputmode="numeric" />' +
    '</div>';
  }
  function outCell(id, lbl) {
    return '<div class="cell"><span class="val" data-out="' + id + '">—</span><span class="lbl">' + escapeHtml(lbl) + '</span></div>';
  }
  function setOut(host, id, val) {
    const el = host.querySelector('[data-out=' + id + ']');
    if (el) el.textContent = (val == null || val === "" || (typeof val === "number" && isNaN(val))) ? "—" : val;
  }
  function num(v) {
    if (v === "" || v == null) return null;
    const n = parseFloat(v);
    return isNaN(n) ? null : n;
  }

  // -----------------------------------------------------------------
  // 9. Pomodoro / exam timer
  // -----------------------------------------------------------------
  // Presets reflect TCF exam sub-section budgets
  const TIMER_PRESETS = [
    { label: "Pomodoro 25/5",  work: 25 * 60, rest: 5 * 60, cycles: 4 },
    { label: "CO 35 min",      work: 35 * 60, rest: 0, cycles: 1 },
    { label: "CE 60 min",      work: 60 * 60, rest: 0, cycles: 1 },
    { label: "EE T1 10 min",   work: 10 * 60, rest: 0, cycles: 1 },
    { label: "EE T2 20 min",   work: 20 * 60, rest: 0, cycles: 1 },
    { label: "EE T3 30 min",   work: 30 * 60, rest: 0, cycles: 1 },
    { label: "EO total 12 min",work: 12 * 60, rest: 0, cycles: 1 },
  ];

  onPage(() => {
    document.querySelectorAll(".tcf-timer").forEach(mountTimer);
  });

  function mountTimer(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";

    let preset = TIMER_PRESETS[0];
    let total = preset.work;
    let remaining = total;
    let interval = null;
    let mode = "work"; // work | rest
    let cycle = 1;

    host.innerHTML =
      '<div class="clock" aria-live="polite">25:00</div>' +
      '<div class="ctrls">' +
        '<button class="primary" data-act="toggle">Démarrer</button>' +
        '<button data-act="reset">Réinitialiser</button>' +
        '<button data-act="skip" title="Sauter à la phase suivante">↦</button>' +
      '</div>' +
      '<div class="presets" aria-label="Sélecteur de durée">' +
        TIMER_PRESETS.map((p, i) =>
          '<button data-preset="' + i + '"' + (i === 0 ? ' class="is-active"' : '') + '>' + escapeHtml(p.label) + '</button>'
        ).join("") +
      '</div>';

    const clock = host.querySelector(".clock");
    const toggleBtn = host.querySelector('[data-act=toggle]');

    function render() {
      const m = Math.floor(remaining / 60);
      const s = remaining % 60;
      clock.textContent = String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
      const phaseLabel = mode === "work" ? "Travail" : "Pause";
      clock.setAttribute("aria-label", phaseLabel + " — " + m + " minutes " + s + " secondes");
      document.title = (interval ? "⏱ " + clock.textContent + " — " : "") + (document.__origTitle = document.__origTitle || document.title.replace(/^⏱ \S+\s—\s/, ""));
    }
    function start() {
      if (interval) return;
      host.classList.add("is-running");
      host.classList.remove("is-done");
      toggleBtn.textContent = "Pause";
      interval = setInterval(() => {
        remaining--;
        if (remaining <= 0) {
          clearInterval(interval); interval = null;
          host.classList.remove("is-running");
          host.classList.add("is-done");
          toggleBtn.textContent = "Démarrer";
          beep();
          if (mode === "work" && preset.rest > 0 && cycle <= preset.cycles) {
            mode = "rest"; total = preset.rest; remaining = total;
            toast("Travail terminé — pause de " + Math.round(preset.rest/60) + " min", "ok");
          } else if (mode === "rest" && cycle < preset.cycles) {
            cycle++; mode = "work"; total = preset.work; remaining = total;
            toast("Pause terminée — cycle " + cycle + "/" + preset.cycles, "ok");
          } else {
            toast("Session terminée !", "ok", 3500);
            mode = "work"; total = preset.work; remaining = total; cycle = 1;
          }
          render();
        } else {
          render();
        }
      }, 1000);
    }
    function pause() {
      if (!interval) return;
      clearInterval(interval); interval = null;
      host.classList.remove("is-running");
      toggleBtn.textContent = "Reprendre";
    }
    function reset() {
      pause();
      mode = "work"; cycle = 1; total = preset.work; remaining = total;
      host.classList.remove("is-done");
      toggleBtn.textContent = "Démarrer";
      render();
    }
    function skip() {
      remaining = 1;
    }
    function setPreset(i) {
      preset = TIMER_PRESETS[i];
      host.querySelectorAll(".presets button").forEach((b, idx) => b.classList.toggle("is-active", idx === i));
      reset();
    }

    toggleBtn.addEventListener("click", () => interval ? pause() : start());
    host.querySelector('[data-act=reset]').addEventListener("click", reset);
    host.querySelector('[data-act=skip]').addEventListener("click", skip);
    host.querySelectorAll(".presets button").forEach((b) =>
      b.addEventListener("click", () => setPreset(parseInt(b.dataset.preset, 10)))
    );
    render();
  }

  function beep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = "sine"; o.frequency.value = 880;
      g.gain.setValueAtTime(0.001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.05);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      o.start(); o.stop(ctx.currentTime + 0.7);
    } catch (e) { /* audio unavailable */ }
  }

  // -----------------------------------------------------------------
  // 10. Self-quiz widget
  // -----------------------------------------------------------------
  // Quiz items are pulled from a global registry by data-quiz="<key>"
  window.TCF.quizzes = window.TCF.quizzes || {};

  onPage(() => {
    document.querySelectorAll(".tcf-quiz[data-quiz]").forEach(mountQuiz);
  });

  function mountQuiz(host) {
    if (host.dataset.mounted) return;
    const key = host.dataset.quiz;
    const data = window.TCF.quizzes[key];
    if (!data || !Array.isArray(data) || !data.length) {
      host.innerHTML = '<p style="opacity:0.7">Quiz « ' + escapeHtml(key) + ' » introuvable.</p>';
      return;
    }
    host.dataset.mounted = "1";

    let idx = 0;
    let score = 0;
    const answers = []; // [{i, correct}]

    function render() {
      const item = data[idx];
      if (!item) { renderSummary(); return; }
      const total = data.length;
      const letters = ["A", "B", "C", "D", "E"];
      host.innerHTML =
        '<div class="progress-row"><span>Question ' + (idx + 1) + ' / ' + total + '</span><span>Score : ' + score + '</span></div>' +
        '<div class="progress-bar"><div style="width:' + Math.round((idx / total) * 100) + '%"></div></div>' +
        '<div class="question">' + escapeHtml(item.q) + '</div>' +
        '<div class="options">' +
          item.options.map((o, i) =>
            '<button type="button" data-i="' + i + '"><span class="marker">' + letters[i] + '</span>' + escapeHtml(o) + '</button>'
          ).join("") +
        '</div>' +
        '<div class="feedback" hidden></div>' +
        '<div style="margin-top:0.6rem;display:flex;justify-content:flex-end;gap:0.4rem">' +
          '<button class="tcf-btn" data-act="next" hidden>' + (idx === total - 1 ? "Voir le résultat →" : "Question suivante →") + '</button>' +
        '</div>';

      const opts = host.querySelectorAll(".options button");
      const feedback = host.querySelector(".feedback");
      const next = host.querySelector('[data-act=next]');

      opts.forEach((btn) => {
        btn.addEventListener("click", () => {
          const choice = parseInt(btn.dataset.i, 10);
          const correct = choice === item.answer;
          opts.forEach((b, i) => {
            b.disabled = true;
            if (i === item.answer) b.classList.add("correct");
            else if (i === choice) b.classList.add("incorrect");
          });
          feedback.hidden = false;
          feedback.className = "feedback " + (correct ? "ok" : "bad");
          feedback.innerHTML = (correct ? "✓ Bonne réponse. " : "✗ Mauvaise réponse — la bonne réponse était " + letters[item.answer] + ". ") +
            (item.explain ? '<br><em>' + escapeHtml(item.explain) + '</em>' : "");
          if (correct) score++;
          answers.push({ i: idx, correct });
          next.hidden = false;
        });
      });

      next.addEventListener("click", () => { idx++; render(); });
    }

    function renderSummary() {
      const total = data.length;
      const pct = Math.round((score / total) * 100);
      const verdict = pct >= 80 ? "ok" : (pct >= 60 ? "warn" : "bad");
      if (pct === 100 && window.TCF && typeof window.TCF.confetti === "function") {
        try { window.TCF.confetti(2200); } catch (e) {}
      }
      const message = pct >= 80
        ? "Solide. Vous maîtrisez cette unité."
        : (pct >= 60 ? "Acceptable. Revoyez les items manqués ci-dessous." : "À retravailler. Reprenez les sections en amont.");
      host.innerHTML =
        '<div class="question">Score final : ' + score + ' / ' + total + ' (' + pct + ' %)</div>' +
        '<div class="feedback ' + (verdict === "bad" ? "bad" : "ok") + '">' + escapeHtml(message) + '</div>' +
        '<div style="margin-top:1rem;font-size:0.92rem">' +
          '<strong>Détail :</strong><br>' +
          answers.map((a) =>
            '<div style="padding:0.25rem 0">' + (a.correct ? "✅" : "❌") + ' Q' + (a.i + 1) + ' — ' + escapeHtml(data[a.i].q.slice(0, 80)) + (data[a.i].q.length > 80 ? "…" : "") + '</div>'
          ).join("") +
        '</div>' +
        '<div style="margin-top:1rem;display:flex;gap:0.5rem;flex-wrap:wrap">' +
          '<button class="tcf-btn primary" data-act="restart">Recommencer</button>' +
        '</div>';
      host.querySelector('[data-act=restart]').addEventListener("click", () => {
        idx = 0; score = 0; answers.length = 0; render();
      });
    }

    render();
  }

  // -----------------------------------------------------------------
  // 11. Persistent checklist
  // -----------------------------------------------------------------
  onPage(() => {
    document.querySelectorAll(".tcf-checklist[data-key]").forEach(mountChecklist);
  });

  function mountChecklist(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const key = "check:" + host.dataset.key;
    const state = ls.get(key, {});
    const items = host.querySelectorAll("li");
    let done = 0;

    items.forEach((li, i) => {
      const id = li.dataset.id || ("item-" + i);
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.id = key + ":" + id;
      cb.checked = !!state[id];
      if (cb.checked) { li.classList.add("is-done"); done++; }
      const text = document.createElement("span");
      text.innerHTML = li.innerHTML;
      li.innerHTML = "";
      li.appendChild(cb);
      li.appendChild(text);
      li.addEventListener("click", (e) => {
        if (e.target.tagName === "A") return;
        if (e.target !== cb) cb.checked = !cb.checked;
        state[id] = cb.checked;
        ls.set(key, state);
        li.classList.toggle("is-done", cb.checked);
        updateSummary();
      });
    });

    const summary = document.createElement("div");
    summary.className = "summary";
    host.appendChild(summary);

    function updateSummary() {
      const total = items.length;
      const checked = Array.from(items).filter((li) => li.classList.contains("is-done")).length;
      const pct = total ? Math.round((checked / total) * 100) : 0;
      summary.innerHTML = '<span>' + checked + ' / ' + total + ' (' + pct + ' %)</span>' +
        '<button class="tcf-btn" data-act="reset" style="font-size:0.78rem;padding:0.25rem 0.6rem">Tout décocher</button>';
      summary.querySelector('[data-act=reset]').addEventListener("click", () => {
        if (!confirm("Tout décocher cette liste ?")) return;
        items.forEach((li) => {
          li.classList.remove("is-done");
          const cb = li.querySelector("input[type=checkbox]");
          if (cb) cb.checked = false;
        });
        ls.del(key);
        Object.keys(state).forEach((k) => delete state[k]);
        updateSummary();
        toast("Liste réinitialisée", "ok");
      });
    }
    updateSummary();
  }

  // -----------------------------------------------------------------
  // 12. Audio playback-rate selector
  // -----------------------------------------------------------------
  onPage(() => {
    document.querySelectorAll("audio:not([data-tcf-rate])").forEach((audio) => {
      audio.dataset.tcfRate = "1";
      const wrap = document.createElement("div");
      wrap.style.display = "flex";
      wrap.style.gap = "0.4rem";
      wrap.style.margin = "0.3rem 0 0.8rem";
      wrap.style.alignItems = "center";
      wrap.style.fontSize = "0.78rem";
      wrap.style.opacity = "0.85";

      const label = document.createElement("span");
      label.textContent = "Vitesse :";
      wrap.appendChild(label);

      [0.75, 0.9, 1.0, 1.1, 1.25].forEach((r) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "tcf-btn";
        b.style.padding = "0.15rem 0.5rem";
        b.style.fontSize = "0.78rem";
        b.textContent = r + "×";
        if (r === 1.0) b.classList.add("primary");
        b.addEventListener("click", () => {
          audio.playbackRate = r;
          wrap.querySelectorAll("button").forEach((x) => x.classList.remove("primary"));
          b.classList.add("primary");
        });
        wrap.appendChild(b);
      });
      audio.insertAdjacentElement("afterend", wrap);
    });
  });

  // -----------------------------------------------------------------
  // 13. External-link "↗" annotation
  // -----------------------------------------------------------------
  onPage(() => {
    const host = location.host;
    document.querySelectorAll(".md-content a[href^=http]").forEach((a) => {
      if (a.dataset.tcfExt || a.host === host) return;
      a.dataset.tcfExt = "1";
      a.setAttribute("rel", (a.getAttribute("rel") || "") + " noopener");
      a.setAttribute("target", "_blank");
      // Skip social-icon and edit-this-page links rendered by Material
      if (a.querySelector("svg") || a.closest(".md-source, .md-content__button, .md-social, .md-footer-social")) return;
      const arrow = document.createElement("span");
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = " ↗";
      arrow.style.fontSize = "0.75em";
      arrow.style.opacity = "0.65";
      a.appendChild(arrow);
    });
  });

  // -----------------------------------------------------------------
  // 14b. Animated SVG NCLC / progress gauge
  // -----------------------------------------------------------------
  // Markup: <div class="tcf-gauge" data-value="503" data-max="699"
  //              data-label="CO" data-target="503"></div>
  // The arc animates from 0 → value on first scroll-into-view.
  onPage(() => {
    document.querySelectorAll(".tcf-gauge[data-value]").forEach(mountGauge);
  });

  function mountGauge(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const value = parseFloat(host.dataset.value);
    const max = parseFloat(host.dataset.max || "100");
    const label = host.dataset.label || "";
    const target = host.dataset.target ? parseFloat(host.dataset.target) : null;
    const unit = host.dataset.unit || "";
    if (isNaN(value) || isNaN(max) || max <= 0) return;
    const pct = Math.max(0, Math.min(1, value / max));
    const R = 54;
    const C = 2 * Math.PI * R;
    const dash = (pct * C).toFixed(2);
    const verdict = target != null
      ? (value >= target ? "ok" : (value >= target * 0.85 ? "warn" : "bad"))
      : "ok";

    host.classList.add("is-" + verdict);
    host.innerHTML =
      '<svg viewBox="0 0 130 130" aria-hidden="true">' +
        '<circle class="track" cx="65" cy="65" r="' + R + '" />' +
        '<circle class="fill" cx="65" cy="65" r="' + R + '" ' +
                'stroke-dasharray="0 ' + C.toFixed(2) + '" />' +
      '</svg>' +
      '<div class="g-center">' +
        '<div class="g-num" data-final="' + value + '">0</div>' +
        (unit ? '<div class="g-unit">' + escapeHtml(unit) + '</div>' : '') +
      '</div>' +
      (label ? '<div class="g-label">' + escapeHtml(label) + '</div>' : '') +
      (target != null ? '<div class="g-target">cible ' + target + (unit ? " " + escapeHtml(unit) : "") + '</div>' : '');

    function animate() {
      const fill = host.querySelector("circle.fill");
      const num = host.querySelector(".g-num");
      if (!fill || !num) return;
      requestAnimationFrame(() => {
        fill.style.strokeDasharray = dash + " " + C.toFixed(2);
        const start = performance.now(), dur = 1100;
        const ease = (t) => 1 - Math.pow(1 - t, 3);
        function step(now) {
          const t = Math.min(1, (now - start) / dur);
          num.textContent = Math.round(value * ease(t)).toLocaleString("fr-FR");
          if (t < 1) requestAnimationFrame(step);
          else num.textContent = value.toLocaleString("fr-FR");
        }
        requestAnimationFrame(step);
      });
    }

    if (!("IntersectionObserver" in window)) { animate(); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !host.dataset.animated) {
          host.dataset.animated = "1";
          animate();
          io.unobserve(host);
        }
      });
    }, { threshold: 0.5 });
    io.observe(host);
  }

  // -----------------------------------------------------------------
  // 15. Flashcards with light spaced repetition (SM-2 simplified)
  // -----------------------------------------------------------------
  // Markup: <div class="tcf-flashcards" data-deck="grammar_b2"></div>
  // Decks live in window.TCF.decks[key] = [{ front, back, hint?, tags? }, ...]
  // SRS scheduling: "Again" (1d), "Hard" (3d), "Good" (7d), "Easy" (14d)
  window.TCF.decks = window.TCF.decks || {};

  onPage(() => {
    document.querySelectorAll(".tcf-flashcards[data-deck]").forEach(mountFlashcards);
  });

  function mountFlashcards(host) {
    if (host.dataset.mounted) return;
    const key = host.dataset.deck;
    const deck = window.TCF.decks[key];
    if (!deck || !Array.isArray(deck) || !deck.length) {
      host.innerHTML = '<p style="opacity:0.7">Deck « ' + escapeHtml(key) + ' » introuvable.</p>';
      return;
    }
    host.dataset.mounted = "1";

    const SCHED_KEY = "fc:" + key;
    const STATS_KEY = "fc-stats:" + key;
    const sched = ls.get(SCHED_KEY, {});       // { idx: dueTs }
    const stats = ls.get(STATS_KEY, { reviewed: 0, again: 0, good: 0, easy: 0, hard: 0 });
    const DAY = 86400000;
    const now = Date.now();
    function due(i) { return (sched[i] || 0) <= now; }

    // Build queue: due items first, then never-seen, then everything in random order.
    function buildQueue() {
      const dueIdx = [];
      const newIdx = [];
      const lateIdx = [];
      deck.forEach((_, i) => {
        if (!(i in sched)) newIdx.push(i);
        else if (due(i)) dueIdx.push(i);
        else lateIdx.push(i);
      });
      shuffle(dueIdx); shuffle(newIdx);
      return [...dueIdx, ...newIdx];
    }

    let queue = buildQueue();
    let pos = 0;
    let flipped = false;

    function render() {
      if (pos >= queue.length) { renderSummary(); return; }
      const i = queue[pos];
      const card = deck[i];
      const total = queue.length;
      flipped = false;
      host.innerHTML =
        '<div class="fc-meta"><span>Carte ' + (pos + 1) + ' / ' + total + '</span>' +
          '<span class="fc-stats">✅ ' + stats.good + '  ⭐ ' + stats.easy + '  🔁 ' + stats.again + '</span></div>' +
        '<div class="fc-bar"><div style="width:' + Math.round((pos / total) * 100) + '%"></div></div>' +
        '<div class="fc-card" tabindex="0" role="button" aria-label="Cliquez ou appuyez sur Espace pour révéler la réponse">' +
          '<div class="fc-side fc-front">' +
            '<div class="fc-text">' + escapeHtml(card.front) + '</div>' +
            (card.hint ? '<div class="fc-hint">' + escapeHtml(card.hint) + '</div>' : '') +
            '<div class="fc-flip-hint">Cliquez pour révéler</div>' +
          '</div>' +
          '<div class="fc-side fc-back" hidden>' +
            '<div class="fc-text fc-answer">' + escapeHtml(card.back) + '</div>' +
            (card.note ? '<div class="fc-note"><em>' + escapeHtml(card.note) + '</em></div>' : '') +
          '</div>' +
        '</div>' +
        '<div class="fc-grades" hidden>' +
          '<button class="tcf-btn fc-grade" data-grade="again">🔁 À revoir <small>(1 j)</small></button>' +
          '<button class="tcf-btn fc-grade" data-grade="hard">😬 Difficile <small>(3 j)</small></button>' +
          '<button class="tcf-btn fc-grade primary" data-grade="good">✓ OK <small>(7 j)</small></button>' +
          '<button class="tcf-btn fc-grade" data-grade="easy">⭐ Facile <small>(14 j)</small></button>' +
        '</div>' +
        '<div class="fc-footer">' +
          '<button class="tcf-btn fc-act" data-act="skip">Passer →</button>' +
          '<button class="tcf-btn fc-act" data-act="reset" title="Tout réinitialiser pour ce deck">↺ Réinitialiser</button>' +
        '</div>';

      const cardEl = host.querySelector(".fc-card");
      const grades = host.querySelector(".fc-grades");
      const front = host.querySelector(".fc-front");
      const back  = host.querySelector(".fc-back");

      function flip() {
        flipped = true;
        front.hidden = true;
        back.hidden = false;
        grades.hidden = false;
        cardEl.classList.add("is-flipped");
      }
      cardEl.addEventListener("click", () => { if (!flipped) flip(); });
      cardEl.addEventListener("keydown", (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); if (!flipped) flip(); } });

      host.querySelectorAll(".fc-grade").forEach((btn) => {
        btn.addEventListener("click", () => {
          if (!flipped) return;
          const g = btn.dataset.grade;
          const days = g === "again" ? 1 : (g === "hard" ? 3 : (g === "good" ? 7 : 14));
          sched[i] = now + days * DAY;
          stats.reviewed++; stats[g] = (stats[g] || 0) + 1;
          ls.set(SCHED_KEY, sched); ls.set(STATS_KEY, stats);
          pos++; render();
        });
      });

      host.querySelector('[data-act=skip]').addEventListener("click", () => { pos++; render(); });
      host.querySelector('[data-act=reset]').addEventListener("click", () => {
        if (!confirm("Réinitialiser la progression de ce deck ?")) return;
        ls.del(SCHED_KEY); ls.del(STATS_KEY);
        Object.keys(sched).forEach((k) => delete sched[k]);
        Object.assign(stats, { reviewed: 0, again: 0, good: 0, easy: 0, hard: 0 });
        queue = buildQueue(); pos = 0;
        toast("Deck réinitialisé", "ok");
        render();
      });
    }

    function renderSummary() {
      const pctMem = stats.reviewed
        ? Math.round(((stats.good + stats.easy) / stats.reviewed) * 100)
        : 0;
      host.innerHTML =
        '<div class="fc-summary">' +
          '<h3>Session terminée 🎉</h3>' +
          '<p>Vous avez revu <strong>' + queue.length + '</strong> cartes. Rétention apparente : <strong>' + pctMem + ' %</strong>.</p>' +
          '<div class="fc-grid">' +
            '<div><span>' + stats.again + '</span><small>À revoir</small></div>' +
            '<div><span>' + stats.hard + '</span><small>Difficiles</small></div>' +
            '<div><span>' + stats.good + '</span><small>OK</small></div>' +
            '<div><span>' + stats.easy + '</span><small>Faciles</small></div>' +
          '</div>' +
          '<div style="display:flex;gap:0.5rem;margin-top:1rem;flex-wrap:wrap">' +
            '<button class="tcf-btn primary" data-act="again">Nouvelle session</button>' +
            '<button class="tcf-btn" data-act="reset">↺ Réinitialiser deck</button>' +
          '</div>' +
        '</div>';
      host.querySelector('[data-act=again]').addEventListener("click", () => {
        queue = buildQueue(); pos = 0; render();
      });
      host.querySelector('[data-act=reset]').addEventListener("click", () => {
        if (!confirm("Réinitialiser la progression de ce deck ?")) return;
        ls.del(SCHED_KEY); ls.del(STATS_KEY);
        Object.keys(sched).forEach((k) => delete sched[k]);
        Object.assign(stats, { reviewed: 0, again: 0, good: 0, easy: 0, hard: 0 });
        queue = buildQueue(); pos = 0; render();
      });
    }

    render();
  }

  // -----------------------------------------------------------------
  // 16. Conjugation drill
  // -----------------------------------------------------------------
  // Markup: <div class="tcf-conjugate" data-verbs="core"></div>
  // Verb data in window.TCF.verbs[key]; we accept and grade with diacritics
  window.TCF.verbs = window.TCF.verbs || {};

  onPage(() => {
    document.querySelectorAll(".tcf-conjugate[data-verbs]").forEach(mountConjugate);
  });

  function stripAccents(s) {
    return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
  }

  function mountConjugate(host) {
    if (host.dataset.mounted) return;
    const key = host.dataset.verbs;
    const verbs = window.TCF.verbs[key];
    if (!verbs || !Array.isArray(verbs) || !verbs.length) {
      host.innerHTML = '<p style="opacity:0.7">Banque verbale « ' + escapeHtml(key) + ' » introuvable.</p>';
      return;
    }
    host.dataset.mounted = "1";

    const TENSES = [
      { id: "pres",  label: "présent" },
      { id: "pc",    label: "passé composé" },
      { id: "imp",   label: "imparfait" },
      { id: "fut",   label: "futur simple" },
      { id: "cond",  label: "conditionnel présent" },
      { id: "subj",  label: "subjonctif présent" },
    ];
    const PERSONS = ["je", "tu", "il", "nous", "vous", "ils"];
    const STATE_KEY = "conj:" + key;
    const state = ls.get(STATE_KEY, { score: 0, attempts: 0, streak: 0, best: 0, weak: {} });

    let q = null;

    function pickQuestion() {
      const enabled = TENSES.filter((t) => host.querySelector('input[data-tense='+t.id+']').checked);
      if (!enabled.length) return null;
      // Bias toward weak items
      const candidates = [];
      verbs.forEach((v) => {
        enabled.forEach((t) => {
          if (!v.forms || !v.forms[t.id]) return;
          PERSONS.forEach((p, pi) => {
            if (!v.forms[t.id][pi]) return;
            const id = v.inf + "|" + t.id + "|" + pi;
            const w = state.weak[id] || 0;
            for (let k = 0; k < (1 + w * 2); k++) candidates.push({ v, t, pi, p, id });
          });
        });
      });
      return candidates.length ? candidates[Math.floor(Math.random() * candidates.length)] : null;
    }

    function render() {
      const enabledLabels = TENSES.map((t) => {
        const checked = state.tensesSelected ? state.tensesSelected.includes(t.id) : (t.id === "pres" || t.id === "pc");
        return '<label class="cj-tense"><input type="checkbox" data-tense="' + t.id + '"' +
          (checked ? " checked" : "") + '>' + t.label + '</label>';
      }).join("");
      host.innerHTML =
        '<div class="cj-head">' +
          '<div class="cj-score">Score : <strong>' + state.score + ' / ' + state.attempts + '</strong>' +
            ' · Série : <strong>' + state.streak + '</strong> · Meilleure : <strong>' + state.best + '</strong></div>' +
          '<div class="cj-tenses">' + enabledLabels + '</div>' +
        '</div>' +
        '<div class="cj-prompt">' +
          '<div class="cj-instruction">Conjugaison demandée :</div>' +
          '<div class="cj-target"></div>' +
        '</div>' +
        '<div class="cj-input-row">' +
          '<input class="cj-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="tapez la forme conjuguée…" />' +
          '<button class="tcf-btn primary cj-submit" type="button">Valider</button>' +
          '<button class="tcf-btn cj-skip" type="button" title="Voir la réponse">Passer</button>' +
        '</div>' +
        '<div class="cj-feedback" hidden></div>';

      const tEls = host.querySelectorAll('input[data-tense]');
      tEls.forEach((el) => el.addEventListener("change", () => {
        state.tensesSelected = Array.from(tEls).filter((x) => x.checked).map((x) => x.dataset.tense);
        ls.set(STATE_KEY, state);
        next();
      }));

      const input = host.querySelector(".cj-input");
      const feedback = host.querySelector(".cj-feedback");
      const submitBtn = host.querySelector(".cj-submit");
      const skipBtn   = host.querySelector(".cj-skip");

      function next() {
        q = pickQuestion();
        feedback.hidden = true; feedback.className = "cj-feedback";
        input.value = ""; input.disabled = false; input.focus();
        submitBtn.disabled = false; submitBtn.textContent = "Valider";
        const target = host.querySelector(".cj-target");
        if (!q) { target.textContent = "Cochez au moins un temps."; return; }
        target.innerHTML = '<span class="cj-verb">' + escapeHtml(q.v.inf) + '</span>' +
          ' · <span class="cj-tense-tag">' + escapeHtml(q.t.label) + '</span>' +
          ' · <span class="cj-person">' + escapeHtml(q.p) + '</span>';
      }
      function check() {
        if (!q) return;
        const given = input.value.trim();
        const correct = q.v.forms[q.t.id][q.pi];
        const ok = stripAccents(given) === stripAccents(correct);
        state.attempts++;
        if (ok) {
          state.score++; state.streak++; state.best = Math.max(state.best, state.streak);
          state.weak[q.id] = Math.max(0, (state.weak[q.id] || 0) - 1);
          feedback.hidden = false; feedback.className = "cj-feedback ok";
          feedback.innerHTML = "✓ Correct — <strong>" + escapeHtml(correct) + "</strong>";
        } else {
          state.streak = 0;
          state.weak[q.id] = (state.weak[q.id] || 0) + 1;
          feedback.hidden = false; feedback.className = "cj-feedback bad";
          feedback.innerHTML = "✗ Attendu : <strong>" + escapeHtml(correct) + "</strong>" +
            (given ? " — vous avez tapé <em>" + escapeHtml(given) + "</em>" : "");
        }
        ls.set(STATE_KEY, state);
        host.querySelector(".cj-score").innerHTML =
          'Score : <strong>' + state.score + ' / ' + state.attempts + '</strong>' +
          ' · Série : <strong>' + state.streak + '</strong> · Meilleure : <strong>' + state.best + '</strong>';
        input.disabled = true;
        submitBtn.textContent = "Suivante →";
        submitBtn.onclick = () => { submitBtn.onclick = check; next(); };
      }
      submitBtn.onclick = check;
      skipBtn.addEventListener("click", () => {
        if (!q) return;
        feedback.hidden = false; feedback.className = "cj-feedback warn";
        feedback.innerHTML = "Réponse : <strong>" + escapeHtml(q.v.forms[q.t.id][q.pi]) + "</strong>";
        state.attempts++; state.streak = 0;
        state.weak[q.id] = (state.weak[q.id] || 0) + 1;
        ls.set(STATE_KEY, state);
        input.disabled = true;
        submitBtn.textContent = "Suivante →";
        submitBtn.onclick = () => { submitBtn.onclick = check; next(); };
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); if (!input.disabled) check(); else submitBtn.click(); }
      });
      next();
    }

    render();
  }

  // -----------------------------------------------------------------
  // 17. Dictée widget (Web Speech API TTS — listen + type)
  // -----------------------------------------------------------------
  // Markup: <div class="tcf-dictee" data-set="b2_short"></div>
  // Sets in window.TCF.dictees[key] = [{ text, gloss?, voice? }, …]
  window.TCF.dictees = window.TCF.dictees || {};

  onPage(() => {
    document.querySelectorAll(".tcf-dictee[data-set]").forEach(mountDictee);
  });

  function pickFrenchVoice() {
    if (!("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices() || [];
    const fr = voices.filter((v) => /^fr/i.test(v.lang));
    if (!fr.length) return null;
    // Prefer Canadian → female → first
    return fr.find((v) => /CA/i.test(v.lang)) || fr.find((v) => /female|amelie|aurelie|virginie|hortense/i.test(v.name)) || fr[0];
  }

  function mountDictee(host) {
    if (host.dataset.mounted) return;
    const key = host.dataset.set;
    const set = window.TCF.dictees[key];
    if (!set || !Array.isArray(set) || !set.length) {
      host.innerHTML = '<p style="opacity:0.7">Dictée « ' + escapeHtml(key) + ' » introuvable.</p>';
      return;
    }
    host.dataset.mounted = "1";

    if (!("speechSynthesis" in window)) {
      host.innerHTML = '<p style="opacity:0.7">Votre navigateur ne supporte pas la synthèse vocale Web. Essayez Chrome/Edge récent.</p>';
      return;
    }

    let idx = 0; let attempts = 0; let score = 0; let rate = 0.9;

    function levenshtein(a, b) {
      a = stripAccents(a); b = stripAccents(b);
      const m = a.length, n = b.length;
      if (!m) return n; if (!n) return m;
      const d = Array.from({ length: m + 1 }, (_, i) => [i].concat(new Array(n).fill(0)));
      for (let j = 0; j <= n; j++) d[0][j] = j;
      for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
          const cost = a[i-1] === b[j-1] ? 0 : 1;
          d[i][j] = Math.min(d[i-1][j] + 1, d[i][j-1] + 1, d[i-1][j-1] + cost);
        }
      }
      return d[m][n];
    }

    function speak(text) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
      const u = new SpeechSynthesisUtterance(text);
      const v = pickFrenchVoice();
      if (v) u.voice = v;
      u.lang = (v && v.lang) || "fr-FR";
      u.rate = rate;
      u.pitch = 1.0;
      window.speechSynthesis.speak(u);
    }

    function render() {
      const item = set[idx];
      if (!item) { renderSummary(); return; }
      host.innerHTML =
        '<div class="dc-head"><span>Phrase ' + (idx + 1) + ' / ' + set.length + '</span>' +
          '<span class="dc-score">Score : ' + score + ' / ' + attempts + '</span></div>' +
        '<div class="dc-bar"><div style="width:' + Math.round((idx / set.length) * 100) + '%"></div></div>' +
        '<div class="dc-controls">' +
          '<button class="tcf-btn primary dc-play">🔊 Écouter</button>' +
          '<button class="tcf-btn dc-replay">↻ Re-écouter</button>' +
          '<div class="dc-rate" role="group" aria-label="Vitesse de lecture">' +
            '<small>Vitesse :</small>' +
            ['0.7','0.85','1.0','1.15'].map((r) =>
              '<button data-rate="' + r + '"' + (parseFloat(r) === rate ? ' class="is-active"' : '') + '>' + r + '×</button>'
            ).join("") +
          '</div>' +
        '</div>' +
        '<textarea class="dc-input" rows="3" placeholder="Tapez ce que vous entendez…" autocapitalize="sentences"></textarea>' +
        '<div class="dc-actions">' +
          '<button class="tcf-btn primary dc-check">Vérifier</button>' +
          '<button class="tcf-btn dc-show">Voir la phrase</button>' +
          '<button class="tcf-btn dc-skip">Passer →</button>' +
        '</div>' +
        '<div class="dc-feedback" hidden></div>';

      const playBtn = host.querySelector(".dc-play");
      const replayBtn = host.querySelector(".dc-replay");
      const input = host.querySelector(".dc-input");
      const feedback = host.querySelector(".dc-feedback");
      const rateBtns = host.querySelectorAll(".dc-rate button");

      playBtn.addEventListener("click", () => speak(item.text));
      replayBtn.addEventListener("click", () => speak(item.text));
      rateBtns.forEach((b) => b.addEventListener("click", () => {
        rate = parseFloat(b.dataset.rate);
        rateBtns.forEach((x) => x.classList.remove("is-active"));
        b.classList.add("is-active");
      }));

      function gradeAnswer() {
        const given = input.value.trim();
        const expected = item.text;
        const distance = levenshtein(given, expected);
        const sim = Math.max(0, 1 - distance / Math.max(1, expected.length));
        const pct = Math.round(sim * 100);
        attempts++;
        if (pct >= 92) {
          score++;
          feedback.hidden = false; feedback.className = "dc-feedback ok";
          feedback.innerHTML = '✓ <strong>' + pct + ' %</strong> de similarité — phrase reconnue.<br>' +
            '<em>' + escapeHtml(expected) + '</em>' +
            (item.gloss ? '<br><small>' + escapeHtml(item.gloss) + '</small>' : '');
        } else if (pct >= 70) {
          feedback.hidden = false; feedback.className = "dc-feedback warn";
          feedback.innerHTML = '◐ <strong>' + pct + ' %</strong> — proche, vérifiez accents et finales.<br>' +
            '<em>' + escapeHtml(expected) + '</em>';
        } else {
          feedback.hidden = false; feedback.className = "dc-feedback bad";
          feedback.innerHTML = '✗ <strong>' + pct + ' %</strong> — réécoutez en vitesse réduite.<br>' +
            '<em>' + escapeHtml(expected) + '</em>';
        }
      }
      host.querySelector(".dc-check").addEventListener("click", gradeAnswer);
      host.querySelector(".dc-show").addEventListener("click", () => {
        feedback.hidden = false; feedback.className = "dc-feedback";
        feedback.innerHTML = 'Phrase : <em>' + escapeHtml(item.text) + '</em>';
      });
      host.querySelector(".dc-skip").addEventListener("click", () => { idx++; render(); });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); gradeAnswer(); }
      });
      // Auto-play on render
      setTimeout(() => speak(item.text), 250);
    }

    function renderSummary() {
      const pct = Math.round((score / Math.max(1, attempts)) * 100);
      host.innerHTML =
        '<div class="dc-summary"><h3>Dictée terminée</h3>' +
          '<p>Score : <strong>' + score + ' / ' + attempts + '</strong> (' + pct + ' %).</p>' +
          '<button class="tcf-btn primary" data-act="again">Recommencer</button></div>';
      host.querySelector('[data-act=again]').addEventListener("click", () => {
        idx = 0; attempts = 0; score = 0; render();
      });
    }

    render();
  }

  // -----------------------------------------------------------------
  // 18. Score tracker (mock exam attempts → trajectory chart)
  // -----------------------------------------------------------------
  // Markup: <div class="tcf-tracker" data-key="mocks"></div>
  onPage(() => {
    document.querySelectorAll(".tcf-tracker[data-key]").forEach(mountTracker);
  });

  function mountTracker(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";

    const key = "tracker:" + host.dataset.key;
    const entries = ls.get(key, []); // [{ date, label, co, ce, ee, eo }]

    function render() {
      host.innerHTML =
        '<h3>Suivi des examens blancs</h3>' +
        '<form class="tr-form" autocomplete="off">' +
          '<input type="date" name="date" required />' +
          '<input type="text" name="label" placeholder="Mock #1, Diagnostic, …" maxlength="40" required />' +
          '<input type="number" name="co" placeholder="CO / 699" min="0" max="699" step="1" />' +
          '<input type="number" name="ce" placeholder="CE / 699" min="0" max="699" step="1" />' +
          '<input type="number" name="ee" placeholder="EE / 20"  min="0" max="20"  step="1" />' +
          '<input type="number" name="eo" placeholder="EO / 20"  min="0" max="20"  step="1" />' +
          '<button class="tcf-btn primary" type="submit">+ Ajouter</button>' +
        '</form>' +
        '<div class="tr-chart" aria-label="Graphique de progression"></div>' +
        '<div class="tr-table"></div>' +
        '<div class="tr-actions">' +
          '<button class="tcf-btn" data-act="export">Exporter (JSON)</button>' +
          '<button class="tcf-btn" data-act="clear">↺ Vider</button>' +
        '</div>';

      const form = host.querySelector(".tr-form");
      // Default date today (yyyy-mm-dd)
      const dt = new Date();
      const isoDate = [dt.getFullYear(), String(dt.getMonth() + 1).padStart(2, "0"), String(dt.getDate()).padStart(2, "0")].join("-");
      form.elements.date.value = isoDate;

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const f = Object.fromEntries(new FormData(form).entries());
        entries.push({
          date: f.date,
          label: f.label,
          co: f.co !== "" ? parseFloat(f.co) : null,
          ce: f.ce !== "" ? parseFloat(f.ce) : null,
          ee: f.ee !== "" ? parseFloat(f.ee) : null,
          eo: f.eo !== "" ? parseFloat(f.eo) : null,
        });
        entries.sort((a, b) => a.date.localeCompare(b.date));
        ls.set(key, entries);
        form.elements.label.value = ""; form.elements.co.value = "";
        form.elements.ce.value = ""; form.elements.ee.value = ""; form.elements.eo.value = "";
        renderChart(); renderTable();
        toast("Entrée enregistrée", "ok");
      });

      host.querySelector('[data-act=clear]').addEventListener("click", () => {
        if (!confirm("Vider tout l'historique ?")) return;
        entries.length = 0; ls.del(key);
        renderChart(); renderTable();
        toast("Historique vidé", "ok");
      });
      host.querySelector('[data-act=export]').addEventListener("click", () => {
        const blob = new Blob([JSON.stringify(entries, null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "tcf-tracker.json";
        a.click();
        URL.revokeObjectURL(a.href);
      });
      renderChart(); renderTable();
    }

    function nclcOf(co, ce, ee, eo) {
      const nco = nclcFromRaw(NCLC_CO_CE, co);
      const nce = nclcFromRaw(NCLC_CO_CE, ce);
      const nee = nclcFromRaw(NCLC_EE_EO, ee);
      const neo = nclcFromRaw(NCLC_EE_EO, eo);
      const arr = [nco, nce, nee, neo].filter((x) => x != null);
      return arr.length ? Math.min(...arr) : null;
    }

    function renderChart() {
      const host2 = host.querySelector(".tr-chart");
      if (!entries.length) { host2.innerHTML = '<p style="opacity:0.7;text-align:center;padding:1rem">Pas encore d\'entrée. Ajoutez votre premier mock pour voir la trajectoire.</p>'; return; }
      const W = 640, H = 260, PAD = { l: 40, r: 24, t: 18, b: 36 };
      const n = entries.length;
      const yMax = 10;
      const X = (i) => PAD.l + (i / Math.max(1, n - 1)) * (W - PAD.l - PAD.r);
      const Y = (v) => PAD.t + (1 - v / yMax) * (H - PAD.t - PAD.b);
      const points = entries.map((e, i) => ({ i, x: X(i), nclc: nclcOf(e.co, e.ce, e.ee, e.eo) }));

      const gridY = [0,2,4,6,8,10].map((g) =>
        '<line class="tr-grid" x1="' + PAD.l + '" x2="' + (W - PAD.r) + '" y1="' + Y(g) + '" y2="' + Y(g) + '" />' +
        '<text class="tr-axis" x="' + (PAD.l - 6) + '" y="' + (Y(g) + 4) + '" text-anchor="end">NCLC ' + g + '</text>'
      ).join("");

      const targetLine = '<line class="tr-target" x1="' + PAD.l + '" x2="' + (W - PAD.r) +
        '" y1="' + Y(7) + '" y2="' + Y(7) + '" />' +
        '<text class="tr-target-lbl" x="' + (W - PAD.r - 4) + '" y="' + (Y(7) - 4) + '" text-anchor="end">cible NCLC 7</text>';

      const path = points
        .filter((p) => p.nclc != null)
        .map((p, i) => (i === 0 ? "M" : "L") + p.x.toFixed(1) + "," + Y(p.nclc).toFixed(1)).join(" ");

      const dots = points.map((p) => {
        if (p.nclc == null) return "";
        const e = entries[p.i];
        const ok = p.nclc >= 7;
        return '<g class="tr-dot ' + (ok ? "ok" : "warn") + '">' +
          '<circle cx="' + p.x.toFixed(1) + '" cy="' + Y(p.nclc).toFixed(1) + '" r="5" />' +
          '<title>' + escapeHtml(e.label + " — " + e.date + " · NCLC " + p.nclc) + '</title>' +
          '</g>';
      }).join("");

      const xLabels = entries.map((e, i) =>
        '<text class="tr-axis tr-x" x="' + X(i) + '" y="' + (H - PAD.b + 18) + '" text-anchor="middle">' +
          escapeHtml(e.date.slice(5)) + '</text>'
      ).join("");

      host2.innerHTML =
        '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Progression NCLC">' +
          gridY + targetLine +
          '<path class="tr-line" d="' + path + '" />' +
          dots + xLabels +
        '</svg>';
    }

    function renderTable() {
      const host2 = host.querySelector(".tr-table");
      if (!entries.length) { host2.innerHTML = ""; return; }
      host2.innerHTML =
        '<table class="tr-tbl"><thead><tr>' +
          '<th>Date</th><th>Étiquette</th><th>CO</th><th>CE</th><th>EE</th><th>EO</th><th>NCLC</th><th></th>' +
        '</tr></thead><tbody>' +
        entries.map((e, i) => {
          const n = nclcOf(e.co, e.ce, e.ee, e.eo);
          return '<tr><td>' + escapeHtml(e.date) + '</td>' +
            '<td>' + escapeHtml(e.label) + '</td>' +
            '<td>' + (e.co != null ? e.co : "—") + '</td>' +
            '<td>' + (e.ce != null ? e.ce : "—") + '</td>' +
            '<td>' + (e.ee != null ? e.ee : "—") + '</td>' +
            '<td>' + (e.eo != null ? e.eo : "—") + '</td>' +
            '<td><strong>' + (n != null ? n : "—") + '</strong></td>' +
            '<td><button class="tcf-btn tr-del" data-i="' + i + '" title="Supprimer">×</button></td>' +
            '</tr>';
        }).join("") +
        '</tbody></table>';
      host2.querySelectorAll(".tr-del").forEach((b) => b.addEventListener("click", () => {
        const i = parseInt(b.dataset.i, 10);
        entries.splice(i, 1);
        ls.set(key, entries);
        renderChart(); renderTable();
      }));
    }

    render();
  }

  // -----------------------------------------------------------------
  // 19. Daily study streak / habit tracker
  // -----------------------------------------------------------------
  // Markup: <div class="tcf-streak"></div>
  onPage(() => {
    document.querySelectorAll(".tcf-streak").forEach(mountStreak);
  });

  function ymd(d) {
    const x = (d instanceof Date) ? d : new Date(d);
    return [x.getFullYear(), String(x.getMonth() + 1).padStart(2, "0"), String(x.getDate()).padStart(2, "0")].join("-");
  }
  function addDays(s, n) { const d = new Date(s); d.setDate(d.getDate() + n); return ymd(d); }

  function mountStreak(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const KEY = "streak:days";
    const days = ls.get(KEY, {});

    function computeStreaks() {
      const today = ymd(new Date());
      let cur = 0, best = 0, run = 0;
      const allDates = Object.keys(days).filter((d) => days[d]).sort();
      if (!allDates.length) return { cur: 0, best: 0, total: 0 };
      // Determine current streak (ending today or yesterday)
      let cursor = today;
      while (days[cursor]) { cur++; cursor = addDays(cursor, -1); }
      if (!cur) {
        const yesterday = addDays(today, -1);
        cursor = yesterday;
        while (days[cursor]) { cur++; cursor = addDays(cursor, -1); }
      }
      // Best streak — sweep
      let prev = null;
      allDates.forEach((d) => {
        if (prev && addDays(prev, 1) === d) run++;
        else run = 1;
        best = Math.max(best, run);
        prev = d;
      });
      return { cur, best, total: allDates.length };
    }

    function render() {
      const today = ymd(new Date());
      const s = computeStreaks();
      // Render last 91 days (13 weeks) as a heatmap
      const cells = [];
      for (let i = 90; i >= 0; i--) {
        const d = addDays(today, -i);
        cells.push({ d, on: !!days[d] });
      }
      host.innerHTML =
        '<div class="sk-head">' +
          '<div class="sk-num"><span>' + s.cur + '</span><small>jours d\'affilée</small></div>' +
          '<div class="sk-num"><span>' + s.best + '</span><small>meilleure série</small></div>' +
          '<div class="sk-num"><span>' + s.total + '</span><small>total étudié</small></div>' +
        '</div>' +
        '<div class="sk-heatmap" aria-label="Carte de chaleur d\'étude sur 13 semaines">' +
          cells.map((c) =>
            '<div class="sk-cell ' + (c.on ? "is-on" : "") + (c.d === today ? " is-today" : "") +
              '" data-d="' + c.d + '" title="' + c.d + (c.on ? " — étudié" : "") + '"></div>'
          ).join("") +
        '</div>' +
        '<div class="sk-actions">' +
          '<button class="tcf-btn primary" data-act="today">' + (days[today] ? "✓ Étudié aujourd'hui" : "Marquer aujourd'hui comme étudié") + '</button>' +
          '<button class="tcf-btn" data-act="reset">↺ Tout effacer</button>' +
        '</div>' +
        '<p class="sk-hint">Cliquez n\'importe quel jour pour basculer son état. Une journée = ≥ 30 min d\'étude.</p>';

      host.querySelectorAll(".sk-cell").forEach((c) => c.addEventListener("click", () => {
        const d = c.dataset.d;
        if (days[d]) delete days[d]; else days[d] = 1;
        ls.set(KEY, days);
        render();
      }));
      host.querySelector('[data-act=today]').addEventListener("click", () => {
        if (days[today]) delete days[today]; else days[today] = 1;
        ls.set(KEY, days); render();
      });
      host.querySelector('[data-act=reset]').addEventListener("click", () => {
        if (!confirm("Effacer tout l'historique d'étude ?")) return;
        Object.keys(days).forEach((k) => delete days[k]);
        ls.del(KEY); render(); toast("Historique effacé", "ok");
      });
    }
    render();
  }

  // -----------------------------------------------------------------
  // 20. Live word counter for EE practice
  // -----------------------------------------------------------------
  // Markup: <div class="tcf-wordcount" data-target-min="60" data-target-max="120"></div>
  onPage(() => {
    document.querySelectorAll(".tcf-wordcount").forEach(mountWordCount);
  });

  function mountWordCount(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const tmin = parseInt(host.dataset.targetMin || "60", 10);
    const tmax = parseInt(host.dataset.targetMax || "120", 10);
    const KEY = "wc:" + (host.dataset.key || "default");
    const saved = ls.get(KEY, "");

    host.innerHTML =
      '<div class="wc-head">' +
        '<div>Compteur EE — cible <strong>' + tmin + '–' + tmax + '</strong> mots</div>' +
        '<div class="wc-stats" role="status" aria-live="polite">' +
          '<span class="wc-words"><strong>0</strong> mots</span>' +
          '<span class="wc-chars"><strong>0</strong> car.</span>' +
          '<span class="wc-sent"><strong>0</strong> phrases</span>' +
          '<span class="wc-read"><strong>0</strong> min lecture</span>' +
        '</div>' +
      '</div>' +
      '<textarea class="wc-input" rows="10" placeholder="Rédigez ici…">' + escapeHtml(saved) + '</textarea>' +
      '<div class="wc-bar"><div class="wc-fill"></div></div>' +
      '<div class="wc-foot">' +
        '<button class="tcf-btn" data-act="copy">Copier</button>' +
        '<button class="tcf-btn" data-act="clear">Effacer</button>' +
        '<small class="wc-saved">Sauvegardé automatiquement</small>' +
      '</div>';

    const ta = host.querySelector(".wc-input");
    const fill = host.querySelector(".wc-fill");
    const wordsEl = host.querySelector(".wc-words strong");
    const charsEl = host.querySelector(".wc-chars strong");
    const sentEl  = host.querySelector(".wc-sent strong");
    const readEl  = host.querySelector(".wc-read strong");

    function update() {
      const text = ta.value;
      const words = (text.trim().match(/\S+/g) || []).length;
      const chars = text.length;
      const sent  = (text.match(/[.!?…]+/g) || []).length;
      const read  = Math.max(1, Math.round(words / 200));
      wordsEl.textContent = words;
      charsEl.textContent = chars;
      sentEl.textContent  = sent;
      readEl.textContent  = read;
      const pct = Math.min(120, Math.round((words / tmax) * 100));
      fill.style.width = Math.min(100, pct) + "%";
      if (words >= tmin && words <= tmax) fill.className = "wc-fill ok";
      else if (words > tmax) fill.className = "wc-fill warn";
      else fill.className = "wc-fill";
      ls.set(KEY, text);
    }
    ta.addEventListener("input", update);
    host.querySelector('[data-act=copy]').addEventListener("click", () => {
      navigator.clipboard?.writeText(ta.value).then(
        () => toast("Texte copié", "ok"),
        () => toast("Copie indisponible", "warn")
      );
    });
    host.querySelector('[data-act=clear]').addEventListener("click", () => {
      if (!confirm("Effacer le brouillon ?")) return;
      ta.value = ""; update(); toast("Brouillon effacé", "ok");
    });
    update();
  }

  // -----------------------------------------------------------------
  // 21. WPM / reading speed test
  // -----------------------------------------------------------------
  // Markup: <div class="tcf-wpm" data-passage="ce_b2"></div>
  // Passages in window.TCF.passages[key] = { text, words?, source? }
  window.TCF.passages = window.TCF.passages || {};

  onPage(() => {
    document.querySelectorAll(".tcf-wpm[data-passage]").forEach(mountWpm);
  });

  function mountWpm(host) {
    if (host.dataset.mounted) return;
    const key = host.dataset.passage;
    const p = window.TCF.passages[key];
    if (!p) { host.innerHTML = '<p style="opacity:0.7">Passage introuvable.</p>'; return; }
    host.dataset.mounted = "1";

    const words = p.words || (p.text.trim().match(/\S+/g) || []).length;
    let start = null, end = null;

    host.innerHTML =
      '<div class="wpm-head"><strong>Test de vitesse de lecture</strong>' +
        ' · <span>' + words + ' mots</span>' +
        (p.source ? ' · <span class="wpm-src">source : ' + escapeHtml(p.source) + '</span>' : '') +
      '</div>' +
      '<div class="wpm-passage" hidden>' + p.text.split(/\n+/).map((para) => '<p>' + escapeHtml(para) + '</p>').join("") + '</div>' +
      '<div class="wpm-actions">' +
        '<button class="tcf-btn primary" data-act="start">▶ Démarrer la lecture</button>' +
        '<button class="tcf-btn" data-act="stop" hidden>⏹ J\'ai fini</button>' +
        '<button class="tcf-btn" data-act="again" hidden>↻ Nouveau test</button>' +
      '</div>' +
      '<div class="wpm-result" hidden></div>';

    const passage = host.querySelector(".wpm-passage");
    const startBtn = host.querySelector('[data-act=start]');
    const stopBtn  = host.querySelector('[data-act=stop]');
    const againBtn = host.querySelector('[data-act=again]');
    const result   = host.querySelector(".wpm-result");

    startBtn.addEventListener("click", () => {
      start = performance.now();
      passage.hidden = false;
      startBtn.hidden = true;
      stopBtn.hidden = false;
      result.hidden = true;
    });
    stopBtn.addEventListener("click", () => {
      end = performance.now();
      const sec = (end - start) / 1000;
      const wpm = Math.round(words / (sec / 60));
      const band = wpm >= 220 ? { kind: "ok", msg: "Excellent — vitesse confortable B2/C1." } :
                   wpm >= 170 ? { kind: "ok", msg: "Solide — adéquat pour 39 items / 60 min." } :
                   wpm >= 120 ? { kind: "warn", msg: "Acceptable — entraînez-vous à 200 wpm pour finir avec relecture." } :
                                { kind: "bad", msg: "À renforcer — visez 170 wpm minimum, sinon survol forcé en CE." };
      result.hidden = false;
      result.className = "wpm-result " + band.kind;
      result.innerHTML = '<strong>' + wpm + ' mots / minute</strong> · ' + sec.toFixed(1) + ' s · ' + escapeHtml(band.msg);
      stopBtn.hidden = true;
      againBtn.hidden = false;
      // v1.4: write to wpm history for the sparkline widget
      try {
        const hist = ls.get("wpm:hist", []) || [];
        hist.push({ ts: Date.now(), passage: key, sec, wpm });
        ls.set("wpm:hist", hist.slice(-60));
      } catch(_){}
    });
    againBtn.addEventListener("click", () => {
      passage.hidden = true;
      startBtn.hidden = false;
      againBtn.hidden = true;
      result.hidden = true;
    });
  }

  // -----------------------------------------------------------------
  // 22. Bookmarks / favorites
  // -----------------------------------------------------------------
  // Markup: <div class="tcf-favorites"></div>
  // Plus a star toggle injected next to page H1 on every page (when sidebar
  // shows TOC). Click to add/remove the current page from favorites.
  const FAV_KEY = "favs";

  onPage(() => {
    // Mount manager: star button
    const h1 = document.querySelector(".md-content h1");
    if (h1 && !h1.querySelector(".tcf-fav-toggle")) {
      const btn = document.createElement("button");
      btn.className = "tcf-fav-toggle";
      btn.type = "button";
      btn.setAttribute("aria-label", "Ajouter aux favoris");
      btn.title = "Ajouter cette page aux favoris (f)";
      btn.innerHTML = "☆";
      refreshFav(btn);
      btn.addEventListener("click", () => { toggleFav(); refreshFav(btn); });
      h1.appendChild(btn);
    }
    // Mount list widget
    document.querySelectorAll(".tcf-favorites").forEach(mountFavorites);
  });

  function favKey() { return location.pathname; }
  function favLabel() {
    const h1 = document.querySelector(".md-content h1");
    return (h1 ? h1.textContent.replace("☆", "").replace("★", "").trim() : document.title) || location.pathname;
  }
  function getFavs() { return ls.get(FAV_KEY, []); }
  function setFavs(arr) { ls.set(FAV_KEY, arr); }
  function isFav() { return getFavs().some((f) => f.path === favKey()); }
  function toggleFav() {
    const favs = getFavs();
    const k = favKey();
    const i = favs.findIndex((f) => f.path === k);
    if (i >= 0) { favs.splice(i, 1); toast("Retiré des favoris", "ok"); }
    else {
      favs.unshift({ path: k, title: favLabel(), addedAt: ymd(new Date()) });
      if (favs.length > 60) favs.pop();
      toast("Ajouté aux favoris", "ok");
    }
    setFavs(favs);
    // Refresh all favorites widgets visible
    document.querySelectorAll(".tcf-favorites").forEach((host) => { delete host.dataset.mounted; mountFavorites(host); });
  }
  function refreshFav(btn) {
    if (!btn) return;
    const on = isFav();
    btn.innerHTML = on ? "★" : "☆";
    btn.classList.toggle("is-on", on);
    btn.setAttribute("aria-label", on ? "Retirer des favoris" : "Ajouter aux favoris");
  }

  function mountFavorites(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const favs = getFavs();
    if (!favs.length) {
      host.innerHTML = '<p style="opacity:0.7">Aucun favori pour l\'instant — cliquez sur l\'étoile à côté du titre d\'une page pour l\'ajouter, ou appuyez sur la touche <kbd>f</kbd>.</p>';
      return;
    }
    host.innerHTML =
      '<ul class="fav-list">' +
      favs.map((f, i) =>
        '<li><a href="' + escapeHtml(f.path) + '">' + escapeHtml(f.title) + '</a>' +
          '<span class="fav-date">' + escapeHtml(f.addedAt || "") + '</span>' +
          '<button class="fav-del" data-i="' + i + '" title="Retirer">×</button></li>'
      ).join("") +
      '</ul>' +
      '<button class="tcf-btn" data-act="clear">↺ Vider la liste</button>';
    host.querySelectorAll(".fav-del").forEach((b) => b.addEventListener("click", () => {
      const i = parseInt(b.dataset.i, 10);
      const f2 = getFavs(); f2.splice(i, 1); setFavs(f2);
      delete host.dataset.mounted; mountFavorites(host);
      // Also refresh the H1 star
      const t = document.querySelector(".tcf-fav-toggle"); refreshFav(t);
    }));
    host.querySelector('[data-act=clear]').addEventListener("click", () => {
      if (!confirm("Vider la liste des favoris ?")) return;
      setFavs([]); delete host.dataset.mounted; mountFavorites(host);
      const t = document.querySelector(".tcf-fav-toggle"); refreshFav(t);
    });
  }

  // Keyboard shortcut: "f" toggles favorite for the current page
  document.addEventListener("keydown", (e) => {
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select" || e.target.isContentEditable) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === "f") {
      e.preventDefault(); toggleFav();
      refreshFav(document.querySelector(".tcf-fav-toggle"));
    }
  });

  // -----------------------------------------------------------------
  // 23. Command palette  (Ctrl/Cmd + K)
  // -----------------------------------------------------------------
  // A fast all-keyboard launcher: nav, theme, calc widgets, search.
  const PALETTE_ITEMS = [
    { id: "home",    title: "Accueil",                         hint: "g h",  href: "/" },
    { id: "diag",    title: "Diagnostic (90 min)",             hint: "g d",  href: "00_diagnostic/00_index/" },
    { id: "tools",   title: "Outils interactifs",              hint: "g t",  href: "11_tools/" },
    { id: "calc",    title: "Calculateur NCLC",                hint: "",     href: "11_tools/calculateur-nclc/" },
    { id: "timer",   title: "Minuteur Pomodoro / TCF",         hint: "",     href: "11_tools/minuteur/" },
    { id: "quiz",    title: "Quiz rapide",                     hint: "",     href: "11_tools/quiz-rapide/" },
    { id: "flash",   title: "Flashcards SRS",                  hint: "",     href: "11_tools/flashcards/" },
    { id: "conj",    title: "Drill conjugaison",               hint: "",     href: "11_tools/conjugaison/" },
    { id: "dict",    title: "Dictée audio",                    hint: "",     href: "11_tools/dictee/" },
    { id: "wpm",     title: "Test de vitesse de lecture",      hint: "",     href: "11_tools/wpm/" },
    { id: "track",   title: "Suivi des examens blancs",        hint: "",     href: "11_tools/suivi/" },
    { id: "streak",  title: "Série d'étude (streak)",          hint: "",     href: "11_tools/streak/" },
    { id: "wc",      title: "Compteur de mots (EE)",           hint: "",     href: "11_tools/compteur-mots/" },
    { id: "favs",    title: "Mes favoris",                     hint: "",     href: "11_tools/favoris/" },
    { id: "faq",     title: "FAQ",                             hint: "",     href: "11_tools/faq/" },
    { id: "gloss",   title: "Glossaire CEFR / NCLC",           hint: "",     href: "11_tools/glossaire/" },
    { id: "chk",     title: "Check-list J-1",                  hint: "",     href: "11_tools/checklist-j1/" },
    { id: "cheat",   title: "Cheatsheets A4",                  hint: "",     href: "08_cheatsheets/" },
    { id: "mocks",   title: "Examens blancs (Mocks)",          hint: "",     href: "07_mock_exams/" },
    { id: "lis",     title: "Bank Compréhension orale",        hint: "",     href: "03_listening/" },
    { id: "rea",     title: "Bank Compréhension écrite",       hint: "",     href: "04_reading/index/" },
    { id: "wri",     title: "Playbook Expression écrite",      hint: "",     href: "05_writing/index/" },
    { id: "spk",     title: "Playbook Expression orale",       hint: "",     href: "06_speaking/index/" },
    { id: "kbd",     title: "Raccourcis clavier (Aide)",       hint: "?",    href: "11_tools/raccourcis/" },
    { id: "theme",   title: "Basculer thème clair / sombre",   hint: "t",    act: () => { const lbl = document.querySelector('label[for^="__palette"]'); if (lbl) lbl.click(); } },
    { id: "print",   title: "Imprimer cette page",             hint: "p",    act: () => window.print() },
    { id: "copy",    title: "Copier le lien permanent",        hint: "c",    act: copyLink },
    { id: "fav",     title: "Basculer le favori (page actuelle)", hint: "f", act: () => { toggleFav(); refreshFav(document.querySelector(".tcf-fav-toggle")); } },
  ];

  let palette = null;
  function ensurePalette() {
    if (palette && document.body.contains(palette)) return;
    palette = document.createElement("div");
    palette.className = "tcf-palette";
    palette.setAttribute("role", "dialog");
    palette.setAttribute("aria-label", "Palette de commandes");
    palette.setAttribute("aria-modal", "true");
    palette.innerHTML =
      '<div class="pal-panel" role="document">' +
        '<input class="pal-input" type="text" placeholder="Tapez une commande, une page, ou un terme…" aria-label="Filtrer les commandes" />' +
        '<ul class="pal-list" role="listbox"></ul>' +
        '<div class="pal-foot"><kbd>↑</kbd><kbd>↓</kbd> naviguer · <kbd>Enter</kbd> ouvrir · <kbd>Esc</kbd> fermer</div>' +
      '</div>';
    document.body.appendChild(palette);
    palette.addEventListener("click", (e) => { if (e.target === palette) closePalette(); });

    const input = palette.querySelector(".pal-input");
    const list  = palette.querySelector(".pal-list");

    function siteRoot() { return computeSiteRoot(); }
    function navigate(item) {
      closePalette();
      if (item.act) { try { item.act(); } catch (e) {} return; }
      if (item.href) {
        const dest = item.href;
        if (dest.startsWith("/")) location.href = siteRoot() + dest.slice(1);
        else location.href = siteRoot() + dest;
      }
    }
    let filtered = PALETTE_ITEMS.slice();
    let highlighted = 0;

    function rerender() {
      list.innerHTML = filtered.map((it, i) =>
        '<li role="option" tabindex="0" data-i="' + i + '" class="' + (i === highlighted ? "is-on" : "") + '">' +
          '<span class="pal-title">' + escapeHtml(it.title) + '</span>' +
          (it.hint ? '<span class="pal-hint"><kbd>' + escapeHtml(it.hint) + '</kbd></span>' : '') +
        '</li>'
      ).join("") || '<li class="pal-empty">Aucun résultat.</li>';
      list.querySelectorAll("li").forEach((li, i) => {
        if (li.classList.contains("pal-empty")) return;
        li.addEventListener("click", () => navigate(filtered[i]));
      });
    }
    function refilter() {
      const q = stripAccents(input.value);
      filtered = q
        ? PALETTE_ITEMS.filter((it) => stripAccents(it.title).includes(q))
        : PALETTE_ITEMS.slice();
      highlighted = 0;
      rerender();
    }
    input.addEventListener("input", refilter);
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); if (filtered.length) { highlighted = (highlighted + 1) % filtered.length; rerender(); } }
      else if (e.key === "ArrowUp") { e.preventDefault(); if (filtered.length) { highlighted = (highlighted - 1 + filtered.length) % filtered.length; rerender(); } }
      else if (e.key === "Enter") { e.preventDefault(); if (filtered[highlighted]) navigate(filtered[highlighted]); }
      else if (e.key === "Escape") { e.preventDefault(); closePalette(); }
    });
    rerender();
  }
  function openPalette() {
    ensurePalette();
    palette.classList.add("is-open");
    setTimeout(() => palette.querySelector(".pal-input")?.focus(), 30);
  }
  function closePalette() {
    if (palette) {
      palette.classList.remove("is-open");
      const i = palette.querySelector(".pal-input"); if (i) i.value = "";
      // re-filter to reset
      i?.dispatchEvent(new Event("input"));
    }
  }
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
      e.preventDefault(); openPalette();
    }
  });

  // -----------------------------------------------------------------
  // 24. Confetti (used by quiz on perfect score, etc.)
  // -----------------------------------------------------------------
  window.TCF.confetti = function (durationMs) {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const colors = ["#ff8f00", "#1a237e", "#3949ab", "#2e7d32", "#c62828", "#ffd54f"];
    const N = 80;
    const dur = durationMs || 1800;
    const root = document.createElement("div");
    root.className = "tcf-confetti";
    document.body.appendChild(root);
    for (let i = 0; i < N; i++) {
      const e = document.createElement("i");
      e.style.background = colors[i % colors.length];
      e.style.left = Math.random() * 100 + "vw";
      e.style.animationDuration = (1 + Math.random() * 1.2) + "s";
      e.style.animationDelay = (Math.random() * 0.4) + "s";
      e.style.transform = "rotate(" + Math.floor(Math.random() * 360) + "deg)";
      root.appendChild(e);
    }
    setTimeout(() => root.remove(), dur);
  };

  // -----------------------------------------------------------------
  // 14. Skip-to-content link
  // -----------------------------------------------------------------
  onPage(() => {
    if (document.querySelector(".tcf-skip")) return;
    const a = document.createElement("a");
    a.className = "tcf-skip";
    a.href = "#";
    a.textContent = "Aller au contenu";
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const main = document.querySelector(".md-content") || document.querySelector("main");
      if (main) {
        main.setAttribute("tabindex", "-1");
        main.focus();
        main.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    document.body.insertBefore(a, document.body.firstChild);
  });

  // -----------------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------------
  // Fisher–Yates in place, also returns the array for chaining
  function shuffle(a) {
    if (!Array.isArray(a)) return a;
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Expose helpers for advanced page-level scripts
  window.TCF.ls = ls;
  window.TCF.nclcFromRaw = nclcFromRaw;
  window.TCF.nclcTables = { CO_CE: NCLC_CO_CE, EE_EO: NCLC_EE_EO };
  window.TCF.toast = toast;
  window.TCF.stripAccents = stripAccents;
  window.TCF.escapeHtml = escapeHtml;
  window.TCF.shuffle = shuffle;

  // =================================================================
  // v1.2 — World-class learning widgets (added 2026-05-29)
  // =================================================================
  // 25. Cloze deletion drill        .tcf-cloze[data-set]
  // 26. Gender drill                 .tcf-gender[data-set]
  // 27. Minimal-pairs trainer        .tcf-pairs[data-set]
  // 28. Numbers trainer (TTS)        .tcf-numbers
  // 29. Connector picker             .tcf-connectors[data-set]
  // 30. Speed race                   .tcf-race[data-set]
  // 31. Daily study planner          .tcf-plan
  // 32. Error log + spaced review    .tcf-errlog
  // 33. Combined dashboard           .tcf-dashboard
  // 34. EE auto-feedback             .tcf-ee-feedback
  // 35. Word frequency / CEFR lookup .tcf-freq
  // 36. Verb conjugation table       .tcf-verbtable
  // 37. Animated NCLC gauge          .tcf-gauge[data-value]
  // 38. Sparkline (suivi page)       used by suivi widget internals
  // -----------------------------------------------------------------

  // ---------- 25. Cloze deletion drill -----------------------------
  // Markup: <div class="tcf-cloze" data-set="b2_pivots"></div>
  // Data lives in window.TCF.cloze[setKey] = [{ text, answer, alt?, hint?, why? }, ...]
  // `text` contains a single "____" placeholder marking the gap.
  window.TCF.cloze = window.TCF.cloze || {};

  onPage(() => {
    document.querySelectorAll(".tcf-cloze[data-set]").forEach(mountCloze);
  });

  function mountCloze(host) {
    if (host.dataset.mounted) return;
    const key = host.dataset.set;
    const data = window.TCF.cloze[key];
    if (!data || !Array.isArray(data) || !data.length) {
      host.innerHTML = '<p style="opacity:.7">Lot « ' + escapeHtml(key) + ' » introuvable.</p>';
      return;
    }
    host.dataset.mounted = "1";

    const SK = "cloze:" + key;
    const state = ls.get(SK, { correct: 0, wrong: 0, runs: 0, missed: [] });
    let order = shuffle(data.map((_, i) => i));
    let i = 0;
    let revealed = false;

    function render() {
      if (i >= order.length) return finish();
      const item = data[order[i]];
      const total = order.length;
      const parts = item.text.split("____");
      host.innerHTML =
        '<div class="cz-meta"><span>Item ' + (i + 1) + ' / ' + total + '</span>' +
        '<span class="cz-score">✓ ' + state.correct + ' · ✗ ' + state.wrong + '</span></div>' +
        '<div class="cz-bar"><div style="width:' + Math.round((i / total) * 100) + '%"></div></div>' +
        '<div class="cz-sentence">' +
          escapeHtml(parts[0]) +
          '<input class="cz-input" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Mot à compléter" />' +
          escapeHtml(parts[1] || "") +
        '</div>' +
        (item.hint ? '<details class="cz-hint"><summary>Indice</summary>' + escapeHtml(item.hint) + '</details>' : '') +
        '<div class="cz-feedback" hidden></div>' +
        '<div class="cz-controls">' +
          '<button class="tcf-btn primary cz-check">Vérifier <kbd>↵</kbd></button>' +
          '<button class="tcf-btn cz-reveal">Voir la réponse</button>' +
          '<button class="tcf-btn cz-skip">Passer →</button>' +
        '</div>';
      const input = host.querySelector(".cz-input");
      input.focus();
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); doCheck(); }
      });
      host.querySelector(".cz-check").addEventListener("click", doCheck);
      host.querySelector(".cz-reveal").addEventListener("click", doReveal);
      host.querySelector(".cz-skip").addEventListener("click", () => { i++; revealed = false; render(); });
    }

    function doCheck() {
      if (revealed) return;
      const item = data[order[i]];
      const v = stripAccents(host.querySelector(".cz-input").value).trim();
      const accepted = [item.answer].concat(item.alt || []);
      const ok = accepted.some((a) => stripAccents(a).trim() === v) && v.length > 0;
      const fb = host.querySelector(".cz-feedback");
      fb.hidden = false;
      if (ok) {
        state.correct++;
        fb.className = "cz-feedback ok";
        fb.innerHTML = "✓ Bonne réponse !" + (item.why ? " <em>" + escapeHtml(item.why) + "</em>" : "");
        ls.set(SK, state);
        setTimeout(() => { i++; revealed = false; render(); }, 900);
      } else {
        state.wrong++;
        if (!state.missed.includes(order[i])) state.missed.push(order[i]);
        fb.className = "cz-feedback bad";
        fb.innerHTML = "✗ Attendu : <strong>" + escapeHtml(item.answer) + "</strong>" +
          (item.why ? " <em>" + escapeHtml(item.why) + "</em>" : "");
        ls.set(SK, state);
      }
    }

    function doReveal() {
      revealed = true;
      const item = data[order[i]];
      const fb = host.querySelector(".cz-feedback");
      fb.hidden = false;
      fb.className = "cz-feedback warn";
      fb.innerHTML = "→ Réponse : <strong>" + escapeHtml(item.answer) + "</strong>" +
        (item.why ? " <em>" + escapeHtml(item.why) + "</em>" : "");
    }

    function finish() {
      const total = state.correct + state.wrong;
      const pct = total ? Math.round((state.correct / total) * 100) : 0;
      state.runs++;
      ls.set(SK, state);
      host.innerHTML =
        '<div class="cz-summary">' +
          '<h3>Lot terminé</h3>' +
          '<p>Score : <strong>' + state.correct + ' / ' + total + '</strong> (' + pct + ' %).</p>' +
          (state.missed.length ? '<p>Items ratés ce lot : <strong>' + state.missed.length + '</strong>. Rejouez en mode « ratés seulement » pour les fixer.</p>' : '') +
          '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.8rem">' +
            '<button class="tcf-btn primary" data-act="again">Nouvelle session</button>' +
            (state.missed.length ? '<button class="tcf-btn" data-act="missed">Reprendre les ratés</button>' : '') +
            '<button class="tcf-btn" data-act="reset">↺ Réinitialiser</button>' +
          '</div>' +
        '</div>';
      host.querySelector('[data-act=again]').addEventListener("click", () => {
        order = shuffle(data.map((_, k) => k)); i = 0; render();
      });
      const mb = host.querySelector('[data-act=missed]');
      if (mb) mb.addEventListener("click", () => {
        order = shuffle(state.missed.slice()); state.missed = []; ls.set(SK, state); i = 0; render();
      });
      host.querySelector('[data-act=reset]').addEventListener("click", () => {
        Object.assign(state, { correct: 0, wrong: 0, runs: 0, missed: [] });
        ls.set(SK, state);
        order = shuffle(data.map((_, k) => k)); i = 0; render();
      });
    }
    render();
  }

  // ---------- 26. Gender drill -------------------------------------
  // Markup: <div class="tcf-gender" data-set="core"></div>
  // Data: window.TCF.gender[setKey] = [{ noun, g: "m"|"f", hint? }, ...]
  window.TCF.gender = window.TCF.gender || {};

  onPage(() => {
    document.querySelectorAll(".tcf-gender[data-set]").forEach(mountGender);
  });

  function mountGender(host) {
    if (host.dataset.mounted) return;
    const key = host.dataset.set;
    const data = window.TCF.gender[key];
    if (!data || !data.length) { host.innerHTML = '<p style="opacity:.7">Lot introuvable.</p>'; return; }
    host.dataset.mounted = "1";

    const SK = "gen:" + key;
    const state = ls.get(SK, { correct: 0, wrong: 0, streak: 0, best: 0, missed: {} });
    let order = shuffle(data.map((_, i) => i));
    let i = 0;

    function render() {
      if (i >= order.length) return finish();
      const item = data[order[i]];
      const total = order.length;
      host.innerHTML =
        '<div class="gn-meta"><span>' + (i + 1) + ' / ' + total + '</span>' +
        '<span class="gn-score">✓ ' + state.correct + ' · ✗ ' + state.wrong + ' · 🔥 ' + state.streak + '</span></div>' +
        '<div class="gn-bar"><div style="width:' + Math.round((i / total) * 100) + '%"></div></div>' +
        '<div class="gn-word"><span class="gn-blank">le / la</span> <span class="gn-noun">' + escapeHtml(item.noun) + '</span></div>' +
        '<div class="gn-choices">' +
          '<button class="tcf-btn gn-choice masc" data-g="m"><span>le</span><small>masculin</small></button>' +
          '<button class="tcf-btn gn-choice fem" data-g="f"><span>la</span><small>féminin</small></button>' +
        '</div>' +
        '<div class="gn-feedback" hidden></div>';
      host.querySelectorAll(".gn-choice").forEach((b) => {
        b.addEventListener("click", () => answer(b.dataset.g));
      });
    }
    function answer(g) {
      const item = data[order[i]];
      const fb = host.querySelector(".gn-feedback");
      fb.hidden = false;
      const ok = g === item.g;
      host.querySelectorAll(".gn-choice").forEach((b) => {
        if (b.dataset.g === item.g) b.classList.add("is-correct");
        else if (b.dataset.g === g) b.classList.add("is-wrong");
        b.disabled = true;
      });
      if (ok) {
        state.correct++; state.streak++;
        if (state.streak > state.best) state.best = state.streak;
        fb.className = "gn-feedback ok";
        fb.innerHTML = "✓ <strong>" + (item.g === "m" ? "le" : "la") + " " + escapeHtml(item.noun) + "</strong>" + (item.hint ? " <em>" + escapeHtml(item.hint) + "</em>" : "");
      } else {
        state.wrong++; state.streak = 0;
        state.missed[order[i]] = (state.missed[order[i]] || 0) + 1;
        fb.className = "gn-feedback bad";
        fb.innerHTML = "✗ <strong>" + (item.g === "m" ? "le" : "la") + " " + escapeHtml(item.noun) + "</strong>" + (item.hint ? " <em>" + escapeHtml(item.hint) + "</em>" : "");
      }
      ls.set(SK, state);
      setTimeout(() => { i++; render(); }, ok ? 700 : 1400);
    }
    function finish() {
      const total = state.correct + state.wrong;
      const pct = total ? Math.round((state.correct / total) * 100) : 0;
      host.innerHTML =
        '<div class="gn-summary">' +
          '<h3>Lot terminé</h3>' +
          '<p>Score : <strong>' + state.correct + ' / ' + total + '</strong> (' + pct + ' %)<br/>' +
          'Meilleur enchaînement : <strong>' + state.best + '</strong></p>' +
          '<div style="display:flex;gap:.5rem;flex-wrap:wrap">' +
            '<button class="tcf-btn primary" data-act="again">Nouvelle session</button>' +
            (Object.keys(state.missed).length ? '<button class="tcf-btn" data-act="missed">Reprendre les ratés</button>' : '') +
            '<button class="tcf-btn" data-act="reset">↺ Réinitialiser</button>' +
          '</div>' +
        '</div>';
      host.querySelector('[data-act=again]').addEventListener("click", () => {
        order = shuffle(data.map((_, k) => k)); i = 0; render();
      });
      const mb = host.querySelector('[data-act=missed]');
      if (mb) mb.addEventListener("click", () => {
        const keys = Object.keys(state.missed).map(Number);
        order = shuffle(keys); state.missed = {}; ls.set(SK, state); i = 0; render();
      });
      host.querySelector('[data-act=reset]').addEventListener("click", () => {
        Object.assign(state, { correct: 0, wrong: 0, streak: 0, best: 0, missed: {} });
        ls.set(SK, state);
        order = shuffle(data.map((_, k) => k)); i = 0; render();
      });
    }
    render();
  }

  // ---------- 27. Minimal-pairs trainer ----------------------------
  // Markup: <div class="tcf-pairs" data-set="nasals"></div>
  // Data: window.TCF.pairs[setKey] = { label, a, b, items: [["mot1","mot2"], ...] }
  //   "a" is the phoneme label for the first item in each pair, "b" for the second.
  window.TCF.pairs = window.TCF.pairs || {};

  onPage(() => {
    document.querySelectorAll(".tcf-pairs[data-set]").forEach(mountPairs);
  });

  function mountPairs(host) {
    if (host.dataset.mounted) return;
    const key = host.dataset.set;
    const set = window.TCF.pairs[key];
    if (!set || !set.items || !set.items.length) {
      host.innerHTML = '<p style="opacity:.7">Lot phonologique introuvable.</p>'; return;
    }
    host.dataset.mounted = "1";
    if (!("speechSynthesis" in window)) {
      host.innerHTML = '<p>La synthèse vocale n\'est pas disponible dans ce navigateur. Essayez Chrome, Edge ou Safari.</p>';
      return;
    }
    const SK = "pairs:" + key;
    const state = ls.get(SK, { correct: 0, wrong: 0, byPhoneme: {} });
    let order = shuffle(set.items.map((_, i) => i));
    let i = 0;
    let currentSide = 0; // 0 or 1 — which member of the pair was spoken

    function speak(text, rate) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "fr-FR";
      u.rate = rate || 0.85;
      const voices = speechSynthesis.getVoices();
      const v = voices.find((x) => /fr[-_]?(FR|CA)/i.test(x.lang)) || voices.find((x) => /^fr/i.test(x.lang));
      if (v) u.voice = v;
      try { speechSynthesis.cancel(); } catch (e) {}
      speechSynthesis.speak(u);
    }

    function render() {
      if (i >= order.length) return finish();
      const pair = set.items[order[i]];
      currentSide = Math.random() < 0.5 ? 0 : 1;
      const total = order.length;
      host.innerHTML =
        '<div class="mp-meta"><span>' + (i + 1) + ' / ' + total + '</span>' +
          '<span>Contraste <strong>' + escapeHtml(set.label) + '</strong></span>' +
          '<span class="mp-score">✓ ' + state.correct + ' · ✗ ' + state.wrong + '</span></div>' +
        '<div class="mp-bar"><div style="width:' + Math.round((i / total) * 100) + '%"></div></div>' +
        '<p class="mp-instr">Écoutez puis identifiez le mot prononcé.</p>' +
        '<div class="mp-controls">' +
          '<button class="tcf-btn primary mp-play">▶ Réécouter</button>' +
          '<button class="tcf-btn mp-slow">🐢 Plus lent</button>' +
        '</div>' +
        '<div class="mp-choices">' +
          '<button class="tcf-btn mp-choice" data-s="0"><span>' + escapeHtml(pair[0]) + '</span><small>' + escapeHtml(set.a) + '</small></button>' +
          '<button class="tcf-btn mp-choice" data-s="1"><span>' + escapeHtml(pair[1]) + '</span><small>' + escapeHtml(set.b) + '</small></button>' +
        '</div>' +
        '<div class="mp-feedback" hidden></div>';
      const word = pair[currentSide];
      setTimeout(() => speak(word, 0.85), 200);
      host.querySelector(".mp-play").addEventListener("click", () => speak(word, 0.85));
      host.querySelector(".mp-slow").addEventListener("click", () => speak(word, 0.6));
      host.querySelectorAll(".mp-choice").forEach((b) => {
        b.addEventListener("click", () => answer(parseInt(b.dataset.s, 10), pair));
      });
    }
    function answer(side, pair) {
      const fb = host.querySelector(".mp-feedback");
      const ok = side === currentSide;
      const trueLabel = currentSide === 0 ? set.a : set.b;
      host.querySelectorAll(".mp-choice").forEach((b) => {
        if (parseInt(b.dataset.s, 10) === currentSide) b.classList.add("is-correct");
        else if (parseInt(b.dataset.s, 10) === side) b.classList.add("is-wrong");
        b.disabled = true;
      });
      fb.hidden = false;
      if (ok) {
        state.correct++;
        fb.className = "mp-feedback ok";
        fb.innerHTML = "✓ <strong>" + escapeHtml(pair[currentSide]) + "</strong> (" + escapeHtml(trueLabel) + ")";
      } else {
        state.wrong++;
        state.byPhoneme[trueLabel] = (state.byPhoneme[trueLabel] || 0) + 1;
        fb.className = "mp-feedback bad";
        fb.innerHTML = "✗ C’était <strong>" + escapeHtml(pair[currentSide]) + "</strong> (" + escapeHtml(trueLabel) + ")";
      }
      ls.set(SK, state);
      setTimeout(() => { i++; render(); }, ok ? 900 : 1500);
    }
    function finish() {
      const total = state.correct + state.wrong;
      const pct = total ? Math.round((state.correct / total) * 100) : 0;
      host.innerHTML =
        '<div class="mp-summary">' +
          '<h3>Session terminée</h3>' +
          '<p>Score : <strong>' + state.correct + ' / ' + total + '</strong> (' + pct + ' %)</p>' +
          (Object.keys(state.byPhoneme).length ? '<p>Phonèmes les plus ratés : ' +
            Object.entries(state.byPhoneme).sort((a,b)=>b[1]-a[1]).slice(0,3)
              .map(([k,v]) => '<code>' + escapeHtml(k) + '</code> (' + v + ')').join(", ") + '</p>' : '') +
          '<div style="display:flex;gap:.5rem;flex-wrap:wrap">' +
            '<button class="tcf-btn primary" data-act="again">Rejouer</button>' +
            '<button class="tcf-btn" data-act="reset">↺ Réinitialiser</button>' +
          '</div>' +
        '</div>';
      host.querySelector('[data-act=again]').addEventListener("click", () => {
        order = shuffle(set.items.map((_, k) => k)); i = 0; render();
      });
      host.querySelector('[data-act=reset]').addEventListener("click", () => {
        Object.assign(state, { correct: 0, wrong: 0, byPhoneme: {} });
        ls.set(SK, state);
        order = shuffle(set.items.map((_, k) => k)); i = 0; render();
      });
    }
    // Pre-warm voices
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.addEventListener("voiceschanged", () => {}, { once: true });
    }
    render();
  }

  // ---------- 28. Numbers trainer ----------------------------------
  // Markup: <div class="tcf-numbers"></div>
  // No data needed — generated on the fly from a range.
  onPage(() => {
    document.querySelectorAll(".tcf-numbers").forEach(mountNumbers);
  });

  function mountNumbers(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    if (!("speechSynthesis" in window)) {
      host.innerHTML = '<p>La synthèse vocale n\'est pas disponible.</p>'; return;
    }
    const SK = "num:trainer";
    const state = ls.get(SK, { correct: 0, wrong: 0, streak: 0, best: 0 });
    const RANGES = [
      { id: "easy",  label: "1–100 (facile)",            lo: 1,    hi: 100 },
      { id: "mid",   label: "60–99 (les pièges)",        lo: 60,   hi: 99 },
      { id: "year",  label: "1900–2025 (années)",        lo: 1900, hi: 2025 },
      { id: "hard",  label: "1000–9999 (gros chiffres)", lo: 1000, hi: 9999 },
    ];
    let rangeIdx = ls.get("num:range", 0);
    let current = null;

    function newNumber() {
      const r = RANGES[rangeIdx];
      current = Math.floor(Math.random() * (r.hi - r.lo + 1)) + r.lo;
    }
    function speak(n) {
      const u = new SpeechSynthesisUtterance(String(n));
      u.lang = "fr-FR"; u.rate = 0.85;
      const voices = speechSynthesis.getVoices();
      const v = voices.find((x) => /fr[-_]?(FR|CA)/i.test(x.lang));
      if (v) u.voice = v;
      try { speechSynthesis.cancel(); } catch (e) {}
      speechSynthesis.speak(u);
    }

    function render() {
      host.innerHTML =
        '<div class="nm-head">' +
          '<label class="nm-range">Plage : <select>' +
            RANGES.map((r, i) => '<option value="' + i + '"' + (i === rangeIdx ? ' selected' : '') + '>' + escapeHtml(r.label) + '</option>').join("") +
          '</select></label>' +
          '<span class="nm-score">✓ ' + state.correct + ' · ✗ ' + state.wrong + ' · 🔥 ' + state.streak + ' (record ' + state.best + ')</span>' +
        '</div>' +
        '<div class="nm-card">' +
          '<button class="tcf-btn primary nm-play">▶ Écouter le nombre</button>' +
          '<button class="tcf-btn nm-slow">🐢 Plus lent</button>' +
          '<button class="tcf-btn nm-next">Suivant →</button>' +
        '</div>' +
        '<div class="nm-input-row">' +
          '<input class="nm-input" type="text" inputmode="numeric" placeholder="Tapez le nombre que vous avez entendu" aria-label="Nombre entendu" />' +
          '<button class="tcf-btn primary nm-check">Vérifier</button>' +
        '</div>' +
        '<div class="nm-feedback" hidden></div>';
      host.querySelector("select").addEventListener("change", (e) => {
        rangeIdx = parseInt(e.target.value, 10);
        ls.set("num:range", rangeIdx);
        newNumber(); speak(current); resetFb();
      });
      host.querySelector(".nm-play").addEventListener("click", () => speak(current));
      host.querySelector(".nm-slow").addEventListener("click", () => {
        const u = new SpeechSynthesisUtterance(String(current));
        u.lang = "fr-FR"; u.rate = 0.55;
        const voices = speechSynthesis.getVoices();
        const v = voices.find((x) => /fr[-_]?(FR|CA)/i.test(x.lang));
        if (v) u.voice = v;
        try { speechSynthesis.cancel(); } catch (e) {}
        speechSynthesis.speak(u);
      });
      host.querySelector(".nm-next").addEventListener("click", () => { newNumber(); speak(current); resetFb(); host.querySelector(".nm-input").value = ""; host.querySelector(".nm-input").focus(); });
      host.querySelector(".nm-check").addEventListener("click", check);
      host.querySelector(".nm-input").addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
      host.querySelector(".nm-input").focus();
    }
    function resetFb() { const fb = host.querySelector(".nm-feedback"); if (fb) fb.hidden = true; }
    function check() {
      const v = parseInt(host.querySelector(".nm-input").value.replace(/\s/g, ""), 10);
      const fb = host.querySelector(".nm-feedback");
      fb.hidden = false;
      if (v === current) {
        state.correct++; state.streak++;
        if (state.streak > state.best) state.best = state.streak;
        fb.className = "nm-feedback ok";
        fb.textContent = "✓ Exact — c'était " + current + ".";
        ls.set(SK, state);
        setTimeout(() => { newNumber(); speak(current); resetFb(); host.querySelector(".nm-input").value = ""; host.querySelector(".nm-score").innerHTML = "✓ " + state.correct + " · ✗ " + state.wrong + " · 🔥 " + state.streak + " (record " + state.best + ")"; host.querySelector(".nm-input").focus(); }, 800);
      } else {
        state.wrong++; state.streak = 0;
        fb.className = "nm-feedback bad";
        fb.textContent = "✗ C'était " + current + (isNaN(v) ? "" : " (vous avez tapé " + v + ")") + ".";
        ls.set(SK, state);
        host.querySelector(".nm-score").innerHTML = "✓ " + state.correct + " · ✗ " + state.wrong + " · 🔥 " + state.streak + " (record " + state.best + ")";
      }
    }
    newNumber();
    render();
    setTimeout(() => speak(current), 300);
  }

  // ---------- 29. Connector picker ---------------------------------
  // Markup: <div class="tcf-connectors" data-set="b2"></div>
  // Data: window.TCF.connectors[key] = [{ sentence1, sentence2, options:["...","..."], answer:0, why? }, ...]
  // "sentence1 ___ sentence2" — pick the best connector.
  window.TCF.connectors = window.TCF.connectors || {};

  onPage(() => {
    document.querySelectorAll(".tcf-connectors[data-set]").forEach(mountConnectors);
  });

  function mountConnectors(host) {
    if (host.dataset.mounted) return;
    const key = host.dataset.set;
    const data = window.TCF.connectors[key];
    if (!data || !data.length) { host.innerHTML = '<p style="opacity:.7">Lot introuvable.</p>'; return; }
    host.dataset.mounted = "1";

    const SK = "conn:" + key;
    const state = ls.get(SK, { correct: 0, wrong: 0 });
    let order = shuffle(data.map((_, i) => i));
    let i = 0;

    function render() {
      if (i >= order.length) return finish();
      const item = data[order[i]];
      const total = order.length;
      host.innerHTML =
        '<div class="cn-meta"><span>' + (i + 1) + ' / ' + total + '</span>' +
          '<span class="cn-score">✓ ' + state.correct + ' · ✗ ' + state.wrong + '</span></div>' +
        '<div class="cn-bar"><div style="width:' + Math.round((i / total) * 100) + '%"></div></div>' +
        '<div class="cn-sentence">' +
          escapeHtml(item.sentence1) +
          ' <span class="cn-blank">___</span> ' +
          escapeHtml(item.sentence2) +
        '</div>' +
        '<div class="cn-options">' +
          item.options.map((o, k) => '<button class="tcf-btn cn-option" data-k="' + k + '">' + escapeHtml(o) + '</button>').join("") +
        '</div>' +
        '<div class="cn-feedback" hidden></div>';
      host.querySelectorAll(".cn-option").forEach((b) => {
        b.addEventListener("click", () => answer(parseInt(b.dataset.k, 10)));
      });
    }
    function answer(k) {
      const item = data[order[i]];
      const fb = host.querySelector(".cn-feedback");
      host.querySelectorAll(".cn-option").forEach((b, idx) => {
        if (idx === item.answer) b.classList.add("is-correct");
        else if (idx === k) b.classList.add("is-wrong");
        b.disabled = true;
      });
      fb.hidden = false;
      const ok = k === item.answer;
      if (ok) {
        state.correct++;
        fb.className = "cn-feedback ok";
        fb.innerHTML = "✓ Bon choix." + (item.why ? " <em>" + escapeHtml(item.why) + "</em>" : "");
      } else {
        state.wrong++;
        fb.className = "cn-feedback bad";
        fb.innerHTML = "✗ Réponse attendue : <strong>" + escapeHtml(item.options[item.answer]) + "</strong>." + (item.why ? " <em>" + escapeHtml(item.why) + "</em>" : "");
      }
      ls.set(SK, state);
      setTimeout(() => { i++; render(); }, ok ? 1100 : 2200);
    }
    function finish() {
      const total = state.correct + state.wrong;
      const pct = total ? Math.round((state.correct / total) * 100) : 0;
      host.innerHTML =
        '<div class="cn-summary">' +
          '<h3>Lot terminé</h3>' +
          '<p>Score : <strong>' + state.correct + ' / ' + total + '</strong> (' + pct + ' %).</p>' +
          '<div style="display:flex;gap:.5rem;flex-wrap:wrap">' +
            '<button class="tcf-btn primary" data-act="again">Rejouer</button>' +
            '<button class="tcf-btn" data-act="reset">↺ Réinitialiser</button>' +
          '</div>' +
        '</div>';
      host.querySelector('[data-act=again]').addEventListener("click", () => {
        order = shuffle(data.map((_, k) => k)); i = 0; render();
      });
      host.querySelector('[data-act=reset]').addEventListener("click", () => {
        Object.assign(state, { correct: 0, wrong: 0 });
        ls.set(SK, state);
        order = shuffle(data.map((_, k) => k)); i = 0; render();
      });
    }
    render();
  }

  // ---------- 30. Speed race (timed quiz) --------------------------
  // Markup: <div class="tcf-race" data-set="faux_amis" data-seconds="60"></div>
  // Data: window.TCF.race[key] = [{ q, options:["a","b","c","d"], a:0, why? }, ...]
  window.TCF.race = window.TCF.race || {};

  onPage(() => {
    document.querySelectorAll(".tcf-race[data-set]").forEach(mountRace);
  });

  function mountRace(host) {
    if (host.dataset.mounted) return;
    const key = host.dataset.set;
    const data = window.TCF.race[key];
    if (!data || !data.length) { host.innerHTML = '<p style="opacity:.7">Lot introuvable.</p>'; return; }
    host.dataset.mounted = "1";
    const seconds = parseInt(host.dataset.seconds || "60", 10);
    const SK = "race:" + key;
    const stats = ls.get(SK, { best: 0, plays: 0 });

    let order = shuffle(data.map((_, i) => i));
    let i = 0;
    let correct = 0;
    let wrong = 0;
    let endTs = 0;
    let timerId = null;

    function start() {
      i = 0; correct = 0; wrong = 0;
      order = shuffle(data.map((_, k) => k));
      endTs = Date.now() + seconds * 1000;
      tick();
      timerId = setInterval(tick, 200);
      render();
    }
    function tick() {
      const rem = Math.max(0, endTs - Date.now());
      const el = host.querySelector(".rc-time");
      if (el) {
        const sec = Math.ceil(rem / 1000);
        el.textContent = sec + " s";
        el.classList.toggle("is-low", rem < 10000);
      }
      if (rem <= 0) { clearInterval(timerId); finish(); }
    }
    function render() {
      if (i >= order.length) { i = 0; order = shuffle(data.map((_, k) => k)); }
      const item = data[order[i]];
      host.innerHTML =
        '<div class="rc-head">' +
          '<span class="rc-time">' + seconds + ' s</span>' +
          '<span class="rc-score">✓ ' + correct + ' · ✗ ' + wrong + '</span>' +
          '<span class="rc-best">Record : ' + stats.best + '</span>' +
        '</div>' +
        '<div class="rc-q">' + escapeHtml(item.q) + '</div>' +
        '<div class="rc-options">' +
          item.options.map((o, k) => '<button class="tcf-btn rc-option" data-k="' + k + '">' + escapeHtml(o) + '</button>').join("") +
        '</div>';
      host.querySelectorAll(".rc-option").forEach((b) => {
        b.addEventListener("click", () => answer(parseInt(b.dataset.k, 10)));
      });
    }
    function answer(k) {
      const item = data[order[i]];
      if (k === item.a) {
        correct++;
        host.querySelector('[data-k="' + k + '"]').classList.add("is-correct");
      } else {
        wrong++;
        host.querySelector('[data-k="' + k + '"]').classList.add("is-wrong");
      }
      setTimeout(() => { i++; render(); }, 180);
    }
    function finish() {
      stats.plays++;
      const score = correct - Math.floor(wrong / 2);
      if (score > stats.best) stats.best = score;
      ls.set(SK, stats);
      host.innerHTML =
        '<div class="rc-summary">' +
          '<h3>Temps écoulé</h3>' +
          '<p>✓ <strong>' + correct + '</strong> · ✗ <strong>' + wrong + '</strong> · Score net : <strong>' + score + '</strong></p>' +
          '<p>Record : <strong>' + stats.best + '</strong> · Parties : ' + stats.plays + '</p>' +
          '<button class="tcf-btn primary" data-act="restart">Rejouer</button>' +
        '</div>';
      host.querySelector('[data-act=restart]').addEventListener("click", start);
    }
    function renderIntro() {
      host.innerHTML =
        '<div class="rc-intro">' +
          '<h3>Speed race · ' + seconds + ' s</h3>' +
          '<p>Maximum de bonnes réponses en ' + seconds + ' secondes. ✗ = −0,5 pt. Record : <strong>' + stats.best + '</strong>.</p>' +
          '<button class="tcf-btn primary rc-start">▶ Démarrer</button>' +
        '</div>';
      host.querySelector(".rc-start").addEventListener("click", start);
    }
    renderIntro();
  }

  // ---------- 31. Daily study planner ------------------------------
  // Markup: <div class="tcf-plan"></div>
  onPage(() => {
    document.querySelectorAll(".tcf-plan").forEach(mountPlan);
  });

  function mountPlan(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const SK = "plan:prefs";
    const prefs = ls.get(SK, { minutes: 60, weak: "ee" });

    function render() {
      host.innerHTML =
        '<div class="pl-head">' +
          '<label>Temps disponible<br/><input type="range" min="15" max="180" step="15" value="' + prefs.minutes + '" name="m" /><span class="pl-min">' + prefs.minutes + ' min</span></label>' +
          '<label>Compétence faible<br/><select name="w">' +
            [["co","CO"],["ce","CE"],["ee","EE"],["eo","EO"]].map(([k,l]) => '<option value="' + k + '"' + (prefs.weak === k ? ' selected' : '') + '>' + l + '</option>').join("") +
          '</select></label>' +
        '</div>' +
        '<div class="pl-plan"></div>' +
        '<p style="font-size:.8rem;opacity:.7;margin-top:.5rem">Plan généré localement à partir de votre temps et de votre compétence faible — aucune donnée n\'est envoyée.</p>';
      host.querySelector('input[name=m]').addEventListener("input", (e) => {
        prefs.minutes = parseInt(e.target.value, 10);
        host.querySelector(".pl-min").textContent = prefs.minutes + " min";
        ls.set(SK, prefs);
        renderPlan();
      });
      host.querySelector('select[name=w]').addEventListener("change", (e) => {
        prefs.weak = e.target.value;
        ls.set(SK, prefs);
        renderPlan();
      });
      renderPlan();
    }
    function renderPlan() {
      const M = prefs.minutes;
      const w = prefs.weak;
      const blocks = [];
      // Warm-up SRS — 10 % of time, min 5 min
      const warm = Math.max(5, Math.round(M * 0.12));
      blocks.push({ mins: warm, title: "Flashcards SRS", desc: "Cartes dues du jour (modes, faux-amis, connecteurs B2).", href: "11_tools/flashcards/", emoji: "🃏" });
      // Weak skill — 50 % of time
      const focus = Math.round(M * 0.5);
      const FOCUS = {
        co: { title: "Compréhension orale ciblée", desc: "1 sous-test CO partial (10 items) + sténo 3 mots + relecture des distracteurs.", href: "07_mock_exams/partials/", emoji: "🎧" },
        ce: { title: "Compréhension écrite ciblée", desc: "2 textes (B2) chronométrés à 12 min chacun + révision faux-amis.", href: "04_reading/index/", emoji: "📖" },
        ee: { title: "Expression écrite ciblée", desc: "1 prompt T2 ou T3 dans le compteur de mots, puis score & auto-feedback.", href: "11_tools/compteur-mots/", emoji: "✍️" },
        eo: { title: "Expression orale ciblée", desc: "T1 → T2 → T3, 12 min total, enregistrement + comparaison avec modèle.", href: "06_speaking/index/", emoji: "🗣️" },
      }[w];
      blocks.push(Object.assign({ mins: focus }, FOCUS));
      // Phonology — 15 % of time
      const phon = Math.round(M * 0.15);
      blocks.push({ mins: phon, title: "Phonologie / minimal pairs", desc: "Trainer paires minimales (nasales, voyelles orales) ou unité phonologie.", href: "11_tools/minimal-pairs/", emoji: "🎙️" });
      // Cool-down — remainder
      const used = blocks.reduce((s, b) => s + b.mins, 0);
      const rest = Math.max(5, M - used);
      blocks.push({ mins: rest, title: "Cool-down — cloze + journal", desc: "Cloze B2 (10 items) + note 2 fautes du jour dans le journal d'erreurs.", href: "11_tools/cloze/", emoji: "📝" });
      const root = host.querySelector(".pl-plan");
      root.innerHTML =
        '<ol class="pl-list">' +
          blocks.map((b) =>
            '<li><a class="pl-block" href="' + b.href + '">' +
              '<span class="pl-mins">' + b.mins + ' min</span>' +
              '<span class="pl-emoji">' + b.emoji + '</span>' +
              '<span class="pl-title">' + escapeHtml(b.title) + '</span>' +
              '<span class="pl-desc">' + escapeHtml(b.desc) + '</span>' +
            '</a></li>'
          ).join("") +
        '</ol>';
    }
    render();
  }

  // ---------- 32. Error log + spaced review ------------------------
  // Markup: <div class="tcf-errlog"></div>
  onPage(() => {
    document.querySelectorAll(".tcf-errlog").forEach(mountErrlog);
  });

  function mountErrlog(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const SK = "errlog:items";
    let items = ls.get(SK, []);

    function render() {
      const due = items.filter((it) => (it.next || 0) <= Date.now());
      host.innerHTML =
        '<div class="el-form">' +
          '<input class="el-q" type="text" placeholder="Erreur (ex: J\'ai allé)" />' +
          '<input class="el-a" type="text" placeholder="Correct (ex: Je suis allé)" />' +
          '<select class="el-skill"><option value="EE">EE</option><option value="EO">EO</option><option value="CO">CO</option><option value="CE">CE</option><option value="GRAM">Grammaire</option><option value="VOC">Lexique</option></select>' +
          '<button class="tcf-btn primary el-add">+ Ajouter</button>' +
        '</div>' +
        '<div class="el-stats">' +
          '<strong>' + items.length + '</strong> erreur(s) enregistrée(s) · <strong>' + due.length + '</strong> à revoir aujourd\'hui' +
        '</div>' +
        (items.length ?
          '<table class="el-table"><thead><tr><th>Faux</th><th>Correct</th><th>Skill</th><th>Niveau</th><th>Revue</th><th></th></tr></thead><tbody>' +
          items.map((it, idx) => {
            const dueNow = (it.next || 0) <= Date.now();
            const days = it.next ? Math.max(0, Math.round((it.next - Date.now()) / 86400000)) : 0;
            return '<tr class="' + (dueNow ? "is-due" : "") + '">' +
              '<td><code>' + escapeHtml(it.q) + '</code></td>' +
              '<td><code>' + escapeHtml(it.a) + '</code></td>' +
              '<td>' + escapeHtml(it.s) + '</td>' +
              '<td>' + (it.level || 0) + '</td>' +
              '<td>' + (dueNow ? '<span class="el-due">aujourd\'hui</span>' : ('dans ' + days + ' j')) + '</td>' +
              '<td>' +
                (dueNow ? '<button class="tcf-btn el-act" data-act="ok" data-i="' + idx + '">✓ revue</button>' : '') +
                '<button class="tcf-btn el-act" data-act="del" data-i="' + idx + '">🗑</button>' +
              '</td>' +
            '</tr>';
          }).join("") +
          '</tbody></table>'
        : '<p style="opacity:.7;text-align:center;margin:1rem 0">Aucune erreur enregistrée. Ajoutez-en une après chaque exercice — c\'est l\'outil qui tire le plus de points.</p>') +
        (items.length ? '<button class="tcf-btn el-export">Exporter JSON</button> <button class="tcf-btn el-import">Importer</button>' : '');

      const q = host.querySelector(".el-q");
      const a = host.querySelector(".el-a");
      host.querySelector(".el-add").addEventListener("click", () => {
        if (!q.value.trim() || !a.value.trim()) { toast("Renseignez les deux champs", "warn"); return; }
        items.push({ q: q.value.trim(), a: a.value.trim(), s: host.querySelector(".el-skill").value, level: 0, next: Date.now() });
        ls.set(SK, items);
        q.value = ""; a.value = ""; q.focus();
        render();
      });
      host.querySelectorAll(".el-act").forEach((b) => {
        b.addEventListener("click", () => {
          const idx = parseInt(b.dataset.i, 10);
          if (b.dataset.act === "del") {
            if (!confirm("Supprimer cette entrée ?")) return;
            items.splice(idx, 1);
          } else if (b.dataset.act === "ok") {
            const it = items[idx];
            it.level = (it.level || 0) + 1;
            const days = [1, 2, 4, 8, 16, 32, 64][Math.min(it.level, 6)];
            it.next = Date.now() + days * 86400000;
          }
          ls.set(SK, items); render();
        });
      });
      const ex = host.querySelector(".el-export");
      if (ex) ex.addEventListener("click", () => {
        const blob = new Blob([JSON.stringify(items, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a2 = document.createElement("a"); a2.href = url; a2.download = "tcf-errors-" + new Date().toISOString().slice(0, 10) + ".json"; a2.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      });
      const imp = host.querySelector(".el-import");
      if (imp) imp.addEventListener("click", () => {
        const inp = document.createElement("input"); inp.type = "file"; inp.accept = "application/json";
        inp.addEventListener("change", () => {
          const f = inp.files[0]; if (!f) return;
          const r = new FileReader();
          r.onload = () => {
            try {
              const arr = JSON.parse(r.result);
              if (!Array.isArray(arr)) throw new Error("not an array");
              items = arr; ls.set(SK, items); render();
              toast("Journal importé", "ok");
            } catch (e) { toast("Fichier JSON invalide", "warn"); }
          };
          r.readAsText(f);
        });
        inp.click();
      });
    }
    render();
  }

  // ---------- 33. Combined dashboard -------------------------------
  // Markup: <div class="tcf-dashboard"></div>
  onPage(() => {
    document.querySelectorAll(".tcf-dashboard").forEach(mountDashboard);
  });

  function mountDashboard(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";

    function dueCardsCount() {
      // Aggregate from all fc: keys
      let due = 0;
      try {
        const now = Date.now();
        Object.keys(localStorage).filter((k) => k.startsWith(LS_PREFIX + "fc:")).forEach((k) => {
          const sched = JSON.parse(localStorage.getItem(k) || "{}");
          Object.values(sched).forEach((ts) => { if (ts <= now) due++; });
        });
      } catch (e) {}
      return due;
    }
    function streakInfo() {
      const days = ls.get("streak:days", {}) || {};
      const today = new Date().toISOString().slice(0, 10);
      const yest = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      let cur = 0;
      let d = new Date();
      while (true) {
        const k = d.toISOString().slice(0, 10);
        if (days[k]) { cur++; d.setDate(d.getDate() - 1); } else break;
      }
      return { current: cur, today: !!days[today], yest: !!days[yest] };
    }
    function lastMock() {
      const arr = ls.get("track:mocks", []) || [];
      return arr.length ? arr[arr.length - 1] : null;
    }
    function errDue() {
      const items = ls.get("errlog:items", []) || [];
      return items.filter((it) => (it.next || 0) <= Date.now()).length;
    }
    function nclcSaved() {
      const v = ls.get("calc:nclc", {}) || {};
      return v;
    }

    function render() {
      const sk = streakInfo();
      const due = dueCardsCount();
      const mock = lastMock();
      const errs = errDue();
      const nclc = nclcSaved();

      host.innerHTML =
        '<div class="db-grid">' +
          '<div class="db-card db-streak ' + (sk.today ? "is-on" : "") + '">' +
            '<span class="db-icon">🔥</span>' +
            '<span class="db-num">' + sk.current + '</span>' +
            '<span class="db-label">jour(s) consécutifs</span>' +
            (sk.today ? '<span class="db-tag ok">étude validée</span>' : '<span class="db-tag warn">à valider</span>') +
            '<a class="db-action" href="11_tools/streak/">Heatmap →</a>' +
          '</div>' +
          '<div class="db-card db-due">' +
            '<span class="db-icon">🃏</span>' +
            '<span class="db-num">' + due + '</span>' +
            '<span class="db-label">carte(s) SRS à revoir</span>' +
            '<a class="db-action" href="11_tools/flashcards/">Reviser →</a>' +
          '</div>' +
          '<div class="db-card db-errs">' +
            '<span class="db-icon">📝</span>' +
            '<span class="db-num">' + errs + '</span>' +
            '<span class="db-label">erreur(s) à revoir</span>' +
            '<a class="db-action" href="11_tools/journal/">Ouvrir →</a>' +
          '</div>' +
          '<div class="db-card db-mock">' +
            '<span class="db-icon">📊</span>' +
            (mock ? '<span class="db-num">' + (mock.label || "Mock") + '</span>' +
              '<span class="db-label">' + escapeHtml(mock.date || "") + ' · CO ' + (mock.co ?? "—") + ' · CE ' + (mock.ce ?? "—") + ' · EE ' + (mock.ee ?? "—") + ' · EO ' + (mock.eo ?? "—") + '</span>'
              : '<span class="db-num">—</span><span class="db-label">aucun examen blanc enregistré</span>') +
            '<a class="db-action" href="11_tools/suivi/">Suivi →</a>' +
          '</div>' +
        '</div>' +
        '<div class="db-radar"></div>';

      drawRadar(host.querySelector(".db-radar"), nclc);
    }
    function drawRadar(el, nclc) {
      if (!el) return;
      const skills = ["CO", "CE", "EE", "EO"];
      const labels = { CO: "co", CE: "ce", EE: "ee", EO: "eo" };
      const tables = { CO: NCLC_CO_CE, CE: NCLC_CO_CE, EE: NCLC_EE_EO, EO: NCLC_EE_EO };
      const vals = skills.map((s) => {
        const raw = parseFloat(nclc[labels[s]]);
        if (isNaN(raw)) return 0;
        return nclcFromRaw(tables[s], raw) || 0;
      });
      const W = 320, H = 320, cx = W/2, cy = H/2, R = 120;
      function pt(i, v) {
        const ang = -Math.PI/2 + (i * 2 * Math.PI / 4);
        const r = (Math.min(v, 10) / 10) * R;
        return [cx + Math.cos(ang) * r, cy + Math.sin(ang) * r];
      }
      function lblPt(i) {
        const ang = -Math.PI/2 + (i * 2 * Math.PI / 4);
        const r = R + 18;
        return [cx + Math.cos(ang) * r, cy + Math.sin(ang) * r];
      }
      const polygon = vals.map((v, i) => pt(i, v).join(",")).join(" ");
      const rings = [2, 4, 6, 8, 10].map((n) => {
        const pts = skills.map((_, i) => pt(i, n).join(",")).join(" ");
        return '<polygon points="' + pts + '" fill="none" stroke="currentColor" opacity="' + (0.06 + n*0.015) + '" />';
      }).join("");
      const labelsSvg = skills.map((s, i) => {
        const [x, y] = lblPt(i);
        return '<text x="' + x + '" y="' + y + '" text-anchor="middle" dominant-baseline="middle" font-size="14" font-weight="600" fill="currentColor">' + s + '<tspan dx="4" font-size="11" opacity=".7">' + (vals[i] || "—") + '</tspan></text>';
      }).join("");
      const axes = skills.map((_, i) => {
        const [x, y] = pt(i, 10);
        return '<line x1="' + cx + '" y1="' + cy + '" x2="' + x + '" y2="' + y + '" stroke="currentColor" opacity=".1" />';
      }).join("");
      el.innerHTML =
        '<h3>Radar NCLC</h3>' +
        '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:340px;display:block;margin:0 auto">' +
          rings +
          axes +
          '<polygon points="' + polygon + '" fill="var(--md-primary-fg-color)" fill-opacity=".22" stroke="var(--md-primary-fg-color)" stroke-width="2" />' +
          labelsSvg +
        '</svg>' +
        '<p style="font-size:.85rem;text-align:center;opacity:.75;margin-top:.4rem">Cible NCLC 8 = cercle au niveau 8. Saisissez vos scores dans le <a href="11_tools/calculateur-nclc/">calculateur</a>.</p>';
    }
    render();
  }

  // ---------- 34. EE auto-feedback ---------------------------------
  // Markup: <div class="tcf-ee-feedback"></div>
  // Heuristic analysis of a pasted essay: length, connectors, register, hedging, lexical diversity.
  onPage(() => {
    document.querySelectorAll(".tcf-ee-feedback").forEach(mountEeFeedback);
  });

  function mountEeFeedback(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const SK = "ee:fb:draft";
    const draft = ls.get(SK, { text: "", task: "T2" });
    host.innerHTML =
      '<div class="ef-head">' +
        '<label>Tâche <select name="task">' +
          '<option value="T1">T1 (60–120 mots, message)</option>' +
          '<option value="T2">T2 (120–150 mots, courrier)</option>' +
          '<option value="T3">T3 (180+ mots, essai)</option>' +
        '</select></label>' +
        '<button class="tcf-btn ef-clear">↺ Vider</button>' +
      '</div>' +
      '<textarea class="ef-text" rows="14" placeholder="Collez ou tapez votre rédaction ici…"></textarea>' +
      '<div class="ef-report"></div>';
    const ta = host.querySelector("textarea");
    const sel = host.querySelector("select");
    ta.value = draft.text || ""; sel.value = draft.task || "T2";
    function save() { ls.set(SK, { text: ta.value, task: sel.value }); render(); }
    ta.addEventListener("input", save);
    sel.addEventListener("change", save);
    host.querySelector(".ef-clear").addEventListener("click", () => {
      if (!ta.value.trim() || confirm("Vider la zone ?")) { ta.value = ""; save(); }
    });

    const CONNECTORS_B2 = ["cependant", "néanmoins", "toutefois", "en revanche", "par ailleurs", "en outre", "de plus", "de surcroît", "en effet", "en somme", "autrement dit", "c'est-à-dire", "à savoir", "or", "donc", "ainsi", "par conséquent", "dès lors", "puisque", "étant donné que", "dans la mesure où", "afin que", "pour que", "bien que", "quoique", "malgré", "en dépit de", "tandis que", "alors que", "tant que", "force est de constater", "il convient de", "il importe de", "force est de", "il s'avère que"];
    const SPOKEN_RED = ["genre", "trop", "vachement", "super", "carrément", "j'sais pas", "j sais pas", "ouais", "bah", "ben"];
    const HEDGES = ["il semble", "il paraît", "on pourrait", "il serait possible", "à mon sens", "selon moi", "de mon point de vue", "il est probable", "il est vraisemblable", "sans doute", "certes"];

    function wordCount(s) { return s.trim().split(/\s+/).filter(Boolean).length; }
    function sentenceCount(s) { return s.split(/[.!?…]/).map((x) => x.trim()).filter(Boolean).length; }
    function distinctRatio(s) {
      const ws = s.toLowerCase().match(/[a-zà-ÿ'-]+/g) || [];
      const set = new Set(ws);
      return ws.length ? set.size / ws.length : 0;
    }
    function findHits(s, list) {
      const low = s.toLowerCase();
      return list.filter((c) => low.includes(c));
    }
    function avgSentLen(s) {
      const sents = s.split(/[.!?…]/).map((x) => x.trim()).filter(Boolean);
      if (!sents.length) return 0;
      const lens = sents.map((sx) => sx.split(/\s+/).filter(Boolean).length);
      return lens.reduce((a, b) => a + b, 0) / sents.length;
    }
    function targetRange(task) {
      return { T1: [60, 120], T2: [120, 200], T3: [180, 300] }[task] || [120, 200];
    }

    function render() {
      const text = ta.value;
      const task = sel.value;
      const wc = wordCount(text);
      const sc = sentenceCount(text);
      const ratio = distinctRatio(text);
      const conn = findHits(text, CONNECTORS_B2);
      const spoken = findHits(text, SPOKEN_RED);
      const hedges = findHits(text, HEDGES);
      const asl = avgSentLen(text);
      const [lo, hi] = targetRange(task);

      const out = [];
      function row(label, val, status, why) {
        out.push('<div class="ef-row ' + status + '"><span class="ef-lbl">' + escapeHtml(label) + '</span><span class="ef-val">' + escapeHtml(String(val)) + '</span><span class="ef-why">' + escapeHtml(why) + '</span></div>');
      }
      row("Mots", wc, wc < lo ? "warn" : (wc > hi + 50 ? "warn" : "ok"),
        wc < lo ? "Sous la cible " + lo + "–" + hi + ". Étoffez d'1 ou 2 phrases." :
        wc > hi + 50 ? "Au-dessus de " + (hi + 50) + ". Risque de pénalité de longueur." : "Dans la fourchette " + lo + "–" + hi + ".");
      row("Phrases", sc, sc < 3 ? "warn" : "ok", sc < 3 ? "Très court — minimum 3 phrases avec connecteurs." : "Bonne segmentation.");
      row("Longueur moy. phrase", asl.toFixed(1) + " mots", asl > 30 ? "warn" : (asl < 6 ? "warn" : "ok"),
        asl > 30 ? "Phrases longues — risque d'erreurs de structure." :
        asl < 6 ? "Phrases courtes — visez 12–22 mots en B2." : "Cohérent avec un B2.");
      row("Variation lexicale", Math.round(ratio * 100) + " %", ratio < 0.4 ? "warn" : (ratio > 0.55 ? "ok" : "ok"),
        ratio < 0.4 ? "Vocabulaire répétitif — variez avec des synonymes B2." : "Variation correcte.");
      row("Connecteurs B2", conn.length, conn.length < 2 ? "warn" : "ok",
        conn.length < 2 ? "Ajoutez 1–2 connecteurs : cependant, par conséquent, dans la mesure où…" : "Connecteurs présents : " + conn.slice(0, 5).join(", ") + ".");
      row("Marques d'oralité", spoken.length, spoken.length ? "bad" : "ok",
        spoken.length ? "À supprimer : " + spoken.join(", ") + "." : "Aucune marque d'oralité détectée.");
      row("Atténuation / hedging", hedges.length, hedges.length < 1 && task === "T3" ? "warn" : "ok",
        hedges.length < 1 && task === "T3" ? "T3 attend une voix nuancée — ajoutez 1 atténuateur (à mon sens, sans doute…)." : "Niveau adéquat.");

      // Verdict
      const warnings = out.filter((s) => s.includes('class="ef-row warn"') || s.includes('class="ef-row bad"')).length;
      const status = warnings === 0 ? "ok" : warnings <= 2 ? "warn" : "bad";
      const verdict =
        '<div class="ef-verdict ' + status + '">' +
          (status === "ok" ? "✓ Tous les indicateurs sont au vert. Bon départ pour viser EE 14+." :
           status === "warn" ? "△ Quelques ajustements rapides à faire avant de soumettre." :
           "✗ Plusieurs points à corriger — voir détails ci-dessous.") +
        '</div>';
      host.querySelector(".ef-report").innerHTML = verdict +
        '<div class="ef-rows">' + out.join("") + '</div>' +
        '<p style="font-size:.75rem;opacity:.65;margin-top:.6rem">Heuristique, pas examinateur. Pour un vrai score, voyez la <a href="../../05_writing/00_rubric/">rubrique EE opérationnalisée</a>.</p>';
    }
    render();
  }

  // ---------- 35. Word frequency / CEFR lookup ----------------------
  // Markup: <div class="tcf-freq"></div>
  // Data: window.TCF.lexFreq = { word: { cefr: "B1", rank: 412, gloss?: "…" } }
  window.TCF.lexFreq = window.TCF.lexFreq || {};
  onPage(() => { document.querySelectorAll(".tcf-freq").forEach(mountFreq); });

  function mountFreq(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    host.innerHTML =
      '<div class="fq-form">' +
        '<input class="fq-q" type="text" placeholder="Cherchez un mot français (ex: « ainsi », « cependant »)" autocomplete="off" />' +
        '<button class="tcf-btn primary fq-go">Chercher</button>' +
      '</div>' +
      '<div class="fq-result"></div>' +
      '<p style="font-size:.78rem;opacity:.7">Base interne de <strong>' + Object.keys(window.TCF.lexFreq).length + '</strong> entrées (B1–C1, extraits du corpus). Pas un dictionnaire complet — pour une définition, voir le <a href="11_tools/glossaire/">glossaire</a> ou wiktionary.org.</p>';
    const input = host.querySelector(".fq-q");
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") doSearch(); });
    host.querySelector(".fq-go").addEventListener("click", doSearch);

    function doSearch() {
      const q = stripAccents(input.value.trim());
      const out = host.querySelector(".fq-result");
      if (!q) { out.innerHTML = ""; return; }
      const map = window.TCF.lexFreq;
      const hits = [];
      Object.keys(map).forEach((k) => {
        const sk = stripAccents(k);
        if (sk === q) hits.unshift({ key: k, info: map[k], exact: true });
        else if (sk.includes(q)) hits.push({ key: k, info: map[k], exact: false });
      });
      if (!hits.length) {
        out.innerHTML = '<div class="fq-card warn">Aucun résultat dans le lexique du corpus. Essayez la <a href="?q=' + encodeURIComponent(q) + '">recherche globale</a>.</div>';
        return;
      }
      out.innerHTML = hits.slice(0, 12).map((h) =>
        '<div class="fq-card">' +
          '<div class="fq-word">' + escapeHtml(h.key) + (h.exact ? ' <small>(exact)</small>' : '') + '</div>' +
          '<div class="fq-meta">' +
            '<span class="cefr-badge cefr-' + (h.info.cefr || "b2").toLowerCase() + '">' + escapeHtml(h.info.cefr || "—") + '</span>' +
            (h.info.rank ? '<span class="fq-rank">rang ~ #' + h.info.rank + '</span>' : '') +
          '</div>' +
          (h.info.gloss ? '<div class="fq-gloss">' + escapeHtml(h.info.gloss) + '</div>' : '') +
        '</div>'
      ).join("");
    }
  }

  // ---------- 36. Verb conjugation table ---------------------------
  // Markup: <div class="tcf-verbtable" data-verbs="core"></div>
  // Reuses window.TCF.verbs[key] from the conjugation drill if present.
  onPage(() => { document.querySelectorAll(".tcf-verbtable[data-verbs]").forEach(mountVerbTable); });

  function mountVerbTable(host) {
    if (host.dataset.mounted) return;
    const key = host.dataset.verbs;
    const verbs = (window.TCF.verbs || {})[key];
    if (!verbs || !verbs.length) { host.innerHTML = '<p style="opacity:.7">Banque de verbes introuvable.</p>'; return; }
    host.dataset.mounted = "1";

    let verbIdx = 0;
    const TENSE_LABELS = {
      pres: "Présent",
      pc:   "Passé composé",
      imp:  "Imparfait",
      fut:  "Futur simple",
      cond: "Conditionnel présent",
      subj: "Subjonctif présent",
      pqp:  "Plus-que-parfait",
      ps:   "Passé simple",
      futa: "Futur antérieur",
      conda:"Conditionnel passé",
      subjp:"Subjonctif passé",
    };
    function inf(v) { return v.infinitive || v.inf || "?"; }
    function persons(form) {
      return ["je", "tu", "il/elle/on", "nous", "vous", "ils/elles"].map((p, i) => [p, form[i] || "—"]);
    }
    function render() {
      const v = verbs[verbIdx];
      const tenses = Object.keys(v.forms || {});
      host.innerHTML =
        '<div class="vt-head">' +
          '<label>Verbe <select class="vt-pick">' + verbs.map((vv, i) => '<option value="' + i + '"' + (i === verbIdx ? ' selected' : '') + '>' + escapeHtml(inf(vv)) + '</option>').join("") + '</select></label>' +
          '<span class="vt-info">' + escapeHtml(inf(v)) + (v.group ? ' · ' + escapeHtml(v.group) : '') + (v.aux ? ' · aux. ' + escapeHtml(v.aux) : '') + '</span>' +
        '</div>' +
        '<div class="vt-grid">' +
          tenses.map((t) => {
            const ps = persons(v.forms[t] || []);
            return '<div class="vt-tense"><h4>' + escapeHtml(TENSE_LABELS[t] || t) + '</h4>' +
              '<table>' + ps.map((p) => '<tr><th>' + escapeHtml(p[0]) + '</th><td>' + escapeHtml(p[1]) + '</td></tr>').join("") + '</table>' +
            '</div>';
          }).join("") +
        '</div>';
      host.querySelector(".vt-pick").addEventListener("change", (e) => { verbIdx = parseInt(e.target.value, 10); render(); });
    }
    render();
  }

  // ---------- 37. Animated NCLC gauge ------------------------------
  // Markup: <div class="tcf-gauge" data-value="503" data-max="699" data-label="CO" data-unit="/ 699" data-target="503"></div>
  onPage(() => { document.querySelectorAll(".tcf-gauge[data-value]").forEach(mountGauge); });

  function mountGauge(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const val = parseFloat(host.dataset.value) || 0;
    const max = parseFloat(host.dataset.max) || 100;
    const label = host.dataset.label || "";
    const unit = host.dataset.unit || "";
    const target = parseFloat(host.dataset.target);
    const W = 160, R = 60, CX = W/2, CY = W/2;
    const C = 2 * Math.PI * R;
    const pct = Math.min(1, Math.max(0, val / max));
    const targetPct = !isNaN(target) ? Math.min(1, target / max) : null;
    const offset = C * (1 - pct);
    const status = (val >= (target || max * 0.7)) ? "ok" : (val >= max * 0.5) ? "warn" : "bad";
    host.classList.add("g-" + status);
    host.innerHTML =
      '<svg viewBox="0 0 ' + W + ' ' + W + '" width="140" height="140" aria-label="' + escapeHtml(label) + ' ' + val + ' ' + unit + '">' +
        '<circle cx="' + CX + '" cy="' + CY + '" r="' + R + '" fill="none" stroke="currentColor" stroke-opacity=".12" stroke-width="10" />' +
        '<circle class="g-arc" cx="' + CX + '" cy="' + CY + '" r="' + R + '" fill="none" stroke-width="10" stroke-linecap="round" ' +
          'stroke-dasharray="' + C + '" stroke-dashoffset="' + C + '" ' +
          'transform="rotate(-90 ' + CX + ' ' + CY + ')" />' +
        (targetPct != null ? '<line class="g-target" x1="' + CX + '" y1="' + (CY - R - 6) + '" x2="' + CX + '" y2="' + (CY - R + 6) + '" stroke-width="2" ' +
          'transform="rotate(' + (targetPct * 360 - 90) + ' ' + CX + ' ' + CY + ')" />' : '') +
        '<text x="' + CX + '" y="' + (CY - 4) + '" text-anchor="middle" font-size="26" font-weight="700" fill="currentColor">' + val + '</text>' +
        '<text x="' + CX + '" y="' + (CY + 18) + '" text-anchor="middle" font-size="11" opacity=".7" fill="currentColor">' + escapeHtml(unit) + '</text>' +
      '</svg>' +
      '<div class="g-label">' + escapeHtml(label) + '</div>';
    // animate dash offset on next frame
    requestAnimationFrame(() => {
      const arc = host.querySelector(".g-arc");
      if (arc) {
        arc.style.transition = "stroke-dashoffset 1.1s cubic-bezier(.2,.7,.2,1)";
        arc.style.strokeDashoffset = offset;
      }
    });
  }

  // ---------- 38. Sparkline helper ---------------------------------
  // Public: TCF.sparkline(el, values, opts)
  window.TCF.sparkline = function (host, values, opts) {
    opts = opts || {};
    if (!host || !values || !values.length) return;
    const W = opts.w || 180, H = opts.h || 36;
    const lo = Math.min.apply(null, values);
    const hi = Math.max.apply(null, values);
    const r = (v) => H - 4 - ((v - lo) / Math.max(1e-9, (hi - lo))) * (H - 8);
    const step = (W - 8) / Math.max(1, values.length - 1);
    const pts = values.map((v, i) => (4 + i * step).toFixed(1) + "," + r(v).toFixed(1));
    const path = "M" + pts.join("L");
    host.innerHTML =
      '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '">' +
        '<path d="' + path + '" fill="none" stroke="currentColor" stroke-width="1.8" />' +
        '<circle cx="' + (4 + (values.length - 1) * step).toFixed(1) + '" cy="' + r(values[values.length - 1]).toFixed(1) + '" r="2.4" fill="currentColor" />' +
      '</svg>';
  };

  // ---------- 39. Auto-mark today's study on tool use --------------
  // When any of our practice widgets is used, mark today as "active" in the streak heatmap.
  function markTodayActive() {
    const k = new Date().toISOString().slice(0, 10);
    const days = ls.get("streak:days", {}) || {};
    if (!days[k]) { days[k] = 1; ls.set("streak:days", days); }
  }
  // Hook into common widget mounts that imply real practice
  ["tcf-cloze", "tcf-gender", "tcf-pairs", "tcf-numbers", "tcf-connectors", "tcf-race", "tcf-flashcards", "tcf-conjugate", "tcf-dictee", "tcf-quiz"].forEach((cls) => {
    // Defer to next tick so the widget hasn't actually been used yet — only mark when an answer comes in.
  });
  // Wire to grade/answer events via a delegated click listener
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!target || !target.matches) return;
    if (target.matches(".fc-grade, .gn-choice, .mp-choice, .cn-option, .rc-option, .nm-check, .cz-check, .opt-btn, .dict-check")) {
      markTodayActive();
    }
  });

  // -----------------------------------------------------------------
  // Extend the command palette with v1.2 tools
  // -----------------------------------------------------------------
  if (Array.isArray(PALETTE_ITEMS)) {
    PALETTE_ITEMS.push(
      { id: "dash",   title: "Tableau de bord (v1.2)",         hint: "g b",  href: "11_tools/tableau/" },
      { id: "plan",   title: "Plan d'étude du jour (v1.2)",    hint: "",     href: "11_tools/plan-du-jour/" },
      { id: "cloze",  title: "Cloze B2 — phrases à trous (v1.2)", hint: "", href: "11_tools/cloze/" },
      { id: "gen",    title: "Genre des noms (v1.2)",          hint: "",     href: "11_tools/genre/" },
      { id: "pairs",  title: "Paires minimales — phonologie (v1.2)", hint: "", href: "11_tools/minimal-pairs/" },
      { id: "num",    title: "Nombres — écoute & saisie (v1.2)", hint: "",   href: "11_tools/nombres/" },
      { id: "conn",   title: "Connecteurs B2 — choix (v1.2)",  hint: "",     href: "11_tools/connecteurs/" },
      { id: "race",   title: "Speed race · faux-amis 60 s (v1.2)", hint: "", href: "11_tools/speed-race/" },
      { id: "errlog", title: "Journal d'erreurs (v1.2)",       hint: "",     href: "11_tools/journal/" },
      { id: "eefb",   title: "Auto-feedback EE (v1.2)",        hint: "",     href: "11_tools/ee-feedback/" },
      { id: "freq",   title: "Lexique : fréquence / CEFR (v1.2)", hint: "",  href: "11_tools/lexique/" },
      { id: "vtab",   title: "Tables de conjugaison (v1.2)",   hint: "",     href: "11_tools/verbes/" }
    );
  }

  // =================================================================
  // v1.3 — World-class plus (2026-05-29)
  // =================================================================
  // 40. CE entraîneur — reading comprehension timer + MCQ  .tcf-ce-trainer[data-set]
  // 41. CO entraîneur — listening MCQ with TTS              .tcf-co-trainer[data-set]
  // 42. Liaisons / élisions — phonology drill               .tcf-liaisons[data-set]
  // 43. Sentence builder — click word ordering              .tcf-builder[data-set]
  // 44. Goal / countdown — exam date widget                 .tcf-goal
  // 45. Badges / achievements                               .tcf-badges
  // 46. Weekly insights                                     .tcf-weekly
  // 47. Synonyms drill                                       .tcf-syn[data-set]
  // 48. Sound effects + settings                            .tcf-settings
  // 49. PWA registration (auto)
  // 50. Touch swipe on flashcards
  // 51. Animated number counter helper                      .tcf-counter[data-to]

  // ---------- 40. CE entraîneur — Reading comprehension -----------
  // Markup: <div class="tcf-ce-trainer" data-set="b2_pack1"></div>
  // Data: window.TCF.cePacks[key] = { title, level, passages:[{ id, text, words, q:[{ q, options:[..], a, why? }] }] }
  window.TCF.cePacks = window.TCF.cePacks || {};
  onPage(() => { document.querySelectorAll(".tcf-ce-trainer[data-set]").forEach(mountCeTrainer); });

  function mountCeTrainer(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const key = host.dataset.set;
    const pack = window.TCF.cePacks[key];
    if (!pack) { host.innerHTML = '<p style="opacity:.7">Lot CE introuvable.</p>'; return; }
    const SK = "ce:" + key;
    const state = ls.get(SK, { runs: [], best: 0 });

    let idx = 0; let answers = []; let startTs = 0; let timerId = null;
    const totalSeconds = (pack.minutes || 12) * 60;

    function renderIntro() {
      host.innerHTML =
        '<div class="ce-intro">' +
          '<div class="ce-badge">' + escapeHtml(pack.level || "B2") + ' · ' + pack.passages.length + ' passage(s) · ' + (pack.minutes || 12) + ' min</div>' +
          '<h3>' + escapeHtml(pack.title || "Entraînement CE") + '</h3>' +
          '<p>Lisez chaque passage, répondez aux QCM. Compteur visible en haut. Vous pouvez naviguer entre les passages. Record actuel : <strong>' + state.best + '</strong> / ' + totalQuestions() + '.</p>' +
          '<button class="tcf-btn primary ce-start">▶ Lancer la session (' + (pack.minutes || 12) + ' min)</button>' +
          (state.runs && state.runs.length ? '<p style="font-size:.85rem;opacity:.7;margin-top:.6rem">' + state.runs.length + ' session(s) précédente(s).</p>' : '') +
        '</div>';
      host.querySelector(".ce-start").addEventListener("click", start);
    }
    function totalQuestions() { return pack.passages.reduce((s, p) => s + p.q.length, 0); }
    function start() {
      idx = 0; answers = pack.passages.map((p) => p.q.map(() => null));
      startTs = Date.now();
      tick(); timerId = setInterval(tick, 500);
      render();
    }
    function tick() {
      const el = host.querySelector(".ce-time");
      if (!el) return;
      const rem = Math.max(0, totalSeconds * 1000 - (Date.now() - startTs));
      const m = Math.floor(rem / 60000); const s = Math.floor((rem % 60000) / 1000);
      el.textContent = m + ":" + (s < 10 ? "0" : "") + s;
      el.classList.toggle("is-low", rem < 60000);
      if (rem <= 0) { clearInterval(timerId); finish(); }
    }
    function render() {
      const p = pack.passages[idx];
      host.innerHTML =
        '<div class="ce-head">' +
          '<span class="ce-time">--:--</span>' +
          '<div class="ce-pager">' + pack.passages.map((_, i) =>
            '<button class="ce-pg ' + (i === idx ? "on" : "") + (allAnswered(i) ? " done" : "") + '" data-i="' + i + '">' + (i + 1) + '</button>').join("") +
          '</div>' +
          '<button class="tcf-btn ce-finish">✓ Terminer</button>' +
        '</div>' +
        '<div class="ce-passage"><div class="ce-meta">Passage ' + (idx + 1) + ' · ' + (p.words || "—") + ' mots</div>' + p.text + '</div>' +
        '<div class="ce-qs">' +
          p.q.map((q, qi) => '<div class="ce-q"><div class="ce-qtext">Q' + (qi + 1) + '. ' + escapeHtml(q.q) + '</div>' +
            '<div class="ce-opts">' + q.options.map((o, oi) =>
              '<label class="ce-opt' + (answers[idx][qi] === oi ? " selected" : "") + '"><input type="radio" name="q' + idx + '-' + qi + '" value="' + oi + '"' + (answers[idx][qi] === oi ? " checked" : "") + ' /> ' + escapeHtml(o) + '</label>').join("") +
            '</div></div>').join("") +
        '</div>' +
        '<div class="ce-nav">' +
          (idx > 0 ? '<button class="tcf-btn ce-prev">← Précédent</button>' : '<span></span>') +
          (idx < pack.passages.length - 1 ? '<button class="tcf-btn primary ce-next">Suivant →</button>' : '<button class="tcf-btn primary ce-finish">✓ Terminer</button>') +
        '</div>';
      host.querySelectorAll(".ce-opt input").forEach((inp) => inp.addEventListener("change", (e) => {
        const m = e.target.name.match(/^q(\d+)-(\d+)$/);
        if (!m) return;
        answers[parseInt(m[1])][parseInt(m[2])] = parseInt(e.target.value);
        render();
      }));
      host.querySelectorAll(".ce-pg").forEach((b) => b.addEventListener("click", () => { idx = parseInt(b.dataset.i); render(); }));
      const prev = host.querySelector(".ce-prev"); if (prev) prev.addEventListener("click", () => { if (idx > 0) { idx--; render(); } });
      const next = host.querySelector(".ce-next"); if (next) next.addEventListener("click", () => { if (idx < pack.passages.length - 1) { idx++; render(); } });
      host.querySelectorAll(".ce-finish").forEach((b) => b.addEventListener("click", finish));
    }
    function allAnswered(i) { return answers[i] && answers[i].every((a) => a != null); }
    function finish() {
      if (timerId) { clearInterval(timerId); timerId = null; }
      let correct = 0; let total = 0;
      const detail = [];
      pack.passages.forEach((p, i) => {
        p.q.forEach((q, qi) => {
          total++;
          const got = answers[i][qi];
          const ok = got === q.a;
          if (ok) correct++;
          detail.push({ i, qi, q: q.q, got, want: q.a, ok, options: q.options, why: q.why });
        });
      });
      const run = { ts: Date.now(), score: correct, total, mins: Math.round((Date.now() - startTs) / 60000) };
      state.runs = (state.runs || []).concat([run]).slice(-20);
      if (correct > state.best) state.best = correct;
      ls.set(SK, state);
      try { TCF.sfx && TCF.sfx.play(correct === total ? "win" : correct >= total * 0.7 ? "good" : "ok"); } catch (e) {}
      if (correct === total && window.TCF && typeof window.TCF.confetti === "function") {
        try { window.TCF.confetti(2000); } catch (e) {}
      }
      try { TCF.badges && TCF.badges.check({ ce: { score: correct, total } }); } catch (e) {}
      host.innerHTML =
        '<div class="ce-summary">' +
          '<h3>Score : ' + correct + ' / ' + total + ' · ' + Math.round(100 * correct / total) + ' %</h3>' +
          '<p>Temps : ' + run.mins + ' min · Record CE : <strong>' + state.best + '</strong> / ' + total + '</p>' +
          '<details><summary>Voir le détail (' + detail.length + ' items)</summary>' +
            '<ol class="ce-detail">' +
              detail.map((d) => '<li class="' + (d.ok ? "ok" : "bad") + '"><strong>Passage ' + (d.i + 1) + ' · Q' + (d.qi + 1) + '.</strong> ' + escapeHtml(d.q) +
                '<br><span class="ce-want">Bonne réponse : ' + escapeHtml(d.options[d.want]) + '</span>' +
                (d.got != null && d.got !== d.want ? ' · <span class="ce-got">Votre réponse : ' + escapeHtml(d.options[d.got]) + '</span>' : '') +
                (d.why ? '<br><span class="ce-why">' + escapeHtml(d.why) + '</span>' : '') +
              '</li>').join("") +
            '</ol>' +
          '</details>' +
          '<div class="ce-actions"><button class="tcf-btn primary ce-replay">Refaire</button> <button class="tcf-btn ce-export">Exporter JSON</button></div>' +
        '</div>';
      host.querySelector(".ce-replay").addEventListener("click", renderIntro);
      host.querySelector(".ce-export").addEventListener("click", () => {
        const blob = new Blob([JSON.stringify({ pack: key, runs: state.runs }, null, 2)], { type: "application/json" });
        const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "ce-" + key + ".json"; a.click();
      });
    }
    renderIntro();
  }

  // ---------- 41. CO entraîneur — Listening MCQ with TTS -----------
  // Markup: <div class="tcf-co-trainer" data-set="b2_pack1"></div>
  // Data: window.TCF.coPacks[key] = { title, level, items:[{ text, voice?, rate?, q, options:[..], a, why? }] }
  window.TCF.coPacks = window.TCF.coPacks || {};
  onPage(() => { document.querySelectorAll(".tcf-co-trainer[data-set]").forEach(mountCoTrainer); });

  function mountCoTrainer(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const key = host.dataset.set;
    const pack = window.TCF.coPacks[key];
    if (!pack) { host.innerHTML = '<p style="opacity:.7">Lot CO introuvable.</p>'; return; }
    const SK = "co:" + key;
    const state = ls.get(SK, { runs: [], best: 0, weak: {} });
    let idx = 0; let answers = []; let plays = []; const synth = window.speechSynthesis;

    function pickVoice() {
      if (!synth) return null;
      const vs = synth.getVoices();
      return vs.find((v) => /fr-CA|fr_CA/i.test(v.lang)) || vs.find((v) => /^fr/i.test(v.lang)) || null;
    }
    function speak(text, rate) {
      if (!synth) { try { TCF.toast("Synthèse vocale indisponible — utilisez Chrome/Edge."); } catch(e){} return; }
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "fr-FR"; u.rate = rate || 1.0; const v = pickVoice(); if (v) u.voice = v;
      synth.speak(u);
    }
    function renderIntro() {
      host.innerHTML =
        '<div class="co-intro">' +
          '<div class="ce-badge">' + escapeHtml(pack.level || "B1+B2") + ' · ' + pack.items.length + ' items · TTS</div>' +
          '<h3>' + escapeHtml(pack.title || "Entraînement CO") + '</h3>' +
          '<p>Écoutez l\'audio (max 2 lectures, ≤ 1.0× recommandé), choisissez la bonne réponse. Record : <strong>' + state.best + '</strong> / ' + pack.items.length + '.</p>' +
          '<button class="tcf-btn primary co-start">▶ Commencer</button>' +
        '</div>';
      host.querySelector(".co-start").addEventListener("click", () => { idx = 0; answers = pack.items.map(() => null); plays = pack.items.map(() => 0); render(); });
    }
    function render() {
      const it = pack.items[idx];
      host.innerHTML =
        '<div class="co-head">' +
          '<span class="co-pos">Item ' + (idx + 1) + ' / ' + pack.items.length + '</span>' +
          '<span class="co-plays">▷ ' + plays[idx] + ' / 2</span>' +
        '</div>' +
        '<div class="co-controls">' +
          '<button class="tcf-btn primary co-play">▶ Écouter</button>' +
          '<button class="tcf-btn co-slow">🐢 0.8×</button>' +
          '<button class="tcf-btn co-stop">■ Stop</button>' +
        '</div>' +
        '<div class="co-q">' + escapeHtml(it.q) + '</div>' +
        '<div class="co-opts">' +
          it.options.map((o, oi) => '<button class="tcf-btn co-opt" data-k="' + oi + '">' + escapeHtml(o) + '</button>').join("") +
        '</div>' +
        '<div class="co-fb"></div>' +
        '<div class="co-nav">' +
          '<button class="tcf-btn co-skip">Passer →</button>' +
        '</div>';
      host.querySelector(".co-play").addEventListener("click", () => { if (plays[idx] < 2) { plays[idx]++; speak(it.text, it.rate || 1); render(); } else { try { TCF.toast("Limite 2 écoutes."); } catch(e){} } });
      host.querySelector(".co-slow").addEventListener("click", () => { if (plays[idx] < 2) { plays[idx]++; speak(it.text, 0.8); render(); } });
      host.querySelector(".co-stop").addEventListener("click", () => { try { synth && synth.cancel(); } catch(e){} });
      host.querySelectorAll(".co-opt").forEach((b) => b.addEventListener("click", () => {
        const k = parseInt(b.dataset.k);
        answers[idx] = k;
        const fb = host.querySelector(".co-fb");
        const ok = k === it.a;
        b.classList.add(ok ? "is-correct" : "is-wrong");
        if (!ok) host.querySelector('[data-k="' + it.a + '"]').classList.add("is-correct-soft");
        try { TCF.sfx && TCF.sfx.play(ok ? "correct" : "wrong"); } catch(e){}
        fb.innerHTML = '<div class="co-fb-' + (ok ? "ok" : "bad") + '">' + (ok ? "✓ Bonne réponse." : "✗ Bonne réponse : " + escapeHtml(it.options[it.a]) + ".") + (it.why ? " <em>" + escapeHtml(it.why) + "</em>" : "") + '</div>' +
          '<div class="co-script"><strong>Transcription :</strong> ' + escapeHtml(it.text) + '</div>' +
          '<button class="tcf-btn primary co-next">Suivant →</button>';
        host.querySelector(".co-next").addEventListener("click", () => { idx++; if (idx >= pack.items.length) finish(); else render(); });
      }));
      host.querySelector(".co-skip").addEventListener("click", () => { answers[idx] = -1; idx++; if (idx >= pack.items.length) finish(); else render(); });
    }
    function finish() {
      try { synth && synth.cancel(); } catch(e){}
      let correct = 0;
      const detail = [];
      pack.items.forEach((it, i) => {
        const got = answers[i];
        const ok = got === it.a;
        if (ok) correct++;
        detail.push({ i, q: it.q, want: it.a, got, options: it.options, ok, why: it.why, text: it.text });
      });
      const run = { ts: Date.now(), score: correct, total: pack.items.length };
      state.runs = (state.runs || []).concat([run]).slice(-20);
      if (correct > state.best) state.best = correct;
      ls.set(SK, state);
      try { TCF.sfx && TCF.sfx.play(correct === pack.items.length ? "win" : "ok"); } catch (e) {}
      try { TCF.badges && TCF.badges.check({ co: { score: correct, total: pack.items.length } }); } catch (e) {}
      host.innerHTML =
        '<div class="ce-summary">' +
          '<h3>Score : ' + correct + ' / ' + pack.items.length + ' · ' + Math.round(100 * correct / pack.items.length) + ' %</h3>' +
          '<p>Record CO : <strong>' + state.best + '</strong> / ' + pack.items.length + '</p>' +
          '<details><summary>Voir le détail</summary>' +
            '<ol class="ce-detail">' +
              detail.map((d) => '<li class="' + (d.ok ? "ok" : "bad") + '"><strong>Q' + (d.i + 1) + '.</strong> ' + escapeHtml(d.q) +
                '<br><span class="ce-want">Bonne réponse : ' + escapeHtml(d.options[d.want]) + '</span>' +
                (d.got != null && d.got >= 0 && d.got !== d.want ? ' · <span class="ce-got">Votre réponse : ' + escapeHtml(d.options[d.got]) + '</span>' : '') +
                '<br><span class="ce-why" style="opacity:.85">Audio : ' + escapeHtml(d.text) + '</span>' +
                (d.why ? '<br><span class="ce-why">' + escapeHtml(d.why) + '</span>' : '') +
              '</li>').join("") +
            '</ol>' +
          '</details>' +
          '<button class="tcf-btn primary co-replay">Refaire</button>' +
        '</div>';
      host.querySelector(".co-replay").addEventListener("click", renderIntro);
    }
    renderIntro();
  }

  // ---------- 42. Liaisons / élisions trainer ----------------------
  // Markup: <div class="tcf-liaisons" data-set="liaisons1"></div>
  // Data: window.TCF.liaisons[key] = [{ phrase, render, why, ipa? }]
  window.TCF.liaisons = window.TCF.liaisons || {};
  onPage(() => { document.querySelectorAll(".tcf-liaisons[data-set]").forEach(mountLiaisons); });

  function mountLiaisons(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const key = host.dataset.set;
    const data = window.TCF.liaisons[key];
    if (!data || !data.length) { host.innerHTML = '<p style="opacity:.7">Lot introuvable.</p>'; return; }
    const SK = "li:" + key;
    const state = ls.get(SK, { score: 0, best: 0, streak: 0, plays: 0 });
    let order = shuffle(data.map((_, i) => i)); let i = 0;
    const synth = window.speechSynthesis;
    function pickVoice() { if (!synth) return null; const vs = synth.getVoices(); return vs.find((v) => /^fr/i.test(v.lang)) || null; }
    function speak(text, rate) { if (!synth) return; synth.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = "fr-FR"; u.rate = rate || 0.95; const v = pickVoice(); if (v) u.voice = v; synth.speak(u); }

    function render() {
      const it = data[order[i]];
      host.innerHTML =
        '<div class="li-head"><span class="li-pos">' + (i + 1) + ' / ' + order.length + '</span><span class="li-score">✓ ' + state.score + ' · Record ' + state.best + '</span></div>' +
        '<div class="li-phrase">' + escapeHtml(it.phrase) + '</div>' +
        '<div class="li-controls">' +
          '<button class="tcf-btn primary li-play">▶ Écouter</button>' +
          '<button class="tcf-btn li-slow">🐢 0.7×</button>' +
        '</div>' +
        '<div class="li-reveal">' +
          '<button class="tcf-btn li-show">Afficher la prononciation</button>' +
        '</div>' +
        '<div class="li-actions" style="display:none">' +
          '<p class="li-render"><strong>Prononcé :</strong> ' + escapeHtml(it.render) + (it.ipa ? ' <span class="li-ipa">[' + escapeHtml(it.ipa) + ']</span>' : '') + '</p>' +
          '<p class="li-why">' + escapeHtml(it.why) + '</p>' +
          '<div class="li-grade">' +
            '<button class="tcf-btn li-ok">✓ Je connaissais</button>' +
            '<button class="tcf-btn li-bad">✗ J\'ignorais</button>' +
          '</div>' +
        '</div>';
      host.querySelector(".li-play").addEventListener("click", () => speak(it.render, 0.95));
      host.querySelector(".li-slow").addEventListener("click", () => speak(it.render, 0.7));
      host.querySelector(".li-show").addEventListener("click", () => {
        host.querySelector(".li-reveal").style.display = "none";
        host.querySelector(".li-actions").style.display = "block";
      });
      host.querySelector(".li-ok").addEventListener("click", () => grade(true));
      host.querySelector(".li-bad").addEventListener("click", () => grade(false));
    }
    function grade(ok) {
      if (ok) { state.score++; state.streak++; if (state.streak > state.best) state.best = state.streak; }
      else { state.streak = 0; }
      state.plays++;
      ls.set(SK, state);
      try { TCF.sfx && TCF.sfx.play(ok ? "correct" : "wrong"); } catch(e){}
      i++; if (i >= order.length) { order = shuffle(data.map((_, k) => k)); i = 0; try { TCF.toast("Lot terminé — on rejoue !"); } catch(e){} }
      render();
    }
    render();
  }

  // ---------- 43. Sentence builder — click word ordering -----------
  // Markup: <div class="tcf-builder" data-set="builder1"></div>
  // Data: window.TCF.builders[key] = [{ words:["…"], translation?, why? }]
  window.TCF.builders = window.TCF.builders || {};
  onPage(() => { document.querySelectorAll(".tcf-builder[data-set]").forEach(mountBuilder); });

  function mountBuilder(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const key = host.dataset.set;
    const data = window.TCF.builders[key];
    if (!data || !data.length) { host.innerHTML = '<p style="opacity:.7">Lot introuvable.</p>'; return; }
    const SK = "sb:" + key;
    const state = ls.get(SK, { score: 0, plays: 0 });
    let order = shuffle(data.map((_, i) => i)); let i = 0;
    let pool = []; let placed = [];

    function render() {
      const it = data[order[i]];
      pool = shuffle(it.words.slice().map((w, k) => ({ w, k })));
      placed = [];
      draw(it);
    }
    function draw(it) {
      host.innerHTML =
        '<div class="li-head"><span class="li-pos">' + (i + 1) + ' / ' + order.length + '</span><span class="li-score">✓ ' + state.score + '</span></div>' +
        (it.translation ? '<div class="sb-trans"><em>Construire la phrase équivalente à :</em><br><strong>' + escapeHtml(it.translation) + '</strong></div>' : '') +
        '<div class="sb-target">' + placed.map((p, pi) => '<button class="sb-chip placed" data-pi="' + pi + '">' + escapeHtml(p.w) + '</button>').join("") + '</div>' +
        '<div class="sb-pool">' + pool.map((p, pi) => '<button class="sb-chip pool" data-pi="' + pi + '">' + escapeHtml(p.w) + '</button>').join("") + '</div>' +
        '<div class="sb-controls">' +
          '<button class="tcf-btn sb-undo">↺ Effacer</button>' +
          '<button class="tcf-btn primary sb-check">✓ Vérifier</button>' +
        '</div>' +
        '<div class="sb-fb"></div>';
      host.querySelectorAll(".sb-chip.pool").forEach((b, idx) => b.addEventListener("click", () => {
        placed.push(pool.splice(idx, 1)[0]);
        draw(it);
      }));
      host.querySelectorAll(".sb-chip.placed").forEach((b, idx) => b.addEventListener("click", () => {
        pool.push(placed.splice(idx, 1)[0]);
        draw(it);
      }));
      host.querySelector(".sb-undo").addEventListener("click", () => { pool = pool.concat(placed); placed = []; draw(it); });
      host.querySelector(".sb-check").addEventListener("click", () => {
        const guess = placed.map((p) => p.w).join(" ");
        const wanted = it.words.join(" ");
        const ok = guess === wanted;
        const fb = host.querySelector(".sb-fb");
        if (ok) {
          state.score++; state.plays++; ls.set(SK, state);
          try { TCF.sfx && TCF.sfx.play("correct"); } catch(e){}
          fb.innerHTML = '<div class="sb-ok">✓ Exact ! ' + (it.why ? '<em>' + escapeHtml(it.why) + '</em>' : '') + '</div>' +
            '<button class="tcf-btn primary sb-next">Suivant →</button>';
          host.querySelector(".sb-next").addEventListener("click", () => { i = (i + 1) % order.length; render(); });
        } else {
          state.plays++; ls.set(SK, state);
          try { TCF.sfx && TCF.sfx.play("wrong"); } catch(e){}
          fb.innerHTML = '<div class="sb-bad">✗ Pas tout à fait.<br>Votre version : <em>' + escapeHtml(guess) + '</em><br>Cible : <strong>' + escapeHtml(wanted) + '</strong>' + (it.why ? '<br>' + escapeHtml(it.why) : '') + '</div>' +
            '<button class="tcf-btn sb-retry">Réessayer</button> <button class="tcf-btn sb-pass">Passer →</button>';
          host.querySelector(".sb-retry").addEventListener("click", () => render());
          host.querySelector(".sb-pass").addEventListener("click", () => { i = (i + 1) % order.length; render(); });
        }
      });
    }
    render();
  }

  // ---------- 44. Goal / exam-date countdown -----------------------
  // Markup: <div class="tcf-goal"></div>
  onPage(() => { document.querySelectorAll(".tcf-goal").forEach(mountGoal); });

  function mountGoal(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const SK = "goal:exam";
    function render() {
      const g = ls.get(SK, null);
      if (!g || !g.date) {
        host.innerHTML =
          '<div class="gl-empty"><p>📅 <strong>Pas encore d\'objectif.</strong> Posez-vous une date d\'examen — un compte à rebours visible motive plus que tout autre outil.</p>' +
            '<div class="gl-form">' +
              '<label>Date cible <input type="date" class="gl-date" min="' + new Date().toISOString().slice(0,10) + '" /></label>' +
              '<label>Niveau visé <select class="gl-tgt">' +
                '<option value="NCLC7">NCLC 7 (gateway CEC)</option>' +
                '<option value="NCLC8" selected>NCLC 8 (Express Entry bonus 25)</option>' +
                '<option value="NCLC9">NCLC 9 (bonus 50)</option>' +
                '<option value="NCLC10">NCLC 10 (plafond)</option>' +
              '</select></label>' +
              '<button class="tcf-btn primary gl-save">Définir</button>' +
            '</div>' +
          '</div>';
        host.querySelector(".gl-save").addEventListener("click", () => {
          const d = host.querySelector(".gl-date").value;
          const t = host.querySelector(".gl-tgt").value;
          if (!d) { try { TCF.toast("Choisissez une date."); } catch(e){} return; }
          ls.set(SK, { date: d, target: t, set: Date.now() });
          render();
          try { TCF.toast("Objectif enregistré."); } catch(e){}
        });
        return;
      }
      const diff = Math.ceil((new Date(g.date + "T00:00:00") - new Date(new Date().toISOString().slice(0,10) + "T00:00:00")) / 86400000);
      const weeks = Math.max(0, Math.floor(diff / 7));
      const status = diff < 0 ? "passed" : diff < 14 ? "imminent" : diff < 56 ? "near" : "far";
      const tlabel = { NCLC7: "NCLC 7", NCLC8: "NCLC 8", NCLC9: "NCLC 9", NCLC10: "NCLC 10" }[g.target] || g.target;
      const msg = diff < 0 ? "Date passée — pensez à mettre à jour." :
        diff === 0 ? "🎯 C'est aujourd'hui. Respirez, hydratez-vous, lisez 5 phrases B2." :
        diff <= 7 ? "🚨 Dernière semaine — taper, pas apprendre. Révisez seulement." :
        diff <= 14 ? "⏰ Phase taper — 2 mocks max, beaucoup de sommeil." :
        diff <= 56 ? "📚 Phase mocks + remédiation. Faites un mock toutes les 1–2 semaines." :
        "🏗️ Phase construction. Drillez B2 + EE/EO 5–7 j/sem.";
      host.innerHTML =
        '<div class="gl-card gl-' + status + '">' +
          '<div class="gl-big"><span class="gl-days">' + Math.max(0, diff) + '</span><span class="gl-unit">jour' + (diff === 1 ? "" : "s") + '</span></div>' +
          '<div class="gl-meta"><strong>' + tlabel + '</strong> · ' + escapeHtml(g.date) + ' · ' + (weeks > 0 ? "~ " + weeks + " sem." : "<7 j") + '</div>' +
          '<div class="gl-msg">' + msg + '</div>' +
          '<div class="gl-actions"><button class="tcf-btn gl-edit">Modifier</button> <button class="tcf-btn gl-clear">Effacer</button></div>' +
        '</div>';
      host.querySelector(".gl-edit").addEventListener("click", () => { ls.del(SK); render(); });
      host.querySelector(".gl-clear").addEventListener("click", () => { if (confirm("Effacer l\'objectif ?")) { ls.del(SK); render(); } });
    }
    render();
  }

  // ---------- 45. Badges / achievements -----------------------------
  // Markup: <div class="tcf-badges"></div>
  // Auto-checked via TCF.badges.check(payload)
  const BADGE_DEFS = [
    { id: "first-day",     icon: "🌱", title: "Premier pas",          desc: "1 jour d'étude validé." },
    { id: "streak-7",      icon: "🔥", title: "Sept jours",            desc: "Streak ≥ 7 j." },
    { id: "streak-30",     icon: "🚀", title: "Trente jours",          desc: "Streak ≥ 30 j." },
    { id: "srs-100",       icon: "🃏", title: "Cent cartes",           desc: "100 cartes SRS revues." },
    { id: "ce-pack",       icon: "📖", title: "Lecteur entraîné",      desc: "Score ≥ 80 % sur un lot CE." },
    { id: "co-pack",       icon: "🎧", title: "Oreille fine",          desc: "Score ≥ 80 % sur un lot CO." },
    { id: "ee-tour",       icon: "✍️", title: "Plume affûtée",         desc: "EE feedback tous indicateurs verts." },
    { id: "race-record",   icon: "⚡", title: "Sprint maître",          desc: "Speed race score net ≥ 12." },
    { id: "errlog-10",     icon: "📝", title: "Métacognitif",          desc: "10 erreurs loguées + revues." },
    { id: "mock-1",        icon: "🎯", title: "Premier mock",          desc: "1 examen blanc enregistré." },
    { id: "mock-4",        icon: "🏁", title: "Mocks complets",         desc: "4 mocks enregistrés (target)." },
    { id: "nclc-7",        icon: "🎖️", title: "NCLC 7 atteint",         desc: "Toutes compétences ≥ NCLC 7." },
    { id: "nclc-8",        icon: "🏆", title: "NCLC 8 atteint",         desc: "Toutes compétences ≥ NCLC 8 (CRS +25)." },
    { id: "nclc-9",        icon: "👑", title: "NCLC 9 atteint",         desc: "Toutes compétences ≥ NCLC 9 (CRS +50)." },
    { id: "all-tools",     icon: "🧰", title: "Couteau suisse",        desc: "Utilisé 10 outils différents." },
  ];
  window.TCF.badges = {
    list: BADGE_DEFS,
    earned() { return ls.get("badges:earned", {}) || {}; },
    grant(id) {
      const e = this.earned(); if (e[id]) return false;
      e[id] = Date.now(); ls.set("badges:earned", e);
      try { TCF.toast("🏅 Badge débloqué : " + (BADGE_DEFS.find(b => b.id === id) || {}).title); } catch(_){}
      try { TCF.sfx && TCF.sfx.play("badge"); } catch(_){}
      return true;
    },
    check(payload) {
      payload = payload || {};
      const e = this.earned();
      // streak
      try {
        const days = ls.get("streak:days", {}) || {};
        const todayK = new Date().toISOString().slice(0,10);
        let cur = 0; let d = new Date(todayK + "T00:00:00");
        while (true) { const k = d.toISOString().slice(0,10); if (days[k]) { cur++; d.setDate(d.getDate()-1); } else break; }
        if (Object.values(days).length >= 1) this.grant("first-day");
        if (cur >= 7) this.grant("streak-7");
        if (cur >= 30) this.grant("streak-30");
      } catch(_){}
      // CE/CO/EE thresholds
      if (payload.ce && payload.ce.total && payload.ce.score / payload.ce.total >= 0.8) this.grant("ce-pack");
      if (payload.co && payload.co.total && payload.co.score / payload.co.total >= 0.8) this.grant("co-pack");
      if (payload.ee && payload.ee.allGreen) this.grant("ee-tour");
      // SRS reviewed total
      try {
        let reviewed = 0;
        Object.keys(localStorage).filter((k) => k.startsWith(LS_PREFIX + "fc-stats:")).forEach((k) => {
          const s = JSON.parse(localStorage.getItem(k) || "{}");
          reviewed += (s.reviewed || 0);
        });
        if (reviewed >= 100) this.grant("srs-100");
      } catch(_){}
      // Race
      try {
        Object.keys(localStorage).filter((k) => k.startsWith(LS_PREFIX + "race:")).forEach((k) => {
          const s = JSON.parse(localStorage.getItem(k) || "{}");
          if ((s.best || 0) >= 12) this.grant("race-record");
        });
      } catch(_){}
      // Error log
      try {
        const items = ls.get("errlog:items", []) || [];
        const reviewed = items.filter((it) => (it.lvl || 0) > 0).length;
        if (items.length >= 10 && reviewed >= 10) this.grant("errlog-10");
      } catch(_){}
      // Mocks
      try {
        const mocks = ls.get("track:mocks", []) || [];
        if (mocks.length >= 1) this.grant("mock-1");
        if (mocks.length >= 4) this.grant("mock-4");
      } catch(_){}
      // NCLC milestones (use stored calc inputs)
      try {
        const v = ls.get("calc:nclc", {}) || {};
        const nclc = ["co","ce","ee","eo"].map((k) => {
          const t = (k === "co" || k === "ce") ? NCLC_CO_CE : NCLC_EE_EO;
          const raw = parseFloat(v[k]); if (isNaN(raw)) return 0;
          return nclcFromRaw(t, raw) || 0;
        });
        const minN = Math.min.apply(null, nclc);
        if (minN >= 7) this.grant("nclc-7");
        if (minN >= 8) this.grant("nclc-8");
        if (minN >= 9) this.grant("nclc-9");
      } catch(_){}
      // 10 different tools (track signals via tool:<name>:used)
      try {
        const used = ls.get("tools:used", {}) || {};
        if (Object.keys(used).length >= 10) this.grant("all-tools");
      } catch(_){}
      return e;
    }
  };
  // Track tool usage signals
  document.addEventListener("click", (e) => {
    const t = e.target; if (!t || !t.closest) return;
    const tool = t.closest("[data-tool]");
    if (tool && tool.dataset.tool) {
      const u = ls.get("tools:used", {}) || {}; u[tool.dataset.tool] = Date.now(); ls.set("tools:used", u);
    }
  });
  onPage(() => { document.querySelectorAll(".tcf-badges").forEach(mountBadges); });
  function mountBadges(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    function render() {
      window.TCF.badges.check();
      const e = window.TCF.badges.earned();
      const total = BADGE_DEFS.length;
      const got = Object.keys(e).length;
      host.innerHTML =
        '<div class="bd-head">' +
          '<div class="bd-progress"><div class="bd-bar" style="width:' + Math.round(100 * got / total) + '%"></div></div>' +
          '<div class="bd-count">' + got + ' / ' + total + ' débloqués</div>' +
        '</div>' +
        '<div class="bd-grid">' +
          BADGE_DEFS.map((b) => {
            const on = !!e[b.id];
            return '<div class="bd-card ' + (on ? "on" : "off") + '">' +
              '<span class="bd-icon">' + b.icon + '</span>' +
              '<span class="bd-title">' + escapeHtml(b.title) + '</span>' +
              '<span class="bd-desc">' + escapeHtml(b.desc) + '</span>' +
              (on ? '<span class="bd-tag">✓ ' + new Date(e[b.id]).toLocaleDateString("fr-FR") + '</span>' : '<span class="bd-tag" style="opacity:.4">verrouillé</span>') +
              '</div>';
          }).join("") +
        '</div>' +
        '<p style="font-size:.8rem;opacity:.7;margin-top:.8rem">Les badges se débloquent automatiquement quand vous atteignez les seuils. Aucune donnée envoyée.</p>';
    }
    render();
  }

  // ---------- 46. Weekly insights ----------------------------------
  // Markup: <div class="tcf-weekly"></div>
  onPage(() => { document.querySelectorAll(".tcf-weekly").forEach(mountWeekly); });
  function mountWeekly(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    function fmt(d) { return d.toISOString().slice(0,10); }
    function render() {
      const today = new Date();
      const days = ls.get("streak:days", {}) || {};
      const items = ls.get("errlog:items", []) || [];
      const mocks = ls.get("track:mocks", []) || [];
      const week = []; let active = 0;
      for (let i = 6; i >= 0; i--) {
        const d = new Date(); d.setDate(today.getDate() - i);
        const on = !!days[fmt(d)];
        if (on) active++;
        week.push({ d: fmt(d), label: ["dim","lun","mar","mer","jeu","ven","sam"][d.getDay()], on });
      }
      const errAdded = items.filter((it) => (Date.now() - (it.ts || 0)) < 7 * 86400000).length;
      const errReviewed = items.filter((it) => (Date.now() - (it.last || 0)) < 7 * 86400000 && (it.lvl || 0) > 0).length;
      const last4 = (mocks || []).slice(-4);
      const trend = last4.length >= 2
        ? (last4[last4.length - 1].co || 0) - (last4[0].co || 0)
        : 0;
      let advice;
      if (active <= 2) advice = "⚠ Moins de 3 jours actifs cette semaine. <strong>Reculez le périmètre</strong> — 15 min/j vaut mieux que 0.";
      else if (active >= 6) advice = "🚀 Semaine quasi-pleine. Variez : si vous n'avez pas ouvert le journal cette semaine, faites-le maintenant.";
      else advice = "👌 Rythme correct. Ajoutez 1 mini-mock (1 partie de CE) cette semaine.";
      host.innerHTML =
        '<div class="wk-card">' +
          '<div class="wk-row">' +
            '<div class="wk-days">' + week.map((w) => '<span class="wk-day ' + (w.on ? "on" : "") + '" title="' + w.d + '">' + w.label + '</span>').join("") + '</div>' +
            '<div class="wk-stats">' +
              '<span class="wk-stat"><strong>' + active + '</strong>/7 j actifs</span>' +
              '<span class="wk-stat">+' + errAdded + ' err</span>' +
              '<span class="wk-stat">' + errReviewed + ' err revues</span>' +
              '<span class="wk-stat">Δ CO 4 derniers mocks : ' + (trend > 0 ? "+" : "") + trend + '</span>' +
            '</div>' +
          '</div>' +
          '<div class="wk-advice">' + advice + '</div>' +
        '</div>';
    }
    render();
  }

  // ---------- 47. Synonyms / antonyms drill ------------------------
  // Markup: <div class="tcf-syn" data-set="b2"></div>
  // Data: window.TCF.synonyms[key] = [{ word, options:[..], a, kind:"syn"|"ant", why? }]
  window.TCF.synonyms = window.TCF.synonyms || {};
  onPage(() => { document.querySelectorAll(".tcf-syn[data-set]").forEach(mountSyn); });
  function mountSyn(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const key = host.dataset.set;
    const data = window.TCF.synonyms[key];
    if (!data || !data.length) { host.innerHTML = '<p style="opacity:.7">Lot introuvable.</p>'; return; }
    const SK = "syn:" + key;
    const state = ls.get(SK, { score: 0, plays: 0 });
    let order = shuffle(data.map((_, i) => i)); let i = 0;
    function render() {
      const it = data[order[i]];
      host.innerHTML =
        '<div class="li-head"><span class="li-pos">' + (i + 1) + ' / ' + order.length + '</span><span class="li-score">✓ ' + state.score + '</span></div>' +
        '<div class="sy-q"><span class="sy-tag">' + (it.kind === "ant" ? "Antonyme" : "Synonyme") + '</span> de <strong>' + escapeHtml(it.word) + '</strong></div>' +
        '<div class="sy-opts">' + it.options.map((o, oi) => '<button class="tcf-btn sy-opt" data-k="' + oi + '">' + escapeHtml(o) + '</button>').join("") + '</div>' +
        '<div class="sy-fb"></div>';
      host.querySelectorAll(".sy-opt").forEach((b) => b.addEventListener("click", () => {
        const k = parseInt(b.dataset.k);
        const ok = k === it.a;
        if (ok) state.score++;
        state.plays++; ls.set(SK, state);
        b.classList.add(ok ? "is-correct" : "is-wrong");
        if (!ok) host.querySelector('[data-k="' + it.a + '"]').classList.add("is-correct-soft");
        try { TCF.sfx && TCF.sfx.play(ok ? "correct" : "wrong"); } catch(e){}
        host.querySelector(".sy-fb").innerHTML =
          '<div class="' + (ok ? "sb-ok" : "sb-bad") + '">' + (ok ? "✓ Bonne réponse." : "✗ Bonne réponse : " + escapeHtml(it.options[it.a]) + ".") + (it.why ? ' <em>' + escapeHtml(it.why) + '</em>' : '') + '</div>' +
          '<button class="tcf-btn primary sy-next">Suivant →</button>';
        host.querySelector(".sy-next").addEventListener("click", () => { i = (i + 1) % order.length; if (i === 0) order = shuffle(data.map((_, k) => k)); render(); });
      }));
    }
    render();
  }

  // ---------- 48. Sound effects (toggleable) + Settings panel ------
  const SFX = (function () {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    let ctx = null;
    function ensure() { if (!ctx && Ctx) ctx = new Ctx(); return ctx; }
    function tone(freq, dur, type, vol) {
      const c = ensure(); if (!c) return;
      const o = c.createOscillator(); const g = c.createGain();
      o.type = type || "sine"; o.frequency.value = freq;
      g.gain.value = 0; g.gain.linearRampToValueAtTime((vol || 0.06), c.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
      o.connect(g); g.connect(c.destination);
      o.start(); o.stop(c.currentTime + dur + 0.02);
    }
    return {
      enabled() { return !!ls.get("settings:sound", false); },
      enable(v) { ls.set("settings:sound", !!v); },
      play(kind) {
        if (!this.enabled()) return;
        try {
          if (kind === "correct") { tone(880, 0.10, "sine", 0.08); setTimeout(() => tone(1320, 0.12, "sine", 0.07), 70); }
          else if (kind === "wrong") { tone(220, 0.16, "square", 0.06); }
          else if (kind === "win") { tone(660, 0.10, "sine", 0.06); setTimeout(() => tone(880, 0.10, "sine", 0.06), 90); setTimeout(() => tone(1320, 0.14, "sine", 0.08), 180); }
          else if (kind === "good") { tone(740, 0.10, "sine", 0.06); setTimeout(() => tone(990, 0.12, "sine", 0.06), 90); }
          else if (kind === "ok") { tone(520, 0.10, "sine", 0.05); }
          else if (kind === "badge") { tone(660, 0.08, "triangle", 0.07); setTimeout(() => tone(990, 0.10, "triangle", 0.07), 70); setTimeout(() => tone(1320, 0.18, "triangle", 0.08), 160); }
        } catch (e) {}
      }
    };
  })();
  window.TCF.sfx = SFX;

  onPage(() => { document.querySelectorAll(".tcf-settings").forEach(mountSettings); });
  function mountSettings(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    function bytesOfLs() {
      let n = 0; try { Object.keys(localStorage).filter((k) => k.startsWith(LS_PREFIX)).forEach((k) => n += k.length + (localStorage.getItem(k) || "").length); } catch(_){}
      return n;
    }
    function render() {
      const sound = SFX.enabled();
      const motion = !!ls.get("settings:motion", false);
      const wide = !!ls.get("settings:wide", false);
      const bytes = bytesOfLs();
      host.innerHTML =
        '<div class="st-grid">' +
          '<label class="st-row"><span><strong>Sons d\'interaction</strong><br><small>Bips légers sur ✓/✗/✓✓ (Web Audio).</small></span><input type="checkbox" class="st-sound"' + (sound ? " checked" : "") + ' /></label>' +
          '<label class="st-row"><span><strong>Réduire les animations</strong><br><small>Désactive confettis et transitions douces.</small></span><input type="checkbox" class="st-motion"' + (motion ? " checked" : "") + ' /></label>' +
          '<label class="st-row"><span><strong>Mise en page large</strong><br><small>Étend la colonne de contenu sur écrans larges.</small></span><input type="checkbox" class="st-wide"' + (wide ? " checked" : "") + ' /></label>' +
          '<div class="st-row"><span><strong>Stockage local utilisé</strong><br><small>~ ' + Math.round(bytes / 1024) + ' Ko sur le quota du navigateur (~ 5 Mo).</small></span><button class="tcf-btn st-export">📥 Exporter tout (JSON)</button></div>' +
          '<div class="st-row"><span><strong>Importer un export</strong><br><small>Restaure scores, streak, journaux. Fusion avec l\'existant.</small></span><label class="tcf-btn">📤 Importer<input type="file" class="st-import" accept="application/json" style="display:none" /></label></div>' +
          '<div class="st-row danger"><span><strong>Tout effacer</strong><br><small>Supprime <em>toutes</em> les clés <code>tcf:</code>. Irréversible.</small></span><button class="tcf-btn st-wipe">🗑 Effacer tout</button></div>' +
        '</div>';
      host.querySelector(".st-sound").addEventListener("change", (e) => { SFX.enable(e.target.checked); if (e.target.checked) SFX.play("correct"); });
      host.querySelector(".st-motion").addEventListener("change", (e) => {
        ls.set("settings:motion", !!e.target.checked);
        document.documentElement.classList.toggle("tcf-no-motion", !!e.target.checked);
      });
      host.querySelector(".st-wide").addEventListener("change", (e) => {
        ls.set("settings:wide", !!e.target.checked);
        document.documentElement.classList.toggle("tcf-wide", !!e.target.checked);
      });
      host.querySelector(".st-export").addEventListener("click", () => {
        const dump = {};
        try { Object.keys(localStorage).filter((k) => k.startsWith(LS_PREFIX)).forEach((k) => dump[k] = localStorage.getItem(k)); } catch(_){}
        const blob = new Blob([JSON.stringify(dump, null, 2)], { type: "application/json" });
        const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "tcf-export-" + new Date().toISOString().slice(0,10) + ".json"; a.click();
      });
      host.querySelector(".st-import").addEventListener("change", (e) => {
        const f = e.target.files && e.target.files[0]; if (!f) return;
        const r = new FileReader();
        r.onload = () => {
          try {
            const obj = JSON.parse(r.result);
            Object.keys(obj).forEach((k) => { if (k.startsWith(LS_PREFIX)) localStorage.setItem(k, obj[k]); });
            try { TCF.toast("Import réussi."); } catch(_){}
            render();
          } catch (err) { try { TCF.toast("Import échoué : JSON invalide."); } catch(_){} }
        };
        r.readAsText(f);
      });
      host.querySelector(".st-wipe").addEventListener("click", () => {
        if (!confirm("Effacer TOUTES les données TCF du navigateur ? Cette action est irréversible.")) return;
        try { Object.keys(localStorage).filter((k) => k.startsWith(LS_PREFIX)).forEach((k) => localStorage.removeItem(k)); } catch(_){}
        try { TCF.toast("Tout effacé."); } catch(_){}
        render();
      });
    }
    // Restore session preferences on load
    if (ls.get("settings:motion", false)) document.documentElement.classList.add("tcf-no-motion");
    if (ls.get("settings:wide", false)) document.documentElement.classList.add("tcf-wide");
    render();
  }
  // Always restore prefs even if no settings widget on page
  onPage(() => {
    if (ls.get("settings:motion", false)) document.documentElement.classList.add("tcf-no-motion");
    if (ls.get("settings:wide", false)) document.documentElement.classList.add("tcf-wide");
  });

  // ---------- 49. PWA registration ----------------------------------
  // Registers ./sw.js if available. Fails silently when offline-mode missing.
  (function registerSW() {
    if (!("serviceWorker" in navigator)) return;
    if (location.protocol === "file:") return;
    // Compute base path relative to site root for GH Pages subpath compatibility
    const seg = location.pathname.split("/").filter(Boolean);
    // Try plausible site roots: current dir, /, /tcf_materials/
    const swCandidates = [];
    if (location.pathname.endsWith("/")) swCandidates.push(location.pathname + "sw.js");
    swCandidates.push(location.pathname.replace(/[^/]+$/, "") + "sw.js");
    // De-duplicate
    const tried = new Set();
    function tryNext() {
      const url = swCandidates.shift();
      if (!url || tried.has(url)) return;
      tried.add(url);
      navigator.serviceWorker.register(url).then(() => {}, () => { tryNext(); });
    }
    window.addEventListener("load", tryNext);
  })();

  // ---------- 50. Touch swipe on flashcards ------------------------
  // Adds left/right swipe → "Again"/"Good" on .fc-card / .tcf-flashcards
  onPage(() => {
    document.querySelectorAll(".tcf-flashcards, .fc-card").forEach((el) => {
      if (el.dataset.swipeBound) return;
      el.dataset.swipeBound = "1";
      let sx = 0, sy = 0;
      el.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
      el.addEventListener("touchend", (e) => {
        const t = e.changedTouches[0]; const dx = t.clientX - sx; const dy = t.clientY - sy;
        if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy)) return;
        if (dx > 0) { const b = el.querySelector('.fc-grade[data-g="good"]') || el.querySelector('.fc-grade'); if (b) b.click(); }
        else { const b = el.querySelector('.fc-grade[data-g="again"]'); if (b) b.click(); }
      }, { passive: true });
    });
  });

  // ---------- 51. Animated number counter helper -------------------
  // Markup: <span class="tcf-counter" data-to="503" data-prefix="" data-suffix=""></span>
  onPage(() => {
    const els = document.querySelectorAll(".tcf-counter[data-to]");
    if (!els.length) return;
    const io = new IntersectionObserver((rows) => {
      rows.forEach((r) => {
        if (!r.isIntersecting || r.target.dataset.ran) return;
        r.target.dataset.ran = "1";
        const to = parseFloat(r.target.dataset.to) || 0;
        const dur = parseInt(r.target.dataset.ms || "900", 10);
        const t0 = performance.now();
        const pfx = r.target.dataset.prefix || ""; const sfx = r.target.dataset.suffix || "";
        const step = () => {
          const k = Math.min(1, (performance.now() - t0) / dur);
          const e = 1 - Math.pow(1 - k, 3);
          r.target.textContent = pfx + Math.round(e * to).toLocaleString("fr-FR") + sfx;
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    els.forEach((e) => io.observe(e));
  });

  // Extend palette with v1.3 entries
  if (Array.isArray(PALETTE_ITEMS)) {
    PALETTE_ITEMS.push(
      { id: "ce_train", title: "Entraîneur CE — lecture chronométrée (v1.3)",   hint: "",    href: "11_tools/ce-entraineur/" },
      { id: "co_train", title: "Entraîneur CO — écoute QCM (v1.3)",              hint: "",    href: "11_tools/co-entraineur/" },
      { id: "liaison",  title: "Liaisons & élisions (v1.3)",                     hint: "",    href: "11_tools/liaisons/" },
      { id: "builder",  title: "Construire la phrase (v1.3)",                    hint: "",    href: "11_tools/constructeur/" },
      { id: "goal",     title: "Objectif & compte à rebours (v1.3)",             hint: "g g", href: "11_tools/objectif/" },
      { id: "badges",   title: "Badges / accomplissements (v1.3)",               hint: "",    href: "11_tools/badges/" },
      { id: "weekly",   title: "Revue hebdo (v1.3)",                              hint: "",    href: "11_tools/hebdo/" },
      { id: "syn",      title: "Synonymes / antonymes B2 (v1.3)",                 hint: "",    href: "11_tools/synonymes/" },
      { id: "settings", title: "Paramètres (son, motion, export…) (v1.3)",        hint: "",    href: "11_tools/parametres/" }
    );
  }

  // Mark today active also on v1.3 widgets
  document.addEventListener("click", (e) => {
    const t = e.target; if (!t || !t.matches) return;
    if (t.matches(".sy-opt, .co-opt, .sb-check, .li-ok, .li-bad, .ce-opt input, .ce-pg")) {
      try {
        const k = new Date().toISOString().slice(0, 10);
        const days = ls.get("streak:days", {}) || {};
        if (!days[k]) { days[k] = 1; ls.set("streak:days", days); }
      } catch(_){}
    }
  });

  // =================================================================
  // v1.4 — Recorder + simulator + drills + daily (2026-05-30)
  // =================================================================
  // 52. EO recorder — MediaRecorder + playback + self-grade            .tcf-eo-recorder
  // 53. EE simulator — full timer + 3 tasks + autosave + word count   .tcf-ee-sim
  // 54. PC vs imparfait drill                                          .tcf-tense[data-set]
  // 55. Pronouns drill (y/en/le/la/lui/leur)                           .tcf-pronouns[data-set]
  // 56. Daily challenge (5 mixed items per day)                        .tcf-daily
  // 57. Phrase of the day (B2 rotation)                                .tcf-phrase
  // 58. WPM history sparkline                                          .tcf-wpm-history
  // 59. CECRL ↔ NCLC equivalence visualizer                            .tcf-equiv
  // 60. Yearly heatmap (12-month view)                                 .tcf-year-heatmap

  // ---------- 52. EO recorder ---------------------------------------
  onPage(() => { document.querySelectorAll(".tcf-eo-recorder").forEach(mountEoRec); });

  function mountEoRec(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const SK = "eo:recs";
    const recs = ls.get(SK, []) || [];
    let media = null, chunks = [], stream = null, startTs = 0, timerId = null;
    let lastBlob = null, lastUrl = null;

    function fmtSec(s) { const m = Math.floor(s/60); const r = Math.floor(s%60); return m + ":" + (r<10?"0":"") + r; }

    const banksEO = (window.TCF && window.TCF.eoPrompts) || { t1: [], t2: [], t3: [] };
    let currentTask = ls.get("eo:lastTask", "T2");
    let currentPromptId = null;
    function promptsFor(task) { return banksEO[task.toLowerCase()] || []; }
    function pickPrompt(task) {
      const arr = promptsFor(task);
      if (!arr.length) return null;
      // rotate from previously used
      let idx = 0;
      if (currentPromptId) {
        const j = arr.findIndex((p) => p.id === currentPromptId);
        idx = j >= 0 ? (j + 1) % arr.length : 0;
      } else {
        idx = Math.floor(Math.random() * arr.length);
      }
      currentPromptId = arr[idx].id;
      return arr[idx];
    }

    function renderIntro(msg) {
      const prompts = promptsFor(currentTask);
      const p = prompts.find((q) => q.id === currentPromptId) || (prompts.length ? prompts[0] : null);
      if (p) currentPromptId = p.id;
      host.innerHTML =
        '<div class="er-head">' +
          '<select class="er-task" aria-label="Tâche EO">' +
            '<option value="T1"' + (currentTask === "T1" ? " selected" : "") + '>T1 (~ 1 min 30) — interview / questions à poser</option>' +
            '<option value="T2"' + (currentTask === "T2" ? " selected" : "") + '>T2 (~ 3 min) — présentation guidée</option>' +
            '<option value="T3"' + (currentTask === "T3" ? " selected" : "") + '>T3 (~ 5 min) — défendre un point de vue</option>' +
          '</select>' +
          '<button class="tcf-btn er-newprompt">🎲 Autre prompt</button>' +
        '</div>' +
        (p ? '<div class="er-prompt">' +
          '<div class="er-prompt-title"><strong>' + escapeHtml(p.title || p.id) + '</strong>' +
            (p.refUrl ? ' · <a href="' + p.refUrl + '" target="_blank" rel="noopener">pilote ' + escapeHtml(p.id) + '</a>' : '') + '</div>' +
          '<div class="er-prompt-body">' + escapeHtml(p.consigne) + '</div>' +
          (p.duration ? '<div class="er-prompt-meta">Durée cible : <strong>' + escapeHtml(p.duration) + '</strong>' + (p.prep ? ' · Préparation : ' + escapeHtml(p.prep) : '') + '</div>' : '') +
        '</div>' : '<div class="er-prompt"><em>Aucun prompt chargé — voyez la <a href="../../06_speaking/" target="_blank" rel="noopener">bank EO</a>.</em></div>') +
        '<div class="er-time">' + (msg || "Prêt") + '</div>' +
        '<div class="er-controls">' +
          '<button class="tcf-btn primary er-rec">● Enregistrer</button>' +
          '<button class="tcf-btn er-stop" disabled>■ Stop</button>' +
          '<button class="tcf-btn er-play" disabled>▶ Lire</button>' +
          '<button class="tcf-btn er-dl" disabled>⤓ Télécharger</button>' +
        '</div>' +
        '<audio class="er-audio" controls style="display:none;width:100%;margin-top:.5rem"></audio>' +
        '<div class="er-grade" style="display:none"></div>' +
        '<details class="er-hist"><summary>Historique (' + recs.length + ' enregistrement(s) gradés)</summary><div class="er-list"></div></details>';
      bind();
      drawHistory();
    }
    function bind() {
      host.querySelector(".er-task").addEventListener("change", (e) => {
        currentTask = e.target.value; currentPromptId = null;
        ls.set("eo:lastTask", currentTask); renderIntro();
      });
      host.querySelector(".er-newprompt").addEventListener("click", () => {
        pickPrompt(currentTask); renderIntro();
      });
      host.querySelector(".er-rec").addEventListener("click", start);
      host.querySelector(".er-stop").addEventListener("click", stop);
      host.querySelector(".er-play").addEventListener("click", () => { if (lastUrl) { const a = host.querySelector(".er-audio"); a.src = lastUrl; a.style.display = "block"; a.play(); } });
      host.querySelector(".er-dl").addEventListener("click", () => {
        if (!lastBlob) return;
        const a = document.createElement("a"); a.href = lastUrl; a.download = "eo-" + new Date().toISOString().slice(0,19).replace(/[:T]/g,"-") + ".webm"; a.click();
      });
    }
    async function start() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        try { TCF.toast("Microphone non disponible dans ce navigateur."); } catch(_){}; return;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (e) { try { TCF.toast("Accès microphone refusé."); } catch(_){}; return; }
      try {
        const mt = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "audio/webm";
        media = new MediaRecorder(stream, { mimeType: mt });
      } catch (e) {
        try { media = new MediaRecorder(stream); } catch (e2) { try { TCF.toast("MediaRecorder indisponible."); } catch(_){}; return; }
      }
      chunks = [];
      media.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
      media.onstop = onStopped;
      media.start();
      startTs = Date.now();
      host.querySelector(".er-rec").disabled = true;
      host.querySelector(".er-stop").disabled = false;
      timerId = setInterval(() => {
        const s = Math.floor((Date.now() - startTs) / 1000);
        const t = host.querySelector(".er-time");
        if (t) t.textContent = "● Enregistrement : " + fmtSec(s);
      }, 500);
    }
    function stop() {
      if (!media || media.state === "inactive") return;
      try { media.stop(); } catch(_){}
      try { stream.getTracks().forEach((t) => t.stop()); } catch(_){}
      clearInterval(timerId); timerId = null;
    }
    function onStopped() {
      lastBlob = new Blob(chunks, { type: chunks[0] && chunks[0].type || "audio/webm" });
      if (lastUrl) try { URL.revokeObjectURL(lastUrl); } catch(_){}
      lastUrl = URL.createObjectURL(lastBlob);
      const dur = Math.floor((Date.now() - startTs) / 1000);
      const a = host.querySelector(".er-audio"); a.src = lastUrl; a.style.display = "block";
      host.querySelector(".er-rec").disabled = false;
      host.querySelector(".er-stop").disabled = true;
      host.querySelector(".er-play").disabled = false;
      host.querySelector(".er-dl").disabled = false;
      host.querySelector(".er-time").textContent = "Durée : " + fmtSec(dur);
      renderGrade(dur);
    }
    function renderGrade(durSec) {
      const g = host.querySelector(".er-grade");
      g.style.display = "block";
      g.innerHTML =
        '<h4>Auto-grade — rubrique EO (4 critères × 5 pts)</h4>' +
        '<p style="font-size:.85rem;opacity:.75">Écoutez-vous, cochez honnêtement. Conservé localement.</p>' +
        '<div class="er-rubric">' +
          rubricRow("fluence",     "Fluence / débit",      ["pauses < 3 s, débit constant", "1-2 hésitations longues", "≥ 3 pauses > 3 s ou débit trop lent"]) +
          rubricRow("phonologie",  "Phonologie / liaisons", ["liaisons OK, prononciation claire", "1 série de liaisons absentes ou nasales floues", "intelligibilité menacée à 2+ endroits"]) +
          rubricRow("lexique",     "Lexique B2",            ["≥ 2 mots B2 ciblés, 0 répétition flagrante", "1 répétition / vocabulaire B1 pur", "vocabulaire pauvre, anglicismes"]) +
          rubricRow("syntaxe",     "Syntaxe / connecteurs", ["≥ 2 connecteurs B2 (cependant, par conséquent…)", "1 connecteur ou structures simples", "phrases courtes sans cohésion"]) +
        '</div>' +
        '<div class="er-total"></div>' +
        '<div class="er-actions">' +
          '<button class="tcf-btn primary er-save">💾 Enregistrer le grading</button>' +
          '<button class="tcf-btn er-discard">↺ Recommencer</button>' +
        '</div>';
      function recompute() {
        let total = 0; const out = {};
        host.querySelectorAll(".er-rad").forEach((r) => { if (r.checked) { total += parseInt(r.value); out[r.name] = parseInt(r.value); } });
        host.querySelector(".er-total").innerHTML = '<strong>Total : ' + total + ' / 20</strong> · NCLC indicatif ≈ ' + (total >= 18 ? "9-10" : total >= 14 ? "7-8" : total >= 10 ? "5-6" : "≤ 4");
      }
      host.querySelectorAll(".er-rad").forEach((r) => r.addEventListener("change", recompute));
      host.querySelector(".er-save").addEventListener("click", () => {
        let total = 0; const detail = {};
        host.querySelectorAll(".er-rad").forEach((r) => { if (r.checked) { total += parseInt(r.value); detail[r.name] = parseInt(r.value); } });
        if (!Object.keys(detail).length) { try { TCF.toast("Cochez la rubrique d'abord."); } catch(_){}; return; }
        const entry = { ts: Date.now(), task: host.querySelector(".er-task").value, promptId: currentPromptId, durSec, total, detail };
        recs.push(entry); ls.set(SK, recs);
        try { TCF.toast("Grading enregistré."); } catch(_){}
        try { TCF.badges && TCF.badges.check({ ee: { allGreen: total >= 16 } }); } catch(_){}
        renderIntro("Prêt — derniers gradings : " + recs.length);
      });
      host.querySelector(".er-discard").addEventListener("click", () => renderIntro());
      recompute();
    }
    function rubricRow(key, label, levels) {
      return '<div class="er-row"><div class="er-lbl"><strong>' + escapeHtml(label) + '</strong></div>' +
        '<label><input type="radio" class="er-rad" name="' + key + '" value="5" /> 5 — ' + escapeHtml(levels[0]) + '</label>' +
        '<label><input type="radio" class="er-rad" name="' + key + '" value="3" /> 3 — ' + escapeHtml(levels[1]) + '</label>' +
        '<label><input type="radio" class="er-rad" name="' + key + '" value="1" /> 1 — ' + escapeHtml(levels[2]) + '</label>' +
      '</div>';
    }
    function drawHistory() {
      const list = host.querySelector(".er-list");
      if (!list) return;
      if (!recs.length) { list.innerHTML = '<p style="opacity:.7">Aucun grading encore.</p>'; return; }
      list.innerHTML = recs.slice().reverse().slice(0, 30).map((r) => {
        return '<div class="er-hrow"><span>' + new Date(r.ts).toLocaleString("fr-FR") + '</span>' +
          '<span class="er-task-tag">' + r.task + (r.promptId ? ' · ' + escapeHtml(r.promptId) : '') + '</span>' +
          '<span class="er-dur">' + fmtSec(r.durSec || 0) + '</span>' +
          '<span class="er-score"><strong>' + r.total + '</strong>/20</span></div>';
      }).join("");
    }
    renderIntro();
  }

  // ---------- 53. EE simulator (full 60 min + 3 tasks) -------------
  onPage(() => { document.querySelectorAll(".tcf-ee-sim").forEach(mountEeSim); });

  function mountEeSim(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const SK = "ee:sim";
    const state = ls.get(SK, { task: 0, t1: "", t2: "", t3: "", started: 0, ended: 0, runs: [], promptIds: null });
    const banks = (window.TCF && window.TCF.eePrompts) || { t1: [], t2: [], t3: [] };
    function pickPrompts() {
      function rnd(arr) { return arr.length ? arr[Math.floor(Math.random() * arr.length)] : null; }
      return { t1: rnd(banks.t1), t2: rnd(banks.t2), t3: rnd(banks.t3) };
    }
    function loadTasks() {
      const ids = state.promptIds || pickPrompts();
      state.promptIds = ids;
      const find = (arr, id) => (arr || []).find((p) => p.id === id) || null;
      const safe = (p, fb) => p || { id: "stub", title: fb.title, prompt: fb.prompt, refLabel: "(corpus indisponible)", refUrl: "11_tools/ee-simulation/" };
      return [
        { id: "t1", label: "T1", lo: 60,  hi: 120, p: safe(typeof ids.t1 === "string" ? find(banks.t1, ids.t1) : ids.t1,
            { title: "Message court (60-120 mots, ~ 10 min)", prompt: "Pas de prompt corpus chargé — voyez la bank EE.", refUrl: "../../05_writing/" }) },
        { id: "t2", label: "T2", lo: 120, hi: 150, p: safe(typeof ids.t2 === "string" ? find(banks.t2, ids.t2) : ids.t2,
            { title: "Courrier formel (120-150 mots, ~ 20 min)", prompt: "", refUrl: "../../05_writing/" }) },
        { id: "t3", label: "T3", lo: 180, hi: 300, p: safe(typeof ids.t3 === "string" ? find(banks.t3, ids.t3) : ids.t3,
            { title: "Essai argumentatif (180+ mots, ~ 30 min)", prompt: "", refUrl: "../../05_writing/" }) },
      ].map((t) => ({ id: t.id, label: t.label, lo: t.lo, hi: t.hi, title: t.p.title, prompt: t.p.prompt, refLabel: t.p.refLabel || t.p.id, refUrl: t.p.refUrl }));
    }
    let tasks = loadTasks();
    let timerId = null;

    function fmt(rem) { const m = Math.floor(rem/60000); const s = Math.floor((rem%60000)/1000); return m + ":" + (s<10?"0":"") + s; }

    function start() {
      state.promptIds = pickPrompts();
      tasks = loadTasks();
      state.started = Date.now(); state.ended = state.started + 60*60*1000;
      state.task = 0; state.t1 = ""; state.t2 = ""; state.t3 = "";
      ls.set(SK, state); render();
    }
    function resume() { tasks = loadTasks(); render(); }
    function finish() {
      if (timerId) { clearInterval(timerId); timerId = null; }
      const wc = (s) => (s||"").trim().split(/\s+/).filter(Boolean).length;
      const detail = { t1: wc(state.t1), t2: wc(state.t2), t3: wc(state.t3) };
      state.runs = (state.runs || []).concat([{ ts: Date.now(), detail }]).slice(-10);
      state.started = 0; state.ended = 0;
      ls.set(SK, state);
      try { TCF.sfx && TCF.sfx.play("win"); } catch(_){}
      summary(detail);
    }
    function summary(d) {
      host.innerHTML =
        '<div class="es-summary">' +
          '<h3>Simulation terminée</h3>' +
          '<div class="es-bars">' +
            bar("T1", d.t1, 60, 120) +
            bar("T2", d.t2, 120, 150) +
            bar("T3", d.t3, 180, 300) +
          '</div>' +
          '<p style="margin-top:.7rem">Pour un retour heuristique sur chaque tâche, collez-la dans <a href="11_tools/ee-feedback/">auto-feedback EE</a>.</p>' +
          '<div class="es-actions"><button class="tcf-btn primary es-new">Refaire</button> <button class="tcf-btn es-export">⤓ Exporter (txt)</button></div>' +
        '</div>';
      host.querySelector(".es-new").addEventListener("click", reset);
      host.querySelector(".es-export").addEventListener("click", () => {
        const txt = "TCF EE — simulation " + new Date().toLocaleString("fr-FR") + "\n\n=== T1 ===\n" + (state.t1||"") + "\n\n=== T2 ===\n" + (state.t2||"") + "\n\n=== T3 ===\n" + (state.t3||"") + "\n";
        const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([txt], { type: "text/plain" })); a.download = "ee-sim.txt"; a.click();
      });
    }
    function bar(label, n, lo, hi) {
      const status = n < lo ? "warn" : n > hi + 80 ? "warn" : "ok";
      return '<div class="es-bar es-' + status + '"><span class="es-l">' + label + '</span>' +
        '<span class="es-n">' + n + ' mots</span>' +
        '<span class="es-r">cible ' + lo + '-' + hi + '</span></div>';
    }
    function reset() {
      if (!confirm("Effacer les 3 brouillons et redémarrer ?")) return;
      state.t1 = ""; state.t2 = ""; state.t3 = "";
      state.started = 0; state.ended = 0; state.promptIds = null;
      ls.set(SK, state); renderIntro();
    }
    function renderIntro() {
      tasks = loadTasks();
      host.innerHTML =
        '<div class="es-intro">' +
          '<h3>Simulation TCF EE — 60 min, 3 tâches</h3>' +
          '<p style="font-size:.88rem;opacity:.85">Prompts tirés au hasard à chaque démarrage parmi les <strong>9 pilotes audités</strong> du corpus (3 par tâche). Le minuteur global ne s\'arrête pas. Tout est sauvegardé en temps réel.</p>' +
          '<ul class="es-tasklist">' +
            '<li><strong>T1 (10 min, 60-120 mots)</strong> — ' + escapeHtml(tasks[0].title) + '</li>' +
            '<li><strong>T2 (20 min, 120-150 mots)</strong> — ' + escapeHtml(tasks[1].title) + '</li>' +
            '<li><strong>T3 (30 min, 180-300 mots)</strong> — ' + escapeHtml(tasks[2].title) + '</li>' +
          '</ul>' +
          '<div class="es-actions">' +
            '<button class="tcf-btn primary es-start">▶ Démarrer 60 min</button>' +
            '<button class="tcf-btn es-shuffle">🎲 Retirer 3 prompts</button>' +
          '</div>' +
        '</div>';
      host.querySelector(".es-start").addEventListener("click", start);
      host.querySelector(".es-shuffle").addEventListener("click", () => { state.promptIds = pickPrompts(); ls.set(SK, state); renderIntro(); });
    }
    function tick() {
      const rem = Math.max(0, state.ended - Date.now());
      const el = host.querySelector(".es-time"); if (el) { el.textContent = fmt(rem); el.classList.toggle("is-low", rem < 5*60*1000); }
      if (rem <= 0) finish();
    }
    function render() {
      const t = tasks[state.task];
      const cur = state[t.id] || "";
      const wc = cur.trim().split(/\s+/).filter(Boolean).length;
      host.innerHTML =
        '<div class="es-bar-top">' +
          '<span class="es-time">--:--</span>' +
          '<div class="es-tabs">' +
            tasks.map((tt, i) => '<button class="es-tab ' + (i === state.task ? "on" : "") + '" data-i="' + i + '">' + tt.label + '</button>').join("") +
          '</div>' +
          '<button class="tcf-btn es-finish">✓ Terminer</button>' +
        '</div>' +
        '<div class="es-prompt"><strong>' + escapeHtml(t.title) + '</strong><br><br>' + escapeHtml(t.prompt) +
          (t.refLabel && t.refUrl ? '<div class="es-ref"><small>Pilote corpus : <a href="' + t.refUrl + '" target="_blank" rel="noopener">' + escapeHtml(t.refLabel) + '</a> (modèles 3 niveaux disponibles après la session)</small></div>' : '') +
        '</div>' +
        '<textarea class="es-text" rows="14" placeholder="Tapez votre réponse ici…">' + escapeHtml(cur) + '</textarea>' +
        '<div class="es-foot"><span class="es-wc">' + wc + ' mots</span>' +
          '<span class="es-target">cible ' + (t.id==='t1'?'60-120':t.id==='t2'?'120-150':'180-300') + '</span></div>';
      const ta = host.querySelector(".es-text");
      ta.value = cur;
      ta.addEventListener("input", () => {
        state[t.id] = ta.value; ls.set(SK, state);
        host.querySelector(".es-wc").textContent = ta.value.trim().split(/\s+/).filter(Boolean).length + " mots";
      });
      host.querySelectorAll(".es-tab").forEach((b) => b.addEventListener("click", () => { state.task = parseInt(b.dataset.i); ls.set(SK, state); render(); }));
      host.querySelector(".es-finish").addEventListener("click", () => { if (confirm("Terminer la simulation maintenant ?")) finish(); });
      if (timerId) clearInterval(timerId);
      tick(); timerId = setInterval(tick, 500);
    }
    if (state.started && Date.now() < state.ended) resume();
    else renderIntro();
  }

  // ---------- 54. PC vs imparfait drill ----------------------------
  // window.TCF.tenseDrills[key] = [{ stem, options:["pc","imp"], a:0|1, why }]
  window.TCF.tenseDrills = window.TCF.tenseDrills || {};
  onPage(() => { document.querySelectorAll(".tcf-tense[data-set]").forEach(mountTense); });

  function mountTense(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const key = host.dataset.set;
    const data = window.TCF.tenseDrills[key];
    if (!data || !data.length) { host.innerHTML = '<p style="opacity:.7">Lot introuvable.</p>'; return; }
    const SK = "tn:" + key;
    const state = ls.get(SK, { score: 0, plays: 0, weak: {} });
    let order = shuffle(data.map((_, i) => i)); let i = 0;
    function render() {
      const it = data[order[i]];
      host.innerHTML =
        '<div class="li-head"><span class="li-pos">' + (i+1) + ' / ' + order.length + '</span><span class="li-score">✓ ' + state.score + ' · ' + state.plays + ' joués</span></div>' +
        '<div class="tn-stem">' + escapeHtml(it.stem) + '</div>' +
        '<div class="tn-opts">' +
          '<button class="tcf-btn tn-opt" data-k="0">' + escapeHtml(it.options[0]) + '</button>' +
          '<button class="tcf-btn tn-opt" data-k="1">' + escapeHtml(it.options[1]) + '</button>' +
        '</div>' +
        '<div class="tn-fb"></div>';
      host.querySelectorAll(".tn-opt").forEach((b) => b.addEventListener("click", () => {
        const k = parseInt(b.dataset.k);
        const ok = k === it.a;
        if (ok) state.score++;
        state.plays++;
        const wk = state.weak[it.stem] = (state.weak[it.stem] || 0) + (ok ? -1 : 1);
        if (wk <= -2) delete state.weak[it.stem];
        ls.set(SK, state);
        b.classList.add(ok ? "is-correct" : "is-wrong");
        if (!ok) host.querySelector('[data-k="' + it.a + '"]').classList.add("is-correct-soft");
        try { TCF.sfx && TCF.sfx.play(ok ? "correct" : "wrong"); } catch(_){}
        host.querySelector(".tn-fb").innerHTML =
          '<div class="' + (ok ? "sb-ok" : "sb-bad") + '">' +
            (ok ? "✓ Bonne réponse." : "✗ Bonne réponse : " + escapeHtml(it.options[it.a]) + ".") +
            (it.why ? ' <em>' + escapeHtml(it.why) + '</em>' : '') +
          '</div>' +
          '<button class="tcf-btn primary tn-next">Suivant →</button>';
        host.querySelector(".tn-next").addEventListener("click", () => { i = (i+1) % order.length; if (i === 0) order = shuffle(data.map((_, k) => k)); render(); });
      }));
    }
    render();
  }

  // ---------- 55. Pronouns drill (y/en/le/la/lui/leur) -------------
  window.TCF.pronouns = window.TCF.pronouns || {};
  onPage(() => { document.querySelectorAll(".tcf-pronouns[data-set]").forEach(mountPronouns); });

  function mountPronouns(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const key = host.dataset.set;
    const data = window.TCF.pronouns[key];
    if (!data || !data.length) { host.innerHTML = '<p style="opacity:.7">Lot introuvable.</p>'; return; }
    const SK = "pn:" + key;
    const state = ls.get(SK, { score: 0, plays: 0 });
    let order = shuffle(data.map((_, i) => i)); let i = 0;
    function render() {
      const it = data[order[i]];
      host.innerHTML =
        '<div class="li-head"><span class="li-pos">' + (i+1) + ' / ' + order.length + '</span><span class="li-score">✓ ' + state.score + '</span></div>' +
        '<div class="pn-q">' + escapeHtml(it.q) + '</div>' +
        '<div class="pn-opts">' + it.options.map((o, k) => '<button class="tcf-btn pn-opt" data-k="' + k + '">' + escapeHtml(o) + '</button>').join("") + '</div>' +
        '<div class="pn-fb"></div>';
      host.querySelectorAll(".pn-opt").forEach((b) => b.addEventListener("click", () => {
        const k = parseInt(b.dataset.k);
        const ok = k === it.a;
        if (ok) state.score++;
        state.plays++; ls.set(SK, state);
        b.classList.add(ok ? "is-correct" : "is-wrong");
        if (!ok) host.querySelector('[data-k="' + it.a + '"]').classList.add("is-correct-soft");
        try { TCF.sfx && TCF.sfx.play(ok ? "correct" : "wrong"); } catch(_){}
        host.querySelector(".pn-fb").innerHTML =
          '<div class="' + (ok ? "sb-ok" : "sb-bad") + '">' +
            (ok ? "✓ Bonne réponse." : "✗ Bonne réponse : " + escapeHtml(it.options[it.a])) +
            (it.why ? ' <em>' + escapeHtml(it.why) + '</em>' : '') + '</div>' +
          '<button class="tcf-btn primary pn-next">Suivant →</button>';
        host.querySelector(".pn-next").addEventListener("click", () => { i = (i+1) % order.length; if (i === 0) order = shuffle(data.map((_, k) => k)); render(); });
      }));
    }
    render();
  }

  // ---------- 56. Daily challenge -----------------------------------
  // Markup: <div class="tcf-daily"></div>
  // 5 mixed items sourced from cloze, gender, connectors, synonymes, pronouns, tense
  onPage(() => { document.querySelectorAll(".tcf-daily").forEach(mountDaily); });

  function mountDaily(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const SK_PLAY = "daily:played";
    const SK_HIST = "daily:hist";
    const today = new Date().toISOString().slice(0, 10);
    const played = ls.get(SK_PLAY, {}) || {};
    const hist = ls.get(SK_HIST, []) || [];

    function dayHash(d) {
      let h = 0; for (let k = 0; k < d.length; k++) h = ((h << 5) - h + d.charCodeAt(k)) | 0;
      return Math.abs(h);
    }
    function pickItems() {
      const seed = dayHash(today);
      function take(arr, n, off) {
        if (!arr || !arr.length) return [];
        const out = []; const used = new Set();
        for (let k = 0; k < n * 4 && out.length < n; k++) {
          const idx = ((seed * (k + 1) + off * 17) % arr.length + arr.length) % arr.length;
          if (!used.has(idx)) { used.add(idx); out.push(arr[idx]); }
        }
        return out;
      }
      const pool = [];
      // Gender items
      try {
        const all = [];
        Object.keys(window.TCF.gender || {}).forEach((k) => { (window.TCF.gender[k] || []).forEach((it) => all.push({ kind: "gen", it })); });
        take(all, 2, 2).forEach((x) => pool.push(x));
      } catch(_){}
      // Connecteurs
      try {
        const all = (window.TCF.connectors || {}).b2 || [];
        take(all.map((it) => ({ kind: "conn", it })), 1, 3).forEach((x) => pool.push(x));
      } catch(_){}
      // Synonymes
      try {
        const all = (window.TCF.synonyms || {}).b2 || [];
        take(all.map((it) => ({ kind: "syn", it })), 1, 4).forEach((x) => pool.push(x));
      } catch(_){}
      // Tense
      try {
        const all = (window.TCF.tenseDrills || {}).pc_imp || [];
        take(all.map((it) => ({ kind: "tense", it })), 1, 5).forEach((x) => pool.push(x));
      } catch(_){}
      return pool.slice(0, 5);
    }
    function renderItem(item) {
      const { kind, it } = item;
      let q, options, a, why;
      if (kind === "gen") {
        q = "Genre de « " + (it.noun || "?") + " » ?";
        options = ["le / un (masc.)", "la / une (fém.)"];
        a = it.g === "m" ? 0 : 1;
        why = it.hint || "";
      } else if (kind === "conn") {
        q = (it.sentence1 || "") + " ___ " + (it.sentence2 || "");
        options = it.options || ["?", "?"]; a = it.answer ?? 0; why = it.why || "";
      } else if (kind === "syn") {
        q = (it.kind === "ant" ? "Antonyme de « " : "Synonyme de « ") + it.word + " »";
        options = it.options; a = it.a; why = it.why || "";
      } else if (kind === "tense") {
        q = it.stem; options = it.options; a = it.a; why = it.why || "";
      } else {
        q = "?"; options = ["?"]; a = 0;
      }
      return { q, options, a, why };
    }
    function start() {
      let idx = 0; let correct = 0; const items = pickItems();
      function draw() {
        if (idx >= items.length) return finish();
        const info = renderItem(items[idx]);
        host.innerHTML =
          '<div class="dl-head"><span>Défi du jour · ' + today + '</span><span>' + (idx+1) + ' / ' + items.length + ' · ✓ ' + correct + '</span></div>' +
          '<div class="dl-q">' + escapeHtml(info.q) + '</div>' +
          '<div class="dl-opts">' + info.options.map((o, k) => '<button class="tcf-btn dl-opt" data-k="' + k + '">' + escapeHtml(o) + '</button>').join("") + '</div>' +
          '<div class="dl-fb"></div>';
        host.querySelectorAll(".dl-opt").forEach((b) => b.addEventListener("click", () => {
          const k = parseInt(b.dataset.k);
          const ok = k === info.a;
          if (ok) correct++;
          b.classList.add(ok ? "is-correct" : "is-wrong");
          if (!ok) host.querySelector('[data-k="' + info.a + '"]').classList.add("is-correct-soft");
          try { TCF.sfx && TCF.sfx.play(ok ? "correct" : "wrong"); } catch(_){}
          host.querySelector(".dl-fb").innerHTML =
            '<div class="' + (ok ? "sb-ok" : "sb-bad") + '">' +
              (ok ? "✓" : "✗ Bonne réponse : " + escapeHtml(info.options[info.a])) +
              (info.why ? ' <em>' + escapeHtml(info.why) + '</em>' : '') + '</div>' +
            '<button class="tcf-btn primary dl-next">Suivant →</button>';
          host.querySelector(".dl-next").addEventListener("click", () => { idx++; draw(); });
        }));
      }
      function finish() {
        played[today] = { ts: Date.now(), score: correct, total: items.length };
        ls.set(SK_PLAY, played);
        hist.push({ d: today, score: correct, total: items.length });
        ls.set(SK_HIST, hist.slice(-60));
        try { TCF.sfx && TCF.sfx.play(correct === items.length ? "win" : "ok"); } catch(_){}
        if (correct === items.length) try { TCF.confetti && TCF.confetti(1500); } catch(_){}
        host.innerHTML =
          '<div class="dl-summary"><h3>Défi terminé — ' + correct + ' / ' + items.length + '</h3>' +
          '<p>Revenez demain — un autre défi sera prêt.</p>' +
          (hist.length > 1 ? '<p style="font-size:.85rem;opacity:.75">Historique 30 derniers : ' + hist.slice(-30).map((r) => r.score + "/" + r.total).join(" · ") + '</p>' : '') +
          '</div>';
      }
      draw();
    }
    function renderIntro() {
      const done = played[today];
      const streakDaily = (function () {
        let n = 0; let d = new Date(today + "T00:00:00");
        while (true) { const k = d.toISOString().slice(0, 10); if (played[k]) { n++; d.setDate(d.getDate()-1); } else break; }
        return n;
      })();
      host.innerHTML =
        '<div class="dl-intro">' +
          '<div class="dl-badge">🎯 Défi quotidien · 5 questions mixtes</div>' +
          '<h3>' + today + '</h3>' +
          '<p>Un défi par jour — mélange de cloze, genre, connecteurs, synonymes, temps. Identique pour tout le monde le même jour (déterministe).</p>' +
          (done ? '<p>Déjà joué aujourd\'hui : <strong>' + done.score + '/' + done.total + '</strong>.</p>' : '') +
          '<p>Série de défis quotidiens : <strong>' + streakDaily + '</strong> jour(s).</p>' +
          '<button class="tcf-btn primary dl-start">' + (done ? "Rejouer" : "▶ Commencer") + '</button>' +
        '</div>';
      host.querySelector(".dl-start").addEventListener("click", start);
    }
    renderIntro();
  }

  // ---------- 57. Phrase of the day --------------------------------
  window.TCF.phraseOfDay = window.TCF.phraseOfDay || [];
  onPage(() => { document.querySelectorAll(".tcf-phrase").forEach(mountPhrase); });

  function mountPhrase(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const items = window.TCF.phraseOfDay || [];
    if (!items.length) { host.innerHTML = ""; return; }
    const today = new Date().toISOString().slice(0, 10);
    let h = 0; for (let k = 0; k < today.length; k++) h = ((h << 5) - h + today.charCodeAt(k)) | 0;
    const idx = Math.abs(h) % items.length;
    const p = items[idx];
    host.innerHTML =
      '<div class="pd-card">' +
        '<div class="pd-tag">Phrase du jour · B2</div>' +
        '<div class="pd-fr">' + escapeHtml(p.fr) + '</div>' +
        (p.gloss ? '<div class="pd-gloss">' + escapeHtml(p.gloss) + '</div>' : '') +
        '<div class="pd-actions">' +
          '<button class="tcf-btn pd-speak">▶ Écouter</button>' +
          '<button class="tcf-btn pd-copy">⧉ Copier</button>' +
        '</div>' +
      '</div>';
    host.querySelector(".pd-speak").addEventListener("click", () => {
      if (!window.speechSynthesis) return;
      const u = new SpeechSynthesisUtterance(p.fr); u.lang = "fr-FR"; u.rate = 0.95;
      window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);
    });
    host.querySelector(".pd-copy").addEventListener("click", () => {
      navigator.clipboard && navigator.clipboard.writeText(p.fr).then(() => { try { TCF.toast("Copié."); } catch(_){} });
    });
  }

  // ---------- 58. WPM history sparkline ----------------------------
  onPage(() => { document.querySelectorAll(".tcf-wpm-history").forEach(mountWpmHist); });

  function mountWpmHist(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const SK = "wpm:hist";
    function render() {
      const items = ls.get(SK, []) || [];
      if (!items.length) { host.innerHTML = '<p style="opacity:.7">Aucune mesure encore — faites un test [WPM](wpm.md) pour démarrer.</p>'; return; }
      const last = items[items.length - 1];
      host.innerHTML =
        '<div class="wpmh-card">' +
          '<div class="wpmh-stats">' +
            '<div><span class="wpmh-num">' + Math.round(last.wpm) + '</span><span class="wpmh-lbl">dernier WPM</span></div>' +
            '<div><span class="wpmh-num">' + Math.round(items.reduce((a, b) => a + b.wpm, 0) / items.length) + '</span><span class="wpmh-lbl">moyenne</span></div>' +
            '<div><span class="wpmh-num">' + Math.round(Math.max.apply(null, items.map((it) => it.wpm))) + '</span><span class="wpmh-lbl">record</span></div>' +
            '<div><span class="wpmh-num">' + items.length + '</span><span class="wpmh-lbl">mesures</span></div>' +
          '</div>' +
          '<div class="wpmh-spark"></div>' +
          '<p style="font-size:.78rem;opacity:.7;margin:.4rem 0 0">Cible CE 60 min ≈ <strong>220 wpm</strong>.</p>' +
        '</div>';
      if (window.TCF.sparkline) window.TCF.sparkline(host.querySelector(".wpmh-spark"), items.map((it) => it.wpm), { w: 240, h: 48 });
    }
    render();
  }

  // ---------- 59. CECRL ↔ NCLC equivalence visualizer --------------
  onPage(() => { document.querySelectorAll(".tcf-equiv").forEach(mountEquiv); });

  function mountEquiv(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const rows = [
      { cefr: "A1", nclc: "1-3",  co: "0-204",  ce: "0-205",  ee: "0-3",   eo: "0-3",   note: "Survie linguistique" },
      { cefr: "A2", nclc: "3-4",  co: "205-330", ce: "206-330", ee: "4-5",   eo: "4-5",   note: "Élémentaire" },
      { cefr: "B1", nclc: "5-6",  co: "331-457", ce: "331-457", ee: "6-9",   eo: "6-9",   note: "Seuil" },
      { cefr: "B1+", nclc: "7",  co: "458-502", ce: "458-502", ee: "10-13",  eo: "10-13",  note: "CEC gateway" },
      { cefr: "B2", nclc: "8",  co: "503-522", ce: "503-522", ee: "14-15",  eo: "14-15",  note: "EE bonus CRS +25 (toutes ≥ 8)" },
      { cefr: "B2+", nclc: "9",  co: "523-548", ce: "523-548", ee: "16-17",  eo: "16-17",  note: "EE bonus CRS +50 (si EN ≥ NCLC 9)" },
      { cefr: "C1", nclc: "10",  co: "549-699", ce: "549-699", ee: "18-20",  eo: "18-20",  note: "Plafond NCLC" },
      { cefr: "C2", nclc: "10+", co: "—",      ce: "—",      ee: "—",     eo: "—",     note: "Pas distingué par NCLC" },
    ];
    host.innerHTML =
      '<div class="eq-wrap">' +
        '<table class="eq-table"><thead><tr>' +
          '<th>CECRL</th><th>NCLC</th><th>CO brut</th><th>CE brut</th><th>EE</th><th>EO</th><th>Remarque</th>' +
        '</tr></thead><tbody>' +
          rows.map((r) => '<tr class="eq-r-' + r.cefr.toLowerCase().replace("+", "p") + '">' +
            '<td><strong>' + r.cefr + '</strong></td>' +
            '<td><span class="eq-band">NCLC ' + r.nclc + '</span></td>' +
            '<td>' + r.co + '</td><td>' + r.ce + '</td><td>' + r.ee + '</td><td>' + r.eo + '</td>' +
            '<td>' + r.note + '</td>' +
          '</tr>').join("") +
        '</tbody></table>' +
      '</div>';
  }

  // ---------- 60. Yearly heatmap (12-month) ------------------------
  onPage(() => { document.querySelectorAll(".tcf-year-heatmap").forEach(mountYearHm); });

  function mountYearHm(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const days = ls.get("streak:days", {}) || {};
    const now = new Date();
    const cells = [];
    for (let i = 364; i >= 0; i--) {
      const d = new Date(now); d.setDate(now.getDate() - i);
      const k = d.toISOString().slice(0, 10);
      cells.push({ k, on: !!days[k], dow: d.getDay() });
    }
    const months = [];
    for (let m = 0; m < 12; m++) {
      const d = new Date(now); d.setMonth(now.getMonth() - 11 + m);
      months.push(["jan","fév","mar","avr","mai","jui","jui","aoû","sep","oct","nov","déc"][d.getMonth()]);
    }
    const total = cells.filter((c) => c.on).length;
    host.innerHTML =
      '<div class="yh-card">' +
        '<div class="yh-head"><strong>365 derniers jours</strong> · ' + total + ' jour(s) actifs · ' + Math.round(100*total/365) + ' %</div>' +
        '<div class="yh-months">' + months.map((m) => '<span class="yh-m">' + m + '</span>').join("") + '</div>' +
        '<div class="yh-grid">' + cells.map((c) => '<span class="yh-cell ' + (c.on ? "on" : "") + '" title="' + c.k + '"></span>').join("") + '</div>' +
      '</div>';
  }

  // ============================================================
  // v1.5 — Adaptive SRS, shadow speaking, EE rubric, CO dictation,
  //        conjugation drill, mistake analyzer, NCLC projection,
  //        ICS calendar export, command bar, focus mode
  // ============================================================

  // ---------- 61. Adaptive SM-2 spaced repetition ------------------
  // Storage: tcf:srs:<deckId> = { items: [{id, q, a, hint, ef, iv, due, reps, lapses}], history: [...] }
  // Algorithm: standard SM-2 (Wozniak 1990).
  // Usage:  <div class="tcf-srs" data-deck="b2-core" data-source="window.TCF.decks.b2core"></div>
  onPage(() => { document.querySelectorAll(".tcf-srs").forEach(mountSRS); });

  function mountSRS(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const deckId = host.dataset.deck || "default";
    const sourceKey = host.dataset.source || "window.TCF.decks.b2core";
    let source = null;
    try { source = sourceKey.split(".").reduce((o, k) => o && o[k], window); } catch (e) {}
    if (!source || !Array.isArray(source) || !source.length) {
      host.innerHTML = '<p class="tcf-empty">Aucune carte disponible pour ce paquet (<code>' + sourceKey + '</code>).</p>';
      return;
    }
    const today = () => new Date().toISOString().slice(0, 10);
    const lsKey = "srs:" + deckId;
    let state = ls.get(lsKey, null);
    if (!state || !Array.isArray(state.items) || state.items.length !== source.length) {
      // (re)initialize from source — preserve any prior SM-2 metadata by id
      const prior = (state && state.items) || [];
      const byId = {};
      prior.forEach((p) => { byId[p.id] = p; });
      state = {
        items: source.map((c, i) => Object.assign(
          { id: c.id || ("c" + i), q: c.q, a: c.a, hint: c.hint || "",
            ef: 2.5, iv: 0, due: today(), reps: 0, lapses: 0 },
          byId[c.id || ("c" + i)] || {}
        )),
        history: (state && state.history) || []
      };
      ls.set(lsKey, state);
    }

    function due() {
      const t = today();
      return state.items.filter((it) => it.due <= t);
    }
    function addDays(d, n) {
      const x = new Date(d + "T00:00:00Z");
      x.setUTCDate(x.getUTCDate() + n);
      return x.toISOString().slice(0, 10);
    }
    function grade(it, q) {
      // q in {0..5}: 0-2 = fail, 3-5 = pass
      if (q < 3) {
        it.lapses++;
        it.reps = 0;
        it.iv = 1;
        it.ef = Math.max(1.3, it.ef - 0.20);
      } else {
        it.reps++;
        if (it.reps === 1) it.iv = 1;
        else if (it.reps === 2) it.iv = 6;
        else it.iv = Math.round(it.iv * it.ef);
        it.ef = Math.max(1.3, it.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
      }
      it.due = addDays(today(), it.iv);
      state.history.push({ t: Date.now(), id: it.id, q: q });
      if (state.history.length > 500) state.history = state.history.slice(-500);
      ls.set(lsKey, state);
    }

    let current = null;
    let showAnswer = false;

    function pickNext() {
      const d = due();
      if (!d.length) { current = null; return; }
      // Prefer overdue, then due-today, then new (reps=0)
      const overdue = d.filter((it) => it.due < today());
      const pool = overdue.length ? overdue : d;
      current = pool[Math.floor(Math.random() * pool.length)];
      showAnswer = false;
    }

    function render() {
      const d = due();
      const totalReviewed = state.history.length;
      const todayReviewed = state.history.filter((h) => {
        const day = new Date(h.t).toISOString().slice(0, 10);
        return day === today();
      }).length;
      if (!current) pickNext();
      if (!current) {
        host.innerHTML =
          '<div class="srs-card srs-done">' +
            '<h3>🎉 Tout est en avance</h3>' +
            '<p>Aucune carte due aujourd\'hui dans <strong>' + deckId + '</strong>.</p>' +
            '<p class="srs-stats">' + totalReviewed + ' révisions totales · prochain due : <strong>' +
              (state.items.reduce((min, it) => it.due < min ? it.due : min, "9999-99-99")) + '</strong></p>' +
            '<button type="button" class="srs-resetday" data-act="resetday" aria-label="Forcer une session libre — toutes les cartes redeviennent dues">Forcer une session libre</button>' +
            '<button type="button" class="srs-export" data-act="export" aria-label="Exporter le paquet au format JSON">Exporter JSON</button>' +
          '</div>';
      } else {
        host.innerHTML =
          '<div class="srs-card">' +
            '<div class="srs-meta">' +
              '<span class="srs-deck">' + deckId + '</span>' +
              '<span class="srs-due">' + d.length + ' due</span>' +
              '<span class="srs-today">' + todayReviewed + ' fait·s aujourd\'hui</span>' +
            '</div>' +
            '<div class="srs-q">' + current.q + '</div>' +
            (showAnswer
              ? '<div class="srs-a">' + current.a + '</div>' +
                '<div class="srs-grades" role="group" aria-label="Notation SM-2">' +
                  '<button type="button" data-q="0" class="g g0" aria-label="Encore — relancer demain">Encore (1j)</button>' +
                  '<button type="button" data-q="3" class="g g3" aria-label="Difficile">Difficile</button>' +
                  '<button type="button" data-q="4" class="g g4" aria-label="Bien">Bien</button>' +
                  '<button type="button" data-q="5" class="g g5" aria-label="Facile">Facile</button>' +
                '</div>'
              : '<div class="srs-hint">' + (current.hint || "") + '</div>' +
                '<button type="button" class="srs-show" data-act="show">Afficher la réponse · espace</button>'
            ) +
            '<div class="srs-meta srs-meta-bot">' +
              '<span>ef ' + current.ef.toFixed(2) + '</span>' +
              '<span>iv ' + current.iv + 'j</span>' +
              '<span>reps ' + current.reps + '</span>' +
              (current.lapses ? '<span class="srs-lapse">lapses ' + current.lapses + '</span>' : '') +
            '</div>' +
          '</div>';
      }
    }

    host.addEventListener("click", (e) => {
      const t = e.target;
      if (!t) return;
      if (t.dataset.act === "show") { showAnswer = true; render(); return; }
      if (t.dataset.act === "resetday") {
        state.items.forEach((it) => { if (it.due > today()) it.due = today(); });
        ls.set(lsKey, state); pickNext(); render();
        return;
      }
      if (t.dataset.act === "export") {
        const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "srs-" + deckId + "-" + today() + ".json";
        a.click();
        return;
      }
      if (t.dataset.q !== undefined) {
        grade(current, parseInt(t.dataset.q, 10));
        if (window.TCF && window.TCF.sfx) window.TCF.sfx(t.dataset.q >= "3" ? "good" : "ok");
        pickNext(); render();
      }
    });
    document.addEventListener("keydown", function onKey(e) {
      if (!document.body.contains(host)) { document.removeEventListener("keydown", onKey); return; }
      if (!current) return;
      if (e.key === " " && !showAnswer) { e.preventDefault(); showAnswer = true; render(); return; }
      if (showAnswer && ["0", "1", "2", "3", "4", "5"].indexOf(e.key) !== -1) {
        grade(current, parseInt(e.key, 10) <= 2 ? 0 : parseInt(e.key, 10));
        pickNext(); render();
      }
    });

    render();
  }

  // ---------- 62. Shadow speaking trainer --------------------------
  // .tcf-shadow[data-set] — TTS plays a chunk, user records via MediaRecorder,
  // playback A/B for self-comparison. Builds chunk-level prosody.
  onPage(() => { document.querySelectorAll(".tcf-shadow").forEach(mountShadow); });

  function mountShadow(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const setKey = host.dataset.set || "default";
    const set = (window.TCF && window.TCF.shadow && window.TCF.shadow[setKey]) || [];
    if (!set.length) { host.innerHTML = '<p class="tcf-empty">Pack <code>' + setKey + '</code> introuvable.</p>'; return; }

    let idx = 0;
    let recorder = null;
    let chunks = [];
    let userBlob = null;
    let rec = false;

    function speak(text, rate) {
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "fr-FR";
      u.rate = rate || 0.95;
      const voices = window.speechSynthesis.getVoices();
      const fr = voices.find((v) => /fr[-_]/i.test(v.lang)) || voices.find((v) => /fr/i.test(v.lang));
      if (fr) u.voice = fr;
      window.speechSynthesis.speak(u);
    }

    async function startRec() {
      if (!navigator.mediaDevices || !window.MediaRecorder) {
        if (window.TCF && window.TCF.toast) window.TCF.toast("MediaRecorder non disponible (vérifiez HTTPS + micro).");
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        chunks = [];
        const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "";
        recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
        recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
        recorder.onstop = () => {
          userBlob = new Blob(chunks, { type: mime || "audio/webm" });
          stream.getTracks().forEach((t) => t.stop());
          rec = false; render();
        };
        recorder.start();
        rec = true; render();
      } catch (e) {
        if (window.TCF && window.TCF.toast) window.TCF.toast("Micro refusé ou indisponible.");
      }
    }
    function stopRec() { if (recorder && recorder.state !== "inactive") recorder.stop(); }

    function render() {
      const item = set[idx];
      host.innerHTML =
        '<div class="sh-card">' +
          '<div class="sh-meta">' +
            '<span>Pack ' + setKey + '</span>' +
            '<span>' + (idx + 1) + ' / ' + set.length + '</span>' +
            (item.tag ? '<span class="sh-tag">' + item.tag + '</span>' : '') +
          '</div>' +
          '<div class="sh-text">' + item.text + '</div>' +
          (item.ipa ? '<div class="sh-ipa">/' + item.ipa + '/</div>' : '') +
          '<div class="sh-actions">' +
            '<button type="button" data-act="play1" aria-label="Lire à vitesse normale">🔊 1.0×</button>' +
            '<button type="button" data-act="play08" aria-label="Lire à vitesse réduite 0.8 fois">🐢 0.8×</button>' +
            (rec
              ? '<button type="button" class="sh-rec sh-recording" data-act="stop" aria-label="Arrêter l\'enregistrement" aria-pressed="true">⏹ Arrêt</button>'
              : '<button type="button" class="sh-rec" data-act="rec" aria-label="Démarrer l\'enregistrement" aria-pressed="false">🔴 Enregistrer</button>') +
            (userBlob ? '<button type="button" data-act="user" aria-label="Écouter ma version enregistrée">▶ Ma version</button>' : '') +
            '<button type="button" data-act="next" aria-label="Phrase suivante">→ Suivant</button>' +
          '</div>' +
          (item.note ? '<div class="sh-note">' + item.note + '</div>' : '') +
        '</div>';
    }

    host.addEventListener("click", (e) => {
      const a = e.target && e.target.dataset && e.target.dataset.act;
      if (!a) return;
      const item = set[idx];
      if (a === "play1") speak(item.text, 1.0);
      if (a === "play08") speak(item.text, 0.8);
      if (a === "rec") startRec();
      if (a === "stop") stopRec();
      if (a === "user" && userBlob) {
        const audio = new Audio(URL.createObjectURL(userBlob));
        audio.play();
      }
      if (a === "next") {
        idx = (idx + 1) % set.length;
        userBlob = null; chunks = [];
        render();
      }
    });
    render();
  }

  // ---------- 63. EE rubric self-grader ----------------------------
  // .tcf-ee-rubric — paste essay, get 4-criterion 5-pt rubric scoring
  onPage(() => { document.querySelectorAll(".tcf-ee-rubric").forEach(mountEERubric); });

  function mountEERubric(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const targetBands = { 1: [60, 120], 2: [120, 150], 3: [150, 180] };
    const connectorBank = [
      "cependant", "néanmoins", "toutefois", "en revanche", "par conséquent", "ainsi",
      "de plus", "en outre", "par ailleurs", "non seulement", "mais aussi",
      "d'une part", "d'autre part", "en effet", "or", "donc", "puisque", "dès lors",
      "bien que", "quoique", "même si", "à condition que", "à supposer que",
      "autrement dit", "en d'autres termes", "à savoir", "par exemple", "notamment",
      "pour ma part", "selon moi", "il convient de", "il importe de", "force est de",
      "en définitive", "en somme", "tout bien considéré"
    ];
    const oralMarkers = [
      "du coup", "en fait", "genre", "trop", "super", "ça va", "ouais", "bah", "ben",
      "c'est cool", "vachement", "carrément", "pas mal"
    ];
    const formalRegister = [
      "force est de constater", "il convient de", "il importe de", "à cet égard",
      "à ce titre", "il est manifeste que", "quoi qu'il en soit", "on ne saurait",
      "il n'en demeure pas moins"
    ];

    function analyze(text, task) {
      const clean = text.replace(/\s+/g, " ").trim();
      const words = clean.split(/\s+/).filter((w) => w.length);
      const wc = words.length;
      const sentences = clean.split(/[.!?…]+/).filter((s) => s.trim().length);
      const sc = sentences.length;
      const avgSent = sc ? Math.round((wc / sc) * 10) / 10 : 0;
      const uniqueWords = new Set(words.map((w) => w.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")));
      const ttr = wc ? Math.round((uniqueWords.size / wc) * 100) : 0;
      const conn = connectorBank.filter((c) => new RegExp("\\b" + c.replace(/'/g, "['']") + "\\b", "i").test(text));
      const oral = oralMarkers.filter((m) => new RegExp("\\b" + m.replace(/'/g, "['']") + "\\b", "i").test(text));
      const formal = formalRegister.filter((m) => new RegExp(m.replace(/'/g, "['']"), "i").test(text));
      const negCorrect = (text.match(/\bne\s+\w+\s+(pas|jamais|plus|guère|rien|personne)/gi) || []).length;
      const negDropped = (text.match(/\b(j'?ai|je|tu|il|elle|on|nous|vous|ils|elles)\s+\w+\s+pas\b/gi) || []).length;
      const subjMarkers = (text.match(/\b(que|qu')\s+\w+\s+(soit|aie|aies|ait|ayons|ayez|aient|puisse|sache|fasse|veuille|aille)\b/gi) || []).length;
      const passe = (text.match(/\b(j'?ai|tu as|il a|elle a|on a|nous avons|vous avez|ils ont|elles ont)\s+\w+/gi) || []).length;
      const imp = (text.match(/\b\w+(ais|ait|ions|iez|aient)\b/gi) || []).length;

      const target = targetBands[task];
      const lenScore = wc < target[0] - 20 ? 1 : wc < target[0] ? 2 : wc <= target[1] ? 5 : wc <= target[1] + 20 ? 4 : 3;

      // C1: task fulfillment (proxy: length within target + at least 3 sentences)
      const c1 = Math.min(5, Math.round((lenScore + (sc >= 3 ? 5 : sc * 1.5)) / 2));
      // C2: coherence (connectors, average sentence length 12-22)
      const sentLenScore = avgSent >= 12 && avgSent <= 22 ? 5 : avgSent >= 8 && avgSent <= 28 ? 4 : avgSent >= 6 && avgSent <= 35 ? 3 : 2;
      const connScore = conn.length >= 6 ? 5 : conn.length >= 4 ? 4 : conn.length >= 2 ? 3 : conn.length >= 1 ? 2 : 1;
      const c2 = Math.round((sentLenScore + connScore) / 2);
      // C3: lexis (TTR + formal markers - oral)
      const ttrScore = ttr >= 65 ? 5 : ttr >= 55 ? 4 : ttr >= 45 ? 3 : 2;
      const registerScore = Math.max(1, Math.min(5, 3 + formal.length - oral.length * 2));
      const c3 = Math.round((ttrScore + registerScore) / 2);
      // C4: morphosyntax (proper negation, subj triggers, mix of tenses)
      const negScore = negDropped === 0 ? 5 : negDropped <= 1 ? 3 : 2;
      const verbScore = subjMarkers >= 1 && (passe + imp) >= 2 ? 5 : (passe + imp) >= 2 ? 4 : (passe + imp) >= 1 ? 3 : 2;
      const c4 = Math.round((negScore + verbScore) / 2);

      const total = c1 + c2 + c3 + c4;
      return {
        wc, sc, avgSent, ttr,
        conn, oral, formal, negCorrect, negDropped, subjMarkers, passe, imp,
        target, lenScore,
        c1, c2, c3, c4, total,
        notes: {
          C1: wc < target[0] ? "Trop court (cible " + target[0] + "-" + target[1] + " mots)." : wc > target[1] + 15 ? "Trop long (cible " + target[0] + "-" + target[1] + ")." : "Longueur dans la cible.",
          C2: "Connecteurs B2 détectés : " + (conn.length ? conn.slice(0, 6).join(", ") + (conn.length > 6 ? "…" : "") : "aucun") + ". Longueur moyenne phrase : " + avgSent + " mots.",
          C3: "TTR " + ttr + "%. " + (oral.length ? "⚠ marques d'oralité : " + oral.join(", ") + ". " : "") + (formal.length ? "✓ registre soutenu : " + formal.slice(0, 3).join(", ") : "Aucune marque de registre soutenu."),
          C4: "Négations complètes : " + negCorrect + " · drops : " + negDropped + " · subjonctif : " + subjMarkers + " · PC " + passe + " / imp " + imp + "."
        }
      };
    }

    host.innerHTML =
      '<div class="rb-wrap">' +
        '<div class="rb-controls">' +
          '<label>Tâche : <select class="rb-task" aria-label="Sélectionner la tâche"><option value="1">T1 (60-120)</option><option value="2" selected>T2 (120-150)</option><option value="3">T3 (150-180)</option></select></label>' +
        '</div>' +
        '<textarea class="rb-text" aria-label="Texte de la copie à évaluer" placeholder="Collez votre copie ici…" rows="12"></textarea>' +
        '<div class="rb-actions">' +
          '<button type="button" class="rb-grade" aria-label="Évaluer la copie selon la rubrique">📊 Évaluer</button>' +
          '<button type="button" class="rb-clear" aria-label="Effacer la copie">Effacer</button>' +
        '</div>' +
        '<div class="rb-result" role="region" aria-live="polite" aria-label="Résultat d\'évaluation"></div>' +
      '</div>';

    const text = host.querySelector(".rb-text");
    const result = host.querySelector(".rb-result");
    const saveKey = "ee:rubric:draft";
    text.value = ls.get(saveKey, "") || "";
    text.addEventListener("input", () => ls.set(saveKey, text.value));

    host.querySelector(".rb-grade").addEventListener("click", () => {
      const task = parseInt(host.querySelector(".rb-task").value, 10);
      const r = analyze(text.value, task);
      if (!r.wc) { result.innerHTML = '<p class="tcf-empty">Texte vide.</p>'; return; }
      const verdict = r.total >= 17 ? { lbl: "NCLC 9 visé · EE bonus +50 plausible", cls: "good" }
        : r.total >= 14 ? { lbl: "NCLC 8 visé · EE bonus +25 plausible", cls: "ok" }
        : { lbl: "Plus bas que NCLC 8 — corrections requises", cls: "warn" };
      result.innerHTML =
        '<div class="rb-card rb-' + verdict.cls + '">' +
          '<div class="rb-total">' + r.total + ' / 20 · <strong>' + verdict.lbl + '</strong></div>' +
          '<table class="rb-table"><tbody>' +
            '<tr><td>C1 — Tâche communicative</td><td>' + r.c1 + '/5</td><td>' + r.notes.C1 + '</td></tr>' +
            '<tr><td>C2 — Cohérence / cohésion</td><td>' + r.c2 + '/5</td><td>' + r.notes.C2 + '</td></tr>' +
            '<tr><td>C3 — Étendue lexicale</td><td>' + r.c3 + '/5</td><td>' + r.notes.C3 + '</td></tr>' +
            '<tr><td>C4 — Morphosyntaxe</td><td>' + r.c4 + '/5</td><td>' + r.notes.C4 + '</td></tr>' +
          '</tbody></table>' +
          '<details class="rb-detail"><summary>Détails analyse</summary>' +
            '<p>Mots : <strong>' + r.wc + '</strong> (cible ' + r.target[0] + "-" + r.target[1] + ') · phrases : ' + r.sc + ' · moy. ' + r.avgSent + ' mots/phrase · TTR ' + r.ttr + ' %</p>' +
            '<p>Connecteurs (' + r.conn.length + ') : ' + (r.conn.join(", ") || "—") + '</p>' +
            '<p>Marques d\'oralité (' + r.oral.length + ') : ' + (r.oral.join(", ") || "—") + '</p>' +
            '<p>Registre soutenu (' + r.formal.length + ') : ' + (r.formal.join(", ") || "—") + '</p>' +
            '<p>Négations correctes / drops : ' + r.negCorrect + ' / ' + r.negDropped + '</p>' +
            '<p>Subjonctif / PC / imparfait : ' + r.subjMarkers + ' / ' + r.passe + ' / ' + r.imp + '</p>' +
          '</details>' +
        '</div>';
      if (window.TCF && window.TCF.sfx) window.TCF.sfx(r.total >= 14 ? "good" : "ok");
    });
    host.querySelector(".rb-clear").addEventListener("click", () => {
      text.value = ""; ls.del(saveKey); result.innerHTML = "";
    });
  }

  // ---------- 64. CO dictation precision ---------------------------
  // .tcf-co-dict[data-set] — TTS reads a sentence, user types, diff highlight
  onPage(() => { document.querySelectorAll(".tcf-co-dict").forEach(mountCODict); });

  function mountCODict(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const setKey = host.dataset.set || "default";
    const set = (window.TCF && window.TCF.codict && window.TCF.codict[setKey]) || [];
    if (!set.length) { host.innerHTML = '<p class="tcf-empty">Pack <code>' + setKey + '</code> introuvable.</p>'; return; }

    let idx = 0;
    let plays = 0;
    let revealed = false;
    let scores = ls.get("codict:scores", {}) || {};

    function norm(s) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[.,!?;:'"«»()\-]/g, "").replace(/\s+/g, " ").trim(); }
    function speak(text, rate) {
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "fr-FR"; u.rate = rate || 1.0;
      const voices = window.speechSynthesis.getVoices();
      const fr = voices.find((v) => /fr[-_]/i.test(v.lang)) || voices.find((v) => /fr/i.test(v.lang));
      if (fr) u.voice = fr;
      window.speechSynthesis.speak(u);
    }
    function diff(expected, got) {
      const A = norm(expected).split(" ");
      const B = norm(got).split(" ");
      // simple word-by-word align
      const html = A.map((w, i) => {
        const g = B[i] || "";
        return g === w
          ? '<span class="ok">' + w + '</span>'
          : g
            ? '<span class="bad" title="vous : ' + (g || "—") + '">' + w + '</span>'
            : '<span class="miss">' + w + '</span>';
      }).join(" ");
      const correct = A.filter((w, i) => B[i] === w).length;
      return { html, correct, total: A.length };
    }

    function render() {
      const item = set[idx];
      const prevScore = scores[item.id || ("d" + idx)];
      host.innerHTML =
        '<div class="cd-card">' +
          '<div class="cd-meta">Item ' + (idx + 1) + ' / ' + set.length + ' · ' + (item.level || "B1-B2") +
            (prevScore !== undefined ? ' · meilleur ' + prevScore + '%' : '') + '</div>' +
          '<div class="cd-actions">' +
            '<button type="button" data-act="play1" aria-label="Lire à vitesse normale" ' + (plays >= 3 ? "disabled" : "") + '>🔊 1.0×</button>' +
            '<button type="button" data-act="play08" aria-label="Lire à vitesse réduite" ' + (plays >= 3 ? "disabled" : "") + '>🐢 0.8×</button>' +
            '<span class="cd-plays" aria-live="polite">' + plays + '/3 écoutes</span>' +
          '</div>' +
          '<textarea class="cd-input" aria-label="Tapez ce que vous entendez" placeholder="Tapez ce que vous entendez…" rows="3"></textarea>' +
          '<div class="cd-actions">' +
            '<button type="button" data-act="check" aria-label="Vérifier la dictée">✅ Vérifier</button>' +
            '<button type="button" data-act="next" aria-label="Phrase suivante">→ Suivant</button>' +
          '</div>' +
          '<div class="cd-result" role="region" aria-live="polite" aria-label="Résultat de la dictée"></div>' +
        '</div>';
    }

    host.addEventListener("click", (e) => {
      const a = e.target && e.target.dataset && e.target.dataset.act;
      if (!a) return;
      const item = set[idx];
      const input = host.querySelector(".cd-input");
      const out = host.querySelector(".cd-result");
      if (a === "play1") { plays++; speak(item.text, 1.0); render(); host.querySelector(".cd-input").value = input.value; }
      if (a === "play08") { plays++; speak(item.text, 0.8); render(); host.querySelector(".cd-input").value = input.value; }
      if (a === "check") {
        const d = diff(item.text, input.value);
        const pct = Math.round((d.correct / d.total) * 100);
        const id = item.id || ("d" + idx);
        if (!scores[id] || pct > scores[id]) { scores[id] = pct; ls.set("codict:scores", scores); }
        out.innerHTML =
          '<div class="cd-feedback">' +
            '<div class="cd-pct"><strong>' + pct + '%</strong> (' + d.correct + '/' + d.total + ')</div>' +
            '<div class="cd-diff">' + d.html + '</div>' +
            (item.note ? '<div class="cd-note">' + item.note + '</div>' : '') +
          '</div>';
        revealed = true;
        if (window.TCF && window.TCF.sfx) window.TCF.sfx(pct >= 80 ? "good" : pct >= 50 ? "ok" : "wrong");
      }
      if (a === "next") {
        idx = (idx + 1) % set.length; plays = 0; revealed = false; render();
      }
    });
    render();
  }

  // ---------- 65. Conjugation drill (interactive) ------------------
  // .tcf-conj-drill — random verb+tense+person → user types form
  onPage(() => { document.querySelectorAll(".tcf-conj-drill").forEach(mountConjDrill); });

  function mountConjDrill(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const verbs = (window.TCF && window.TCF.verbs && window.TCF.verbs.core) || {};
    const verbKeys = Object.keys(verbs);
    if (!verbKeys.length) { host.innerHTML = '<p class="tcf-empty">Tables de conjugaison non chargées.</p>'; return; }

    const tenses = ["present", "passe_compose", "imparfait", "futur", "conditionnel", "subjonctif"];
    const tenseLabels = { present: "présent", passe_compose: "passé composé", imparfait: "imparfait", futur: "futur", conditionnel: "conditionnel", subjonctif: "subjonctif présent" };
    const personLabels = ["je", "tu", "il/elle/on", "nous", "vous", "ils/elles"];

    let current = null;
    let stats = ls.get("conj:stats", { right: 0, wrong: 0, streak: 0, best: 0 });

    function pick() {
      const v = verbKeys[Math.floor(Math.random() * verbKeys.length)];
      const t = tenses[Math.floor(Math.random() * tenses.length)];
      const p = Math.floor(Math.random() * 6);
      if (!verbs[v] || !verbs[v][t] || !verbs[v][t][p]) { return pick(); }
      current = { verb: v, tense: t, person: p, expected: verbs[v][t][p] };
    }
    function norm(s) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/['-]/g, " ").replace(/\s+/g, " ").trim(); }

    function render() {
      host.innerHTML =
        '<div class="cj-card">' +
          '<div class="cj-meta">Stats : <strong>' + stats.right + '</strong> ✓ · ' + stats.wrong + ' ✗ · série ' + stats.streak + ' (record ' + stats.best + ')</div>' +
          '<div class="cj-prompt">' +
            '<span class="cj-verb">' + current.verb + '</span> · ' +
            '<span class="cj-tense">' + tenseLabels[current.tense] + '</span> · ' +
            '<span class="cj-person">' + personLabels[current.person] + '</span>' +
          '</div>' +
          '<input class="cj-input" autocomplete="off" aria-label="Forme conjuguée attendue" placeholder="forme conjuguée…" />' +
          '<div class="cj-actions">' +
            '<button type="button" data-act="check" aria-label="Vérifier la réponse (touche Entrée)">Vérifier · Entrée</button>' +
            '<button type="button" data-act="skip" aria-label="Passer sans pénalité">Passer</button>' +
            '<button type="button" data-act="reveal" aria-label="Révéler la réponse">Révéler</button>' +
          '</div>' +
          '<div class="cj-feedback" role="status" aria-live="polite"></div>' +
        '</div>';
      const input = host.querySelector(".cj-input");
      input.focus();
      input.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
    }
    function check() {
      const input = host.querySelector(".cj-input");
      const fb = host.querySelector(".cj-feedback");
      const u = norm(input.value);
      const e = norm(current.expected);
      if (u === e) {
        stats.right++; stats.streak++; if (stats.streak > stats.best) stats.best = stats.streak;
        ls.set("conj:stats", stats);
        if (window.TCF && window.TCF.sfx) window.TCF.sfx("correct");
        fb.innerHTML = '<span class="cj-ok">✅ ' + current.expected + '</span>';
        setTimeout(() => { pick(); render(); }, 700);
      } else {
        stats.wrong++; stats.streak = 0;
        ls.set("conj:stats", stats);
        if (window.TCF && window.TCF.sfx) window.TCF.sfx("wrong");
        fb.innerHTML = '<span class="cj-no">❌ attendu : <strong>' + current.expected + '</strong></span>';
      }
    }
    host.addEventListener("click", (e) => {
      const a = e.target && e.target.dataset && e.target.dataset.act;
      if (a === "check") check();
      if (a === "skip") { pick(); render(); }
      if (a === "reveal") {
        host.querySelector(".cj-feedback").innerHTML = '<span class="cj-no">Réponse : <strong>' + current.expected + '</strong></span>';
        host.querySelector(".cj-input").value = current.expected;
      }
    });
    pick(); render();
  }

  // ---------- 66. Mistake patterns analyzer ------------------------
  // .tcf-mistake-analyze — reads error log, clusters by skill + pattern
  onPage(() => { document.querySelectorAll(".tcf-mistake-analyze").forEach(mountMistakeAnalyze); });

  function mountMistakeAnalyze(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    function render() {
      const log = ls.get("errlog", []) || [];
      if (!log.length) {
        host.innerHTML = '<p class="tcf-empty">Aucune entrée dans le journal d\'erreurs. Ajouter via <a href="../journal/">Journal d\'erreurs</a>.</p>';
        return;
      }
      const bySkill = {};
      log.forEach((e) => { bySkill[e.skill] = (bySkill[e.skill] || 0) + 1; });
      const skillSorted = Object.entries(bySkill).sort((a, b) => b[1] - a[1]);
      // Heuristic pattern clustering
      const patterns = {
        "PC vs imparfait": /(\b\w+ait\b|\bj'?ai\s+\w+é\b)/i,
        "Genre nom": /\b(le|la|un|une|du|de la|des)\s+\w+/i,
        "Pronoms y/en": /\b(y|en|lui|leur)\b/i,
        "Liaison": /[zts]_/,
        "Subjonctif": /(\bque\s+\w+(soit|aie|ait|sache|puisse|fasse))/i,
        "Connecteur": /(cependant|néanmoins|toutefois|en revanche|par conséquent)/i,
        "Faux ami": /(actuellement|éventuellement|sensible|library)/i
      };
      const pcounts = {};
      log.forEach((e) => {
        const s = (e.faux || "") + " " + (e.correct || "");
        Object.keys(patterns).forEach((p) => {
          if (patterns[p].test(s)) pcounts[p] = (pcounts[p] || 0) + 1;
        });
      });
      const pSorted = Object.entries(pcounts).sort((a, b) => b[1] - a[1]);
      const total = log.length;
      const due = log.filter((e) => e.nextReview && e.nextReview <= new Date().toISOString().slice(0, 10)).length;

      const topSkill = skillSorted[0] && skillSorted[0][0];
      const recoMap = {
        CO: "→ Drill <a href=\"../co-entraineur/\">CO entraîneur</a> + <a href=\"../minimal-pairs/\">paires minimales</a>",
        CE: "→ <a href=\"../ce-entraineur/\">CE entraîneur</a> + <a href=\"../wpm/\">WPM</a> + <a href=\"../synonymes/\">synonymes</a>",
        EE: "→ <a href=\"../ee-feedback/\">Auto-feedback EE</a> + <a href=\"../ee-rubrique/\">rubrique self-grader</a> + <a href=\"../cloze/\">cloze B2</a>",
        EO: "→ <a href=\"../eo-enregistreur/\">Enregistreur EO</a> + <a href=\"../shadow/\">shadow speaking</a>",
        Grammaire: "→ <a href=\"../passe-compose-imparfait/\">PC vs imp</a> + <a href=\"../pronoms/\">pronoms</a> + <a href=\"../conjugaison-drill/\">conjugaison drill</a>",
        Vocab: "→ <a href=\"../genre/\">genre</a> + <a href=\"../revue/\">SRS révisions</a>",
        Phono: "→ <a href=\"../liaisons/\">liaisons</a> + <a href=\"../minimal-pairs/\">paires minimales</a>"
      };
      const reco = recoMap[topSkill] || "→ Continuer le plan généraliste.";

      host.innerHTML =
        '<div class="ma-card">' +
          '<div class="ma-head"><strong>' + total + '</strong> entrée(s) · ' + due + ' à revoir aujourd\'hui</div>' +
          '<div class="ma-section">' +
            '<h4>Par compétence</h4>' +
            '<div class="ma-bars">' +
              skillSorted.map(([k, v]) => '<div class="ma-bar"><span class="ma-lab">' + k + '</span><span class="ma-fill" style="width:' + Math.round(100 * v / total) + '%">' + v + '</span></div>').join("") +
            '</div>' +
          '</div>' +
          (pSorted.length ? '<div class="ma-section">' +
            '<h4>Schémas récurrents (heuristique)</h4>' +
            '<ul>' + pSorted.map(([p, n]) => '<li>' + p + ' — <strong>' + n + '</strong> occurrence' + (n > 1 ? "s" : "") + '</li>').join("") + '</ul>' +
          '</div>' : '') +
          '<div class="ma-reco"><strong>Suggestion</strong> · cible la compétence <em>' + topSkill + '</em> ' + reco + '</div>' +
        '</div>';
    }
    render();
    setInterval(render, 60000);
  }

  // ---------- 67. NCLC projection at exam date ---------------------
  // .tcf-projection — projects expected NCLC based on streak + mock trajectory
  onPage(() => { document.querySelectorAll(".tcf-projection").forEach(mountProjection); });

  function mountProjection(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    function render() {
      const goal = ls.get("goal", null);
      const days = ls.get("streak:days", {}) || {};
      const attempts = ls.get("attempts", []) || [];
      const errlog = ls.get("errlog", []) || [];
      if (!goal || !goal.date || !goal.targetNclc) {
        host.innerHTML = '<p class="tcf-empty">Définir d\'abord une date d\'examen + cible NCLC dans <a href="../objectif/">Objectif</a>.</p>';
        return;
      }
      const exam = new Date(goal.date + "T00:00:00");
      const now = new Date();
      const daysToExam = Math.ceil((exam - now) / (1000 * 60 * 60 * 24));
      const target = goal.targetNclc;

      // Activity rate (last 28 days)
      const recent = [];
      for (let i = 0; i < 28; i++) {
        const d = new Date(); d.setDate(now.getDate() - i);
        const k = d.toISOString().slice(0, 10);
        recent.push(!!days[k]);
      }
      const activeRate = recent.filter(Boolean).length / 28;

      // Mock trajectory
      const recentMocks = attempts.slice(-4);
      const avgNclc = recentMocks.length
        ? recentMocks.reduce((s, a) => s + (a.nclc_overall || a.nclc_avg || 7), 0) / recentMocks.length
        : 7;
      const trend = recentMocks.length >= 2
        ? (recentMocks[recentMocks.length - 1].nclc_overall || 7) - (recentMocks[0].nclc_overall || 7)
        : 0;

      // Projection: current baseline + improvement potential
      const weeksLeft = daysToExam / 7;
      let projected = avgNclc;
      // each active week adds ~0.05 NCLC if active, with diminishing returns near target
      const gap = Math.max(0, target - avgNclc);
      const weeklyGain = activeRate * 0.07 * (gap > 0 ? 1 : 0.3);
      projected = avgNclc + Math.min(gap, weeklyGain * weeksLeft) + (trend * 0.3);
      projected = Math.max(1, Math.min(10, projected));

      const reach = projected >= target;
      const verdict = reach
        ? { lbl: "Trajectoire atteint la cible", cls: "good" }
        : projected >= target - 0.5
        ? { lbl: "À 0,5 NCLC : intensification possible", cls: "ok" }
        : { lbl: "Écart > 0,5 NCLC : changer la routine", cls: "warn" };

      host.innerHTML =
        '<div class="pj-card pj-' + verdict.cls + '">' +
          '<div class="pj-headline">' +
            '<strong>Projection ' + (daysToExam > 0 ? "J-" + daysToExam : "examen passé") + '</strong> · ' + verdict.lbl +
          '</div>' +
          '<div class="pj-grid">' +
            '<div class="pj-cell"><span class="pj-num">' + avgNclc.toFixed(1) + '</span><span class="pj-lab">NCLC actuel<br>(moy. 4 mocks)</span></div>' +
            '<div class="pj-cell"><span class="pj-num">' + projected.toFixed(1) + '</span><span class="pj-lab">NCLC projeté<br>au ' + goal.date + '</span></div>' +
            '<div class="pj-cell"><span class="pj-num">' + target + '</span><span class="pj-lab">Cible</span></div>' +
            '<div class="pj-cell"><span class="pj-num">' + Math.round(activeRate * 100) + '%</span><span class="pj-lab">Jours actifs<br>(28j)</span></div>' +
          '</div>' +
          '<div class="pj-bar-wrap" aria-label="Barre de progression vers la cible">' +
            '<div class="pj-bar"><div class="pj-bar-fill" style="width:' + Math.min(100, Math.round(100 * projected / target)) + '%"></div></div>' +
            '<div class="pj-bar-labels"><span>0</span><span>NCLC ' + target + ' cible</span></div>' +
          '</div>' +
          '<p class="pj-note">' +
            (reach ? "Maintien de l'activité actuelle (" + Math.round(activeRate * 100) + "%) suffit. Surveiller la compétence la plus faible."
                   : "Pour atteindre " + target + " au " + goal.date + " : " + (Math.ceil((target - projected) * 14) + " jours actifs supplémentaires") + " ou ré-évaluer la cible.") +
          '</p>' +
        '</div>';
    }
    render();
    setInterval(render, 30000);
  }

  // ---------- 68. ICS calendar export ------------------------------
  // .tcf-ics-export — generate mock-exam study calendar download
  onPage(() => { document.querySelectorAll(".tcf-ics-export").forEach(mountIcs); });

  function mountIcs(host) {
    if (host.dataset.mounted) return;
    host.dataset.mounted = "1";
    const goal = ls.get("goal", null);
    host.innerHTML =
      '<div class="ic-wrap">' +
        '<p>Génère un fichier <code>.ics</code> avec : 4 mocks répartis, 12 sessions hebdo (skill faible), 1 alerte 7j avant.</p>' +
        '<div class="ic-form">' +
          '<label>Date examen : <input type="date" class="ic-date" value="' + (goal && goal.date || "") + '"></label>' +
          '<label>Cible NCLC : <select class="ic-nclc"><option>7</option><option selected>8</option><option>9</option><option>10</option></select></label>' +
          '<label>Skill faible : <select class="ic-weak"><option>CO</option><option>CE</option><option selected>EE</option><option>EO</option></select></label>' +
        '</div>' +
        '<button type="button" class="ic-gen" aria-label="Générer et télécharger le calendrier au format iCalendar">⬇ Télécharger calendrier .ics</button>' +
        '<p class="ic-note">Compatible Google Calendar, Apple Calendar, Outlook.</p>' +
      '</div>';

    function pad(n) { return String(n).padStart(2, "0"); }
    function dtUtc(d) { return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + "00Z"; }
    function event(uid, dt, dtEnd, summary, desc) {
      return ["BEGIN:VEVENT",
        "UID:" + uid + "@tcf-prep",
        "DTSTAMP:" + dtUtc(new Date()),
        "DTSTART:" + dtUtc(dt),
        "DTEND:" + dtUtc(dtEnd),
        "SUMMARY:" + summary,
        "DESCRIPTION:" + desc.replace(/\n/g, "\\n"),
        "END:VEVENT"].join("\r\n");
    }

    host.querySelector(".ic-gen").addEventListener("click", () => {
      const dateStr = host.querySelector(".ic-date").value;
      const nclc = host.querySelector(".ic-nclc").value;
      const weak = host.querySelector(".ic-weak").value;
      if (!dateStr) { if (window.TCF && window.TCF.toast) window.TCF.toast("Choisir une date."); return; }
      const exam = new Date(dateStr + "T09:00:00");
      const events = [];
      // Exam day
      events.push(event("tcf-exam", exam, new Date(exam.getTime() + 3.5 * 3600 * 1000),
        "TCF Canada — Examen (cible NCLC " + nclc + ")", "Bonne chance ! Apporter pièce d'identité, arriver 30 min avant."));
      // 7-day alert
      const alert7 = new Date(exam); alert7.setDate(alert7.getDate() - 7); alert7.setHours(9, 0, 0, 0);
      events.push(event("tcf-7d", alert7, new Date(alert7.getTime() + 30 * 60 * 1000),
        "TCF — J-7 : récap final", "Imprimer la cheatsheet, vérifier les anti-erreurs §" + weak + ", repos."));
      // 4 mocks: J-28, J-21, J-14, J-7 morning
      [28, 21, 14, 7].forEach((d, i) => {
        const m = new Date(exam); m.setDate(m.getDate() - d); m.setHours(9, 0, 0, 0);
        events.push(event("tcf-mock" + (i + 1), m, new Date(m.getTime() + 3 * 3600 * 1000),
          "TCF — Mock " + (i + 1) + " / 4 (3 h plein format)",
          "Conditions réelles : silence, pas de pauses, scorer avec la grille. Saisir les résultats dans tableau de bord."));
      });
      // 12 weekly focus sessions (Sat 10h-11h30) starting 12 weeks back
      for (let w = 12; w >= 1; w--) {
        const s = new Date(exam); s.setDate(s.getDate() - w * 7);
        // round to Saturday
        const dow = s.getDay(); s.setDate(s.getDate() + (6 - dow));
        s.setHours(10, 0, 0, 0);
        events.push(event("tcf-week" + w, s, new Date(s.getTime() + 90 * 60 * 1000),
          "TCF — Session focus " + weak + " (S-" + w + ")",
          "Bloc de 90 min ciblé " + weak + ". Voir le plan du jour pour les outils suggérés."));
      }
      const ics = ["BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//TCF Canada Prep//FR",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "X-WR-CALNAME:TCF Canada — préparation",
        "X-WR-TIMEZONE:America/Montreal"].concat(events).concat(["END:VCALENDAR"]).join("\r\n");
      const blob = new Blob([ics], { type: "text/calendar" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "tcf-prep-" + dateStr + ".ics";
      a.click();
      if (window.TCF && window.TCF.sfx) window.TCF.sfx("good");
      if (window.TCF && window.TCF.toast) window.TCF.toast("Calendrier .ics téléchargé.");
    });
  }

  // ---------- 69. Focus mode toggle (Zen reading) ------------------
  // .tcf-focus-toggle — global UI: hide nav/sidebar, max-width content
  onPage(() => {
    document.querySelectorAll(".tcf-focus-toggle").forEach((b) => {
      if (b.dataset.mounted) return;
      b.dataset.mounted = "1";
      const on = ls.get("focus:on", false);
      if (on) document.body.classList.add("tcf-focus-on");
      b.textContent = on ? "🌐 Mode normal" : "🎯 Mode focus";
      b.addEventListener("click", () => {
        const cur = document.body.classList.toggle("tcf-focus-on");
        ls.set("focus:on", cur);
        b.textContent = cur ? "🌐 Mode normal" : "🎯 Mode focus";
        if (window.TCF && window.TCF.toast) window.TCF.toast(cur ? "Mode focus activé." : "Mode focus désactivé.");
      });
    });
  });

  // Expose v1.5 useful functions
  window.TCF = window.TCF || {};
  window.TCF.srsMount = mountSRS;
  window.TCF.icsExport = mountIcs;

  // Extend palette with v1.4 + v1.5 entries
  if (Array.isArray(PALETTE_ITEMS)) {
    PALETTE_ITEMS.push(
      { id: "eo_rec",   title: "Enregistreur EO + rubrique (v1.4)",          hint: "", href: "11_tools/eo-enregistreur/" },
      { id: "ee_sim",   title: "Simulation EE — 60 min, 3 tâches (v1.4)",    hint: "", href: "11_tools/ee-simulation/" },
      { id: "tense",    title: "Drill PC vs imparfait (v1.4)",                hint: "", href: "11_tools/passe-compose-imparfait/" },
      { id: "pron",     title: "Drill pronoms (y/en/le/la/lui/leur) (v1.4)",  hint: "", href: "11_tools/pronoms/" },
      { id: "daily",    title: "Défi quotidien — 5 questions (v1.4)",         hint: "g d", href: "11_tools/defi/" },
      { id: "phrase",   title: "Phrase du jour B2 (v1.4)",                    hint: "", href: "11_tools/phrase-du-jour/" },
      { id: "equiv",    title: "Équivalence CECRL ↔ NCLC (v1.4)",             hint: "", href: "11_tools/equivalence/" },
      { id: "yearmap",  title: "Heatmap 365 jours (v1.4)",                    hint: "", href: "11_tools/annee/" },
      { id: "srs",      title: "SRS adaptatif SM-2 (v1.5)",                   hint: "g r", href: "11_tools/revue/" },
      { id: "shadow",   title: "Shadow speaking (v1.5)",                      hint: "", href: "11_tools/shadow/" },
      { id: "eerub",    title: "Rubrique EE self-grader (v1.5)",              hint: "", href: "11_tools/ee-rubrique/" },
      { id: "codict",   title: "Dictée CO précision (v1.5)",                  hint: "", href: "11_tools/co-dictee/" },
      { id: "conjdr",   title: "Drill conjugaison interactif (v1.5)",         hint: "", href: "11_tools/conjugaison-drill/" },
      { id: "mistake",  title: "Analyse des schémas d'erreur (v1.5)",         hint: "", href: "11_tools/analyse/" },
      { id: "proj",     title: "Projection NCLC à l'examen (v1.5)",           hint: "", href: "11_tools/projection/" },
      { id: "ics",      title: "Calendrier .ics (mocks + sessions) (v1.5)",   hint: "", href: "11_tools/calendrier/" }
    );
  }

  // Mark today active on v1.4 widgets
  document.addEventListener("click", (e) => {
    const t = e.target; if (!t || !t.matches) return;
    if (t.matches(".tn-opt, .pn-opt, .dl-opt, .er-save, .es-finish")) {
      try {
        const k = new Date().toISOString().slice(0, 10);
        const days = ls.get("streak:days", {}) || {};
        if (!days[k]) { days[k] = 1; ls.set("streak:days", days); }
      } catch(_){}
    }
  });
})();
