/* TCF Canada Prep — v1.3 data banks
 *
 * Audited content for v1.3 widgets: CE/CO trainers, liaisons, builders, synonymes.
 * All text is reviewed against the existing corpus framing.
 * No external lookups, no network calls.
 */
(function () {
  "use strict";
  window.TCF = window.TCF || {};
  const T = window.TCF;

  // -----------------------------------------------------------------
  // CE entraîneur — reading comprehension packs
  // -----------------------------------------------------------------
  T.cePacks = T.cePacks || {};

  T.cePacks.b2_pack1 = {
    title: "Lot CE B2 — vie quotidienne & société (pack 1)",
    level: "B2",
    minutes: 14,
    passages: [
      {
        id: "p1",
        words: 92,
        text: "<p>À compter du 1<sup>er</sup> juin, le service de bibliothèque municipale de Sherbrooke modifie ses horaires. Du lundi au vendredi, l'ouverture est avancée à 9 h ; les fermetures restent inchangées (20 h en semaine, 17 h le samedi). Le dimanche, la bibliothèque reste fermée. Les usagers peuvent désormais rendre leurs documents en dehors des heures d'ouverture grâce à la boîte de retour située à l'entrée. Les amendes pour retard ne s'appliquent que si le document est rendu plus de 14 jours après l'échéance.</p>",
        q: [
          { q: "Que change l'annonce à compter du 1ᵉʳ juin ?", options: [
            "Les heures de fermeture en semaine.",
            "L'heure d'ouverture en semaine.",
            "L'ouverture du dimanche.",
            "Le montant des amendes."
          ], a: 1, why: "Le texte précise : « l'ouverture est avancée à 9 h » ; le reste demeure inchangé." },
          { q: "Quand commence-t-on à payer une amende ?", options: [
            "Dès le premier jour de retard.",
            "Après 7 jours de retard.",
            "Après 14 jours de retard.",
            "Jamais — c'est gratuit."
          ], a: 2, why: "« plus de 14 jours après l'échéance » — pas avant." },
        ]
      },
      {
        id: "p2",
        words: 158,
        text: "<p>D'après une enquête publiée la semaine dernière par un institut indépendant, près d'un tiers des actifs québécois envisagent de quitter leur emploi dans les douze prochains mois. Les raisons évoquées sont, par ordre décroissant, la rémunération jugée insuffisante (38 %), le manque de perspectives d'évolution (27 %) et un déséquilibre persistant entre vie professionnelle et vie personnelle (24 %). Fait notable, le télétravail, présenté il y a deux ans comme une avancée majeure, n'apparaît plus parmi les principaux moteurs de satisfaction : seuls 12 % des répondants le citent comme un avantage déterminant. Les auteurs nuancent toutefois ces chiffres : la majorité des intentions de départ ne se concrétisent pas, et la pénurie de main-d'œuvre dans plusieurs secteurs renforce la position de négociation des employés. Une seconde vague de l'enquête est prévue à l'automne afin de mesurer l'écart entre intentions et passages à l'acte.</p>",
        q: [
          { q: "Quelle est la raison principale invoquée pour vouloir quitter son emploi ?", options: [
            "Le manque de télétravail.",
            "La rémunération insuffisante.",
            "Un mauvais équilibre vie pro/vie perso.",
            "L'absence de perspectives."
          ], a: 1, why: "38 % la citent — la part la plus élevée." },
          { q: "Que dit le texte du télétravail ?", options: [
            "Il reste l'avantage le plus déterminant.",
            "Il n'est plus parmi les principaux moteurs de satisfaction.",
            "Il a entièrement disparu des réponses.",
            "Il est devenu un facteur de départ."
          ], a: 1, why: "« n'apparaît plus parmi les principaux moteurs » — mais 12 % le citent encore." },
          { q: "Quelle nuance importante les auteurs apportent-ils ?", options: [
            "Tous les actifs vont effectivement démissionner.",
            "La majorité des intentions de départ ne se concrétisent pas.",
            "Le télétravail va revenir au premier plan.",
            "L'enquête est statistiquement nulle."
          ], a: 1, why: "« la majorité des intentions de départ ne se concrétisent pas »." },
        ]
      },
      {
        id: "p3",
        words: 187,
        text: "<p>Le mouvement de retour aux librairies indépendantes, amorcé après la pandémie, se confirme année après année. À Montréal, le nombre d'enseignes a augmenté de 11 % en cinq ans, alors même que les ventes de livres papier reculent globalement de 3 % sur la même période. Cet apparent paradoxe s'explique, selon plusieurs libraires interrogés, par une recomposition du métier : la librairie de quartier n'est plus seulement un lieu d'achat, elle redevient un espace de rencontre, d'animation et de conseil. Les soirées d'auteurs, les ateliers d'écriture et les abonnements personnalisés représentent désormais une part substantielle du chiffre d'affaires des plus dynamiques. <em>Cela étant</em>, la fragilité économique demeure : la marge nette moyenne du secteur tourne autour de 1,5 %, et les hausses récentes de loyer mettent en péril plusieurs établissements historiques. Des municipalités commencent à intervenir, soit par des baux à loyer modéré, soit par des subventions ciblées, conscientes qu'une librairie disparue se reconstitue rarement.</p>",
        q: [
          { q: "Quel paradoxe le texte souligne-t-il ?", options: [
            "Plus de librairies tandis que les ventes de livres papier reculent.",
            "Moins de librairies tandis que les ventes papier explosent.",
            "Plus de livres numériques que de librairies.",
            "Plus de lecteurs et moins d'auteurs."
          ], a: 0, why: "« nombre d'enseignes a augmenté de 11 % » alors que les ventes papier reculent de 3 %." },
          { q: "Comment ce paradoxe est-il expliqué ?", options: [
            "Par une baisse du prix du livre.",
            "Par une recomposition du métier vers le conseil et l'animation.",
            "Par un afflux de touristes.",
            "Par la fin du numérique."
          ], a: 1, why: "« recomposition du métier… espace de rencontre, d'animation et de conseil »." },
          { q: "Que dit le texte de la rentabilité du secteur ?", options: [
            "Très confortable, environ 15 %.",
            "Fragile, marge nette autour de 1,5 %.",
            "Inconnue.",
            "Subventionnée à 100 %."
          ], a: 1, why: "« la marge nette moyenne du secteur tourne autour de 1,5 % »." },
          { q: "Quel rôle jouent certaines municipalités ?", options: [
            "Elles interdisent les librairies.",
            "Elles imposent un prix unique.",
            "Elles offrent des baux modérés ou des subventions.",
            "Elles taxent les librairies."
          ], a: 2, why: "« baux à loyer modéré, soit par des subventions ciblées »." },
        ]
      },
      {
        id: "p4",
        words: 214,
        text: "<p>L'arrivée des outils génératifs en classe a réveillé un vieux débat sur la finalité de l'évaluation. Certaines universités ont fait le choix de l'interdiction stricte, d'autres misent au contraire sur une intégration encadrée. Les premiers pointent un risque évident d'appauvrissement intellectuel : confier à une machine la tâche d'écrire revient, à terme, à perdre l'aptitude à penser. Les seconds rétorquent que la même critique fut adressée à la calculatrice et que l'enjeu, dans les deux cas, consiste moins à proscrire l'outil qu'à redéfinir ce qu'on évalue. Un consensus partiel se dégage néanmoins : il importe désormais d'évaluer le processus autant, sinon plus, que le produit fini. Les épreuves orales, les versions intermédiaires d'un travail, les justifications de choix méthodologiques retrouvent une place qu'elles avaient perdue à l'ère du « tout numérique ». <em>Reste</em> la question de la fraude. Les détecteurs d'IA, dont la fiabilité plafonne, ne sauraient à eux seuls résoudre le problème ; certaines facultés expérimentent donc des contrôles « à livre ouvert » mais cadenassés temporellement, où l'usage d'un outil est autorisé, mais où la qualité de l'interaction avec lui devient elle-même un objet d'examen.</p>",
        q: [
          { q: "Quelle est la position des universités favorables à l'interdiction ?", options: [
            "L'outil va rendre l'évaluation plus juste.",
            "Confier l'écriture à une machine appauvrit la pensée.",
            "Les détecteurs sont parfaitement fiables.",
            "La calculatrice doit aussi être interdite."
          ], a: 1, why: "« confier à une machine la tâche d'écrire revient, à terme, à perdre l'aptitude à penser »." },
          { q: "Quel parallèle est mobilisé par les partisans de l'intégration ?", options: [
            "Le téléphone portable.",
            "Le manuel scolaire.",
            "La calculatrice.",
            "Le tableau noir."
          ], a: 2, why: "« la même critique fut adressée à la calculatrice »." },
          { q: "Quel consensus partiel se dégage ?", options: [
            "Évaluer le produit fini exclusivement.",
            "Évaluer le processus autant, sinon plus, que le produit.",
            "Supprimer toute évaluation.",
            "Ne plus utiliser l'écrit."
          ], a: 1, why: "Phrase explicite : « évaluer le processus autant, sinon plus, que le produit fini »." },
          { q: "Que dit le texte des détecteurs d'IA ?", options: [
            "Ils règlent le problème de la fraude.",
            "Leur fiabilité plafonne — ils ne suffisent pas seuls.",
            "Ils ne sont jamais utilisés.",
            "Ils sont interdits."
          ], a: 1, why: "« dont la fiabilité plafonne, ne sauraient à eux seuls résoudre »." },
        ]
      },
      {
        id: "p5",
        words: 226,
        text: "<p><strong>Tribune libre.</strong> Voilà bientôt vingt ans qu'on annonce la mort du papier, et il continue, contre toute attente, à occuper une place de choix dans le quotidien d'une partie des lecteurs. Sa résilience tient moins à un attachement nostalgique, comme on l'écrit trop souvent, qu'à une série de propriétés cognitives que le numérique n'a pas su répliquer : la spatialisation de la mémoire (« c'était en bas de la page de gauche »), l'absence de notifications, l'effet de butée qu'imposent les marges. Les études convergent : sur la compréhension fine, le papier garde un léger avantage pour les textes longs et complexes. Cela ne signifie évidemment pas qu'il faille abandonner les écrans ; il signifie qu'on aurait tort de les considérer comme universels, capables de remplir indifféremment toutes les fonctions de lecture. Il y aurait là, pour les politiques éducatives, un enseignement à tirer : doter chaque élève d'une tablette ne suffit pas si on ne lui apprend pas, en parallèle, à choisir le bon support selon la tâche. Un journal d'opinion se lit aussi bien à l'écran ; un manuel se travaille toujours mieux sur papier ; une recherche s'effectue plus efficacement en ligne. Le bon outil n'est pas le plus récent, mais celui qui sert le geste.</p>",
        q: [
          { q: "Selon l'auteur, à quoi tient la résilience du papier ?", options: [
            "À un simple attachement nostalgique.",
            "À des propriétés cognitives non répliquées par le numérique.",
            "À une mode passagère.",
            "À une obligation institutionnelle."
          ], a: 1, why: "« une série de propriétés cognitives que le numérique n'a pas su répliquer »." },
          { q: "Quelle est la position du texte sur les écrans ?", options: [
            "Il faut les abandonner.",
            "Ils sont universels et adaptés à toutes les tâches.",
            "Il faut les utiliser selon la tâche, sans les universaliser.",
            "Ils sont déjà obsolètes."
          ], a: 2, why: "« on aurait tort de les considérer comme universels »." },
          { q: "Quel constat l'auteur tire-t-il pour l'éducation ?", options: [
            "Distribuer plus de tablettes suffit.",
            "Il faut apprendre à choisir le bon support selon la tâche.",
            "Le papier doit rester seul.",
            "Il faut interdire le numérique à l'école."
          ], a: 1, why: "« doter chaque élève d'une tablette ne suffit pas si on ne lui apprend pas… à choisir le bon support »." },
          { q: "Quel est le ton général de la tribune ?", options: [
            "Catastrophiste.",
            "Nuancé et pragmatique.",
            "Nostalgique et fermé.",
            "Sarcastique."
          ], a: 1, why: "Ni rejet ni adhésion totale ; usage critique selon la tâche." },
        ]
      }
    ]
  };

  // -----------------------------------------------------------------
  // CO entraîneur — listening packs (TTS-based)
  // -----------------------------------------------------------------
  T.coPacks = T.coPacks || {};

  T.coPacks.b1_b2_pack1 = {
    title: "Lot CO B1-B2 — annonces, dialogues, brefs (pack 1)",
    level: "B1 → B2",
    items: [
      {
        text: "Bonjour, vous êtes bien sur le répondeur du Dr Lemieux. Le cabinet est fermé jusqu'au lundi 9. Pour toute urgence, composez le 8-1-1.",
        q: "Que doit faire l'auditeur en cas d'urgence ?",
        options: ["Rappeler le cabinet.", "Composer le 8-1-1.", "Attendre lundi 9.", "Laisser un message."],
        a: 1, why: "« Pour toute urgence, composez le 8-1-1 »."
      },
      {
        text: "Les passagers à destination de Québec sont priés de se présenter à la porte 14. L'embarquement débute dans cinq minutes.",
        q: "Quelle est la porte d'embarquement ?",
        options: ["La porte 4.", "La porte 14.", "La porte 40.", "La porte 44."],
        a: 1, why: "Numéro 14 — attention au piège quatorze/quarante."
      },
      {
        text: "Bonjour, c'est Léa. Je serai en retard d'environ vingt minutes — il y a une panne sur la ligne orange. Commencez sans moi.",
        q: "Pourquoi Léa sera-t-elle en retard ?",
        options: ["Elle a oublié l'heure.", "Une panne de métro.", "Un rendez-vous médical.", "Un embouteillage routier."],
        a: 1, why: "« il y a une panne sur la ligne orange » → métro."
      },
      {
        text: "Mesdames et messieurs, en raison d'un incident technique, le train de 18 h 12 partira avec un retard estimé à vingt-cinq minutes. Nous vous prions de nous excuser pour cette gêne.",
        q: "À quelle heure est prévu le départ initial ?",
        options: ["18 h 02.", "18 h 12.", "18 h 25.", "18 h 37."],
        a: 1, why: "« le train de 18 h 12 »."
      },
      {
        text: "Pour vous inscrire au cours de natation, présentez-vous au comptoir avant le 15 du mois. Le tarif est de quarante-cinq dollars pour les résidents et de soixante pour les autres.",
        q: "Combien coûte l'inscription pour un résident ?",
        options: ["40 $.", "45 $.", "55 $.", "60 $."],
        a: 1, why: "« quarante-cinq dollars pour les résidents »."
      },
      {
        text: "Bonjour, suite à votre courriel, je vous confirme que la réunion est reportée au mardi 23 à 14 h. Le lien de visioconférence est inchangé. Merci de confirmer votre présence par retour.",
        q: "Quelle est la date de la nouvelle réunion ?",
        options: ["Lundi 23 à 14 h.", "Mardi 23 à 14 h.", "Mardi 14 à 23 h.", "Mardi 23 à 4 h."],
        a: 1, why: "« reportée au mardi 23 à 14 h »."
      },
      {
        text: "La conférence sur la transition énergétique aura lieu jeudi prochain, à compter de dix-huit heures trente, dans l'amphithéâtre B. Trois intervenants se succéderont. L'entrée est libre mais l'inscription est recommandée.",
        q: "À quelle heure commence la conférence ?",
        options: ["8 h 30.", "16 h 30.", "18 h.", "18 h 30."],
        a: 3, why: "« à compter de dix-huit heures trente »."
      },
      {
        text: "Tu sais, je voulais te dire — j'apprécie vraiment ce que tu as fait pour le dossier. Sans ton coup de main, on n'aurait jamais bouclé à temps. La prochaine fois, c'est moi qui te dois un café.",
        q: "Quelle est l'intention principale du locuteur ?",
        options: ["S'excuser d'un retard.", "Remercier sincèrement.", "Reprocher un oubli.", "Demander un service."],
        a: 1, why: "« j'apprécie vraiment » + « la prochaine fois c'est moi qui te dois un café » — remerciement chaleureux."
      },
      {
        text: "Force est de constater que la grève paralyse le service depuis bientôt deux semaines. Les négociations, bien qu'amorcées, n'ont pas encore débouché sur un accord. Une nouvelle séance est prévue ce soir.",
        q: "Quelle est la situation des négociations ?",
        options: ["Elles n'ont jamais commencé.", "Elles ont déjà abouti.", "Elles ont commencé mais sans accord.", "Elles ont été annulées."],
        a: 2, why: "« bien qu'amorcées, n'ont pas encore débouché »."
      },
      {
        text: "Je ne dirais pas qu'on est satisfaits — disons plutôt qu'on est soulagés. Le résultat est correct, mais on attendait franchement mieux après six mois de travail.",
        q: "Quel est le sentiment exprimé ?",
        options: ["Pleine satisfaction.", "Soulagement teinté de déception.", "Indifférence complète.", "Colère ouverte."],
        a: 1, why: "« on est soulagés… on attendait franchement mieux »."
      },
    ]
  };

  // -----------------------------------------------------------------
  // Liaisons / élisions
  // -----------------------------------------------------------------
  T.liaisons = T.liaisons || {};

  T.liaisons.starter = [
    { phrase: "Les amis arrivent.",          render: "Lez-zami-zarrivent.",     ipa: "le.za.mi.za.ʁiv",         why: "Liaisons obligatoires après l'article pluriel (« les ») et l'antécédent direct du verbe." },
    { phrase: "Vous avez aimé ?",            render: "Vouz-zavez-zaimé ?",      ipa: "vu.za.ve.ze.me",          why: "Liaison en /z/ après « vous » + « avez » (pronom + auxiliaire)." },
    { phrase: "C'est un grand homme.",       render: "C'est-tun-grand-tomme.",  ipa: "se.tœ̃.ɡʁɑ̃.tɔm",           why: "Liaison obligatoire après l'adjectif antéposé. Le « -d » sonne /t/." },
    { phrase: "Ils ont attendu.",            render: "Ilz-zont-tattendu.",      ipa: "il.zɔ̃.ta.tɑ̃.dy",          why: "« Ils » + auxiliaire (liaison /z/) ; auxiliaire + participe (liaison /t/)." },
    { phrase: "Un petit avion.",             render: "Un petit-tavion.",        ipa: "œ̃.pə.ti.ta.vjɔ̃",          why: "Adjectif antéposé + nom : liaison obligatoire en /t/." },
    { phrase: "Il y a un homme.",            render: "Il-y-a-zun nomme.",       ipa: "il.ja.œ̃.nɔm",             why: "Élision de « un » devant H muet ; liaison /n/ avec « un »." },
    { phrase: "Je l'ai écouté.",             render: "J' l'ai-y-écouté.",       ipa: "ʒə.le.e.ku.te",           why: "Élision : « l' » pour « le/la » ; pas de liaison après « ai »." },
    { phrase: "Quand est-ce qu'il arrive ?", render: "Quand-test-tce qu'il arrive ?", ipa: "kɑ̃.tɛs.kil.a.ʁiv", why: "Liaison en /t/ : « quand » + voyelle inversion. Élision : « qu'il »." },
    { phrase: "Très intéressant.",           render: "Très-zintéressant.",      ipa: "tʁɛ.zɛ̃.te.ʁɛ.sɑ̃",        why: "Liaison facultative très courante après « très » + adjectif." },
    { phrase: "Dans un instant.",            render: "Danz-zun instant.",       ipa: "dɑ̃.zœ̃.nɛ̃s.tɑ̃",          why: "Liaison en /z/ après « dans », puis « un » + voyelle (/n/)." },
    { phrase: "Ce n'est pas le mien.",       render: "Ce n'est pas le mien.",   ipa: "sə.nɛ.pa.lə.mjɛ̃",         why: "Liaison interdite après « pas » devant consonne ; pas de liaison entre nom et adjectif libre." },
    { phrase: "Aux États-Unis.",             render: "Auz-zÉtats-zUnis.",       ipa: "o.ze.ta.zy.ni",          why: "Liaisons obligatoires après « aux » et entre composants de nom propre lié." },
    { phrase: "C'est-à-dire.",               render: "C'est-tà-dire.",          ipa: "se.ta.diʁ",              why: "Locution figée ; liaison obligatoire." },
    { phrase: "Plus ou moins.",              render: "Pluz-zou moins.",         ipa: "ply.zu.mwɛ̃",             why: "Liaison facultative très répandue dans une locution." },
    { phrase: "Un petit-déjeuner.",          render: "Un petit-déjeuner.",      ipa: "œ̃.pə.ti.de.ʒœ.ne",       why: "Pas de liaison dans le mot composé soudé par tiret." },
    { phrase: "Six heures.",                 render: "Si-zheures.",             ipa: "si.zœʁ",                  why: "Devant voyelle : « six » se prononce /siz/ en liaison." },
  ];

  // -----------------------------------------------------------------
  // Sentence builder
  // -----------------------------------------------------------------
  T.builders = T.builders || {};

  T.builders.starter = [
    { words: ["Je", "ne", "pense", "pas", "que", "ce", "soit", "une", "bonne", "idée", "."], translation: "I don't think it's a good idea.", why: "Subjonctif après « ne … pas penser que »." },
    { words: ["Bien", "qu'il", "ait", "plu", ",", "la", "fête", "a", "eu", "lieu", "."], translation: "Although it rained, the party went ahead.", why: "« Bien que » + subjonctif passé." },
    { words: ["Il", "faut", "que", "tu", "viennes", "avant", "midi", "."], translation: "You have to come before noon.", why: "« Il faut que » + subjonctif présent." },
    { words: ["Si", "j'avais", "su", ",", "je", "serais", "venu", "plus", "tôt", "."], translation: "If I'd known, I would have come earlier.", why: "Plus-que-parfait + conditionnel passé (regret)." },
    { words: ["C'est", "le", "livre", "dont", "je", "t'ai", "parlé", "hier", "."], translation: "It's the book I told you about yesterday.", why: "« dont » remplace « de » + groupe (parler de qqch)." },
    { words: ["Plus", "il", "lit", ",", "plus", "il", "comprend", "."], translation: "The more he reads, the more he understands.", why: "Structure corrélée « plus … plus … »." },
    { words: ["En", "raison", "des", "travaux", ",", "le", "trafic", "est", "très", "ralenti", "."], translation: "Due to the works, traffic is very slow.", why: "« en raison de » introduit la cause neutre." },
    { words: ["Quoi", "qu'il", "dise", ",", "personne", "ne", "le", "croira", "."], translation: "Whatever he says, no one will believe him.", why: "« quoi que » + subjonctif (concession indéfinie)." },
    { words: ["Il", "n'est", "pas", "venu", "parce", "qu'", "il", "était", "malade", "."], translation: "He didn't come because he was sick.", why: "« parce que » + indicatif (cause factuelle)." },
    { words: ["Je", "ne", "savais", "pas", "qu'", "elle", "habitait", "à", "Québec", "."], translation: "I didn't know she lived in Québec.", why: "« habiter à » + ville." },
  ];

  // -----------------------------------------------------------------
  // Synonymes / antonymes B2
  // -----------------------------------------------------------------
  T.synonyms = T.synonyms || {};

  T.synonyms.b2 = [
    { word: "important",  kind: "syn", options: ["majeur", "minime", "fragile", "vague"],         a: 0, why: "« majeur » = de grande importance." },
    { word: "augmenter",  kind: "syn", options: ["réduire", "accroître", "abaisser", "freiner"],   a: 1, why: "« accroître » = augmenter (registre soutenu)." },
    { word: "rapide",     kind: "ant", options: ["soudain", "vif", "lent", "instantané"],          a: 2, why: "« lent » est l'antonyme direct." },
    { word: "permettre",  kind: "syn", options: ["interdire", "empêcher", "autoriser", "limiter"], a: 2, why: "« autoriser » = donner la permission." },
    { word: "renforcer",  kind: "ant", options: ["consolider", "fragiliser", "soutenir", "stabiliser"], a: 1, why: "« fragiliser » = affaiblir, contraire de renforcer." },
    { word: "souligner",  kind: "syn", options: ["effacer", "mettre en avant", "minimiser", "ignorer"], a: 1, why: "« mettre en avant » = souligner." },
    { word: "fréquent",   kind: "ant", options: ["habituel", "rare", "régulier", "récurrent"],     a: 1, why: "« rare » = peu fréquent." },
    { word: "résoudre",   kind: "syn", options: ["créer", "aggraver", "régler", "ignorer"],         a: 2, why: "« régler » un problème = le résoudre." },
    { word: "cependant",  kind: "syn", options: ["donc", "néanmoins", "ainsi", "puisque"],         a: 1, why: "« néanmoins » exprime aussi l'opposition." },
    { word: "consacrer",  kind: "syn", options: ["négliger", "dédier", "perdre", "rejeter"],       a: 1, why: "« dédier » du temps à qqch = y consacrer." },
    { word: "modeste",    kind: "ant", options: ["sobre", "discret", "présomptueux", "humble"],    a: 2, why: "« présomptueux » = qui se surévalue (contraire de modeste)." },
    { word: "stagner",    kind: "ant", options: ["bloquer", "évoluer", "ralentir", "freiner"],      a: 1, why: "« évoluer » = progresser, contraire de stagner." },
    { word: "manifester", kind: "syn", options: ["cacher", "exprimer", "taire", "dissimuler"],     a: 1, why: "« exprimer » un sentiment = le manifester." },
    { word: "indispensable", kind: "syn", options: ["accessoire", "superflu", "essentiel", "facultatif"], a: 2, why: "« essentiel » = indispensable." },
    { word: "préjugé",    kind: "syn", options: ["démonstration", "vérité", "stéréotype", "fait"], a: 2, why: "« stéréotype » est un type de préjugé." },
    { word: "perspicace", kind: "ant", options: ["naïf", "lucide", "attentif", "fin"],             a: 0, why: "« naïf » = manque de perspicacité." },
    { word: "réticent",   kind: "syn", options: ["enthousiaste", "hésitant", "convaincu", "désireux"], a: 1, why: "« hésitant » à agir = réticent." },
    { word: "abonder",    kind: "ant", options: ["foisonner", "regorger", "manquer", "déborder"],   a: 2, why: "« manquer » = être en rareté, contraire d'abonder." },
    { word: "exhaustif",  kind: "syn", options: ["partiel", "complet", "vague", "incomplet"],       a: 1, why: "« complet » = qui n'omet rien (exhaustif)." },
    { word: "pertinent",  kind: "ant", options: ["adéquat", "à propos", "hors sujet", "judicieux"], a: 2, why: "« hors sujet » est l'antonyme contextuel de pertinent." },
  ];

  // Augment palette via custom event (the IIFE-scoped PALETTE_ITEMS already
  // has v1.3 entries hard-coded in extra.js).

  // -----------------------------------------------------------------
  // v1.4 — Tense drills, pronouns, phrases of the day
  // -----------------------------------------------------------------

  T.tenseDrills = T.tenseDrills || {};
  T.tenseDrills.pc_imp = [
    { stem: "Hier soir, il ___ son repas quand le téléphone a sonné.",
      options: ["a préparé (PC)", "préparait (imparfait)"], a: 1,
      why: "Action en cours interrompue par une autre → imparfait. La sonnerie (action ponctuelle) = PC." },
    { stem: "Pendant trois ans, elle ___ à Toronto avant de revenir au Québec.",
      options: ["a vécu (PC)", "vivait (imparfait)"], a: 0,
      why: "Période délimitée et achevée (trois ans + ‘avant de revenir’) → PC, même sur une durée longue." },
    { stem: "Quand j'étais petit, nous ___ tous les étés en Gaspésie.",
      options: ["sommes allés (PC)", "allions (imparfait)"], a: 1,
      why: "Habitude répétée dans le passé (« tous les étés ») → imparfait." },
    { stem: "Soudain, la lumière ___ et tout le monde a crié.",
      options: ["s'est éteinte (PC)", "s'éteignait (imparfait)"], a: 0,
      why: "Action brève et ponctuelle (« soudain ») → PC." },
    { stem: "Il ___ depuis dix minutes quand son chef l'a interrompu.",
      options: ["a parlé (PC)", "parlait (imparfait)"], a: 1,
      why: "Action en cours (durée + en train de) interrompue → imparfait." },
    { stem: "L'année dernière, nous ___ trois mocks complets.",
      options: ["avons fait (PC)", "faisions (imparfait)"], a: 0,
      why: "Nombre précis d'occurrences délimitées → PC." },
    { stem: "Quand je suis arrivée, il ___ déjà la cuisine.",
      options: ["a fini (PC)", "finissait (imparfait)"], a: 1,
      why: "Action en cours quand un événement se produit → imparfait (ici on insiste sur le déroulement)." },
    { stem: "Je ne ___ pas pourquoi il était fâché.",
      options: ["ai pas compris (PC)", "comprenais pas (imparfait)"], a: 1,
      why: "État mental qui dure → imparfait." },
    { stem: "Ce matin, je ___ deux cafés et je suis sorti.",
      options: ["ai bu (PC)", "buvais (imparfait)"], a: 0,
      why: "Deux événements successifs et achevés → PC." },
    { stem: "Pendant qu'il dormait, le voleur ___ par la fenêtre.",
      options: ["est entré (PC)", "entrait (imparfait)"], a: 0,
      why: "Action ponctuelle qui survient pendant un état (« pendant qu'il dormait ») → PC." },
    { stem: "Avant, je ___ français tous les jours ; depuis deux mois, j'ai ralenti.",
      options: ["ai pratiqué (PC)", "pratiquais (imparfait)"], a: 1,
      why: "Habitude révolue (« avant ») → imparfait." },
    { stem: "Hier, il ___ une heure pour résoudre l'exercice.",
      options: ["a mis (PC)", "mettait (imparfait)"], a: 0,
      why: "Durée délimitée et achevée d'un événement spécifique → PC." },
    { stem: "Quand le professeur posait une question, personne ne ___ répondre.",
      options: ["a osé (PC)", "osait (imparfait)"], a: 1,
      why: "Habitude / situation répétitive → imparfait." },
    { stem: "Je ___ trois fois mais il ne répondait pas.",
      options: ["ai rappelé (PC)", "rappelais (imparfait)"], a: 0,
      why: "« trois fois » = nombre déterminé d'événements → PC." },
    { stem: "À 18 ans, je ___ que tout était possible.",
      options: ["ai cru (PC)", "croyais (imparfait)"], a: 1,
      why: "État mental, opinion qui dure → imparfait." },
    { stem: "La réunion ___ enfin terminée à 19 h pile.",
      options: ["s'est terminée (PC)", "se terminait (imparfait)"], a: 0,
      why: "Événement précis et achevé → PC." },
    { stem: "Il faisait beau, les oiseaux chantaient, je ___ heureux.",
      options: ["ai été (PC)", "étais (imparfait)"], a: 1,
      why: "Description d'un décor / état → imparfait (récit descriptif)." },
    { stem: "Soudain, il ___ pâle et est tombé.",
      options: ["est devenu (PC)", "devenait (imparfait)"], a: 0,
      why: "Changement d'état brusque (« soudain ») → PC." },
    { stem: "Pendant que je parlais à mon voisin, le facteur ___ une lettre.",
      options: ["a déposé (PC)", "déposait (imparfait)"], a: 0,
      why: "Action ponctuelle dans un décor (parler = décor à l'imparfait, déposer = ponctuel à PC)." },
    { stem: "Avant, on ___ encore du fax — c'était lent mais fiable.",
      options: ["a utilisé (PC)", "utilisait (imparfait)"], a: 1,
      why: "Habitude passée qui n'a plus cours → imparfait." },
    { stem: "Ce jour-là, j'ai compris que je ne ___ jamais devenir avocat.",
      options: ["ai voulu (PC)", "voulais (imparfait)"], a: 1,
      why: "État mental persistant (« je ne voulais pas… ») → imparfait." },
    { stem: "Elle a parlé une heure ; pendant ce temps, je ___ ses gestes.",
      options: ["ai observé (PC)", "observais (imparfait)"], a: 1,
      why: "Action en parallèle, sans clôture marquée → imparfait." },
    { stem: "J'ai voulu lui parler, mais je ne ___ pas trouver les mots.",
      options: ["ai pas pu (PC)", "pouvais pas (imparfait)"], a: 0,
      why: "« je n'ai pas pu » = impossibilité ponctuelle (sur le moment) → PC. (Imparfait = incapacité durable.)" },
    { stem: "Quand ils sont arrivés, le spectacle ___ depuis dix minutes.",
      options: ["a commencé (PC)", "avait commencé (PQP — pas listé)"], a: 0,
      why: "Le PQP serait idéal ; mais entre PC et IMP, PC marque le démarrage ponctuel (≠ état)." },
    { stem: "À cette époque-là, j'___ encore mes études.",
      options: ["ai fait (PC)", "faisais (imparfait)"], a: 1,
      why: "« à cette époque-là » = arrière-plan duratif → imparfait." },
    { stem: "Hier, après le travail, nous ___ au cinéma.",
      options: ["sommes allés (PC)", "allions (imparfait)"], a: 0,
      why: "Action ponctuelle, datée, achevée → PC." },
    { stem: "Le bébé pleurait sans arrêt ; sa mère ___ très fatiguée.",
      options: ["a été (PC)", "était (imparfait)"], a: 1,
      why: "État qui dure dans le décor du récit → imparfait." },
    { stem: "L'examen ___ exactement à 9 h 30.",
      options: ["a commencé (PC)", "commençait (imparfait)"], a: 0,
      why: "Heure précise + événement ponctuel → PC." },
    { stem: "Avant le confinement, je ___ tous les jours au bureau.",
      options: ["suis allé (PC)", "allais (imparfait)"], a: 1,
      why: "Habitude qui n'a plus cours (avant un événement de rupture) → imparfait." },
    { stem: "Il a vécu en France toute sa vie ; il ___ rarement à l'étranger.",
      options: ["est allé (PC)", "allait (imparfait)"], a: 1,
      why: "Habitude de toute une vie (durée + fréquence indéterminée) → imparfait." },
  ];

  T.pronouns = T.pronouns || {};
  T.pronouns.b1_b2 = [
    { q: "Tu vas à Québec ce week-end ? — Oui, j'___ vais demain.",
      options: ["y", "en", "le", "la"], a: 0,
      why: "« aller à + lieu » → pronom y." },
    { q: "Tu as parlé à Marie ? — Oui, je ___ ai parlé hier.",
      options: ["y", "en", "lui", "la"], a: 2,
      why: "« parler à qqn » → pronom complément d'objet indirect lui (3ᵉ pers. sg.)." },
    { q: "Vous prenez du café ? — Oui, j'___ prends un, merci.",
      options: ["y", "en", "le", "la"], a: 1,
      why: "Partitif « du café » → en." },
    { q: "Cette robe te plaît ? — Oui, je ___ trouve très élégante.",
      options: ["le", "la", "lui", "en"], a: 1,
      why: "« trouver qqch. » + COD féminin singulier → la." },
    { q: "Tu connais mes voisins ? — Non, je ne ___ connais pas.",
      options: ["leur", "les", "en", "y"], a: 1,
      why: "« connaître qqn » → COD pluriel les." },
    { q: "Il pense à son avenir tous les jours. — Il ___ pense constamment.",
      options: ["y", "en", "lui", "le"], a: 0,
      why: "« penser à qqch. (chose) » → y. (penser à qqn = à lui / à elle, sans pronom.)" },
    { q: "Marc a besoin de tes notes. — Oui, je sais qu'il ___ a besoin.",
      options: ["y", "en", "lui", "le"], a: 1,
      why: "« avoir besoin de qqch. » → en." },
    { q: "Tu téléphones souvent à tes parents ? — Je ___ téléphone le dimanche.",
      options: ["les", "leur", "y", "en"], a: 1,
      why: "« téléphoner à qqn » → COI leur." },
    { q: "Vous avez visité la tour Eiffel ? — Oui, nous ___ avons visitée l'été dernier.",
      options: ["la", "lui", "y", "en"], a: 0,
      why: "« visiter qqch. » → COD la. (Avec être à la place de visiter on aurait y.)" },
    { q: "Tu joues du piano ? — Oui, j'___ joue depuis dix ans.",
      options: ["y", "en", "le", "la"], a: 1,
      why: "« jouer de + instrument » → en." },
    { q: "Tu joues au tennis ? — Oui, j'___ joue le samedi.",
      options: ["y", "en", "le", "la"], a: 0,
      why: "« jouer à + sport » → y." },
    { q: "Il s'intéresse à la philosophie. — Oui, il s'___ intéresse beaucoup.",
      options: ["y", "en", "lui", "la"], a: 0,
      why: "« s'intéresser à qqch. » → y. (À noter : s'intéresser à qqn = à lui / à elle, sans pronom déplacé.)" },
    { q: "Tu te souviens de cette histoire ? — Oui, je m'___ souviens parfaitement.",
      options: ["y", "en", "la", "le"], a: 1,
      why: "« se souvenir de qqch. » → en." },
    { q: "Tu as répondu au courriel ? — Oui, j'___ ai répondu ce matin.",
      options: ["y", "en", "lui", "le"], a: 0,
      why: "« répondre à qqch. » → y." },
    { q: "Tu écris à ta cousine ? — Oui, je ___ écris une carte chaque mois.",
      options: ["la", "lui", "y", "en"], a: 1,
      why: "« écrire à qqn » → COI lui (avec « une carte » comme COD)." },
    { q: "Tu veux du gâteau ? — Non, je n'___ veux pas, merci.",
      options: ["y", "en", "le", "la"], a: 1,
      why: "Partitif/quantité → en, même au négatif." },
    { q: "Tu prends le métro ? — Oui, je ___ prends tous les matins.",
      options: ["le", "la", "y", "en"], a: 0,
      why: "« prendre + nom défini (le métro) » → COD masc. le." },
    { q: "Tu vois ces nuages ? — Oui, je ___ vois bien.",
      options: ["leur", "les", "y", "en"], a: 1,
      why: "« voir qqch. » → COD pluriel les." },
    { q: "Tu as offert un cadeau à tes enfants ? — Oui, je ___ ai offert un livre.",
      options: ["les", "leur", "y", "en"], a: 1,
      why: "« offrir qqch. à qqn » → COI leur (pluriel)." },
    { q: "Tu reviens du Mexique ? — Oui, j'___ reviens demain.",
      options: ["y", "en", "le", "la"], a: 1,
      why: "« revenir de + lieu » → en." },
    { q: "Tu vas chez le dentiste ? — Oui, j'___ vais à 14 h.",
      options: ["y", "en", "le", "la"], a: 0,
      why: "« aller chez + qqn » (lieu de destination) → y." },
    { q: "Vous avez parlé à votre patronne ? — Oui, nous ___ avons parlé hier.",
      options: ["la", "lui", "leur", "en"], a: 1,
      why: "« parler à + 1 personne fém. » → COI lui (lui ne distingue pas le genre)." },
    { q: "Tu as confiance en lui ? — Oui, j'ai entièrement confiance en lui.",
      options: ["y", "en", "lui", "la"], a: 2,
      why: "« en lui » (préposition + pronom tonique) n'est pas remplaçable par y — on garde la forme." },
    { q: "Vous obéissez à vos parents ? — Bien sûr, nous ___ obéissons.",
      options: ["les", "leur", "y", "en"], a: 1,
      why: "« obéir à qqn » → COI leur." },
    { q: "Tu te méfies des inconnus ? — Oui, je m'___ méfie toujours.",
      options: ["y", "en", "les", "la"], a: 1,
      why: "« se méfier de qqn/qqch. » → en." },
    { q: "Vous êtes prête à partir ? — Oui, je suis prête.",
      options: ["y", "en", "lui", "—"], a: 3,
      why: "« être prêt(e) à + verbe » : on ne remplace pas par pronom court — on garde la forme." },
    { q: "Tu manges des légumes ? — J'___ mange tous les jours.",
      options: ["y", "en", "les", "le"], a: 1,
      why: "Partitif « des légumes » → en (couvre l'idée de quantité)." },
    { q: "Tu écoutes ta sœur ? — Oui, je ___ écoute attentivement.",
      options: ["la", "lui", "leur", "en"], a: 0,
      why: "« écouter qqn » est COD (et non COI) → la." },
    { q: "Tu penses à eux ? — Oui, je pense à eux souvent.",
      options: ["y", "en", "à eux", "leur"], a: 2,
      why: "« penser à + personne » → on ne remplace pas par y ni leur : préposition + pronom tonique (à eux)." },
    { q: "Tu profites des vacances ? — J'___ profite à fond.",
      options: ["y", "en", "le", "la"], a: 1,
      why: "« profiter de qqch. » → en." },
  ];

  // -----------------------------------------------------------------
  // v1.4.1 — Real EE / EO corpus prompts (pulled from audited pilots)
  // Source: content/05_writing/tache{1,2,3}/0{1,2,3}_*.md
  //         content/06_speaking/tache{1,2,3}/0{1,2,3}_*.md
  // -----------------------------------------------------------------
  T.eePrompts = T.eePrompts || {
    t1: [
      { id: "ee-t1-001", title: "Demander un report d'examen",
        prompt: "Vous suivez un cours à l'université de Sherbrooke. Pour des raisons médicales, vous ne pouvez pas vous présenter à l'examen prévu vendredi prochain. Écrivez un courriel à votre professeure pour : expliquer brièvement votre situation, demander un report, proposer une solution alternative. Longueur cible : 90 mots (± 20). Registre : formel.",
        refLabel: "ee-t1-001 (pilote audité)", refUrl: "../../05_writing/tache1/01_ee-t1-001/" },
      { id: "ee-t1-002", title: "Plainte sur un colis abîmé",
        prompt: "Vous avez commandé en ligne un service de verres à vin sur le site d'une boutique réputée. À la réception, deux verres sur six sont cassés. Écrivez un courriel au service client pour : exposer la situation, demander le remboursement ou le remplacement, préciser un délai de réponse souhaité. Longueur cible : 100 mots (± 20). Registre : formel.",
        refLabel: "ee-t1-002 (pilote audité)", refUrl: "../../05_writing/tache1/02_ee-t1-002/" },
      { id: "ee-t1-003", title: "Remerciement à un professeur",
        prompt: "Un de vos professeurs a rédigé une lettre de recommandation qui vous a permis d'être admis(e) dans un programme d'échange à l'étranger. Vous lui écrivez pour le remercier et lui annoncer la bonne nouvelle. Remerciez précisément (l'objet du remerciement), annoncez la bonne nouvelle, exprimez votre reconnaissance pour la suite. Longueur cible : 85 mots (± 20). Registre : formel.",
        refLabel: "ee-t1-003 (pilote audité)", refUrl: "../../05_writing/tache1/03_ee-t1-003/" },
    ],
    t2: [
      { id: "ee-t2-001", title: "Article — cantine zéro-déchet",
        prompt: "Le journal de votre université lance un dossier sur les initiatives écologiques sur le campus. Vous décidez d'écrire un article (≈ 140 mots) sur la nouvelle cantine zéro-déchet inaugurée le mois dernier au restaurant universitaire. L'article doit : présenter le dispositif (qui, quoi, depuis quand), donner au moins une donnée chiffrée, évoquer les retours des usagers, conclure sur une perspective. Registre : journalistique formel. Pas de prise de position personnelle.",
        refLabel: "ee-t2-001 (pilote audité)", refUrl: "../../05_writing/tache2/01_ee-t2-001/" },
      { id: "ee-t2-002", title: "Témoignage — expérience à l'étranger",
        prompt: "Un blog d'étudiants en mobilité internationale recueille les témoignages d'anciens participants à des programmes d'échange. Vous racontez une expérience marquante de votre séjour de six mois dans une université à l'étranger. L'article doit : situer la situation (où, quand, combien de temps), raconter un événement marquant ou une découverte, en tirer un enseignement, ouvrir sur un conseil au lecteur. Registre : neutre (témoignage personnel).",
        refLabel: "ee-t2-002 (pilote audité)", refUrl: "../../05_writing/tache2/02_ee-t2-002/" },
      { id: "ee-t2-003", title: "Critique nuancée — restaurant",
        prompt: "Vous publiez sur un guide en ligne une critique nuancée d'un restaurant que vous avez récemment essayé. La critique doit (≈ 145 mots) : situer le contexte, présenter au moins un point fort et un point faible, illustrer chaque point par un exemple concret, conclure par une recommandation conditionnelle. Registre : neutre, journalistique léger.",
        refLabel: "ee-t2-003 (pilote audité)", refUrl: "../../05_writing/tache2/03_ee-t2-003/" },
    ],
    t3: [
      { id: "ee-t3-001", title: "Essai — IA générative et travail intellectuel",
        prompt: "Une revue universitaire en ligne ouvre ses colonnes à des contributions d'étudiants sur le thème : « L'intelligence artificielle générative met-elle en danger le travail intellectuel ? » Rédigez un essai argumenté qui : prend une position claire sur la question, défend cette position par deux arguments distincts, intègre une concession suivie d'une réfutation, conclut par une ouverture. Longueur cible : 170 mots (± 30). Registre : formel argumentatif.",
        refLabel: "ee-t3-001 (pilote audité)", refUrl: "../../05_writing/tache3/01_ee-t3-001/" },
      { id: "ee-t3-002", title: "Essai — interdire les vols intérieurs courts",
        prompt: "Le supplément hebdomadaire d'un grand quotidien consacre un dossier à l'avenir de la mobilité. Vous y publiez un essai (170 mots ± 30) sur la question : « Faut-il interdire les vols intérieurs courte distance lorsque le train propose une alternative compétitive ? » Votre essai doit : prendre une position claire, défendre cette position par deux arguments, intégrer une concession et une réfutation, conclure par une ouverture concrète.",
        refLabel: "ee-t3-002 (pilote audité)", refUrl: "../../05_writing/tache3/02_ee-t3-002/" },
      { id: "ee-t3-003", title: "Essai — français langue de travail à Montréal",
        prompt: "Un magazine d'analyse sociale lance un dossier sur la cohésion linguistique au Québec et invite ses lecteurs à proposer une contribution argumentée. Rédigez un essai (175 mots ± 35) sur la question : « À l'heure où les entreprises montréalaises s'internationalisent, faut-il renforcer la place du français comme langue de travail ? » Votre essai doit : prendre une position claire, défendre cette position par deux arguments distincts, intégrer une concession et une réfutation, conclure par une ouverture.",
        refLabel: "ee-t3-003 (pilote audité)", refUrl: "../../05_writing/tache3/03_ee-t3-003/" },
    ],
  };

  T.eoPrompts = T.eoPrompts || {
    t1: [
      { id: "eo-t1-001", title: "Carte d'assurance maladie — questions au comptoir",
        consigne: "Je travaille au service d'accueil de la Régie de l'assurance maladie du Québec. Vous venez d'arriver dans la province et souhaitez vous renseigner sur la carte d'assurance maladie. Posez-moi les questions nécessaires pour obtenir les informations qu'il vous faut.",
        duration: "≈ 1 min 30", prep: "aucune", refUrl: "../../06_speaking/tache1/01_eo-t1-001/" },
      { id: "eo-t1-002", title: "SAV opérateur télécom — résoudre un problème de forfait",
        consigne: "Je suis conseiller au service après-vente d'un opérateur de téléphonie mobile et d'accès Internet. Vous êtes client chez nous et vous nous appelez pour signaler un problème sur votre forfait. Posez-moi les questions nécessaires pour faire avancer votre dossier : nature du problème, suivi, remboursement éventuel, conditions de renouvellement ou de résiliation.",
        duration: "≈ 1 min 30", prep: "aucune", refUrl: "../../06_speaking/tache1/02_eo-t1-002/" },
      { id: "eo-t1-003", title: "Recrutement — précisions sur un poste à temps partiel",
        consigne: "Je suis recruteur dans une petite entreprise et nous proposons actuellement un poste à temps partiel, quinze heures par semaine, au service client. Vous avez vu notre annonce et vous m'appelez pour obtenir des précisions avant de candidater. Posez-moi les questions nécessaires pour décider si le poste vous correspond.",
        duration: "≈ 1 min 30", prep: "aucune", refUrl: "../../06_speaking/tache1/03_eo-t1-003/" },
    ],
    t2: [
      { id: "eo-t2-001", title: "Mobilité — raconter une expérience marquante",
        consigne: "Racontez-nous une expérience marquante de mobilité que vous avez vécue : un déménagement, une expatriation, un séjour prolongé à l'étranger. Précisez ce qui l'a rendue marquante, ce qui a été difficile, et ce qu'elle vous a apporté.",
        duration: "≈ 3 minutes", prep: "aucune", refUrl: "../../06_speaking/tache2/01_eo-t2-001/" },
      { id: "eo-t2-002", title: "Télétravail — avantages et inconvénients",
        consigne: "Décrivez les avantages et les inconvénients du télétravail tel que vous l'observez aujourd'hui, en vous appuyant sur des exemples concrets si vous le souhaitez.",
        duration: "≈ 3 minutes", prep: "aucune", refUrl: "../../06_speaking/tache2/02_eo-t2-002/" },
      { id: "eo-t2-003", title: "Pratiques culturelles — changements des 10 dernières années",
        consigne: "Présentez les changements observés ces dix dernières années en matière de pratiques culturelles — musique, cinéma, lecture, séries, etc. Vous donnerez des exemples concrets et préciserez ce que vous en retenez.",
        duration: "≈ 3 minutes", prep: "aucune", refUrl: "../../06_speaking/tache2/03_eo-t2-003/" },
    ],
    t3: [
      { id: "eo-t3-001", title: "IA générative — défendre une position",
        consigne: "Stimulus : « À l'heure où les outils d'intelligence artificielle générative produisent en quelques secondes des textes, des images et du code, la question de leur impact sur le travail intellectuel se pose avec une acuité particulière. Certains y voient la fin du métier d'analyste, de rédacteur, de programmeur ; d'autres y lisent une libération du travail répétitif au profit du jugement et de la créativité. » — Vous prendrez position et défendrez votre point de vue.",
        duration: "≈ 5 minutes", prep: "2 minutes (timer strict)", refUrl: "../../06_speaking/tache3/01_eo-t3-001/" },
      { id: "eo-t3-002", title: "Transition écologique — modèle de croissance",
        consigne: "Stimulus : « La transition écologique ne pourra pas se faire sans une remise en cause radicale de notre modèle de croissance. Continuer à produire et consommer comme aujourd'hui, même avec des technologies plus propres, c'est ignorer les limites physiques de la planète. » — Vous prendrez position sur cette affirmation et défendrez votre point de vue.",
        duration: "≈ 5 minutes", prep: "2 minutes (timer strict)", refUrl: "../../06_speaking/tache3/02_eo-t3-002/" },
      { id: "eo-t3-003", title: "Semaine de 4 jours — futur ou effet d'aubaine ?",
        consigne: "Stimulus (brève de presse) : « Plusieurs entreprises pilotes en Islande, en Espagne et au Royaume-Uni ont expérimenté la semaine de quatre jours, à salaire constant. Les résultats publiés mettent en avant une productivité maintenue, une réduction du turnover et une amélioration du bien-être déclaré des salariés. Faut-il y voir le futur du travail, ou un effet d'aubaine limité à certains secteurs ? » — Vous prendrez position et défendrez votre point de vue.",
        duration: "≈ 5 minutes", prep: "2 minutes (timer strict)", refUrl: "../../06_speaking/tache3/03_eo-t3-003/" },
    ],
  };

  // -----------------------------------------------------------------
  // v1.4.1 — Additional CE packs (B1, C1) + CO pack 2 (B2+)
  // -----------------------------------------------------------------
  T.cePacks.b1_pack1 = {
    title: "Lot CE B1 — annonces, messages, vie pratique",
    level: "B1",
    minutes: 10,
    passages: [
      {
        id: "p1", words: 64,
        text: "<p>📢 <strong>Avis aux résidents.</strong> La collecte des ordures ménagères sera décalée d'une journée la semaine prochaine, en raison du jour férié de lundi. Le ramassage habituel du mardi aura lieu mercredi ; celui du vendredi aura lieu samedi. Pensez à sortir vos bacs la veille au soir. La collecte des matières recyclables n'est pas affectée.</p>",
        q: [
          { q: "Pourquoi la collecte est-elle décalée ?", options: [
            "Parce qu'il y a une grève.",
            "À cause d'un jour férié le lundi.",
            "À cause de la neige.",
            "Pour économiser de l'argent."
          ], a: 1, why: "Le texte dit « en raison du jour férié de lundi »." },
          { q: "Quand aura lieu la collecte normalement prévue le vendredi ?", options: [
            "Le jeudi.",
            "Le vendredi quand même.",
            "Le samedi.",
            "Le dimanche."
          ], a: 2, why: "« celui du vendredi aura lieu samedi »." },
          { q: "Que dit le texte de la collecte recyclable ?", options: [
            "Elle est aussi décalée d'un jour.",
            "Elle est annulée.",
            "Elle n'est pas affectée.",
            "Elle change d'horaire."
          ], a: 2, why: "« La collecte des matières recyclables n'est pas affectée »." },
        ]
      },
      {
        id: "p2", words: 88,
        text: "<p>Salut Léa,</p><p>Je voulais te prévenir que je ne pourrai pas venir au cinéma samedi. J'ai promis à ma sœur de l'aider à déménager — elle a finalement trouvé un appartement à Verdun. On se cale ça la semaine prochaine ? Je suis libre mercredi soir et vendredi après 18 h. Dis-moi ce qui te convient. Bisous, et désolée encore !</p>",
        q: [
          { q: "Pourquoi Léa et l'expéditrice ne se voient-elles pas samedi ?", options: [
            "Léa est malade.",
            "L'expéditrice aide sa sœur à déménager.",
            "Le cinéma est complet.",
            "Il pleut trop."
          ], a: 1, why: "« J'ai promis à ma sœur de l'aider à déménager »." },
          { q: "Quand l'expéditrice est-elle disponible la semaine suivante ?", options: [
            "Lundi et mardi.",
            "Mercredi soir et vendredi après 18 h.",
            "Jeudi seulement.",
            "Tout le week-end."
          ], a: 1, why: "« libre mercredi soir et vendredi après 18 h »." },
          { q: "Quel est le ton du message ?", options: [
            "Très formel.",
            "Cordial entre amies.",
            "En colère.",
            "Distant."
          ], a: 1, why: "« Salut », « Bisous », « désolée encore » — registre amical." },
        ]
      },
      {
        id: "p3", words: 119,
        text: "<p>Le centre municipal de loisirs de Laval propose de nouvelles activités dès la rentrée de septembre. Pour les adultes, deux cours sont ouverts : <strong>poterie</strong> les mardis soirs (18 h-20 h, 12 séances, 240 \\$ matériel inclus) et <strong>conversation française pour nouveaux arrivants</strong>, les jeudis (19 h-20 h 30, gratuit, inscription obligatoire). Pour les enfants de 6 à 12 ans, trois ateliers sont proposés : sciences, danse hip-hop et théâtre, toujours le samedi matin de 10 h à midi. Les inscriptions s'ouvrent le 15 août, en ligne ou directement au comptoir d'accueil. Le centre rappelle que les places sont limitées et attribuées par ordre d'arrivée.</p>",
        q: [
          { q: "Combien coûte le cours de conversation française ?", options: [
            "240 $",
            "Gratuit, mais inscription obligatoire.",
            "12 $ la séance.",
            "Le prix n'est pas indiqué."
          ], a: 1, why: "« gratuit, inscription obligatoire »." },
          { q: "Quand les inscriptions s'ouvrent-elles ?", options: [
            "Dès aujourd'hui.",
            "Le 1ᵉʳ septembre.",
            "Le 15 août.",
            "Le 15 juillet."
          ], a: 2, why: "« Les inscriptions s'ouvrent le 15 août »." },
          { q: "Quel atelier n'est PAS proposé aux enfants ?", options: [
            "Sciences.",
            "Théâtre.",
            "Danse hip-hop.",
            "Cuisine."
          ], a: 3, why: "Le texte cite sciences, danse hip-hop et théâtre — pas la cuisine." },
          { q: "Que faut-il savoir sur les places ?", options: [
            "Elles sont illimitées.",
            "Elles sont attribuées par ordre d'arrivée.",
            "Elles sont réservées aux résidents de Laval.",
            "Elles coûtent 50 $ de plus si on s'inscrit en retard."
          ], a: 1, why: "« attribuées par ordre d'arrivée »." },
        ]
      },
      {
        id: "p4", words: 145,
        text: "<p>L'application <em>MoveQC</em> a été lancée le printemps dernier par un jeune entrepreneur de Trois-Rivières. Son principe est simple : elle met en relation des particuliers qui ont besoin de déménager quelques meubles ou objets volumineux avec des conducteurs disposant d'une camionnette. Les utilisateurs publient une annonce avec photos, distance et créneau souhaité ; les conducteurs disponibles répondent et le prix se négocie via l'application. Le service revendique déjà 8 000 inscriptions en six mois, principalement à Montréal, Québec et Sherbrooke. Le fondateur explique avoir eu l'idée après un déménagement compliqué : « J'ai galéré pendant deux jours à trouver une camionnette à louer, alors que mon voisin en avait une garée devant chez moi. » Le prochain défi annoncé : étendre le service aux régions plus rurales, où l'offre de transport est nettement plus limitée.</p>",
        q: [
          { q: "À quel besoin MoveQC répond-elle ?", options: [
            "Trouver une nouvelle voiture.",
            "Déménager quelques meubles ou objets volumineux.",
            "Trouver un déménageur professionnel.",
            "Louer un garde-meuble."
          ], a: 1, why: "« met en relation des particuliers qui ont besoin de déménager quelques meubles »." },
          { q: "Comment le prix est-il fixé ?", options: [
            "Tarif unique imposé par l'application.",
            "Négocié via l'application entre les deux parties.",
            "Au kilomètre, automatiquement.",
            "Le service est gratuit."
          ], a: 1, why: "« le prix se négocie via l'application »." },
          { q: "D'où vient l'idée de l'application ?", options: [
            "D'un stage en entreprise.",
            "D'une expérience personnelle de déménagement compliqué.",
            "D'une étude de marché.",
            "D'une demande de la mairie."
          ], a: 1, why: "« avoir eu l'idée après un déménagement compliqué »." },
          { q: "Quel est le prochain défi annoncé ?", options: [
            "Réduire les prix.",
            "Lancer une version pour les déménagements internationaux.",
            "Étendre le service aux régions rurales.",
            "Recruter des employés."
          ], a: 2, why: "« étendre le service aux régions plus rurales »." },
        ]
      },
    ]
  };

  T.cePacks.c1_pack1 = {
    title: "Lot CE C1 — analyses, tribunes, débats nuancés",
    level: "C1",
    minutes: 16,
    passages: [
      {
        id: "p1", words: 218,
        text: "<p>Voici une vingtaine d'années que l'expression « vie privée » est devenue synonyme, dans la conversation publique, de « données personnelles ». La confusion a une explication simple : c'est sur le terrain numérique que se livrent les batailles les plus visibles. <em>Or</em>, identifier la première à la seconde revient à abandonner la moitié du concept. La vie privée ne se résume pas à ce que je laisse ou non collecter — elle inclut l'écart entre mes versions de moi-même, celle que je présente au travail, celle que je réserve à mes proches, celle que je n'avoue parfois à personne. Cet écart est un bien social ; il rend possibles l'apprentissage, l'erreur, la révision de soi. Le réduire à un débat sur les cookies, c'est manquer l'essentiel : la pression d'une visibilité permanente, en particulier juvénile, érode la capacité de penser des choses qu'on ne défend pas encore publiquement. Les juridictions européennes commencent timidement à prendre en compte ce volet ; les premières décisions sur le droit à l'oubli en sont un indice, encore très partiel. <em>Reste</em> que tant que la conversation publique tient la vie privée pour un simple problème de protection technique, l'enjeu démocratique le plus profond — la possibilité d'avoir un soi en chantier — continuera de se dissoudre.</p>",
        q: [
          { q: "Quelle est la thèse centrale de la tribune ?", options: [
            "La vie privée numérique n'a aucun rapport avec la démocratie.",
            "« Vie privée » et « données personnelles » sont des concepts distincts, et confondre l'un avec l'autre fait perdre l'enjeu démocratique.",
            "Les cookies sont un faux problème.",
            "La législation européenne est trop avancée."
          ], a: 1, why: "« identifier la première à la seconde revient à abandonner la moitié du concept »." },
          { q: "Pourquoi l'écart entre versions de soi est-il décrit comme un « bien social » ?", options: [
            "Parce qu'il rapporte de l'argent.",
            "Parce qu'il rend possibles l'apprentissage, l'erreur, la révision de soi.",
            "Parce qu'il est universellement respecté.",
            "Parce qu'il est techniquement chiffré."
          ], a: 1, why: "Phrase explicite : « il rend possibles l'apprentissage, l'erreur, la révision de soi »." },
          { q: "Que dit l'auteur des décisions européennes ?", options: [
            "Elles règlent le problème.",
            "Elles sont un premier indice timide, partiel.",
            "Elles ignorent l'enjeu.",
            "Elles sont contraires aux libertés."
          ], a: 1, why: "« timidement », « premières décisions… encore très partiel »." },
          { q: "Quel est le risque démocratique le plus profond, selon le texte ?", options: [
            "La perte de revenus publicitaires.",
            "L'érosion de la capacité de penser des choses qu'on ne défend pas encore publiquement.",
            "L'augmentation du piratage.",
            "La disparition des cookies."
          ], a: 1, why: "« la pression d'une visibilité permanente… érode la capacité de penser des choses qu'on ne défend pas encore publiquement »." },
        ]
      },
      {
        id: "p2", words: 246,
        text: "<p>Les politiques de relance par la consommation, longtemps tenues pour un outil de référence en cas de ralentissement, font l'objet d'un réexamen prudent dans plusieurs cercles d'experts. Le diagnostic n'est pas que ces politiques ne fonctionnent plus — elles agissent toujours, à court terme, sur l'activité globale. <em>C'est plutôt</em> leur articulation avec les contraintes climatiques qui pose problème : stimuler une consommation indifférenciée revient mécaniquement à pousser les importations et l'empreinte carbone vers le haut, sans gain durable sur la base productive locale. Une voie alternative, parfois qualifiée de « relance ciblée », privilégie les investissements dans des chaînes de valeur compatibles avec une trajectoire bas-carbone : rénovation énergétique, ferroviaire, fournitures de santé domestique, infrastructures hydriques. Ses critiques font valoir, non sans arguments, qu'une telle approche relève d'un volontarisme industriel difficile à manier — l'État choisit des secteurs gagnants et risque d'en favoriser certains de manière clientéliste. Ses défenseurs répondent que <em>l'absence</em> de choix est aussi un choix, en l'occurrence celui de laisser les arbitrages au marché à un moment où la pression du temps climatique ne le permet plus. Le débat n'est pas clos ; il a néanmoins déplacé son centre de gravité, des techniques budgétaires vers la question, plus politique, de ce que l'on entend par « bonne dépense » publique. Les indicateurs de mesure suivront, ou non, ce déplacement.</p>",
        q: [
          { q: "Quel est le diagnostic posé sur les politiques de relance par la consommation ?", options: [
            "Elles ne fonctionnent plus à court terme.",
            "Elles agissent encore à court terme mais s'articulent mal avec les contraintes climatiques.",
            "Elles sont parfaites.",
            "Elles ne sont pas étudiées."
          ], a: 1, why: "« Le diagnostic n'est pas que ces politiques ne fonctionnent plus — elles agissent toujours… C'est plutôt leur articulation avec les contraintes climatiques »." },
          { q: "Comment l'auteur résume-t-il l'objection à la « relance ciblée » ?", options: [
            "Elle coûte trop cher.",
            "Elle relève d'un volontarisme industriel risquant le clientélisme.",
            "Elle n'a jamais été testée.",
            "Elle est trop ancienne."
          ], a: 1, why: "« volontarisme industriel difficile à manier — l'État choisit des secteurs gagnants et risque d'en favoriser certains de manière clientéliste »." },
          { q: "Quel argument oppose-t-on à cette objection ?", options: [
            "Que les marchés vont régler le problème.",
            "Que l'absence de choix est aussi un choix, en l'occurrence celui de laisser arbitrer le marché.",
            "Que la dette n'est pas un problème.",
            "Que la science est suffisante."
          ], a: 1, why: "« l'absence de choix est aussi un choix »." },
          { q: "Où le débat a-t-il déplacé son centre de gravité ?", options: [
            "Sur la fiscalité.",
            "Vers la question politique de ce qu'on entend par « bonne dépense » publique.",
            "Sur la monnaie.",
            "Le débat n'a pas bougé."
          ], a: 1, why: "« il a néanmoins déplacé son centre de gravité, des techniques budgétaires vers la question, plus politique, de ce que l'on entend par « bonne dépense » publique »." },
        ]
      },
      {
        id: "p3", words: 252,
        text: "<p>L'idée qu'on apprendrait mieux en se concentrant sur ses préférences personnelles — « style visuel », « style auditif », « style kinesthésique » — a longtemps figuré dans la formation des enseignants. Les manuels la présentaient comme un acquis ; certaines plateformes en font encore aujourd'hui un argument commercial. <em>Le problème</em>, c'est qu'aucune des grandes synthèses expérimentales conduites au cours des vingt dernières années n'a confirmé l'effet escompté. Adapter le support à la « préférence » déclarée d'un élève n'améliore pas, en moyenne, l'apprentissage de la connaissance visée. Ce que ces synthèses identifient comme rentable, en revanche, c'est l'<em>alignement</em> entre le support et la nature intrinsèque du contenu : la géométrie veut du visuel parce qu'elle <em>est</em> spatiale ; la phonologie veut de l'auditif parce qu'elle <em>est</em> sonore ; la coordination motrice veut du geste parce qu'elle <em>est</em> motrice. La nuance est de taille : elle déplace le critère de l'élève vers la matière. <em>Reste</em> que la perception de progresser, elle, demeure influencée par la préférence — un élève à qui l'on propose son format préféré déclare plus volontiers comprendre, même quand le test objectif ne le confirme pas. Cet écart, ténu, a un coût pratique : il rend les méthodes alignées sur le contenu moins populaires que les méthodes alignées sur la préférence, et donc plus difficiles à déployer en classe. La science a tranché ; la pédagogie scolaire, plus lentement, en tirera ou non les conséquences.</p>",
        q: [
          { q: "Que disent les grandes synthèses expérimentales sur les « styles d'apprentissage » ?", options: [
            "Elles confirment leur efficacité.",
            "Elles n'ont pas confirmé l'effet escompté.",
            "Elles n'ont pas étudié la question.",
            "Elles concluent l'inverse exact."
          ], a: 1, why: "« aucune des grandes synthèses expérimentales… n'a confirmé l'effet escompté »." },
          { q: "Quel critère est, lui, identifié comme rentable ?", options: [
            "La préférence de l'élève.",
            "L'alignement entre le support et la nature intrinsèque du contenu.",
            "Le budget de l'école.",
            "La durée du cours."
          ], a: 1, why: "« ce que ces synthèses identifient comme rentable… c'est l'alignement entre le support et la nature intrinsèque du contenu »." },
          { q: "Pourquoi les méthodes alignées sur le contenu sont-elles plus difficiles à déployer ?", options: [
            "Elles coûtent plus cher.",
            "Elles sont moins populaires que celles alignées sur la préférence, car la perception de progresser y est moindre.",
            "Elles sont interdites.",
            "Elles ne sont pas connues."
          ], a: 1, why: "« la perception de progresser… demeure influencée par la préférence » → impact pratique sur la popularité." },
          { q: "Quel est le ton général de la tribune ?", options: [
            "Polémique et provocateur.",
            "Synthétique et nuancé (science + sociologie de la pédagogie).",
            "Nostalgique.",
            "Émotionnel."
          ], a: 1, why: "Style « la science a tranché ; la pédagogie… en tirera ou non les conséquences » — registre analytique nuancé." },
        ]
      },
    ]
  };

  T.coPacks.b2_pack2 = {
    title: "Lot CO B2+ — médias, débats, interviews",
    level: "B2 → C1",
    items: [
      {
        text: "Une étude publiée la semaine dernière indique que les actifs québécois passent en moyenne 47 minutes par jour à consulter leur messagerie professionnelle en dehors des heures de travail. Les auteurs y voient un signal inquiétant et appellent à un cadre plus strict autour du droit à la déconnexion.",
        q: "Quel est le point d'attention central de cette étude ?",
        options: [
          "Le manque de productivité au bureau.",
          "Le temps passé sur la messagerie professionnelle hors horaires.",
          "Le coût des abonnements à Internet.",
          "Le télétravail."
        ], a: 1, why: "« en moyenne 47 minutes par jour à consulter leur messagerie professionnelle en dehors des heures de travail »."
      },
      {
        text: "Au micro de notre invité, ce matin : on ne va pas se mentir, le secteur traverse une zone de turbulences. Mais je suis convaincu que les fondamentaux restent solides, et que les commandes vont repartir au troisième trimestre, peut-être un peu plus tard.",
        q: "Comment qualifier la position de l'invité ?",
        options: [
          "Catastrophiste.",
          "Optimisme prudent, avec une projection à moyen terme.",
          "Indifférent.",
          "Démissionnaire."
        ], a: 1, why: "« les fondamentaux restent solides… les commandes vont repartir au troisième trimestre, peut-être un peu plus tard »."
      },
      {
        text: "C'est une décision que beaucoup espéraient depuis longtemps, sans vraiment y croire. Le tribunal administratif a finalement tranché en faveur des riverains, ordonnant la suspension immédiate du chantier autoroutier. La municipalité dispose de trente jours pour faire appel.",
        q: "Que peut faire la municipalité ?",
        options: [
          "Continuer le chantier malgré la décision.",
          "Faire appel dans un délai de trente jours.",
          "Demander un référendum.",
          "Doubler les amendes."
        ], a: 1, why: "« La municipalité dispose de trente jours pour faire appel »."
      },
      {
        text: "Bon, écoute, je vais te parler franchement : je ne suis pas convaincu par le projet tel qu'il est présenté. Cela dit, je reconnais qu'il a des points forts — notamment la dimension formation. Si on retravaille la partie financement, je pourrais reconsidérer ma position.",
        q: "Quelle est l'attitude du locuteur ?",
        options: [
          "Rejet ferme et définitif.",
          "Réserve nuancée : ouverture conditionnelle au compromis.",
          "Accord total et immédiat.",
          "Désintérêt."
        ], a: 1, why: "« je ne suis pas convaincu… cela dit, je reconnais… si on retravaille… je pourrais reconsidérer »."
      },
      {
        text: "Le ministère a annoncé hier soir le report sine die de la consultation publique prévue lundi. Les associations dénoncent une décision « prise dans la précipitation et sans concertation », tandis que les services évoquent des « contraintes logistiques imprévues » liées à l'organisation des élections.",
        q: "Quel est le point de désaccord principal entre les associations et le ministère ?",
        options: [
          "La date de l'élection.",
          "L'interprétation de la raison du report : précipitation vs contraintes logistiques.",
          "Le budget alloué.",
          "Le nombre de participants attendus."
        ], a: 1, why: "Phrases opposées : « précipitation et sans concertation » vs « contraintes logistiques imprévues »."
      },
      {
        text: "Très clairement, l'objectif fixé pour la fin de l'année reste atteignable, mais à condition d'accélérer dès maintenant. Sans changement de rythme dans les deux prochaines semaines, on perdra le bénéfice du démarrage.",
        q: "Quelle est la condition de réussite évoquée ?",
        options: [
          "Réduire le budget.",
          "Accélérer dès maintenant et changer de rythme dans les deux semaines à venir.",
          "Attendre l'année prochaine.",
          "Recruter du personnel."
        ], a: 1, why: "« à condition d'accélérer dès maintenant. Sans changement de rythme dans les deux prochaines semaines, on perdra le bénéfice »."
      },
      {
        text: "Mesdames, messieurs, en raison d'un mouvement social inopiné, l'ensemble des trains au départ de Montréal-Centrale subit ce matin un retard moyen de quarante-cinq minutes. Les correspondances ne sont pas garanties. Les voyageurs porteurs d'un billet flexible peuvent l'échanger sans frais dans les douze heures.",
        q: "Que peuvent faire les voyageurs avec un billet flexible ?",
        options: [
          "Obtenir un remboursement immédiat.",
          "L'échanger sans frais dans les douze heures.",
          "Réclamer un dédommagement de 100 $.",
          "Le revendre."
        ], a: 1, why: "« peuvent l'échanger sans frais dans les douze heures »."
      },
      {
        text: "Ce que je trouve frappant dans cette tendance, ce n'est pas tant la baisse en elle-même — elle était attendue — c'est la rapidité avec laquelle elle s'installe. Trois ans plus tôt, personne ne misait sur un tel rythme.",
        q: "Qu'est-ce qui surprend le locuteur ?",
        options: [
          "Que la baisse soit massive.",
          "La rapidité de l'installation de la tendance, pas la baisse en elle-même.",
          "Que la baisse n'ait pas eu lieu.",
          "Que la tendance s'inverse."
        ], a: 1, why: "« ce n'est pas tant la baisse… c'est la rapidité avec laquelle elle s'installe »."
      },
      {
        text: "Force est de constater que les négociations patinent. Cela étant, je reste convaincu qu'un accord est possible, à condition que chaque partie consente à mettre de l'eau dans son vin. Faute de quoi, nous nous dirigeons vers un blocage durable.",
        q: "Quelle est l'évaluation du locuteur ?",
        options: [
          "Échec déjà acté.",
          "Possibilité d'accord conditionné à un compromis mutuel ; sinon blocage durable.",
          "Succès garanti.",
          "Pas d'opinion."
        ], a: 1, why: "« un accord est possible, à condition que chaque partie consente à mettre de l'eau dans son vin »."
      },
      {
        text: "On nous demande souvent si ce mode de fonctionnement est viable à long terme. La réponse honnête, c'est qu'on ne le sait pas encore : on a tenu deux ans avec ce modèle, mais le contexte économique a changé. On va devoir le retravailler en profondeur d'ici l'automne.",
        q: "Quelle est la position sur la viabilité à long terme du modèle ?",
        options: [
          "Affirmative et catégorique.",
          "Honnêteté assumée : pas encore tranchée, à retravailler en profondeur.",
          "Définitivement non.",
          "Rejet de la question."
        ], a: 1, why: "« la réponse honnête, c'est qu'on ne le sait pas encore… On va devoir le retravailler en profondeur »."
      },
    ]
  };

  // -----------------------------------------------------------------
  // v1.4.1 — Pronouns drill: replace stub "—" option with explicit label
  // -----------------------------------------------------------------
  (function fixPronounsStub() {
    const arr = T.pronouns && T.pronouns.b1_b2;
    if (!arr) return;
    arr.forEach((it) => {
      const j = it.options.indexOf("—");
      if (j >= 0) it.options[j] = "aucun pronom court (forme inchangée)";
    });
  })();

  T.phraseOfDay = T.phraseOfDay || [
    { fr: "Force est de constater que la situation ne s'améliore pas.", gloss: "Reconnaissance d'un fait gênant (registre soutenu, très productif en EE T3)." },
    { fr: "Il convient de souligner que ce point reste à clarifier.", gloss: "Marqueur soutenu d'insistance — utile en lettre formelle ou essai." },
    { fr: "Cela étant dit, je ne partage pas entièrement votre analyse.", gloss: "Concession suivie d'une objection nuancée." },
    { fr: "À mon sens, la solution la plus pragmatique reste à inventer.", gloss: "Atténuation d'opinion (« à mon sens » = « selon moi » en plus soutenu)." },
    { fr: "Quoi qu'il en soit, l'urgence d'agir ne fait plus débat.", gloss: "Concession totale + affirmation forte." },
    { fr: "Loin de moi l'idée de minimiser ce problème.", gloss: "Formule de mise au point — désamorce une critique anticipée." },
    { fr: "Reste à savoir si cette mesure produira les effets escomptés.", gloss: "Réserve sur un avenir incertain." },
    { fr: "On ne saurait trop insister sur l'importance de la prévention.", gloss: "Insistance polie au conditionnel — formule très valorisée en EE." },
    { fr: "Tout porte à croire que l'inflation va se stabiliser.", gloss: "Prudence assertive — « les signaux convergent vers… »." },
    { fr: "Il s'avère que la deuxième option est plus rentable.", gloss: "Constat après analyse — « il s'avère que » > « il se trouve que » en registre." },
    { fr: "À cet égard, je rejoins votre point de vue.", gloss: "Accord ciblé sur un point précis." },
    { fr: "En définitive, le choix dépendra de vos priorités.", gloss: "Conclusion synthétique — équivalent soutenu de « finalement »." },
    { fr: "Il est légitime de s'interroger sur la pertinence de cette mesure.", gloss: "Formule d'objection polie — pose une question sans accuser." },
    { fr: "À l'inverse, certains préfèrent une approche progressive.", gloss: "Marqueur d'opposition élégant, alternative à « par contre » (oral)." },
    { fr: "Il ne fait aucun doute que la formation continue est devenue indispensable.", gloss: "Affirmation forte — utile en T3, à doser avec parcimonie." },
    { fr: "On peut raisonnablement penser que la tendance se confirmera.", gloss: "Pronostic prudent — « raisonnablement » atténue l'engagement." },
    { fr: "Il s'agit avant tout de définir des priorités claires.", gloss: "Recentrer un débat sur l'essentiel." },
    { fr: "Quand bien même cela serait vrai, l'argument reste fragile.", gloss: "Concession hypothétique soutenue — registre C1." },
    { fr: "Aussi paradoxal que cela puisse paraître, la pluie a sauvé la récolte.", gloss: "Formule de surprise / paradoxe — emploi C1." },
    { fr: "Il y a fort à parier que la décision sera reportée.", gloss: "Pronostic familier-soutenu — utile à l'oral B2." },
    { fr: "Il importe de distinguer les causes structurelles des facteurs ponctuels.", gloss: "Précision analytique — typique d'un essai argumenté." },
    { fr: "Sans doute serait-il préférable de revoir le calendrier.", gloss: "Suggestion atténuée par inversion stylistique." },
    { fr: "Tant s'en faut que la crise soit derrière nous.", gloss: "Formule littéraire — équivalent de « loin de là »." },
    { fr: "Cela dit, des progrès notables ont été réalisés.", gloss: "Bascule entre une réserve et un éloge — concession + nuance." },
    { fr: "Il appartient à chacun de tirer ses propres conclusions.", gloss: "Conclusion ouverte, polie." },
    { fr: "À supposer que cette hypothèse se vérifie, les conséquences seraient majeures.", gloss: "Conditionnel hypothétique — registre soutenu." },
    { fr: "On aurait tort de croire qu'il s'agit d'un cas isolé.", gloss: "Avertir le lecteur d'une généralisation valide." },
    { fr: "En somme, le débat est loin d'être clos.", gloss: "Synthèse + ouverture sur la suite." },
    { fr: "Il convient de relativiser cette interprétation.", gloss: "Invitation à modérer une lecture trop tranchée." },
    { fr: "C'est précisément ce point qui mérite notre attention.", gloss: "Focus narratif — utile pour structurer un essai." },
  ];

  // ============================================================
  // v1.5 — banks for SRS decks, shadow speaking, CO dictation
  // ============================================================

  // SRS deck — B2 core (~50 cards covering high-leverage B2 lexis + collocations)
  TCF.decks = TCF.decks || {};
  TCF.decks.b2core = [
    { id: "b2c-001", q: "Synonyme soutenu de <strong>cependant</strong> (3 réponses possibles)", a: "néanmoins · toutefois · pour autant", hint: "concession / restriction" },
    { id: "b2c-002", q: "Donner <em>par conséquent</em> en 2 alternatives plus subtiles", a: "dès lors · ainsi · de ce fait", hint: "consécution" },
    { id: "b2c-003", q: "Compléter : <em>il convient de _____ la nuance</em>", a: "souligner / rappeler / introduire", hint: "verbe + objet abstrait" },
    { id: "b2c-004", q: "Verbe pour : « rendre quelque chose moins fort »", a: "atténuer (cf. atténuation)", hint: "anti-erreur EE : éviter « diminuer » dans un essai" },
    { id: "b2c-005", q: "Donner 3 connecteurs d'illustration B2 distincts", a: "à titre d'exemple · notamment · à savoir", hint: "T3" },
    { id: "b2c-006", q: "Compléter : <em>force est de _____</em>", a: "constater (que…)", hint: "Formule de constat soutenue" },
    { id: "b2c-007", q: "Genre de <strong>problème</strong> ?", a: "masculin — <em>un</em> problème", hint: "piège classique" },
    { id: "b2c-008", q: "Genre de <strong>mer</strong> ?", a: "féminin — <em>la</em> mer", hint: "≠ « le maire »" },
    { id: "b2c-009", q: "Genre de <strong>image</strong> ?", a: "féminin — <em>une</em> image", hint: "homophone avec « hommage » (m.)" },
    { id: "b2c-010", q: "Genre de <strong>page</strong> ?", a: "féminin — <em>la</em> page", hint: "" },
    { id: "b2c-011", q: "« j'ai pensé à elle » : pourquoi <strong>elle</strong> et non <strong>y</strong> ?", a: "<em>penser à + personne</em> ⇒ pronom tonique ; <em>y</em> seulement pour chose/lieu/idée", hint: "exception classique" },
    { id: "b2c-012", q: "« je suis prêt à le faire » : remplacer <em>le faire</em> par un pronom ?", a: "Impossible — <em>être prêt à + verbe</em> ; pas de pronominalisation par « y »", hint: "" },
    { id: "b2c-013", q: "PC ou imparfait : <em>Hier, il _____ (pleuvoir) toute la journée</em>", a: "il a plu / il pleuvait — selon visée ; <strong>il a plu</strong> (durée délimitée par « toute la journée »)", hint: "borne aspectuelle" },
    { id: "b2c-014", q: "PC ou imparfait : <em>Quand je _____ (entrer), il _____ (lire)</em>", a: "<strong>je suis entré</strong> (ponctuel) · <strong>il lisait</strong> (en cours)", hint: "interruption" },
    { id: "b2c-015", q: "Subjonctif après <em>bien que</em> : <em>bien que cela _____ (être) difficile</em>", a: "<strong>soit</strong>", hint: "Concession ⇒ subj. obligatoire" },
    { id: "b2c-016", q: "Subjonctif après <em>à condition que</em> : <em>à condition que tu _____ (venir)</em>", a: "<strong>viennes</strong>", hint: "" },
    { id: "b2c-017", q: "Conditionnel passé après <em>si</em> + plus-que-parfait : <em>Si j'avais su, je _____ (venir)</em>", a: "<strong>je serais venu(e)</strong>", hint: "Hypothèse passée non-réalisée" },
    { id: "b2c-018", q: "Compléter : <em>Plus on _____, plus on _____</em> (corrélation)", a: "Plus on apprend, plus on doute (par exemple) — structure : <em>plus … plus + indicatif</em>", hint: "C1 marker" },
    { id: "b2c-019", q: "Liaison après <strong>les</strong> + voyelle (obligatoire / interdite ?)", a: "obligatoire — /lez‿/", hint: "Dét + nom" },
    { id: "b2c-020", q: "Liaison après <strong>et</strong> + voyelle ?", a: "<strong>interdite</strong> — jamais /z/ ou /t/ après « et »", hint: "Anti-erreur §L4" },
    { id: "b2c-021", q: "Synonyme B2 de <strong>important</strong> dans un essai", a: "majeur · capital · essentiel · crucial · primordial", hint: "Variation lexicale" },
    { id: "b2c-022", q: "Synonyme B2 de <strong>montrer</strong> (académique)", a: "démontrer · illustrer · mettre en évidence · révéler", hint: "" },
    { id: "b2c-023", q: "Synonyme B2 de <strong>beaucoup de</strong> dans une dissertation", a: "nombre de · un grand nombre de · de nombreux/nombreuses · maintes (litt.)", hint: "Éviter « beaucoup de » en T3" },
    { id: "b2c-024", q: "Faux-ami : <em>actuellement</em> signifie en français…", a: "« en ce moment, maintenant » (≠ <em>actually</em>)", hint: "Anglicisme piège" },
    { id: "b2c-025", q: "Faux-ami : <em>éventuellement</em> signifie en français…", a: "« peut-être, le cas échéant » (≠ <em>eventually</em>)", hint: "" },
    { id: "b2c-026", q: "Faux-ami : <em>sensible</em> signifie en français…", a: "« qui ressent fortement » (≠ <em>sensible</em> = raisonnable)", hint: "" },
    { id: "b2c-027", q: "Collocation : <em>tirer ___ leçon</em>", a: "tirer <strong>une</strong> leçon (de…)", hint: "" },
    { id: "b2c-028", q: "Collocation : <em>prendre ___ décision</em>", a: "prendre <strong>une</strong> décision", hint: "Pas « faire une décision » (calque)" },
    { id: "b2c-029", q: "Collocation : <em>poser ___ question</em>", a: "poser <strong>une</strong> question", hint: "Pas « demander une question »" },
    { id: "b2c-030", q: "Collocation : <em>faire ___ effort</em>", a: "faire <strong>un</strong> effort", hint: "" },
    { id: "b2c-031", q: "Préposition après <strong>s'intéresser</strong> ?", a: "<strong>à</strong> qqch / qqn", hint: "" },
    { id: "b2c-032", q: "Préposition après <strong>se souvenir</strong> ?", a: "<strong>de</strong> qqch / qqn", hint: "« se rappeler » ⇒ direct (≠ même rection)" },
    { id: "b2c-033", q: "Préposition après <strong>réfléchir</strong> ?", a: "<strong>à</strong> qqch", hint: "" },
    { id: "b2c-034", q: "Préposition après <strong>répondre</strong> ?", a: "<strong>à</strong> qqn / qqch", hint: "" },
    { id: "b2c-035", q: "Pluriel de <strong>travail</strong> ?", a: "<strong>travaux</strong>", hint: "" },
    { id: "b2c-036", q: "Pluriel de <strong>festival</strong> ?", a: "<strong>festivals</strong> (exception : -al ⇒ -aux normalement)", hint: "" },
    { id: "b2c-037", q: "Pluriel de <strong>œil</strong> ?", a: "<strong>yeux</strong>", hint: "" },
    { id: "b2c-038", q: "<em>Quoi qu'il en soit</em> sert à…", a: "Marquer une bascule concessive — « peu importe la suite »", hint: "C1 connector" },
    { id: "b2c-039", q: "<em>En définitive</em> sert à…", a: "Conclure après nuances accumulées — « finalement, après tout cela »", hint: "Conclure un essai" },
    { id: "b2c-040", q: "<em>Pour autant</em> sert à…", a: "Concession nuancée — « ce qui précède n'invalide pas X »", hint: "Synonyme soutenu de « cependant »" },
    { id: "b2c-041", q: "<em>D'autant plus que</em> introduit…", a: "Une cause renforcée (cause + intensification)", hint: "" },
    { id: "b2c-042", q: "<em>Or</em> sert à…", a: "Introduire un fait nouveau qui infléchit le raisonnement", hint: "Pivot dialectique" },
    { id: "b2c-043", q: "<em>Certes … mais …</em> est la structure…", a: "Concession-réfutation : on accorde un point, puis on objecte", hint: "T3 dialectique" },
    { id: "b2c-044", q: "<em>Non seulement … mais aussi …</em> introduit…", a: "Une addition à effet de gradation", hint: "" },
    { id: "b2c-045", q: "Verbes du subj. après <em>il faut que</em> : <em>il faut que tu _____ (être)</em>", a: "<strong>sois</strong>", hint: "Nécessité ⇒ subj." },
    { id: "b2c-046", q: "Verbes du subj. après <em>vouloir que</em> : <em>je veux que tu _____ (faire)</em>", a: "<strong>fasses</strong>", hint: "Volonté ⇒ subj." },
    { id: "b2c-047", q: "Verbes du subj. après <em>douter que</em> : <em>je doute que cela _____ (suffire)</em>", a: "<strong>suffise</strong>", hint: "Doute ⇒ subj." },
    { id: "b2c-048", q: "Mot pour : <em>action de retarder qqch d'office</em>", a: "<strong>reporter / différer</strong>", hint: "« reporter une décision »" },
    { id: "b2c-049", q: "Mot pour : <em>donner une nouvelle dimension à</em>", a: "<strong>redéfinir / repenser / réinventer</strong>", hint: "" },
    { id: "b2c-050", q: "Mot pour : <em>tendre à devenir plus uniforme</em>", a: "<strong>s'uniformiser / s'homogénéiser</strong>", hint: "Vocab essai" }
  ];

  // Shadow speaking pack — 18 phrases B2-C1 ciblées sur prosodie et liaisons
  TCF.shadow = TCF.shadow || {};
  TCF.shadow.b2 = [
    { id: "sh-001", text: "Il convient de souligner que cette tendance s'est confirmée récemment.", ipa: "il.kɔ̃.vjɛ̃.də.su.li.ɲe.kə.sɛt.tɑ̃.dɑ̃.sɛ.kɔ̃.fiʁ.me.ʁe.sa.mɑ̃", tag: "essai-T3", note: "Liaison /t/ : <em>convient de</em>. Schwa final stable." },
    { id: "sh-002", text: "Force est de constater qu'il n'en va pas toujours ainsi.", tag: "concession", note: "Inversion : /il.nɑ̃.va/. /il/ liaison interdite avec /va/." },
    { id: "sh-003", text: "À cet égard, il importe de distinguer les deux phénomènes.", tag: "T3", note: "Liaison /t/ : <em>cet égard</em>. Liaison /z/ obligatoire : <em>les_deux</em>." },
    { id: "sh-004", text: "Non seulement la productivité a augmenté, mais aussi la qualité du dialogue.", tag: "T2 article", note: "Pause prosodique avant « mais aussi »." },
    { id: "sh-005", text: "Quoi qu'il en soit, la situation appelle une réponse rapide.", tag: "bascule C1", note: "/kwa.kil.ɑ̃.swa/ — pas de pause entre les mots." },
    { id: "sh-006", text: "Les habitudes ont évolué de manière significative ces dernières années.", tag: "T2 introduction", note: "Liaison /z/ : <em>les_habitudes</em>, <em>ont_évolué</em>, <em>dernières_années</em>." },
    { id: "sh-007", text: "Il s'agit avant tout de redéfinir nos priorités collectives.", tag: "T3 pivot", note: "Élision : <em>s'agit</em>. /il.sa.ʒi.a.vɑ̃.tu/" },
    { id: "sh-008", text: "Pour ma part, je tendrais à privilégier une approche progressive.", tag: "opinion EO", note: "Conditionnel /tɑ̃.dʁɛ/ — pas /tɑ̃.dʁɛ.z/" },
    { id: "sh-009", text: "Il y a fort à parier que la décision sera reportée à l'automne.", tag: "pronostic", note: "Liaison /t/ : <em>fort à</em> ⇒ /fɔʁ.t‿a/" },
    { id: "sh-010", text: "Cela étant, des progrès notables restent à accomplir.", tag: "concession C1", note: "<em>étant</em> liaison interdite avec <em>des</em>." },
    { id: "sh-011", text: "On ne saurait trop insister sur l'importance de la formation continue.", tag: "C1 emphase", note: "/ɔ̃.nə.so.ʁɛ/ — pas /so.ʁɛt/." },
    { id: "sh-012", text: "Certains préfèrent une approche progressive, d'autres une rupture nette.", tag: "T3 contraste", note: "Pause virgule + /do.tʁ‿yn/ liaison /z/." },
    { id: "sh-013", text: "Il en va de même pour l'éducation et pour la santé.", tag: "T3 généralisation", note: "/il.ɑ̃.va.də.mɛm/ — élision impossible sur <em>va</em>." },
    { id: "sh-014", text: "Cela mérite que l'on s'interroge sur ses véritables conséquences.", tag: "subj. + interro indirecte", note: "Élision <em>l'on</em> littéraire — registre soutenu." },
    { id: "sh-015", text: "On peut raisonnablement penser que le phénomène se confirmera.", tag: "pronostic prudent", note: "/ʁɛ.zɔ.na.blə.mɑ̃/ — schwa central tombable." },
    { id: "sh-016", text: "Il s'avère que la situation est plus complexe qu'il n'y paraît.", tag: "T3 nuance", note: "Élision <em>qu'il</em>. Ne explétif après <em>plus que</em>." },
    { id: "sh-017", text: "Aussi paradoxal que cela puisse paraître, l'inverse est tout aussi vrai.", tag: "C1 paradoxe", note: "Subj. <em>puisse</em>. /tu.t‿o.si/ liaison /t/." },
    { id: "sh-018", text: "En définitive, cette évolution témoigne d'une mutation plus profonde.", tag: "conclusion T3", note: "/ɑ̃.de.fi.ni.tiv/ — t prononcé final." }
  ];

  // CO dictation set — 15 sentences, traps inclus (liaisons, numbers, drop-ne)
  TCF.codict = TCF.codict || {};
  TCF.codict.b1b2 = [
    { id: "cd-001", text: "Le train de quatorze heures quinze est annoncé avec un retard de vingt minutes.", level: "B1", note: "Pièges nombres : 14h15, 20 min." },
    { id: "cd-002", text: "Soixante-quinze pour cent des étudiants ont répondu au questionnaire.", level: "B1", note: "Soixante-quinze ≠ septante-cinq." },
    { id: "cd-003", text: "Pourriez-vous me dire à quelle heure ferme la bibliothèque ?", level: "B1", note: "Inversion polie + élision <em>m'</em>." },
    { id: "cd-004", text: "Je n'ai pas pu trouver mon billet, j'ai dû repasser au guichet.", level: "B2", note: "Négation complète préservée." },
    { id: "cd-005", text: "Quatre-vingt-dix-neuf personnes ont confirmé leur présence.", level: "B1", note: "Quatre-vingt-dix-neuf — quatre traits d'union." },
    { id: "cd-006", text: "Les enfants ont mangé tous les fruits qui étaient sur la table.", level: "B1", note: "Liaisons : <em>les_enfants</em>, <em>ont_mangé</em>, <em>tous_les</em>." },
    { id: "cd-007", text: "Il faudrait qu'on prenne une décision rapide avant la fin du mois.", level: "B2", note: "Subj. <em>qu'on prenne</em>." },
    { id: "cd-008", text: "Bien que ce soit difficile, j'essaierai de finir le projet à temps.", level: "B2", note: "Subj. après <em>bien que</em>." },
    { id: "cd-009", text: "L'ascenseur est en panne depuis ce matin, prenez l'escalier de droite.", level: "B1", note: "Élision <em>l'</em>, liaison /t/ <em>est_en</em>." },
    { id: "cd-010", text: "Force est de constater que les choses ont bien changé depuis dix ans.", level: "B2", note: "Formule soutenue." },
    { id: "cd-011", text: "Si j'avais su, je ne serais pas venu si tôt.", level: "B2", note: "Plus-que-parfait + conditionnel passé." },
    { id: "cd-012", text: "Le rendez-vous a été reporté à mercredi prochain à dix-sept heures.", level: "B1", note: "Reporter (passif) — éviter calque <em>postponé</em>." },
    { id: "cd-013", text: "Cela me semble être une excellente idée, j'en parlerai à mes collègues.", level: "B2", note: "<em>en parler à</em> — préposition critique." },
    { id: "cd-014", text: "Il y a beaucoup de monde dans la salle d'attente ce matin.", level: "B1", note: "<em>il y a</em> + déterminant complexe." },
    { id: "cd-015", text: "Quoi qu'il en soit, je préférerais que nous en discutions de vive voix.", level: "B2", note: "Subj. + <em>en discuter de</em>." }
  ];

})();
