import type { GuideArticle } from "../types";

export const budgetFr: GuideArticle = {
  key: "budget", locale: "fr", slug: "budget-renovation-maroc", counterpartSlug: "renovation-budget-morocco",
  category: "Planification", seoTitle: "Budget rénovation au Maroc : méthode pour estimer vos travaux",
  title: "Comment préparer le budget d’une rénovation au Maroc ?",
  description: "Découvrez comment calculer un budget de rénovation au Maroc, répartir les dépenses, prévoir les imprévus et obtenir une estimation plus réaliste de vos travaux.",
  excerpt: "Une méthode pratique pour cadrer le chantier, chiffrer chaque poste et piloter les paiements sans s’appuyer sur un prix moyen trompeur.",
  primaryKeyword: "budget rénovation Maroc",
  secondaryKeywords: ["budget rénovation appartement Maroc", "coût rénovation appartement Maroc", "prix rénovation au m² Maroc", "estimation travaux Maroc", "marge imprévus travaux"],
  publishedAt: "2026-07-19", modifiedAt: "2026-07-19", readingTime: 14, author: "Équipe éditoriale Renoqo",
  shortAnswer: "Pour préparer un budget de rénovation au Maroc, définissez d’abord un périmètre mesurable, relevez les quantités, choisissez un niveau de finition, puis demandez des devis portant sur le même contenu. Additionnez travaux, fournitures, logistique, honoraires et autorisations éventuelles, avant d’isoler une réserve pour les aléas. Un budget utile est une fourchette documentée, pas un montant au mètre carré appliqué sans diagnostic.",
  takeaways: ["Séparer les travaux indispensables des améliorations facultatives.", "Chiffrer les quantités et les postes plutôt que partir d’un total global.", "Conserver une réserve distincte, adaptée aux incertitudes réellement identifiées.", "Planifier les paiements selon des étapes vérifiables du chantier.", "Faire confirmer le budget par plusieurs professionnels après visite."],
  sections: [
    { id: "pourquoi", title: "Pourquoi préparer le budget avant de contacter les professionnels ?", blocks: [
      { type: "paragraph", text: "Un budget préparé en amont transforme une idée générale en demande comparable. Il aide à expliquer ce qui doit être conservé, remplacé ou déplacé et évite que chaque professionnel interprète le projet différemment. Il permet aussi de repérer tôt l’écart entre les ambitions, la capacité de financement et le calendrier." },
      { type: "paragraph", text: "Cette préparation ne remplace pas une visite technique. Une installation électrique cachée, une fuite ancienne ou un support dégradé ne se diagnostiquent pas depuis une annonce immobilière. Le document budgétaire sert de base de discussion et doit évoluer à mesure que les informations deviennent plus fiables." },
      { type: "tip", title: "Avant un achat immobilier", text: "Demandez l’autorisation d’effectuer une visite avec un professionnel. Photographiez les tableaux électriques, arrivées d’eau, fissures et menuiseries : ces éléments sont plus utiles qu’une estimation globale fondée uniquement sur la surface." },
    ]},
    { id: "perimetre", title: "Définir précisément le périmètre du chantier", blocks: [
      { type: "paragraph", text: "Travaillez pièce par pièce. Pour chacune, notez l’existant, le résultat attendu, les dimensions, ce qui est fourni par le client et les contraintes d’accès. Indiquez si le logement reste occupé, si les meubles doivent être protégés et si les travaux doivent être réalisés en plusieurs phases." },
      { type: "list", items: ["Indispensable : sécurité, étanchéité, plomberie défaillante, réparation des supports.", "Nécessaire au projet : redistribution, réseaux, revêtements et équipements prévus.", "Facultatif : amélioration esthétique pouvant être reportée sans compromettre le chantier.", "Hors périmètre : élément explicitement exclu afin d’éviter toute ambiguïté."] },
      { type: "warning", title: "Attention aux dépendances", text: "Reporter la peinture est simple ; reporter une reprise électrique après la pose d’un revêtement l’est beaucoup moins. Classez les options selon leur dépendance aux travaux déjà engagés, pas seulement selon leur apparence." },
    ]},
    { id: "postes", title: "Dresser la liste des postes de dépenses", blocks: [
      { type: "paragraph", text: "Le calcul du budget de rénovation commence par une nomenclature complète. Le devis principal ne couvre pas toujours les achats directs, la livraison, le stockage ou la remise en état des parties communes. Inscrire chaque poste, même avec un montant encore inconnu, rend les angles morts visibles." },
      { type: "table", caption: "Postes à intégrer dans une estimation de rénovation", headers: ["Poste", "Éléments à quantifier", "Questions utiles"], rows: [
        ["Études et préparation", "Relevés, plans, diagnostic, honoraires éventuels", "Une compétence spécialisée est-elle nécessaire ?"],
        ["Dépose et démolition", "Ouvrages déposés, protection, manutention", "Qui évacue et où sont stockés les déchets ?"],
        ["Plomberie et électricité", "Points, longueurs, appareils, tableaux", "Les fournitures et essais sont-ils inclus ?"],
        ["Revêtements et peinture", "Surfaces nettes, préparation, pertes", "Quel support et combien de couches ?"],
        ["Cuisine et salle de bain", "Meubles, équipements, raccordements", "Pose, accessoires et réglages sont-ils compris ?"],
        ["Menuiserie", "Dimensions, quincaillerie, finition", "La prise de cote et la pose sont-elles incluses ?"],
        ["Logistique", "Livraison, montée, stockage, accès", "Un étage ou une rue étroite change-t-il la manutention ?"],
        ["Fin de chantier", "Nettoyage, essais, reprises, évacuation", "Quel niveau de nettoyage est prévu ?"],
        ["Démarches", "Autorisations ou accompagnement éventuels", "Quelles démarches sont réellement applicables au projet ?"],
      ]},
    ]},
    { id: "quantites", title: "Calculer la surface et les quantités", blocks: [
      { type: "paragraph", text: "La surface habitable ne suffit pas. La peinture dépend des murs et plafonds, le carrelage des surfaces réellement posées, et la plomberie du nombre de points et des longueurs de réseau. Mesurez chaque zone, retranchez ou non les ouvertures selon la méthode annoncée et consignez les hypothèses." },
      { type: "list", ordered: true, items: ["Créer un relevé par pièce avec longueur, largeur et hauteur.", "Calculer séparément sols, murs, plafonds et plinthes.", "Compter les équipements, prises, luminaires, portes et points d’eau.", "Ajouter seulement les pertes de coupe justifiées par le produit et le plan de pose.", "Faire confirmer les métrés avant toute commande non retournable."] },
      { type: "tip", title: "Unité comparable", text: "Demandez que le devis indique l’unité de chaque ligne — m², mètre linéaire, unité, forfait — et la quantité correspondante. Un prix unitaire sans quantité, ou l’inverse, reste difficile à vérifier." },
    ]},
    { id: "finition", title: "Choisir un niveau de finition économique, standard ou premium", blocks: [
      { type: "paragraph", text: "Ces trois niveaux ne sont pas des tarifs de marché. Ce sont des scénarios de décision. Une finition économique privilégie les références disponibles et simples à poser ; une finition standard équilibre durabilité, choix et entretien ; une finition premium peut introduire fabrication sur mesure, détails complexes et délais d’approvisionnement." },
      { type: "paragraph", text: "Le niveau peut varier par poste. Il est souvent plus rationnel de préserver la qualité des éléments difficiles à remplacer — réseaux encastrés, étanchéité, quincaillerie sollicitée — et de simplifier une finition décorative facilement renouvelable. Demandez toujours une référence ou une performance précise plutôt qu’un adjectif commercial." },
    ]},
    { id: "reserve", title: "Prévoir une réserve pour les imprévus", blocks: [
      { type: "paragraph", text: "La réserve couvre des risques plausibles mais non encore quantifiables : supports découverts après dépose, réseaux non visibles, ajustements de quantité ou petite reprise. Son niveau doit refléter l’état du bien, la qualité du diagnostic et la part de démolition. Il n’existe pas de pourcentage universel valable pour tous les chantiers." },
      { type: "warning", title: "Une réserve n’est pas une enveloppe d’options", text: "Gardez les améliorations facultatives sur une liste séparée. Si la réserve finance une montée en gamme dès le démarrage, elle ne sera plus disponible au moment d’un véritable aléa." },
    ]},
    { id: "arbitrage", title: "Comparer le budget disponible au budget estimé", blocks: [
      { type: "paragraph", text: "Présentez trois colonnes : minimum fonctionnel, projet cible et options. Si le projet cible dépasse l’enveloppe, réduisez le périmètre, changez une spécification ou phasez des travaux indépendants. Ne réduisez pas arbitrairement chaque ligne : certains coûts fixes ne diminuent pas avec la surface." },
      { type: "list", items: ["Prioriser la sécurité, l’étanchéité et les réseaux.", "Conserver une cohérence technique entre les lots.", "Chercher des produits disponibles localement et réparables.", "Évaluer le coût d’un phasage : double déplacement, protection ou nettoyage.", "Documenter chaque arbitrage dans la version remise aux professionnels."] },
    ]},
    { id: "paiements", title: "Créer un calendrier de paiement", blocks: [
      { type: "paragraph", text: "Associez les paiements à des jalons observables : commande identifiée, livraison contrôlée, lot achevé, essais réalisés et réception des reprises. Le calendrier doit préciser ce qui déclenche chaque échéance et comment une modification est chiffrée puis acceptée." },
      { type: "tip", title: "Garder une trace", text: "Conservez devis, versions, preuves de paiement, photos et validations dans un dossier partagé. Confirmez par écrit toute modification du périmètre, du délai ou d’une référence avant exécution." },
    ]},
    { id: "exemple", title: "Exemple pédagogique de répartition d’un budget", blocks: [
      { type: "paragraph", text: "Scénario fictif et non contractuel : un appartement de 80 m² nécessite une remise à niveau des réseaux dans certaines pièces, la rénovation d’une salle de bain, la préparation et peinture générale, puis le remplacement de plusieurs revêtements. Aucun montant n’est fourni, car il dépend des métrés, références, accès et devis au moment du projet." },
      { type: "table", caption: "Répartition pédagogique sans prix de marché", headers: ["Enveloppe", "Contenu", "Méthode de contrôle"], rows: [["Socle technique", "Diagnostic, plomberie, électricité, supports", "Visite, quantités et essais attendus"], ["Finitions", "Peinture, sols, équipements", "Références et surfaces nettes"], ["Logistique", "Protection, livraison, déchets, nettoyage", "Responsable et conditions d’accès"], ["Réserve", "Aléas identifiés mais non chiffrables", "Validation écrite avant utilisation"], ["Options", "Éléments reportables", "Prix séparés du projet de base"]] },
      { type: "paragraph", text: "Le propriétaire compare d’abord le total hors options à son budget disponible. Il demande ensuite aux entreprises de chiffrer les mêmes quantités. Si un devis révèle un besoin technique crédible, il met à jour le cahier commun avant de demander une révision aux autres candidats." },
    ]},
    { id: "erreurs", title: "Erreurs fréquentes à éviter", blocks: [
      { type: "list", items: ["Appliquer un prix au m² sans définir ce qu’il comprend.", "Oublier livraison, déchets, protections, nettoyage ou honoraires éventuels.", "Commander des matériaux avant validation des métrés et supports.", "Comparer une offre avec fournitures à une offre de main-d’œuvre seule.", "Dépenser la réserve dans des options décoratives.", "Payer selon des dates sans vérifier l’avancement correspondant.", "Modifier le projet oralement sans nouveau chiffrage ni incidence sur le délai."] },
    ]},
  ],
  checklist: ["Le périmètre est décrit pièce par pièce.", "Indispensables, options et exclusions sont séparés.", "Les surfaces et quantités sont vérifiables.", "Chaque matériau possède une référence ou un niveau de performance.", "Main-d’œuvre, fournitures, livraison et déchets sont distingués.", "Les démarches éventuellement nécessaires ont été vérifiées.", "Une réserve indépendante correspond aux risques du projet.", "Les paiements suivent des jalons observables.", "Plusieurs devis portent sur le même cahier des charges.", "Les décisions et modifications seront conservées par écrit."],
  faqs: [
    { question: "Comment calculer le budget d’une rénovation ?", answer: "Décomposez le projet par pièce et par lot, mesurez les quantités, définissez les références, ajoutez logistique et démarches éventuelles, puis obtenez plusieurs devis comparables. Ajoutez enfin une réserve fondée sur les incertitudes du chantier." },
    { question: "Combien prévoir pour rénover un appartement au Maroc ?", answer: "La surface seule ne permet pas une réponse fiable. L’état initial, les réseaux, le niveau de finition, l’accès, la ville, les quantités et le périmètre modifient fortement l’estimation. Utilisez une fourchette calculée puis faites-la confirmer après visite." },
    { question: "Quelle marge prévoir pour les imprévus ?", answer: "Il n’existe pas de taux universel. Une rénovation légère bien diagnostiquée et un chantier avec démolition ou réseaux cachés n’ont pas le même risque. Listez les inconnues, évaluez leur probabilité avec les professionnels et gardez la réserve séparée." },
    { question: "Un prix de rénovation au m² suffit-il ?", answer: "Non. Il peut servir de premier repère si sa méthodologie et son périmètre sont connus, mais il ne remplace ni les métrés par poste, ni le diagnostic, ni un devis détaillé." },
    { question: "Faut-il préparer le budget avant ou après les devis ?", answer: "Préparez une première enveloppe et un cahier des charges avant les demandes. Les visites et devis servent ensuite à tester les hypothèses et à produire une version plus réaliste." },
  ], relatedKeys: ["quotes", "costFactors"],
};
