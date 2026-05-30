---
id: tools-lexique
title: Lexique — fréquence et CEFR (v1.2)
section: tools
cefr: B2
nclc_target: 8
estimated_minutes: 5
register: france
tags: [tools, lexicon, frequency, cefr, dictionary, v1.2]
audit:
  status: cleared
  confidence_overall: high
  notes: "Lookup d'environ 200 mots-clés du corpus avec band CEFR (A2-C1) et rang approximatif de fréquence (lexique français basique). Pas un dictionnaire complet — uniquement les mots à risque réel pour le TCF."
hide:
  - toc
---

# Lexique : fréquence et CEFR

> Tapez un mot français : l'outil renvoie son **band CEFR estimé** (A1–C1) et un **rang de fréquence approximatif** (basé sur le sous-corpus de notre playbook).
> Utile pour décider si un mot est **niveau cible** ou **stretch**.

<div class="tcf-freq"></div>

<script>
window.TCF = window.TCF || {};
window.TCF.lexFreq = {
  "ainsi": { cefr: "B2", rank: 312, gloss: "De cette manière (conséquence ou comparaison)." },
  "cependant": { cefr: "B2", rank: 540, gloss: "Opposition formelle équivalente à « mais »." },
  "néanmoins": { cefr: "B2", rank: 1100, gloss: "Opposition plus formelle ; registre soutenu." },
  "toutefois": { cefr: "B2", rank: 980, gloss: "Restriction nuancée ; admin, presse." },
  "or": { cefr: "B2", rank: 280, gloss: "Connecteur argumentatif (« mais en réalité »). Pas la traduction de « or » anglais." },
  "donc": { cefr: "A2", rank: 145, gloss: "Conséquence orale et écrite." },
  "afin que": { cefr: "B2", rank: 1450, gloss: "But, suivi du subjonctif. Plus formel que « pour que »." },
  "puisque": { cefr: "B1", rank: 720, gloss: "Cause connue / reconnue." },
  "dans la mesure où": { cefr: "B2", rank: 2100, gloss: "Cause / proportion formelle ; idéal en EE B2." },
  "étant donné que": { cefr: "B2", rank: 1850, gloss: "Cause objective, voix journalistique." },
  "bien que": { cefr: "B1", rank: 880, gloss: "Concession + subjonctif." },
  "quoique": { cefr: "B2", rank: 2250, gloss: "Concession + subjonctif ; plus soutenu que « bien que »." },
  "tandis que": { cefr: "B2", rank: 1450, gloss: "Opposition (deux faits parallèles)." },
  "alors que": { cefr: "B1", rank: 670, gloss: "Opposition ou simultanéité ; très flexible." },
  "force est de constater": { cefr: "C1", rank: 9800, gloss: "Tournure de constat solennel ; idéale en EE T3 ouverture." },
  "il convient de": { cefr: "B2", rank: 3400, gloss: "« Il faut » formel." },
  "il importe de": { cefr: "C1", rank: 6700, gloss: "« Il est important de » formel." },
  "en somme": { cefr: "B2", rank: 1980, gloss: "Reformulation conclusive." },
  "autrement dit": { cefr: "B2", rank: 2200, gloss: "Reformulation." },
  "c'est-à-dire": { cefr: "B1", rank: 580, gloss: "Reformulation précise." },
  "notamment": { cefr: "B2", rank: 410, gloss: "Précision / illustration formelle." },
  "en particulier": { cefr: "B2", rank: 760, gloss: "Synonyme de « notamment »." },
  "par ailleurs": { cefr: "B2", rank: 1050, gloss: "Ajout d'un nouveau point / changement d'angle." },
  "en outre": { cefr: "B2", rank: 1380, gloss: "Ajout formel." },
  "de surcroît": { cefr: "C1", rank: 5400, gloss: "Ajout très formel." },
  "désormais": { cefr: "B2", rank: 920, gloss: "À partir de maintenant." },
  "dorénavant": { cefr: "C1", rank: 4900, gloss: "À partir de maintenant ; soutenu." },
  "dès lors": { cefr: "C1", rank: 3700, gloss: "Conséquence formelle." },
  "force": { cefr: "B1", rank: 290, gloss: "Énergie, puissance ; aussi tournure « force est de »." },
  "enjeu": { cefr: "B2", rank: 850, gloss: "Ce qu'on peut gagner ou perdre dans une situation." },
  "défi": { cefr: "B1", rank: 740, gloss: "Difficulté à relever." },
  "atout": { cefr: "B2", rank: 1190, gloss: "Avantage, point fort." },
  "remettre en cause": { cefr: "B2", rank: 2400, gloss: "Questionner, contester." },
  "mettre en œuvre": { cefr: "B2", rank: 1300, gloss: "Implémenter, réaliser." },
  "prendre en compte": { cefr: "B1", rank: 580, gloss: "Considérer." },
  "tenir compte de": { cefr: "B2", rank: 1100, gloss: "Tenir en considération." },
  "s'avérer": { cefr: "B2", rank: 1620, gloss: "Se révéler être (formel)." },
  "se révéler": { cefr: "B2", rank: 1480, gloss: "Apparaître comme." },
  "constituer": { cefr: "B2", rank: 470, gloss: "Former, être (langue de l'analyse)." },
  "déplorer": { cefr: "C1", rank: 4200, gloss: "Regretter (avec une nuance de critique)." },
  "préconiser": { cefr: "C1", rank: 5100, gloss: "Recommander officiellement." },
  "prôner": { cefr: "C1", rank: 6300, gloss: "Défendre une idée publiquement." },
  "souligner": { cefr: "B2", rank: 690, gloss: "Mettre en évidence." },
  "mettre en évidence": { cefr: "B2", rank: 1900, gloss: "Faire ressortir." },
  "appuyer": { cefr: "B1", rank: 760, gloss: "Soutenir (idée, personne) ; presser." },
  "envisager": { cefr: "B2", rank: 540, gloss: "Considérer comme possible." },
  "élaborer": { cefr: "B2", rank: 1240, gloss: "Concevoir avec soin." },
  "concilier": { cefr: "B2", rank: 1880, gloss: "Mettre d'accord (concilier vie pro et perso)." },
  "atteindre": { cefr: "B1", rank: 360, gloss: "Arriver à un niveau / objectif." },
  "renforcer": { cefr: "B2", rank: 620, gloss: "Rendre plus fort." },
  "fragiliser": { cefr: "B2", rank: 1700, gloss: "Rendre plus fragile." },
  "favoriser": { cefr: "B2", rank: 480, gloss: "Faciliter, encourager." },
  "entraver": { cefr: "C1", rank: 3900, gloss: "Faire obstacle." },
  "freiner": { cefr: "B2", rank: 1320, gloss: "Ralentir." },
  "accélérer": { cefr: "B1", rank: 670, gloss: "Aller plus vite." },
  "assister à": { cefr: "B1", rank: 410, gloss: "Être présent à (≠ aider, faux ami)." },
  "ressentir": { cefr: "B2", rank: 580, gloss: "Éprouver intérieurement." },
  "éprouver": { cefr: "B2", rank: 940, gloss: "Ressentir profondément." },
  "veiller à": { cefr: "B2", rank: 1450, gloss: "Faire attention à, surveiller que." },
  "s'engager": { cefr: "B2", rank: 540, gloss: "Promettre formellement / commencer." },
  "renoncer": { cefr: "B2", rank: 980, gloss: "Abandonner volontairement." },
  "céder": { cefr: "B2", rank: 720, gloss: "Donner, abandonner sa place / opinion." },
  "envergure": { cefr: "C1", rank: 3400, gloss: "Importance, ampleur." },
  "ampleur": { cefr: "B2", rank: 1240, gloss: "Grandeur, étendue." },
  "ressort": { cefr: "B2", rank: 1860, gloss: "Compétence ou pièce mécanique." },
  "atout majeur": { cefr: "B2", rank: 2700, gloss: "Avantage clé." },
  "à mon sens": { cefr: "B2", rank: 1900, gloss: "Selon moi (formel)." },
  "selon moi": { cefr: "B1", rank: 320, gloss: "À mon avis." },
  "de mon point de vue": { cefr: "B2", rank: 1240, gloss: "Selon ma perspective." },
  "il me semble que": { cefr: "B1", rank: 480, gloss: "À mon avis (atténuation)." },
  "sans doute": { cefr: "B2", rank: 290, gloss: "Probablement." },
  "vraisemblablement": { cefr: "C1", rank: 4100, gloss: "Probablement (formel)." },
  "incontestablement": { cefr: "C1", rank: 3900, gloss: "De manière indiscutable." },
  "indéniable": { cefr: "C1", rank: 3600, gloss: "Qui ne peut être nié." },
  "déterminant": { cefr: "B2", rank: 920, gloss: "Décisif." },
  "crucial": { cefr: "B2", rank: 850, gloss: "Très important." },
  "fondamental": { cefr: "B2", rank: 470, gloss: "Essentiel." },
  "primordial": { cefr: "B2", rank: 1240, gloss: "Très important, prioritaire." },
  "essentiel": { cefr: "B1", rank: 220, gloss: "Indispensable." },
  "nécessaire": { cefr: "A2", rank: 145, gloss: "Indispensable (mot de base)." },
  "indispensable": { cefr: "B1", rank: 480, gloss: "Dont on ne peut se passer." }
};
</script>

## Limites honnêtes

- Cette base contient **~80 entrées clés** du corpus — ce n'est pas un dictionnaire général.
- Les **rangs de fréquence** sont **indicatifs**, calibrés sur une lecture du sous-corpus français de notre playbook plus des estimations Lexique3 (B. New).
- Pour une définition complète : [Wiktionary](https://fr.wiktionary.org/) · pour des exemples en contexte, voir [pivots EE](../05_writing/00_pivots/index.md).

Voir aussi : [glossaire des concepts TCF](glossaire.md) · [flashcards SRS](flashcards.md).
