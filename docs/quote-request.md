# Expérience de demande de devis

Les routes `/demander-un-devis/` et `/en/demander-un-devis/` utilisent une page serveur statique et un seul îlot client, `QuoteRequestForm`. Le formulaire conserve `output: "export"` : aucun Route Handler Next.js n’est requis.

## Parcours et données

Le parcours comprend huit étapes : projet ; bien ; métiers ; finitions ; budget et calendrier ; localisation et accès ; documents ; coordonnées et récapitulatif. Les listes utilisent exclusivement les identifiants stables de `src/lib/quote-request/constants.ts`. Les questions peinture, plomberie, électricité, carrelage, cuisine, salle de bain, construction, climatisation, solaire et autre ne sont rendues que si le métier correspondant est sélectionné.

La validation commune se trouve dans `schema.ts`. Elle contrôle les champs essentiels, email, téléphone normalisé, fourchettes budgétaires, consentements et fichiers. Elle améliore l’expérience mais ne remplace jamais une validation serveur.

## Brouillon et confidentialité

Le brouillon versionné expire après 30 jours et utilise `renoqo_quote_request_draft_MA`. La structure accepte une clé distincte par pays. Coordonnées, organisation, adresse exacte, géolocalisation, personne sur place et fichiers sont supprimés avant écriture dans `localStorage`. Les fichiers restent uniquement en mémoire.

La suppression demande confirmation. Le brouillon n’est effacé après soumission que si le serveur retourne un véritable `requestId`.

## Fichiers

Formats : JPG/JPEG, PNG, WebP et PDF. Limites client : 10 fichiers, 10 Mo par fichier, 35 Mo au total. L’extension et le MIME déclaré doivent correspondre. Les chemins locaux ne sont pas rendus, aucune pièce jointe n’est journalisée et aucun contenu n’est exécuté. Le futur backend doit répéter tous les contrôles, analyser les fichiers et les placer dans un bucket R2 privé.

## Soumission, analytics et sécurité

`NEXT_PUBLIC_QUOTE_REQUEST_ENDPOINT` désigne l’URL HTTPS publique du Worker. Sans configuration, l’interface annonce l’indisponibilité, garde le brouillon non sensible et ne produit jamais de succès. La requête multipart contient `request` en JSON et les champs `documents`. Seul un `requestId` réel reçu dans une réponse 2xx déclenche le succès.

Les événements analytics sont limités à l’étape, au statut ou au code d’erreur. Nom, coordonnées, adresse, texte libre, fichiers, budget exact et géolocalisation sont interdits.

Le honeypot et les contrôles navigateur ne constituent pas une sécurité. Le Worker devra imposer Turnstile, origine autorisée, limite de taille, limitation de fréquence, schéma serveur, normalisation, détection des doublons et journal d’audit.

## Internationalisation et tests

Les textes FR/EN se trouvent dans `src/i18n/quote-request/` et sont attachés aux dictionnaires principaux sous `quoteRequest`. Les types et tests d’égalité empêchent les divergences de clés. Les tests couvrent schéma, stockage, fichiers, soumission, métiers stables, rendu SEO, footer et sitemap.
