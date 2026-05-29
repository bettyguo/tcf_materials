---
id: mock-diagnostic-protocol
title: "Diagnostic post-mock — protocole d'exploitation"
section: mock
cefr: B2
nclc_target: 7
estimated_minutes: 30
register: france
tags: [mock, diagnostic, protocol]
audit:
  status: cleared
  reviewer: claude-04
  confidence_overall: high
  notes: "Document de méthode ; pointe vers calculate_score.py, rubrics EE/EO, et le gabarit template."
---

# Diagnostic post-mock — protocole d'exploitation

Le mock ne sert à rien sans diagnostic. Ce protocole décrit, étape par étape, comment transformer 2 h 47 d'épreuve simulée en trois axes de travail mesurables pour les quatorze jours qui suivent. Lis-le une fois en entier avant ton premier mock ; après, le gabarit de `00_diagnostic_template.md` est ton seul compagnon.

## 1. Quand exécuter le diagnostic

Le diagnostic doit être lancé **dans les 48 heures qui suivent la fin du mock**, idéalement à J+1. Au-delà, deux choses se produisent : (i) l'oubli de mémoire-de-travail rend impossible la reconstruction de pourquoi tu as coché telle case sur tel item CO ; (ii) tu rationalises tes erreurs (« j'étais fatigué », « la question était mal posée »), ce qui détruit la valeur du signal.

À l'inverse, **ne pas le lancer le jour même**. Pour la composante EO en particulier, écouter l'enregistrement à chaud te le fait juger sévèrement (le contraste avec la voix intérieure pendant l'examen) ou trop indulgemment (la fierté d'avoir terminé). Un décalage de 18 à 30 heures te restitue l'objectivité d'un examinateur extérieur.

**Budget** : 30 minutes, chronomètre en main. Si tu débordes systématiquement à 45 min, c'est que tu sur-analyses ; force-toi à conclure et garde le surplus pour le travail réel des axes. À l'inverse, si tu termines en 12 minutes, tu cliques sans lire — recommence.

## 2. Comment scorer la CO et la CE

C'est mécanique. Compte tes bonnes réponses pour chaque section, puis lance :

```
python -m tools.calculate_score --co <CO_raw_sur_699> --ce <CE_raw_sur_699> --ee <EE_sur_20> --eo <EO_sur_20>
```

Le score brut sur 699 n'est pas le nombre de bonnes réponses : c'est une transformation linéaire dépendant de la version du barème. Pour nos mocks calibrés, **bonnes réponses × 18** approxime le brut à ± 10 points dans la fourchette NCLC 6–8, ce qui suffit pour produire une carte CEFR/NCLC fiable. La calculatrice utilise les tables IRCC + FEI 2024 (en vigueur 2026), versionnées sous le tag `2024-IRCC-FEI` dans `tools/calculate_score.py`. Toute mise à jour officielle IRCC déclenchera un bump de cette constante et un test de régression dédié.

