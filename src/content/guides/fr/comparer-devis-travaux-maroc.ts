import type { GuideArticle } from "../types";

export const quotesFr: GuideArticle = {
  key: "quotes", locale: "fr", slug: "comparer-devis-travaux-maroc", counterpartSlug: "compare-contractor-quotes-morocco", category: "Choix d’un professionnel",
  seoTitle: "Comparer des devis travaux au Maroc : méthode et checklist", title: "Comment comparer correctement plusieurs devis de travaux ?",
  description: "Apprenez à comparer plusieurs devis de travaux au Maroc : prestations, matériaux, délais, paiements, garanties, exclusions et points à vérifier avant de choisir.",
  excerpt: "Une grille ligne par ligne pour comparer le périmètre, les quantités, les références, les délais et les responsabilités — pas seulement le total.",
  primaryKeyword: "comparer devis travaux Maroc", secondaryKeywords: ["devis rénovation Maroc", "devis travaux Maroc", "choisir artisan Maroc", "choisir entreprise rénovation Maroc", "devis détaillé travaux"],
  publishedAt: "2026-07-19", modifiedAt: "2026-07-19", readingTime: 15, author: "Équipe éditoriale Renoqo",
  shortAnswer: "Pour comparer des devis travaux au Maroc, commencez par vérifier qu’ils décrivent exactement le même chantier. Alignez quantités, matériaux, fourniture, main-d’œuvre, protections, déchets, délais et conditions de paiement. Évaluez ensuite la clarté, les exclusions, la gestion des modifications et les informations du professionnel. Le devis le moins cher n’est avantageux que s’il couvre réellement le besoin avec des engagements compréhensibles.",
  takeaways: ["Créer un périmètre commun avant les demandes.", "Comparer chaque ligne, unité et référence, pas uniquement le total.", "Faire préciser inclusions, exclusions, délais et paiements.", "Vérifier l’identité et les justificatifs pertinents du professionnel.", "Formaliser tout travail supplémentaire avant exécution."],
  sections: [
    { id: "prix-total", title: "Pourquoi ne pas comparer uniquement le prix total ?", blocks: [
      { type: "paragraph", text: "Deux totaux peuvent couvrir des réalités différentes. L’un peut comprendre les fournitures, les protections et l’évacuation ; l’autre seulement la pose. Une référence plus durable, une préparation de support ou des essais peuvent aussi expliquer un écart légitime. Le total devient comparable seulement après normalisation du contenu." },
      { type: "warning", title: "Prix bas, information faible", text: "Une offre courte n’est pas automatiquement mauvaise, mais elle transfère davantage d’incertitude au client. Demandez des précisions écrites avant de choisir, sans supposer que ce qui n’est pas indiqué sera inclus." },
    ]},
    { id: "perimetre", title: "Vérifier que les devis couvrent le même périmètre", blocks: [
      { type: "paragraph", text: "Joignez à chaque demande le même relevé : pièces, travaux, photos, dimensions, contraintes, fournitures à la charge du client et résultat attendu. À réception, recopiez les lignes dans une matrice commune. Toute ligne absente devient une question, pas un zéro présumé." },
      { type: "list", items: ["Même nombre de pièces, équipements et points techniques.", "Même préparation des supports et niveau de finition.", "Même responsabilité pour achats, livraison et stockage.", "Même traitement des protections, déchets et nettoyage.", "Même hypothèse concernant occupation, accès et horaires."] },
    ]},
    { id: "quantites-materiaux", title: "Comparer les quantités, matériaux et références", blocks: [
      { type: "paragraph", text: "Contrôlez l’unité et la quantité de chaque poste : m², mètre linéaire, unité, journée ou forfait. Pour les matériaux, recherchez une marque et une référence, ou au minimum des caractéristiques mesurables. Le terme « standard » ne suffit pas à comparer résistance, dimensions, finition ou garantie fabricant." },
      { type: "tip", title: "Gérer une référence indisponible", text: "Demandez la règle de substitution : accord préalable, caractéristiques équivalentes et incidence de prix documentée. Cela évite qu’une référence précise soit remplacée silencieusement après signature." },
    ]},
    { id: "fourniture-main-oeuvre", title: "Distinguer fourniture et main-d’œuvre", blocks: [
      { type: "paragraph", text: "Une ligne claire indique ce qui est fourni, qui commande, qui réceptionne et qui supporte une erreur de quantité. Si le client achète, précisez si la manutention, les consommables, les accessoires et la pose restent inclus. Si l’entreprise fournit, vérifiez que la quantité et la référence correspondent au besoin." },
      { type: "list", items: ["Dépose et démolition.", "Protection du logement et des parties communes.", "Frais de déplacement et de livraison.", "Évacuation des déchets et frais associés.", "Consommables, raccords et petites fournitures.", "Essais, réglages, reprises et nettoyage final."] },
    ]},
    { id: "delais-paiements", title: "Vérifier les délais et le calendrier des paiements", blocks: [
      { type: "paragraph", text: "Comparez date de démarrage, durée estimée, ordre des lots, dépendances et traitement d’un retard d’approvisionnement. Un délai très court peut supposer une équipe plus importante, des matériaux déjà disponibles ou un périmètre réduit : demandez l’hypothèse." },
      { type: "paragraph", text: "Reliez les échéances à des jalons contrôlables et identifiez ce que finance l’acompte. Un paiement initial important mérite une explication précise, notamment pour les commandes sur mesure. Évitez un calendrier fondé uniquement sur des dates si l’avancement n’est pas défini." },
      { type: "warning", title: "Acompte disproportionné", text: "Ne concluez pas à partir d’un pourcentage isolé. Demandez le détail des commandes et engagements couverts, vérifiez les informations du bénéficiaire et comparez le risque pris par chaque partie avant de payer." },
    ]},
    { id: "professionnel", title: "Vérifier le professionnel, les garanties et responsabilités", blocks: [
      { type: "paragraph", text: "Vérifiez que le devis permet d’identifier le professionnel et de le contacter : nom ou raison sociale, adresse, téléphone et informations d’activité disponibles. Pour les assurances, garanties ou qualifications pertinentes, demandez un justificatif en cours de validité et vérifiez que son périmètre correspond aux travaux concernés." },
      { type: "warning", title: "Précaution juridique", text: "Les obligations applicables dépendent du statut des parties et de la nature du chantier. Ce guide propose une méthode de lecture et ne remplace pas un conseil juridique. Pour une question contractuelle, consultez les textes officiels marocains en vigueur et, si nécessaire, un professionnel du droit." },
    ]},
    { id: "modifications", title: "Encadrer les modifications et travaux supplémentaires", blocks: [
      { type: "paragraph", text: "Avant le démarrage, convenez d’un processus simple : description écrite, prix ou méthode de calcul, effet sur le délai, puis acceptation avant exécution. Distinguez l’imprévu techniquement nécessaire de l’amélioration demandée par le client. Une photo seule prouve rarement l’accord sur le prix." },
      { type: "list", ordered: true, items: ["Le professionnel décrit la découverte ou la demande.", "Il explique pourquoi elle se situe hors du périmètre initial.", "Les parties valident quantité, prix et délai supplémentaires.", "La décision est annexée au devis ou au suivi du chantier.", "La facture et le planning reprennent la modification validée."] },
    ]},
    { id: "comparatif", title: "Exemple pédagogique : trois devis fictifs", blocks: [
      { type: "paragraph", text: "Les offres A, B et C ci-dessous sont des scénarios fictifs, non contractuels et sans prix. Elles montrent comment la qualité de l’information change l’évaluation d’un même chantier." },
      { type: "table", caption: "Comparaison fictive de trois offres", headers: ["Critère", "Devis A", "Devis B", "Devis C"], rows: [
        ["Périmètre", "Liste générale", "Pièces et tâches détaillées", "Détaillé, mais démolition exclue"],
        ["Quantités", "Forfaits", "Unités et métrés", "Unités, certains métrés à confirmer"],
        ["Matériaux", "Gamme standard", "Références indiquées", "Fournis par le client"],
        ["Logistique", "Non précisée", "Protection, déchets et nettoyage inclus", "Livraison incluse, déchets exclus"],
        ["Délai", "Durée globale", "Jalons et dépendances", "Démarrage rapide, planning à fournir"],
        ["Paiements", "Dates fixes", "Jalons vérifiables", "Acompte lié aux commandes"],
        ["Action avant choix", "Demander une version détaillée", "Vérifier références et justificatifs", "Chiffrer les exclusions"],
      ]},
      { type: "paragraph", text: "Aucune colonne ne désigne automatiquement un gagnant. Le client complète d’abord les informations manquantes, ajoute les exclusions au coût comparable et évalue si le calendrier et les responsabilités conviennent à son projet." },
    ]},
    { id: "notation", title: "Grille de notation imprimable", blocks: [
      { type: "table", caption: "Grille à imprimer et compléter pour chaque devis", headers: ["Critère", "Poids suggéré", "Note / 5", "Justification"], rows: [["Périmètre et quantités", "Élevé", "", ""], ["Références et qualité", "Élevé", "", ""], ["Inclusions et exclusions", "Élevé", "", ""], ["Planning réaliste", "Moyen", "", ""], ["Paiements et modifications", "Élevé", "", ""], ["Informations et justificatifs", "Élevé", "", ""], ["Communication et clarté", "Moyen", "", ""], ["Coût comparable corrigé", "Élevé", "", ""]] },
      { type: "tip", title: "Impression", text: "Utilisez la commande d’impression du navigateur. La feuille de style Renoqo conserve le tableau et masque les éléments de navigation non nécessaires." },
    ]},
    { id: "alertes", title: "Signaux d’alerte et erreurs fréquentes", blocks: [
      { type: "list", items: ["Refus de détailler un forfait important.", "Références vagues impossibles à contrôler.", "Incohérences entre quantités et visite du chantier.", "Exclusions révélées seulement après le choix.", "Pression pour payer immédiatement sans document stable.", "Coordonnées ou bénéficiaire du paiement difficiles à rapprocher.", "Promesse de délai sans équipe, séquence ni disponibilité vérifiable.", "Modification orale exécutée avant accord sur son coût."] },
    ]},
  ],
  checklist: ["Les candidats ont reçu le même cahier des charges.", "Chaque poste comporte unité et quantité.", "Les références ou performances sont identifiables.", "Fourniture et main-d’œuvre sont distinguées.", "Dépose, protection, déchets, livraison et nettoyage sont clarifiés.", "Démarrage, durée et jalons sont écrits.", "Les paiements correspondent à des étapes vérifiables.", "Les coordonnées et justificatifs pertinents ont été contrôlés.", "Le processus de modification est défini.", "Toutes les exclusions ont été chiffrées avant comparaison."],
  faqs: [
    { question: "Combien de devis demander avant des travaux ?", answer: "Demandez assez d’offres pour comprendre les variantes du marché et comparer des approches, souvent plusieurs plutôt qu’une seule. La qualité du cahier des charges et des visites compte davantage qu’un nombre rigide." },
    { question: "Que doit contenir un devis de rénovation ?", answer: "Il devrait permettre d’identifier les parties et décrire périmètre, quantités, fournitures, main-d’œuvre, prix, délais, paiements, inclusions, exclusions et traitement des modifications avec un niveau adapté au chantier." },
    { question: "Comment vérifier un devis d’artisan ?", answer: "Rapprochez chaque ligne du relevé, refaites les quantités clés, vérifiez les références, demandez les justificatifs pertinents et confirmez par écrit tout élément ambigu." },
    { question: "Faut-il choisir le devis le moins cher ou le plus détaillé ?", answer: "Ni le prix ni la longueur ne suffisent. Comparez le coût corrigé des exclusions, la pertinence technique, la clarté des responsabilités et la capacité à exécuter le planning." },
    { question: "Que faire si les devis utilisent des périmètres différents ?", answer: "Créez une liste commune des écarts et demandez une révision ou des options séparées. Ne comparez les totaux qu’après avoir aligné le contenu." },
  ], relatedKeys: ["budget", "costFactors"],
};
