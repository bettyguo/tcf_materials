---
id: tools-wpm
title: Test de vitesse de lecture (WPM)
section: tools
cefr: B2
nclc_target: 8
estimated_minutes: 5
register: france
tags: [tools, reading, wpm, ce, speed]
audit:
  status: cleared
  confidence_overall: high
  notes: "Passage extrait d'un article de presse modèle B2 (rédigé pour le corpus, non copié). Pas de copyright tiers. Calibration de la vitesse : 220 wpm = confortable, 170 wpm = TCF minimum opérationnel, < 120 wpm = stratégie de survol forcée nécessaire."
hide:
  - toc
---

# Test de vitesse de lecture (WPM)

> Cliquez **Démarrer**, lisez le passage à votre rythme naturel, cliquez **J'ai fini**. Le widget calcule votre vitesse en **mots par minute (wpm)** et la situe par rapport aux seuils opérationnels pour le TCF CE.

!!! tip "Pourquoi cet outil est crucial pour CE"
    L'épreuve CE = **39 items en 60 minutes** = ~1.5 min/item incluant la lecture du texte. Sous **170 wpm**, vous n'aurez **pas le temps** de lire chaque texte entier — vous serez forcé au **survol** (lecture en diagonale + recherche ciblée), une stratégie efficace mais qui exige préparation.

## Passage A — presse B2 (~ 220 mots)

<div class="tcf-wpm" data-passage="ce_b2"></div>

## Passage B — texte informatif C1 (~ 260 mots)

<div class="tcf-wpm" data-passage="ce_c1"></div>

<script>
window.TCF = window.TCF || {};
window.TCF.passages = window.TCF.passages || {};

window.TCF.passages.ce_b2 = {
  source: "Rédigé pour le corpus TCF Canada Prep — domaine public",
  text: `Depuis quelques années, le télétravail s'est imposé dans de nombreux secteurs. Ce qui était autrefois perçu comme une faveur exceptionnelle est devenu, pour beaucoup de salariés, une norme de fonctionnement. Les avantages sont nombreux : moins de transports, davantage de flexibilité, et parfois une meilleure conciliation entre la vie professionnelle et la vie personnelle.

Cependant, cette évolution soulève également des questions. Comment maintenir le lien entre les membres d'une équipe lorsqu'ils ne se croisent plus qu'à travers un écran ? Comment garantir l'égalité entre ceux qui peuvent télétravailler et ceux dont le métier exige une présence sur site ? Et surtout, comment éviter que les frontières entre travail et vie privée ne s'effacent complètement, au risque d'engendrer du surmenage ?

Plusieurs entreprises commencent à proposer des solutions hybrides. Deux ou trois jours au bureau, le reste à domicile : ce compromis semble séduire la majorité des employés. D'autres organisations, en revanche, font marche arrière et exigent un retour complet sur site, estimant que la cohésion d'équipe et la créativité collective en pâtissent à distance.

Quoi qu'il en soit, le débat est loin d'être clos. Les habitudes prises pendant la pandémie ont durablement modifié les attentes des travailleurs, et il est désormais difficile d'imaginer un retour en arrière sans risquer une vague de démissions. Les directions des ressources humaines devront donc trouver un équilibre subtil entre productivité, bien-être et culture d'entreprise.`,
  words: 232
};

window.TCF.passages.ce_c1 = {
  source: "Rédigé pour le corpus TCF Canada Prep — domaine public",
  text: `L'intelligence artificielle, longtemps cantonnée aux laboratoires de recherche, s'est imposée en quelques années dans le quotidien de millions de personnes. Outils de traduction, assistants vocaux, systèmes de recommandation, moteurs de génération de texte : aucun secteur ne semble désormais à l'abri de cette mutation technologique, qui suscite à la fois enthousiasme et inquiétude.

Les promesses sont considérables. Dans le domaine médical, par exemple, les algorithmes parviennent à identifier certaines pathologies sur des images radiologiques avec une précision qui rivalise avec celle des praticiens les plus expérimentés. Dans l'enseignement, les outils adaptatifs permettent d'individualiser les parcours et de cibler précisément les difficultés de chaque apprenant. L'industrie, quant à elle, voit dans l'automatisation un levier majeur de productivité et de compétitivité.

Toutefois, ces avancées ne vont pas sans poser de redoutables défis. La question de l'emploi se pose avec acuité : si certains métiers disparaissent, d'autres émergent, mais la transition risque d'être brutale pour les travailleurs les moins qualifiés. Les enjeux éthiques sont tout aussi cruciaux. Comment garantir que les données utilisées pour entraîner ces systèmes ne reproduisent pas, voire n'amplifient pas, les biais sociaux existants ? Qui doit être tenu responsable lorsqu'une décision automatisée cause un préjudice ?

Face à ces interrogations, les pouvoirs publics cherchent à mettre en place un cadre réglementaire qui concilie innovation et protection des citoyens. Le défi consiste à ne pas freiner le progrès tout en évitant les dérives. Cet équilibre, fragile, sera l'un des grands enjeux des prochaines décennies.`,
  words: 257
};
</script>

## Seuils opérationnels TCF CE

| Vitesse | Interprétation |
|---:|---|
| **≥ 220 wpm** | Confortable. Vous lirez chaque texte + relirez les passages clés sans panique. |
| **170-219 wpm** | Solide. Adéquat pour 39 items en 60 min. Marge réduite pour les textes C1. |
| **120-169 wpm** | Acceptable. Vous devrez maîtriser le **survol** ([`02_ce_strategy.md`](../09_strategy/02_ce_strategy.md)) et la **lecture ciblée par mot-clé**. |
| **< 120 wpm** | À renforcer. Sans entraînement vitesse, le risque de ne pas finir l'épreuve est élevé. |

## Comment progresser

- **Lecture extensive** : un article B2 entier par jour (Courrier International, Sciences et Avenir, Le Devoir). 5-10 min/jour.
- **Lecture intensive** : un texte du corpus + chronométrage, 3×/semaine. Voir [`04_reading/`](../04_reading/index.md).
- **Saccades larges** : entraînez-vous à lire 4-5 mots par fixation oculaire au lieu de mot-à-mot. Méthode : passer un crayon sous chaque ligne, suivre.
- **Anti-sous-vocalisation** : pas de bouche qui bouge ni de murmure intérieur — ralentit fortement.

## Limites du test

1. **2 passages** seulement (un B2, un C1). Pour un test exhaustif, prenez 10 textes du corpus.
2. **Pas de compréhension mesurée** — vitesse pure. En examen réel, vous devez aussi répondre aux items. Une lecture rapide qui rate les détails ne sert à rien.
3. **Variabilité** : votre vitesse oscille selon l'état (fatigue, café, sommeil). Mesurez sur plusieurs jours pour une moyenne fiable.

## Voir aussi

- [Stratégie CE — survol, ancrage, élimination](../09_strategy/02_ce_strategy.md)
- [Bank Compréhension écrite (60 items)](../04_reading/index.md)
- [Drill conjugaison](conjugaison.md)
- [Retour aux outils](index.md)
