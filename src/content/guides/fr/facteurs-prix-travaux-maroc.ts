import type { GuideArticle } from "../types";

export const factorsFr: GuideArticle = {
  key: "costFactors", locale: "fr", slug: "facteurs-prix-travaux-maroc", counterpartSlug: "factors-affecting-project-costs-morocco", category: "Comprendre les prix",
  seoTitle: "Prix des travaux au Maroc : les facteurs qui font varier le coût", title: "Quels éléments influencent le prix des travaux au Maroc ?",
  description: "Découvrez les principaux facteurs qui influencent le prix des travaux au Maroc : surface, état du chantier, matériaux, main-d’œuvre, ville, délais et complexité.",
  excerpt: "Pourquoi deux chantiers de même surface produisent des devis différents, et comment isoler chaque facteur avant de comparer.",
  primaryKeyword: "prix travaux Maroc", secondaryKeywords: ["coût travaux Maroc", "prix rénovation Maroc", "estimation travaux Maroc", "prix main-d’œuvre bâtiment Maroc", "prix matériaux construction Maroc"],
  publishedAt: "2026-07-19", modifiedAt: "2026-07-19", readingTime: 14, author: "Équipe éditoriale Renoqo",
  shortAnswer: "Le prix des travaux au Maroc varie selon la surface réellement traitée, l’état initial, l’accès, les démolitions, la complexité, les matériaux, la main-d’œuvre, la localisation, le délai et la coordination. Deux logements de même superficie peuvent donc avoir des coûts très différents. Pour comprendre un devis, reliez chaque écart à une quantité, une spécification, une contrainte ou un risque identifiable.",
  takeaways: ["La surface habitable n’explique qu’une partie du coût.", "État initial, accès et complexité modifient la méthode d’exécution.", "Disponibilité et qualité des matériaux affectent achat, pose et délai.", "Ville et saison doivent être analysées par contraintes concrètes, sans généralisation.", "Les changements tardifs cumulent achats, reprises et désorganisation."],
  sections: [
    { id: "surface-etat", title: "Surface totale et état initial du logement", blocks: [
      { type: "paragraph", text: "La surface détermine une partie des quantités, mais les coûts ne progressent pas toujours proportionnellement. Installation de chantier, déplacement et certains équipements restent fixes. À l’inverse, murs hauts, nombreux angles ou petites pièces augmentent parfois le temps pour une même surface de sol." },
      { type: "paragraph", text: "L’état initial commande la préparation : support sain ou friable, réseaux accessibles ou cachés, humidité, planéité et qualité des travaux précédents. Un diagnostic réduit l’incertitude ; une dépose peut toutefois révéler des conditions invisibles. Le devis doit préciser ses hypothèses." },
    ]},
    { id: "acces-demolition", title: "Accessibilité, démolition et évacuation", blocks: [
      { type: "paragraph", text: "Étage sans ascenseur utilisable, distance de portage, rue étroite, stationnement contraint, horaires d’immeuble et espace de stockage influencent la manutention. Ce n’est pas la ville en elle-même qui explique toujours l’écart, mais la façon dont l’équipe et les matériaux atteignent le chantier." },
      { type: "list", items: ["Protection des circulations et parties communes.", "Dépose manuelle ou mécanisée selon l’accès.", "Tri, ensachage, descente et transport des déchets.", "Livraisons fractionnées faute de stockage.", "Remise en état et nettoyage des zones partagées."] },
    ]},
    { id: "complexite", title: "Complexité technique et coordination", blocks: [
      { type: "paragraph", text: "Déplacer des points d’eau, modifier une distribution, intégrer des éléments sur mesure ou travailler autour d’un logement occupé demande davantage de conception, de protections et de séquences. Plusieurs corps de métier créent aussi des interfaces : le support du carreleur dépend du plombier, la peinture intervient après les réseaux et les reprises." },
      { type: "tip", title: "Comparer la méthode", text: "Demandez qui coordonne les lots, quels contrôles précèdent la fermeture des ouvrages et quelles tâches conditionnent les suivantes. Une ligne de coordination peut éviter des reprises plus coûteuses." },
    ]},
    { id: "materiaux", title: "Qualité, disponibilité et transport des matériaux", blocks: [
      { type: "paragraph", text: "Le matériau influence son prix d’achat, mais aussi consommables, outils, pertes, vitesse de pose, entretien et réparabilité. Un grand format, un calepinage complexe ou une pièce sur mesure peut nécessiter plus de préparation qu’une référence courante." },
      { type: "paragraph", text: "Une référence disponible localement réduit parfois attente et livraison. Un produit importé ou fabriqué à la demande peut allonger le planning et accroître le risque de substitution. Vérifiez stock, délai, quantité minimale, conditions de retour et disponibilité future des pièces." },
    ]},
    { id: "main-oeuvre", title: "Quantité de main-d’œuvre et niveau de qualification", blocks: [
      { type: "paragraph", text: "Le coût de main-d’œuvre dépend du temps nécessaire, du nombre d’intervenants, des compétences et de l’encadrement. Une finition exigeante, un support difficile ou un planning compressé demande parfois une équipe plus nombreuse ou spécialisée. Comparer seulement un tarif journalier ignore la productivité, la qualité attendue et les reprises incluses." },
      { type: "warning", title: "Ne pas confondre vitesse et durée annoncée", text: "Un délai court peut venir d’une équipe renforcée, d’un périmètre incomplet ou d’une hypothèse optimiste. Demandez le nombre d’intervenants, la séquence et les dépendances." },
    ]},
    { id: "lieu-saison", title: "Ville, zone d’intervention, urgence et saison", blocks: [
      { type: "paragraph", text: "Les écarts entre Casablanca, Rabat, Marrakech ou une autre zone ne doivent pas être affirmés sans données comparables. Analysez plutôt disponibilité des équipes, distance depuis le fournisseur, hébergement éventuel, circulation, accès et règles du site. Deux adresses d’une même ville peuvent présenter des logistiques opposées." },
      { type: "paragraph", text: "Une échéance urgente réduit le choix des équipes et des références. La saison peut affecter séchage, disponibilité, horaires ou approvisionnement selon le lot. Inscrire une marge de planning est souvent plus efficace que demander une accélération permanente." },
    ]},
    { id: "finitions-risque", title: "Finitions et marge de risque", blocks: [
      { type: "paragraph", text: "Économique, standard et premium décrivent ici des niveaux de spécification, pas des tarifs universels. Le premier privilégie simplicité et références courantes ; le deuxième équilibre usage, durabilité et choix ; le troisième peut intégrer sur-mesure, détails et tolérances plus exigeantes." },
      { type: "paragraph", text: "Un professionnel peut inclure une marge de risque lorsque le périmètre reste incertain, l’accès difficile ou les délais serrés. Réduire l’incertitude avec relevés, sondages appropriés et décisions précoces aide les candidats à chiffrer plus précisément." },
    ]},
    { id: "tableau", title: "Tableau des facteurs et de leur impact potentiel", blocks: [
      { type: "table", caption: "Facteurs de variation à documenter", headers: ["Facteur", "Impact potentiel", "Information à collecter"], rows: [["Surface et géométrie", "Quantités et temps de pose", "Métrés par support"], ["État initial", "Préparation et réparations", "Diagnostic, photos, sondages"], ["Accès", "Manutention et logistique", "Étage, distance, stockage, horaires"], ["Démolition", "Main-d’œuvre et déchets", "Nature et volume des ouvrages"], ["Complexité", "Études, compétences, coordination", "Plans et interfaces entre lots"], ["Matériaux", "Achat, pose, pertes, délai", "Référence, stock, méthode de pose"], ["Main-d’œuvre", "Temps, qualification, encadrement", "Équipe et séquence"], ["Localisation", "Déplacement et disponibilité", "Adresse et fournisseurs"], ["Urgence/saison", "Ressources et planning", "Échéance et contraintes"], ["Modifications", "Reprises, commandes et retard", "Processus d’approbation"], ["Déchets/nettoyage", "Manutention et fin de chantier", "Responsabilités et volume"], ["Risque", "Provision ou exclusions", "Hypothèses et inconnues"]] },
    ]},
    { id: "exemples", title: "Deux projets de même surface, des coûts différents", blocks: [
      { type: "paragraph", text: "Scénarios fictifs, pédagogiques et non contractuels : les deux appartements font 80 m². Le projet A conserve la distribution, les réseaux sont accessibles et contrôlés, les références sont disponibles et le logement est vide. Le projet B déplace cuisine et salle d’eau, nécessite des déposes, se situe à un étage avec accès limité et prévoit des menuiseries sur mesure." },
      { type: "table", caption: "Comparaison qualitative de deux scénarios fictifs", headers: ["Dimension", "Projet A", "Projet B"], rows: [["Périmètre", "Rafraîchissement ciblé", "Redistribution et rénovation technique"], ["État", "Supports documentés", "Éléments cachés après dépose"], ["Accès", "Livraison et stockage simples", "Portage et livraisons fractionnées"], ["Matériaux", "Références courantes", "Sur-mesure et détails complexes"], ["Coordination", "Peu de lots", "Interfaces nombreuses"], ["Risque", "Incertitude limitée", "Réserve et planning plus importants"]] },
      { type: "paragraph", text: "La différence ne démontre aucun prix moyen : elle explique pourquoi un prix au m² isolé ne peut pas comparer ces projets. Le bon niveau d’analyse est la quantité, la méthode et la contrainte associée." },
    ]},
    { id: "reduire", title: "Réduire les coûts sans sacrifier la qualité", blocks: [
      { type: "list", items: ["Stabiliser le plan et les références avant commande.", "Conserver les éléments en bon état après diagnostic.", "Simplifier géométrie et détails difficiles à exécuter.", "Choisir des références disponibles, adaptées à l’usage et réparables.", "Regrouper les décisions pour éviter arrêts et déplacements.", "Protéger la qualité des réseaux et supports difficiles à reprendre.", "Comparer plusieurs devis sur un cahier des charges identique.", "Réceptionner chaque lot avant de masquer les ouvrages."] },
    ]},
    { id: "erreurs", title: "Erreurs fréquentes", blocks: [
      { type: "list", items: ["Déduire le coût uniquement de la surface habitable.", "Comparer des niveaux de finition non définis.", "Ignorer accès, déchets, livraison et nettoyage.", "Commander une référence sans confirmer stock et quantité.", "Changer le plan après démolition sans mesurer toutes les incidences.", "Supposer qu’une ville est toujours plus chère sans données homogènes.", "Réduire la préparation des supports pour protéger une finition visible."] },
    ]},
  ],
  checklist: ["Les surfaces sont mesurées par type de support.", "L’état initial et les hypothèses sont documentés.", "Accès, stockage et stationnement ont été visités.", "Démolition et déchets ont un responsable.", "Les interfaces techniques sont identifiées.", "Les matériaux ont références, stock et méthode de pose.", "L’équipe et le planning sont cohérents.", "Les contraintes locales sont décrites sans généralisation.", "Les finitions sont définies par performances.", "Toute modification suit un accord écrit sur coût et délai."],
  faqs: [
    { question: "Pourquoi les devis travaux varient-ils autant ?", answer: "Ils peuvent reposer sur des périmètres, quantités, références, méthodes, délais et risques différents. Alignez ces éléments avant de conclure qu’un professionnel est plus cher." },
    { question: "Comment est calculé le prix des travaux ?", answer: "Un chiffrage combine généralement quantités de matériaux, temps de main-d’œuvre, équipements, logistique, coordination, frais et risque. Demandez des unités et hypothèses vérifiables." },
    { question: "La ville change-t-elle toujours le prix ?", answer: "Non. La localisation peut influencer déplacement, accès, disponibilité et livraison, mais une hiérarchie systématique entre villes exige des données comparables que ce guide ne prétend pas fournir." },
    { question: "Quel est l’impact des matériaux ?", answer: "Ils affectent achat, transport, pertes, consommables, méthode de pose, délai et entretien. Une référence chère n’est pas le seul facteur ; sa complexité de mise en œuvre compte aussi." },
    { question: "Comment éviter que le coût augmente en cours de chantier ?", answer: "Finalisez les décisions, diagnostiquez ce qui est accessible, formalisez les hypothèses, gardez une réserve et exigez un accord écrit avant tout travail supplémentaire." },
  ], relatedKeys: ["budget", "quotes"],
};