Pour la version web (entraînement en mobilité, à l'aveugle), ouvre `site/calculator.html` localement ; les tables y sont dupliquées, mais le test `tests/test_calculate_score.py` est ton garde-fou contre la divergence (un check de cohérence Python/JS reste un TODO du backlog).

Une fois les quatre NCLC en main, retiens **le minimum** : c'est ton « NCLC officiel » au sens IRCC. Le seuil cible (CRS +50, NCLC 7 partout) tombe ou ne tombe pas sur la base de cette unique valeur ; deux 9 et un 6 te donnent un 6, pas un 8.

## 3. Comment scorer l'EE et l'EO

L'auto-notation est un exercice contestable mais c'est ce qu'on a entre deux revues natives. La méthode minimise l'erreur :

1. **Compare ta copie aux trois modèles NCLC 7 / 8 / 9** présents dans le dossier du mock (`07_ee_models_t1.md`, `t2`, `t3` ; pareil pour EO). Pose-toi la question : « si je glisse ma copie dans la liasse des modèles, à côté duquel se range-t-elle ? » C'est plus fiable que de partir des critères dans l'abstrait.
2. **Applique ensuite la rubrique** (`content/05_writing/00_rubric.md`, `content/06_speaking/00_rubric.md`) critère par critère, en partant de la note du modèle proche et en ajustant ± 1 par critère. Évite l'arrondi vers le haut systématique : si tu hésites entre 3 et 4, prends 3.
3. **Note les pivots** que tu as utilisés en EE : compare-les au catalogue `content/05_writing/00_pivots/*.md`. Un texte argumentatif sans aucun pivot de concession (« certes… toutefois », « il n'en demeure pas moins que ») plafonne à NCLC 7, peu importe l'orthographe.
4. **Pour l'EO** : réécoute ton enregistrement, casque fermé, **à J+1 minimum**. Note d'abord la phonologie (case par case du tableau de la section 7 du gabarit), puis le contenu. L'ordre compte : si tu commences par le contenu, ton oreille filtre tes propres erreurs phono parce que tu sais ce que tu voulais dire.
5. **Confiance d'auto-notation** : à la fin de chaque tâche EE/EO, note un % de confiance. Sous 70 %, tu déclenches automatiquement une revue native (voir §5).

## 4. Comment mapper les erreurs au roadmap

C'est l'étape qui fait la différence entre un diagnostic décoratif et un diagnostic utile. Le gabarit te force à traduire chaque erreur en deux dimensions :

- **Type d'erreur** (lexical / inférentiel / détail / pragmatique / mécanique) — t'indique **quelle compétence** retravailler.
- **Catégorie de distracteur** (1 à 7 du `09_strategy/00_distractor_anatomy.md`) — t'indique **quelle stratégie** retravailler.

Exemple : si trois items CO ratés portent tous la catégorie 4 (inférence non garantie), ta rééducation est stratégique, pas linguistique — tu comprends les textes mais tu sur-interprètes. Ça pousse à muscler `content/09_strategy/01_co_strategy.md` et la rubrique « ne jamais inférer hors du texte », pas à empiler du vocabulaire. À l'inverse, si tes ratés sont concentrés sur les items CE B2/C1 avec type d'erreur « lexical », c'est ta banque Anki qui est en retard, pas ta stratégie de lecture.

Une fois la cartographie faite, **chaque axe choisi** (max 3) se traduit en un ou plusieurs **fichiers du corpus à retravailler**, et donc en un ou plusieurs **blocs ROADMAP** à muscler. Le tableau de la section 10 du gabarit existe précisément pour rendre cette traduction explicite.

Les **REBALANCE** suivent une règle dure : la somme algébrique des minutes ajoutées et retirées doit rester dans ± 15 min/sem, parce que le budget hebdomadaire est fixe à 14 h ± 30 min. Ajouter 60 minutes à la CO sans retirer 60 minutes ailleurs te fait basculer en sur-régime, et tu sais comment ça finit. Si tu n'arrives pas à identifier une compétence « en avance » d'où retrancher, c'est un signe que ton mock n'a pas révélé de réel goulot : refais le diagnostic en cherchant les compétences où tu es à NCLC 8+, ce sont elles qui financent les axes prioritaires.

## 5. Quand déclencher une revue native

Trois cas activent une revue native :

1. **Cadence régulière** : tous les **deux mocks complets** au minimum, indépendamment du reste. C'est non négociable parce que ta dérive d'auto-évaluation EE/EO croît dans le temps et ne se détecte pas de l'intérieur.
2. **Confiance d'auto-notation < 70 %** sur au moins une tâche EE ou EO du mock. La confiance n'est pas une formalité : c'est ton signal d'incertitude, et il déclenche la revue.
3. **Plateau** : si tes scores EE ou EO restent dans la même fourchette ± 1 point pendant 3 mocks consécutifs, c'est un plateau d'auto-notation autant qu'un plateau de production. Une revue native te dira lequel des deux.

La revue native se déclare dans `BACKLOG.md` sous l'étiquette `[NATIVE-REVIEW]`, avec l'item précis (p. ex. `mock_02 EE-T3 + EO-T3 — confiance auto-note: 65 %`). Ne demande pas une « relecture générale » ; demande **un critère précis de la rubrique sur une copie précise**. Le natif est plus utile en lecture ciblée qu'en survol.

## 6. Anti-pattern : ce qu'il ne faut pas faire

Trois pièges récurrents qui annulent le bénéfice du diagnostic :

- **Ré-écrire la copie EE après le mock pour s'auto-noter sur la version corrigée.** Tu te notes sur quelqu'un d'autre. Note la copie réellement produite, fautes comprises. La version corrigée sert au travail des 14 jours suivants, pas à l'auto-notation.
- **Inventer un axe « lexique » générique** quand tu n'as pas identifié de domaine thématique précis. « Travailler le vocabulaire » n'est pas un axe ; « travailler 40 collocations du domaine santé sur 14 jours » en est un. Si tu ne peux pas chiffrer le livrable, l'axe est trop vague.
- **Refuser de retirer du temps à une compétence en avance** par crainte de la « perdre ». À NCLC 8+, le retour sur investissement de 30 min/sem supplémentaires est inférieur à 1 point de mock. Ce temps a une utilité dix fois supérieure sur ta compétence goulot. Le mock suivant te dira si tu as eu raison.

## 7. Sortie attendue

À la fin des 30 minutes, tu dois pouvoir produire deux artefacts :

1. **Le fichier `mock_XX/10_post_mock_diagnostic.md`** complété (tout sauf la signature finale, optionnelle).
2. **Le bloc REBALANCE** collé dans `ROADMAP.md`, signé du numéro de mock et de la date.

Si l'un des deux manque, le diagnostic n'a pas eu lieu. Le mock suivant tombe alors sans cycle d'amélioration entre les deux, ce qui revient à passer un test sans corriger les erreurs : du temps perdu et un faux signal de progression. Le coût marginal d'un diagnostic propre est de 30 minutes ; le coût d'un mock sans diagnostic, en semaines 4 à 11, peut atteindre plusieurs heures de travail mal orienté.
