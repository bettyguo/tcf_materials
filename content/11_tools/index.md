---
id: tools-index
title: Outils interactifs
section: tools
cefr: B2
nclc_target: 8
estimated_minutes: 5
register: france
tags: [tools, interactive, calculator, timer, quiz]
audit:
  status: cleared
  confidence_overall: high
  notes: "Page d'atterrissage des outils interactifs côté navigateur. Aucun contenu pédagogique en français à risque ; navigation + métadonnées uniquement."
hide:
  - toc
---

# Outils interactifs

Une page = un outil. Tout fonctionne **côté navigateur uniquement** — aucune donnée n'est envoyée à un serveur. Les valeurs (score, timer, listes cochées) sont sauvegardées dans le stockage local de votre navigateur.

<div class="feature-grid">

<a class="cheat-card" href="calculateur-nclc/">
<span class="cheat-title">🧮 Calculateur NCLC</span>
<span class="cheat-desc">Entrez vos quatre scores bruts (CO, CE, EE, EO) — obtenez vos NCLC individuels, le NCLC binding (minimum), et le bonus Express Entry estimé. Lien partageable sans serveur.</span>
<span class="cheat-tag">Express Entry</span>
</a>

<a class="cheat-card" href="minuteur/">
<span class="cheat-title">⏱ Minuteur Pomodoro & examen</span>
<span class="cheat-desc">Pomodoro 25/5, plus tous les budgets-temps officiels TCF : CO 35 min, CE 60 min, EE T1/T2/T3, EO 12 min total. Bip sonore à la fin.</span>
<span class="cheat-tag">Session</span>
</a>

<a class="cheat-card" href="quiz-rapide/">
<span class="cheat-title">🎯 Quiz rapide multi-thèmes</span>
<span class="cheat-desc">10 questions tirées de la grammaire, du lexique, des cheatsheets stratégie. Feedback immédiat, score final, recommandations. Pas de tracking.</span>
<span class="cheat-tag">Auto-test</span>
</a>

<a class="cheat-card" href="checklist-j1/">
<span class="cheat-title">✅ Check-list J-1</span>
<span class="cheat-desc">La liste opérationnelle pour la veille d'examen — sac, pièces, sommeil, hydratation, taper protocol. Persiste vos cochages.</span>
<span class="cheat-tag">Veille d'examen</span>
</a>

<a class="cheat-card" href="raccourcis/">
<span class="cheat-title">⌨️ Raccourcis clavier</span>
<span class="cheat-desc">Navigation rapide sur tout le site : <kbd>?</kbd>, <kbd>s</kbd>, <kbd>g h</kbd>, <kbd>t</kbd>, <kbd>p</kbd>, <kbd>c</kbd>. À mémoriser pour fluidifier la pratique quotidienne.</span>
<span class="cheat-tag">Productivité</span>
</a>

<a class="cheat-card" href="../07_mock_exams/mock_01/09_score_calculator/">
<span class="cheat-title">📊 Feuille de score Mock #1</span>
<span class="cheat-desc">Le gabarit chiffré complet brut → CEFR → NCLC pour les examens blancs, avec ventilation par bande CEFR.</span>
<span class="cheat-tag">Mock exam</span>
</a>

</div>

## Pourquoi côté navigateur uniquement ?

1. **Vie privée.** Vos scores et votre progression restent dans votre navigateur. Effacer le stockage local efface tout. Aucun cookie, aucun tracking, aucun analytics tiers.
2. **Pas d'inscription.** Aucun compte à créer — chargez la page, utilisez l'outil, fermez l'onglet.
3. **Hors ligne.** Une fois la page chargée, les outils continuent de fonctionner sans connexion.
4. **Open-source.** Tout le code des widgets est dans [`content/assets/javascripts/extra.js`](https://github.com/bettyguo/tcf_materials/blob/main/content/assets/javascripts/extra.js). Vous pouvez auditer, forker, modifier.

## Comment ces outils s'intègrent au programme

| Phase | Outil le plus utile | Pourquoi |
|---|---|---|
| Jour 0 — diagnostic | **Calculateur NCLC** | Convertir les scores diagnostics → savoir où vous êtes |
| Semaines 1-4 — montée | **Minuteur** (Pomodoro) | Sessions de 25 min ciblées par compétence |
| Semaines 5-11 — mocks | **Calculateur NCLC** + feuille Mock | Tracer la trajectoire des 4 examens blancs |
| Semaine 12 — taper | **Check-list J-1** | Ne rien oublier la veille |
| Pendant l'examen blanc | **Minuteur** (presets TCF) | Réplique les conditions chronométrées |
